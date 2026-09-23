/* ===========================================================
   意大利旅行手册 - 数据对象
   所有坐标都是 [lat, lng]
   =========================================================== */

var DICT = {
  zh: {
    appName: "意大利旅行手册",
    tagline: "四个女孩 · 12天 · 一段不会重来的故事",
    navOverview: "总览", navItinerary: "行程",
    navTransport: "交通", navStay: "住宿",
    navTodo: "待办", navTips: "贴士",
    countdownTitle: "距离出发还有",
    days: "天", hours: "时", minutes: "分", seconds: "秒",
    italyTime: "意大利时间", chinaTime: "北京时间",
    departureCity: "中国香港",
    overviewMap: "行程总览地图",
    showAllSpots: "显示全部地点",
    backToOverview: "返回总览",
    showAllPlaces: "显示所有地点",
    hideAllPlaces: "收起所有地点",
    mapNote: "⏱ 标注时间仅供参考",
    dayOfN: "第 {{n}} 天",
    dayLabel: "D{{n}}",
    progress: "打卡进度",
    checkIn: "○ 打卡", checked: "✓ 已去过",
    tags: { flight: "航班", book: "需提前订", note: "注意", info: "介绍", nav: "导航" },
    transit: "约 {{n}} 分钟",
    stayHotel: "晚住",
    accommodationLabel: "住宿",
    ticketLabel: "交通票据", orderNo: "订单号",
    todoTitle: "出行前待办",
    tipsTitle: "旅行贴士",
    packingTitle: "🧳 行李清单",
    packingSubtitle: "12 大分类 + 上机分组 · 点击整行标题可展开/收起",
    footerNote: "本手册仅供私人旅行参考；时刻均为当地时间。",
    packedTotal: "已打包 {{done}} / {{total}}",
  },
  zht: "zh-tw",
  en: {
    appName: "Italy Travel Handbook",
    tagline: "Four Girls · 12 Days · A Once-in-a-Lifetime Story",
    navOverview: "Overview", navItinerary: "Itinerary",
    navTransport: "Transport", navStay: "Stay",
    navTodo: "Todo", navTips: "Tips",
    countdownTitle: "Departure in",
    days: "d", hours: "h", minutes: "m", seconds: "s",
    italyTime: "Italy Time", chinaTime: "Beijing Time",
    departureCity: "Hong Kong, China",
    overviewMap: "Itinerary Overview Map",
    showAllSpots: "Show all places",
    backToOverview: "Back to overview",
    showAllPlaces: "Show all places",
    hideAllPlaces: "Hide all places",
    mapNote: "⏱ Times are approximate only",
    dayOfN: "Day {{n}}",
    dayLabel: "D{{n}}",
    progress: "Progress",
    checkIn: "○ Check in", checked: "✓ Visited",
    tags: { flight: "Flight", book: "Book ahead", note: "Note", info: "Info", nav: "Map" },
    transit: "≈ {{n}} min",
    stayHotel: "Stay",
    accommodationLabel: "Stay",
    ticketLabel: "Tickets & Orders", orderNo: "Order #",
    todoTitle: "Pre-trip Checklist",
    tipsTitle: "Travel Tips",
    packingTitle: "🧳 Packing List",
    packingSubtitle: "12 categories + in-flight groups · Click header to expand/collapse",
    footerNote: "For personal travel reference only. All times are local.",
    packedTotal: "Packed {{done}} / {{total}}"
  }
};

