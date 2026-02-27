<template>
  <div class="restaurant-card">
    <div class="card-main">
      <div class="restaurant-info">
        <h3 class="restaurant-name">{{ restaurant.name }}</h3>
        <div class="restaurant-meta">
          <span class="meta-item distance">
            <span class="meta-icon">📍</span>
            <span class="meta-text">{{ restaurant.distanceText }}</span>
          </span>
          <span class="meta-item rating" v-if="restaurant.rating">
            <span class="meta-icon">⭐</span>
            <span class="meta-text">{{ restaurant.rating }}</span>
          </span>
          <span class="meta-item price" v-if="restaurant.price">
            <span class="meta-text">{{ restaurant.price }}</span>
          </span>
        </div>
        <p class="restaurant-address">{{ restaurant.address }}</p>
        <div class="restaurant-tags" v-if="restaurant.tags && restaurant.tags.length > 0">
          <span v-for="(tag, index) in restaurant.tags.slice(0, 3)" :key="index" class="tag">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>

    <div class="card-actions">
      <button class="action-btn navigate-btn" @click="handleNavigate">
        <span class="btn-icon">🧭</span>
        <span class="btn-text">导航</span>
      </button>
      <button class="action-btn call-btn" v-if="restaurant.phone" @click="handleCall">
        <span class="btn-icon">📞</span>
        <span class="btn-text">电话</span>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  restaurant: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['navigate', 'call'])

const handleNavigate = () => {
  emit('navigate', props.restaurant)
}

const handleCall = () => {
  emit('call', props.restaurant)
}
</script>

<style scoped>
.restaurant-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.restaurant-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.card-main {
  display: flex;
  gap: 16px;
}

.restaurant-info {
  flex: 1;
  min-width: 0;
}

.restaurant-name {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 8px;
  line-height: 1.3;
}

.restaurant-meta {
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
}

.meta-item.distance {
  color: #FF8C42;
  font-weight: 600;
}

.meta-item.rating {
  color: #FFB800;
  font-weight: 600;
}

.meta-item.price {
  color: #4CAF50;
  font-weight: 600;
}

.meta-icon {
  font-size: 14px;
}

.restaurant-address {
  font-size: 13px;
  color: #888;
  margin-bottom: 12px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.restaurant-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tag {
  padding: 4px 10px;
  background: #FFF3E0;
  color: #E65100;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 500;
}

.card-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 16px;
  border: none;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.navigate-btn {
  background: linear-gradient(135deg, #FF8C42 0%, #FF6B35 100%);
  color: white;
  box-shadow: 0 2px 8px rgba(255, 107, 53, 0.3);
}

.navigate-btn:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.4);
}

.call-btn {
  background: #f5f5f5;
  color: #666;
}

.call-btn:hover {
  background: #e8e8e8;
  transform: scale(1.02);
}

.btn-icon {
  font-size: 14px;
}

@media (max-width: 480px) {
  .restaurant-card {
    padding: 16px;
  }

  .restaurant-name {
    font-size: 16px;
  }

  .action-btn {
    padding: 10px 12px;
  }
}
</style>
