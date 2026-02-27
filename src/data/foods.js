// 美食数据库
export const foods = [
  // 中式美食
  { id: 1, name: '麻辣火锅', category: '中式', tags: ['辣', '热', '聚餐', '重口', '晚餐', '冬天'], price: '高', calories: '高', emoji: '🍲', description: '麻辣鲜香，聚会首选' },
  { id: 2, name: '北京烤鸭', category: '中式', tags: ['经典', '聚餐', '午餐', '晚餐', '正式'], price: '高', calories: '中', emoji: '🦆', description: '皮脆肉嫩，国宴名菜' },
  { id: 3, name: '小笼包', category: '中式', tags: ['清淡', '早餐', '午餐', '一人食', '热'], price: '低', calories: '中', emoji: '🥟', description: '汤汁鲜美，一口一个' },
  { id: 4, name: '兰州拉面', category: '中式', tags: ['热', '面食', '午餐', '晚餐', '一人食', '平价'], price: '低', calories: '中', emoji: '🍜', description: '汤清味鲜，面条劲道' },
  { id: 5, name: '麻辣烫', category: '中式', tags: ['辣', '热', '一人食', '午餐', '晚餐', '自选'], price: '中', calories: '中', emoji: '🥘', description: '自选食材，麻辣过瘾' },
  { id: 6, name: '炒饭', category: '中式', tags: ['热', '主食', '午餐', '晚餐', '一人食', '快捷'], price: '低', calories: '高', emoji: '🍚', description: '粒粒分明，香气四溢' },
  { id: 7, name: '煎饼果子', category: '中式', tags: ['早餐', '街头', '一人食', '热', '快捷'], price: '低', calories: '中', emoji: '🌯', description: '外酥里嫩，早餐之王' },
  { id: 8, name: '红烧肉', category: '中式', tags: ['甜', '热', '午餐', '晚餐', '下饭', '家常'], price: '中', calories: '高', emoji: '🥩', description: '肥而不腻，入口即化' },
  { id: 9, name: '酸菜鱼', category: '中式', tags: ['辣', '酸', '热', '聚餐', '午餐', '晚餐'], price: '中', calories: '中', emoji: '🐟', description: '酸辣开胃，鱼肉鲜嫩' },
  { id: 10, name: '蒸蛋羹', category: '中式', tags: ['清淡', '软', '早餐', '一人食', '健康'], price: '低', calories: '低', emoji: '🥚', description: '嫩滑如丝，营养丰富' },
  
  // 更多中式美食 - 川菜
  { id: 111, name: '麻婆豆腐', category: '中式', tags: ['辣', '热', '川菜', '下饭', '午餐', '晚餐'], price: '低', calories: '中', emoji: '🥘', description: '麻辣鲜香，豆腐嫩滑' },
  { id: 112, name: '宫保鸡丁', category: '中式', tags: ['辣', '川菜', '午餐', '晚餐', '下饭'], price: '中', calories: '中', emoji: '🍗', description: '鸡肉嫩滑，花生酥脆' },
  { id: 113, name: '水煮鱼', category: '中式', tags: ['辣', '川菜', '聚餐', '晚餐', '重口'], price: '中', calories: '高', emoji: '🐟', description: '麻辣鲜香，鱼肉滑嫩' },
  { id: 114, name: '回锅肉', category: '中式', tags: ['辣', '川菜', '午餐', '晚餐', '下饭'], price: '中', calories: '高', emoji: '🥓', description: '肥而不腻，香辣可口' },
  { id: 115, name: '夫妻肺片', category: '中式', tags: ['辣', '川菜', '凉菜', '下酒'], price: '中', calories: '中', emoji: '🥩', description: '麻辣浓香，肉质劲道' },
  { id: 116, name: '口水鸡', category: '中式', tags: ['辣', '川菜', '凉菜', '鸡肉'], price: '中', calories: '中', emoji: '🍗', description: '麻辣鲜香，鸡肉嫩滑' },
  { id: 117, name: '担担面', category: '中式', tags: ['辣', '面食', '川菜', '一人食', '午餐'], price: '低', calories: '中', emoji: '🍜', description: '麻辣味浓，面条劲道' },
  { id: 118, name: '鱼香肉丝', category: '中式', tags: ['川菜', '甜辣', '午餐', '晚餐', '下饭'], price: '中', calories: '中', emoji: '🥩', description: '鱼香味浓，肉丝嫩滑' },
  
  // 粤菜
  { id: 119, name: '白切鸡', category: '中式', tags: ['清淡', '粤菜', '午餐', '晚餐', '传统'], price: '中', calories: '中', emoji: '🍗', description: '皮爽肉嫩，原汁原味' },
  { id: 120, name: '虾饺', category: '中式', tags: ['清淡', '粤菜', '早茶', '点心'], price: '中', calories: '中', emoji: '🥟', description: '皮薄馅大，虾肉鲜美' },
  { id: 121, name: '叉烧', category: '中式', tags: ['甜', '粤菜', '烧腊', '午餐', '晚餐'], price: '中', calories: '中', emoji: '🥓', description: '蜜汁香甜，肉质软嫩' },
  { id: 122, name: '烧鹅', category: '中式', tags: ['粤菜', '烧腊', '聚餐', '正式'], price: '高', calories: '高', emoji: '🦆', description: '皮脆肉嫩，油香四溢' },
  { id: 123, name: '肠粉', category: '中式', tags: ['清淡', '粤菜', '早餐', '早茶', '一人食'], price: '低', calories: '低', emoji: '🫓', description: '皮薄滑嫩，酱汁鲜美' },
  { id: 124, name: '煲仔饭', category: '中式', tags: ['粤菜', '主食', '一人食', '午餐', '晚餐'], price: '中', calories: '中', emoji: '🍚', description: '锅巴香脆，配料丰富' },
  { id: 125, name: '蛋挞', category: '中式', tags: ['甜', '粤菜', '点心', '下午茶'], price: '中', calories: '中', emoji: '🥧', description: '酥皮香脆，蛋馅嫩滑' },
  { id: 126, name: '双皮奶', category: '中式', tags: ['甜', '粤菜', '甜品', '下午茶'], price: '中', calories: '中', emoji: '🥛', description: '奶香浓郁，口感细腻' },
  
  // 江浙菜
  { id: 127, name: '西湖醋鱼', category: '中式', tags: ['酸甜', '江浙菜', '鱼类', '正式'], price: '高', calories: '中', emoji: '🐟', description: '酸甜可口，鱼肉鲜嫩' },
  { id: 128, name: '东坡肉', category: '中式', tags: ['甜', '江浙菜', '猪肉', '传统'], price: '中', calories: '高', emoji: '🥩', description: '肥而不腻，入口即化' },
  { id: 129, name: '糖醋排骨', category: '中式', tags: ['酸甜', '江浙菜', '猪肉', '家常'], price: '中', calories: '中', emoji: '🍖', description: '酸甜开胃，外酥里嫩' },
  { id: 130, name: '生煎包', category: '中式', tags: ['江浙菜', '早餐', '一人食', '热'], price: '低', calories: '中', emoji: '🥟', description: '底脆馅鲜，汤汁丰富' },
  { id: 131, name: '小馄饨', category: '中式', tags: ['清淡', '江浙菜', '早餐', '一人食'], price: '低', calories: '低', emoji: '🥟', description: '皮薄馅嫩，汤清味鲜' },
  { id: 132, name: '蟹粉小笼', category: '中式', tags: ['江浙菜', '点心', '早茶', '特色'], price: '高', calories: '中', emoji: '🥟', description: '蟹粉鲜美，汤汁浓郁' },
  { id: 133, name: '葱油拌面', category: '中式', tags: ['江浙菜', '面食', '一人食', '快捷'], price: '低', calories: '中', emoji: '🍜', description: '葱香浓郁，简单美味' },
  { id: 134, name: '桂花糖藕', category: '中式', tags: ['甜', '江浙菜', '凉菜', '特色'], price: '中', calories: '中', emoji: '🪷', description: '软糯香甜，桂花香浓' },
  
  // 湘菜
  { id: 135, name: '剁椒鱼头', category: '中式', tags: ['辣', '湘菜', '聚餐', '鱼类', '重口'], price: '中', calories: '中', emoji: '🐟', description: '剁椒香辣，鱼肉鲜嫩' },
  { id: 136, name: '辣椒炒肉', category: '中式', tags: ['辣', '湘菜', '家常', '下饭'], price: '中', calories: '中', emoji: '🌶️', description: '香辣下饭，家常味道' },
  { id: 137, name: '口味虾', category: '中式', tags: ['辣', '湘菜', '夜宵', '聚餐'], price: '高', calories: '中', emoji: '🦞', description: '香辣过瘾，夏日必备' },
  { id: 138, name: '臭豆腐', category: '中式', tags: ['辣', '湘菜', '小吃', '街头'], price: '低', calories: '中', emoji: '🧈', description: '闻着臭吃着香，外酥内嫩' },
  { id: 139, name: '糖油粑粑', category: '中式', tags: ['甜', '湘菜', '小吃', '早餐'], price: '低', calories: '高', emoji: '🍡', description: '外酥内软，甜而不腻' },
  
  // 鲁菜
  { id: 140, name: '糖醋鲤鱼', category: '中式', tags: ['酸甜', '鲁菜', '鱼类', '传统'], price: '中', calories: '中', emoji: '🐟', description: '造型优美，酸甜可口' },
  { id: 141, name: '九转大肠', category: '中式', tags: ['鲁菜', '重口', '传统', '特色'], price: '高', calories: '高', emoji: '🥓', description: '酸甜苦辣咸，五味俱全' },
  { id: 142, name: '葱烧海参', category: '中式', tags: ['鲁菜', '海鲜', '高档', '正式'], price: '高', calories: '中', emoji: '🥒', description: '葱香浓郁，海参软糯' },
  { id: 143, name: '德州扒鸡', category: '中式', tags: ['鲁菜', '鸡肉', '传统', '熟食'], price: '中', calories: '中', emoji: '🍗', description: '五香脱骨，肉质酥烂' },
  
  // 东北菜
  { id: 144, name: '锅包肉', category: '中式', tags: ['酸甜', '东北菜', '猪肉', '聚餐'], price: '中', calories: '高', emoji: '🥩', description: '外酥里嫩，酸甜开胃' },
  { id: 145, name: '地三鲜', category: '中式', tags: ['东北菜', '素菜', '家常', '下饭'], price: '低', calories: '中', emoji: '🍆', description: '鲜香入味，东北经典' },
  { id: 146, name: '小鸡炖蘑菇', category: '中式', tags: ['东北菜', '炖菜', '聚餐', '热'], price: '中', calories: '中', emoji: '🍗', description: '鸡肉鲜嫩，蘑菇香浓' },
  { id: 147, name: '猪肉炖粉条', category: '中式', tags: ['东北菜', '炖菜', '主食', '热'], price: '中', calories: '高', emoji: '🍜', description: '猪肉软烂，粉条筋道' },
  { id: 148, name: '东北大拉皮', category: '中式', tags: ['东北菜', '凉菜', '夏季', '清爽'], price: '低', calories: '低', emoji: '🍜', description: '爽滑清凉，麻酱香浓' },
  
  // 西北菜
  { id: 149, name: '肉夹馍', category: '中式', tags: ['西北菜', '面食', '一人食', '街头'], price: '低', calories: '中', emoji: '🥙', description: '馍酥肉香，肥而不腻' },
  { id: 150, name: '羊肉泡馍', category: '中式', tags: ['西北菜', '面食', '热', '一人食'], price: '中', calories: '中', emoji: '🍲', description: '汤浓肉烂，暖胃暖心' },
  { id: 151, name: '凉皮', category: '中式', tags: ['西北菜', '凉菜', '夏季', '一人食'], price: '低', calories: '低', emoji: '🍜', description: '爽滑清凉，酸辣开胃' },
  { id: 152, name: 'biangbiang面', category: '中式', tags: ['西北菜', '面食', '一人食', '特色'], price: '中', calories: '中', emoji: '🍜', description: '面条宽如腰带，筋道有嚼劲' },
  { id: 153, name: '臊子面', category: '中式', tags: ['西北菜', '面食', '一人食', '酸辣'], price: '低', calories: '中', emoji: '🍜', description: '酸辣鲜香，面条细滑' },
  { id: 154, name: '大盘鸡', category: '中式', tags: ['西北菜', '辣', '聚餐', '主食'], price: '中', calories: '高', emoji: '🍗', description: '鸡肉土豆，配面绝配' },
  { id: 155, name: '烤羊肉串', category: '中式', tags: ['西北菜', '烧烤', '夜宵', '街头'], price: '中', calories: '中', emoji: '🍢', description: '外焦里嫩，孜然香浓' },
  
  // 云南菜
  { id: 156, name: '过桥米线', category: '中式', tags: ['云南菜', '热', '一人食', '汤粉'], price: '中', calories: '中', emoji: '🍜', description: '汤热料多，米线滑嫩' },
  { id: 157, name: '汽锅鸡', category: '中式', tags: ['云南菜', '清淡', '汤', '滋补'], price: '高', calories: '中', emoji: '🍗', description: '蒸汽烹制，原汁原味' },
  { id: 158, name: '云南米线', category: '中式', tags: ['云南菜', '一人食', '早餐', '热'], price: '低', calories: '中', emoji: '🍜', description: '米线细滑，配料丰富' },
  { id: 159, name: '鲜花饼', category: '中式', tags: ['云南菜', '甜', '点心', '特色'], price: '中', calories: '中', emoji: '🥮', description: '花香四溢，酥软香甜' },
  
  // 福建菜
  { id: 160, name: '佛跳墙', category: '中式', tags: ['福建菜', '高档', '汤', '滋补'], price: '高', calories: '中', emoji: '🍲', description: '山珍海味，营养丰富' },
  { id: 161, name: '沙茶面', category: '中式', tags: ['福建菜', '面食', '一人食', '特色'], price: '中', calories: '中', emoji: '🍜', description: '沙茶酱香，面条劲道' },
  { id: 162, name: '土笋冻', category: '中式', tags: ['福建菜', '凉菜', '特色', '小吃'], price: '中', calories: '低', emoji: '🍮', description: '晶莹剔透，口感Q弹' },
  { id: 163, name: '福州鱼丸', category: '中式', tags: ['福建菜', '汤', '一人食', '特色'], price: '中', calories: '中', emoji: '🍡', description: '皮薄馅大，汤汁鲜美' },
  
  // 徽菜
  { id: 164, name: '臭鳜鱼', category: '中式', tags: ['徽菜', '特色', '鱼类', '重口'], price: '中', calories: '中', emoji: '🐟', description: '闻着臭吃着香，肉质鲜嫩' },
  { id: 165, name: '毛豆腐', category: '中式', tags: ['徽菜', '特色', '素菜', '传统'], price: '低', calories: '中', emoji: '🧈', description: '毛茸茸的豆腐，煎炸后香酥' },
  { id: 166, name: '黄山烧饼', category: '中式', tags: ['徽菜', '点心', '小吃', '特色'], price: '低', calories: '中', emoji: '🫓', description: '酥脆多层，梅干菜香' },
  
  // 北京小吃
  { id: 167, name: '炸酱面', category: '中式', tags: ['北京', '面食', '一人食', '家常'], price: '低', calories: '中', emoji: '🍜', description: '酱香浓郁，菜码丰富' },
  { id: 168, name: '豆汁儿', category: '中式', tags: ['北京', '特色', '早餐', '传统'], price: '低', calories: '低', emoji: '🥛', description: '老北京特色，酸香独特' },
  { id: 169, name: '卤煮火烧', category: '中式', tags: ['北京', '特色', '一人食', '重口'], price: '中', calories: '中', emoji: '🍲', description: '内脏丰富，老汤浓郁' },
  { id: 170, name: '驴打滚', category: '中式', tags: ['北京', '甜', '点心', '传统'], price: '低', calories: '中', emoji: '🍡', description: '软糯香甜，豆面香浓' },
  { id: 171, name: '艾窝窝', category: '中式', tags: ['北京', '甜', '点心', '传统'], price: '低', calories: '中', emoji: '🍡', description: '软糯清甜，馅料丰富' },
  
  // 四川小吃
  { id: 172, name: '龙抄手', category: '中式', tags: ['四川', '面食', '一人食', '早餐'], price: '中', calories: '中', emoji: '🥟', description: '皮薄馅嫩，汤汁鲜美' },
  { id: 173, name: '钟水饺', category: '中式', tags: ['四川', '面食', '一人食', '甜辣'], price: '中', calories: '中', emoji: '🥟', description: '红油香辣，微甜回味' },
  { id: 174, name: '赖汤圆', category: '中式', tags: ['四川', '甜', '点心', '传统'], price: '低', calories: '中', emoji: '🍡', description: '软糯不粘，芝麻香甜' },
  { id: 175, name: '三大炮', category: '中式', tags: ['四川', '甜', '小吃', '传统'], price: '低', calories: '中', emoji: '🍡', description: '糯米团子，红糖香甜' },
  { id: 176, name: '钵钵鸡', category: '中式', tags: ['四川', '辣', '小吃', '冷串'], price: '中', calories: '中', emoji: '🍢', description: '麻辣鲜香，冷吃热吃皆宜' },
  { id: 177, name: '蛋烘糕', category: '中式', tags: ['四川', '甜', '小吃', '街头'], price: '低', calories: '中', emoji: '🥞', description: '外酥内软，馅料多样' },
  
  // 广东早茶
  { id: 178, name: '凤爪', category: '中式', tags: ['粤菜', '早茶', '点心', '特色'], price: '中', calories: '中', emoji: '🐔', description: '软糯脱骨，酱汁浓郁' },
  { id: 179, name: '排骨', category: '中式', tags: ['粤菜', '早茶', '点心', '蒜香'], price: '中', calories: '中', emoji: '🍖', description: '蒜香浓郁，肉质软嫩' },
  { id: 180, name: '流沙包', category: '中式', tags: ['粤菜', '早茶', '点心', '甜'], price: '中', calories: '中', emoji: '🥟', description: '蛋黄流沙，香甜浓郁' },
  { id: 181, name: '叉烧包', category: '中式', tags: ['粤菜', '早茶', '点心', '甜'], price: '中', calories: '中', emoji: '🥟', description: '面皮松软，叉烧香甜' },
  { id: 182, name: '榴莲酥', category: '中式', tags: ['粤菜', '早茶', '点心', '甜'], price: '中', calories: '高', emoji: '🥐', description: '酥皮香脆，榴莲浓郁' },
  
  // 台湾美食
  { id: 183, name: '卤肉饭', category: '中式', tags: ['台湾', '主食', '一人食', '午餐'], price: '中', calories: '中', emoji: '🍚', description: '卤肉香浓，下饭神器' },
  { id: 184, name: '蚵仔煎', category: '中式', tags: ['台湾', '海鲜', '小吃', '夜市'], price: '中', calories: '中', emoji: '🦪', description: '外酥内嫩，海鲜鲜美' },
  { id: 185, name: '珍珠奶茶', category: '中式', tags: ['台湾', '甜', '饮品', '下午茶'], price: '中', calories: '高', emoji: '🧋', description: '茶香奶浓，Q弹珍珠' },
  { id: 186, name: '大肠包小肠', category: '中式', tags: ['台湾', '小吃', '夜市', '特色'], price: '中', calories: '高', emoji: '🌭', description: '糯米肠包香肠，口感丰富' },
  { id: 187, name: '牛肉面', category: '中式', tags: ['台湾', '面食', '一人食', '汤面'], price: '中', calories: '中', emoji: '🍜', description: '牛肉软烂，汤头浓郁' },
  { id: 188, name: '盐酥鸡', category: '中式', tags: ['台湾', '油炸', '小吃', '夜市'], price: '中', calories: '高', emoji: '🍗', description: '外酥里嫩，九层塔香' },
  { id: 189, name: '芋圆', category: '中式', tags: ['台湾', '甜', '甜品', '下午茶'], price: '中', calories: '中', emoji: '🍡', description: 'Q弹软糯，芋头香浓' },
  { id: 190, name: '棺材板', category: '中式', tags: ['台湾', '特色', '小吃', '台南'], price: '中', calories: '高', emoji: '🍞', description: '面包挖空填馅，创意十足' },
  
  // 各地特色面食
  { id: 191, name: '武汉热干面', category: '中式', tags: ['湖北', '面食', '早餐', '一人食'], price: '低', calories: '中', emoji: '🍜', description: '芝麻酱香，面条筋道' },
  { id: 192, name: '重庆小面', category: '中式', tags: ['重庆', '面食', '辣', '一人食'], price: '低', calories: '中', emoji: '🍜', description: '麻辣鲜香，重庆特色' },
  { id: 193, name: '刀削面', category: '中式', tags: ['山西', '面食', '一人食', '特色'], price: '中', calories: '中', emoji: '🍜', description: '面条厚实，口感劲道' },
  { id: 194, name: '河南烩面', category: '中式', tags: ['河南', '面食', '一人食', '汤面'], price: '中', calories: '中', emoji: '🍜', description: '汤浓面宽，配料丰富' },
  { id: 195, name: '宜宾燃面', category: '中式', tags: ['四川', '面食', '辣', '干拌'], price: '低', calories: '中', emoji: '🍜', description: '麻辣干香，油重无水' },
  { id: 196, name: '云吞面', category: '中式', tags: ['广东', '面食', '一人食', '清淡'], price: '中', calories: '中', emoji: '🍜', description: '云吞鲜美，面条爽滑' },
  { id: 197, name: '延吉冷面', category: '中式', tags: ['朝鲜族', '面食', '冷', '夏季'], price: '中', calories: '低', emoji: '🍜', description: '冰凉爽口，酸甜开胃' },
  { id: 198, name: '宜宾凉糕', category: '中式', tags: ['四川', '甜', '小吃', '夏季'], price: '低', calories: '中', emoji: '🍮', description: '软糯清凉，红糖香甜' },
  
  // 特色糕点
  { id: 199, name: '月饼', category: '中式', tags: ['传统', '甜', '节日', '中秋'], price: '中', calories: '高', emoji: '🥮', description: '团圆象征，馅料丰富' },
  { id: 200, name: '粽子', category: '中式', tags: ['传统', '节日', '端午', '糯米'], price: '中', calories: '中', emoji: '🫔', description: '糯米包裹，咸甜皆宜' },
  { id: 201, name: '汤圆', category: '中式', tags: ['传统', '甜', '节日', '元宵'], price: '低', calories: '中', emoji: '🍡', description: '团团圆圆，甜蜜美满' },
  { id: 202, name: '年糕', category: '中式', tags: ['传统', '甜', '节日', '春节'], price: '中', calories: '中', emoji: '🍡', description: '年年高升，软糯香甜' },
  { id: 203, name: '麻花', category: '中式', tags: ['传统', '零食', '油炸', '酥脆'], price: '低', calories: '高', emoji: '🥨', description: '酥脆香甜，传统小吃' },
  { id: 204, name: '桃酥', category: '中式', tags: ['传统', '点心', '酥脆', '茶点'], price: '低', calories: '中', emoji: '🍪', description: '酥松香甜，入口即化' },
  { id: 205, name: '绿豆糕', category: '中式', tags: ['传统', '甜', '点心', '清凉'], price: '中', calories: '中', emoji: '🍮', description: '细腻清甜，消暑佳品' },
  { id: 206, name: '蛋黄酥', category: '中式', tags: ['传统', '点心', '甜', '蛋黄'], price: '中', calories: '高', emoji: '🥮', description: '酥皮层次，蛋黄咸香' },
  { id: 207, name: '凤梨酥', category: '中式', tags: ['台湾', '点心', '甜', '特产'], price: '中', calories: '中', emoji: '🥮', description: '外皮酥松，凤梨香甜' },
  { id: 208, name: '老婆饼', category: '中式', tags: ['传统', '点心', '甜', '广式'], price: '中', calories: '中', emoji: '🥮', description: '酥皮香甜，冬瓜馅料' },
  
  // 夜宵小吃
  { id: 209, name: '臭豆腐', category: '中式', tags: ['小吃', '夜宵', '街头', '特色'], price: '低', calories: '中', emoji: '🧈', description: '闻着臭吃着香，外酥内嫩' },
  { id: 210, name: '烤冷面', category: '中式', tags: ['小吃', '夜宵', '街头', '东北'], price: '低', calories: '中', emoji: '🫓', description: '酸甜可口，筋道有嚼劲' },
  { id: 211, name: '铁板鱿鱼', category: '中式', tags: ['海鲜', '夜宵', '街头', '烧烤'], price: '中', calories: '中', emoji: '🦑', description: 'Q弹鲜美，酱料浓郁' },
  { id: 212, name: '狼牙土豆', category: '中式', tags: ['小吃', '夜宵', '街头', '四川'], price: '低', calories: '中', emoji: '🥔', description: '外酥内软，麻辣鲜香' },
  { id: 213, name: '烤面筋', category: '中式', tags: ['小吃', '夜宵', '街头', '烧烤'], price: '低', calories: '中', emoji: '🍢', description: '筋道有嚼劲，酱料香浓' },
  { id: 214, name: '糖葫芦', category: '中式', tags: ['传统', '甜', '街头', '冬季'], price: '低', calories: '中', emoji: '🍡', description: '酸甜可口，童年回忆' },
  { id: 215, name: '爆米花', category: '中式', tags: ['零食', '休闲', '电影', '甜'], price: '低', calories: '中', emoji: '🍿', description: '香脆可口，观影必备' },
  { id: 216, name: '糖炒栗子', category: '中式', tags: ['传统', '甜', '冬季', '街头'], price: '中', calories: '中', emoji: '🌰', description: '香甜软糯，秋冬限定' },
  
  // 西式美食 - 美式
  { id: 11, name: '牛排', category: '西式', tags: ['正式', '聚餐', '约会', '晚餐', '高蛋白'], price: '高', calories: '高', emoji: '🥩', description: '外焦里嫩，汁水丰富' },
  { id: 12, name: '披萨', category: '西式', tags: ['芝士', '聚餐', '午餐', '晚餐', '分享'], price: '中', calories: '高', emoji: '🍕', description: '拉丝芝士，配料丰富' },
  { id: 13, name: '汉堡', category: '西式', tags: ['快餐', '一人食', '午餐', '晚餐', '便捷'], price: '中', calories: '高', emoji: '🍔', description: '肉汁四溢，饱腹感强' },
  { id: 14, name: '意大利面', category: '西式', tags: ['面食', '一人食', '午餐', '晚餐', '经典'], price: '中', calories: '中', emoji: '🍝', description: '酱汁浓郁，面条弹牙' },
  { id: 15, name: '沙拉', category: '西式', tags: ['清淡', '健康', '低卡', '午餐', '减肥'], price: '中', calories: '低', emoji: '🥗', description: '清爽健康，营养丰富' },
  { id: 16, name: '三明治', category: '西式', tags: ['冷食', '早餐', '午餐', '一人食', '快捷'], price: '低', calories: '中', emoji: '🥪', description: '层次分明，方便携带' },
  { id: 17, name: '炸鸡', category: '西式', tags: ['油炸', '香脆', '聚餐', '夜宵', '快乐'], price: '中', calories: '高', emoji: '🍗', description: '外酥里嫩，快乐源泉' },
  { id: 18, name: '薯条', category: '西式', tags: ['油炸', '小食', '快餐', '分享'], price: '低', calories: '高', emoji: '🍟', description: '金黄酥脆，停不下来' },
  { id: 19, name: '蛋糕', category: '西式', tags: ['甜', '下午茶', '庆祝', '开心'], price: '中', calories: '高', emoji: '🎂', description: '甜蜜幸福，庆祝必备' },
  { id: 20, name: '冰淇淋', category: '西式', tags: ['甜', '冷', '下午茶', '夏天', '开心'], price: '中', calories: '高', emoji: '🍦', description: '冰凉爽口，甜蜜治愈' },
  
  // 更多美式美食
  { id: 51, name: '美式烤肉', category: '美式', tags: ['肉', '聚餐', '晚餐', 'BBQ', '社交'], price: '高', calories: '高', emoji: '🍖', description: '烟熏慢烤，肉香四溢' },
  { id: 52, name: '芝士汉堡', category: '美式', tags: ['快餐', '芝士', '午餐', '一人食', '经典'], price: '中', calories: '高', emoji: '🍔', description: '芝士融化，肉饼多汁' },
  { id: 53, name: '热狗', category: '美式', tags: ['快餐', '街头', '一人食', '午餐', '便捷'], price: '低', calories: '中', emoji: '🌭', description: '棒球赛标配，简单美味' },
  { id: 54, name: '炸鸡华夫饼', category: '美式', tags: ['甜咸', '早午餐', '特色', '一人食'], price: '中', calories: '高', emoji: '🧇', description: '甜咸搭配，口感奇妙' },
  { id: 55, name: '烤肋排', category: '美式', tags: ['肉', '聚餐', '晚餐', 'BBQ', '手抓'], price: '高', calories: '高', emoji: '🥩', description: '酱汁浓郁，脱骨软烂' },
  { id: 56, name: '芝士通心粉', category: '美式', tags: ['芝士', '主食', '午餐', '晚餐', ' comfort food'], price: '中', calories: '高', emoji: '🧀', description: '奶香浓郁，治愈系美食' },
  { id: 57, name: '火鸡三明治', category: '美式', tags: ['冷食', '午餐', '一人食', '健康', '快捷'], price: '中', calories: '中', emoji: '🥪', description: '感恩节 leftover 经典吃法' },
  { id: 58, name: '奶昔', category: '美式', tags: ['甜', '冷饮', '下午茶', '夏天', '高热量'], price: '中', calories: '高', emoji: '🥤', description: '浓郁香甜，冰爽满足' },
  { id: 59, name: '蓝莓松饼', category: '美式', tags: ['甜', '早餐', '早午餐', '一人食'], price: '中', calories: '中', emoji: '🥞', description: '松软香甜，枫糖绝配' },
  { id: 60, name: '牛肉塔可', category: '美式', tags: ['墨西哥风味', '辣', '午餐', '晚餐', '一人食'], price: '中', calories: '中', emoji: '🌮', description: '玉米饼包裹，配料丰富' },
  { id: 61, name: '布法罗鸡翅', category: '美式', tags: ['辣', '油炸', '夜宵', '聚餐', '下酒'], price: '中', calories: '高', emoji: '🍗', description: '酸辣开胃，看球必备' },
  { id: 62, name: '蛤蜊浓汤', category: '美式', tags: ['汤', '海鲜', '午餐', '晚餐', '浓郁'], price: '中', calories: '中', emoji: '🥣', description: '奶香浓郁，海鲜鲜美' },
  { id: 63, name: '龙虾卷', category: '美式', tags: ['海鲜', '午餐', '一人食', '特色', '高消费'], price: '高', calories: '中', emoji: '🦞', description: '波士顿名吃，鲜美奢华' },
  { id: 64, name: '烤奶酪三明治', category: '美式', tags: ['芝士', '热', '午餐', '一人食', ' comfort food'], price: '低', calories: '中', emoji: '🥪', description: '外酥里嫩，芝士拉丝' },
  { id: 65, name: '苹果派', category: '美式', tags: ['甜', '烘焙', '下午茶', '传统'], price: '中', calories: '高', emoji: '🥧', description: '美式经典，温暖甜蜜' },
  { id: 66, name: '玉米热狗', category: '美式', tags: ['油炸', '街头', '一人食', '快餐', '嘉年华'], price: '低', calories: '高', emoji: '🌭', description: '外酥内软，游乐园必吃' },
  { id: 67, name: '南方炸鸡排', category: '美式', tags: ['油炸', '肉', '午餐', '晚餐', '南方风味'], price: '中', calories: '高', emoji: '🍗', description: '酥脆多汁，南方特色' },
  { id: 68, name: '凯撒沙拉', category: '美式', tags: ['沙拉', '健康', '午餐', '低卡', '经典'], price: '中', calories: '低', emoji: '🥗', description: '清爽开胃，健康首选' },
  { id: 69, name: '纽约芝士蛋糕', category: '美式', tags: ['甜', '芝士', '下午茶', '浓郁'], price: '中', calories: '高', emoji: '🍰', description: '浓郁顺滑，入口即化' },
  { id: 70, name: 'BBQ烤鸡', category: '美式', tags: ['肉', 'BBQ', '聚餐', '晚餐', '分享'], price: '中', calories: '中', emoji: '🍗', description: '酱汁浓郁，烟熏风味' },
  { id: 71, name: '墨西哥卷饼碗', category: '美式', tags: ['墨西哥风味', '健康', '午餐', '一人食', '自选'], price: '中', calories: '中', emoji: '🥙', description: '无饼版burrito，健康轻食' },
  { id: 72, name: '洋葱圈', category: '美式', tags: ['油炸', '小食', '快餐', '分享'], price: '低', calories: '高', emoji: '🧅', description: '外酥里嫩，甜香可口' },
  { id: 73, name: '土豆泥', category: '美式', tags: ['主食', '配菜', '热', ' comfort food'], price: '低', calories: '中', emoji: '🥔', description: '绵密顺滑，奶香四溢' },
  { id: 74, name: '烤火鸡', category: '美式', tags: ['肉', '聚餐', '感恩节', '节日', '传统'], price: '高', calories: '中', emoji: '🦃', description: '节日大餐，家庭团聚' },
  { id: 75, name: '肉桂卷', category: '美式', tags: ['甜', '早餐', '烘焙', '肉桂香'], price: '中', calories: '高', emoji: '🌀', description: '香甜肉桂，温暖治愈' },
  { id: 76, name: '巧克力曲奇', category: '美式', tags: ['甜', '零食', '烘焙', '下午茶'], price: '低', calories: '中', emoji: '🍪', description: '外酥内软，巧克力爆浆' },
  { id: 77, name: '红薯薯条', category: '美式', tags: ['油炸', '小食', '健康', '甜'], price: '中', calories: '中', emoji: '🍠', description: '天然甜味，更健康的选择' },
  { id: 78, name: '费城芝士牛排', category: '美式', tags: ['肉', '芝士', '三明治', '午餐', '特色'], price: '中', calories: '高', emoji: '🥖', description: '费城名吃，肉多芝士足' },
  { id: 79, name: '煎饼早餐', category: '美式', tags: ['早餐', '甜', '丰盛', '早午餐'], price: '中', calories: '高', emoji: '🥞', description: '培根鸡蛋配煎饼，美式经典' },
  { id: 80, name: '考伯沙拉', category: '美式', tags: ['沙拉', '健康', '午餐', '丰盛', '低卡'], price: '中', calories: '中', emoji: '🥗', description: '配料丰富，营养均衡' },

  // 意大利美食
  { id: 81, name: '玛格丽塔披萨', category: '意大利', tags: ['芝士', '经典', '午餐', '晚餐', '番茄'], price: '中', calories: '高', emoji: '🍕', description: '意式经典，番茄罗勒' },
  { id: 82, name: '千层面', category: '意大利', tags: ['芝士', '肉', '主食', '午餐', '晚餐', '浓郁'], price: '中', calories: '高', emoji: '🍝', description: '层层叠叠，奶香浓郁' },
  { id: 83, name: '烩饭', category: '意大利', tags: ['米饭', '主食', '午餐', '晚餐', '奶油'], price: '中', calories: '中', emoji: '🍚', description: '米粒弹牙，奶油香浓' },
  { id: 84, name: '意大利饺子', category: '意大利', tags: ['面食', '芝士', '午餐', '晚餐', '传统'], price: '中', calories: '中', emoji: '🥟', description: '手工包制，芝士内馅' },
  { id: 85, name: '意式浓汤', category: '意大利', tags: ['汤', '热', '午餐', '健康'], price: '低', calories: '低', emoji: '🥣', description: '蔬菜浓郁，暖胃健康' },
  { id: 86, name: '烤面包片', category: '意大利', tags: ['早餐', '轻食', '一人食'], price: '低', calories: '低', emoji: '🥖', description: '蒜香浓郁，开胃小食' },
  
  // 印度美食
  { id: 87, name: '咖喱鸡', category: '印度', tags: ['辣', '浓郁', '午餐', '晚餐', '米饭'], price: '中', calories: '中', emoji: '🍛', description: '香料丰富，咖喱浓郁' },
  { id: 88, name: '馕', category: '印度', tags: ['主食', '街头', '午餐', '配菜'], price: '低', calories: '中', emoji: '🫓', description: '外酥内软，蘸酱绝配' },
  { id: 89, name: '印度香饭', category: '印度', tags: ['米饭', '香料', '午餐', '晚餐', '聚餐'], price: '中', calories: '中', emoji: '🍚', description: '香料层次丰富，米饭粒粒分明' },
  { id: 90, name: '萨莫萨三角饺', category: '印度', tags: ['油炸', '小食', '街头', '下午茶'], price: '低', calories: '中', emoji: '🥟', description: '外酥内软，土豆馅料' },
  { id: 91, name: '印度酸奶', category: '印度', tags: ['酸', '健康', '饮品', '清爽'], price: '低', calories: '低', emoji: '🥛', description: '浓稠顺滑，清爽解腻' },
  { id: 92, name: '坦都里鸡', category: '印度', tags: ['烤', '辣', '午餐', '晚餐', '香料'], price: '中', calories: '中', emoji: '🍗', description: '泥炉烤制，香料腌制' },
  
  // 法国美食
  { id: 93, name: '法棍', category: '法国', tags: ['主食', '早餐', '一人食', '经典'], price: '低', calories: '中', emoji: '🥖', description: '外脆内软，越嚼越香' },
  { id: 94, name: '蜗牛', category: '法国', tags: ['特色', '晚餐', '正式', '前菜'], price: '高', calories: '低', emoji: '🐌', description: '法式经典，黄油蒜香' },
  { id: 95, name: '可丽饼', category: '法国', tags: ['甜', '早餐', '下午茶', '街头'], price: '中', calories: '中', emoji: '🥞', description: '薄饼软糯，可甜可咸' },
  { id: 96, name: '洋葱汤', category: '法国', tags: ['汤', '热', '晚餐', '奶酪'], price: '中', calories: '中', emoji: '🥣', description: '洋葱甜香，芝士浓郁' },
  { id: 97, name: '马卡龙', category: '法国', tags: ['甜', '下午茶', '精致', '高消费'], price: '高', calories: '中', emoji: '🍪', description: '酥脆外壳，绵密内馅' },
  { id: 98, name: '红酒烩牛肉', category: '法国', tags: ['肉', '炖', '晚餐', '聚餐', '浓郁'], price: '高', calories: '中', emoji: '🥩', description: '红酒入味，肉质软烂' },
  
  // 地中海美食
  { id: 99, name: '希腊沙拉', category: '地中海', tags: ['沙拉', '健康', '午餐', '清淡', '奶酪'], price: '中', calories: '低', emoji: '🥗', description: '黄瓜番茄，菲达芝士' },
  { id: 100, name: '鹰嘴豆泥', category: '地中海', tags: ['健康', '小食', '蘸酱', '低卡'], price: '低', calories: '低', emoji: '🫘', description: '绵密顺滑，营养丰富' },
  { id: 101, name: '皮塔饼', category: '地中海', tags: ['主食', '午餐', '一人食', '中东'], price: '低', calories: '中', emoji: '🫓', description: '口袋饼，可包万物' },
  { id: 102, name: '烤羊排', category: '地中海', tags: ['肉', '烤', '晚餐', '聚餐', '正式'], price: '高', calories: '中', emoji: '🍖', description: '外焦里嫩，香草风味' },
  { id: 103, name: '炸豆丸子', category: '地中海', tags: ['素食', '油炸', '小食', '街头'], price: '低', calories: '中', emoji: '🧆', description: '鹰嘴豆炸制，香脆可口' },
  { id: 104, name: '海鲜烩饭', category: '地中海', tags: ['海鲜', '米饭', '午餐', '晚餐', '丰盛'], price: '高', calories: '中', emoji: '🦐', description: '海鲜新鲜，饭粒饱满' },
  
  // 墨西哥美食
  { id: 105, name: '墨西哥玉米片', category: '墨西哥', tags: ['小食', '辣', '分享', '聚会'], price: '低', calories: '中', emoji: '🫓', description: '酥脆玉米片，蘸酱吃' },
  { id: 106, name: '鸡肉塔可', category: '墨西哥', tags: ['辣', '午餐', '晚餐', '一人食'], price: '中', calories: '中', emoji: '🌮', description: '鸡肉嫩滑，配件丰富' },
  { id: 107, name: '墨西哥卷饼', category: '墨西哥', tags: ['主食', '午餐', '晚餐', '分享', '丰盛'], price: '中', calories: '高', emoji: '🌯', description: '饼包万物，大快朵颐' },
  { id: 108, name: '辣椒镶肉', category: '墨西哥', tags: ['辣', '主菜', '晚餐', '特色'], price: '中', calories: '中', emoji: '🫑', description: '辣椒包肉，烤制入味' },
  { id: 109, name: '吉事果', category: '墨西哥', tags: ['甜', '油炸', '下午茶', '街头'], price: '低', calories: '高', emoji: '🍩', description: '西班牙油条，蘸热巧克力' },
  { id: 110, name: '墨西哥米粥', category: '墨西哥', tags: ['甜', '早餐', '米', '传统'], price: '低', calories: '中', emoji: '🥣', description: '香甜顺滑，节日必备' },
  
  // 日韩美食
  { id: 21, name: '寿司', category: '日式', tags: ['清淡', '生鲜', '午餐', '晚餐', '精致'], price: '高', calories: '中', emoji: '🍣', description: '新鲜食材，精致美味' },
  { id: 22, name: '拉面', category: '日式', tags: ['热', '汤面', '一人食', '午餐', '晚餐'], price: '中', calories: '中', emoji: '🍜', description: '汤浓面劲，暖心暖胃' },
  { id: 23, name: '天妇罗', category: '日式', tags: ['油炸', '香脆', '午餐', '晚餐', '精致'], price: '中', calories: '高', emoji: '🍤', description: '外酥里嫩，不油腻' },
  { id: 24, name: '烤肉', category: '日韩', tags: ['聚餐', '晚餐', '社交', '热', '肉'], price: '高', calories: '高', emoji: '🥓', description: '滋滋作响，香气扑鼻' },
  { id: 25, name: '石锅拌饭', category: '韩式', tags: ['热', '辣', '一人食', '午餐', '晚餐'], price: '中', calories: '中', emoji: '🍲', description: '锅巴香脆，配料丰富' },
  { id: 26, name: '泡菜汤', category: '韩式', tags: ['辣', '酸', '热', '汤', '下饭'], price: '中', calories: '低', emoji: '🥘', description: '酸辣开胃，暖胃暖心' },
  { id: 27, name: '炸鸡啤酒', category: '韩式', tags: ['油炸', '夜宵', '聚餐', '快乐', '下酒'], price: '中', calories: '高', emoji: '🍗', description: '酥脆多汁，绝配啤酒' },
  { id: 28, name: '鳗鱼饭', category: '日式', tags: ['甜', '热', '一人食', '午餐', '晚餐', '营养'], price: '高', calories: '中', emoji: '🍱', description: '酱汁浓郁，营养丰富' },
  
  // 东南亚美食
  { id: 29, name: '冬阴功汤', category: '泰式', tags: ['辣', '酸', '热', '汤', '开胃'], price: '中', calories: '低', emoji: '🥘', description: '酸辣鲜香，开胃神器' },
  { id: 30, name: '咖喱饭', category: '东南亚', tags: ['辣', '热', '主食', '午餐', '晚餐'], price: '中', calories: '中', emoji: '🍛', description: '浓郁咖喱，下饭神器' },
  { id: 31, name: '越南河粉', category: '东南亚', tags: ['清淡', '热', '汤粉', '一人食', '健康'], price: '中', calories: '中', emoji: '🍜', description: '汤清味鲜，清爽健康' },
  { id: 32, name: '海南鸡饭', category: '东南亚', tags: ['清淡', '热', '一人食', '午餐', '晚餐'], price: '中', calories: '中', emoji: '🍗', description: '鸡肉嫩滑，饭香四溢' },
  
  // 小吃零食
  { id: 33, name: '奶茶', category: '饮品', tags: ['甜', '下午茶', '休闲', '开心'], price: '中', calories: '高', emoji: '🧋', description: '香甜丝滑，快乐水' },
  { id: 34, name: '咖啡', category: '饮品', tags: ['苦', '提神', '早餐', '下午茶', '工作'], price: '中', calories: '低', emoji: '☕', description: '香醇提神，续命神器' },
  { id: 35, name: '水果', category: '健康', tags: ['甜', '健康', '低卡', '零食', '清爽'], price: '中', calories: '低', emoji: '🍎', description: '天然健康，维生素满满' },
  { id: 36, name: '酸奶', category: '健康', tags: ['酸', '健康', '早餐', '零食', '低卡'], price: '中', calories: '低', emoji: '🥛', description: '益生菌多，肠胃友好' },
  { id: 37, name: '坚果', category: '健康', tags: ['健康', '零食', '营养', '能量'], price: '中', calories: '高', emoji: '🥜', description: '营养丰富，能量满满' },
  { id: 38, name: '关东煮', category: '日式', tags: ['热', '清淡', '夜宵', '一人食', '便利'], price: '低', calories: '低', emoji: '🍢', description: '热乎乎的便利店美食' },
  { id: 39, name: '烤串', category: '中式', tags: ['辣', '热', '夜宵', '聚餐', '下酒'], price: '中', calories: '中', emoji: '🍢', description: '烟火气足，越吃越香' },
  { id: 40, name: '小龙虾', category: '中式', tags: ['辣', '夜宵', '聚餐', '夏天', '下酒'], price: '高', calories: '中', emoji: '🦞', description: '麻辣鲜香，夏日必备' },
  
  // 轻食简餐
  { id: 41, name: '燕麦粥', category: '健康', tags: ['清淡', '健康', '早餐', '低卡', '养胃'], price: '低', calories: '低', emoji: '🥣', description: '养胃健康，开启一天' },
  { id: 42, name: '全麦面包', category: '健康', tags: ['健康', '早餐', '低卡', '快捷'], price: '低', calories: '中', emoji: '🍞', description: '健康碳水，饱腹感强' },
  { id: 43, name: '鸡胸肉', category: '健康', tags: ['健康', '高蛋白', '低卡', '健身'], price: '中', calories: '低', emoji: '🍗', description: '健身必备，低脂高蛋白' },
  { id: 44, name: '蔬菜汤', category: '健康', tags: ['清淡', '健康', '低卡', '晚餐', '减肥'], price: '低', calories: '低', emoji: '🥬', description: '清淡健康，刮油神器' },
  { id: 45, name: '水煮蛋', category: '健康', tags: ['健康', '早餐', '高蛋白', '低卡'], price: '低', calories: '低', emoji: '🥚', description: '简单营养，蛋白丰富' },
  
  // 特色场景
  { id: 46, name: '火锅', category: '中式', tags: ['聚餐', '热', '冬天', '社交', '晚餐'], price: '高', calories: '高', emoji: '🍲', description: '围炉而坐，温暖人心' },
  { id: 47, name: '烧烤', category: '中式', tags: ['聚餐', '夜宵', '夏天', '社交', '下酒'], price: '中', calories: '高', emoji: '🍖', description: '烟火气息，朋友聚会' },
  { id: 48, name: '自助餐', category: '综合', tags: ['聚餐', '多样', '社交', '庆祝'], price: '高', calories: '高', emoji: '🍽️', description: '选择丰富，吃到满足' },
  { id: 49, name: '外卖快餐', category: '便捷', tags: ['一人食', '快捷', '工作餐', '方便'], price: '中', calories: '中', emoji: '🥡', description: '方便快捷，解决温饱' },
  { id: 50, name: '方便面', category: '便捷', tags: ['一人食', '快捷', '夜宵', '经济'], price: '低', calories: '高', emoji: '🍜', description: '简单快速，应急首选' },
]

