const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || 'https://rjafjjbvjrisyvmkutpv.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqYWZqamJ2anJpc3l2bWt1dHB2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjA5NjM4NCwiZXhwIjoyMDg3NjcyMzg0fQ.52j0mkmWZ5eGk-vmm7xi1M-BR3n3Zgkovm_UzdwY4E0';

const supabase = createClient(supabaseUrl, supabaseKey);

// 数据库操作封装
const dbOperations = {
  // 创建用户
  createUser: async (userData) => {
    const { id, email, nickname, avatar } = userData;
    const { data, error } = await supabase
      .from('users')
      .insert([{ id, email, nickname, avatar }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // 根据邮箱查找用户
  findUserByEmail: async (email) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  },

  // 根据ID查找用户
  findUserById: async (id) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  },

  // 保存验证码
  saveVerifyCode: async (email, code, expiresAt) => {
    // 先删除该邮箱的旧验证码
    await supabase
      .from('verify_codes')
      .delete()
      .eq('email', email);
    
    // 插入新验证码
    const { data, error } = await supabase
      .from('verify_codes')
      .insert([{ email, code, expires_at: expiresAt }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // 验证验证码
  verifyCode: async (email, code) => {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from('verify_codes')
      .select('*')
      .eq('email', email)
      .eq('code', code)
      .gt('expires_at', now)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  },

  // 删除验证码
  deleteVerifyCode: async (email) => {
    const { error } = await supabase
      .from('verify_codes')
      .delete()
      .eq('email', email);
    
    if (error) throw error;
    return { deleted: true };
  },

  // 清理过期验证码
  cleanExpiredCodes: async () => {
    const now = new Date().toISOString();
    const { error } = await supabase
      .from('verify_codes')
      .delete()
      .lt('expires_at', now);
    
    if (error) throw error;
    return { deleted: true };
  },

  // ========== 统计相关操作 ==========
  
  // 获取用户统计
  getUserStats: async (userId) => {
    const { data, error } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  },

  // 更新用户统计
  updateStats: async (userId, updates) => {
    // 先检查是否存在
    const { data: existing } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (existing) {
      // 更新现有记录
      const { data, error } = await supabase
        .from('user_stats')
        .update({
          total_recommendations: existing.total_recommendations + (updates.total_recommendations || 0),
          accepted_recommendations: existing.accepted_recommendations + (updates.accepted_recommendations || 0),
          challenges_completed: existing.challenges_completed + (updates.challenges_completed || 0),
          foods_explored: existing.foods_explored + (updates.foods_explored || 0),
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } else {
      // 创建新记录
      const { data, error } = await supabase
        .from('user_stats')
        .insert([{
          user_id: userId,
          total_recommendations: updates.total_recommendations || 0,
          accepted_recommendations: updates.accepted_recommendations || 0,
          challenges_completed: updates.challenges_completed || 0,
          foods_explored: updates.foods_explored || 0
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    }
  },

  // 添加推荐历史
  addRecommendation: async (userId, foodName, foodType, accepted, rating) => {
    const { data, error } = await supabase
      .from('recommendation_history')
      .insert([{
        user_id: userId,
        food_name: foodName,
        food_type: foodType,
        accepted: accepted,
        rating: rating
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // 获取推荐历史
  getRecommendationHistory: async (userId) => {
    const { data, error } = await supabase
      .from('recommendation_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // 添加挑战记录
  addChallenge: async (userId, challengeName, result) => {
    const { data, error } = await supabase
      .from('challenge_history')
      .insert([{
        user_id: userId,
        challenge_name: challengeName,
        result: result
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // 获取挑战历史
  getChallengeHistory: async (userId) => {
    const { data, error } = await supabase
      .from('challenge_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }
};

module.exports = { supabase, dbOperations };