// === 地点介绍（中文/英文双字典） ===
var SPOTS_INFO = {
  "milano-malpensa": {
    zh: {name: "米兰马尔彭萨机场", cat: "机场", reason: "意大利最大机场之一，阿提哈航空 EY81 抵达门户。",
      must: ["T1 到达层集合点", "ATM/换汇窗口", "去博尔扎诺包车集合"],
      tips: ["提前 24h 在线 check-in", "阿布扎比转机可领餐券", "包车司机举牌接机"]},
    en: {name: "Milan Malpensa Airport", cat: "Airport", reason: "One of Italy's largest airports — Etihad EY81 arrives here.",
      must: ["T1 arrivals meeting point", "ATM / FX counters", "Dolomites driver pickup"],
      tips: ["Check in online 24h ahead", "AUH transit meal voucher", "Driver holds nameplate"]}
  },
  "milan-central": {
    zh: {name: "米兰中央火车站", cat: "交通枢纽", reason: "意大利北部最重要的铁路枢纽。",
      must: ["Frecciarossa 高速列车站台", "行李寄存柜", "Trenitalia 自助机"],
      tips: ["Italo 票价常较 Trenitalia 便宜", "提前 14 天购早鸟票", "站台需提前看清"]},
    en: {name: "Milano Centrale", cat: "Hub", reason: "Northern Italy's main rail hub.",
      must: ["Frecciarossa platforms", "Luggage lockers", "Trenitalia self-service kiosks"],
      tips: ["Italo often cheaper than Trenitalia", "Book 14 days ahead for early-bird", "Check platform on screens"]}
  },
  "brixen": {
    zh: {name: "Brixen / Bressanone", cat: "多洛米蒂门户小镇", reason: "多洛米蒂南部门户小镇，持有 BrixenCard 可免费乘坐所有公交。",
      must: ["主教教堂广场", "Isarco 河沿岸散步", "Pharmazie Museum"],
      tips: ["酒店提供 BrixenCard", "可作为刀锋山/休斯高原的中转站", "镇上餐厅性价比高"]},
    en: {name: "Brixen / Bressanone", cat: "Dolomiti Gateway", reason: "Southern gateway to the Dolomites — BrixenCard covers all buses and many discounts.",
      must: ["Cathedral square", "Isarco riverside walk", "Pharmacy Museum"],
      tips: ["Hotel issues the BrixenCard", "Best base for Seceda and Alpe di Siusi", "Great local restaurants"]}
  },
  "seceda": {
    zh: {name: "Seceda 刀锋山", cat: "多洛米蒂地标", reason: "多洛米蒂最具辨识度的刀锋形山脊，《孤独星球》封面取景地。",
      must: ["Seceda 观景台俯视草甸", "从 Ortisei 缆车直达", "早晨金黄色阳光最佳"],
      tips: ["8:30 前到达 Ortisei 缆车站", "山顶风大备外套", "建议 9 月底穿薄羽绒"]},
    en: {name: "Seceda Ridge", cat: "Dolomite Landmark", reason: "The Dolomites' most iconic blade ridge — Lonely Planet cover.",
      must: ["Viewpoint over Geisleralmpe", "Cable car from Ortisei", "Golden morning light"],
      tips: ["Reach Ortisei station before 8:30", "Wind is strong on top", "Light down jacket in autumn"]}
  },
  "alpe-di-siusi": {
    zh: {name: "Alpe di Siusi 休斯高原", cat: "多洛米蒂高山草甸", reason: "欧洲最大的高山草甸。",
      must: ["Compatsch 缆车上山", "Panorama 步道徒步", "Molignon 山小屋午餐"],
      tips: ["自驾或公交进入需缴通行费", "草甸禁止采花", "下午 4 点后回程"]},
    en: {name: "Alpe di Siusi", cat: "Alpine meadow", reason: "Europe's largest high-altitude meadow.",
      must: ["Compatsch cable car", "Panorama trail", "Molignon mountain hut lunch"],
      tips: ["Pass required to drive in", "Don't pick flowers", "Leave by 16:00"]}
  },
  "lago-carezza": {
    zh: {name: "Lago di Carezza 布雷耶斯湖", cat: "高山湖", reason: "翡翠色湖水映照 Latemar 山，被称为彩虹湖。",
      must: ["湖西岸步道", "清晨平静水面倒影", "雨后最易见彩虹"],
      tips: ["湖边停车位紧张", "湖边木栈道 30 分钟可走完", "绕湖一周约 1 小时"]},
    en: {name: "Lago di Carezza", cat: "Alpine Lake", reason: "Emerald lake reflecting Latemar.",
      must: ["Western shore trail", "Still morning mirror", "Rainbow after rain"],
      tips: ["Parking limited", "Wooden boardwalk 30 min", "Loop trail ≈ 1h"]}
  },
  "venice-mestre": {
    zh: {name: "Venice Mestre 火车站", cat: "交通枢纽", reason: "威尼斯本岛对岸的交通枢纽。",
      must: ["10 分钟火车到圣卢西亚", "廉价餐厅众多", "酒店附近超市"],
      tips: ["持火车票直接上岛", "不要被玻璃心群岛项目引导消费", "行李过桥走 Rialto 桥"]},
    en: {name: "Venice Mestre Station", cat: "Hub", reason: "Mainland side of Venice.",
      must: ["10-min train to Santa Lucia", "Affordable restaurants", "Nearby supermarket"],
      tips: ["Train ticket includes vaporetto", "Skip Murano/glass demos", "Cross Rialto with luggage"]}
  },
  "venice-rialto": {
    zh: {name: "威尼斯主岛", cat: "水城", reason: "被亚得里亚海环抱的水城。",
      must: ["圣马可广场", "叹息桥", "里亚托桥", "学院桥看日落", "玻璃岛/彩色岛"],
      tips: ["买 vaporetto 通票", "避开正午贡多拉", "小巷迷路贵 5%"]},
    en: {name: "Venice Mainland Island", cat: "Lagoon City", reason: "Floating city on the lagoon.",
      must: ["Piazza San Marco", "Bridge of Sighs", "Rialto Bridge", "Accademia Bridge sunset", "Murano/Burano"],
      tips: ["Buy vaporetto pass", "Skip midday gondola", "Don't get lost in alleys"]}
  },
  "venice-stmarks": {
    zh: {name: "圣马可广场", cat: "广场", reason: "拿破仑称其为'欧洲最美客厅'。",
      must: ["圣马可大教堂黄金马赛克", "总督宫", "圣马可钟楼登顶看城"],
      tips: ["现场买票排队 1 小时", "日落前 1 小时最美", "广场鸽子不要喂"]},
    en: {name: "Piazza San Marco", cat: "Square", reason: "Napoleon called it Europe's drawing room.",
      must: ["Golden mosaics in Basilica", "Doge's Palace", "Bell Tower"],
      tips: ["Skip-the-line online", "Sunset 1h before", "Don't feed pigeons"]}
  },
  "venice-ponte": {
    zh: {name: "学院桥", cat: "桥", reason: "威尼斯四大名桥之一，最佳拍摄点。",
      must: ["桥中心拍摄大运河", "日落时金色暖光", "夜晚华灯初上"],
      tips: ["不要错过 18:30 黄金时刻", "桥上人多注意相机", "桥北端是学院美术馆"]},
    en: {name: "Ponte dell'Accademia", cat: "Bridge", reason: "One of four Venice bridges — best view down the Grand Canal.",
      must: ["Centre of bridge for canal shots", "Golden hour", "Twilight lamps"],
      tips: ["Catch 18:30 golden moment", "Mind your camera", "Galleria dell'Accademia at north end"]}
  },
  "florence-smn": {
    zh: {name: "佛罗伦萨 SMN 火车站", cat: "交通枢纽", reason: "佛罗伦萨中央火车站，步行可达圣母百花大教堂。",
      must: ["Trenitalia 自助取票", "广场附近咖啡馆", "行李寄存"],
      tips: ["避开正街 FRA", "持票不要过街 FRA", "站台看大屏"]},
    en: {name: "Firenze SMN Station", cat: "Hub", reason: "Florence's central station.",
      must: ["Trenitalia self-service", "Cafés on piazza", "Left luggage"],
      tips: ["Check platforms on screens", "Italo/Trenitalia kiosks", "Buy water from kiosk"]}
  },
  "uffizi": {
    zh: {name: "乌菲兹美术馆", cat: "美术馆", reason: "世界三大美术馆之一。",
      must: ["波提切利房间", "达·芬奇《博士来拜》", "拉斐尔《圣母》"],
      tips: ["必须提前 14 天预约", "每张票对应时段", "入口在 1 号门"]},
    en: {name: "Uffizi Gallery", cat: "Museum", reason: "One of the world's top three art galleries.",
      must: ["Botticelli rooms", "Leonardo's Adoration", "Raphael's Madonna"],
      tips: ["Book 14 days ahead", "Each ticket has a slot", "Entrance via Gate 1"]}
  },
  "duomo": {
    zh: {name: "圣母百花大教堂", cat: "教堂", reason: "文艺复兴发源地。",
      must: ["穹顶登顶 463 阶", "洗礼堂金门", "乔托钟楼"],
      tips: ["联票含 5 个景点", "穹顶登顶赶在日落", "周日主日弥撒免费"]},
    en: {name: "Duomo Florence", cat: "Cathedral", reason: "Cradle of the Renaissance.",
      must: ["Climb the dome (463 steps)", "Baptistery golden gates", "Giotto's bell tower"],
      tips: ["Combo ticket covers 5 sites", "Sunset on the dome", "Free Sunday mass"]}
  },
  "accademia": {
    zh: {name: "学院美术馆", cat: "美术馆", reason: "米开朗基罗《大卫》真迹所在地。",
      must: ["《大卫》真迹", "《奴隶》系列", "音乐厅乐器收藏"],
      tips: ["8:30 最早场排队", "门票 24 欧", "提前 b-ticket 预约"]},
    en: {name: "Accademia Gallery", cat: "Museum", reason: "Houses the original David by Michelangelo.",
      must: ["David original", "Slaves series", "Music instruments"],
      tips: ["8:30 first slot", "€24 ticket", "Pre-book via b-ticket"]}
  },
  "ponte-vecchio": {
    zh: {name: "老桥", cat: "桥", reason: "中世纪商人桥，至今仍有金匠店铺。",
      must: ["桥上金匠店", "瓦萨利走廊", "阿尔诺河倒影"],
      tips: ["黄昏最美", "桥两端最适合拍照", "清晨避开人潮"]},
    en: {name: "Ponte Vecchio", cat: "Bridge", reason: "Medieval merchant bridge — still houses goldsmith shops.",
      must: ["Goldsmith shops on bridge", "Vasari Corridor", "Arno reflection"],
      tips: ["Best at dusk", "Best shots at both ends", "Empty at sunrise"]}
  },
  "michelangelo-square": {
    zh: {name: "米开朗基罗广场", cat: "观景台", reason: "佛罗伦萨最佳日落点。",
      must: ["大卫像复制品", "日落全景", "台阶合影"],
      tips: ["带外套", "早点占位", "注意防晒"]},
    en: {name: "Piazzale Michelangelo", cat: "Viewpoint", reason: "Florence's best sunset point.",
      must: ["David replica", "Sunset panorama", "Staircase group photo"],
      tips: ["Bring a jacket", "Arrive early for a spot", "Sunscreen required"]}
  },
  "central-market": {
    zh: {name: "中央市场", cat: "市场", reason: "一楼食材二楼餐厅。",
      must: ["Nerbone 牛肚包", "二楼意面", "现榨果汁"],
      tips: ["二楼性价比高", "早午饭优选", "现金小额支付"]},
    en: {name: "Mercato Centrale", cat: "Market", reason: "Local food downstairs, restaurants upstairs.",
      must: ["Nerbone lampredotto", "Upstairs pasta", "Fresh juice"],
      tips: ["Upstairs great value", "Lunch timing", "Small cash preferred"]}
  },
  "republic-square": {
    zh: {name: "共和广场", cat: "广场", reason: "佛罗伦萨最古老的广场。",
      must: ["旋转木马", "Caffè Gilli 老牌咖啡", "柱廊散步"],
      tips: ["路边咖啡位加 5 欧", "周末有艺人", "傍晚灯光最美"]},
    en: {name: "Piazza della Repubblica", cat: "Square", reason: "Florence's oldest square with the iconic carousel.",
      must: ["Carousel", "Caffè Gilli", "Colonnade walk"],
      tips: ["Outdoor tables +��5", "Street performers", "Best at dusk"]}
  },
  "signoria": {
    zh: {name: "领主广场/旧宫", cat: "广场", reason: "市政中心，《大卫》复制品在大门前。",
      must: ["旧宫卫队换岗", "海神喷泉", "兰奇回廊"],
      tips: ["旧宫登塔 8 欧", "雕塑拍照免费", "凉廊躲雨"]},
    en: {name: "Piazza della Signoria", cat: "Square", reason: "Civic center.",
      must: ["Palazzo Vecchio guards", "Neptune Fountain", "Loggia dei Lanzi"],
      tips: ["Tower climb €8", "Statues free", "Loggia shelters from rain"]}
  },
  "santa-croce": {
    zh: {name: "圣十字大殿", cat: "教堂", reason: "佛罗伦萨的'先贤祠'。",
      must: ["米开朗基罗墓", "伽利略墓", "但丁衣冠冢"],
      tips: ["皮件店老巷", "16 世纪风格", "傍晚人少"]},
    en: {name: "Santa Croce", cat: "Church", reason: "Florence's Pantheon.",
      must: ["Michelangelo's tomb", "Galileo's tomb", "Dante's cenotaph"],
      tips: ["Leather shops in old alleys", "16th-century atmosphere", "Quiet at sunset"]}
  },
  "naples-station": {
    zh: {name: "那不勒斯中央火车站", cat: "交通枢纽", reason: "南意铁路枢纽。",
      must: ["地铁 1 号线去港口", "Trenitalia 售票", "行李寄存"],
      tips: ["注意扒手", "勿逗留袋", "站台看大屏"]},
    en: {name: "Napoli Centrale", cat: "Hub", reason: "Southern Italy's main rail hub.",
      must: ["Metro Line 1 to port", "Trenitalia tickets", "Left luggage"],
      tips: ["Watch for pickpockets", "Check screens for platforms", "Use official taxi ranks"]}
  },
  "capri-port": {
    zh: {name: "卡普里港", cat: "码头", reason: "卡普里主港。",
      must: ["Funivia 缆车上山", "Porto Turistico", "餐厅露台"],
      tips: ["回程船票提前买", "缆车 2 人/箱", "顶部海风大"]},
    en: {name: "Capri Marina Grande", cat: "Port", reason: "Capri's main port.",
      must: ["Funivia cable car up", "Porto Turistico", "Restaurant terraces"],
      tips: ["Buy return ticket in advance", "Cable car max 2 per cabin", "Wind strong on top"]}
  },
  "capri-piazzetta": {
    zh: {name: "卡普里小镇", cat: "小镇", reason: "卡普里镇中心。",
      must: ["Umberto I 广场", "奢侈品橱窗", "Chiesa di Santo Stefano"],
      tips: ["避开正午", "下午人少", "小路回船港"]},
    en: {name: "Capri Piazzetta", cat: "Town Center", reason: "Capri's town center.",
      must: ["Piazza Umberto I", "Luxury windows", "Santo Stefano church"],
      tips: ["Avoid midday", "Quieter afternoon", "Walk back via back streets"]}
  },
  "anacapri": {
    zh: {name: "阿纳卡普里", cat: "山顶小镇", reason: "卡普里山顶小镇。",
      must: ["索拉罗山缆车", "维拉圣米歇尔", "Casa Rossa"],
      tips: ["索拉罗 7.5 欧", "蓝洞排队 2h+", "民宿阳台看日落"]},
    en: {name: "Anacapri", cat: "Hill Town", reason: "Capri's hilltop town.",
      must: ["Mount Solaro chairlift", "Villa San Michele", "Casa Rossa"],
      tips: ["Chairlift €7.5", "Blue Grotto queue 2h+", "Sunset from B&B balcony"]}
  },
  "augustus-garden": {
    zh: {name: "奥古斯都花园", cat: "花园", reason: "卡普里必看花园。",
      must: ["Krupp 步道", "观景台", "仙人掌花坛"],
      tips: ["门票 1.5 欧", "S 弯取景", "光线最好上午"]},
    en: {name: "Augustus Garden", cat: "Garden", reason: "Capri must-see garden.",
      must: ["Via Krupp", "Observation deck", "Cactus beds"],
      tips: ["€1.5 ticket", "S-curve shot", "Best light in morning"]}
  },
  "rome-termini": {
    zh: {name: "罗马中央火车站", cat: "交通枢纽", reason: "罗马最大交通枢纽。",
      must: ["地铁 B 线去斗兽场", "地铁 A 线去梵蒂冈", "行李寄存"],
      tips: ["注意扒手", "行李看管", "站台看大屏"]},
    en: {name: "Roma Termini", cat: "Hub", reason: "Rome's main station.",
      must: ["Metro B to Colosseum", "Metro A to Vatican", "Left luggage"],
      tips: ["Watch for pickpockets", "Secure luggage", "Check screens"]}
  },
  "vatican-museum": {
    zh: {name: "梵蒂冈博物馆", cat: "博物馆", reason: "全球最小国家的博物馆群。",
      must: ["西斯廷礼拜堂", "拉斐尔房间", "古希腊雕塑馆", "旋转楼梯"],
      tips: ["必须提前预约", "首场 9:00 最佳", "门票 25 欧"]},
    en: {name: "Vatican Museums", cat: "Museum", reason: "The smallest state's museum group.",
      must: ["Sistine Chapel", "Raphael Rooms", "Classical sculpture", "Spiral staircase"],
      tips: ["Book ahead required", "09:00 first slot is best", "€25 ticket"]}
  },
  "st-peter": {
    zh: {name: "圣彼得大教堂", cat: "教堂", reason: "全球最大教堂。",
      must: ["穹顶登顶", "圣彼得铜像", "贝尔尼尼华盖", "哀悼基督"],
      tips: ["穹顶电梯 + 楼梯", "周三教皇接见", "着装要求"]},
    en: {name: "St. Peter's Basilica", cat: "Basilica", reason: "World's largest basilica.",
      must: ["Climb the dome", "St. Peter's statue", "Bernini's baldachin", "Pietà"],
      tips: ["Lift + stairs for dome", "Wednesday papal audience", "Dress code"]}
  },
  "castel-angelo": {
    zh: {name: "圣天使城堡", cat: "古堡", reason: "哈德良陵墓改建城堡。",
      must: ["天使长青铜像", "教皇逃生密道", "顶层观景"],
      tips: ["傍晚拍圣彼得", "联票优惠", "桥下景观"]},
    en: {name: "Castel Sant'Angelo", cat: "Castle", reason: "Hadrian's mausoleum turned fortress.",
      must: ["Archangel Michael statue", "Pope's escape route", "Roof view"],
      tips: ["Sunset over St. Peter's", "Combo ticket", "Bridge view"]}
  },
  "navona": {
    zh: {name: "纳沃纳广场", cat: "广场", reason: "贝尔尼尼的四河喷泉。",
      must: ["四河喷泉", "摩尔人喷泉", "海神喷泉"],
      tips: ["街头画家表演", "下午茶位", "夜景华灯"]},
    en: {name: "Piazza Navona", cat: "Square", reason: "Bernini's Fountain of the Four Rivers.",
      must: ["Fountain of the Four Rivers", "Moor's Fountain", "Neptune Fountain"],
      tips: ["Street artists perform", "Afternoon tea seats", "Twilight lamps"]}
  },
  "trevi": {
    zh: {name: "特雷维许愿池", cat: "喷泉", reason: "全球最大巴洛克喷泉。",
      must: ["许愿投币", "海神雕塑", "白色大理石"],
      tips: ["清晨人少", "晚上华灯", "不要坐台阶"]},
    en: {name: "Trevi Fountain", cat: "Fountain", reason: "World's largest Baroque fountain.",
      must: ["Coin toss", "Neptune statue", "White marble"],
      tips: ["Best at dawn", "Lit at night", "Don't sit on steps"]}
  },
  "spanish-steps": {
    zh: {name: "西班牙广场", cat: "广场", reason: "赫本吃冰淇淋的台阶。",
      must: ["西班牙台阶", "破船喷泉", "奢侈品街"],
      tips: ["禁止坐台阶", "G.FASSI 冰淇淋", "Condotti 街"]},
    en: {name: "Spanish Steps", cat: "Square", reason: "Audrey Hepburn's Spanish Steps.",
      must: ["Spanish Steps", "Fontana della Barcaccia", "Luxury street"],
      tips: ["No sitting on steps", "G.FASSI gelato", "Via Condotti"]}
  },
  "pantheon": {
    zh: {name: "万神庙", cat: "古罗马建筑", reason: "至今仍保留完整穹顶的古罗马建筑。",
      must: ["穹顶天眼", "拉斐尔墓", "皇帝陵寝"],
      tips: ["免门票", "雨天看天眼", "正午阳光最佳"]},
    en: {name: "Pantheon", cat: "Ancient Roman", reason: "Best-preserved ancient Roman dome.",
      must: ["Oculus", "Raphael's tomb", "Emperor tombs"],
      tips: ["Free entry", "Rain pours through the oculus", "Noon light is best"]}
  },
  "medici-villa": {
    zh: {name: "美第奇别墅", cat: "博物馆", reason: "法国学院所在地。",
      must: ["花园", "露台", "古罗马雕塑"],
      tips: ["日落最美", "联票优惠", "苹果树大道"]},
    en: {name: "Villa Medici", cat: "Museum", reason: "French Academy HQ.",
      must: ["Garden", "Terrace", "Roman sculptures"],
      tips: ["Sunset is best", "Combo ticket", "Apple tree avenue"]}
  },
  "colosseum": {
    zh: {name: "罗马斗兽场", cat: "古罗马遗址", reason: "古罗马帝国象征。",
      must: ["竞技场/眺望", "地下层", "三层看台"],
      tips: ["必须预约", "25 欧联票", "清晨最美"]},
    en: {name: "Colosseum", cat: "Ancient Roman", reason: "Symbol of ancient Rome.",
      must: ["Arena floor", "Underground", "Three levels of stands"],
      tips: ["Pre-book required", "€25 combo", "Best at dawn"]}
  },
  "forum": {
    zh: {name: "古罗马广场", cat: "古罗马遗址", reason: "古罗马政治中心。",
      must: ["元老院", "凯撒神庙", "帕拉迪诺山"],
      tips: ["斗兽场合票", "清晨最美", "防晒必备"]},
    en: {name: "Roman Forum", cat: "Ancient Roman", reason: "Ancient Rome's political heart.",
      must: ["Senate", "Temple of Caesar", "Palatine Hill"],
      tips: ["Combo with Colosseum", "Best at dawn", "Sun protection"]}
  },
  "palatine": {
    zh: {name: "帕拉迪诺山", cat: "古罗马遗址", reason: "罗马七丘之首。",
      must: ["Domus Augustana", "Farnese 花园", "观景台"],
      tips: ["与斗兽场合票", "走缓坡", "日落机位"]},
    en: {name: "Palatine Hill", cat: "Ancient Roman", reason: "First of the seven hills.",
      must: ["Domus Augustana", "Farnese Gardens", "Viewpoint"],
      tips: ["Combo with Colosseum", "Walk slowly", "Sunset point"]}
  },
  "bocca-verita": {
    zh: {name: "真理之口", cat: "古罗马雕塑", reason: "古罗马下水道井盖。",
      must: ["合影", "教堂", "圣母像雕塑"],
      tips: ["免费", "周末人少", "教堂免费"]},
    en: {name: "Mouth of Truth", cat: "Ancient Roman", reason: "Ancient Roman sewer cover.",
      must: ["Photo op", "Church", "Marble mask"],
      tips: ["Free", "Quiet on weekends", "Free church entry"]}
  },
  "venezia-palace": {
    zh: {name: "威尼斯广场", cat: "广场", reason: "罗马交通圆心。",
      must: ["祖国祭坛", "无名烈士墓", "骑马铜像"],
      tips: ["俯瞰全城", "电梯到顶层", "卫兵换岗"]},
    en: {name: "Piazza Venezia", cat: "Square", reason: "Rome's traffic hub.",
      must: ["Altar of the Fatherland", "Tomb of the Unknown Soldier", "Equestrian statues"],
      tips: ["Panoramic view", "Lift to rooftop", "Guard change"]}
  },
  "hk": {
    zh: {name: "香港国际机场", cat: "机场", reason: "国际航空枢纽。",
      must: ["T1 航站楼", "机场快线柜台", "行李寄存"],
      tips: ["提前 3h 到机场", "网约车区 F1", "八达通售卖点"]},
    en: {name: "Hong Kong International Airport", cat: "Airport", reason: "Major international aviation hub.",
      must: ["T1 terminal", "Airport Express counter", "Left luggage"],
      tips: ["Arrive 3h early", "Ride-hailing zone F1", "Octopus card booth"]}
  },
  "fco": {
    zh: {name: "罗马菲乌米奇诺机场", cat: "机场", reason: "罗马最大机场。",
      must: ["T1/T3 出发大厅", "Trenitalia 自助取票", "出租车站"],
      tips: ["机场免税店", "Leonardo Express 站台", "提前 3h 到机场"]},
    en: {name: "Rome Fiumicino", cat: "Airport", reason: "Rome's largest airport.",
      must: ["T1/T3 departures", "Trenitalia self-service", "Taxi ranks"],
      tips: ["Duty free shops", "Leonardo Express platform", "Arrive 3h early"]}
  }
};

