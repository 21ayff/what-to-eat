<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="show" class="restaurant-overlay" @click="close">
        <Transition name="slide-up">
          <div v-if="show" class="restaurant-drawer" @click.stop>
            <!-- 头部 -->
            <div class="drawer-header">
              <div class="header-bg">
                <span class="food-emoji">{{ food?.emoji }}</span>
                <div class="header-content">
                  <h2 class="food-name">{{ food?.name }}</h2>
                  <p class="food-subtitle">附近餐厅推荐</p>
                </div>
              </div>
              <button class="close-btn" @click="close">
                <span>✕</span>
              </button>
            </div>

            <!-- 筛选栏 -->
            <div class="filter-section">
              <div class="filter-label">
                <span>📍</span>
                <span>距离筛选</span>
              </div>
              <div class="filter-options">
                <button
                  v-for="option in distanceOptions"
                  :key="option.value"
                  :class="['filter-btn', { active: selectedRadius === option.value }]"
                  @click="changeRadius(option.value)"
                >
                  {{ option.label }}
                </button>
              </div>
            </div>

            <!-- 内容区 -->
            <div class="drawer-content">
              <!-- 加载状态 -->
              <div v-if="loading" class="state-container">
                <div class="loading-animation">
                  <div class="loading-ring"></div>
                  <span class="loading-icon">🍽️</span>
                </div>
                <p class="state-title">正在搜索附近餐厅...</p>
                <p class="state-subtitle">正在获取您的位置</p>
              </div>

              <!-- 错误状态 -->
              <div v-else-if="error" class="state-container">
                <div class="state-icon error">📍</div>
                <p class="state-title">{{ error }}</p>
                <p class="state-subtitle">{{ errorDetail }}</p>
                <button class="retry-btn" @click="searchRestaurants">
                  <span>🔄</span> 重新搜索
                </button>
              </div>

              <!-- 空状态 -->
              <div v-else-if="restaurants.length === 0" class="state-container">
                <div class="state-icon">🍽️</div>
                <p class="state-title">附近暂无相关餐厅</p>
                <p class="state-subtitle">试试扩大搜索范围或搜索其他美食</p>
              </div>

              <!-- 餐厅列表 -->
              <div v-else class="restaurants-list">
                <div class="results-header">
                  <span class="results-count">
                    找到 <strong>{{ restaurants.length }}</strong> 家餐厅
                  </span>
                  <span v-if="usingDefaultLocation" class="location-hint">
                    📍 使用默认位置
                  </span>
                </div>

                <div class="restaurants-scroll">
                  <RestaurantCard
                    v-for="restaurant in restaurants"
                    :key="restaurant.id"
                    :restaurant="restaurant"
                    @navigate="handleNavigate"
                    @call="handleCall"
                  />
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>

  <!-- 隐藏的地图容器 -->
  <div id="temp-map-container" style="display: none;"></div>
</template>

<script setup>
import { ref, watch } from 'vue'
import RestaurantCard from './RestaurantCard.vue'
import { restaurantService } from '../services/restaurant'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  food: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close'])

const loading = ref(false)
const error = ref(null)
const errorDetail = ref('请检查定位权限后重试')
const restaurants = ref([])
const searchKeyword = ref('')
const selectedRadius = ref(5000)
const usingDefaultLocation = ref(false)

const distanceOptions = [
  { label: '1公里', value: 1000 },
  { label: '3公里', value: 3000 },
  { label: '5公里', value: 5000 },
  { label: '10公里', value: 10000 }
]

watch(() => props.show, (newVal) => {
  if (newVal && props.food) {
    searchRestaurants()
  }
})

watch(() => props.food, (newVal) => {
  if (newVal && props.show) {
    searchRestaurants()
  }
})

const searchRestaurants = async () => {
  if (!props.food) return

  loading.value = true
  error.value = null
  restaurants.value = []

  try {
    const result = await restaurantService.searchNearbyRestaurants(
      props.food.name,
      { radius: selectedRadius.value }
    )

    if (result.success) {
      restaurants.value = result.data
      searchKeyword.value = result.keyword
      usingDefaultLocation.value = result.usingDefaultLocation || false
      errorDetail.value = '请检查定位权限后重试'
    } else {
      error.value = result.error || '搜索失败'
      errorDetail.value = '请刷新页面重试，或检查网络连接'
    }
  } catch (err) {
    error.value = err.message || '搜索出错'
    errorDetail.value = '发生未知错误，请刷新页面重试'
  } finally {
    loading.value = false
  }
}

const changeRadius = (radius) => {
  selectedRadius.value = radius
  searchRestaurants()
}

const close = () => {
  emit('close')
}

const handleNavigate = (restaurant) => {
  restaurantService.openNavigation(restaurant)
}

const handleCall = (restaurant) => {
  if (restaurant.phone) {
    window.location.href = `tel:${restaurant.phone}`
  }
}
</script>

<style scoped>
/* 遮罩层 */
.restaurant-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

/* 抽屉 */
.restaurant-drawer {
  width: 100%;
  max-width: 600px;
  max-height: 85vh;
  background: white;
  border-radius: 24px 24px 0 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 -10px 60px rgba(0, 0, 0, 0.3);
}

/* 头部 */
.drawer-header {
  position: relative;
  flex-shrink: 0;
}

.header-bg {
  background: linear-gradient(135deg, #FF8C42 0%, #FF6B35 100%);
  padding: 32px 24px 24px;
  text-align: center;
  color: white;
}

.food-emoji {
  font-size: 64px;
  display: block;
  margin-bottom: 12px;
}

.food-name {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
}

.food-subtitle {
  font-size: 14px;
  opacity: 0.9;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

/* 筛选栏 */
.filter-section {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  background: white;
}

.filter-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #666;
  font-weight: 500;
  flex-shrink: 0;
}

.filter-options {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 8px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  background: white;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  border-color: #FF8C42;
  color: #FF8C42;
}

.filter-btn.active {
  background: linear-gradient(135deg, #FF8C42 0%, #FF6B35 100%);
  border-color: transparent;
  color: white;
}

/* 内容区 */
.drawer-content {
  flex: 1;
  overflow-y: auto;
  background: #f8f9fa;
}

/* 状态容器 */
.state-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 24px;
  text-align: center;
}

.loading-animation {
  position: relative;
  width: 80px;
  height: 80px;
  margin-bottom: 24px;
}

.loading-ring {
  position: absolute;
  inset: 0;
  border: 4px solid rgba(255, 140, 66, 0.2);
  border-top-color: #FF8C42;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 32px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.state-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.state-icon.error {
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

.state-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.state-subtitle {
  font-size: 14px;
  color: #999;
  margin-bottom: 24px;
}

.retry-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #FF8C42 0%, #FF6B35 100%);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
}

/* 餐厅列表 */
.restaurants-list {
  padding: 16px;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 8px;
}

.results-count {
  font-size: 14px;
  color: #666;
}

.results-count strong {
  color: #FF8C42;
  font-size: 18px;
}

.location-hint {
  font-size: 12px;
  color: #e74c3c;
  background: rgba(231, 76, 60, 0.1);
  padding: 4px 10px;
  border-radius: 12px;
}

.restaurants-scroll {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

@media (max-width: 480px) {
  .restaurant-drawer {
    max-height: 90vh;
  }

  .header-bg {
    padding: 24px 20px 20px;
  }

  .food-emoji {
    font-size: 48px;
  }

  .food-name {
    font-size: 20px;
  }

  .filter-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .filter-options {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
