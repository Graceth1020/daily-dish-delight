import { Link, useLocation } from "react-router-dom";
import { ChefHat } from "lucide-react";
import { FoodWheel } from "@/components/FoodWheel";

const navItems = [
  { to: "/", label: "菜谱" },
  { to: "/market", label: "菜价" },
  { to: "/tips", label: "挑菜" },
];

export const SiteHeader = () => {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-background/80 border-b border-border/60">
      <div className="container flex items-center justify-between gap-2 h-14 sm:h-16">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-warm shadow-warm">
            <ChefHat className="w-5 h-5 text-primary-foreground" />
          </span>
          <div className="leading-tight hidden sm:block">
            <div className="font-display font-bold text-base sm:text-lg">今天吃什么</div>
            <div className="text-[10px] text-muted-foreground -mt-0.5">家常菜谱合集 · Daily Recipes</div>
          </div>
        </Link>
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <nav className="flex items-center gap-0.5 sm:gap-1 text-sm">
            {navItems.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-2 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                    active
                      ? "bg-foreground text-background shadow-soft"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <FoodWheel />
        </div>
      </div>
    </header>
  );
};
