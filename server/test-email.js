const { sendVerifyCodeEmail, generateVerifyCode } = require('./email');

async function testEmail() {
  const code = generateVerifyCode();
  console.log('生成的验证码:', code);
  
  // 请修改为你的真实邮箱地址进行测试
  const testEmail = process.argv[2] || 'test@example.com';
  console.log('发送测试邮件到:', testEmail);
  
  const result = await sendVerifyCodeEmail(testEmail, code);
  console.log('发送结果:', result);
}

testEmail();
