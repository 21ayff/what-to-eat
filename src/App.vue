<template>
  <div class="app">
    <!-- 活力橙黄背景 -->
    <div class="orange-bg"></div>
    
    <!-- 头部导航 -->
    <header class="header">
      <div class="header-content">
        <div class="logo">
          <span class="logo-icon">🍽️</span>
          <span class="logo-text">今天吃什么</span>
        </div>
        <nav class="nav">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="nav-btn"
            :class="{ active: currentTab === tab.id }"
            @click="currentTab = tab.id"
          >
            {{ tab.name }}
          </button>
          <!-- 未登录时显示受限功能的提示按钮 -->
          <template v-if="!authStore.isAuthenticated">
            <button
              v-for="tab in restrictedTabs"
              :key="tab.id"
              class="nav-btn nav-btn-disabled"
              @click="showLoginRequired(tab.name)"
            >
              {{ tab.name }}
              <span class="lock-icon">🔒</span>
            </button>
          </template>
          <!-- 登录/用户按钮 -->
          <button
            v-if="!authStore.isAuthenticated"
            class="nav-btn login-nav-btn"
            @click="openLogin"
          >
            登录
          </button>
          <div v-else class="user-menu">
            <span class="user-name">{{ authStore.userNickname }}</span>
            <button class="nav-btn" @click="authStore.logout">退出</button>
          </div>
        </nav>
      </div>
    </header>
    
    <!-- 主内容区 -->
    <main class="main">
      <!-- Hero区域 -->
      <section v-if="currentTab === 'recommend'" class="hero-section">
        <div class="hero-content">
          <div class="hero-left">
            <h1 class="hero-title">
              What<br>
              To<br>
              <span class="highlight">Eat</span>
            </h1>
            <p class="hero-subtitle">
              探索超过216道精选美食，让每一餐都成为艺术体验
            </p>
            <div class="hero-buttons">
              <button class="btn btn-primary" @click="scrollToRecommend">
                开始探索
              </button>
              <button class="btn btn-secondary" @click="currentTab = 'gallery'">
                美食图鉴
              </button>
            </div>
          </div>
          <div class="hero-right">
            <div class="food-showcase">
              <div class="showcase-item item-1">
                <img src="https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=500&fit=crop" alt="意大利面" class="showcase-img">
              </div>
              <div class="showcase-item item-2">
                <img src="https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=300&h=400&fit=crop" alt="华夫薯条" class="showcase-img">
              </div>
              <div class="showcase-item item-3">
                <img src="https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=350&h=350&fit=crop" alt="三明治" class="showcase-img">
              </div>
            </div>
          </div>
        </div>

      </section>

      <!-- 推荐流程 -->
      <section v-if="currentTab === 'recommend'" class="recommend-section" id="recommend">
        <div class="section-header">
          <h2 class="section-title">
            <span class="title-highlight">智能推荐</span>
          </h2>
          <p class="section-subtitle">Based on your preferences, we recommend the most suitable food for you</p>
        </div>

        <div class="recommend-flow">
          <div v-if="step === 'select'" class="select-step">
            <div class="preferences-grid">
              <ScenarioSelector
                v-for="(scenario, key) in scenarios"
                :key="key"
                :scenario="scenario"
                v-model="preferences[key]"
              />
            </div>
            <button class="recommend-btn" @click="getRecommendation">
              <span>✨</span> 获取推荐
            </button>
          </div>

          <div v-else-if="step === 'loading'" class="loading-step">
            <div class="loading-animation">
              <span class="loading-emoji">🍽️</span>
            </div>
            <p class="loading-text">正在分析你的口味...</p>
          </div>

          <div v-else-if="step === 'result'" class="result-step">
            <FoodCard :food="recommendedFood" @findRestaurants="openRestaurantList" featured />
            <div class="result-actions">
              <button class="action-btn primary" @click="acceptRecommendation">
                😋 就吃这个！
              </button>
              <button class="action-btn secondary" @click="getAnother">
                🔄 换一个
              </button>
              <button class="action-btn secondary" @click="reset">
                🔙 重新选择
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 热门美食 -->
      <section v-if="currentTab === 'recommend'" class="popular-section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="title-highlight">Find Popular</span> Food
          </h2>
        </div>
        <div class="food-scroll">
          <FoodCard
            v-for="food in popularFoods"
            :key="food.id"
            :food="food"
            class="scroll-card"
            @findRestaurants="openRestaurantList"
          />
        </div>
      </section>

      <!-- 趣味游戏 -->
      <section v-if="currentTab === 'games'" class="games-section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="title-highlight">趣味游戏</span>
          </h2>
        </div>
        <div class="game-tabs">
          <button
            v-for="game in gameList"
            :key="game.id"
            class="game-tab"
            :class="{ active: currentGame === game.id }"
            @click="currentGame = game.id"
          >
            <span class="tab-icon">{{ game.icon }}</span>
            <span class="tab-name">{{ game.name }}</span>
          </button>
        </div>
        <div class="game-content">
          <RouletteGame v-if="currentGame === 'roulette'" />
          <DiceGame v-if="currentGame === 'dice'" />
          <QuickPick v-if="currentGame === 'quick'" />
        </div>
      </section>

      <!-- 美食图鉴 -->
      <section v-if="currentTab === 'gallery'" class="gallery-section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="title-highlight">美食图鉴</span>
          </h2>
        </div>
        
        <!-- 搜索栏 -->
        <div class="gallery-search-bar">
          <span class="search-icon">🔍</span>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="搜索美食名称..." 
            class="search-input"
          >
        </div>
        
        <div class="filter-bar">
          <button
            class="filter-btn"
            :class="{ active: selectedCategory === 'all' }"
            @click="selectedCategory = 'all'"
          >
            全部
          </button>
          <button
            v-for="cat in categories"
            :key="cat"
            class="filter-btn"
            :class="{ active: selectedCategory === cat }"
            @click="selectedCategory = cat"
          >
            {{ cat }}
          </button>
        </div>
        <div class="food-grid">
          <FoodCard
            v-for="food in filteredFoods"
            :key="food.id"
            :food="food"
            @findRestaurants="openRestaurantList"
          />
        </div>
      </section>

      <!-- 我的 -->
      <section v-if="currentTab === 'profile'" class="profile-section">
        <div class="profile-header">
          <div class="avatar">😋</div>
          <h2>美食探险家</h2>
          <p>已探索 {{ exploredCount }} 种美食</p>
        </div>
        <div class="stats-grid">
          <div class="stat-card" @click="showStatDetail('total')">
            <span class="stat-number">{{ stats.total }}</span>
            <span class="stat-label">总推荐</span>
          </div>
          <div class="stat-card" @click="showStatDetail('accepted')">
            <span class="stat-number">{{ stats.accepted }}</span>
            <span class="stat-label">已接受</span>
          </div>
          <div class="stat-card" @click="showStatDetail('challenges')">
            <span class="stat-number">{{ stats.challenges }}</span>
            <span class="stat-label">完成挑战</span>
          </div>
        </div>
      </section>
    </main>

    <!-- 底部 -->
    <footer class="footer">
      <p>今天吃什么 - 让每一餐都充满期待 ❤️</p>
    </footer>

    <!-- 餐厅列表弹窗 -->
    <RestaurantList
      :show="showRestaurantList"
      :food="selectedFood"
      @close="closeRestaurantList"
    />

    <!-- 登录弹窗 -->
    <LoginModal
      :show="showLoginModal"
      @close="closeLogin"
      @success="onLoginSuccess"
    />

    <!-- 登录提示弹窗 -->
    <div class="login-prompt-overlay" v-if="showLoginPrompt" @click.self="showLoginPrompt = false">
      <div class="login-prompt-modal">
        <div class="prompt-icon">🔒</div>
        <h3>需要登录</h3>
        <p>{{ loginPromptMessage }}</p>
        <div class="prompt-buttons">
          <button class="btn btn-secondary" @click="showLoginPrompt = false">稍后再说</button>
          <button class="btn btn-primary" @click="showLoginPrompt = false; openLogin()">立即登录</button>
        </div>
      </div>
    </div>

    <!-- 统计详情弹窗 -->
    <div class="stat-modal-overlay" v-if="showStatModal" @click.self="showStatModal = false">
      <div class="stat-modal">
        <div class="stat-modal-header">
          <h3>{{ statModalTitle }}</h3>
          <button class="close-btn" @click="showStatModal = false">×</button>
        </div>
        <div class="stat-modal-content">
          <!-- 推荐历史 -->
          <div v-if="currentStatType === 'total'" class="stat-list">
            <div v-for="(item, index) in statData.total" :key="index" class="stat-item">
              <div class="stat-item-info">
                <span class="stat-item-name">{{ item.name }}</span>
                <span class="stat-item-type">{{ item.type }}</span>
              </div>
              <span class="stat-item-date">{{ item.date }}</span>
            </div>
          </div>
          
          <!-- 已接受的美食 -->
          <div v-if="currentStatType === 'accepted'" class="stat-list">
            <div v-for="(item, index) in statData.accepted" :key="index" class="stat-item">
              <div class="stat-item-info">
                <span class="stat-item-name">{{ item.name }}</span>
                <span class="stat-item-rating">
                  <span v-for="n in item.rating" :key="n">⭐</span>
                </span>
              </div>
              <span class="stat-item-date">{{ item.date }}</span>
            </div>
          </div>
          
          <!-- 完成的挑战 -->
          <div v-if="currentStatType === 'challenges'" class="stat-list">
            <div v-for="(item, index) in statData.challenges" :key="index" class="stat-item">
              <div class="stat-item-info">
                <span class="stat-item-name">{{ item.name }}</span>
                <span class="stat-item-result" :class="{ success: item.result === '成功', fail: item.result === '失败' }">
                  {{ item.result }}
                </span>
              </div>
              <span class="stat-item-date">{{ item.date }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { foods, scenarios, recommendationQuotes } from './data/foods.js'
import { useAuthStore } from './stores/auth.js'
import { statsAPI } from './services/api.js'
import FoodCard from './components/FoodCard.vue'
import ScenarioSelector from './components/ScenarioSelector.vue'
import RouletteGame from './components/RouletteGame.vue'
import DiceGame from './components/DiceGame.vue'
import QuickPick from './components/QuickPick.vue'
import RestaurantList from './components/RestaurantList.vue'
import LoginModal from './components/LoginModal.vue'

const authStore = useAuthStore()

// 所有标签页
const allTabs = [
  { id: 'recommend', name: '首页', requireAuth: false },
  { id: 'games', name: '游戏', requireAuth: true },
  { id: 'gallery', name: '图鉴', requireAuth: true },
  { id: 'profile', name: '我的', requireAuth: true }
]

// 根据登录状态显示不同的标签页
const tabs = computed(() => {
  return allTabs.filter(tab => !tab.requireAuth || authStore.isAuthenticated)
})

// 未登录时显示的受限标签页
const restrictedTabs = computed(() => {
  return allTabs.filter(tab => tab.requireAuth && !authStore.isAuthenticated)
})

const currentTab = ref('recommend')

const step = ref('select')
const preferences = ref({
  mealTime: '',
  mood: '',
  weather: '',
  diningAlone: '',
  flavor: '',
  budget: '',
  health: ''
})

const recommendedFood = ref(null)
const currentQuote = ref('')

const gameList = [
  { id: 'roulette', name: '美食转盘', icon: '🎯' },
  { id: 'dice', name: '骰子挑战', icon: '🎲' },
  { id: 'quick', name: '快问快答', icon: '⚡' }
]
const currentGame = ref('roulette')

const selectedCategory = ref('all')
const categories = ['中式', '西式', '日式', '韩式', '其他']
const searchQuery = ref('')

const filteredFoods = computed(() => {
  let result = foods
  
  // 搜索过滤
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(f => 
      f.name.toLowerCase().includes(query) || 
      f.description.toLowerCase().includes(query) ||
      f.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }
  
  // 分类过滤
  if (selectedCategory.value !== 'all') {
    result = result.filter(f => f.category === selectedCategory.value || f.tags.includes(selectedCategory.value))
  }
  return result
})

const popularFoods = computed(() => foods.slice(0, 5))

// 统计数据
const exploredCount = ref(0)
const stats = ref({ total: 0, accepted: 0, challenges: 0 })

// 统计数据详情
const showStatModal = ref(false)
const currentStatType = ref('')
const statModalTitle = computed(() => {
  const titles = {
    total: '推荐历史',
    accepted: '已接受的美食',
    challenges: '完成的挑战'
  }
  return titles[currentStatType.value] || ''
})

// 从数据库加载的统计数据
const statData = ref({
  total: [],
  accepted: [],
  challenges: []
})

// 加载用户统计
const loadUserStats = async () => {
  if (!authStore.isAuthenticated) return
  
  try {
    const response = await statsAPI.getUserStats()
    if (response.data.success) {
      const userStats = response.data.stats
      stats.value.total = userStats.total_recommendations || 0
      stats.value.accepted = userStats.accepted_recommendations || 0
      stats.value.challenges = userStats.challenges_completed || 0
      exploredCount.value = userStats.foods_explored || 0
    }
  } catch (error) {
    console.error('加载统计数据失败:', error)
  }
}

// 加载统计详情
const loadStatDetail = async (type) => {
  if (!authStore.isAuthenticated) return
  
  try {
    if (type === 'total' || type === 'accepted') {
      const response = await statsAPI.getRecommendationHistory()
      if (response.data.success) {
        const history = response.data.history
        statData.value.total = history.map(item => ({
          name: item.food_name,
          date: new Date(item.created_at).toLocaleDateString('zh-CN'),
          type: item.food_type || '其他'
        }))
        statData.value.accepted = history
          .filter(item => item.accepted)
          .map(item => ({
            name: item.food_name,
            date: new Date(item.created_at).toLocaleDateString('zh-CN'),
            rating: item.rating || 5
          }))
      }
    } else if (type === 'challenges') {
      const response = await statsAPI.getChallengeHistory()
      if (response.data.success) {
        statData.value.challenges = response.data.history.map(item => ({
          name: item.challenge_name,
          date: new Date(item.created_at).toLocaleDateString('zh-CN'),
          result: item.result
        }))
      }
    }
  } catch (error) {
    console.error('加载统计详情失败:', error)
  }
}

const showStatDetail = async (type) => {
  currentStatType.value = type
  showStatModal.value = true
  // 加载统计详情
  await loadStatDetail(type)
}

const scrollToRecommend = () => {
  document.getElementById('recommend')?.scrollIntoView({ behavior: 'smooth' })
}

const getRecommendation = () => {
  step.value = 'loading'
  currentQuote.value = recommendationQuotes[Math.floor(Math.random() * recommendationQuotes.length)]
  
  setTimeout(() => {
    recommendedFood.value = foods[Math.floor(Math.random() * foods.length)]
    step.value = 'result'
  }, 2000)
}

const getAnother = () => getRecommendation()

const acceptRecommendation = async () => {
  // 更新本地统计
  stats.value.accepted++
  
  // 如果用户已登录，保存到后端
  if (authStore.isAuthenticated && recommendedFood.value) {
    try {
      await statsAPI.recordRecommendation({
        foodName: recommendedFood.value.name,
        foodType: recommendedFood.value.category,
        accepted: true,
        rating: 5
      })
      // 重新加载统计数据
      await loadUserStats()
    } catch (error) {
      console.error('保存推荐记录失败:', error)
    }
  }
  
  alert(`太棒了！去享用${recommendedFood.value.name}吧！😋`)
}

const reset = () => {
  step.value = 'select'
  preferences.value = { mealTime: '', mood: '', weather: '', diningAlone: '', flavor: '', budget: '', health: '' }
}

const showRestaurantList = ref(false)
const selectedFood = ref(null)

const openRestaurantList = (food) => {
  selectedFood.value = food
  showRestaurantList.value = true
}

const closeRestaurantList = () => {
  showRestaurantList.value = false
  selectedFood.value = null
}

// 登录相关
const showLoginModal = ref(false)
const showLoginPrompt = ref(false)
const loginPromptMessage = ref('')

const openLogin = () => {
  showLoginModal.value = true
}

const closeLogin = () => {
  showLoginModal.value = false
  showLoginPrompt.value = false
}

const onLoginSuccess = async () => {
  // 登录成功后的处理
  console.log('登录成功')
  showLoginPrompt.value = false
  // 加载用户统计数据
  await loadUserStats()
}

// 监听登录状态变化
watch(() => authStore.isAuthenticated, (isAuthenticated) => {
  if (isAuthenticated) {
    loadUserStats()
  }
})

// 页面加载时尝试加载统计数据
onMounted(() => {
  if (authStore.isAuthenticated) {
    loadUserStats()
  }
})

// 显示登录提示
const showLoginRequired = (featureName) => {
  loginPromptMessage.value = `使用"${featureName}"功能需要登录，是否立即登录？`
  showLoginPrompt.value = true
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.app {
  min-height: 100vh;
  position: relative;
  background: #FFA500;
}

/* 橙黄背景 */
.orange-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #FFB347 0%, #FFA500 50%, #FF8C00 100%);
  z-index: 0;
}

/* 头部导航 */
.header {
  position: relative;
  z-index: 100;
  padding: 20px 40px;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  font-size: 32px;
}

.logo-text {
  font-size: 24px;
  font-weight: 800;
  color: #7C3AED;
}

.nav {
  display: flex;
  gap: 8px;
}

.nav-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  background: transparent;
  color: #7C3AED;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background: rgba(124, 58, 237, 0.1);
}

