// 餐厅搜索服务 - 使用百度地图API
import { locationService } from './location'

// 菜品关键词映射表 - 将菜品名称映射到搜索关键词
// 每个菜品可以有多个搜索关键词，按优先级排序
const foodKeywordMap = {
  // ===== 中式美食 =====
  // 川菜
  '麻辣火锅': ['火锅', '麻辣火锅', '重庆火锅', '海底捞', '呷哺呷哺'],
  '麻婆豆腐': ['麻婆豆腐', '川菜', '川菜馆'],
  '宫保鸡丁': ['宫保鸡丁', '川菜', '川菜馆'],
  '水煮鱼': ['水煮鱼', '川菜', '鱼火锅'],
  '回锅肉': ['回锅肉', '川菜', '川菜馆'],
  '夫妻肺片': ['夫妻肺片', '凉菜', '卤味'],
  '口水鸡': ['口水鸡', '凉菜', '川菜'],
  '担担面': ['担担面', '面馆', '四川小吃'],
  '鱼香肉丝': ['鱼香肉丝', '川菜', '川菜馆'],
  '重庆小面': ['重庆小面', '面馆', '小面'],
  '宜宾燃面': ['燃面', '面馆', '四川小吃'],
  '钵钵鸡': ['钵钵鸡', '冷串', '串串香'],
  '三大炮': ['成都小吃', '四川小吃'],
  '蛋烘糕': ['成都小吃', '四川小吃'],
  '龙抄手': ['抄手', '馄饨', '成都小吃'],
  '钟水饺': ['水饺', '饺子', '成都小吃'],
  '赖汤圆': ['汤圆', '成都小吃'],
  '宜宾凉糕': ['凉糕', '甜品', '成都小吃'],
  
  // 粤菜
  '北京烤鸭': ['烤鸭', '北京烤鸭', '全聚德', '大董'],
  '白切鸡': ['白切鸡', '粤菜', '粤菜馆'],
  '虾饺': ['虾饺', '早茶', '茶餐厅', '港式茶餐厅'],
  '叉烧': ['叉烧', '烧腊', '粤菜', '烧腊店'],
  '烧鹅': ['烧鹅', '烧腊', '粤菜', '烧腊店'],
  '肠粉': ['肠粉', '早茶', '茶餐厅'],
  '煲仔饭': ['煲仔饭', '粤菜', '广式煲仔饭'],
  '蛋挞': ['蛋挞', '茶餐厅', '烘焙', '甜品'],
  '双皮奶': ['双皮奶', '甜品', '糖水铺'],
  '凤爪': ['凤爪', '早茶', '茶餐厅'],
  '排骨': ['蒸排骨', '早茶', '茶餐厅'],
  '流沙包': ['流沙包', '早茶', '茶餐厅'],
  '叉烧包': ['叉烧包', '早茶', '茶餐厅'],
  '榴莲酥': ['榴莲酥', '早茶', '茶餐厅'],
  '云吞面': ['云吞面', '面馆', '茶餐厅'],
  
  // 江浙菜
  '西湖醋鱼': ['西湖醋鱼', '江浙菜', '杭帮菜'],
  '东坡肉': ['东坡肉', '江浙菜', '杭帮菜'],
  '糖醋排骨': ['糖醋排骨', '江浙菜', '家常菜'],
  '生煎包': ['生煎包', '生煎', '江浙小吃'],
  '小馄饨': ['小馄饨', '馄饨', '江浙小吃'],
  '蟹粉小笼': ['蟹粉小笼', '小笼包', '江浙菜'],
  '葱油拌面': ['葱油拌面', '面馆', '江浙小吃'],
  '桂花糖藕': ['桂花糖藕', '凉菜', '江浙菜'],
  
  // 湘菜
  '剁椒鱼头': ['剁椒鱼头', '湘菜', '湘菜馆'],
  '辣椒炒肉': ['辣椒炒肉', '湘菜', '湘菜馆'],
  '口味虾': ['口味虾', '小龙虾', '湘菜', '夜宵'],
  '臭豆腐': ['臭豆腐', '小吃', '长沙小吃'],
  '糖油粑粑': ['糖油粑粑', '小吃', '长沙小吃'],
  
  // 鲁菜
  '糖醋鲤鱼': ['糖醋鲤鱼', '鲁菜', '鲁菜馆'],
  '九转大肠': ['九转大肠', '鲁菜', '鲁菜馆'],
  '葱烧海参': ['葱烧海参', '鲁菜', '海鲜'],
  '德州扒鸡': ['德州扒鸡', '熟食', '卤味'],
  
  // 东北菜
  '锅包肉': ['锅包肉', '东北菜', '东北菜馆'],
  '地三鲜': ['地三鲜', '东北菜', '东北菜馆'],
  '小鸡炖蘑菇': ['小鸡炖蘑菇', '东北菜', '东北菜馆'],
  '猪肉炖粉条': ['猪肉炖粉条', '东北菜', '东北菜馆'],
  '东北大拉皮': ['东北大拉皮', '凉菜', '东北菜'],
  '烤冷面': ['烤冷面', '小吃', '东北小吃'],
  
  // 西北菜
  '兰州拉面': ['兰州拉面', '牛肉面', '拉面', '兰州牛肉拉面'],
  '肉夹馍': ['肉夹馍', '陕西小吃', '凉皮肉夹馍'],
  '羊肉泡馍': ['羊肉泡馍', '陕西小吃', '泡馍'],
  '凉皮': ['凉皮', '陕西小吃', '面皮'],
  'biangbiang面': ['biangbiang面', '面馆', '陕西面食'],
  '臊子面': ['臊子面', '面馆', '陕西面食'],
  '大盘鸡': ['大盘鸡', '新疆菜', '新疆大盘鸡'],
  '烤羊肉串': ['烤羊肉串', '烧烤', '新疆菜', '羊肉串'],
  
  // 云南菜
  '过桥米线': ['过桥米线', '云南米线', '米线'],
  '汽锅鸡': ['汽锅鸡', '云南菜', '云南菜馆'],
  '云南米线': ['云南米线', '米线', '过桥米线'],
  '鲜花饼': ['鲜花饼', '云南特产', '糕点'],
  
  // 福建菜
  '佛跳墙': ['佛跳墙', '福建菜', '闽菜'],
  '沙茶面': ['沙茶面', '厦门小吃', '闽南小吃'],
  '土笋冻': ['土笋冻', '厦门小吃', '闽南小吃'],
  '福州鱼丸': ['福州鱼丸', '鱼丸', '福建小吃'],
  
  // 徽菜
  '臭鳜鱼': ['臭鳜鱼', '徽菜', '徽菜馆'],
  '毛豆腐': ['毛豆腐', '徽菜', '徽州小吃'],
  '黄山烧饼': ['黄山烧饼', '烧饼', '徽州小吃'],
  
  // 北京菜
  '炸酱面': ['炸酱面', '北京菜', '老北京炸酱面'],
  '豆汁儿': ['豆汁', '北京小吃', '老北京小吃'],
  '卤煮火烧': ['卤煮', '北京小吃', '老北京卤煮'],
  '驴打滚': ['驴打滚', '北京小吃', '老北京糕点'],
  '艾窝窝': ['艾窝窝', '北京小吃', '老北京糕点'],
  
  // 台湾菜
  '卤肉饭': ['卤肉饭', '台湾菜', '台湾小吃'],
  '蚵仔煎': ['蚵仔煎', '台湾小吃', '闽南小吃'],
  '大肠包小肠': ['大肠包小肠', '台湾小吃'],
  '牛肉面': ['牛肉面', '台湾牛肉面', '红烧牛肉面'],
  '盐酥鸡': ['盐酥鸡', '台湾小吃', '炸鸡'],
  '棺材板': ['棺材板', '台湾小吃'],
  
  // 湖北菜
  '武汉热干面': ['热干面', '武汉小吃', '热干面馆'],
  
  // 山西菜
  '刀削面': ['刀削面', '面馆', '山西面食'],
  
  // 河南菜
  '河南烩面': ['烩面', '面馆', '河南烩面'],
  
  // 朝鲜族
  '延吉冷面': ['冷面', '面馆', '朝鲜冷面'],
  
  // ===== 面食类 =====
  '小笼包': ['小笼包', '汤包', '包子', '灌汤包'],
  '煎饼果子': ['煎饼果子', '煎饼', '天津煎饼'],
  '炒饭': ['炒饭', '炒饭店', '扬州炒饭'],
  '麻辣烫': ['麻辣烫', '冒菜', '串串香'],
  '红烧肉': ['红烧肉', '家常菜', '本帮菜'],
  '酸菜鱼': ['酸菜鱼', '鱼火锅', '水煮鱼'],
  '蒸蛋羹': ['蒸蛋', '家常菜', '水蒸蛋'],
  
  // ===== 传统糕点 =====
  '月饼': ['月饼', '糕点', '烘焙', '中秋月饼'],
  '粽子': ['粽子', '嘉兴粽子', '端午粽子'],
  '汤圆': ['汤圆', '元宵', '甜品'],
  '年糕': ['年糕', '糕点', '韩式年糕'],
  '麻花': ['麻花', '糕点', '天津麻花'],
  '桃酥': ['桃酥', '糕点', '传统糕点'],
  '绿豆糕': ['绿豆糕', '糕点', '传统糕点'],
  '蛋黄酥': ['蛋黄酥', '糕点', '烘焙'],
  '凤梨酥': ['凤梨酥', '糕点', '台湾特产'],
  '老婆饼': ['老婆饼', '糕点', '广式糕点'],
  '芋圆': ['芋圆', '甜品', '鲜芋仙'],
  
  // ===== 街头小吃 =====
  '铁板鱿鱼': ['铁板鱿鱼', '烧烤', '铁板烧'],
  '狼牙土豆': ['狼牙土豆', '小吃', '土豆'],
  '烤面筋': ['烤面筋', '烧烤', '面筋'],
  '糖葫芦': ['糖葫芦', '小吃', '冰糖葫芦'],
  '爆米花': ['爆米花', '零食', '影院零食'],
  '糖炒栗子': ['糖炒栗子', '小吃', '栗子'],
  
  // ===== 西式美食 =====
  '牛排': ['牛排', '西餐', '牛排馆', '西餐厅'],
  '披萨': ['披萨', '比萨', '西餐', '必胜客', '达美乐'],
  '汉堡': ['汉堡', '快餐', '汉堡王', '麦当劳', '肯德基', '华莱士'],
  '意大利面': ['意大利面', '意面', '西餐', '意式餐厅'],
  '沙拉': ['沙拉', '轻食', '西餐', '轻食店'],
  '三明治': ['三明治', '赛百味', 'subway'],
  '炸鸡': ['炸鸡', '肯德基', '快餐', '韩式炸鸡'],
  '薯条': ['薯条', '快餐', '麦当劳'],
  '蛋糕': ['蛋糕', '烘焙', '甜品店', '面包店'],
  '冰淇淋': ['冰淇淋', '冰激凌', '甜品', '哈根达斯', 'DQ'],
  
  // 美式
  '美式烤肉': ['烤肉', '烧烤', '美式烤肉', 'BBQ'],
  '芝士汉堡': ['汉堡', '芝士汉堡', '汉堡王'],
  '热狗': ['热狗', '快餐'],
  '炸鸡华夫饼': ['华夫饼', '早午餐', 'brunch'],
  '烤肋排': ['烤肋排', '烧烤', '美式烧烤'],
  '芝士通心粉': ['通心粉', '西餐', '意式餐厅'],
  '火鸡三明治': ['三明治', '快餐'],
  '奶昔': ['奶昔', '饮品', '麦当劳'],
  '蓝莓松饼': ['松饼', '早午餐', 'pancake'],
  '牛肉塔可': ['塔可', '墨西哥菜', 'taco'],
  '布法罗鸡翅': ['鸡翅', '西餐', ' Buffalo Wings'],
  '蛤蜊浓汤': ['浓汤', '西餐', '海鲜汤'],
  '龙虾卷': ['龙虾', '海鲜', '龙虾三明治'],
  '烤奶酪三明治': ['三明治', '西餐'],
  '苹果派': ['苹果派', '烘焙', '派'],
  '玉米热狗': ['热狗', '快餐'],
  '南方炸鸡排': ['鸡排', '炸鸡', '快餐'],
  '凯撒沙拉': ['沙拉', '轻食', '凯撒沙拉'],
  '纽约芝士蛋糕': ['芝士蛋糕', '蛋糕', '烘焙'],
  'BBQ烤鸡': ['烤鸡', '烧烤', 'BBQ'],
  '墨西哥卷饼碗': ['墨西哥菜', 'burrito'],
  '洋葱圈': ['洋葱圈', '快餐', '汉堡王'],
  '土豆泥': ['土豆泥', '快餐', '肯德基'],
  '烤火鸡': ['烤火鸡', '西餐', '感恩节'],
  '肉桂卷': ['肉桂卷', '烘焙', '面包'],
  '巧克力曲奇': ['曲奇', '饼干', '烘焙'],
  '红薯薯条': ['薯条', '快餐'],
  '费城芝士牛排': ['芝士牛排', '三明治'],
  '煎饼早餐': ['早午餐', '煎饼', 'brunch'],
  '考伯沙拉': ['沙拉', '轻食'],
  
  // ===== 意大利美食 =====
  '玛格丽塔披萨': ['披萨', '意大利菜', '玛格丽特披萨'],
  '千层面': ['千层面', '意大利菜', 'lasagna'],
  '烩饭': ['烩饭', '意大利菜', 'risotto'],
  '意大利饺子': ['饺子', '意大利菜', 'ravioli'],
  '意式浓汤': ['浓汤', '意大利菜', 'minestrone'],
  '烤面包片': ['面包', '意大利菜', 'bruschetta'],
  
  // ===== 印度美食 =====
  '咖喱鸡': ['咖喱', '印度菜', '印度餐厅'],
  '馕': ['馕', '印度菜', '印度餐厅'],
  '印度香饭': ['香饭', '印度菜', 'biryani'],
  '萨莫萨三角饺': ['印度小吃', 'samosa'],
  '印度酸奶': ['酸奶', '印度菜', 'lassi'],
  '坦都里鸡': ['坦都里鸡', '印度菜', 'tandoori'],
  
  // ===== 法国美食 =====
  '法棍': ['法棍', '面包', '烘焙', '法式面包'],
  '蜗牛': ['蜗牛', '法国菜', '法式餐厅'],
  '可丽饼': ['可丽饼', '法国菜', 'crepe'],
  '洋葱汤': ['洋葱汤', '法国菜', '法式洋葱汤'],
  '马卡龙': ['马卡龙', '甜品', '法式甜品'],
  '红酒烩牛肉': ['烩牛肉', '法国菜', '勃艮第牛肉'],
  
  // ===== 地中海美食 =====
  '希腊沙拉': ['沙拉', '希腊菜', '地中海菜'],
  '鹰嘴豆泥': ['鹰嘴豆泥', '中东菜', 'hummus'],
  '皮塔饼': ['皮塔饼', '中东菜', 'pita'],
  '烤羊排': ['烤羊排', '烧烤', '地中海菜'],
  '炸豆丸子': ['falafel', '中东菜', '炸豆饼'],
  '海鲜烩饭': ['海鲜烩饭', '西班牙菜', 'paella'],
  
  // ===== 墨西哥美食 =====
  '墨西哥玉米片': ['玉米片', '墨西哥菜', 'nachos'],
  '鸡肉塔可': ['塔可', '墨西哥菜', 'taco'],
  '墨西哥卷饼': ['卷饼', '墨西哥菜', 'burrito'],
  '辣椒镶肉': ['墨西哥菜', 'chile relleno'],
  '吉事果': ['吉事果', '西班牙小吃', 'churros'],
  '墨西哥米粥': ['墨西哥菜', '甜品'],
  
  // ===== 日韩美食 =====
  '寿司': ['寿司', '日料', '日本料理', '寿司店'],
  '拉面': ['拉面', '日料', '日本拉面', '味千拉面'],
  '天妇罗': ['天妇罗', '日料', '日本料理'],
  '烤肉': ['烤肉', '韩式烤肉', '日式烤肉', '烤肉店'],
  '石锅拌饭': ['石锅拌饭', '韩料', '韩国料理', '韩式料理'],
  '泡菜汤': ['泡菜汤', '韩料', '韩国料理'],
  '炸鸡啤酒': ['炸鸡', '韩料', '韩式炸鸡'],
  '鳗鱼饭': ['鳗鱼饭', '日料', '日本料理'],
  
  // ===== 东南亚美食 =====
  '冬阴功汤': ['冬阴功', '泰国菜', '泰式餐厅'],
  '咖喱饭': ['咖喱饭', '咖喱', '日式咖喱'],
  '越南河粉': ['河粉', '越南菜', '越南粉', 'pho'],
  '海南鸡饭': ['海南鸡饭', '新加坡菜', '东南亚菜'],
  
  // ===== 饮品零食 =====
  '珍珠奶茶': ['奶茶', '奶茶店', '喜茶', '奈雪', '一点点', 'coco'],
  '咖啡': ['咖啡', '咖啡店', '星巴克', '瑞幸', 'costa'],
  '水果': ['水果', '水果店', '鲜切水果'],
  '酸奶': ['酸奶', '酸奶店', '一鸣真鲜奶吧'],
  '坚果': ['坚果', '零食', '炒货'],
  '关东煮': ['关东煮', '便利店', '7-11', '全家'],
  '烤串': ['烤串', '烧烤', '串串', '烧烤店'],
  '小龙虾': ['小龙虾', '夜宵', '龙虾馆'],
  
  // ===== 轻食简餐 =====
  '燕麦粥': ['粥', '早餐', '粥铺'],
  '全麦面包': ['面包', '烘焙', '面包店'],
  '鸡胸肉': ['轻食', '健身餐', '沙拉'],
  '蔬菜汤': ['汤', '轻食', ' soup'],
  '水煮蛋': ['早餐', '便利店'],
  
  // ===== 特色场景 =====
  '火锅': ['火锅', '火锅店', '海底捞', '呷哺呷哺', '小龙坎'],
  '烧烤': ['烧烤', '烤肉', '烧烤店', '烤肉店', '大排档'],
  '自助餐': ['自助餐', '自助餐厅', '海鲜自助'],
  '外卖快餐': ['快餐', '外卖', '快餐店'],
  '方便面': ['便利店', '超市']
}

