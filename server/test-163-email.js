const nodemailer = require('nodemailer');

// 创建 163邮箱 SMTP 客户端
const transporter = nodemailer.createTransport({
  host: 'smtp.163.com',
  port: 465,
  secure: true,
  auth: {
    user: '19881647830@163.com',
    pass: 'TPmcXFt5M54BhxQA',
  },
  debug: true, // 开启调试模式
  logger: true, // 开启日志
});

// 测试邮件发送
async function testEmail() {
  const testEmail = process.argv[2] || 'test@example.com';
  
  console.log('正在测试 163 邮箱发送...');
  console.log('收件人:', testEmail);
  console.log('发件人: 19881647830@163.com');
  console.log('');
  
  try {
    const info = await transporter.sendMail({
      from: '"今天吃什么" <19881647830@163.com>',
      to: testEmail,
      subject: '登录验证码 - 今天吃什么',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #7C3AED; margin-bottom: 20px;">今天吃什么</h2>
          <p style="font-size: 16px; color: #333; margin-bottom: 20px;">您好！</p>
          <p style="font-size: 16px; color: #333; margin-bottom: 20px;">您的登录验证码是：</p>
          <div style="background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%); padding: 20px; border-radius: 12px; text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; color: white; letter-spacing: 8px;">123456</span>
          </div>
          <p style="font-size: 14px; color: #666; margin-bottom: 10px;">验证码 5 分钟内有效，请勿泄露给他人。</p>
        </div>
      `,
    });

    console.log('\n✅ 邮件发送成功！');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
    console.log('Accepted:', info.accepted);
    console.log('Rejected:', info.rejected);
  } catch (error) {
    console.error('\n❌ 邮件发送失败！');
    console.error('错误代码:', error.code);
    console.error('错误信息:', error.message);
    console.error('命令:', error.command);
    console.error('响应:', error.response);
    console.error('完整错误:', error);
  }
}

testEmail();
