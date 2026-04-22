import { useState, useRef, useMemo } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sparkles, Utensils } from "lucide-react";
import { DISHES, type Dish } from "@/data/dishes";
import confetti from "canvas-confetti";

// 按菜系分配色相，保证同菜系颜色接近、不同菜系明显区分
const CATEGORY_HUE: Record<Dish["category"], number> = {
  家常: 28,   // 暖橙
  川菜: 8,    // 红
  粤菜: 160,  // 青绿
  面点: 42,   // 金黄
  素食: 95,   // 草绿
  汤: 200,    // 蓝
};

// 同菜系内根据序号微调亮度，避免完全相同
const colorFor = (category: Dish["category"], indexInCategory: number) => {
  const hue = CATEGORY_HUE[category] ?? 28;
  const lightness = 52 + (indexInCategory % 3) * 6; // 52 / 58 / 64
  return `hsl(${hue} 70% ${lightness}%)`;
};

export const FoodWheel = () => {
  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);

  const slice = 360 / DISHES.length;

  // 给每道菜计算其在所属菜系内的序号 → 决定颜色
  const sliceColors = useMemo(() => {
    const counter: Record<string, number> = {};
    return DISHES.map((d) => {
      const idx = counter[d.category] ?? 0;
      counter[d.category] = idx + 1;
      return colorFor(d.category, idx);
    });
  }, []);

  // 当前菜系图例（去重 + 保持顺序）
  const legend = useMemo(() => {
    const seen = new Set<string>();
    const list: { category: Dish["category"]; color: string }[] = [];
    DISHES.forEach((d) => {
      if (!seen.has(d.category)) {
        seen.add(d.category);
        list.push({ category: d.category, color: `hsl(${CATEGORY_HUE[d.category]} 70% 52%)` });
      }
    });
    return list;
  }, []);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const winner = Math.floor(Math.random() * DISHES.length);
    // conic-gradient 默认从 12 点钟方向（顶部）开始顺时针绘制；指针也在顶部。
    // 因此 winner 切片中心相对顶部的角度即 winner * slice + slice/2。
    // 让该中心旋转到顶部（0°），需要使转盘最终累计旋转角度满足：
    //   (rotation + centerAngle) ≡ 0 (mod 360)
    // → rotation mod 360 = (360 - centerAngle) mod 360
    const centerAngle = winner * slice + slice / 2;
    const targetMod = (360 - centerAngle) % 360;
    const currentMod = ((rotationRef.current % 360) + 360) % 360;
    let delta = targetMod - currentMod;
    if (delta <= 0) delta += 360;
    const newRotation = rotationRef.current + 360 * 6 + delta; // 至少 6 圈

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

  // Build conic-gradient（显式 from 0deg 避免歧义）
  const gradientStops = DISHES.map((_, i) => {
    const from = i * slice;
    const to = (i + 1) * slice;
    return `${sliceColors[i]} ${from}deg ${to}deg`;
  }).join(", ");

  return (
    <>
      <button
        onClick={() => setOpen(true)}
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
              转一转，<span className="text-gradient-warm">今天吃什么</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-1">
              让命运决定你的午餐 / 晚餐
            </DialogDescription>
          </div>

          {/* 菜系图例 */}
          <div className="px-6 flex flex-wrap justify-center gap-x-3 gap-y-1.5">
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

          <div className="relative mx-auto my-4" style={{ width: 280, height: 280 }}>
            {/* Pointer */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-1 z-10">
              <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-primary drop-shadow" />
            </div>
            {/* Wheel */}
            <div
              ref={wheelRef}
              className="w-full h-full rounded-full shadow-warm relative ring-4 ring-background"
              style={{
                background: `conic-gradient(from 0deg, ${gradientStops})`,
                transform: `rotate(0deg)`,
              }}
            >
              {DISHES.map((d, i) => {
                // 切片中心相对顶部的角度；但文字定位用的是相对于 3 点钟方向（CSS rotate 起点）
                // 因此需要 -90° 校正
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
            {/* Center button */}
            <button
              onClick={spin}
              disabled={spinning}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-background border-4 border-primary shadow-warm grid place-items-center font-display font-bold text-primary text-sm hover:scale-105 transition-transform disabled:opacity-70"
            >
              {spinning ? "..." : "GO"}
            </button>
          </div>

          <div className="px-6 pb-6 text-center min-h-[88px]">
            {result !== null && !spinning ? (
              <div className="animate-fade-in">
                <p className="text-xs text-muted-foreground">
                  就决定是你了！· <span className="text-foreground/70">{DISHES[result].category}</span>
                </p>
                <p className="font-display text-xl font-bold text-foreground mt-1">
                  {DISHES[result].title}
                </p>
                <a
                  href={`#/dish/${DISHES[result].slug}`}
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex items-center rounded-md bg-gradient-warm hover:opacity-90 text-primary-foreground border-0 h-9 px-3 text-sm font-medium"
                >
                  <Utensils className="w-4 h-4 mr-1" /> 看看怎么做
                </a>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground pt-4">
                {spinning ? "转盘飞速旋转中..." : "点击中央 GO 开始抽签"}
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
