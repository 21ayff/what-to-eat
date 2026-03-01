const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const { dbOperations } = require('./supabase-db');
const { sendVerifyCodeEmail, generateVerifyCode, isValidEmail } = require('./email');

// JWT密钥
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// 生成JWT令牌
function generateTokens(user) {
  const accessToken = jwt.sign(
    { userId: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  const refreshToken = jwt.sign(
    { userId: user.id, type: 'refresh' },
    JWT_SECRET,
    { expiresIn: '30d' }
  );

  return { accessToken, refreshToken };
}

// 验证JWT令牌
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// 发送验证码
async function handleSendCode(req, res) {
  try {
    const { email } = req.body;
    
    // 验证邮箱格式
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: '请输入正确的邮箱地址',
      });
    }
    
    // 生成验证码
    const code = generateVerifyCode();
    
    // 计算过期时间（5分钟后）
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();
    
    // 保存验证码到数据库
    await dbOperations.saveVerifyCode(email, code, expiresAt);
    
    // 发送邮件
    const emailResult = await sendVerifyCodeEmail(email, code);
    
    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        error: emailResult.message || '邮件发送失败',
      });
    }
    
    res.json({
      success: true,
      message: '验证码已发送到您的邮箱',
    });
  } catch (error) {
    console.error('发送验证码失败:', error);
    res.status(500).json({
      success: false,
      error: '服务器错误，请稍后重试',
    });
  }
}

// 验证码登录
async function handleLoginWithCode(req, res) {
  try {
    const { email, code } = req.body;
    
    // 验证参数
    if (!email || !code) {
      return res.status(400).json({
        success: false,
        error: '请输入邮箱和验证码',
      });
    }
    
    // 验证邮箱格式
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: '请输入正确的邮箱地址',
      });
    }
    
    // 验证验证码
    const verifyResult = await dbOperations.verifyCode(email, code);
    if (!verifyResult) {
      return res.status(400).json({
        success: false,
        error: '验证码错误或已过期',
      });
    }
    
    // 删除已使用的验证码
    await dbOperations.deleteVerifyCode(email);
    
    // 查找或创建用户
    let user = await dbOperations.findUserByEmail(email);
    
    if (!user) {
      // 创建新用户
      const newUser = {
        id: uuidv4(),
        email,
        nickname: email.split('@')[0],
        avatar: null,
      };
      user = await dbOperations.createUser(newUser);
    }
    
    // 生成JWT令牌
    const tokens = generateTokens(user);
    
    res.json({
      success: true,
      message: '登录成功',
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        avatar: user.avatar,
      },
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (error) {
    console.error('登录失败:', error);
    res.status(500).json({
      success: false,
      error: '服务器错误，请稍后重试',
    });
  }
}

// 刷新令牌
async function handleRefreshToken(req, res) {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        error: '请提供刷新令牌',
      });
    }
    
    // 验证刷新令牌
    const decoded = verifyToken(refreshToken);
    if (!decoded || decoded.type !== 'refresh') {
      return res.status(401).json({
        success: false,
        error: '无效的刷新令牌',
      });
    }
    
    // 查找用户
    const user = await dbOperations.findUserById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: '用户不存在',
      });
    }
    
    // 生成新令牌
    const tokens = generateTokens(user);
    
    res.json({
      success: true,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (error) {
    console.error('刷新令牌失败:', error);
    res.status(500).json({
      success: false,
      error: '服务器错误',
    });
  }
}

// 获取用户信息
async function handleGetProfile(req, res) {
  try {
    const userId = req.user.userId;
    
    const user = await dbOperations.findUserById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: '用户不存在',
      });
    }
    
    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        avatar: user.avatar,
        createdAt: user.created_at,
      },
    });
  } catch (error) {
    console.error('获取用户信息失败:', error);
    res.status(500).json({
      success: false,
      error: '服务器错误',
    });
  }
}

// 认证中间件
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: '未提供认证令牌',
    });
  }
  
  const token = authHeader.substring(7);
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return res.status(401).json({
      success: false,
      error: '无效的认证令牌',
      code: 'TOKEN_EXPIRED',
    });
  }
  
  req.user = decoded;
  next();
}

// 用户注册（用户名密码）
async function handleRegister(req, res) {
  try {
    const { username, password, nickname } = req.body;

    // 验证参数
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: '请输入用户名和密码',
      });
    }

    // 验证用户名长度
    if (username.length < 3 || username.length > 20) {
      return res.status(400).json({
        success: false,
        error: '用户名长度应为3-20个字符',
      });
    }

    // 验证密码长度
    if (password.length < 6 || password.length > 20) {
      return res.status(400).json({
        success: false,
        error: '密码长度应为6-20个字符',
      });
    }

    // 检查用户名是否已存在
    const existingUser = await dbOperations.findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: '用户名已存在',
      });
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建新用户
    const newUser = {
      id: uuidv4(),
      username,
      password: hashedPassword,
      nickname: nickname || username,
      avatar: null,
    };

    const user = await dbOperations.createUser(newUser);

    // 生成JWT令牌
    const tokens = generateTokens(user);

    res.json({
      success: true,
      message: '注册成功',
      user: {
        id: user.id,
        username: user.username,
        nickname: user.nickname,
        avatar: user.avatar,
      },
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (error) {
    console.error('注册失败:', error);
    res.status(500).json({
      success: false,
      error: '服务器错误，请稍后重试',
    });
  }
}

// 用户登录（用户名密码）
async function handleLogin(req, res) {
  try {
    const { username, password } = req.body;

    // 验证参数
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: '请输入用户名和密码',
      });
    }

    // 查找用户
    const user = await dbOperations.findUserByUsername(username);
    if (!user) {
      return res.status(400).json({
        success: false,
        error: '用户名或密码错误',
      });
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        error: '用户名或密码错误',
      });
    }

    // 生成JWT令牌
    const tokens = generateTokens(user);

    res.json({
      success: true,
      message: '登录成功',
      user: {
        id: user.id,
        username: user.username,
        nickname: user.nickname,
        avatar: user.avatar,
      },
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (error) {
    console.error('登录失败:', error);
    res.status(500).json({
      success: false,
      error: '服务器错误，请稍后重试',
    });
  }
}

module.exports = {
  handleSendCode,
  handleLoginWithCode,
  handleRefreshToken,
  handleGetProfile,
  handleRegister,
  handleLogin,
  authMiddleware,
};