class RestaurantService {
  constructor() {
    this.searchResults = []
  }

  // 根据菜品名称获取搜索关键词
  getSearchKeywords(foodName) {
    const keywords = foodKeywordMap[foodName]
    if (keywords && keywords.length > 0) {
      return keywords
    }
    // 如果没有映射，返回菜品名称本身
    return [foodName]
  }

  // 搜索附近餐厅
  async searchNearbyRestaurants(foodName, options = {}) {
    const {
      radius = 5000, // 默认搜索5公里
      pageSize = 20,
      pageNum = 0
    } = options

    try {
      // 获取当前位置
      let position
      let usingDefaultLocation = false
      
      try {
        console.log('餐厅搜索：开始获取位置...')
        position = await locationService.getCurrentPosition()
        console.log('餐厅搜索：获取位置成功:', position)
      } catch (locError) {
        console.warn('定位失败，使用默认位置（北京）:', locError)
        // 使用默认位置（北京市中心）
        position = { lat: 39.9042, lng: 116.4074 }
        usingDefaultLocation = true
      }
      
      if (!position) {
        console.error('无法获取任何位置信息')
        throw new Error('无法获取当前位置')
      }

      console.log('餐厅搜索：使用位置:', position, '是否默认位置:', usingDefaultLocation)

      // 获取搜索关键词
      const keywords = this.getSearchKeywords(foodName)
      
      console.log('餐厅搜索：搜索关键词列表:', keywords)

      // 检查百度地图API是否可用
      if (typeof BMap === 'undefined') {
        console.error('百度地图API未加载')
        throw new Error('地图服务暂时不可用')
      }

      // 尝试多个关键词搜索，直到找到结果
      let allRestaurants = []
      let usedKeyword = keywords[0]
      
      for (const keyword of keywords) {
        console.log(`餐厅搜索：尝试关键词 "${keyword}"...`)
        
        try {
          // 创建搜索实例
          const localSearch = new BMap.LocalSearch(new BMap.Map('temp-map-container'), {
            onSearchComplete: (results) => {
              this.searchResults = results
            }
          })

          // 执行搜索
          const searchResults = await this.performSearch(localSearch, keyword, position, radius, pageSize)
          
          // 处理搜索结果
          const restaurants = this.processSearchResults(searchResults, position)
          
          console.log(`餐厅搜索：关键词 "${keyword}" 找到 ${restaurants.length} 家餐厅`)
          
          if (restaurants.length > 0) {
            allRestaurants = restaurants
            usedKeyword = keyword
            break // 找到结果就停止
          }
        } catch (searchError) {
          console.warn(`关键词 "${keyword}" 搜索失败:`, searchError.message)
          // 继续尝试下一个关键词
        }
      }
      
      // 如果没有找到任何结果，尝试使用通用关键词
      if (allRestaurants.length === 0) {
        console.log('餐厅搜索：使用通用关键词 "美食"...')
        try {
          const localSearch = new BMap.LocalSearch(new BMap.Map('temp-map-container'))
          const searchResults = await this.performSearch(localSearch, '美食', position, radius, pageSize)
          allRestaurants = this.processSearchResults(searchResults, position)
          usedKeyword = '美食'
        } catch (e) {
          console.warn('通用关键词搜索也失败了')
        }
      }
      
      console.log('餐厅搜索：最终找到餐厅数量:', allRestaurants.length)
      
      return {
        success: true,
        data: allRestaurants,
        keyword: usedKeyword,
        total: allRestaurants.length,
        usingDefaultLocation: usingDefaultLocation
      }
    } catch (error) {
      console.error('搜索餐厅失败:', error)
      return {
        success: false,
        error: error.message,
        data: []
      }
    }
  }