// === 待办与贴士 ===
var TODO_LIST = {
  zh: [
    "办理签证（已确认）", "预订往返机票（EY871/EY81/EY86/EY870）",
    "Brixen 民宿预订", "威尼斯梅斯特雷 Staycity 预订",
    "佛罗伦萨 Rinascimento 民宿预订", "卡普里 B&B Il Sogno 预订",
    "罗马 Radisson Blu GHR 预订", "梵蒂冈博物馆提前预约",
    "乌菲兹美术馆提前预约", "学院美术馆提前预约",
    "多洛米蒂 BrixenCard", "欧元现金 + 国际信用卡",
    "境外旅行保险", "国际驾照翻译件",
    "便携 Wi-Fi / eSIM 卡", "电源转换插头（意标 L 型）",
    "防晒霜 + 雨伞", "舒适步行鞋"
  ],
  en: [
    "Visa (confirmed)", "Round-trip flights (EY871/EY81/EY86/EY870)",
    "Brixen apartment booking", "Venice Mestre Staycity booking",
    "Florence Rinascimento apartment booking", "Capri B&B Il Sogno booking",
    "Rome Radisson Blu GHR booking", "Vatican Museums advance booking",
    "Uffizi Gallery advance booking", "Accademia Gallery advance booking",
    "BrixenCard for Dolomites", "Euro cash + international credit card",
    "Travel insurance", "International driving permit translation",
    "Portable Wi-Fi / eSIM", "Power adapter (Type L)",
    "Sunscreen + umbrella", "Comfortable walking shoes"
  ]
};

