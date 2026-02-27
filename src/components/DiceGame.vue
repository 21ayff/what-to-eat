<template>
  <div class="dice-game">
    <div class="game-header">
      <span class="game-icon">🎲</span>
      <h3>骰子挑战</h3>
      <p>掷骰子，完成美食挑战！</p>
    </div>
    
    <div class="dice-container">
      <div class="dice-wrapper">
        <div
          v-for="(die, index) in dice"
          :key="index"
          class="die"
          :class="{ 'rolling': isRolling }"
          :style="getDieStyle(index)"
        >
          <div class="die-face">
            <span class="die-value">{{ die }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="game-controls">
      <button
        class="roll-btn"
        :disabled="isRolling"
        @click="rollDice"
      >
        <span v-if="!isRolling">掷骰子</span>
        <span v-else>投掷中...</span>
      </button>
    </div>
    
    <div v-if="challenge" class="challenge-card animate-fadeIn">
      <div class="challenge-header">
        <span class="challenge-icon">🏆</span>
        <h4>{{ challenge.title }}</h4>
      </div>
      <p class="challenge-desc">{{ challenge.desc }}</p>
      <div class="challenge-meta">
        <span class="difficulty" :class="`difficulty-${challenge.difficulty}`">
          难度: {{ challenge.difficulty }}
        </span>
        <span class="reward">{{ challenge.reward }}</span>
      </div>
      <button class="accept-btn" @click="acceptChallenge">
        接受挑战
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { challenges } from '../data/foods.js'

const dice = ref([1, 1])
const isRolling = ref(false)
const challenge = ref(null)

const getDieStyle = (index) => ({
  animationDelay: `${index * 0.1}s`
})

const rollDice = () => {
  if (isRolling.value) return
  
  isRolling.value = true
  challenge.value = null
  
  let rolls = 0
  const maxRolls = 10
  
  const rollInterval = setInterval(() => {
    dice.value = dice.value.map(() => Math.floor(Math.random() * 6) + 1)
    rolls++
    
    if (rolls >= maxRolls) {
      clearInterval(rollInterval)
      const sum = dice.value[0] + dice.value[1]
      const challengeIndex = (sum - 2) % challenges.length
      challenge.value = challenges[challengeIndex]
      isRolling.value = false
    }
  }, 100)
}

const acceptChallenge = () => {
  alert(`太棒了！你接受了"${challenge.value.title}"挑战！加油完成它！💪`)
}
</script>

<style scoped>
.dice-game {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 32px;
  text-align: center;
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
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
}

.game-header p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

.dice-container {
  margin-bottom: 32px;
}

.dice-wrapper {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.die {
  width: 80px;
  height: 80px;
  background: linear-gradient(145deg, #ffffff 0%, #e6e6e6 100%);
  border-radius: 16px;
  box-shadow: 
    0 8px 20px rgba(0,0,0,0.15),
    inset 0 -4px 8px rgba(0,0,0,0.1),
    inset 0 4px 8px rgba(255,255,255,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.die.rolling {
  animation: shake 0.5s ease-in-out infinite;
}

.die-face {
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
}

.die-value {
  font-size: 32px;
  font-weight: 700;
  color: #2C3E50;
}

.game-controls {
  margin-bottom: 24px;
}

.roll-btn {
  padding: 16px 48px;
  font-size: 18px;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #FF8C42 0%, #FF6B35 100%);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 140, 66, 0.4);
}

.roll-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 140, 66, 0.5);
}

.roll-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.challenge-card {
  background: linear-gradient(135deg, rgba(255, 140, 66, 0.9) 0%, rgba(255, 107, 53, 0.9) 100%);
  border-radius: 20px;
  padding: 24px;
  color: white;
  text-align: left;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.challenge-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.challenge-icon {
  font-size: 32px;
}

.challenge-header h4 {
  font-size: 20px;
  font-weight: 700;
}

.challenge-desc {
  font-size: 14px;
  opacity: 0.95;
  margin-bottom: 16px;
  line-height: 1.6;
}

.challenge-meta {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.difficulty {
  padding: 6px 14px;
  background: rgba(255,255,255,0.2);
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
}

.difficulty-简单 {
  background: rgba(107, 203, 119, 0.3);
}

.difficulty-中等 {
  background: rgba(255, 193, 7, 0.3);
}

.difficulty-困难 {
  background: rgba(255, 107, 107, 0.3);
}

.reward {
  padding: 6px 14px;
  background: rgba(255,215,0, 0.3);
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
}

.accept-btn {
  width: 100%;
  padding: 14px;
  background: rgba(255, 255, 255, 0.9);
  color: #FF6B35;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.accept-btn:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  background: white;
}

@keyframes shake {
  0%, 100% { transform: rotate(0deg) translateY(0); }
  25% { transform: rotate(-15deg) translateY(-5px); }
  75% { transform: rotate(15deg) translateY(-5px); }
}

@media (max-width: 768px) {
  .dice-game {
    padding: 20px;
  }
  
  .die {
    width: 60px;
    height: 60px;
  }
  
  .die-face {
    width: 45px;
    height: 45px;
  }
  
  .die-value {
    font-size: 24px;
  }
}
</style>
