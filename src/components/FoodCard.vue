<template>
  <div class="food-card" :class="{ 'featured': featured }">
    <div class="card-image">
      <span class="food-emoji">{{ food.emoji }}</span>
      <div class="image-overlay"></div>
      <div class="difficulty-badge" v-if="food.difficulty">
        <span>{{ food.difficulty }}</span>
      </div>
    </div>
    
    <div class="card-content">
      <div class="card-header">
        <h3 class="food-name">{{ food.name }}</h3>
        <div class="food-tags">
          <span v-for="(tag, i) in displayTags" :key="i" class="tag">{{ tag }}</span>
        </div>
      </div>
      
      <p class="food-description">{{ food.description }}</p>
      
      <div class="card-footer">
        <div class="food-meta">
          <span class="meta-item">
            <span class="meta-icon">⏱️</span>
            {{ food.time }}
          </span>
          <span class="meta-item">
            <span class="meta-icon">💰</span>
            {{ food.price }}
          </span>
          <span class="meta-item">
            <span class="meta-icon">🔥</span>
            {{ food.calories }}
          </span>
        </div>
        
        <div class="card-actions">
          <button class="action-btn detail-btn" @click.stop="showDetail = true">
            查看详情
          </button>
          <button class="action-btn restaurant-btn" @click.stop="findRestaurants">
            <span class="btn-icon">🍽️</span>
            找餐厅
          </button>
        </div>
      </div>
    </div>
    
    <!-- 详情弹窗 -->
    <div v-if="showDetail" class="detail-modal" @click="showDetail = false">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="showDetail = false">✕</button>
        
        <div class="modal-header">
          <span class="modal-emoji">{{ food.emoji }}</span>
          <h2>{{ food.name }}</h2>
          <div class="modal-tags">
            <span v-for="(tag, i) in food.tags" :key="i" class="modal-tag">{{ tag }}</span>
          </div>
        </div>
        
        <div class="modal-body">
          <div class="info-section">
            <h4>📝 简介</h4>
            <p>{{ food.fullDescription || food.description }}</p>
          </div>
          
          <div class="info-section" v-if="food.ingredients">
            <h4>🥘 主要食材</h4>
            <div class="ingredients-list">
              <span v-for="(ing, i) in food.ingredients" :key="i" class="ingredient">{{ ing }}</span>
            </div>
          </div>
          
          <div class="info-section" v-if="food.funFact">
            <h4>💡 小知识</h4>
            <p class="fun-fact">{{ food.funFact }}</p>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="modal-action-btn primary" @click="findRestaurants">
            <span>🍽️</span> 查找附近餐厅
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  food: {
    type: Object,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['findRestaurants'])

const showDetail = ref(false)

const displayTags = computed(() => {
  return props.food.tags.slice(0, 3)
})

const findRestaurants = () => {
  emit('findRestaurants', props.food)
  showDetail.value = false
}
</script>

<style scoped>
.food-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  width: 100%;
  max-width: 320px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.food-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  border-color: rgba(255, 140, 66, 0.3);
  background: rgba(255, 255, 255, 0.12);
}

.food-card.featured {
  max-width: 380px;
}

.card-image {
  position: relative;
  height: 180px;
  background: linear-gradient(135deg, rgba(255, 140, 66, 0.3) 0%, rgba(255, 107, 53, 0.3) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.food-card.featured .card-image {
  height: 220px;
}

.food-emoji {
  font-size: 80px;
  z-index: 1;
  transition: transform 0.3s ease;
}

.food-card:hover .food-emoji {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 100%);
}

.difficulty-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: #FF6B35;
  box-shadow: 0 2px 10px rgba(255, 107, 53, 0.2);
}

.card-content {
  padding: 20px;
}

.card-header {
  margin-bottom: 12px;
}

.food-name {
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
}

.food-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tag {
  padding: 4px 10px;
  background: rgba(255, 140, 66, 0.3);
  color: white;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
}

.food-description {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 16px;
}

.food-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
}

.meta-icon {
  font-size: 14px;
}

.card-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  flex: 1;
  padding: 10px 16px;
  border: none;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.detail-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.detail-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.restaurant-btn {
  background: linear-gradient(135deg, #FF8C42 0%, #FF6B35 100%);
  color: white;
}

.restaurant-btn:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
}

.btn-icon {
  font-size: 14px;
}

/* 详情弹窗 */
.detail-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: rgba(45, 27, 20, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.3s ease;
  border: 1px solid rgba(255, 140, 66, 0.3);
}

@keyframes slideUp {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 140, 66, 0.3);
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.close-btn:hover {
  background: rgba(255, 140, 66, 0.5);
  transform: rotate(90deg);
}

.modal-header {
  text-align: center;
  padding: 40px 24px 24px;
  background: linear-gradient(135deg, rgba(255, 140, 66, 0.8) 0%, rgba(255, 107, 53, 0.8) 100%);
}

.modal-emoji {
  font-size: 80px;
  display: block;
  margin-bottom: 16px;
}

.modal-header h2 {
  font-size: 28px;
  font-weight: 700;
  color: white;
  margin-bottom: 12px;
}

.modal-tags {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}

.modal-tag {
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.9);
  color: #FF6B35;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.modal-body {
  padding: 24px;
}

.info-section {
  margin-bottom: 24px;
}

.info-section h4 {
  font-size: 16px;
  font-weight: 700;
  color: white;
  margin-bottom: 12px;
}

.info-section p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

.ingredients-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.ingredient {
  padding: 8px 16px;
  background: rgba(255, 140, 66, 0.3);
  color: white;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
}

.fun-fact {
  padding: 16px;
  background: rgba(255, 140, 66, 0.2);
  border-radius: 12px;
  border-left: 4px solid #FF8C42;
  color: rgba(255, 255, 255, 0.9);
}

.modal-footer {
  padding: 0 24px 24px;
}

.modal-action-btn {
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.modal-action-btn.primary {
  background: linear-gradient(135deg, #FF8C42 0%, #FF6B35 100%);
  color: white;
  box-shadow: 0 4px 20px rgba(255, 107, 53, 0.4);
}

.modal-action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(255, 107, 53, 0.5);
}

@media (max-width: 480px) {
  .food-card {
    max-width: 100%;
  }
  
  .card-image {
    height: 160px;
  }
  
  .food-emoji {
    font-size: 60px;
  }
  
  .food-name {
    font-size: 18px;
  }
  
  .card-actions {
    flex-direction: column;
  }
  
  .action-btn {
    width: 100%;
  }
}
</style>