var TIPS_LIST = {
  zh: [
    "意大利 9 月底已入秋，多洛米蒂山顶需备薄羽绒；10 月初罗马早晚 12-18°C，备薄外套。",
    "意大利时区 CEST（UTC+2），与北京相差 6 小时（夏令时）。",
    "餐厅午餐 13-15、晚餐 19-23 最忙，其余时段需确认营业。",
    "餐厅账单常含 coperto 餐位费 2-3€/人。",
    "热门餐厅建议提前 App 预约（TheFork 等）。",
    "意大利许多景点周日免费或优惠（如斗兽场每月第一个周日）。",
    "公共水龙头（nasone）遍布罗马，免费直饮。",
    "打车务必使用官方 APP（FreeNow、itTaxi），或在出租车站排队。",
    "意大利景点着装要求严格，教堂内勿露肩/膝。",
    "现金支付在小型餐厅/市集仍是主流，建议备 200-300 欧现金。",
    "包车/出租价格含行李不强制小费；餐厅小费 5-10%。",
    "意大利紧急电话：警察 112、��疗 118、消防 115。"
  ],
  en: [
    "Late September = autumn in Italy. Bring a light down jacket for Dolomites; 12–18°C in Rome in early October.",
    "Italy is on CEST (UTC+2) — 6 hours behind (during DST).",
    "Restaurants busy 13:00–15:00 (lunch) and 19:00–23:00 (dinner).",
    "Coperto (cover charge) of €2–3/person is standard.",
    "Book popular restaurants on TheFork or similar apps.",
    "Many sites are free/discounted on Sundays.",
    "Rome's nasone drinking fountains serve free fresh water.",
    "Use official taxi apps (FreeNow / itTaxi) or queue at taxi ranks.",
    "Italy enforces strict dress codes — cover shoulders & knees in churches.",
    "Cash still king in small trattorias — keep €200–300 in cash.",
    "Taxis/private driver: luggage not extra. Restaurants: tip 5–10%.",
    "Italy emergency: 112 (police), 118 (medical), 115 (fire)."
  ]
};

// === 行李清单 ===
var PACKING_LIST = {
  zh: [
    {category: "随身物品", items: [
      "身份证",
      "护照",
      "visa 卡",
      "现金（欧元 + 小面额）",
      "流量卡"
    ]},
    {category: "防盗物品", items: [
      "八字扣",
      "防盗扣",
      "防盗弹簧绳",
      "行李防盗绳",
      "手机防盗绳",
      "防盗内裤",
      "AirTag"
    ]},
    {category: "箱包收纳", items: [
      "草编包",
      "双肩背包",
      "斜挎棕色包"
    ]},
    {category: "电子产品", items: [
      "转换插头 × 2",
      "充电线",
      "耳机",
      "充电宝"
    ]},
    {category: "生活用品", items: [
      "折叠烧水壶",
      "拖鞋",
      "毛巾",
      "一次性内裤",
      "一次性袜子",
      "湿纸巾",
      "抽纸",
      "纸巾",
      "卫生巾",
      "雨伞",
      "小风扇"
    ]},
    {category: "洗护用品", items: [
      "牙刷 + 牙膏",
      "面膜",
      "卸妆膏",
      "洗发水",
      "护发精油",
      "沐浴露",
      "梳子",
      "保湿霜"
    ]},
    {category: "零食", items: [
      "泡面"
    ]},
    {category: "药物", items: [
      "布洛芬",
      "感冒药"
    ]},
    {category: "衣物", items: [
      "风衣",
      "冲锋衣",
      "羽绒服",
      "皮衣",
      "黑色皮鞋",
      "运动鞋",
      "白色皮鞋",
      "吊带",
      "工字背心",
      "内衣",
      "袜子",
      "运动裤",
      "光腿神器",
      "长袖睡衣",
      "短袖睡衣"
    ]},
    {category: "化妆品", items: [
      "卷发棒",
      "假睫毛",
      "美瞳",
      "粉饼",
      "防晒",
      "卸妆膏"
    ]},
    {category: "装饰品", items: [
      "耳环",
      "腰链",
      "墨镜",
      "鸭舌帽",
      "香水",
      "大肠发圈"
    ]},
    {category: "摄影设备", items: [
      "相机",
      "镜头",
      "CCD",
      "胶片机",
      "胶卷",
      "拍立得",
      "拍立得相纸",
      "备用电池",
      "读卡器"
    ]},
    {category: "飞机上随身携带", subcategories: [
      {name: "随身物品", items: ["身份证", "护照", "visa 卡", "现金", "流量卡"]},
      {name: "防盗物品", items: ["八字扣", "防盗扣", "防盗弹簧绳", "手机防盗绳"]},
      {name: "箱包收纳", items: ["草编包", "双肩背包"]},
      {name: "洗漱用品", items: ["牙刷 + 牙膏", "面膜", "抽纸", "保湿霜"]},
      {name: "衣物", items: ["冲锋衣", "一次性拖鞋"]},
      {name: "经济舱好物", items: ["头枕", "眼罩", "腰靠", "座垫", "压力袜", "加湿口罩", "耳塞"]},
      {name: "贵重物品", items: ["相机", "镜头", "CCD", "胶片机", "胶卷", "拍立得相纸", "备用电池"]},
      {name: "��他", items: ["零食", "雨伞"]}
    ]}
  ],
  en: [
    {category: "Documents", items: [
      "ID card",
      "Passport",
      "Visa card",
      "Cash (EUR + small notes)",
      "Data SIM"
    ]},
    {category: "Anti-theft", items: [
      "Carabiner clip",
      "Anti-theft lock",
      "Retractable security cable",
      "Luggage security strap",
      "Phone lanyard",
      "Anti-theft underwear",
      "AirTag"
    ]},
    {category: "Bags & Organizers", items: [
      "Straw tote bag",
      "Backpack",
      "Brown crossbody bag"
    ]},
    {category: "Electronics", items: [
      "Plug adapter × 2",
      "Charging cable",
      "Earphones",
      "Power bank"
    ]},
    {category: "Daily necessities", items: [
      "Foldable kettle",
      "Slippers",
      "Towel",
      "Disposable underwear",
      "Disposable socks",
      "Wet wipes",
      "Tissue box",
      "Pocket tissues",
      "Sanitary pads",
      "Umbrella",
      "Mini fan"
    ]},
    {category: "Toiletries", items: [
      "Toothbrush + toothpaste",
      "Face mask",
      "Makeup remover",
      "Shampoo",
      "Hair oil",
      "Body wash",
      "Comb",
      "Moisturizer"
    ]},
    {category: "Snacks", items: [
      "Instant noodles"
    ]},
    {category: "Medicine", items: [
      "Ibuprofen",
      "Cold medicine"
    ]},
    {category: "Clothing", items: [
      "Trench coat",
      "Windbreaker",
      "Down jacket",
      "Leather jacket",
      "Black leather shoes",
      "Sneakers",
      "White leather shoes",
      "Spaghetti strap top",
      "Tank top",
      "Bra",
      "Socks",
      "Sport pants",
      "Nude-effect tights",
      "Long-sleeve pajama",
      "Short-sleeve pajama"
    ]},
    {category: "Makeup", items: [
      "Curling iron",
      "False eyelashes",
      "Colored contacts",
      "Compact powder",
      "Sunscreen",
      "Makeup remover"
    ]},
    {category: "Accessories", items: [
      "Earrings",
      "Waist chain",
      "Sunglasses",
      "Cap",
      "Perfume",
      "Large hair tie"
    ]},
    {category: "Camera gear", items: [
      "Camera",
      "Lens",
      "CCD camera",
      "Film camera",
      "Film rolls",
      "Instax camera",
      "Instax film",
      "Spare battery",
      "Card reader"
    ]},
    {category: "Carry-on only", subcategories: [
      {name: "Documents", items: ["ID card", "Passport", "Visa card", "Cash", "Data SIM"]},
      {name: "Anti-theft", items: ["Carabiner clip", "Anti-theft lock", "Retractable security cable", "Phone lanyard"]},
      {name: "Bags", items: ["Straw tote bag", "Backpack"]},
      {name: "Toiletries", items: ["Toothbrush + toothpaste", "Face mask", "Tissue box", "Moisturizer"]},
      {name: "Clothing", items: ["Windbreaker", "Disposable slippers"]},
      {name: "Economy class comfort", items: ["Neck pillow", "Eye mask", "Lumbar cushion", "Seat cushion", "Compression socks", "Humidifier mask", "Earplugs"]},
      {name: "Valuables", items: ["Camera", "Lens", "CCD camera", "Film camera", "Film rolls", "Instax film", "Spare battery"]},
      {name: "Others", items: ["Snacks", "Umbrella"]}
    ]}
  ]
};

