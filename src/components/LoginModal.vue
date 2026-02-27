<template>
  <div class="login-modal-overlay" v-if="show" @click.self="close">
    <div class="login-modal">
      <button class="close-btn" @click="close">×</button>
      
      <div class="login-header">
        <h2>欢迎回来</h2>
        <p>登录后享受更多功能</p>
      </div>

      <form class="login-form" @submit.prevent="handleLogin">
        <!-- 邮箱输入 -->
        <div class="form-group">
          <label>邮箱</label>
          <div class="input-wrapper">
            <span class="input-icon">📧</span>
            <input
              v-model="email"
              type="email"
              placeholder="请输入邮箱"
              @input="validateEmail"
            />
          </div>
          <span class="error-msg" v-if="emailError">{{ emailError }}</span>
        </div>

        <!-- 验证码输入 -->
        <div class="form-group">
          <label>验证码</label>
          <div class="verify-wrapper">
            <div class="input-wrapper verify-input">
              <span class="input-icon">🔐</span>
              <input
                v-model="code"
                type="text"
                placeholder="请输入验证码"
                maxlength="6"
              />
            </div>
            <button
              type="button"
              class="send-code-btn"
              :disabled="!canSendCode || countdown > 0"
              @click="sendCode"
            >
              {{ countdown > 0 ? `${countdown}s后重发` : '获取验证码' }}
            </button>
          </div>
          <span class="error-msg" v-if="codeError">{{ codeError }}</span>
        </div>

        <!-- 登录按钮 -->
        <button
          type="submit"
          class="login-btn"
          :disabled="!canLogin || loading"
        >
          <span v-if="loading" class="loading-spinner"></span>
          <span v-else>登 录</span>
        </button>
      </form>

      <!-- 错误提示 -->
      <div class="error-toast" v-if="errorMsg">
        {{ errorMsg }}
      </div>

      <!-- 提示信息 -->
      <div class="login-tips">
        <p>💡 未注册的邮箱将自动创建账号</p>
        <p style="margin-top: 8px; font-size: 11px;">验证码将发送到您的邮箱</p>
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
const email = ref('')
const code = ref('')
const emailError = ref('')
const codeError = ref('')
const errorMsg = ref('')
const loading = ref(false)
const countdown = ref(0)

// 邮箱验证正则
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validateEmail = () => {
  if (email.value && !emailRegex.test(email.value)) {
    emailError.value = '请输入正确的邮箱地址'
  } else {
    emailError.value = ''
  }
}

// 是否可以发送验证码
const canSendCode = computed(() => {
  return emailRegex.test(email.value) && countdown.value === 0
})

// 是否可以登录
const canLogin = computed(() => {
  return emailRegex.test(email.value) && code.value.length === 6
})

// 发送验证码
const sendCode = async () => {
  if (!canSendCode.value) return

  try {
    const result = await authStore.sendVerifyCode(email.value)
    if (result.success) {
      // 开始倒计时
      countdown.value = 60
      const timer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
          clearInterval(timer)
        }
      }, 1000)
      
      // 提示用户查看邮箱
      errorMsg.value = '验证码已发送，请查看邮箱'
      setTimeout(() => errorMsg.value = '', 3000)
    } else {
      errorMsg.value = result.error || '发送失败，请重试'
      setTimeout(() => errorMsg.value = '', 3000)
    }
  } catch (err) {
    errorMsg.value = '网络错误，请重试'
    setTimeout(() => errorMsg.value = '', 3000)
  }
}

// 登录
const handleLogin = async () => {
  if (!canLogin.value || loading.value) return

  loading.value = true
  errorMsg.value = ''

  try {
    const result = await authStore.loginWithCode({
      email: email.value,
      code: code.value
    })

    if (result.success) {
      emit('success')
      close()
    } else {
      errorMsg.value = result.error || '登录失败，请重试'
      setTimeout(() => errorMsg.value = '', 3000)
    }
  } catch (err) {
    errorMsg.value = '登录失败，请检查验证码'
    setTimeout(() => errorMsg.value = '', 3000)
  } finally {
    loading.value = false
  }
}

// 关闭弹窗
const close = () => {
  email.value = ''
  code.value = ''
  emailError.value = ''
  codeError.value = ''
  errorMsg.value = ''
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

.verify-wrapper {
  display: flex;
  gap: 12px;
}

.verify-input {
  flex: 1;
}

.send-code-btn {
  padding: 14px 20px;
  background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  min-width: 120px;
}

.send-code-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(124, 58, 237, 0.4);
}

.send-code-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
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

.error-toast {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #10b981;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  animation: slideDown 0.3s ease;
  white-space: nowrap;
}

.error-toast[style*="background: #ef4444"] {
  background: #ef4444 !important;
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

.login-tips {
  margin-top: 24px;
  text-align: center;
}

.login-tips p {
  font-size: 12px;
  color: #999;
}

@media (max-width: 480px) {
  .login-modal {
    padding: 32px 24px;
  }

  .login-header h2 {
    font-size: 24px;
  }

  .verify-wrapper {
    flex-direction: column;
  }

  .send-code-btn {
    width: 100%;
  }
}
</style>