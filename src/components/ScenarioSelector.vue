<template>
  <div class="scenario-selector" :class="scenarioClass">
    <div class="selector-header">
      <div class="title-group">
        <h3>{{ scenario.title }}</h3>
        <span class="title-en">{{ scenarioTitleEn }}</span>
      </div>
    </div>
    <div class="options-grid">
      <button
        v-for="option in scenario.options"
        :key="option.value"
        class="option-btn"
        :class="[optionClass(option), { 'selected': modelValue === option.value }]"
        :style="optionStyle(option)"
        :data-emoji="option.emoji"
        @click="selectOption(option.value)"
      >
        <span class="option-label">{{ option.label }}</span>
        <span class="option-desc">{{ option.desc }}</span>
        <span v-if="modelValue === option.value" class="check-mark">✓</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  scenario: {
    type: Object,
    required: true
  },
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const selectOption = (value) => {
  emit('update:modelValue', value)
}

// 根据场景类型返回样式类
const scenarioClass = computed(() => {
  const classMap = {
    '用餐时段': 'theme-time',
    '当下心情': 'theme-mood',
    '天气情况': 'theme-weather',
    '用餐人数': 'theme-people',
    '口味偏好': 'theme-flavor',
    '预算范围': 'theme-budget',
    '健康需求': 'theme-health'
  }
  return classMap[props.scenario.title] || ''
})

// 根据场景类型返回英文标题
const scenarioTitleEn = computed(() => {
  const enMap = {
    '用餐时段': 'Meal Time',
    '当下心情': 'Mood',
    '天气情况': 'Weather',
    '用餐人数': 'Dining',
    '口味偏好': 'Flavor',
    '预算范围': 'Budget',
    '健康需求': 'Health'
  }
  return enMap[props.scenario.title] || ''
})

// 根据选项返回样式类
const optionClass = (option) => {
  const label = option.label
  const classMap = {
    // 时段
    '早餐': 'time-morning',
    '午餐': 'time-lunch',
    '晚餐': 'time-dinner',
    '夜宵': 'time-night',
    '下午茶': 'time-tea',
    // 心情
    '开心': 'mood-happy',
    '难过': 'mood-sad',
    '疲惫': 'mood-tired',
    '焦虑': 'mood-anxious',
    '无聊': 'mood-bored',
    '兴奋': 'mood-excited',
    // 天气
    '晴天': 'weather-sunny',
    '雨天': 'weather-rainy',
    '阴天': 'weather-cloudy',
    '寒冷': 'weather-cold',
    '炎热': 'weather-hot',
    // 人数
    '一人食': 'people-solo',
    '朋友聚餐': 'people-friends',
    '约会': 'people-date',
    '家庭聚餐': 'people-family',
    // 口味
    '无辣不欢': 'flavor-spicy',
    '清淡健康': 'flavor-light',
    '甜蜜治愈': 'flavor-sweet',
    '酸爽开胃': 'flavor-sour',
    '重口味': 'flavor-heavy',
    // 预算
    '经济实惠': 'budget-low',
    '中等消费': 'budget-mid',
    '犒劳自己': 'budget-high',
    // 健康
    '低卡减脂': 'health-diet',
    '高蛋白': 'health-protein',
    '营养均衡': 'health-balanced',
    '无特殊要求': 'health-none'
  }
  return classMap[label] || ''
}

