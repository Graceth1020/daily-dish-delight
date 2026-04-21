import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { DishCard } from "@/components/DishCard";
import { FoodWheel } from "@/components/FoodWheel";
import { DISHES } from "@/data/dishes";
import { Search } from "lucide-react";

const CATEGORIES = ["全部", "家常", "川菜", "粤菜", "面点", "素食", "汤"] as const;

const Index = () => {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("全部");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    return DISHES.filter((d) => (cat === "全部" ? true : d.category === cat))
      .filter((d) => (q ? d.title.includes(q) || d.excerpt.includes(q) : true));
  }, [cat, q]);

  return (
    <div className="min-h-screen bg-gradient-cream">
      <SiteHeader />

      {/* Hero */}
      <section className="container pt-8 pb-6 sm:pt-14 sm:pb-10">
        <div className="max-w-2xl">
          <p className="text-xs sm:text-sm tracking-widest text-secondary font-medium uppercase">
            Recipes · 家的味道
          </p>
          <h1 className="mt-2 font-display text-3xl sm:text-5xl font-black leading-tight">
            一口下去，<br className="sm:hidden" />
            <span className="text-gradient-warm">就是治愈</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed">
            精选 {DISHES.length} 道家常菜谱，附带营养、价格、禁忌、做法与食材。
            不知道吃什么？右下角转盘帮你决定。
          </p>
        </div>

        {/* Search + Categories */}
        <div className="mt-6 flex flex-col gap-3" id="categories">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="搜索菜名，比如 番茄、红烧..."
              className="w-full h-11 rounded-full bg-card border border-border pl-9 pr-4 text-sm shadow-card focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  cat === c
                    ? "bg-foreground text-background shadow-soft"
                    : "bg-card text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry list */}
      <main className="container pb-24">
        {list.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">没找到符合的菜谱～换个关键词试试</div>
        ) : (
          <div className="masonry-cols animate-fade-in">
            {list.map((d) => (
              <DishCard key={d.slug} dish={d} />
            ))}
          </div>
        )}
      </main>

      <footer id="about" className="border-t border-border/60 bg-card/50">
        <div className="container py-8 text-xs text-muted-foreground text-center">
          © 今天吃什么 · 用爱与油盐酱醋做出的小站
        </div>
      </footer>

      <FoodWheel />
    </div>
  );
};

export default Index;
