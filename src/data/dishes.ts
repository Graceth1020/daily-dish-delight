import tomatoEgg from "@/assets/dish-tomato-egg.jpg";
import hongshaorou from "@/assets/dish-hongshaorou.jpg";
import kungpao from "@/assets/dish-kungpao.jpg";
import mapotofu from "@/assets/dish-mapotofu.jpg";
import steamedfish from "@/assets/dish-steamedfish.jpg";
import bokchoy from "@/assets/dish-bokchoy.jpg";
import noodles from "@/assets/dish-noodles.jpg";
import xiaolongbao from "@/assets/dish-xiaolongbao.jpg";

export type Dish = {
  slug: string;
  title: string;
  cover: string;
  excerpt: string;
  category: "家常" | "川菜" | "粤菜" | "面点" | "素食" | "汤";
  difficulty: "简单" | "中等" | "进阶";
  price: string;          // 预计成本
  time: string;           // 耗时
  calories: string;       // 热量
  nutrition: string[];    // 营养
  efficacy: string[];     // 功效
  taboos: string[];       // 禁忌
  ingredients: { name: string; amount: string }[];
  seasonings: { name: string; amount: string }[];
  steps: string[];
  tips?: string;
};

export const DISHES: Dish[] = [
  {
    slug: "tomato-egg",
    title: "番茄炒蛋",
    cover: tomatoEgg,
    excerpt: "国民下饭菜，酸甜开胃，10 分钟搞定一道家的味道。",
    category: "家常",
    difficulty: "简单",
    price: "¥6",
    time: "10 分钟",
    calories: "约 220 千卡 / 份",
    nutrition: ["蛋白质 12g", "维生素 C", "番茄红素", "钙"],
    efficacy: ["开胃健脾", "美容养颜", "保护心血管"],
    taboos: ["空腹不宜多食番茄", "服用四环素期间慎食"],
    ingredients: [
      { name: "番茄", amount: "2 个 (约 300g)" },
      { name: "鸡蛋", amount: "3 个" },
      { name: "葱花", amount: "适量" },
    ],
    seasonings: [
      { name: "盐", amount: "3g" },
      { name: "糖", amount: "5g" },
      { name: "生抽", amount: "5ml" },
      { name: "食用油", amount: "15ml" },
    ],
    steps: [
      "番茄顶部划十字，热水烫去皮，切块备用。",
      "鸡蛋打散加少许盐，热油下锅炒至金黄盛出。",
      "锅中留底油，下番茄翻炒出汁，加糖与生抽。",
      "倒入炒好的鸡蛋翻炒均匀，撒葱花出锅。",
    ],
    tips: "想要更多汤汁拌饭，可加 30ml 清水焖煮 1 分钟。",
  },
  {
    slug: "hong-shao-rou",
    title: "红烧肉",
    cover: hongshaorou,
    excerpt: "肥而不腻、入口即化的经典本帮味道。",
    category: "家常",
    difficulty: "中等",
    price: "¥35",
    time: "90 分钟",
    calories: "约 480 千卡 / 份",
    nutrition: ["蛋白质 22g", "胶原蛋白", "B 族维生素"],
    efficacy: ["补充能量", "滋润肌肤"],
    taboos: ["三高人群少食", "胆囊炎患者不宜"],
    ingredients: [
      { name: "五花肉", amount: "500g" },
      { name: "姜", amount: "3 片" },
      { name: "葱段", amount: "2 段" },
      { name: "八角", amount: "2 颗" },
    ],
    seasonings: [
      { name: "冰糖", amount: "30g" },
      { name: "生抽", amount: "20ml" },
      { name: "老抽", amount: "10ml" },
      { name: "料酒", amount: "20ml" },
    ],
    steps: [
      "五花肉冷水下锅焯水，去除血沫切麻将块。",
      "锅中放冰糖小火炒糖色，至琥珀色下肉块翻炒。",
      "加入姜葱八角，淋入料酒、生抽、老抽炒匀。",
      "倒入开水没过肉块，小火慢炖 60 分钟。",
      "大火收汁至浓稠红亮即可。",
    ],
    tips: "炒糖色用小火，糖变琥珀色立刻下肉，否则会发苦。",
  },
  {
    slug: "kung-pao-chicken",
    title: "宫保鸡丁",
    cover: kungpao,
    excerpt: "焦香花生 × 滑嫩鸡丁，麻辣鲜香一口入魂。",
    category: "川菜",
    difficulty: "中等",
    price: "¥22",
    time: "25 分钟",
    calories: "约 360 千卡 / 份",
    nutrition: ["蛋白质 28g", "不饱和脂肪", "维生素 E"],
    efficacy: ["补充蛋白", "提振食欲"],
    taboos: ["花生过敏者禁食", "肠胃虚弱者少辣"],
    ingredients: [
      { name: "鸡胸肉", amount: "300g" },
      { name: "花生米", amount: "60g" },
      { name: "干辣椒", amount: "10g" },
      { name: "葱白", amount: "3 段" },
    ],
    seasonings: [
      { name: "花椒", amount: "3g" },
      { name: "生抽", amount: "10ml" },
      { name: "陈醋", amount: "10ml" },
      { name: "糖", amount: "8g" },
      { name: "淀粉", amount: "10g" },
    ],
    steps: [
      "鸡胸切丁加料酒、生抽、淀粉抓匀腌 10 分钟。",
      "调宫保汁：生抽、陈醋、糖、淀粉、清水拌匀。",
      "热油爆香花椒、干辣椒，下鸡丁滑炒变色。",
      "加葱白与花生翻炒，淋入宫保汁炒至浓稠出锅。",
    ],
  },
  {
    slug: "mapo-tofu",
    title: "麻婆豆腐",
    cover: mapotofu,
    excerpt: "麻、辣、烫、香、酥、嫩、鲜、活，川菜八字真经。",
    category: "川菜",
    difficulty: "简单",
    price: "¥12",
    time: "20 分钟",
    calories: "约 260 千卡 / 份",
    nutrition: ["植物蛋白", "钙", "异黄酮"],
    efficacy: ["驱寒祛湿", "补钙健骨"],
    taboos: ["痛风发作期慎食", "胃溃疡少辣"],
    ingredients: [
      { name: "嫩豆腐", amount: "1 盒 (400g)" },
      { name: "牛肉末", amount: "100g" },
      { name: "蒜末", amount: "10g" },
      { name: "蒜苗", amount: "2 根" },
    ],
    seasonings: [
      { name: "郫县豆瓣酱", amount: "20g" },
      { name: "花椒粉", amount: "3g" },
      { name: "生抽", amount: "10ml" },
      { name: "淀粉水", amount: "适量" },
    ],
    steps: [
      "豆腐切块，加盐水浸泡 5 分钟去豆腥。",
      "热油下牛肉末炒散，加豆瓣酱炒出红油。",
      "加蒜末、生抽、清水煮开，下豆腐小火烧 5 分钟。",
      "分两次淋入水淀粉勾芡，撒花椒粉与蒜苗出锅。",
    ],
  },
  {
    slug: "steamed-fish",
    title: "清蒸鲈鱼",
    cover: steamedfish,
    excerpt: "鲜嫩到舌尖发抖，宴客必备的高级感家常菜。",
    category: "粤菜",
    difficulty: "简单",
    price: "¥45",
    time: "20 分钟",
    calories: "约 180 千卡 / 份",
    nutrition: ["优质蛋白", "DHA", "硒", "维生素 D"],
    efficacy: ["健脑益智", "利水消肿", "产后调养"],
    taboos: ["痛风患者少食", "海鲜过敏者禁食"],
    ingredients: [
      { name: "鲈鱼", amount: "1 条 (约 600g)" },
      { name: "姜丝", amount: "20g" },
      { name: "葱丝", amount: "20g" },
      { name: "红椒丝", amount: "少许" },
    ],
    seasonings: [
      { name: "蒸鱼豉油", amount: "30ml" },
      { name: "料酒", amount: "10ml" },
      { name: "热油", amount: "20ml" },
    ],
    steps: [
      "鲈鱼处理干净，两面划刀，抹料酒去腥。",
      "鱼身铺姜片，水开后大火蒸 8 分钟。",
      "倒掉盘中腥水，铺葱姜丝与红椒丝。",
      "淋蒸鱼豉油，浇上热油激发香气即可。",
    ],
    tips: "鱼眼凸起、鱼鳃鲜红为新鲜标志。",
  },
  {
    slug: "garlic-bok-choy",
    title: "蒜蓉小油菜",
    cover: bokchoy,
    excerpt: "5 分钟出锅的翠绿系健康菜，解腻必备。",
    category: "素食",
    difficulty: "简单",
    price: "¥4",
    time: "5 分钟",
    calories: "约 80 千卡 / 份",
    nutrition: ["膳食纤维", "维生素 K", "叶酸", "钙"],
    efficacy: ["清热润肠", "降脂减重"],
    taboos: ["脾胃虚寒者不宜多食"],
    ingredients: [
      { name: "小油菜", amount: "300g" },
      { name: "蒜末", amount: "15g" },
    ],
    seasonings: [
      { name: "盐", amount: "2g" },
      { name: "蚝油", amount: "5ml" },
      { name: "食用油", amount: "10ml" },
    ],
    steps: [
      "小油菜洗净，水开加盐与油焯 30 秒过凉。",
      "锅中热油爆香蒜末，下油菜大火快炒。",
      "加少许蚝油翻匀，10 秒立刻出锅。",
    ],
  },
  {
    slug: "beef-noodles",
    title: "清汤牛肉面",
    cover: noodles,
    excerpt: "一碗热汤面，治愈所有的疲惫与坏天气。",
    category: "面点",
    difficulty: "中等",
    price: "¥18",
    time: "120 分钟",
    calories: "约 520 千卡 / 份",
    nutrition: ["蛋白质 30g", "碳水化合物", "铁"],
    efficacy: ["温补气血", "暖胃驱寒"],
    taboos: ["高血压少喝汤"],
    ingredients: [
      { name: "牛腱子", amount: "500g" },
      { name: "拉面", amount: "200g" },
      { name: "青菜", amount: "适量" },
      { name: "葱姜", amount: "适量" },
    ],
    seasonings: [
      { name: "八角桂皮", amount: "适量" },
      { name: "生抽", amount: "20ml" },
      { name: "盐", amount: "5g" },
    ],
    steps: [
      "牛腱冷水焯去血沫，洗净备用。",
      "加葱姜与香料，小火炖 90 分钟至软烂，捞出切片。",
      "另起锅煮面与青菜，捞入碗中。",
      "舀入牛肉与原汤，铺上肉片即可。",
    ],
  },
  {
    slug: "xiao-long-bao",
    title: "小笼包",
    cover: xiaolongbao,
    excerpt: "皮薄汁多，一口爆汁的江南灵魂面点。",
    category: "面点",
    difficulty: "进阶",
    price: "¥28",
    time: "150 分钟",
    calories: "约 380 千卡 / 份",
    nutrition: ["蛋白质", "碳水化合物", "胶原蛋白"],
    efficacy: ["补充体力", "暖胃"],
    taboos: ["糖尿病者控制食用量"],
    ingredients: [
      { name: "猪皮冻", amount: "200g" },
      { name: "猪前腿肉", amount: "300g" },
      { name: "中筋面粉", amount: "300g" },
      { name: "姜末", amount: "5g" },
    ],
    seasonings: [
      { name: "生抽", amount: "15ml" },
      { name: "糖", amount: "5g" },
      { name: "盐", amount: "3g" },
      { name: "白胡椒", amount: "1g" },
    ],
    steps: [
      "肉末加调料顺时针搅打上劲，拌入切碎的皮冻冷藏。",
      "面粉加温水揉成光滑面团，醒 30 分钟。",
      "下剂子擀皮，包入肉馅捏 18 个褶。",
      "上笼大火蒸 8 分钟即可。",
    ],
    tips: "皮冻是爆汁关键，需提前一天熬制冷藏。",
  },
];