// === 住宿信息 ===
var STAY_INFO = {
  "brixen-hotel": {
    zh: {name: "Gerharts Premium City Living - center of Brixen", city: "Brixen",
      order: "Brixen Card 包含", nights: "9.26 / 9.27 / 9.28 三晚", price: "611/晚",
      note: "含 BrixenCard，免费乘公交+多项折扣；免费停车。"},
    en: {name: "Gerharts Premium City Living - center of Brixen", city: "Brixen",
      order: "Brixen Card included", nights: "9.26 / 9.27 / 9.28 (3 nights)", price: "€611/night",
      note: "Includes BrixenCard (free bus + many discounts); free parking."}
  },
  "venice-hotel": {
    zh: {name: "Staycity Aparthotels Venice Mestre", city: "Venice Mestre",
      order: "STAYCITY-2024-IT", nights: "9.28 一晚", price: "453/晚",
      note: "梅斯特雷火车站步行 8 分钟；公寓式含厨房。"},
    en: {name: "Staycity Aparthotels Venice Mestre", city: "Venice Mestre",
      order: "STAYCITY-2024-IT", nights: "9.28 (1 night)", price: "€453/night",
      note: "8-min walk to Mestre station; apartment with kitchenette."}
  },
  "florence-hotel": {
    zh: {name: "Rinascimento Apartments", city: "Florence",
      order: "RINA-2024-FIRENZE", nights: "9.29 / 9.30 两晚", price: "409/晚",
      note: "近 SMN 火车站与中央市场；老建筑复式公寓。"},
    en: {name: "Rinascimento Apartments", city: "Florence",
      order: "RINA-2024-FIRENZE", nights: "9.29 / 9.30 (2 nights)", price: "€409/night",
      note: "Near SMN station and Mercato Centrale; historic duplex."}
  },
  "capri-hotel": {
    zh: {name: "B&B Il Sogno", city: "Anacapri",
      order: "ILSOGNO-2024-CAPRI", nights: "10.1 一晚", price: "358/晚",
      note: "山顶民宿含早餐；步行至缆车 10 分钟。"},
    en: {name: "B&B Il Sogno", city: "Anacapri",
      order: "ILSOGNO-2024-CAPRI", nights: "10.1 (1 night)", price: "€358/night",
      note: "Hilltop B&B with breakfast; 10-min walk to chairlift."}
  },
  "rome-hotel": {
    zh: {name: "Radisson Blu GHR Rome", city: "Rome",
      order: "RHG-2024-ROME", nights: "10.2 / 10.3 / 10.4 三晚", price: "458-460/晚",
      note: "近中央火车站；含早。"},
    en: {name: "Radisson Blu GHR Rome", city: "Rome",
      order: "RHG-2024-ROME", nights: "10.2 / 10.3 / 10.4 (3 nights)", price: "€458–460/night",
      note: "Near Termini station; breakfast included."}
  }
};

// === 交通票据 ===
var TICKETS = {
  "EY871": {
    zh: {type: "flight", label: "香港 → 阿布扎比", no: "EY871", date: "9.25",
      time: "21:30-05:25+1", from: "HKG", to: "AUH",
      price: "4581 元/人", note: "阿提哈航空，提前 3h 到机场。"},
    en: {type: "flight", label: "Hong Kong → Abu Dhabi", no: "EY871", date: "9.25",
      time: "21:30-05:25+1", from: "HKG", to: "AUH",
      price: "¥4581/p", note: "Etihad; arrive 3h early."}
  },
  "EY81": {
    zh: {type: "flight", label: "阿布扎比 → 米兰马尔彭萨", no: "EY81", date: "9.26",
      time: "08:45-13:10", from: "AUH", to: "MXP",
      price: "4581 元/人", note: "T1 抵达，包车接机。"},
    en: {type: "flight", label: "Abu Dhabi → Milan Malpensa", no: "EY81", date: "9.26",
      time: "08:45-13:10", from: "AUH", to: "MXP",
      price: "¥4581/p", note: "T1 arrival; private transfer."}
  },
  "EY86": {
    zh: {type: "flight", label: "罗马 → 阿布扎比", no: "EY86", date: "10.5",
      time: "11:35-19:50", from: "FCO", to: "AUH",
      price: "4581 元/人", note: "FCO 机场，提前 3h。"},
    en: {type: "flight", label: "Rome → Abu Dhabi", no: "EY86", date: "10.5",
      time: "11:35-19:50", from: "FCO", to: "AUH",
      price: "¥4581/p", note: "FCO airport; arrive 3h early."}
  },
  "EY870": {
    zh: {type: "flight", label: "阿布扎比 → 香港", no: "EY870", date: "10.6",
      time: "08:30-19:30", from: "AUH", to: "HKG",
      price: "4581 元/人", note: "抵港后机场快线回市区。"},
    en: {type: "flight", label: "Abu Dhabi → Hong Kong", no: "EY870", date: "10.6",
      time: "08:30-19:30", from: "AUH", to: "HKG",
      price: "¥4581/p", note: "Airport Express back to city."}
  },
  "Train-Roma-Florence": {
    zh: {type: "train", label: "罗马 → 佛罗��萨", no: "FRECCIAROSSA", date: "9.29",
      time: "07:38-09:39", from: "Roma Termini", to: "Firenze SMN",
      price: "270.25 €/人", note: "Italo 或 Trenitalia；早鸟票。"},
    en: {type: "train", label: "Rome → Florence", no: "FRECCIAROSSA", date: "9.29",
      time: "07:38-09:39", from: "Roma Termini", to: "Firenze SMN",
      price: "€270.25/p", note: "Italo or Trenitalia early-bird."}
  },
  "Train-Florence-Naples": {
    zh: {type: "train", label: "佛罗伦萨 → 那不勒斯", no: "FRECCIAROSSA", date: "10.1",
      time: "09:14-12:18", from: "Firenze SMN", to: "Napoli Centrale",
      price: "312.5 €/人", note: "Italo 9:14-12:18。"},
    en: {type: "train", label: "Florence → Naples", no: "FRECCIAROSSA", date: "10.1",
      time: "09:14-12:18", from: "Firenze SMN", to: "Napoli Centrale",
      price: "€312.5/p", note: "Italo 9:14-12:18."}
  },
  "Ferry-Capri-Naples": {
    zh: {type: "ferry", label: "卡普里 → 那不勒斯", no: "SNAV / NLG", date: "10.2",
      time: "16:30-17:30", from: "Capri Porto", to: "Napoli Molo Beverello",
      price: "约 25 €/人", note: "回程提前购票。"},
    en: {type: "ferry", label: "Capri → Naples", no: "SNAV / NLG", date: "10.2",
      time: "16:30-17:30", from: "Capri Porto", to: "Napoli Molo Beverello",
      price: "≈€25/p", note: "Buy return in advance."}
  },
  "Ferry-Naples-Capri": {
    zh: {type: "ferry", label: "那不勒斯 → 卡普里", no: "SNAV / NLG", date: "10.1",
      time: "14:40-15:30", from: "Napoli Molo Beverello", to: "Capri Porto",
      price: "约 24 €/人", note: "船票现场买亦可。"},
    en: {type: "ferry", label: "Naples → Capri", no: "SNAV / NLG", date: "10.1",
      time: "14:40-15:30", from: "Napoli Molo Beverello", to: "Capri Porto",
      price: "≈€24/p", note: "Buy at dock."}
  },
  "Train-Naples-Rome": {
    zh: {type: "train", label: "那不勒斯 → 罗马", no: "FRECCIAROSSA", date: "10.2",
      time: "19:20-20:30", from: "Napoli Centrale", to: "Roma Termini",
      price: "157 €/人", note: "高铁直达 70 分钟。"},
    en: {type: "train", label: "Naples → Rome", no: "FRECCIAROSSA", date: "10.2",
      time: "19:20-20:30", from: "Napoli Centrale", to: "Roma Termini",
      price: "€157/p", note: "High-speed 70 min."}
  },
  "Dolomites-Car-MXP-Brixen": {
    zh: {type: "car", label: "米兰 → Brixen 包车", no: "MILAN-BRIX-CAR", date: "9.26",
      time: "10:00 出发", from: "MXP 机场", to: "Brixen",
      price: "833 €/4人", note: "4 人均摊约 208 €/人；车程约 4 小时。"},
    en: {type: "car", label: "Milan → Brixen car", no: "MILAN-BRIX-CAR", date: "9.26",
      time: "Depart 10:00", from: "MXP airport", to: "Brixen",
      price: "€833/4p", note: "≈€208/p split; ≈4h drive."}
  },
  "Dolomites-Car-Brixen-Venice": {
    zh: {type: "car", label: "Brixen → 威尼斯 包车", no: "BRIX-VEN-CAR", date: "9.28",
      time: "午后出发", from: "Brixen", to: "Venice Mestre",
      price: "955 €/4人", note: "4 人均摊约 239 €/人；车程约 4.5 小时。"},
    en: {type: "car", label: "Brixen → Venice car", no: "BRIX-VEN-CAR", date: "9.28",
      time: "Afternoon departure", from: "Brixen", to: "Venice Mestre",
      price: "€955/4p", note: "≈€239/p split; ≈4.5h drive."}
  }
};

