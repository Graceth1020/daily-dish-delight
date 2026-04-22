import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { DISHES } from "@/data/dishes";
import { SiteHeader } from "@/components/SiteHeader";
import { ArrowLeft, Clock, Coins, Flame, Leaf, Heart, AlertTriangle, Utensils, User, BookOpen, Info } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Section = ({ icon: Icon, title, accent = "primary", children }: { icon: any; title: string; accent?: "primary" | "secondary" | "accent" | "destructive"; children: React.ReactNode }) => {
  const accentMap = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/15 text-secondary",
    accent: "bg-accent/20 text-accent-foreground",
    destructive: "bg-destructive/10 text-destructive",
  };
  return (
    <section className="rounded-2xl bg-card shadow-card p-5 sm:p-6">
      <div className="flex items-center gap-2.5 mb-4">
        <span className={`grid place-items-center w-8 h-8 rounded-lg ${accentMap[accent]}`}>
          <Icon className="w-4 h-4" />
        </span>
        <h2 className="font-display text-lg sm:text-xl font-bold">{title}</h2>
      </div>
      {children}
    </section>
  );
};

const DishDetail = () => {
  const { slug } = useParams();
  const dish = DISHES.find((d) => d.slug === slug);

  if (!dish) {
    return (
      <div className="min-h-screen bg-gradient-cream">
        <SiteHeader />
        <div className="container py-20 text-center">
          <p className="text-muted-foreground">没找到这道菜</p>
          <Link to="/" className="text-primary mt-3 inline-block">返回菜谱</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-cream">
      <SiteHeader />

      {/* Hero */}
      <section className="container pt-6 pb-4">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> 返回菜谱
        </Link>
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10 items-start">
          <div className="rounded-3xl overflow-hidden shadow-warm">
            {dish.images.length > 1 ? (
              <Carousel opts={{ loop: true }} className="relative">
                <CarouselContent>
                  {dish.images.map((src, idx) => (
                    <CarouselItem key={idx}>
                      <img
                        src={src}
                        alt={`${dish.title} ${idx + 1}`}
                        className="w-full h-auto object-cover"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-3" />
                <CarouselNext className="right-3" />
              </Carousel>
            ) : (
              <img src={dish.cover} alt={dish.title} className="w-full h-auto object-cover" />
            )}
          </div>
          <div className="md:pt-4">
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-1 rounded-full bg-secondary/15 text-secondary font-medium">{dish.category}</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-accent/20 text-accent-foreground font-medium">{dish.difficulty}</span>
            </div>
            <h1 className="mt-3 font-display text-3xl sm:text-5xl font-black leading-tight">
              {dish.title}
            </h1>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">{dish.excerpt}</p>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Stat icon={Coins} label="预计成本" value={dish.price} />
              <Stat icon={User} label="人均" value={dish.perPerson} />
              <Stat icon={Clock} label="耗时" value={dish.time} />
              <Stat icon={Flame} label="热量" value={dish.calories} />
            </div>
          </div>
        </div>
      </section>

      {/* Tabs：做法步骤 / 菜品信息 */}
      <section className="container pb-16">
        <Tabs defaultValue="steps" className="w-full">
          <TabsList className="w-full sm:w-auto h-11 rounded-full bg-card shadow-card p-1">
            <TabsTrigger
              value="steps"
              className="rounded-full px-4 sm:px-6 data-[state=active]:bg-gradient-warm data-[state=active]:text-primary-foreground data-[state=active]:shadow-soft"
            >
              <BookOpen className="w-4 h-4 mr-1.5" /> 做法步骤
            </TabsTrigger>
            <TabsTrigger
              value="info"
              className="rounded-full px-4 sm:px-6 data-[state=active]:bg-gradient-warm data-[state=active]:text-primary-foreground data-[state=active]:shadow-soft"
            >
              <Info className="w-4 h-4 mr-1.5" /> 菜品信息
            </TabsTrigger>
          </TabsList>

          {/* Tab 1：做法步骤 */}
          <TabsContent value="steps" className="mt-5">
            <article className="rounded-2xl bg-card shadow-card p-5 sm:p-7 prose prose-sm sm:prose-base max-w-none
              prose-headings:font-display prose-headings:font-bold prose-headings:text-foreground
              prose-h2:text-lg sm:prose-h2:text-xl prose-h2:flex prose-h2:items-center prose-h2:gap-2
              prose-h2:mt-6 prose-h2:mb-4 prose-h2:first:mt-0
              prose-p:text-foreground/85 prose-p:leading-relaxed
              prose-li:text-foreground/85 prose-li:leading-relaxed
              prose-ol:pl-0 prose-ol:list-none prose-ol:space-y-3
              [&_ol>li]:relative [&_ol>li]:pl-12
              [&_ol]:counter-reset-[step]
              [&_ol>li]:before:content-[counter(step)] [&_ol>li]:before:counter-increment-[step]
              [&_ol>li]:before:absolute [&_ol>li]:before:left-0 [&_ol>li]:before:top-0
              [&_ol>li]:before:w-9 [&_ol>li]:before:h-9 [&_ol>li]:before:rounded-full
              [&_ol>li]:before:bg-gradient-warm [&_ol>li]:before:text-primary-foreground
              [&_ol>li]:before:font-display [&_ol>li]:before:font-bold
              [&_ol>li]:before:grid [&_ol>li]:before:place-items-center
              [&_ol>li]:before:shadow-soft">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {dish.content}
              </ReactMarkdown>
            </article>
          </TabsContent>

          {/* Tab 2：菜品信息 */}
          <TabsContent value="info" className="mt-5 space-y-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Section icon={Leaf} title="营养成分" accent="secondary">
                <div className="flex flex-wrap gap-2">
                  {dish.nutrition.map((n) => (
                    <span key={n} className="px-3 py-1 rounded-full text-xs bg-secondary/10 text-secondary border border-secondary/20">{n}</span>
                  ))}
                </div>
              </Section>
              <Section icon={Heart} title="食疗功效" accent="primary">
                <ul className="space-y-1.5 text-sm">
                  {dish.efficacy.map((e) => (
                    <li key={e} className="flex items-start gap-2 text-foreground/80">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />{e}
                    </li>
                  ))}
                </ul>
              </Section>
              <Section icon={AlertTriangle} title="食用禁忌" accent="destructive">
                <ul className="space-y-1.5 text-sm">
                  {dish.taboos.map((t) => (
                    <li key={t} className="flex items-start gap-2 text-foreground/80">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-destructive shrink-0" />{t}
                    </li>
                  ))}
                </ul>
              </Section>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Section icon={Utensils} title="食材" accent="secondary">
                <div className="divide-y divide-border/60">
                  {dish.ingredients.map((i) => (
                    <div key={i.name} className="flex justify-between py-2 text-sm">
                      <span className="text-foreground/80">{i.name}</span>
                      <span className="text-muted-foreground">{i.amount}</span>
                    </div>
                  ))}
                </div>
              </Section>
              <Section icon={Utensils} title="调味料" accent="accent">
                <div className="divide-y divide-border/60">
                  {dish.seasonings.map((i) => (
                    <div key={i.name} className="flex justify-between py-2 text-sm">
                      <span className="text-foreground/80">{i.name}</span>
                      <span className="text-muted-foreground">{i.amount}</span>
                    </div>
                  ))}
                </div>
              </Section>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

const Stat = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="rounded-xl bg-card shadow-card p-3 text-center">
    <Icon className="w-4 h-4 mx-auto text-primary" />
    <div className="text-[10px] text-muted-foreground mt-1">{label}</div>
    <div className="text-xs sm:text-sm font-semibold text-foreground mt-0.5">{value}</div>
  </div>
);

export default DishDetail;
