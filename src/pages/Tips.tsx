import { SiteHeader } from "@/components/SiteHeader";
import { FoodWheel } from "@/components/FoodWheel";
import { PICKING_TIPS } from "@/data/market";
import { Sparkles, AlertTriangle } from "lucide-react";
import { useMemo, useState } from "react";

const CATS = ["全部", "蔬菜", "肉禽", "水产", "蛋奶", "水果"] as const;

const Tips = () => {
  const [cat, setCat] = useState<(typeof CATS)[number]>("全部");
  const list = useMemo(
    () => (cat === "全部" ? PICKING_TIPS : PICKING_TIPS.filter((t) => t.category === cat)),
    [cat]
  );

  return (
    <div className="min-h-screen bg-gradient-cream">
      <SiteHeader />

      <section className="container pt-8 pb-4 sm:pt-12">
        <p className="text-xs sm:text-sm tracking-widest text-secondary font-medium uppercase">
          Picking Tips · 行家手册
        </p>
        <h1 className="mt-2 font-display text-3xl sm:text-5xl font-black leading-tight">
          挑菜<span className="text-gradient-warm">小技巧</span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl">
          会做菜不如会挑菜。这里是菜场老手们口口相传的挑选秘诀，让你买回家的每一样食材都是当天最好的那一份。
        </p>

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

      <main className="container pb-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
        {list.map((tip) => (
          <article
            key={tip.ingredient}
            className="rounded-2xl bg-card shadow-card p-5 hover:shadow-warm hover:-translate-y-1 transition-all duration-300"
          >
            <header className="flex items-center gap-3 mb-3">
              <span className="grid place-items-center w-12 h-12 rounded-xl bg-gradient-warm text-2xl shadow-soft">
                {tip.emoji}
              </span>
              <div>
                <h2 className="font-display text-lg font-bold leading-tight">{tip.ingredient}</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/15 text-secondary font-medium">
                  {tip.category}
                </span>
              </div>
            </header>

            <ul className="space-y-2 mb-3">
              {tip.tips.map((t, i) => (
                <li key={i} className="flex gap-2 text-sm text-foreground/85 leading-relaxed">
                  <Sparkles className="w-3.5 h-3.5 text-accent shrink-0 mt-1" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            {tip.avoid && (
              <div className="flex gap-2 text-xs text-destructive/90 bg-destructive/8 rounded-lg p-2.5 border border-destructive/20"
                style={{ backgroundColor: "hsl(0 75% 50% / 0.06)" }}>
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{tip.avoid}</span>
              </div>
            )}
          </article>
        ))}
      </main>
    </div>
  );
};

export default Tips;