// === 行程数据（12 天） ===
var ITINERARY = [
  {day: 1, date: "2026-09-25", weekday: "周五", title: "启程 · 香港 → 阿布扎比",
    cityLabel: "香港 / 阿布扎比", cityKey: "hk-auh",
    centerLat: 25.2528, centerLng: 54.3773, zoom: 3,
    items: [
      {time: "21:30", zone: "HKT", type: "flight",
       title: "✈ EY871 香港 → 阿布扎比", note: "全程约 7h55m；提前 3h 办登机。",
       tags: ["flight"], spot: null},
      {time: "05:25+1", zone: "GST", type: "transit",
       title: "抵达阿布扎比", note: "转机时间约 3h20m。",
       tags: ["note"], spot: null}
    ],
    stay: null, transitNote: null},
  {day: 2, date: "2026-09-26", weekday: "周六", title: "阿布扎比 → 米兰 → 多洛米蒂",
    cityLabel: "米兰 → 多洛米蒂 Brixen", cityKey: "milan-brixen",
    centerLat: 46.4, centerLng: 11.0, zoom: 7,
    items: [
      {time: "08:45", zone: "GST", type: "flight",
       title: "✈ EY81 阿布扎比 → 米兰马尔彭萨", note: "约 7h25m；包车司机举牌接机。",
       tags: ["flight"], spot: "milano-malpensa"},
      {time: "10:00", zone: "CEST", type: "transit",
       title: "🚗 包车前往 Brixen", note: "4 人包车 €833；车程约 4 小时；沿途阿尔卑斯山景。",
       tags: ["book"], spot: null, transit: 240},
      {time: "14:00", zone: "CEST", type: "activity",
       title: "抵达 Brixen 民宿", note: "办理入住 Gerharts Premium City Living。",
       tags: ["info"], spot: "brixen"},
      {time: "15:00", zone: "CEST", type: "activity",
       title: "🚗 富内斯山谷 (Val di Funes)", note: "St. Magdalena 教堂 + 日照金山。",
       tags: ["nav"], spot: null, transit: 60},
      {time: "18:30", zone: "CEST", type: "meal",
       title: "晚餐 · Brixen 老城", note: "尝试南提洛尔菜。",
       tags: ["info"], spot: "brixen"}
    ],
    stay: "brixen-hotel",
    transitNote: "米兰 → Brixen 4h 包车；沿途经过波尔察诺 (Bolzano)。"},
  {day: 3, date: "2026-09-27", weekday: "周日", title: "刀锋山 + 休斯高原",
    cityLabel: "多洛米蒂 · Dolomites", cityKey: "dolomites",
    centerLat: 46.58, centerLng: 11.65, zoom: 10,
    items: [
      {time: "08:00", zone: "CEST", type: "transit",
       title: "🚗 公交前往 Ortisei 缆车站", note: "BrixenCard 包含；车程约 30 分钟。",
       tags: ["info"], spot: null, transit: 30},
      {time: "08:30", zone: "CEST", type: "activity",
       title: "🪂 Seceda 刀锋山缆车上山", note: "必看景点；山顶风大备外套。",
       tags: ["book", "info"], spot: "seceda"},
      {time: "12:00", zone: "CEST", type: "meal",
       title: "午餐 · Ortisei 山下", note: "推荐 Café & Bistro。",
       tags: ["info"], spot: null, transit: 60},
      {time: "14:00", zone: "CEST", type: "transit",
       title: "🚗 前往休斯高原", note: "公交 + 缆车；Compatsch 上山。",
       tags: ["book"], spot: "alpe-di-siusi", transit: 90},
      {time: "15:00", zone: "CEST", type: "activity",
       title: "🌄 休斯高原徒步", note: "Panorama 步道；9 月底秋色渐染。",
       tags: ["nav"], spot: "alpe-di-siusi"},
      {time: "18:00", zone: "CEST", type: "transit",
       title: "🚗 返回 Brixen 民宿", note: "公交全程约 1 小时。",
       tags: [], spot: null, transit: 60}
    ],
    stay: "brixen-hotel",
    transitNote: "BrixenCard 包含所有公共交通。"},
  {day: 4, date: "2026-09-28", weekday: "周一", title: "布雷耶斯湖 → 威尼斯",
    cityLabel: "多洛米蒂 → 威尼斯", cityKey: "dolomites-venice",
    centerLat: 45.6, centerLng: 12.0, zoom: 7,
    items: [
      {time: "07:00", zone: "CEST", type: "transit",
       title: "🚗 出发前往布雷耶斯湖", note: "车程约 30 分钟；清晨静谧最美。",
       tags: [], spot: null, transit: 30},
      {time: "07:30", zone: "CEST", type: "activity",
       title: "🌊 布雷耶斯湖 (Lago di Carezza)", note: "翡翠色湖水；雨后见彩虹。",
       tags: ["info"], spot: "lago-carezza"},
      {time: "10:00", zone: "CEST", type: "transit",
       title: "🚗 出发前往威尼斯", note: "车程约 4.5 小时；中途午餐休息。",
       tags: [], spot: "venice-mestre", transit: 270},
      {time: "16:30", zone: "CEST", type: "activity",
       title: "抵达 Staycity 民宿", note: "办理入住。",
       tags: ["info"], spot: "venice-mestre"},
      {time: "17:30", zone: "CEST", type: "transit",
       title: "🚆 火车前往主岛", note: "约 10 分钟；持票免费上岛。",
       tags: [], spot: "venice-rialto", transit: 10},
      {time: "18:30", zone: "CEST", type: "activity",
       title: "🌅 学院桥看日落", note: "威尼斯最经典取景地。",
       tags: ["info"], spot: "venice-ponte"},
      {time: "20:00", zone: "CEST", type: "meal",
       title: "晚餐 · 圣马可广场周边", note: "推荐 Ristorante Quadri。",
       tags: ["book"], spot: "venice-stmarks"}
    ],
    stay: "venice-hotel",
    transitNote: "Brixen → 威尼斯 4.5h 包车 + 火车 10min。"},
  {day: 5, date: "2026-09-29", weekday: "周二", title: "威尼斯 → 佛罗伦萨",
    cityLabel: "威尼斯 → 佛罗伦萨", cityKey: "venice-florence",
    centerLat: 43.77, centerLng: 11.25, zoom: 7,
    items: [
      {time: "07:00", zone: "CEST", type: "transit",
       title: "🚆 火车 SMN 火车站", note: "持票免费上岛。",
       tags: [], spot: "venice-rialto", transit: 10},
      {time: "07:38", zone: "CEST", type: "transit",
       title: "🚆 Frecciarossa 前往佛罗伦萨", note: "2 小时车程。",
       tags: ["book"], spot: null, transit: 120},
      {time: "09:39", zone: "CEST", type: "activity",
       title: "抵达佛罗伦萨 SMN", note: "步行前往民宿寄存行李。",
       tags: [], spot: "florence-smn"},
      {time: "11:00", zone: "CEST", type: "meal",
       title: "午餐 · 中央市场", note: "Nerbone 牛肚包。",
       tags: ["info"], spot: "central-market"},
      {time: "14:15", zone: "CEST", type: "activity",
       title: "🎨 乌菲兹美术馆", note: "波提切利房间必看。",
       tags: ["book"], spot: "uffizi"},
      {time: "17:00", zone: "CEST", type: "activity",
       title: "🌉 老桥 (Ponte Vecchio)", note: "瓦萨利走廊；金匠店。",
       tags: ["info"], spot: "ponte-vecchio"},
      {time: "18:30", zone: "CEST", type: "activity",
       title: "🌅 米开朗基罗广场看日落", note: "佛罗伦萨最佳日落点。",
       tags: ["nav"], spot: "michelangelo-square"}
    ],
    stay: "florence-hotel",
    transitNote: "威尼斯 SMN → 佛罗伦萨 SMN 火车 2 小时。"},
  {day: 6, date: "2026-09-30", weekday: "周三", title: "佛罗伦萨深度",
    cityLabel: "佛罗伦萨", cityKey: "florence",
    centerLat: 43.77, centerLng: 11.255, zoom: 12,
    items: [
      {time: "08:30", zone: "CEST", type: "activity",
       title: "🎨 学院美术馆 (大卫)", note: "最早场；门票 24 欧；预约 b-ticket。",
       tags: ["book", "info"], spot: "accademia"},
      {time: "11:00", zone: "CEST", type: "activity",
       title: "⛪ 圣母百花大教堂", note: "联票含 5 景点。",
       tags: ["info", "book"], spot: "duomo"},
      {time: "13:00", zone: "CEST", type: "meal",
       title: "午餐 · 中央市场", note: "一楼食材二楼餐厅。",
       tags: ["info"], spot: "central-market"},
      {time: "15:00", zone: "CEST", type: "activity",
       title: "🌀 共和广场", note: "旋转木马经典。",
       tags: ["info"], spot: "republic-square"},
      {time: "16:00", zone: "CEST", type: "activity",
       title: "👑 领主广场 / 旧宫", note: "大卫复制品；旧宫登塔 8 欧。",
       tags: ["info"], spot: "signoria"},
      {time: "17:00", zone: "CEST", type: "activity",
       title: "✝ 圣十字大殿", note: "先贤祠。",
       tags: ["info"], spot: "santa-croce"}
    ],
    stay: "florence-hotel",
    transitNote: "佛罗伦萨老城全部步行。"},
  {day: 7, date: "2026-10-01", weekday: "周四", title: "佛罗伦萨 → 卡普里岛",
    cityLabel: "佛罗伦萨 → 卡普里", cityKey: "florence-capri",
    centerLat: 40.55, centerLng: 14.25, zoom: 9,
    items: [
      {time: "09:14", zone: "CEST", type: "transit",
       title: "🚆 Italo 前往那不勒斯", note: "约 3 小时。",
       tags: ["book"], spot: "naples-station", transit: 180},
      {time: "12:18", zone: "CEST", type: "transit",
       title: "🚇 地铁 1 号线前往码头", note: "约 20 分钟。",
       tags: [], spot: null, transit: 20},
      {time: "13:00", zone: "CEST", type: "meal",
       title: "午餐 · 那不勒斯码头", note: "披萨饼尝 Sfizio。",
       tags: ["info"], spot: null},
      {time: "14:40", zone: "CEST", type: "transit",
       title: "⛴ 轮渡前往卡普里", note: "约 50 分钟；约 24 €/人。",
       tags: ["book"], spot: "capri-port", transit: 50},
      {time: "15:30", zone: "CEST", type: "transit",
       title: "🚌 公交前往 Anacapri", note: "排队 20min；约 16:30 到民宿。",
       tags: ["note"], spot: "anacapri", transit: 60},
      {time: "18:00", zone: "CEST", type: "activity",
       title: "🌄 阿纳卡普里逛吃", note: "如果来得及坐索拉罗缆车看日落。",
       tags: ["nav", "book"], spot: "anacapri"}
    ],
    stay: "capri-hotel",
    transitNote: "火车 + 地铁 + 轮渡 + 公交多段衔接。"},
  {day: 8, date: "2026-10-02", weekday: "周五", title: "卡普里岛 → 罗马",
    cityLabel: "卡普里 → 罗马", cityKey: "capri-rome",
    centerLat: 41.9, centerLng: 12.5, zoom: 6,
    items: [
      {time: "08:30", zone: "CEST", type: "transit",
       title: "🚠 索拉罗缆车上山", note: "单程 13 分钟。",
       tags: ["book"], spot: null, transit: 30},
      {time: "09:00", zone: "CEST", type: "activity",
       title: "🌅 索拉罗山顶", note: "卡普里最高点。",
       tags: ["nav"], spot: null},
      {time: "11:00", zone: "CEST", type: "transit",
       title: "🚌 公交前往 Capri", note: "约 30 分钟。",
       tags: [], spot: "augustus-garden", transit: 30},
      {time: "11:30", zone: "CEST", type: "activity",
       title: "🌸 奥古斯都花园", note: "S 弯取景；法拉利奥尼岩群。",
       tags: ["info"], spot: "augustus-garden"},
      {time: "12:30", zone: "CEST", type: "meal",
       title: "午餐 · 卡普里小镇", note: "推荐 Faraglioni 露台餐厅。",
       tags: ["info"], spot: "capri-piazzetta"},
      {time: "15:30", zone: "CEST", type: "transit",
       title: "⛴ 轮渡回那不勒斯", note: "16:30-17:30；约 25 €/人。",
       tags: ["book"], spot: "naples-station", transit: 60},
      {time: "17:30", zone: "CEST", type: "transit",
       title: "🚇 地铁前往火车站", note: "约 15 分钟。",
       tags: [], spot: null, transit: 15},
      {time: "19:20", zone: "CEST", type: "transit",
       title: "🚆 高铁前往罗马", note: "Frecciarossa 70 分钟。",
       tags: ["book"], spot: "rome-termini", transit: 70},
      {time: "20:30", zone: "CEST", type: "activity",
       title: "抵达 Radisson Blu", note: "办理入住。",
       tags: ["info"], spot: "rome-termini"}
    ],
    stay: "rome-hotel",
    transitNote: "卡普里 → 那不勒斯 轮渡 → 罗马 高铁全程约 4 小时。"},
  {day: 9, date: "2026-10-03", weekday: "周六", title: "梵蒂冈一日",
    cityLabel: "梵蒂冈", cityKey: "vatican",
    centerLat: 41.905, centerLng: 12.453, zoom: 13,
    items: [
      {time: "08:30", zone: "CEST", type: "activity",
       title: "⛪ 圣彼得大教堂", note: "是否登顶？；约 2 小时。",
       tags: ["info", "book"], spot: "st-peter"},
      {time: "11:00", zone: "CEST", type: "meal",
       title: "午餐 · 梵蒂冈附近", note: "推荐 Borgo Pio 老巷。",
       tags: [], spot: null},
      {time: "13:00", zone: "CEST", type: "activity",
       title: "🏛️ 梵蒂冈博物馆", note: "含西斯廷礼拜堂；门票 25 欧。",
       tags: ["book"], spot: "vatican-museum"},
      {time: "16:30", zone: "CEST", type: "activity",
       title: "🏰 圣天使城堡", note: "顶层眺望圣彼得。",
       tags: ["info"], spot: "castel-angelo"},
      {time: "18:00", zone: "CEST", type: "activity",
       title: "🎨 纳沃纳广场", note: "四河喷泉；街头画家。",
       tags: ["info"], spot: "navona"},
      {time: "19:30", zone: "CEST", type: "activity",
       title: "🌊 特雷维许愿池", note: "许愿投币；夜景华灯。",
       tags: ["info"], spot: "trevi"}
    ],
    stay: "rome-hotel",
    transitNote: "梵蒂冈步行 + 地铁 A 线。"},
  {day: 10, date: "2026-10-04", weekday: "周日", title: "罗马深度",
    cityLabel: "罗马 · 古迹", cityKey: "rome",
    centerLat: 41.895, centerLng: 12.482, zoom: 13,
    items: [
      {time: "09:00", zone: "CEST", type: "activity",
       title: "🛍️ 西班牙广场", note: "赫本同款机位；G.FASSI 冰淇淋。",
       tags: ["info"], spot: "spanish-steps"},
      {time: "10:30", zone: "CEST", type: "activity",
       title: "🌊 特雷维许愿池", note: "清晨人少。",
       tags: ["info"], spot: "trevi"},
      {time: "12:00", zone: "CEST", type: "activity",
       title: "🏛 万神庙", note: "免门票；天眼下雨最美。",
       tags: ["info"], spot: "pantheon"},
      {time: "13:30", zone: "CEST", type: "meal",
       title: "午餐 · 万神殿附近", note: "推荐 Da Tonino。",
       tags: ["info"], spot: null},
      {time: "14:00", zone: "CEST", type: "activity",
       title: "🌳 美第奇别墅", note: "俯瞰西班牙广场。",
       tags: ["info"], spot: "medici-villa"},
      {time: "16:00", zone: "CEST", type: "activity",
       title: "🏛 罗马斗兽场", note: "25 欧联票；提前预约。",
       tags: ["book"], spot: "colosseum"},
      {time: "17:30", zone: "CEST", type: "activity",
       title: "🏛 古罗马广场", note: "凯撒演讲地；元老院。",
       tags: ["info"], spot: "forum"},
      {time: "18:30", zone: "CEST", type: "activity",
       title: "🌄 帕拉迪诺山", note: "日落机位；俯瞰全城。",
       tags: ["info"], spot: "palatine"},
      {time: "19:30", zone: "CEST", type: "activity",
       title: "👄 真理之口", note: "拍照必到。",
       tags: ["info"], spot: "bocca-verita"},
      {time: "20:30", zone: "CEST", type: "meal",
       title: "晚餐 · 威尼斯广场周边", note: "推荐 Ristorante Corallo。",
       tags: [], spot: "venezia-palace"}
    ],
    stay: "rome-hotel",
    transitNote: "全部步行。"},
  {day: 11, date: "2026-10-05", weekday: "周一", title: "罗马 → 阿布扎比",
    cityLabel: "罗马 → 阿布扎比", cityKey: "rome-auh",
    centerLat: 41.9, centerLng: 12.5, zoom: 11,
    items: [
      {time: "06:30", zone: "CEST", type: "meal",
       title: "早餐 · 酒店", note: "打包或简单用。",
       tags: [], spot: null},
      {time: "07:00", zone: "CEST", type: "transit",
       title: "🚖 前往 FCO 机场", note: "Leonardo Express 或出租；约 45min。",
       tags: ["book"], spot: "fco", transit: 45},
      {time: "08:30", zone: "CEST", type: "activity",
       title: "✈ EY86 罗马 → 阿布扎比", note: "11:35 起飞；约 5h15m。",
       tags: ["flight"], spot: "fco"},
      {time: "11:35", zone: "CEST", type: "flight",
       title: "✈ 起飞", note: "全程 5h15m；机上餐。",
       tags: ["flight"], spot: null}
    ],
    stay: null,
    transitNote: "酒店 → FCO 机场约 45min。"},
  {day: 12, date: "2026-10-06", weekday: "周二", title: "阿布扎比 → 香港 · 回家",
    cityLabel: "阿布扎比 → 香港", cityKey: "auh-hk",
    centerLat: 24.5, centerLng: 54.5, zoom: 5,
    items: [
      {time: "08:30", zone: "GST", type: "flight",
       title: "✈ EY870 阿布扎比 → 香港", note: "约 7h。",
       tags: ["flight"], spot: "hk"},
      {time: "19:30", zone: "HKT", type: "activity",
       title: "🛬 抵达香港", note: "回家！",
       tags: ["info"], spot: "hk"}
    ],
    stay: null,
    transitNote: "全程飞行日。"}
];

