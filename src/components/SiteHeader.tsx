import { Link } from "react-router-dom";
import { ChefHat } from "lucide-react";

export const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-background/75 border-b border-border/60">
      <div className="container flex items-center justify-between h-14 sm:h-16">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-warm shadow-warm">
            <ChefHat className="w-5 h-5 text-primary-foreground" />
          </span>
          <div className="leading-tight">
            <div className="font-display font-bold text-base sm:text-lg">今天吃什么</div>
            <div className="text-[10px] text-muted-foreground -mt-0.5">家常菜谱合集 · Daily Recipes</div>
          </div>
        </Link>
        <nav className="hidden sm:flex items-center gap-5 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">菜谱</Link>
          <a href="#categories" className="hover:text-foreground transition-colors">分类</a>
          <a href="#about" className="hover:text-foreground transition-colors">关于</a>
        </nav>
      </div>
    </header>
  );
};
