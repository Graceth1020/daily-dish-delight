export type MarketPrice = {
  name: string;
  category: "蔬菜" | "肉禽" | "水产" | "蛋奶" | "豆制品" | "水果";
  unit: string;
  price: number; // 元
  trend: "up" | "down" | "flat";
};

export const MARKET_DATE = "2025-04-21";

export const MARKET_PRICES: MarketPrice[] = [
  { name: "番茄", category: "蔬菜", unit: "斤", price: 3.5, trend: "down" },
  { name: "黄瓜", category: "蔬菜", unit: "斤", price: 2.8, trend: "flat" },
  { name: "土豆", category: "蔬菜", unit: "斤", price: 1.9, trend: "down" },
  { name: "白萝卜", category: "蔬菜", unit: "斤", price: 1.2, trend: "flat" },
  { name: "小油菜", category: "蔬菜", unit: "斤", price: 2.5, trend: "up" },
  { name: "青椒", category: "蔬菜", unit: "斤", price: 4.2, trend: "up" },
  { name: "茄子", category: "蔬菜", unit: "斤", price: 3.0, trend: "flat" },
  { name: "大蒜", category: "蔬菜", unit: "斤", price: 6.5, trend: "up" },

  { name: "猪五花", category: "肉禽", unit: "斤", price: 18.5, trend: "down" },
  { name: "猪里脊", category: "肉禽", unit: "斤", price: 22.0, trend: "flat" },
  { name: "牛腱子", category: "肉禽", unit: "斤", price: 42.0, trend: "up" },
  { name: "鸡胸肉", category: "肉禽", unit: "斤", price: 12.8, trend: "down" },
  { name: "整鸡", category: "肉禽", unit: "只", price: 28.0, trend: "flat" },

  { name: "鲈鱼", category: "水产", unit: "斤", price: 26.0, trend: "flat" },
  { name: "草鱼", category: "水产", unit: "斤", price: 9.5, trend: "down" },
  { name: "基围虾", category: "水产", unit: "斤", price: 38.0, trend: "up" },
  { name: "蛤蜊", category: "水产", unit: "斤", price: 8.5, trend: "flat" },

  { name: "鸡蛋", category: "蛋奶", unit: "斤", price: 5.2, trend: "down" },
  { name: "鸭蛋", category: "蛋奶", unit: "斤", price: 7.8, trend: "flat" },
  { name: "鲜牛奶", category: "蛋奶", unit: "升", price: 12.0, trend: "flat" },

  { name: "嫩豆腐", category: "豆制品", unit: "盒", price: 3.0, trend: "flat" },
  { name: "豆腐皮", category: "豆制品", unit: "斤", price: 7.5, trend: "up" },

  { name: "苹果", category: "水果", unit: "斤", price: 5.8, trend: "down" },
  { name: "香蕉", category: "水果", unit: "斤", price: 3.5, trend: "flat" },
  { name: "草莓", category: "水果", unit: "斤", price: 16.0, trend: "down" },
];

export type PickingTip = {
  ingredient: string;
  emoji: string;
  category: "蔬菜" | "肉禽" | "水产" | "水果" | "蛋奶";
  tips: string[];
  avoid?: string;
};

export const PICKING_TIPS: PickingTip[] = [
  {
    ingredient: "洋葱",
    emoji: "🧅",
    category: "蔬菜",
    tips: [
      "挑紫皮洋葱辛辣味更浓，适合炒菜下饭。",
      "黄皮洋葱较甜，适合做汤、炖肉、生吃沙拉。",
      "选表皮干燥、紧实有重量感的，按压不软陷。",
    ],
    avoid: "顶部已发芽或根部发黑发霉的不要买。",
  },
  {
    ingredient: "鱼",
    emoji: "🐟",
    category: "水产",
    tips: [
      "活鱼要选在水中层游动的，太活跃可能受惊，趴底的不健康。",
      "鱼鳃鲜红、鱼眼凸起清亮、鱼鳞完整有光泽。",
      "按压鱼身能迅速回弹，说明肉质紧实。",
    ],
    avoid: "鱼眼浑浊塌陷、鱼鳃发白或发黑、有酸臭味的不要。",
  },
  {
    ingredient: "番茄",
    emoji: "🍅",
    category: "蔬菜",
    tips: [
      "炒菜选硬一点带点青的，沙瓤拌糖选软糯熟透的。",
      "蒂部周围有放射状白色花纹的更沙更甜。",
      "颜色均匀、无裂痕、有自然番茄香气。",
    ],
    avoid: "颜色太均匀粉红、表皮过亮、催熟的不要。",
  },
  {
    ingredient: "猪肉",
    emoji: "🐖",
    category: "肉禽",
    tips: [
      "新鲜猪肉呈淡红色或粉红色，脂肪洁白。",
      "用手按压有弹性，能迅速恢复原状。",
      "闻起来无异味，表面微干不黏手。",
    ],
    avoid: "颜色暗红发紫、有黏液、有酸臭味的别买。",
  },
  {
    ingredient: "鸡蛋",
    emoji: "🥚",
    category: "蛋奶",
    tips: [
      "蛋壳粗糙有麻点的更新鲜，光滑的偏旧。",
      "对着光看蛋黄轮廓清晰、气室小说明新鲜。",
      "放入清水中沉底为新鲜，立起或浮起则不新鲜。",
    ],
  },
  {
    ingredient: "西瓜",
    emoji: "🍉",
    category: "水果",
    tips: [
      "瓜蒂卷曲发青、瓜脐内凹明显、瓜底圈小的甜。",
      "拍打声音"咚咚"清脆有回弹的成熟度刚好。",
      "纹路深、色差大、对比鲜明的瓜更甜。",
    ],
    avoid: '"砰砰"闷响是过熟，"嗒嗒"清脆是不熟。',
  },
  {
    ingredient: "土豆",
    emoji: "🥔",
    category: "蔬菜",
    tips: [
      "选表皮光滑、形状规整、手感沉实的。",
      "黄心土豆淀粉多适合炖煮，白心脆爽适合丝炒。",
      "存放阴凉干燥处，避免与洋葱放一起。",
    ],
    avoid: "发青、发芽的土豆含龙葵素，绝对不要食用。",
  },
  {
    ingredient: "虾",
    emoji: "🦐",
    category: "水产",
    tips: [
      "鲜活虾通体透明、虾须完整、虾头紧贴身体。",
      "冷冻虾选虾身挺直、虾壳有光泽、肉色清亮的。",
      "虾线呈深色细丝，烹饪前去除口感更好。",
    ],
    avoid: "虾头发黑、虾身发软弯曲、有氨水味的不要。",
  },
  {
    ingredient: "豆腐",
    emoji: "🥡",
    category: "蔬菜",
    tips: [
      "嫩豆腐适合做汤、麻婆豆腐；老豆腐适合煎、炖。",
      "新鲜豆腐颜色微黄白，气味清香带豆味。",
      "购买后泡入淡盐水冷藏，可保存 2-3 天。",
    ],
    avoid: "发酸、表面发黏、颜色异常发灰的别吃。",
  },
];