.nav-btn.active {
  background: #7C3AED;
  color: white;
}

.nav-btn.login-nav-btn {
  background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(124, 58, 237, 0.4);
}

.nav-btn.login-nav-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(124, 58, 237, 0.5);
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 8px;
  padding-left: 16px;
  border-left: 1px solid rgba(124, 58, 237, 0.2);
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: #7C3AED;
}

/* 主内容 */
.main {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px 60px;
}

/* Hero区域 */
.hero-section {
  padding: 60px 0;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  margin-bottom: 60px;
}

.hero-title {
  font-family: 'Playfair Display', 'Noto Sans SC', serif;
  font-size: 85px;
  font-weight: 900;
  color: #7C3AED;
  line-height: 0.9;
  margin-bottom: 24px;
  text-transform: uppercase;
  letter-spacing: -3px;
  transform: rotate(-2deg);
  position: relative;
  font-style: italic;
}

.hero-title .highlight {
  font-family: 'Playfair Display', 'Noto Sans SC', serif;
  color: white;
  text-shadow: 
    4px 4px 0 #7C3AED,
    8px 8px 0 rgba(124, 58, 237, 0.2);
  display: inline-block;
  transform: rotate(4deg) scale(1.15);
  margin-left: 15px;
  font-style: normal;
}

