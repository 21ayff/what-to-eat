const nodemailer = require('nodemailer');
const { Resend } = require('resend');

// 优先使用 Resend，如果不配置则使用 163 邮箱
const resendApiKey = process.env.RESEND_API_KEY;

// 创建 163邮箱 SMTP 客户端（备用）
const transporter = nodemailer.createTransport({
  host: 'smtp.163.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER || '19881647830@163.com',
    pass: process.env.EMAIL_PASS || 'TPmcXFt5M54BhxQA',
  },
});

// 发送验证码邮件
async function sendVerifyCodeEmail(toEmail, code) {
  try {
    // 开发模式：直接输出验证码到控制台，不发送邮件
    if (process.env.DEV_MODE === 'true') {
      console.log('\n');
      console.log('╔════════════════════════════════════════════════════════╗');
      console.log('║                    开发模式 - 验证码                    ║');
      console.log('╠════════════════════════════════════════════════════════╣');
      console.log(`║  邮箱: ${toEmail.padEnd(46)}║`);
      console.log(`║  验证码: ${code.padEnd(44)}║`);
      console.log('╚════════════════════════════════════════════════════════╝');
      console.log('\n');
      return {
        success: true,
        message: '验证码已生成（开发模式）',
        devMode: true,
        code: code,
      };
    }

    // 如果有 Resend API Key，使用 Resend
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
        to: toEmail,
        subject: '登录验证码 - 今天吃什么',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #7C3AED; margin-bottom: 20px;">今天吃什么</h2>
            <p style="font-size: 16px; color: #333; margin-bottom: 20px;">您好！</p>
            <p style="font-size: 16px; color: #333; margin-bottom: 20px;">您的登录验证码是：</p>
            <div style="background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%); padding: 20px; border-radius: 12px; text-align: center; margin: 30px 0;">
              <span style="font-size: 32px; font-weight: bold; color: white; letter-spacing: 8px;">${code}</span>
            </div>
            <p style="font-size: 14px; color: #666; margin-bottom: 10px;">验证码 5 分钟内有效，请勿泄露给他人。</p>
            <p style="font-size: 14px; color: #999; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">如果这不是您的操作，请忽略此邮件。</p>
          </div>
        `,
      });

      if (error) {
        console.error('Resend 发送失败:', error);
        throw error;
      }

      console.log('Resend 邮件发送成功:', data?.id);
      return {
        success: true,
        message: '验证码邮件已发送',
        messageId: data?.id,
      };
    }

    // 否则使用 163 邮箱
    const info = await transporter.sendMail({
      from: `"今天吃什么" <${process.env.EMAIL_USER || '19881647830@163.com'}>`,
      to: toEmail,
      subject: '登录验证码 - 今天吃什么',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #7C3AED; margin-bottom: 20px;">今天吃什么</h2>
          <p style="font-size: 16px; color: #333; margin-bottom: 20px;">您好！</p>
          <p style="font-size: 16px; color: #333; margin-bottom: 20px;">您的登录验证码是：</p>
          <div style="background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%); padding: 20px; border-radius: 12px; text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; color: white; letter-spacing: 8px;">${code}</span>
          </div>
          <p style="font-size: 14px; color: #666; margin-bottom: 10px;">验证码 5 分钟内有效，请勿泄露给他人。</p>
          <p style="font-size: 14px; color: #999; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">如果这不是您的操作，请忽略此邮件。</p>
        </div>
      `,
    });

    console.log('163 邮件发送成功:', info.messageId);
    return {
      success: true,
      message: '验证码邮件已发送',
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('发送邮件失败:', error);
    return {
      success: false,
      message: '邮件发送失败: ' + error.message,
    };
  }
}

// 生成6位数字验证码
function generateVerifyCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// 验证邮箱格式
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = {
  sendVerifyCodeEmail,
  generateVerifyCode,
  isValidEmail,
};
