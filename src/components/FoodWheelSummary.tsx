import { Coins, Flame, Heart, AlertTriangle, X, RotateCcw } from "lucide-react";
import type { Dish } from "@/data/dishes";

const parseNumber = (text: string): number => {
  const m = text.match(/(\d+(?:\.\d+)?)/);
  return m ? parseFloat(m[1]) : 0;
};

export const FoodWheelSummary = ({
  picks,
  onRemove,
  onReset,
  onClose,
}: {
  picks: Dish[];
  onRemove: (slug: string) => void;
  onReset: () => void;
  onClose: () => void;
}) => {
  const totalPrice = picks.reduce((s, d) => s + parseNumber(d.perPerson), 0);
  const totalCalories = picks.reduce((s, d) => s + parseNumber(d.calories), 0);
  const efficacy = Array.from(new Set(picks.flatMap((d) => d.efficacy)));
  const taboos = Array.from(new Set(picks.flatMap((d) => d.taboos)));

  return (
    <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
      <div className="rounded-xl bg-gradient-warm/10 border border-primary/20 p-4 mb-4">
        <p className="text-xs text-muted-foreground">本次共选</p>
        <p className="font-display text-2xl font-bold text-foreground">
          {picks.length} 道菜
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-background/70 p-3">
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Coins className="w-3 h-3" /> 人均合计
            </div>
            <div className="mt-0.5 font-display text-lg font-bold text-primary">
              ¥{totalPrice.toFixed(0)}
            </div>
          </div>
          <div className="rounded-lg bg-background/70 p-3">
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Flame className="w-3 h-3" /> 总热量
            </div>
            <div className="mt-0.5 font-display text-lg font-bold text-foreground">
              {totalCalories} 千卡
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {picks.map((d) => (
          <div
            key={d.slug}
            className="flex items-center gap-3 rounded-lg border border-border/60 bg-background/50 p-2"
          >
            <img
              src={d.cover}
              alt={d.title}
              className="w-12 h-12 rounded-md object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-foreground truncate">
                {d.title}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {d.category} · 人均 {d.perPerson}
              </p>
            </div>
            <button
              onClick={() => onRemove(d.slug)}
              className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              aria-label="移除"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {efficacy.length > 0 && (
        <div className="mb-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground mb-2">
            <Heart className="w-3.5 h-3.5 text-primary" /> 综合食疗功效
          </div>
          <div className="flex flex-wrap gap-1.5">
            {efficacy.map((e) => (
              <span
                key={e}
                className="text-[11px] px-2 py-0.5 rounded-full bg-secondary/15 text-secondary border border-secondary/20"
              >
                {e}
              </span>
            ))}
          </div>
        </div>
      )}

      {taboos.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground mb-2">
            <AlertTriangle className="w-3.5 h-3.5 text-destructive" /> 注意禁忌
          </div>
          <ul className="space-y-1">
            {taboos.map((t) => (
              <li
                key={t}
                className="text-[11px] text-foreground/80 flex items-start gap-1.5"
              >
                <span className="mt-1 w-1 h-1 rounded-full bg-destructive shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-2 sticky bottom-0 bg-gradient-cream pt-2">
        <button
          onClick={onReset}
          className="flex-1 inline-flex items-center justify-center gap-1 rounded-md border border-border bg-background h-10 text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> 重新开始
        </button>
        <button
          onClick={onClose}
          className="flex-1 rounded-md bg-gradient-warm text-primary-foreground h-10 text-sm font-medium hover:opacity-95 transition-opacity"
        >
          收下这餐
        </button>
      </div>
    </div>
  );
};