.hero-title::before {
  content: '';
  position: absolute;
  top: -10px;
  left: -20px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #FFD700, #FFA500);
  border-radius: 50%;
  z-index: -1;
  opacity: 0.8;
}



.hero-subtitle {
  font-size: 18px;
  color: white;
  margin-bottom: 32px;
  max-width: 400px;
  font-weight: 500;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.hero-buttons {
  display: flex;
  gap: 16px;
}

.btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
  color: white;
  box-shadow: 0 4px 20px rgba(124, 58, 237, 0.4);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(124, 58, 237, 0.5);
}

.btn-secondary {
  background: white;
  color: #7C3AED;
  border: 2px solid #7C3AED;
}

.btn-secondary:hover {
  background: #7C3AED;
  color: white;
}

/* 美食展示 */
.hero-right {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.food-showcase {
  position: relative;
  width: 500px;
  height: 450px;
}

.showcase-item {
  position: absolute;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.showcase-item:hover {
  transform: scale(1.05) rotate(0deg) !important;
  z-index: 10;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
}

/* 左侧大图 - 意大利面 */
.showcase-item.item-1 {
  width: 260px;
  height: 380px;
  left: 0;
  top: 20px;
  transform: rotate(-3deg);
  z-index: 3;
}

/* 右上 - 华夫薯条 */
.showcase-item.item-2 {
  width: 200px;
  height: 260px;
  right: 20px;
  top: 0;
  transform: rotate(5deg);
  z-index: 2;
}

/* 右下 - 三明治 */
.showcase-item.item-3 {
  width: 180px;
  height: 180px;
  right: 40px;
  bottom: 20px;
  transform: rotate(-8deg);
  z-index: 1;
}

.showcase-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* 区块标题 */
.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-title {
  font-size: 48px;
  font-weight: 900;
  color: #7C3AED;
  margin-bottom: 12px;
}

.title-highlight {
  color: white;
  text-shadow: 2px 2px 0 #7C3AED;
}

.section-subtitle {
  font-size: 16px;
  color: white;
  font-weight: 500;
  text-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

/* 推荐区域 */
.recommend-section {
  padding: 60px 0;
}

.preferences-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.recommend-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 20px;
  background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 30px rgba(124, 58, 237, 0.4);
}

.recommend-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(124, 58, 237, 0.5);
}

/* 加载动画 */
.loading-step {
  text-align: center;
  padding: 80px 0;
}

.loading-animation {
  margin-bottom: 24px;
}

.loading-emoji {
  font-size: 80px;
  animation: bounce 1s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.loading-text {
  font-size: 24px;
  font-weight: 700;
  color: #7C3AED;
}

/* 结果区域 */
.result-step {
  text-align: center;
}

.result-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 32px;
  flex-wrap: wrap;
}

.action-btn {
  padding: 16px 32px;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn.primary {
  background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
  color: white;
  box-shadow: 0 4px 20px rgba(124, 58, 237, 0.4);
}

.action-btn.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(124, 58, 237, 0.5);
}

.action-btn.secondary {
  background: white;
  color: #7C3AED;
  border: 2px solid #7C3AED;
}

.action-btn.secondary:hover {
  background: #7C3AED;
  color: white;
}

/* 热门区域 */
.popular-section {
  padding: 60px 0;
}

.food-scroll {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding: 20px 0;
  scroll-snap-type: x mandatory;
}

.food-scroll::-webkit-scrollbar {
  height: 8px;
}

.food-scroll::-webkit-scrollbar-track {
  background: rgba(124, 58, 237, 0.1);
  border-radius: 4px;
}

.food-scroll::-webkit-scrollbar-thumb {
  background: #7C3AED;
  border-radius: 4px;
}

.scroll-card {
  scroll-snap-align: start;
  flex-shrink: 0;
}

/* 游戏区域 */
.games-section {
  padding: 60px 0;
}

.game-tabs {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 32px;
}

.game-tab {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 28px;
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(255, 140, 66, 0.3);
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.game-tab:hover {
  background: rgba(255, 140, 66, 0.2);
  border-color: rgba(255, 140, 66, 0.6);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 140, 66, 0.3);
}

.game-tab.active {
  background: linear-gradient(135deg, #FF8C42 0%, #FF6B35 100%);
  border-color: transparent;
  color: white;
  box-shadow: 0 8px 25px rgba(255, 140, 66, 0.5);
}

.game-tab .tab-icon {
  font-size: 20px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
}

.game-tab.active .tab-icon {
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}

.game-content {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* 图鉴区域 */
.gallery-section {
  padding: 60px 0;
}

.filter-bar {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

/* 图鉴搜索栏 */
.gallery-search-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 500px;
  margin: 0 auto 32px;
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  transition: all 0.3s ease;
}

.gallery-search-bar:focus-within {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(124, 58, 237, 0.5);
  box-shadow: 0 8px 30px rgba(124, 58, 237, 0.2);
}

.gallery-search-bar .search-icon {
  font-size: 20px;
  opacity: 0.8;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 16px;
  color: white;
  outline: none;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.filter-btn {
  padding: 12px 24px;
  background: white;
  border: 2px solid #7C3AED;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  color: #7C3AED;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(124, 58, 237, 0.2);
}

.filter-btn.active {
  background: #7C3AED;
  color: white;
}

.food-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 32px;
}

/* 个人中心 */
.profile-section {
  padding: 60px 0;
}

.profile-header {
  text-align: center;
  margin-bottom: 48px;
}

.avatar {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  margin: 0 auto 20px;
  box-shadow: 0 10px 40px rgba(124, 58, 237, 0.4);
}

.profile-header h2 {
  font-size: 32px;
  font-weight: 800;
  color: #7C3AED;
  margin-bottom: 8px;
}

.profile-header p {
  color: rgba(0, 0, 0, 0.6);
  font-size: 16px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.stat-card {
  background: white;
  border-radius: 20px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 50px rgba(124, 58, 237, 0.25);
}

.stat-card:active {
  transform: translateY(-2px);
}

.stat-number {
  display: block;
  font-size: 48px;
  font-weight: 900;
  color: #7C3AED;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

/* 底部 */
.footer {
  text-align: center;
  padding: 40px;
  background: #7C3AED;
}

.footer p {
  color: white;
  font-size: 14px;
}

/* 响应式 */
@media (max-width: 968px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-title {
    font-size: 48px;
  }

  .hero-subtitle {
    margin: 0 auto 32px;
  }

  .hero-buttons {
    justify-content: center;
  }

  .hero-right {
    order: -1;
  }

  .food-showcase {
    transform: scale(0.8);
  }

  .search-bar {
    flex-direction: column;
    gap: 20px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .header {
    padding: 16px 20px;
  }

  .main {
    padding: 0 20px 40px;
  }

  .hero-title {
    font-size: 36px;
  }

  .section-title {
    font-size: 32px;
  }

  .game-tabs {
    flex-direction: column;
  }

  .food-grid {
    grid-template-columns: 1fr;
  }
}

/* 导航按钮 - 禁用状态 */
.nav-btn-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: rgba(255, 255, 255, 0.3) !important;
  color: rgba(255, 255, 255, 0.8) !important;
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav-btn-disabled:hover {
  transform: none !important;
  box-shadow: none !important;
}

.lock-icon {
  font-size: 12px;
}

/* 登录提示弹窗 */
.login-prompt-overlay {
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
  z-index: 1001;
  animation: fadeIn 0.3s ease;
}

.login-prompt-modal {
  background: white;
  border-radius: 24px;
  padding: 40px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
}

.prompt-icon {
  font-size: 60px;
  margin-bottom: 20px;
}

.login-prompt-modal h3 {
  font-size: 24px;
  font-weight: 800;
  color: #7C3AED;
  margin-bottom: 12px;
}

.login-prompt-modal p {
  color: #666;
  font-size: 16px;
  margin-bottom: 32px;
  line-height: 1.6;
}

.prompt-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.prompt-buttons .btn {
  padding: 14px 28px;
  font-size: 15px;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
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

@media (max-width: 640px) {
  .prompt-buttons {
    flex-direction: column;
  }
  
  .login-prompt-modal {
    padding: 32px 24px;
  }
}

/* 统计详情弹窗 */
.stat-modal-overlay {
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
  z-index: 1002;
  animation: fadeIn 0.3s ease;
}

.stat-modal {
  background: white;
  border-radius: 24px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
}

.stat-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-bottom: 1px solid #eee;
}

.stat-modal-header h3 {
  font-size: 20px;
  font-weight: 700;
  color: #7C3AED;
  margin: 0;
}

.stat-modal-header .close-btn {
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

.stat-modal-header .close-btn:hover {
  background: rgba(0, 0, 0, 0.2);
  transform: rotate(90deg);
}

.stat-modal-content {
  padding: 24px 32px;
  max-height: 60vh;
  overflow-y: auto;
}

.stat-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: #f8f8f8;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.stat-item:hover {
  background: #f0f0f0;
  transform: translateX(5px);
}

.stat-item-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-item-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.stat-item-type {
  font-size: 12px;
  color: #7C3AED;
  background: rgba(124, 58, 237, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
  width: fit-content;
}

.stat-item-rating {
  font-size: 14px;
}

.stat-item-result {
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 600;
}

.stat-item-result.success {
  background: #d4edda;
  color: #155724;
}

.stat-item-result.fail {
  background: #f8d7da;
  color: #721c24;
}

.stat-item-date {
  font-size: 13px;
  color: #999;
}

@media (max-width: 640px) {
  .stat-modal {
    width: 95%;
    max-height: 85vh;
  }
  
  .stat-modal-header,
  .stat-modal-content {
    padding: 20px 24px;
  }
  
  .stat-item {
    padding: 14px 16px;
  }
}
</style>
