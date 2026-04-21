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

import { parseFrontmatter } from "@/lib/frontmatter";

export type PickingTip = {
  ingredient: string;
  emoji: string;
  category: "蔬菜" | "肉禽" | "水产" | "水果" | "蛋奶";
  /** 正文 markdown（含挑选要点、避雷等章节） */
  content: string;
};

const tipModules = import.meta.glob("../content/tips/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export const PICKING_TIPS: PickingTip[] = Object.values(tipModules).map((raw) => {
  const { data, content } = parseFrontmatter(raw);
  return {
    ingredient: data.ingredient,
    emoji: data.emoji,
    category: data.category,
    content: content.trim(),
  };
});

