import { SiteHeader } from "@/components/SiteHeader";
import { MARKET_PRICES, MARKET_DATE, type MarketPrice } from "@/data/market";
import { TrendingDown, TrendingUp, Minus, CalendarDays } from "lucide-react";
import { useMemo, useState } from "react";

const CATS = ["全部", "蔬菜", "肉禽", "水产", "蛋奶", "豆制品", "水果"] as const;

const TrendIcon = ({ t }: { t: MarketPrice["trend"] }) => {
  if (t === "up") return <span className="inline-flex items-center gap-1 text-primary text-xs"><TrendingUp className="w-3 h-3" />涨</span>;
  if (t === "down") return <span className="inline-flex items-center gap-1 text-secondary text-xs"><TrendingDown className="w-3 h-3" />跌</span>;
  return <span className="inline-flex items-center gap-1 text-muted-foreground text-xs"><Minus className="w-3 h-3" />平</span>;
};

const Market = () => {
  const [cat, setCat] = useState<(typeof CATS)[number]>("全部");

  const list = useMemo(
    () => (cat === "全部" ? MARKET_PRICES : MARKET_PRICES.filter((p) => p.category === cat)),
    [cat]
  );

  const grouped = useMemo(() => {
    const g: Record<string, MarketPrice[]> = {};
    list.forEach((p) => {
      g[p.category] = g[p.category] || [];
      g[p.category].push(p);
    });
    return g;
  }, [list]);

  return (
    <div className="min-h-screen bg-gradient-cream">
      <SiteHeader />

      <section className="container pt-8 pb-4 sm:pt-12">
        <p className="text-xs sm:text-sm tracking-widest text-secondary font-medium uppercase">
          Market Prices
        </p>
        <h1 className="mt-2 font-display text-3xl sm:text-5xl font-black leading-tight">
          每日<span className="text-gradient-warm">菜价</span>
        </h1>
        <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <CalendarDays className="w-4 h-4" />
          <span>更新于 {MARKET_DATE} · 数据来源于本地农贸市场（示例）</span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {CATS.map((c) => (
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
      </section>

      <main className="container pb-24 space-y-6">
        {Object.entries(grouped).map(([category, items]) => (
          <section key={category} className="rounded-2xl bg-card shadow-card overflow-hidden animate-fade-in">
            <header className="px-5 py-3 border-b border-border/60 bg-muted/40">
              <h2 className="font-display font-bold text-base">{category} <span className="text-muted-foreground text-xs ml-1">{items.length} 项</span></h2>
            </header>
            <div className="divide-y divide-border/60">
              {items.map((p) => (
                <div key={p.name} className="grid grid-cols-12 gap-2 px-5 py-3 items-center hover:bg-muted/30 transition-colors">
                  <div className="col-span-5 sm:col-span-6 font-medium text-foreground/90 text-sm sm:text-base">{p.name}</div>
                  <div className="col-span-3 sm:col-span-2 text-xs sm:text-sm text-muted-foreground">／ {p.unit}</div>
                  <div className="col-span-2 sm:col-span-2 text-right">
                    <span className="font-display font-bold text-base sm:text-lg text-primary">
                      ¥{p.price.toFixed(1)}
                    </span>
                  </div>
                  <div className="col-span-2 sm:col-span-2 text-right">
                    <TrendIcon t={p.trend} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default Market;
