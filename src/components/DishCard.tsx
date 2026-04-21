import { Link } from "react-router-dom";
import type { Dish } from "@/data/dishes";
import { Clock, Flame } from "lucide-react";

export const DishCard = ({ dish }: { dish: Dish }) => {
  return (
    <Link
      to={`/dish/${dish.slug}`}
      className="masonry-item group block overflow-hidden rounded-2xl bg-card shadow-card transition-all duration-300 hover:shadow-warm hover:-translate-y-1"
    >
      <div className="relative overflow-hidden">
        <img
          src={dish.cover}
          alt={dish.title}
          loading="lazy"
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-2 left-2 rounded-full bg-background/85 backdrop-blur px-2 py-0.5 text-[10px] font-medium text-foreground">
          {dish.category}
        </span>
        <span className="absolute top-2 right-2 rounded-full bg-primary/90 text-primary-foreground px-2 py-0.5 text-[10px] font-medium">
          {dish.price}
        </span>
      </div>
      <div className="p-3">
        <h3 className="font-display text-base sm:text-lg font-bold text-foreground line-clamp-1">
          {dish.title}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {dish.excerpt}
        </p>
        <div className="mt-2.5 flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" />{dish.time}</span>
          <span className="inline-flex items-center gap-1"><Flame className="w-3 h-3" />{dish.difficulty}</span>
        </div>
      </div>
    </Link>
  );
};
