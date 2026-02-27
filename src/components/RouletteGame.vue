<template>
  <div class="roulette-game">
    <div class="game-header">
      <span class="game-icon">🎯</span>
      <h3>美食转盘</h3>
      <p>让命运决定你吃什么！</p>
    </div>
    
    <div class="roulette-container">
      <div class="roulette-wheel" :class="{ 'spinning': isSpinning }" :style="wheelStyle">
        <div
          v-for="(food, index) in wheelFoods"
          :key="food.id"
          class="wheel-segment"
          :style="getSegmentStyle(index)"
        >
          <span class="segment-emoji">{{ food.emoji }}</span>
          <span class="segment-name">{{ food.name }}</span>
        </div>
      </div>
      <div class="wheel-pointer">▼</div>
    </div>
    
    <div class="game-controls">
      <button
        class="spin-btn"
        :disabled="isSpinning"
        @click="spin"
      >
        <span v-if="!isSpinning">开始转盘</span>
        <span v-else>转盘中...</span>
      </button>
    </div>
    
    <div v-if="result" class="result-card animate-fadeIn">
      <div class="result-emoji">{{ result.emoji }}</div>
      <h4>今天吃 {{ result.name }}！</h4>
      <p>{{ result.description }}</p>
      <div class="result-tags">
        <span v-for="tag in result.tags.slice(0, 3)" :key="tag" class="result-tag">{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { foods } from '../data/foods.js'

const wheelFoods = foods.slice(0, 8)
const isSpinning = ref(false)
const result = ref(null)
const rotation = ref(0)

const wheelStyle = computed(() => ({
  transform: `rotate(${rotation.value}deg)`
}))

const getSegmentStyle = (index) => {
  const angle = (360 / wheelFoods.length) * index
  // 使用与橙色主题协调的暖色调
  const colors = [
    '#FF6B6B', '#FFA07A', '#FFB347', '#FFCC80',
    '#FFD700', '#F4A460', '#E9967A', '#FF8C69'
  ]
  return {
    transform: `rotate(${angle}deg)`,
    background: colors[index % colors.length]
  }
}

const spin = () => {
  if (isSpinning.value) return
  
  isSpinning.value = true
  result.value = null
  
  const spins = 5 + Math.random() * 3
  const finalAngle = Math.random() * 360
  rotation.value += spins * 360 + finalAngle
  
  setTimeout(() => {
    const segmentAngle = 360 / wheelFoods.length
    const actualRotation = rotation.value % 360
    const winningIndex = Math.floor((360 - actualRotation + segmentAngle / 2) / segmentAngle) % wheelFoods.length
    result.value = wheelFoods[winningIndex]
    isSpinning.value = false
  }, 4000)
}
</script>

<style scoped>
.roulette-game {
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 32px;
  border: 1px solid rgba(255, 140, 66, 0.2);
}

.game-header {
  margin-bottom: 32px;
}

.game-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 12px;
}

.game-header h3 {
  font-size: 28px;
  font-weight: 800;
  color: white;
  margin-bottom: 8px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.game-header p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

.roulette-container {
  position: relative;
  width: 300px;
  height: 300px;
  margin: 0 auto 32px;
}

.roulette-wheel {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  transition: transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99);
}

.wheel-segment {
  position: absolute;
  width: 50%;
  height: 50%;
  transform-origin: right bottom;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 40px;
  padding-right: 20px;
  clip-path: polygon(0 0, 100% 0, 100% 100%);
}

.segment-emoji {
  font-size: 28px;
  margin-bottom: 4px;
}

.segment-name {
  font-size: 11px;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  max-width: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wheel-pointer {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 30px;
  color: #FF6B35;
  z-index: 10;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}

.game-controls {
  margin-bottom: 24px;
}

.spin-btn {
  padding: 16px 48px;
  font-size: 18px;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, #FF8C42 0%, #FF6B35 100%);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(255, 140, 66, 0.5);
}

.spin-btn:hover:not(:disabled) {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 30px rgba(255, 140, 66, 0.6);
}

.spin-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.result-card {
  background: linear-gradient(135deg, rgba(255, 140, 66, 0.9) 0%, rgba(255, 107, 53, 0.8) 100%);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 24px;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.result-emoji {
  font-size: 64px;
  margin-bottom: 12px;
  animation: bounce 1s ease-in-out infinite;
}

.result-card h4 {
  font-size: 22px;
  margin-bottom: 8px;
}

.result-card p {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 16px;
}

.result-tags {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}

.result-tag {
  padding: 6px 14px;
  background: rgba(255,255,255,0.2);
  border-radius: 16px;
  font-size: 12px;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@media (max-width: 768px) {
  .roulette-game {
    padding: 20px;
  }
  
  .roulette-container {
    width: 250px;
    height: 250px;
  }
  
  .segment-emoji {
    font-size: 22px;
  }
  
  .segment-name {
    font-size: 10px;
  }
}
</style>
