import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { AlertTriangle, Phone } from "lucide-react";
import { practice } from "@/content/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/site/Shared";

export function PhoneChip({ className }: { className?: string }) {
  return (
    <div className={cn("flex justify-center px-4 py-3", className)}>
      <a
        href={`tel:${practice.phoneTel}`}
        className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-sm text-ink shadow-soft hover:border-sage"
      >
        <Phone className="size-4" aria-hidden />
        Fragen? Rufen Sie uns gerne an: {practice.phoneDisplay}
      </a>
    </div>
  );
}

export function CenteredPageHero({
  title,
  lead,
  actions,
}: {
  title: string;
  lead: string;
  actions?: ReactNode;
}) {
  return (
    <section className="border-b border-line bg-paper">
      <Container className="max-w-3xl py-16 text-center md:py-20">
        <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">{lead}</p>
        {actions ? (
          <div className="mt-8 flex flex-wrap justify-center gap-3">{actions}</div>
        ) : null}
      </Container>
    </section>
  );
}

export function WarningNote({
  title = "Wichtiger Hinweis",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside className="rounded-2xl border border-signal/25 bg-paper p-6 shadow-soft">
      <div className="flex gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-signal/10 text-signal">
          <AlertTriangle className="size-5" aria-hidden />
        </span>
        <div>
          <h2 className="font-display text-2xl font-semibold text-fg">{title}</h2>
          <div className="mt-2 space-y-3 text-[1.02rem] leading-relaxed text-fg/80">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}

export function IconCard({
  icon: Icon,
  title,
  children,
  className,
}: {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "rounded-2xl border border-line bg-paper p-6 shadow-soft",
        className,
      )}
    >
      <div className="flex gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sage-50 text-sage">
          <Icon className="size-5" aria-hidden />
        </span>
        <div>
          <h2 className="font-display text-2xl font-semibold text-fg">{title}</h2>
          <div className="mt-2 space-y-3 text-[1.02rem] leading-relaxed text-muted">
            {children}
          </div>
        </div>
      </div>
    </article>
  );
}

export function FeatureRow({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3">
      <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-sage-50 text-sage">
        <Icon className="size-5" aria-hidden />
      </span>
      <div>
        <p className="font-medium text-fg">{title}</p>
        <p className="text-base leading-relaxed text-muted">{text}</p>
      </div>
    </div>
  );
}

export function QuotePanel({
  quote,
  cite,
}: {
  quote: string;
  cite: string;
}) {
  return (
    <figure className="relative overflow-hidden rounded-3xl bg-sage-100 p-10 shadow-elevated md:aspect-square md:p-12">
      <span className="absolute -right-6 -top-6 size-24 rounded-full bg-sand-200/80" aria-hidden />
      <span className="absolute -bottom-8 left-8 size-20 rounded-full bg-sage-200/90" aria-hidden />
      <div className="relative flex h-full flex-col items-center justify-center text-center">
        <span className="grid size-16 place-items-center rounded-full bg-sage text-paper shadow-soft">
          <span className="font-display text-2xl leading-none">“</span>
        </span>
        <blockquote className="mt-6 font-display text-2xl font-medium text-sage-700">
          „{quote}“
        </blockquote>
        <figcaption className="mt-4 text-sm text-muted">— {cite}</figcaption>
      </div>
    </figure>
  );
}

export function NestedInfoGrid({
  items,
}: {
  items: { icon: LucideIcon; title: string; text: string }[];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.title} className="rounded-2xl border border-line bg-paper p-5">
          <p className="flex items-center gap-2 font-medium text-fg">
            <item.icon className="size-4 text-sage" aria-hidden />
            {item.title}
          </p>
          <p className="mt-2 text-base leading-relaxed text-muted">{item.text}</p>
        </div>
      ))}
    </div>
  );
}
