import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// 创建 axios 实例
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器 - 添加认证令牌
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器 - 处理错误和令牌刷新
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 如果是 401 错误且不是刷新令牌请求
    if (error.response?.status === 401 && !originalRequest._retry) {
      const errorCode = error.response.data?.code;
      
      if (errorCode === 'TOKEN_EXPIRED') {
        originalRequest._retry = true;
        
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          if (!refreshToken) {
            throw new Error('No refresh token');
          }

          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });

          const { accessToken, refreshToken: newRefreshToken } = response.data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // 刷新失败，清除令牌并跳转到登录
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

// 认证相关 API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  refresh: (refreshToken) => api.post('/auth/refresh', { refreshToken }),
  // 发送验证码（邮箱）
  sendVerifyCode: (email) => api.post('/auth/send-code', { email }),
  // 验证码登录
  loginWithCode: (data) => api.post('/auth/login-with-code', data),
};

// 用户相关 API
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  updatePreferences: (data) => api.put('/users/preferences', data),
  getStats: () => api.get('/users/stats'),
  changePassword: (data) => api.put('/users/password', data),
};

// 美食相关 API
export const foodAPI = {
  getFoods: (params) => api.get('/foods', { params }),
  getFood: (id) => api.get(`/foods/${id}`),
  getCategories: () => api.get('/foods/categories'),
  search: (q, limit = 10) => api.get('/foods/search', { params: { q, limit } }),
  recommend: (params) => api.get('/foods/recommend', { params }),
};

// 收藏相关 API
export const favoriteAPI = {
  getFavorites: (params) => api.get('/favorites', { params }),
  addFavorite: (foodId) => api.post('/favorites', { foodId }),
  removeFavorite: (id) => api.delete(`/favorites/${id}`),
  checkFavorite: (foodId) => api.get(`/favorites/check/${foodId}`),
};

// 推荐相关 API
export const recommendationAPI = {
  getHistory: (params) => api.get('/recommendations/history', { params }),
  rate: (id, data) => api.post(`/recommendations/${id}/rate`, data),
  getStats: () => api.get('/recommendations/stats'),
};

// 游戏相关 API
export const gameAPI = {
  spin: (data) => api.post('/games/spin', data),
  dice: (data) => api.post('/games/dice', data),
  quiz: (data) => api.post('/games/quiz', data),
  getHistory: (params) => api.get('/games/history', { params }),
  getStats: () => api.get('/games/stats'),
};

// 统计相关 API
export const statsAPI = {
  // 获取用户统计
  getUserStats: () => api.get('/stats/user'),
  // 记录推荐
  recordRecommendation: (data) => api.post('/stats/recommendation', data),
  // 获取推荐历史
  getRecommendationHistory: () => api.get('/stats/recommendations'),
  // 记录挑战
  recordChallenge: (data) => api.post('/stats/challenge', data),
  // 获取挑战历史
  getChallengeHistory: () => api.get('/stats/challenges'),
};

export default api;
