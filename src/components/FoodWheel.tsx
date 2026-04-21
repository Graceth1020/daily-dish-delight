import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Utensils } from "lucide-react";
import { DISHES } from "@/data/dishes";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

const PALETTE = [
  "hsl(8 75% 55%)",
  "hsl(28 90% 58%)",
  "hsl(42 95% 60%)",
  "hsl(90 40% 48%)",
  "hsl(160 45% 45%)",
  "hsl(200 60% 50%)",
  "hsl(340 70% 55%)",
  "hsl(20 60% 40%)",
];

export const FoodWheel = () => {
  const [open, setOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const navigate = useNavigate();

  const slice = 360 / DISHES.length;

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const winner = Math.floor(Math.random() * DISHES.length);
    // pointer at top (0deg). Make winner's slice center align to top.
    const centerAngle = winner * slice + slice / 2;
    const target = 360 * 6 - centerAngle; // 6 full spins then settle
    const newRotation = rotationRef.current + (target - (rotationRef.current % 360));
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

  // Build conic-gradient
  const gradientStops = DISHES.map((_, i) => {
    const from = i * slice;
    const to = (i + 1) * slice;
    const color = PALETTE[i % PALETTE.length];
    return `${color} ${from}deg ${to}deg`;
  }).join(", ");

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40 group"
        aria-label="今天吃什么"
      >
        <span className="absolute inset-0 rounded-full bg-gradient-warm blur-xl opacity-60 group-hover:opacity-90 transition-opacity" />
        <span className="relative flex items-center gap-2 rounded-full bg-gradient-warm text-primary-foreground pl-4 pr-5 py-3 shadow-warm font-medium text-sm sm:text-base animate-float">
          <Sparkles className="w-4 h-4" />
          今天吃什么
        </span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md p-0 overflow-hidden bg-gradient-cream border-border/60">
          <div className="px-6 pt-6 pb-2 text-center">
            <DialogTitle className="font-display text-2xl text-foreground">
              转一转，<span className="text-gradient-warm">今天吃什么</span>
            </DialogTitle>
            <p className="text-xs text-muted-foreground mt-1">让命运决定你的午餐 / 晚餐</p>
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
                background: `conic-gradient(${gradientStops})`,
                transform: `rotate(0deg)`,
              }}
            >
              {DISHES.map((d, i) => {
                const angle = i * slice + slice / 2;
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
                <p className="text-xs text-muted-foreground">就决定是你了！</p>
                <p className="font-display text-xl font-bold text-foreground mt-1">
                  {DISHES[result].title}
                </p>
                <Button
                  onClick={() => { setOpen(false); navigate(`/dish/${DISHES[result].slug}`); }}
                  className="mt-3 bg-gradient-warm hover:opacity-90 text-primary-foreground border-0"
                  size="sm"
                >
                  <Utensils className="w-4 h-4 mr-1" /> 看看怎么做
                </Button>
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
