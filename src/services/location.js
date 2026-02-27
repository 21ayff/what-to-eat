// 位置服务 - 处理定位相关功能

class LocationService {
  constructor() {
    this.currentPosition = null
  }

  // 获取当前位置
  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('浏览器不支持定位功能'))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          resolve(this.currentPosition)
        },
        (error) => {
          console.error('获取位置失败:', error)
          reject(error)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      )
    })
  }

  // 计算两点之间的距离（使用 Haversine 公式）
  calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371000 // 地球半径，单位：米
    const dLat = this.deg2rad(lat2 - lat1)
    const dLng = this.deg2rad(lng2 - lng1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  // 角度转弧度
  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  // 格式化距离显示
  formatDistance(distance) {
    if (distance < 1000) {
      return Math.round(distance) + 'm'
    } else {
      return (distance / 1000).toFixed(1) + 'km'
    }
  }
}

// 导出单例
export const locationService = new LocationService()
