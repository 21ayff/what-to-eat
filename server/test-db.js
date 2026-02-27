// 测试 Supabase 数据库连接和操作
const { dbOperations, supabase } = require('./supabase-db');
const { v4: uuidv4 } = require('uuid');

async function runTests() {
  console.log('🧪 开始测试 Supabase 数据库...\n');

  try {
    // 测试 1: 创建用户
    console.log('测试 1: 创建用户');
    const testUser = {
      id: uuidv4(),
      email: 'test@example.com',
      nickname: '测试用户',
      avatar: null
    };
    
    try {
      const user = await dbOperations.createUser(testUser);
      console.log('✅ 创建用户成功:', user.email);
    } catch (err) {
      if (err.code === '23505') {
        console.log('⚠️ 用户已存在，跳过创建');
      } else {
        throw err;
      }
    }

    // 测试 2: 根据邮箱查找用户
    console.log('\n测试 2: 根据邮箱查找用户');
    const foundUser = await dbOperations.findUserByEmail('test@example.com');
    if (foundUser) {
      console.log('✅ 查找用户成功:', foundUser.email);
    } else {
      console.log('❌ 未找到用户');
    }

    // 测试 3: 根据 ID 查找用户
    console.log('\n测试 3: 根据 ID 查找用户');
    const foundById = await dbOperations.findUserById(testUser.id);
    if (foundById) {
      console.log('✅ 根据 ID 查找成功:', foundById.id);
    } else {
      console.log('❌ 未找到用户');
    }

    // 测试 4: 保存验证码
    console.log('\n测试 4: 保存验证码');
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();
    const verifyCode = await dbOperations.saveVerifyCode('test@example.com', '123456', expiresAt);
    console.log('✅ 保存验证码成功');

    // 测试 5: 验证验证码
    console.log('\n测试 5: 验证验证码');
    const isValid = await dbOperations.verifyCode('test@example.com', '123456');
    if (isValid) {
      console.log('✅ 验证码验证成功');
    } else {
      console.log('❌ 验证码验证失败');
    }

    // 测试 6: 删除验证码
    console.log('\n测试 6: 删除验证码');
    await dbOperations.deleteVerifyCode('test@example.com');
    console.log('✅ 删除验证码成功');

    // 测试 7: 再次验证（应该失败）
    console.log('\n测试 7: 再次验证已删除的验证码');
    const isValidAfterDelete = await dbOperations.verifyCode('test@example.com', '123456');
    if (!isValidAfterDelete) {
      console.log('✅ 已删除的验证码验证失败（符合预期）');
    } else {
      console.log('❌ 已删除的验证码验证成功（不符合预期）');
    }

    // 测试 8: 查询所有用户
    console.log('\n测试 8: 查询所有用户');
    const { data: allUsers, error } = await supabase.from('users').select('*');
    if (error) throw error;
    console.log('✅ 查询所有用户成功，共', allUsers.length, '条记录');
    console.log('用户列表:', allUsers.map(u => ({ email: u.email, nickname: u.nickname })));

    console.log('\n✨ 所有测试通过！Supabase 数据库工作正常。');

  } catch (error) {
    console.error('\n❌ 测试失败:', error.message);
    console.error(error);
    process.exit(1);
  }
}

runTests();