  // 执行搜索
  performSearch(localSearch, keyword, position, radius, pageSize) {
    return new Promise((resolve, reject) => {
      const point = new BMap.Point(position.lng, position.lat)
      
      // 创建圆形区域
      const circle = new BMap.Circle(point, radius)
      
      // 设置搜索完成回调
      const onSearchComplete = (results) => {
        if (localSearch.getStatus() === BMAP_STATUS_SUCCESS) {
          resolve(results)
        } else {
          reject(new Error('搜索失败'))
        }
      }
      
      // 设置搜索参数
      localSearch.setSearchCompleteCallback(onSearchComplete)
      localSearch.setPageCapacity(pageSize)
      
      // 执行附近搜索
      localSearch.searchNearby(keyword, point, radius)
    })
  }

  // 处理搜索结果
  processSearchResults(results, userPosition) {
    if (!results || !results.getNumPois) {
      return []
    }

    const restaurants = []
    const numResults = results.getNumPois()
    
    for (let i = 0; i < numResults; i++) {
      const poi = results.getPoi(i)
      if (poi) {
        // 计算距离
        const distance = locationService.calculateDistance(
          userPosition.lat,
          userPosition.lng,
          poi.point.lat,
          poi.point.lng
        )
        
        restaurants.push({
          id: poi.uid || `restaurant_${i}`,
          name: poi.title,
          address: poi.address,
          phone: poi.phoneNumber || '',
          latitude: poi.point.lat,
          longitude: poi.point.lng,
          distance: Math.round(distance),
          distanceText: locationService.formatDistance(distance),
          rating: this.generateRating(), // 百度地图API不返回评分，这里模拟
          price: this.estimatePrice(), // 模拟价格
          tags: this.extractTags(poi),
          url: poi.url || ''
        })
      }
    }
    
    // 按距离排序
    restaurants.sort((a, b) => a.distance - b.distance)
    
    return restaurants
  }