// === 地点全集 (经纬度) ===
var LOCATIONS = {
  "milano-malpensa": {lat: 45.6306, lng: 8.7281, kind: "airport", name: "Malpensa"},
  "milan-central": {lat: 45.4863, lng: 9.2050, kind: "train", name: "Milano Centrale"},
  "brixen": {lat: 46.7167, lng: 11.6580, kind: "town", name: "Brixen"},
  "seceda": {lat: 46.6333, lng: 11.6500, kind: "viewpoint", name: "Seceda"},
  "alpe-di-siusi": {lat: 46.5400, lng: 11.6500, kind: "viewpoint", name: "Alpe di Siusi"},
  "lago-carezza": {lat: 46.4186, lng: 11.5789, kind: "lake", name: "Lago di Carezza"},
  "venice-mestre": {lat: 45.4863, lng: 12.2367, kind: "train", name: "Mestre"},
  "venice-rialto": {lat: 45.4340, lng: 12.3380, kind: "town", name: "Venice"},
  "venice-stmarks": {lat: 45.4341, lng: 12.3389, kind: "landmark", name: "San Marco"},
  "venice-ponte": {lat: 45.4314, lng: 12.3289, kind: "bridge", name: "Accademia"},
  "florence-smn": {lat: 43.7764, lng: 11.2486, kind: "train", name: "Firenze SMN"},
  "uffizi": {lat: 43.7678, lng: 11.2553, kind: "museum", name: "Uffizi"},
  "duomo": {lat: 43.7731, lng: 11.2559, kind: "church", name: "Duomo"},
  "accademia": {lat: 43.7769, lng: 11.2589, kind: "museum", name: "Accademia"},
  "ponte-vecchio": {lat: 43.7680, lng: 11.2531, kind: "bridge", name: "Ponte Vecchio"},
  "michelangelo-square": {lat: 43.7629, lng: 11.2650, kind: "viewpoint", name: "Piazzale Michelangelo"},
  "central-market": {lat: 43.7768, lng: 11.2527, kind: "market", name: "Mercato Centrale"},
  "republic-square": {lat: 43.7731, lng: 11.2532, kind: "square", name: "Repubblica"},
  "signoria": {lat: 43.7697, lng: 11.2564, kind: "square", name: "Signoria"},
  "santa-croce": {lat: 43.7707, lng: 11.2625, kind: "church", name: "Santa Croce"},
  "naples-station": {lat: 40.8530, lng: 14.2729, kind: "train", name: "Napoli Centrale"},
  "capri-port": {lat: 40.5554, lng: 14.2397, kind: "port", name: "Marina Grande"},
  "capri-piazzetta": {lat: 40.5509, lng: 14.2400, kind: "town", name: "Piazzetta"},
  "anacapri": {lat: 40.5503, lng: 14.2161, kind: "town", name: "Anacapri"},
  "augustus-garden": {lat: 40.5474, lng: 14.2397, kind: "garden", name: "Augustus Garden"},
  "rome-termini": {lat: 41.9009, lng: 12.5019, kind: "train", name: "Roma Termini"},
  "fco": {lat: 41.8003, lng: 12.2389, kind: "airport", name: "FCO"},
  "vatican-museum": {lat: 41.9065, lng: 12.4536, kind: "museum", name: "Vatican"},
  "st-peter": {lat: 41.9022, lng: 12.4539, kind: "church", name: "St. Peter's"},
  "castel-angelo": {lat: 41.9031, lng: 12.4663, kind: "castle", name: "Castel Sant'Angelo"},
  "navona": {lat: 41.8992, lng: 12.4731, kind: "square", name: "Navona"},
  "trevi": {lat: 41.9009, lng: 12.4833, kind: "fountain", name: "Trevi"},
  "spanish-steps": {lat: 41.9058, lng: 12.4823, kind: "square", name: "Spanish Steps"},
  "pantheon": {lat: 41.8986, lng: 12.4769, kind: "ancient", name: "Pantheon"},
  "medici-villa": {lat: 41.9078, lng: 12.4830, kind: "museum", name: "Villa Medici"},
  "colosseum": {lat: 41.8902, lng: 12.4922, kind: "ancient", name: "Colosseum"},
  "forum": {lat: 41.8925, lng: 12.4853, kind: "ancient", name: "Roman Forum"},
  "palatine": {lat: 41.8893, lng: 12.4875, kind: "ancient", name: "Palatine"},
  "bocca-verita": {lat: 41.8881, lng: 12.4811, kind: "ancient", name: "Bocca Verita"},
  "venezia-palace": {lat: 41.8964, lng: 12.4824, kind: "square", name: "Venezia"},
  "hk": {lat: 22.3080, lng: 113.9185, kind: "airport", name: "HKG"}
};