// 场景配置
export const scenarios = {
  mealTime: {
    title: '用餐时段',
    icon: '⏰',
    options: [
      { value: '早餐', label: '早餐', emoji: '🌅', desc: '开启元气满满的一天' },
      { value: '午餐', label: '午餐', emoji: '☀️', desc: '补充能量继续战斗' },
      { value: '晚餐', label: '晚餐', emoji: '🌙', desc: '犒劳辛苦的自己' },
      { value: '夜宵', label: '夜宵', emoji: '🌃', desc: '深夜食堂时间' },
      { value: '下午茶', label: '下午茶', emoji: '☕', desc: '享受悠闲时光' },
    ]
  },
  mood: {
    title: '当下心情',
    icon: '😊',
    options: [
      { value: '开心', label: '开心', emoji: '😄', desc: '庆祝一下！' },
      { value: '难过', label: '难过', emoji: '😢', desc: '需要安慰食物' },
      { value: '疲惫', label: '疲惫', emoji: '😴', desc: '需要能量补给' },
      { value: '焦虑', label: '焦虑', emoji: '😰', desc: '吃点好的放松' },
      { value: '无聊', label: '无聊', emoji: '😐', desc: '找点新鲜感' },
      { value: '兴奋', label: '兴奋', emoji: '🤩', desc: '大胆尝试！' },
    ]
  },
  weather: {
    title: '天气情况',
    icon: '🌤️',
    options: [
      { value: '晴天', label: '晴天', emoji: '☀️', desc: '阳光明媚' },
      { value: '雨天', label: '雨天', emoji: '🌧️', desc: '湿哒哒的' },
      { value: '阴天', label: '阴天', emoji: '☁️', desc: '有点沉闷' },
      { value: '寒冷', label: '寒冷', emoji: '❄️', desc: '需要温暖' },
      { value: '炎热', label: '炎热', emoji: '🔥', desc: '需要清凉' },
    ]
  },
  diningAlone: {
    title: '用餐人数',
    icon: '👥',
    options: [
      { value: '一人食', label: '一人食', emoji: '🧑', desc: '独自享受' },
      { value: '聚餐', label: '朋友聚餐', emoji: '👫', desc: '热闹开心' },
      { value: '约会', label: '约会', emoji: '💕', desc: '浪漫时刻' },
      { value: '家庭', label: '家庭聚餐', emoji: '👨‍👩‍👧‍👦', desc: '温馨团圆' },
    ]
  },
  flavor: {
    title: '口味偏好',
    icon: '👅',
    options: [
      { value: '辣', label: '无辣不欢', emoji: '🌶️', desc: '刺激过瘾' },
      { value: '清淡', label: '清淡健康', emoji: '🥗', desc: '原汁原味' },
      { value: '甜', label: '甜蜜治愈', emoji: '🍯', desc: '心情变好' },
      { value: '酸', label: '酸爽开胃', emoji: '🍋', desc: '食欲大开' },
      { value: '重口', label: '重口味', emoji: '🧂', desc: '浓郁滋味' },
    ]
  },
  budget: {
    title: '预算范围',
    icon: '💰',
    options: [
      { value: '低', label: '经济实惠', emoji: '💵', desc: '省钱首选' },
      { value: '中', label: '中等消费', emoji: '💴', desc: '性价比之选' },
      { value: '高', label: '犒劳自己', emoji: '💎', desc: '品质享受' },
    ]
  },
  health: {
    title: '健康需求',
    icon: '💪',
    options: [
      { value: '低卡', label: '低卡减脂', emoji: '🥬', desc: '控制热量' },
      { value: '高蛋白', label: '高蛋白', emoji: '🥩', desc: '增肌健身' },
      { value: '健康', label: '营养均衡', emoji: '🍎', desc: '健康饮食' },
      { value: '无要求', label: '无特殊要求', emoji: '😋', desc: '开心就好' },
    ]
  }
}

