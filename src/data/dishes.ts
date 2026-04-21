import { parseFrontmatter } from "@/lib/frontmatter";

// 导入图片资源（保持 Vite 打包优化）
import tomatoEgg from "@/assets/dish-tomato-egg.jpg";
import hongshaorou from "@/assets/dish-hongshaorou.jpg";
import kungpao from "@/assets/dish-kungpao.jpg";
import mapotofu from "@/assets/dish-mapotofu.jpg";
import steamedfish from "@/assets/dish-steamedfish.jpg";
import bokchoy from "@/assets/dish-bokchoy.jpg";
import noodles from "@/assets/dish-noodles.jpg";
import xiaolongbao from "@/assets/dish-xiaolongbao.jpg";
import hongshaorou from "@/assets/dish-hongshaorou.jpg";
import kungpao from "@/assets/dish-kungpao.jpg";
import mapotofu from "@/assets/dish-mapotofu.jpg";
import steamedfish from "@/assets/dish-steamedfish.jpg";
import bokchoy from "@/assets/dish-bokchoy.jpg";
import noodles from "@/assets/dish-noodles.jpg";
import xiaolongbao from "@/assets/dish-xiaolongbao.jpg";

const IMAGE_MAP: Record<string, string> = {
  "dish-tomato-egg.jpg": tomatoEgg,
  "dish-hongshaorou.jpg": hongshaorou,
  "dish-kungpao.jpg": kungpao,
  "dish-mapotofu.jpg": mapotofu,
  "dish-steamedfish.jpg": steamedfish,
  "dish-bokchoy.jpg": bokchoy,
  "dish-noodles.jpg": noodles,
  "dish-xiaolongbao.jpg": xiaolongbao,
};

export type Dish = {
  slug: string;
  title: string;
  cover: string;
  excerpt: string;
  category: "家常" | "川菜" | "粤菜" | "面点" | "素食" | "汤";
  difficulty: "简单" | "中等" | "进阶";
  price: string;
  time: string;
  calories: string;
  nutrition: string[];
  efficacy: string[];
  taboos: string[];
  ingredients: { name: string; amount: string }[];
  seasonings: { name: string; amount: string }[];
  /** 正文 markdown（含做法步骤、小贴士等章节） */
  content: string;
};

// Vite: 一次性 raw 导入所有 md 文件
const modules = import.meta.glob("../content/dishes/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const parsed: Dish[] = Object.values(modules).map((raw) => {
  const { data, content } = matter(raw);
  return {
    slug: data.slug,
    title: data.title,
    cover: IMAGE_MAP[data.cover] ?? data.cover,
    excerpt: data.excerpt,
    category: data.category,
    difficulty: data.difficulty,
    price: data.price,
    time: data.time,
    calories: data.calories,
    nutrition: data.nutrition ?? [],
    efficacy: data.efficacy ?? [],
    taboos: data.taboos ?? [],
    ingredients: data.ingredients ?? [],
    seasonings: data.seasonings ?? [],
    content: content.trim(),
  };
});

// 保持原有顺序
const ORDER = [
  "tomato-egg",
  "hong-shao-rou",
  "kung-pao-chicken",
  "mapo-tofu",
  "steamed-fish",
  "garlic-bok-choy",
  "beef-noodles",
  "xiao-long-bao",
];

export const DISHES: Dish[] = parsed.sort(
  (a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug)
);