// === 意大利国境轮廓 (粗略) - 用于程序化地图背景 ===
// 简化版：意大利国境的主要轮廓点（lng, lat）
var ITALY_OUTLINE = [
  [7.0, 44.0], [7.5, 43.7], [7.8, 43.7], [8.0, 43.9], [8.2, 44.1],
  [8.5, 44.4], [8.7, 44.8], [9.0, 45.0], [9.5, 45.5], [10.0, 46.0],
  [10.5, 46.5], [11.0, 46.8], [11.5, 47.0], [12.0, 47.0], [12.5, 46.8],
  [13.0, 46.6], [13.5, 46.5], [13.8, 46.4], [14.0, 46.2], [13.5, 45.8],
  [13.0, 45.5], [12.5, 45.4], [12.3, 45.3], [12.2, 44.8], [12.5, 44.3],
  [13.0, 43.5], [13.7, 42.5], [14.5, 42.0], [15.5, 41.5], [16.2, 41.2],
  [17.0, 41.0], [17.5, 40.8], [18.0, 40.7], [18.5, 40.5], [18.4, 40.0],
  [17.5, 39.8], [17.0, 39.5], [16.5, 39.0], [15.8, 38.9], [15.5, 38.7],
  [15.0, 38.5], [14.5, 38.0], [13.5, 37.8], [12.5, 37.7], [12.0, 37.5],
  [11.5, 37.0], [11.0, 36.7], [10.0, 36.5], [9.5, 36.6], [9.0, 36.9],
  [8.5, 37.5], [8.0, 38.0], [8.3, 38.5], [8.5, 39.0], [8.8, 39.5],
  [9.0, 40.0], [9.4, 40.5], [9.8, 41.0], [10.0, 41.5], [9.5, 42.0],
  [9.0, 42.5], [8.5, 43.0], [8.0, 43.5], [7.5, 43.8], [7.0, 44.0]
];

// 西西里岛轮廓
var SICILY_OUTLINE = [
  [12.0, 38.0], [12.5, 38.0], [13.0, 38.2], [13.5, 38.0], [14.5, 38.0],
  [15.5, 37.8], [15.5, 37.0], [15.0, 36.7], [14.0, 36.7], [13.0, 36.8],
  [12.5, 37.3], [12.0, 38.0]
];

// 撒丁岛轮廓
var SARDINIA_OUTLINE = [
  [8.0, 41.0], [8.5, 41.2], [9.0, 41.5], [9.5, 41.0], [9.7, 40.5],
  [9.5, 39.5], [9.0, 39.0], [8.5, 38.8], [8.0, 39.5], [8.0, 41.0]
];