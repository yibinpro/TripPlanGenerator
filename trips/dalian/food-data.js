// 大连美食数据 - 基于小红书和抖音热门推荐
const restaurantsData = [
    // ===== 海鲜类 (12家) =====
    {
        name: "品海楼（老虎滩店）",
        category: "seafood",
        price: 150,
        address: "中山区滨海东路72号",
        coords: [38.876, 121.682],
        pros: [
            "独栋小洋楼，装修非常有格调",
            "海胆豆腐、三鲜焖子是招牌",
            "晚上7点有驻唱，氛围很好"
        ],
        cons: [
            "周末需要提前预约",
            "价格相对较高"
        ],
        mustTry: ["海胆豆腐", "三鲜焖子", "石锅鲍鱼"],
        source: "xiaohongshu"
    },
    {
        name: "喜鼎海胆水饺（东港店）",
        category: "seafood",
        price: 150,
        address: "中山区港浦路94号",
        coords: [38.924, 121.671],
        pros: [
            "原汁海胆水饺，鲜美爆浆",
            "靠窗位置可以看海景",
            "奇妙虾球必点"
        ],
        cons: [
            "必须提前1天预约窗边位",
            "高峰期等位时间长"
        ],
        mustTry: ["原汁海胆水饺", "奇妙虾球"],
        source: "xiaohongshu"
    },
    {
        name: "海味当家·蒸锅海鲜（东港店）",
        category: "seafood",
        price: 120,
        address: "中山区东港商务区",
        coords: [38.925, 121.672],
        pros: [
            "明档活鲜，蒸汽锅保留原汁原味",
            "锅底粥超级好喝",
            "性价比高，人均120吃到撑"
        ],
        cons: [
            "部分海鲜需要时价确认"
        ],
        mustTry: ["海鲜蒸汽锅", "锅底粥"],
        source: "douyin"
    },
    {
        name: "正黄旗海鲜烧烤（八一路店）",
        category: "seafood",
        price: 90,
        address: "西岗区八一路",
        coords: [38.910, 121.620],
        pros: [
            "烤鲍鱼、烤海肠是招牌",
            "大连本地烧烤氛围浓厚",
            "海鲜新鲜不踩雷"
        ],
        cons: [
            "环境是大排档风格",
            "烤海肠要选厚皮款"
        ],
        mustTry: ["烤鲍鱼", "烤海肠", "铁板杂瓣鱼"],
        source: "xiaohongshu"
    },
    {
        name: "旅大印象·大连名菜馆（星海店）",
        category: "seafood",
        price: 130,
        address: "沙河口区星海广场附近",
        coords: [38.882, 121.585],
        pros: [
            "石锅海胆豆腐是特色",
            "环境复古有大连老记忆",
            "适合家庭聚餐"
        ],
        cons: [
            "部分菜品偏咸"
        ],
        mustTry: ["石锅海胆豆腐", "虾爬子"],
        source: "xiaohongshu"
    },
    {
        name: "鼎香缘海鲜自助",
        category: "seafood",
        price: 150,
        address: "中山区友好广场附近",
        coords: [38.925, 121.640],
        pros: [
            "自助形式，海鲜品种丰富",
            "环境适合拍照打卡",
            "人均150元吃到撑"
        ],
        cons: [
            "高峰期限时2小时"
        ],
        mustTry: ["生蚝", "基围虾", "扇贝"],
        source: "douyin"
    },
    {
        name: "渔人码头·海遇咖啡",
        category: "seafood",
        price: 80,
        address: "中山区渔人码头",
        coords: [38.875, 121.685],
        pros: [
            "面朝大海的咖啡厅",
            "简餐+咖啡combo",
            "拍照出片率100%"
        ],
        cons: [
            "座位不多需要等位"
        ],
        mustTry: ["海鲜意面", "大连字样咖啡"],
        source: "xiaohongshu"
    },
    {
        name: "老船长海鲜店",
        category: "seafood",
        price: 110,
        address: "中山区二七广场",
        coords: [38.920, 121.635],
        pros: [
            "本地人常去的老店",
            "虾爬子、海螺特别新鲜",
            "价格实惠"
        ],
        cons: [
            "装修比较普通"
        ],
        mustTry: ["虾爬子", "海螺"],
        source: "douyin"
    },
    {
        name: "渔家傲海鲜楼",
        category: "seafood",
        price: 95,
        address: "沙河口区马栏广场",
        coords: [38.895, 121.600],
        pros: [
            "海鲜很新鲜，明码标价",
            "清蒸做法保留原味",
            "适合团体聚餐"
        ],
        cons: [
            "停车不太方便"
        ],
        mustTry: ["清蒸海鱼", "香辣花蛤"],
        source: "xiaohongshu"
    },
    {
        name: "海之韵渔村",
        category: "seafood",
        price: 105,
        address: "中山区海之韵路",
        coords: [38.930, 121.680],
        pros: [
            "海景餐厅view很好",
            "海胆刺身超级棒",
            "服务态度好"
        ],
        cons: [
            "需要打车前往"
        ],
        mustTry: ["海胆刺身", "烤扇贝"],
        source: "xiaohongshu"
    },
    {
        name: "小渔村海鲜大排档",
        category: "seafood",
        price: 75,
        address: "西岗区新开路",
        coords: [38.915, 121.615],
        pros: [
            "性价比超高",
            "烧烤style海鲜很香",
            "烟火气十足"
        ],
        cons: [
            "环境比较嘈杂"
        ],
        mustTry: ["烤生蚝", "辣炒蛏子"],
        source: "douyin"
    },
    {
        name: "渔港码头海鲜",
        category: "seafood",
        price: 140,
        address: "沙河口区黑石礁",
        coords: [38.870, 121.575],
        pros: [
            "靠近黑石礁景区",
            "海鲜都是早上现捕的",
            "粤式做法很精致"
        ],
        cons: [
            "位置稍远"
        ],
        mustTry: ["清蒸石斑鱼", "避风塘虾"],
        source: "xiaohongshu"
    },

    // ===== 日料类 (6家) =====
    {
        name: "助屋（宏孚店）",
        category: "japanese",
        price: 100,
        address: "中山区青泥洼桥商圈",
        coords: [38.916, 121.636],
        pros: [
            "评价超高的日式料理",
            "刺身新鲜厚切",
            "适合轻松告别午餐"
        ],
        cons: [
            "热门时段需要等位"
        ],
        mustTry: ["三文鱼刺身", "鳗鱼饭"],
        source: "xiaohongshu"
    },
    {
        name: "禾绿回转寿司（罗斯福店）",
        category: "japanese",
        price: 80,
        address: "沙河口区西安路罗斯福",
        coords: [38.905, 121.610],
        pros: [
            "回转寿司性价比高",
            "种类丰富，适合尝试",
            "环境干净整洁"
        ],
        cons: [
            "高峰期寿司更新慢"
        ],
        mustTry: ["三文鱼寿司", "天妇罗"],
        source: "douyin"
    },
    {
        name: "味藏日式料理",
        category: "japanese",
        price: 120,
        address: "中山区友好广场",
        coords: [38.922, 121.641],
        pros: [
            "主厨是日本人，非常正宗",
            "刺身拼盘超值",
            "清酒选择丰富"
        ],
        cons: [
            "价格偏高"
        ],
        mustTry: ["刺身拼盘", "握寿司套餐"],
        source: "xiaohongshu"
    },
    {
        name: "蟹之屋日式料理",
        category: "japanese",
        price: 150,
        address: "中山区东港",
        coords: [38.923, 121.669],
        pros: [
            "主打帝王蟹料理",
            "环境高级有氛围",
            "适合商务宴请"
        ],
        cons: [
            "人均较贵",
            "需要提前预约"
        ],
        mustTry: ["帝王蟹", "海鲜火锅"],
        source: "xiaohongshu"
    },
    {
        name: "鮨一日本料理",
        category: "japanese",
        price: 180,
        address: "中山区人民路",
        coords: [38.918, 121.638],
        pros: [
            "Omakase套餐精致",
            "食材都是空运的",
            "体验感很好"
        ],
        cons: [
            "价格高端",
            "必须预约"
        ],
        mustTry: ["Omakase套餐", "蓝鳍金枪鱼"],
        source: "xiaohongshu"
    },
    {
        name: "松屋日本料理",
        category: "japanese",
        price: 95,
        address: "沙河口区星海广场",
        coords: [38.880, 121.583],
        pros: [
            "日式定食很实惠",
            "味道地道",
            "环境安静"
        ],
        cons: [
            "店面不大容易满座"
        ],
        mustTry: ["猪排定食", "照烧鸡腿饭"],
        source: "douyin"
    },
    {
        name: "秋川・sakaba・焼鳥",
        category: "japanese",
        price: 115,
        address: "中山区中山路",
        coords: [38.920, 121.637],
        pros: [
            "高性价比网红店",
            "海胆生鱼饭超级好吃",
            "烧鸟串烧很正宗"
        ],
        cons: [
            "热门时段需要等位"
        ],
        mustTry: ["海胆生鱼饭", "烧鸟串烧"],
        source: "doubao"
    },
    {
        name: "浅草・鱼蔵日本料理",
        category: "japanese",
        price: 130,
        address: "中山区七七街",
        coords: [38.912, 121.648],
        pros: [
            "摆盘精致适合拍照",
            "炭烤活鳗外脆内嫩",
            "三文鱼创新菜很有特色"
        ],
        cons: [
            "位置在七七街，需要步行"
        ],
        mustTry: ["炭烤活鳗", "三文鱼创意卷"],
        source: "doubao"
    },
    {
        name: "壽司樂 Sushi Luck",
        category: "japanese",
        price: 140,
        address: "中山区延安路",
        coords: [38.924, 121.642],
        pros: [
            "口碑好，本地人推荐",
            "寿司新鲜品质稳定",
            "创意卷很有惊喜"
        ],
        cons: [
            "价格偏中高"
        ],
        mustTry: ["招牌寿司拼盘", "创意卷"],
        source: "doubao"
    },
    {
        name: "SUGIKI 杉木日本料理",
        category: "japanese",
        price: 430,
        address: "中山区人民路",
        coords: [38.917, 121.639],
        pros: [
            "高端正宗日料",
            "活烤鳗鱼饭是招牌",
            "海鲜饭用料十足"
        ],
        cons: [
            "价格较高，人均400+",
            "建议提前预约"
        ],
        mustTry: ["活烤鳗鱼饭", "海鲜饭"],
        source: "doubao"
    },
    {
        name: "贵善臻选日料",
        category: "japanese",
        price: 160,
        address: "中山区友好广场",
        coords: [38.921, 121.640],
        pros: [
            "官方活动严选品牌",
            "品质有保证",
            "环境优雅"
        ],
        cons: [
            "价格中等偏上"
        ],
        mustTry: ["刺身拼盘", "寿司套餐"],
        source: "doubao"
    },
    {
        name: "深夜食堂·裕子居酒屋",
        category: "japanese",
        price: 110,
        address: "甘井子区机场附近",
        coords: [38.965, 121.540],
        pros: [
            "营业至晚上23点",
            "三文鱼刺身新鲜",
            "LA牛排也很棒"
        ],
        cons: [
            "位置靠近机场，市区较远"
        ],
        mustTry: ["三文鱼刺身", "LA牛排"],
        source: "doubao"
    },

    // ===== 东北菜类 (7家) =====
    {
        name: "喜家德水饺（星海店）",
        category: "dongbei",
        price: 60,
        address: "沙河口区星海广场",
        coords: [38.882, 121.584],
        pros: [
            "虾仁水饺绝不踩雷",
            "大连本地连锁品牌",
            "性价比超高"
        ],
        cons: [
            "高峰期需要排队"
        ],
        mustTry: ["虾仁水饺", "海肠水饺"],
        source: "xiaohongshu"
    },
    {
        name: "日丰园海肠水饺",
        category: "dongbei",
        price: 70,
        address: "甘井子区",
        coords: [38.940, 121.555],
        pros: [
            "《舌尖上的中国》推荐",
            "海肠水饺独一份",
            "味道非常正宗"
        ],
        cons: [
            "位置比较远",
            "需要提前电话预订"
        ],
        mustTry: ["海肠水饺"],
        source: "xiaohongshu"
    },
    {
        name: "老街东北菜馆",
        category: "dongbei",
        price: 85,
        address: "中山区二七街",
        coords: [38.918, 121.632],
        pros: [
            "锅包肉酸甜适中",
            "小鸡炖蘑菇料足",
            "菜量很大"
        ],
        cons: [
            "装修比较老旧"
        ],
        mustTry: ["锅包肉", "小鸡炖蘑菇"],
        source: "douyin"
    },
    {
        name: "张小厨东北菜",
        category: "dongbei",
        price: 75,
        address: "西岗区新开路",
        coords: [38.913, 121.617],
        pros: [
            "铁锅炖鱼很香",
            "地三鲜很下饭",
            "性价比高"
        ],
        cons: [
            "环境一般"
        ],
        mustTry: ["铁锅炖鱼", "地三鲜"],
        source: "douyin"
    },
    {
        name: "东北人家",
        category: "dongbei",
        price: 80,
        address: "沙河口区西安路",
        coords: [38.906, 121.611],
        pros: [
            "大份量实惠",
            "酸菜白肉很正宗",
            "适合多人聚餐"
        ],
        cons: [
            "高峰期上菜慢"
        ],
        mustTry: ["酸菜白肉", "杀猪菜"],
        source: "douyin"
    },
    {
        name: "不二心包子",
        category: "dongbei",
        price: 35,
        address: "中山区南山风情街",
        coords: [38.915, 121.645],
        pros: [
            "包子现做现蒸",
            "早餐必去",
            "价格便宜味道好"
        ],
        cons: [
            "只有早市到中午"
        ],
        mustTry: ["鲜肉包子", "豆浆"],
        source: "xiaohongshu"
    },
    {
        name: "老边饺子（中山店）",
        category: "dongbei",
        price: 65,
        address: "中山区天津街",
        coords: [38.920, 121.640],
        pros: [
            "老字号品质保证",
            "冰花煎饺是特色",
            "品种丰富"
        ],
        cons: [
            "价格略高于普通水饺馆"
        ],
        mustTry: ["冰花煎饺", "三鲜水饺"],
        source: "xiaohongshu"
    },

    // ===== 咖啡厅类 (8家) =====
    {
        name: "胡萝卜咖啡 CARROT COFFEE",
        category: "cafe",
        price: 45,
        address: "中山区南山路169号",
        coords: [38.915, 121.645],
        pros: [
            "白色工业风超出片",
            "明星同款网红咖啡",
            "卡梅罗拿铁必点"
        ],
        cons: [
            "周末人多需要等位"
        ],
        mustTry: ["卡梅罗拿铁", "燕麦拿铁"],
        source: "xiaohongshu"
    },
    {
        name: "C27空间",
        category: "cafe",
        price: 30,
        address: "中山区海之韵路115号3层",
        coords: [38.930, 121.680],
        pros: [
            "落地窗看东港天际线",
            "下午4点光线最佳",
            "性价比超高"
        ],
        cons: [
            "位置较高需要爬楼"
        ],
        mustTry: ["美式咖啡", "桂花拿铁"],
        source: "xiaohongshu"
    },
    {
        name: "飞向海边（半山书咖）",
        category: "cafe",
        price: 50,
        address: "西岗区滨海西路137号",
        coords: [38.880, 121.590],
        pros: [
            "阳台躺椅看跨海大桥",
            "海景view绝佳",
            "手冲咖啡专业"
        ],
        cons: [
            "位置稍偏需要打车"
        ],
        mustTry: ["手冲咖啡", "桂花酒酿拿铁"],
        source: "xiaohongshu"
    },
    {
        name: "海遇 MANGATA COFFEE",
        category: "cafe",
        price: 55,
        address: "沙河口区星海湾",
        coords: [38.870, 121.590],
        pros: [
            "360°全透明玻璃房",
            "一楼玻璃地板悬浮感",
            "像踩在海面上"
        ],
        cons: [
            "热门时段人很多"
        ],
        mustTry: ["特调咖啡", "海景拿铁"],
        source: "xiaohongshu"
    },
    {
        name: "83℃ COFFEE",
        category: "cafe",
        price: 40,
        address: "中山区东港",
        coords: [38.922, 121.667],
        pros: [
            "大连最独特新奇咖啡馆",
            "文艺氛围浓厚",
            "适合拍照打卡"
        ],
        cons: [
            "座位不多"
        ],
        mustTry: ["手冲单品", "创意特调"],
        source: "xiaohongshu"
    },
    {
        name: "667coffee",
        category: "cafe",
        price: 48,
        address: "中山区东港",
        coords: [38.923, 121.668],
        pros: [
            "绝美海景窗景",
            "东港文艺咖啡代表",
            "环境安静适合办公"
        ],
        cons: [
            "15寸笔记本可能偏小"
        ],
        mustTry: ["澳白", "手冲咖啡"],
        source: "xiaohongshu"
    },
    {
        name: "A1kk·coffee",
        category: "cafe",
        price: 42,
        address: "中山区东港威尼斯水城",
        coords: [38.923, 121.668],
        pros: [
            "窗边可看贡多拉游船",
            "焦糖美罗拿铁必点",
            "巴斯克蛋糕很棒"
        ],
        cons: [
            "晚上人会比较多"
        ],
        mustTry: ["焦糖美罗拿铁", "巴斯克蛋糕"],
        source: "xiaohongshu"
    },
    {
        name: "caanbyour",
        category: "cafe",
        price: 60,
        address: "中山区滨海东路200号（琥珀湾）",
        coords: [38.870, 121.660],
        pros: [
            "沙滩+落地窗夕阳绝美",
            "被称为'小镰仓'",
            "海盐焦糖蛋糕超好吃"
        ],
        cons: [
            "价格稍高"
        ],
        mustTry: ["澳白", "海盐焦糖蛋糕"],
        source: "xiaohongshu"
    }
];
