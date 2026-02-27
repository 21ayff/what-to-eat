<template>
  <div class="quick-pick">
    <div class="game-header">
      <span class="game-icon">⚡</span>
      <h3>快问快答</h3>
      <p>快速回答，找到最适合你的美食！</p>
    </div>
    
    <div v-if="!isComplete" class="quiz-container">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }"></div>
      </div>
      
      <div class="question-card">
        <span class="question-number">问题 {{ currentQuestion + 1 }}/{{ questions.length }}</span>
        <h4 class="question-text">{{ currentQ.text }}</h4>
        <div class="options-list">
          <button
            v-for="option in currentQ.options"
            :key="option.value"
            class="quiz-option"
            @click="selectAnswer(option.value)"
          >
            <span class="option-emoji">{{ option.emoji }}</span>
            <span class="option-text">{{ option.text }}</span>
          </button>
        </div>
      </div>
    </div>
    
    <div v-else class="result-container">
      <div class="result-emoji animate-bounce">{{ resultFood.emoji }}</div>
      <h4 class="result-title">为你推荐</h4>
      <h3 class="result-name">{{ resultFood.name }}</h3>
      <p class="result-desc">{{ resultFood.description }}</p>
      <div class="result-tags">
        <span v-for="tag in resultFood.tags.slice(0, 4)" :key="tag" class="result-tag">{{ tag }}</span>
      </div>
      <button class="restart-btn" @click="restart">
        再玩一次
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { foods } from '../data/foods.js'

const questions = [
  {
    text: '你现在有多饿？',
    options: [
      { value: 'light', emoji: '😌', text: '不太饿，随便吃点' },
      { value: 'normal', emoji: '😊', text: '正常饿，正常吃' },
      { value: 'very', emoji: '😋', text: '很饿，要大吃一顿' },
      { value: 'starving', emoji: '🤤', text: '饿疯了，什么都行' }
    ]
  },
  {
    text: '你想吃什么口味？',
    options: [
      { value: 'spicy', emoji: '🌶️', text: '辣辣的' },
      { value: 'sweet', emoji: '🍯', text: '甜甜的' },
      { value: 'salty', emoji: '🧂', text: '咸香的' },
      { value: 'light', emoji: '🥗', text: '清淡的' }
    ]
  },
  {
    text: '你的预算如何？',
    options: [
      { value: 'low', emoji: '💵', text: '省钱模式' },
      { value: 'medium', emoji: '💴', text: '正常消费' },
      { value: 'high', emoji: '💎', text: '犒劳自己' }
    ]
  },
  {
    text: '用餐场景是？',
    options: [
      { value: 'alone', emoji: '🧑', text: '一个人' },
      { value: 'friend', emoji: '👫', text: '和朋友' },
      { value: 'date', emoji: '💕', text: '约会' },
      { value: 'family', emoji: '👨‍👩‍👧‍👦', text: '家庭聚餐' }
    ]
  }
]

const currentQuestion = ref(0)
const answers = ref([])
const isComplete = ref(false)
const resultFood = ref(null)

const currentQ = computed(() => questions[currentQuestion.value])

const selectAnswer = (value) => {
  answers.value.push(value)
  
  if (currentQuestion.value < questions.length - 1) {
    currentQuestion.value++
  } else {
    completeQuiz()
  }
}

const completeQuiz = () => {
  isComplete.value = true
  
  // 根据答案推荐食物
  const hunger = answers.value[0]
  const flavor = answers.value[1]
  const budget = answers.value[2]
  const scene = answers.value[3]
  
  // 筛选逻辑
  let candidates = foods.filter(food => {
    let match = true
    
    // 预算匹配
    if (budget === 'low' && food.price !== '低') match = false
    if (budget === 'high' && food.price === '低') match = false
    
    // 口味匹配
    if (flavor === 'spicy' && !food.tags.includes('辣')) match = false
    if (flavor === 'sweet' && !food.tags.includes('甜')) match = false
    if (flavor === 'light' && !food.tags.includes('清淡')) match = false
    
    // 场景匹配
    if (scene === 'alone' && !food.tags.includes('一人食')) match = false
    if (scene === 'friend' && !food.tags.includes('聚餐')) match = false
    if (scene === 'date' && !food.tags.includes('约会')) match = false
    
    return match
  })
  
  // 如果没有匹配，随机选择
  if (candidates.length === 0) {
    candidates = foods
  }
  
  // 饥饿程度影响选择
  if (hunger === 'starving') {
    candidates = candidates.filter(f => f.calories === '高' || f.tags.includes('主食'))
  } else if (hunger === 'light') {
    candidates = candidates.filter(f => f.calories === '低' || f.tags.includes('小食'))
  }
  
  if (candidates.length === 0) candidates = foods
  
  resultFood.value = candidates[Math.floor(Math.random() * candidates.length)]
}

const restart = () => {
  currentQuestion.value = 0
  answers.value = []
  isComplete.value = false
  resultFood.value = null
}
</script>

<style scoped>
.quick-pick {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 32px;
  border: 1px solid rgba(255, 140, 66, 0.2);
}

.game-header {
  text-align: center;
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

.progress-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  margin-bottom: 24px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #FF8C42 0%, #FF6B35 100%);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.question-card {
  text-align: center;
}

.question-number {
  display: inline-block;
  padding: 6px 16px;
  background: rgba(255, 140, 66, 0.3);
  border-radius: 16px;
  font-size: 12px;
  color: white;
  margin-bottom: 16px;
}

.question-text {
  font-size: 22px;
  font-weight: 600;
  color: white;
  margin-bottom: 32px;
}

.options-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.quiz-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 24px 16px;
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(255, 140, 66, 0.3);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quiz-option:hover {
  border-color: rgba(255, 140, 66, 0.8);
  background: rgba(255, 140, 66, 0.2);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(255, 140, 66, 0.3);
}

.option-emoji {
  font-size: 36px;
}

.option-text {
  font-size: 14px;
  font-weight: 500;
  color: white;
}

/* 结果样式 */
.result-container {
  text-align: center;
  padding: 20px 0;
}

.result-emoji {
  font-size: 80px;
  margin-bottom: 16px;
}

.result-title {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
}

.result-name {
  font-size: 32px;
  font-weight: 700;
  color: white;
  margin-bottom: 12px;
}

.result-desc {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 20px;
  line-height: 1.6;
}

.result-tags {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

.result-tag {
  padding: 8px 16px;
  background: rgba(255, 140, 66, 0.3);
  border-radius: 16px;
  font-size: 13px;
  color: white;
}

.restart-btn {
  padding: 16px 48px;
  background: linear-gradient(135deg, #FF8C42 0%, #FF6B35 100%);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 140, 66, 0.4);
}

.restart-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 140, 66, 0.5);
}

@media (max-width: 768px) {
  .quick-pick {
    padding: 20px;
  }
  
  .options-list {
    grid-template-columns: 1fr;
  }
  
  .question-text {
    font-size: 18px;
  }
}
</style>