// 根据选项返回自定义样式
const optionStyle = (option) => {
  const label = option.label
  const styleMap = {
    // 时段 - 暖色调渐变
    '早餐': { '--card-bg': 'linear-gradient(135deg, rgba(255,200,100,0.3) 0%, rgba(255,150,50,0.2) 100%)', '--card-border': 'rgba(255,180,80,0.5)' },
    '午餐': { '--card-bg': 'linear-gradient(135deg, rgba(255,220,100,0.3) 0%, rgba(255,180,50,0.2) 100%)', '--card-border': 'rgba(255,200,80,0.5)' },
    '晚餐': { '--card-bg': 'linear-gradient(135deg, rgba(150,100,200,0.3) 0%, rgba(100,50,150,0.2) 100%)', '--card-border': 'rgba(130,80,180,0.5)' },
    '夜宵': { '--card-bg': 'linear-gradient(135deg, rgba(80,80,120,0.4) 0%, rgba(50,50,80,0.3) 100%)', '--card-border': 'rgba(100,100,140,0.5)' },
    '下午茶': { '--card-bg': 'linear-gradient(135deg, rgba(200,150,150,0.3) 0%, rgba(180,100,100,0.2) 100%)', '--card-border': 'rgba(190,130,130,0.5)' },
    // 心情 - 情绪色彩
    '开心': { '--card-bg': 'linear-gradient(135deg, rgba(255,220,50,0.3) 0%, rgba(255,180,0,0.2) 100%)', '--card-border': 'rgba(255,200,30,0.5)' },
    '难过': { '--card-bg': 'linear-gradient(135deg, rgba(100,150,200,0.3) 0%, rgba(70,100,150,0.2) 100%)', '--card-border': 'rgba(90,130,180,0.5)' },
    '疲惫': { '--card-bg': 'linear-gradient(135deg, rgba(150,150,150,0.3) 0%, rgba(100,100,100,0.2) 100%)', '--card-border': 'rgba(130,130,130,0.5)' },
    '焦虑': { '--card-bg': 'linear-gradient(135deg, rgba(200,100,100,0.3) 0%, rgba(150,70,70,0.2) 100%)', '--card-border': 'rgba(180,90,90,0.5)' },
    '无聊': { '--card-bg': 'linear-gradient(135deg, rgba(180,180,180,0.25) 0%, rgba(140,140,140,0.15) 100%)', '--card-border': 'rgba(160,160,160,0.4)' },
    '兴奋': { '--card-bg': 'linear-gradient(135deg, rgba(255,100,150,0.3) 0%, rgba(200,50,100,0.2) 100%)', '--card-border': 'rgba(230,80,130,0.5)' },
    // 天气 - 自然色调
    '晴天': { '--card-bg': 'linear-gradient(135deg, rgba(255,200,50,0.3) 0%, rgba(255,150,0,0.2) 100%)', '--card-border': 'rgba(255,180,30,0.5)' },
    '雨天': { '--card-bg': 'linear-gradient(135deg, rgba(100,150,200,0.3) 0%, rgba(70,100,150,0.2) 100%)', '--card-border': 'rgba(90,130,180,0.5)' },
    '阴天': { '--card-bg': 'linear-gradient(135deg, rgba(150,160,170,0.3) 0%, rgba(120,130,140,0.2) 100%)', '--card-border': 'rgba(140,150,160,0.5)' },
    '寒冷': { '--card-bg': 'linear-gradient(135deg, rgba(150,200,255,0.3) 0%, rgba(100,150,200,0.2) 100%)', '--card-border': 'rgba(130,180,230,0.5)' },
    '炎热': { '--card-bg': 'linear-gradient(135deg, rgba(255,100,50,0.3) 0%, rgba(200,70,30,0.2) 100%)', '--card-border': 'rgba(230,90,40,0.5)' },
    // 人数 - 社交色调
    '一人食': { '--card-bg': 'linear-gradient(135deg, rgba(150,200,150,0.3) 0%, rgba(100,150,100,0.2) 100%)', '--card-border': 'rgba(130,180,130,0.5)' },
    '朋友聚餐': { '--card-bg': 'linear-gradient(135deg, rgba(255,180,100,0.3) 0%, rgba(200,130,50,0.2) 100%)', '--card-border': 'rgba(230,160,80,0.5)' },
    '约会': { '--card-bg': 'linear-gradient(135deg, rgba(255,150,200,0.3) 0%, rgba(200,100,150,0.2) 100%)', '--card-border': 'rgba(230,130,180,0.5)' },
    '家庭聚餐': { '--card-bg': 'linear-gradient(135deg, rgba(200,150,100,0.3) 0%, rgba(150,100,50,0.2) 100%)', '--card-border': 'rgba(180,130,80,0.5)' },
    // 口味 - 食物色调
    '无辣不欢': { '--card-bg': 'linear-gradient(135deg, rgba(255,80,50,0.3) 0%, rgba(200,50,30,0.2) 100%)', '--card-border': 'rgba(230,70,40,0.5)' },
    '清淡健康': { '--card-bg': 'linear-gradient(135deg, rgba(150,220,150,0.3) 0%, rgba(100,180,100,0.2) 100%)', '--card-border': 'rgba(130,200,130,0.5)' },
    '甜蜜治愈': { '--card-bg': 'linear-gradient(135deg, rgba(255,180,200,0.3) 0%, rgba(255,130,160,0.2) 100%)', '--card-border': 'rgba(255,160,180,0.5)' },
    '酸爽开胃': { '--card-bg': 'linear-gradient(135deg, rgba(255,220,100,0.3) 0%, rgba(255,180,50,0.2) 100%)', '--card-border': 'rgba(255,200,80,0.5)' },
    '重口味': { '--card-bg': 'linear-gradient(135deg, rgba(150,100,80,0.3) 0%, rgba(100,60,40,0.2) 100%)', '--card-border': 'rgba(130,80,60,0.5)' },
    // 预算 - 金属/财富色调
    '经济实惠': { '--card-bg': 'linear-gradient(135deg, rgba(150,220,150,0.3) 0%, rgba(100,180,100,0.2) 100%)', '--card-border': 'rgba(130,200,130,0.5)' },
    '中等消费': { '--card-bg': 'linear-gradient(135deg, rgba(200,180,100,0.3) 0%, rgba(150,130,50,0.2) 100%)', '--card-border': 'rgba(180,160,80,0.5)' },
    '犒劳自己': { '--card-bg': 'linear-gradient(135deg, rgba(200,150,255,0.3) 0%, rgba(150,100,200,0.2) 100%)', '--card-border': 'rgba(180,130,230,0.5)' },
    // 健康 - 健康色调
    '低卡减脂': { '--card-bg': 'linear-gradient(135deg, rgba(150,220,180,0.3) 0%, rgba(100,180,130,0.2) 100%)', '--card-border': 'rgba(130,200,160,0.5)' },
    '高蛋白': { '--card-bg': 'linear-gradient(135deg, rgba(255,180,120,0.3) 0%, rgba(200,130,70,0.2) 100%)', '--card-border': 'rgba(230,160,100,0.5)' },
    '营养均衡': { '--card-bg': 'linear-gradient(135deg, rgba(180,220,150,0.3) 0%, rgba(130,180,100,0.2) 100%)', '--card-border': 'rgba(160,200,130,0.5)' },
    '无特殊要求': { '--card-bg': 'linear-gradient(135deg, rgba(200,200,200,0.25) 0%, rgba(160,160,160,0.15) 100%)', '--card-border': 'rgba(180,180,180,0.4)' }
  }
  return styleMap[label] || {}
}
</script>

