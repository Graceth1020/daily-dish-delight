import { SiteHeader } from "@/components/SiteHeader";
import { PICKING_TIPS } from "@/data/market";
import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

            <div className="prose prose-sm max-w-none
              prose-headings:font-display prose-headings:font-bold
              prose-h2:text-sm prose-h2:mt-4 prose-h2:mb-2 prose-h2:first:mt-0
              prose-h2:text-foreground/90
              prose-p:text-foreground/85 prose-p:my-1
              prose-ul:my-1 prose-li:text-foreground/85 prose-li:my-0.5
              prose-li:marker:text-accent">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{tip.content}</ReactMarkdown>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
};

export default Tips;
