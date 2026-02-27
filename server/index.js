require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const { 
  handleSendCode, 
  handleLoginWithCode, 
  handleRefreshToken,
  handleGetProfile,
  authMiddleware 
} = require('./auth');

const { supabase } = require('./supabase-db');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 请求日志
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// 健康检查 - Railway 默认检查 /health
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

// 健康检查 - 兼容 /api/health
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

// 认证相关路由
app.post('/api/auth/send-code', handleSendCode);
app.post('/api/auth/login-with-code', handleLoginWithCode);
app.post('/api/auth/refresh', handleRefreshToken);

// 需要认证的路由
app.get('/api/users/profile', authMiddleware, handleGetProfile);

// 统计相关路由
const statsRouter = require('./routes/stats');
app.use('/api/stats', authMiddleware, statsRouter);

// 注意：静态文件服务已移除，前端和后端分开部署
// 前端部署在 Netlify，后端部署在 Railway

// 错误处理
app.use((err, req, res, next) => {
  console.error('服务器错误:', err);
  res.status(500).json({
    success: false,
    error: '服务器内部错误',
  });
});

// 启动服务器
app.listen(PORT, async () => {
  console.log(`
╔════════════════════════════════════════╗
║                                        ║
║   今天吃什么 - 后端服务已启动          ║
║                                        ║
║   端口: ${PORT}                          ║
║   环境: ${process.env.NODE_ENV || 'development'}                    ║
║   数据库: Supabase                     ║
║                                        ║
╚════════════════════════════════════════╝
  `);
  
  // 测试 Supabase 连接
  try {
    const { data, error } = await supabase.from('users').select('count', { count: 'exact' });
    if (error) throw error;
    console.log('✅ Supabase 数据库连接成功');
  } catch (err) {
    console.error('❌ Supabase 数据库连接失败:', err.message);
  }
});
