import { useState, useRef, useMemo } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sparkles, Utensils, ArrowLeft, Plus, Check, Search } from "lucide-react";
import { DISHES, type Dish } from "@/data/dishes";
import { FoodWheelSummary } from "./FoodWheelSummary";
import confetti from "canvas-confetti";

// 按菜系分配色相
const CATEGORY_HUE: Record<Dish["category"], number> = {
  家常: 28,
  川菜: 8,
  粤菜: 160,
  面点: 42,
  素食: 95,
  汤: 200,
};

const colorFor = (category: Dish["category"], indexInCategory: number) => {
  const hue = CATEGORY_HUE[category] ?? 28;
  const lightness = 52 + (indexInCategory % 3) * 6;
  return `hsl(${hue} 70% ${lightness}%)`;
};

const ALL = "全部" as const;
type FilterCategory = typeof ALL | Dish["category"];

export const FoodWheel = () => {
  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [category, setCategory] = useState<FilterCategory | null>(null);
  const [picks, setPicks] = useState<Dish[]>([]);
  const [view, setView] = useState<"wheel" | "summary">("wheel");
  const wheelRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);

  // 所有菜系（保持出现顺序）
  const categories = useMemo<FilterCategory[]>(() => {
    const seen = new Set<Dish["category"]>();
    const list: Dish["category"][] = [];
    DISHES.forEach((d) => {
      if (!seen.has(d.category)) {
        seen.add(d.category);
        list.push(d.category);
      }
    });
    return [ALL, ...list];
  }, []);

  // 当前筛选的菜
  const dishes = useMemo(() => {
    if (!category || category === ALL) return DISHES;
    return DISHES.filter((d) => d.category === category);
  }, [category]);

  const slice = dishes.length > 0 ? 360 / dishes.length : 360;

  // 切片颜色
  const sliceColors = useMemo(() => {
    const counter: Record<string, number> = {};
    return dishes.map((d) => {
      const idx = counter[d.category] ?? 0;
      counter[d.category] = idx + 1;
      return colorFor(d.category, idx);
    });
  }, [dishes]);

  const resetWheel = () => {
    rotationRef.current = 0;
    setResult(null);
    if (wheelRef.current) {
      wheelRef.current.style.transition = "none";
      wheelRef.current.style.transform = "rotate(0deg)";
    }
  };

  const handlePickCategory = (c: FilterCategory) => {
    setCategory(c);
    // 重置转盘状态
    setTimeout(resetWheel, 0);
  };

  const handleBack = () => {
    setCategory(null);
    setResult(null);
    rotationRef.current = 0;
  };

  const spin = () => {
    if (spinning || dishes.length === 0) return;
    setSpinning(true);
    setResult(null);

    const winner = Math.floor(Math.random() * dishes.length);
    const centerAngle = winner * slice + slice / 2;
    const targetMod = (360 - centerAngle) % 360;
    const currentMod = ((rotationRef.current % 360) + 360) % 360;
    let delta = targetMod - currentMod;
    if (delta <= 0) delta += 360;
    const newRotation = rotationRef.current + 360 * 6 + delta;

    rotationRef.current = newRotation;

    if (wheelRef.current) {
      wheelRef.current.style.transition = "transform 4s cubic-bezier(0.22, 1, 0.36, 1)";
      wheelRef.current.style.transform = `rotate(${newRotation}deg)`;
    }

    setTimeout(() => {
      setSpinning(false);
      setResult(winner);
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#e85a3c", "#f5a623", "#7ba23f"],
      });
    }, 4100);
  };

  const gradientStops = dishes
    .map((_, i) => {
      const from = i * slice;
      const to = (i + 1) * slice;
      return `${sliceColors[i]} ${from}deg ${to}deg`;
    })
    .join(", ");

  // 当前菜系图例
  const legend = useMemo(() => {
    const seen = new Set<string>();
    const list: { category: Dish["category"]; color: string }[] = [];
    dishes.forEach((d) => {
      if (!seen.has(d.category)) {
        seen.add(d.category);
        list.push({ category: d.category, color: `hsl(${CATEGORY_HUE[d.category]} 70% 52%)` });
      }
    });
    return list;
  }, [dishes]);

  const resetAll = () => {
    setCategory(null);
    setResult(null);
    setPicks([]);
    setView("wheel");
    rotationRef.current = 0;
  };

  const addCurrentToPicks = () => {
    if (result === null) return;
    const dish = dishes[result];
    if (picks.find((p) => p.slug === dish.slug)) {
      // 已存在则不重复添加，直接回到分类选择
      setCategory(null);
      setResult(null);
      rotationRef.current = 0;
      return;
    }
    setPicks((prev) => [...prev, dish]);
    setCategory(null);
    setResult(null);
    rotationRef.current = 0;
  };

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
          resetAll();
        }}
        className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-warm text-primary-foreground px-3 sm:px-4 py-1.5 sm:py-2 shadow-warm font-medium text-xs sm:text-sm hover:opacity-95 active:scale-95 transition-all"
        aria-label="今天吃什么"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>今天吃什么</span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md p-0 overflow-hidden bg-gradient-cream border-border/60">
          <div className="px-6 pt-6 pb-2 text-center">
            <DialogTitle className="font-display text-2xl text-foreground">
              {view === "summary" ? (
                <>本次菜单 · <span className="text-gradient-warm">汇总</span></>
              ) : (
                <>转一转，<span className="text-gradient-warm">今天吃什么</span></>
              )}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-1">
              {view === "summary"
                ? "快看看今天的伙食预算与禁忌"
                : category === null
                ? "先选个口味，再让命运决定"
                : category === ALL
                ? "从所有菜中随机抽一道"
                : `仅从「${category}」中抽取`}
            </DialogDescription>
          </div>

          {view === "summary" ? (
            <FoodWheelSummary
              picks={picks}
              onRemove={(slug) =>
                setPicks((prev) => prev.filter((p) => p.slug !== slug))
              }
              onReset={resetAll}
              onClose={() => setOpen(false)}
            />
          ) : category === null ? (
            // ===== 第一步：选择菜系 =====
            <div className="px-6 py-6">
              {picks.length > 0 && (
                <div className="mb-4 rounded-xl border border-primary/30 bg-primary/5 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-medium text-foreground">
                      已选 {picks.length} 道
                    </p>
                    <button
                      onClick={() => setView("summary")}
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:opacity-80"
                    >
                      <Check className="w-3 h-3" /> 完成
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {picks.map((p) => (
                      <span
                        key={p.slug}
                        className="text-[11px] px-2 py-0.5 rounded-full bg-background text-foreground/80 border border-border"
                      >
                        {p.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                {categories.map((c) => {
                  const isAll = c === ALL;
                  const count = isAll
                    ? DISHES.length
                    : DISHES.filter((d) => d.category === c).length;
                  const hue = isAll ? 28 : CATEGORY_HUE[c as Dish["category"]];
                  return (
                    <button
                      key={c}
                      onClick={() => handlePickCategory(c)}
                      className="group relative overflow-hidden rounded-xl border border-border/60 bg-background/60 p-4 text-left hover:border-primary/60 hover:shadow-warm transition-all active:scale-95"
                    >
                      <div
                        className="absolute -right-4 -top-4 w-16 h-16 rounded-full opacity-20 group-hover:opacity-40 transition-opacity"
                        style={{ background: `hsl(${hue} 70% 52%)` }}
                      />
                      <div className="relative">
                        <p className="font-display text-lg font-bold text-foreground">{c}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{count} 道菜</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            // ===== 第二步：转盘 =====
            <>
              <div className="px-6 flex items-center justify-between">
                <button
                  onClick={handleBack}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-3 h-3" /> 重选分类
                </button>
                <span className="text-[11px] text-muted-foreground">
                  共 {dishes.length} 道{picks.length > 0 && ` · 已选 ${picks.length}`}
                </span>
              </div>

              {legend.length > 1 && (
                <div className="px-6 mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1.5">
                  {legend.map((l) => (
                    <div key={l.category} className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <span
                        className="inline-block w-2.5 h-2.5 rounded-sm"
                        style={{ background: l.color }}
                      />
                      {l.category}
                    </div>
                  ))}
                </div>
              )}

              <div className="relative mx-auto my-4" style={{ width: 280, height: 280 }}>
                <div className="absolute left-1/2 -translate-x-1/2 -top-1 z-10">
                  <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-primary drop-shadow" />
                </div>
                <div
                  ref={wheelRef}
                  className="w-full h-full rounded-full shadow-warm relative ring-4 ring-background"
                  style={{
                    background: `conic-gradient(from 0deg, ${gradientStops})`,
                    transform: `rotate(0deg)`,
                  }}
                >
                  {dishes.map((d, i) => {
                    const angle = i * slice + slice / 2 - 90;
                    return (
                      <div
                        key={d.slug}
                        className="absolute left-1/2 top-1/2 origin-left"
                        style={{
                          transform: `rotate(${angle}deg) translateX(20px)`,
                          width: 110,
                        }}
                      >
                        <span className="block text-[11px] font-semibold text-white drop-shadow whitespace-nowrap">
                          {d.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={spin}
                  disabled={spinning}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-background border-4 border-primary shadow-warm grid place-items-center font-display font-bold text-primary text-sm hover:scale-105 transition-transform disabled:opacity-70"
                >
                  {spinning ? "..." : "GO"}
                </button>
              </div>

              <div className="px-6 pb-6 text-center min-h-[120px]">
                {result !== null && !spinning ? (
                  <div className="animate-fade-in">
                    <p className="text-xs text-muted-foreground">
                      就决定是你了！· <span className="text-foreground/70">{dishes[result].category}</span>
                    </p>
                    <p className="font-display text-xl font-bold text-foreground mt-1">
                      {dishes[result].title}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                      <button
                        onClick={addCurrentToPicks}
                        className="inline-flex items-center rounded-md bg-gradient-warm hover:opacity-90 text-primary-foreground border-0 h-9 px-3 text-sm font-medium"
                      >
                        <Plus className="w-4 h-4 mr-1" /> 加入并继续选
                      </button>
                      {picks.length > 0 && (
                        <button
                          onClick={() => {
                            addCurrentToPicks();
                            setView("summary");
                          }}
                          className="inline-flex items-center rounded-md border border-primary/40 bg-background hover:bg-primary/5 text-primary h-9 px-3 text-sm font-medium"
                        >
                          <Check className="w-4 h-4 mr-1" /> 完成并汇总
                        </button>
                      )}
                      <a
                        href={`#/dish/${dishes[result].slug}`}
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center rounded-md border border-border bg-background hover:bg-muted text-foreground h-9 px-3 text-sm font-medium"
                      >
                        <Utensils className="w-4 h-4 mr-1" /> 做法
                      </a>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground pt-4">
                    {spinning ? "转盘飞速旋转中..." : "点击中央 GO 开始抽签"}
                  </p>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