<style scoped>
.scenario-selector {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.scenario-selector:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

/* 主题样式 - 时段 */
.theme-time {
  border-left: 4px solid rgba(255, 180, 80, 0.6);
}

/* 主题样式 - 心情 */
.theme-mood {
  border-left: 4px solid rgba(255, 100, 150, 0.6);
}

/* 主题样式 - 天气 */
.theme-weather {
  border-left: 4px solid rgba(100, 180, 255, 0.6);
}

/* 主题样式 - 人数 */
.theme-people {
  border-left: 4px solid rgba(150, 220, 150, 0.6);
}

/* 主题样式 - 口味 */
.theme-flavor {
  border-left: 4px solid rgba(255, 130, 80, 0.6);
}

/* 主题样式 - 预算 */
.theme-budget {
  border-left: 4px solid rgba(200, 180, 100, 0.6);
}

/* 主题样式 - 健康 */
.theme-health {
  border-left: 4px solid rgba(130, 220, 180, 0.6);
}

.selector-header {
  margin-bottom: 20px;
}

.title-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.selector-header h3 {
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin: 0;
}

.title-en {
  font-size: 11px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 2px;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 16px;
}

.option-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 20px 12px;
  border: 1px solid var(--card-border, rgba(255, 255, 255, 0.25));
  border-radius: 20px;
  background: var(--card-bg, rgba(255, 255, 255, 0.08));
  backdrop-filter: blur(20px);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  min-height: 100px;
  overflow: hidden;
}

.option-btn::before {
  content: attr(data-emoji);
  position: absolute;
  font-size: 80px;
  opacity: 0.08;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  filter: blur(1px);
  transition: all 0.4s ease;
  z-index: 0;
}

.option-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
  pointer-events: none;
  z-index: 1;
}

.option-btn:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
  filter: brightness(1.1);
}

.option-btn:hover::before {
  opacity: 0.15;
  transform: translate(-50%, -50%) scale(1.1) rotate(5deg);
}

.option-btn.selected {
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.3),
    inset 0 0 0 2px rgba(255, 255, 255, 0.5),
    0 0 20px rgba(124, 58, 237, 0.4);
  transform: translateY(-3px) scale(1.05);
}



.option-label {
  font-size: 14px;
  font-weight: 700;
  color: white;
  text-shadow: 0 1px 3px rgba(0,0,0,0.3);
  position: relative;
  z-index: 1;
}

.option-desc {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.85);
  text-align: center;
  position: relative;
  z-index: 1;
  font-weight: 500;
}

.check-mark {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7C3AED;
  font-size: 14px;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  z-index: 2;
}

@media (max-width: 768px) {
  .scenario-selector {
    padding: 16px;
  }
  
  .options-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  
  .option-btn {
    padding: 12px 8px;
  }
  
  .option-emoji {
    font-size: 24px;
  }
  
  .option-label {
    font-size: 13px;
  }
  
  .option-desc {
    font-size: 11px;
  }
}
</style>