// 游戏配置
export const games = {
  roulette: {
    name: '美食转盘',
    description: '让命运决定你吃什么！',
    icon: '🎯'
  },
  dice: {
    name: '骰子挑战',
    description: '掷骰子，完成美食挑战',
    icon: '🎲'
  },
  tarot: {
    name: '美食塔罗',
    description: '抽一张牌，看看今天的运势美食',
    icon: '🔮'
  },
  quickPick: {
    name: '快问快答',
    description: '快速回答，找到你的菜',
    icon: '⚡'
  }
}

// 挑战任务
export const challenges = [
  { id: 1, title: '辣味挑战', desc: '尝试比你平时更辣的食物', difficulty: '中等', reward: '🌶️ 勇士徽章' },
  { id: 2, title: '新口味探索', desc: '吃一家你从未尝试过的餐厅', difficulty: '简单', reward: '🔍 探险家徽章' },
  { id: 3, title: '健康一周', desc: '连续7天选择健康食物', difficulty: '困难', reward: '💪 健康达人徽章' },
  { id: 4, title: '独自享受', desc: '一个人去一家想去的餐厅', difficulty: '中等', reward: '🧘 独立徽章' },
  { id: 5, title: '分享快乐', desc: '请朋友吃他/她喜欢的东西', difficulty: '简单', reward: '❤️ 暖心徽章' },
  { id: 6, title: '厨艺展示', desc: '自己动手做一顿饭', difficulty: '中等', reward: '👨‍🍳 大厨徽章' },
  { id: 7, title: '限时挑战', desc: '15分钟内吃完一顿饭', difficulty: '简单', reward: '⏱️ 速度徽章' },
  { id: 8, title: '素食日', desc: '一整天不吃肉', difficulty: '中等', reward: '🌱 绿色徽章' },
]

// 推荐语
export const recommendationQuotes = [
  '人生苦短，先吃甜品！',
  '没有什么是一顿饭解决不了的，如果有，那就两顿！',
  '今天的你，值得最好的味道！',
  '美食当前，烦恼退散！',
  '吃饱了才有力气减肥！',
  '这顿吃完，明天再减！',
  '唯有美食与爱不可辜负！',
  '吃是最好的安慰！',
  '人生得意须尽欢，莫使金樽空对月！',
  '好好吃饭，是对生活最大的尊重！',
]
