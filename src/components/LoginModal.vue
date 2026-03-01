<template>
  <div class="login-modal-overlay" v-if="show" @click.self="close">
    <div class="login-modal">
      <button class="close-btn" @click="close">×</button>
      
      <div class="login-header">
        <h2>{{ isRegister ? '注册账号' : '欢迎回来' }}</h2>
        <p>{{ isRegister ? '创建一个新账号' : '登录后享受更多功能' }}</p>
      </div>

      <form class="login-form" @submit.prevent="handleSubmit">
        <!-- 用户名输入 -->
        <div class="form-group">
          <label>用户名</label>
          <div class="input-wrapper">
            <span class="input-icon">👤</span>
            <input
              v-model="username"
              type="text"
              placeholder="请输入用户名（3-20个字符）"
              @input="validateUsername"
            />
          </div>
          <span class="error-msg" v-if="usernameError">{{ usernameError }}</span>
        </div>

        <!-- 昵称输入（仅注册时显示） -->
        <div class="form-group" v-if="isRegister">
          <label>昵称（可选）</label>
          <div class="input-wrapper">
            <span class="input-icon">🏷️</span>
            <input
              v-model="nickname"
              type="text"
              placeholder="请输入昵称"
            />
          </div>
        </div>

        <!-- 密码输入 -->
        <div class="form-group">
          <label>密码</label>
          <div class="input-wrapper">
            <span class="input-icon">🔒</span>
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="请输入密码（6-20个字符）"
              @input="validatePassword"
            />
            <span class="toggle-password" @click="showPassword = !showPassword">
              {{ showPassword ? '🙈' : '👁️' }}
            </span>
          </div>
          <span class="error-msg" v-if="passwordError">{{ passwordError }}</span>
        </div>

        <!-- 确认密码（仅注册时显示） -->
        <div class="form-group" v-if="isRegister">
          <label>确认密码</label>
          <div class="input-wrapper">
            <span class="input-icon">🔐</span>
            <input
              v-model="confirmPassword"
              :type="showPassword ? 'text' : 'password'"
              placeholder="请再次输入密码"
            />
          </div>
          <span class="error-msg" v-if="confirmPasswordError">{{ confirmPasswordError }}</span>
        </div>

        <!-- 提交按钮 -->
        <button
          type="submit"
          class="login-btn"
          :disabled="!canSubmit || loading"
        >
          <span v-if="loading" class="loading-spinner"></span>
          <span v-else>{{ isRegister ? '注 册' : '登 录' }}</span>
        </button>
      </form>

      <!-- 切换登录/注册 -->
      <div class="switch-mode">
        <p v-if="isRegister">
          已有账号？<a @click="switchMode">立即登录</a>
        </p>
        <p v-else>
          还没有账号？<a @click="switchMode">立即注册</a>
        </p>
      </div>

      <!-- 错误/成功提示 -->
      <div class="error-toast" v-if="message" :class="{ 'success': isSuccess }">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth.js'

const props = defineProps({
  show: Boolean
})

const emit = defineEmits(['close', 'success'])

const authStore = useAuthStore()

// 表单数据
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const nickname = ref('')
const usernameError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')
const message = ref('')
const isSuccess = ref(false)
const loading = ref(false)
const isRegister = ref(false)
const showPassword = ref(false)

// 验证用户名
const validateUsername = () => {
  if (username.value && (username.value.length < 3 || username.value.length > 20)) {
    usernameError.value = '用户名长度应为3-20个字符'
  } else {
    usernameError.value = ''
  }
}

// 验证密码
const validatePassword = () => {
  if (password.value && (password.value.length < 6 || password.value.length > 20)) {
    passwordError.value = '密码长度应为6-20个字符'
  } else {
    passwordError.value = ''
  }
}

// 是否可以提交
const canSubmit = computed(() => {
  const validUsername = username.value.length >= 3 && username.value.length <= 20
  const validPassword = password.value.length >= 6 && password.value.length <= 20
  
  if (isRegister.value) {
    const validConfirm = password.value === confirmPassword.value
    return validUsername && validPassword && validConfirm
  }
  
  return validUsername && validPassword
})

// 切换登录/注册模式
const switchMode = () => {
  isRegister.value = !isRegister.value
  // 清空表单
  username.value = ''
  password.value = ''
  confirmPassword.value = ''
  nickname.value = ''
  usernameError.value = ''
  passwordError.value = ''
  confirmPasswordError.value = ''
  message.value = ''
}

// 提交表单
const handleSubmit = async () => {
  if (!canSubmit.value || loading.value) return

  // 注册时验证确认密码
  if (isRegister.value && password.value !== confirmPassword.value) {
    confirmPasswordError.value = '两次输入的密码不一致'
    return
  }

  loading.value = true
  message.value = ''
  isSuccess.value = false

  try {
    let result
    
    if (isRegister.value) {
      // 注册
      result = await authStore.register({
        username: username.value,
        password: password.value,
        nickname: nickname.value || username.value
      })
    } else {
      // 登录
      result = await authStore.login({
        username: username.value,
        password: password.value
      })
    }

    if (result.success) {
      isSuccess.value = true
      message.value = isRegister.value ? '注册成功！' : '登录成功！'
      setTimeout(() => {
        emit('success')
        close()
      }, 1000)
    } else {
      message.value = result.error || (isRegister.value ? '注册失败' : '登录失败')
      setTimeout(() => message.value = '', 3000)
    }
  } catch (err) {
    message.value = isRegister.value ? '注册失败，请重试' : '登录失败，请检查用户名和密码'
    setTimeout(() => message.value = '', 3000)
  } finally {
    loading.value = false
  }
}

// 关闭弹窗
const close = () => {
  username.value = ''
  password.value = ''
  confirmPassword.value = ''
  nickname.value = ''
  usernameError.value = ''
  passwordError.value = ''
  confirmPasswordError.value = ''
  message.value = ''
  isRegister.value = false
  emit('close')
}
</script>

<style scoped>
.login-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.login-modal {
  background: white;
  border-radius: 24px;
  padding: 40px;
  width: 90%;
  max-width: 420px;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.2);
  transform: rotate(90deg);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-header h2 {
  font-size: 28px;
  font-weight: 800;
  color: #7C3AED;
  margin-bottom: 8px;
}

.login-header p {
  color: #666;
  font-size: 14px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: #f5f5f5;
  border-radius: 12px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.input-wrapper:focus-within {
  background: white;
  border-color: #7C3AED;
  box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.1);
}

.input-icon {
  font-size: 18px;
}

.input-wrapper input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 16px;
  outline: none;
  color: #333;
}

.input-wrapper input::placeholder {
  color: #999;
}

.toggle-password {
  cursor: pointer;
  font-size: 18px;
  user-select: none;
}

.error-msg {
  font-size: 12px;
  color: #ef4444;
}

.login-btn {
  padding: 16px;
  background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(124, 58, 237, 0.4);
}

.login-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.switch-mode {
  margin-top: 24px;
  text-align: center;
}

.switch-mode p {
  font-size: 14px;
  color: #666;
}

.switch-mode a {
  color: #7C3AED;
  cursor: pointer;
  font-weight: 600;
}

.switch-mode a:hover {
  text-decoration: underline;
}

.error-toast {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #ef4444;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  animation: slideDown 0.3s ease;
  white-space: nowrap;
}

.error-toast.success {
  background: #10b981;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@media (max-width: 480px) {
  .login-modal {
    padding: 32px 24px;
  }

  .login-header h2 {
    font-size: 24px;
  }
}
</style>