  // 生成模拟评分（实际项目中应该从其他API获取或使用真实数据）
  generateRating() {
    // 生成3.5-5.0之间的随机评分
    return (3.5 + Math.random() * 1.5).toFixed(1)
  }

  // 估算价格（模拟数据）
  estimatePrice() {
    const prices = ['¥', '¥¥', '¥¥¥', '¥¥¥¥']
    const weights = [0.3, 0.4, 0.2, 0.1] // 价格分布权重
    const random = Math.random()
    let sum = 0
    for (let i = 0; i < prices.length; i++) {
      sum += weights[i]
      if (random < sum) {
        return prices[i]
      }
    }
    return prices[0]
  }

  // 提取标签
  extractTags(poi) {
    const tags = []
    if (poi.tags) {
      tags.push(...poi.tags.split(';'))
    }
    // 添加一些通用标签
    if (tags.length === 0) {
      tags.push('美食')
    }
    return tags.slice(0, 3) // 最多3个标签
  }

  // 获取餐厅详情
  async getRestaurantDetail(uid) {
    return new Promise((resolve, reject) => {
      const localSearch = new BMap.LocalSearch(new BMap.Map('temp-map-container'))
      
      localSearch.setSearchCompleteCallback((results) => {
        if (localSearch.getStatus() === BMAP_STATUS_SUCCESS && results.getNumPois() > 0) {
          const poi = results.getPoi(0)
          resolve({
            id: poi.uid,
            name: poi.title,
            address: poi.address,
            phone: poi.phoneNumber || '',
            latitude: poi.point.lat,
            longitude: poi.point.lng,
            url: poi.url || ''
          })
        } else {
          reject(new Error('获取餐厅详情失败'))
        }
      })
      
      localSearch.search(uid)
    })
  }

  // 打开导航
  openNavigation(restaurant) {
    // 构建导航URL
    const url = `https://api.map.baidu.com/marker?location=${restaurant.latitude},${restaurant.longitude}&title=${encodeURIComponent(restaurant.name)}&content=${encodeURIComponent(restaurant.address)}&output=html&src=webapp.baidu.openAPIdemo`
    window.open(url, '_blank')
  }
}

// 导出单例
export const restaurantService = new RestaurantService()
