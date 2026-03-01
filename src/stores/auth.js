import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { authAPI } from '../services/api.js';

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null);
  const accessToken = ref(localStorage.getItem('accessToken') || null);
  const refreshToken = ref(localStorage.getItem('refreshToken') || null);
  const loading = ref(false);
  const error = ref(null);

  // Getters
  const isAuthenticated = computed(() => !!accessToken.value && !!user.value);
  const userNickname = computed(() => user.value?.nickname || user.value?.username || '访客');
  const userAvatar = computed(() => user.value?.avatar || null);
  const userEmail = computed(() => user.value?.email || null);
  const userUsername = computed(() => user.value?.username || null);

  // 设置令牌
  const setTokens = (tokens) => {
    accessToken.value = tokens.accessToken;
    refreshToken.value = tokens.refreshToken;
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  };

  // 清除令牌
  const clearTokens = () => {
    accessToken.value = null;
    refreshToken.value = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  // 初始化时获取当前用户
  const initAuth = async () => {
    if (accessToken.value) {
      try {
        const response = await authAPI.getProfile();
        user.value = response.data.user;
      } catch (err) {
        clearTokens();
      }
    }
  };

  // 发送验证码
  const sendVerifyCode = async (email) => {
    loading.value = true;
    error.value = null;
    
    try {
      const result = await authAPI.sendVerifyCode(email);
      if (result.data.success) {
        return { success: true };
      } else {
        return { success: false, error: result.data.error };
      }
    } catch (err) {
      return { success: false, error: '发送验证码失败，请重试' };
    } finally {
      loading.value = false;
    }
  };

  // 验证码登录
  const loginWithCode = async ({ email, code }) => {
    loading.value = true;
    error.value = null;
    
    try {
      const result = await authAPI.loginWithCode({ email, code });
      
      if (result.data.success) {
        user.value = result.data.user;
        setTokens({
          accessToken: result.data.accessToken,
          refreshToken: result.data.refreshToken,
        });
        return { success: true };
      } else {
        return { success: false, error: result.data.error };
      }
    } catch (err) {
      return { success: false, error: '登录失败，请检查验证码' };
    } finally {
      loading.value = false;
    }
  };

  // 退出登录
  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      // 忽略错误
    } finally {
      user.value = null;
      clearTokens();
    }
  };

  // 更新用户资料
  const updateProfile = async (data) => {
    loading.value = true;
    error.value = null;
    
    try {
      const result = await authAPI.updateProfile(data);
      if (result.data.success) {
        user.value = { ...user.value, ...result.data.user };
        return { success: true };
      } else {
        return { success: false, error: result.data.error };
      }
    } catch (err) {
      return { success: false, error: '更新失败' };
    } finally {
      loading.value = false;
    }
  };

  // 用户注册
  const register = async ({ username, password, nickname }) => {
    loading.value = true;
    error.value = null;

    try {
      const result = await authAPI.register({ username, password, nickname });

      if (result.data.success) {
        user.value = result.data.user;
        setTokens({
          accessToken: result.data.accessToken,
          refreshToken: result.data.refreshToken,
        });
        return { success: true };
      } else {
        return { success: false, error: result.data.error };
      }
    } catch (err) {
      return { success: false, error: '注册失败，请重试' };
    } finally {
      loading.value = false;
    }
  };

  // 用户登录
  const login = async ({ username, password }) => {
    loading.value = true;
    error.value = null;

    try {
      const result = await authAPI.login({ username, password });

      if (result.data.success) {
        user.value = result.data.user;
        setTokens({
          accessToken: result.data.accessToken,
          refreshToken: result.data.refreshToken,
        });
        return { success: true };
      } else {
        return { success: false, error: result.data.error };
      }
    } catch (err) {
      return { success: false, error: '登录失败，请检查用户名和密码' };
    } finally {
      loading.value = false;
    }
  };

  // 初始化
  initAuth();

  return {
    user,
    accessToken,
    refreshToken,
    loading,
    error,
    isAuthenticated,
    userNickname,
    userAvatar,
    userEmail,
    userUsername,
    sendVerifyCode,
    loginWithCode,
    register,
    login,
    logout,
    updateProfile,
  };
});
