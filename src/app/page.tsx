"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Star,
  CheckCircle2,
  Zap,
  Brain,
  Rocket,
  Globe2,
  Bot,
  BarChart3,
  Plus,
  Search,
  ChevronDown,
  Quote,
  Layers,
  Compass,
  Wrench,
  LineChart,
  Palette,
  Code2,
  Check,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/button";
import { Container } from "@/components/layout";
import { Reveal } from "@/components/reveal";
import { Halo, GlassCard } from "@/components/halo";
import { PromptPill } from "@/components/prompt-pill";
import { cn } from "@/lib/utils";
import { useState } from "react";

/* ============================================================
   HERO
   ============================================================ */
function Hero() {
  return (
    <section className="relative isolate overflow-hidden py-28 sm:py-32 lg:py-40">
      {/* Mesh + halos — the reference's signature look */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-page-mesh"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40 bg-grid-pattern"
      />
      <Halo tone="coral" className="-top-40 left-1/2 -z-10 h-[560px] w-[760px] -translate-x-1/2" />
      <Halo tone="blue" className="top-20 -right-32 -z-10 h-[420px] w-[420px] animate-float-slow" />
      <Halo tone="violet" className="top-60 -left-24 -z-10 h-[360px] w-[360px] animate-float" />

      <Container className="relative">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* Hero badge */}
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              AI-Powered Brand Growth Company
            </span>
          </Reveal>

          {/* Headline — the reference's signature style */}
          <Reveal delay={1}>
            <h1 className="mt-7 font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight text-text-primary sm:text-6xl lg:text-[5.25rem]">
              <span className="block">Building Brands.</span>
              <span className="block">
                Growing{" "}
                <span className="relative inline-block">
                  <span
                    className="bg-[image:var(--gradient-accent)] bg-clip-text text-transparent"
                  >
                    Businesses
                  </span>
                  <svg
                    aria-hidden
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 220 10"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 7 Q 55 1 110 6 T 218 5"
                      stroke="url(#hero-underline)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <defs>
                      <linearGradient id="hero-underline" x1="0" x2="1">
                        <stop offset="0" stopColor="#ff5a36" />
                        <stop offset="1" stopColor="#f472b6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <span className="text-text-primary">.</span>
              </span>
            </h1>
          </Reveal>

          {/* Subhead */}
          <Reveal delay={2}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
              Vistaar partners with startups, founders, and businesses to create
              impactful brands, modern websites, intelligent AI solutions, and
              scalable growth systems that transform ideas into successful
              businesses.
            </p>
          </Reveal>

          {/* Service highlights — floating pills */}
          <Reveal delay={3}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {[
                "Branding",
                "AI Automation",
                "Website Development",
                "Growth Marketing",
                "SaaS Development",
                "App Development",
                "Business Consulting",
                "Personal Branding",
                "Creative Studio",
                "Growth Strategy",
              ].map((s, i) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-text-secondary transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-text-primary"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  {s}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Prompt input pill — the reference's signature element */}
          <Reveal delay={4}>
            <div className="mt-10 max-w-7xl">
              <PromptPill
                placeholder="Tell us about your project — branding, website, AI, growth…"
                ctaLabel="Start Project"
                ctaHref="/contact"
                filename="vistaar.studio · brand-growth-workspace"
                modelBadge="Vistaar AI"
              />
            </div>
          </Reveal>

          {/* Trust indicators */}
          <Reveal delay={5}>
            <div className="mt-12 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { Icon: Brain, label: "AI-Driven Solutions" },
                { Icon: CheckCircle2, label: "Strategy First" },
                { Icon: Rocket, label: "End-to-End Partner" },
                { Icon: Star, label: "Built to Scale" },
              ].map(({ Icon, label }, i) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 rounded-2xl border border-border bg-surface px-3.5 py-3 text-left text-xs font-medium text-text-secondary"
                >
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  {label}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Scroll indicator */}
      <a
        href="#trusted"
        className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-text-muted transition-colors hover:text-text-primary md:flex"
        aria-label="Discover our story"
      >
        <span>Discover Our Story</span>
        <span className="relative inline-flex h-9 w-5 items-start justify-center rounded-full border border-border bg-surface p-1">
          <span className="h-1.5 w-1 rounded-full bg-primary animate-scroll-arrow" />
        </span>
      </a>
    </section>
  );
}

/* ============================================================
   TRUSTED BY — infinite logo marquee
   ============================================================ */
const TRUSTED_LOGOS = [
  "Helios",
  "Lumen",
  "Northwind",
  "Atlas",
  "Kibo",
  "Verity",
  "Crescent",
  "Aurelia",
  "Lattice",
  "Orbit",
  "Quantum",
  "Sable",
];

function TrustedBy() {
  return (
    <section
      id="trusted"
      className="relative border-y border-border bg-background-tint py-14"
    >
      <Container>
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-text-muted">
            Trusted by founders and teams at
          </p>
        </Reveal>
      </Container>
      <div className="mt-8 overflow-hidden" aria-hidden>
        <div className="flex w-max items-center gap-12 animate-marquee">
          {[...TRUSTED_LOGOS, ...TRUSTED_LOGOS].map((name, i) => (
            <span
              key={i}
              className="font-display text-2xl font-semibold tracking-tight text-text-muted/70 transition-colors hover:text-text-primary"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SERVICES — 6 feature cards with hover halo
   ============================================================ */
const SERVICE_HIGHLIGHTS = [
  {
    Icon: Compass,
    title: "Brand Strategy",
    body: "Position, voice, story, identity. Foundations that compound for years.",
  },
  {
    Icon: Palette,
    title: "Brand Identity",
    body: "Logos, systems, guidelines, packaging. A brand people remember.",
  },
  {
    Icon: Code2,
    title: "Web & App Development",
    body: "Marketing sites, SaaS, mobile apps. Built for performance and scale.",
  },
  {
    Icon: Brain,
    title: "AI & Automation",
    body: "Workflow automation, chatbots, AI agents. Less busywork, more output.",
  },
  {
    Icon: LineChart,
    title: "Growth Marketing",
    body: "SEO, paid, lifecycle, content. Acquisition and retention, working together.",
  },
  {
    Icon: Wrench,
    title: "Business Consulting",
    body: "Strategy, GTM, digital transformation. A thinking partner, not a vendor.",
  },
];

function ServicesOverview() {
  return (
    <section id="services-overview" className="relative py-24 sm:py-28 lg:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-soft" />
              The Vistaar Ecosystem
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              From first idea to lasting growth — under one strategy.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
              Six connected practices that work as a single growth system. Mix
              them, sequence them, or hand us the whole map.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_HIGHLIGHTS.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={(i % 3) + 1}>
              <GlassCard tone={(["coral", "blue", "violet"] as const)[i % 3]} className="h-full p-7">
                <div className="relative">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-glow blur-2xl"
                  />
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-text-primary">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {body}
                  </p>
                  <Link
                    href="/services"
                    className="group mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors"
                  >
                    Learn more
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ============================================================
   SHOWCASE — large hero mockup with halo + secondary mockup
   ============================================================ */
function Showcase() {
  return (
    <section className="relative py-24 sm:py-28 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-page-mesh opacity-50"
      />
      <Halo tone="blue" className="top-32 -right-40 -z-10 h-[560px] w-[560px]" />
      <Halo tone="coral" className="top-80 -left-32 -z-10 h-[420px] w-[420px]" />

      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              See Vistaar in action.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
              One connected workspace where strategy, design, code, and growth
              live side by side. No more switching between five tools and three
              Slack channels.
            </p>
          </div>
        </Reveal>

        {/* Main showcase card */}
        <Reveal delay={1}>
          <div className="relative mx-auto mt-14 max-w-5xl">
            <div className="absolute -inset-x-10 -inset-y-8 -z-10 rounded-[2.5rem] bg-[image:var(--gradient-soft)] blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-background-elevated shadow-elevated">
              {/* window chrome */}
              <div className="flex items-center gap-1.5 border-b border-border bg-background-muted/60 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-error/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
                <span className="ml-3 text-xs text-text-muted">
                  vistaar.studio · brand-growth-workspace
                </span>
              </div>
              <div className="grid gap-4 p-5 sm:grid-cols-3 sm:gap-5 sm:p-7">
                <PreviewCard
                  tag="01 · Strategy"
                  title="Brand Foundations"
                  items={["Research", "Positioning", "Voice & Tone", "Audience Map"]}
                  tone="coral"
                />
                <PreviewCard
                  tag="02 · Build"
                  title="Digital Experience"
                  items={["Web · App · SaaS", "Design System", "AI Workflows", "CMS"]}
                  tone="blue"
                />
                <PreviewCard
                  tag="03 · Grow"
                  title="Performance Engine"
                  items={["SEO & Content", "Paid Acquisition", "Lifecycle", "Analytics"]}
                  tone="violet"
                />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Secondary showcase — small floating panel */}
        <div className="relative mx-auto mt-16 grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal delay={2}>
            <GlassCard tone="blue" className="p-7">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-text-primary">
                  Active workflows
                </h3>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-soft" />
                  Live
                </span>
              </div>
              <ul className="mt-5 space-y-3 text-sm">
                {[
                  { name: "Lead enrichment → CRM", count: "1,284 / wk" },
                  { name: "Onboarding email sequence", count: "12 steps" },
                  { name: "Customer health scoring", count: "98% accuracy" },
                  { name: "Content brief generator", count: "32 drafts" },
                ].map((row) => (
                  <li
                    key={row.name}
                    className="flex items-center justify-between gap-4 rounded-xl border border-border bg-background px-3.5 py-2.5"
                  >
                    <span className="text-text-primary">{row.name}</span>
                    <span className="text-xs text-text-muted">{row.count}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>

          <Reveal delay={3}>
            <GlassCard tone="violet" className="p-7">
              <h3 className="font-display text-lg font-semibold text-text-primary">
                This quarter
              </h3>
              <div className="mt-5 grid grid-cols-2 gap-4">
                {[
                  { k: "Pipeline", v: "+42%", tone: "text-success" },
                  { k: "CAC", v: "−18%", tone: "text-secondary" },
                  { k: "Activation", v: "+27%", tone: "text-accent" },
                  { k: "NPS", v: "68", tone: "text-primary" },
                ].map((m) => (
                  <div
                    key={m.k}
                    className="rounded-2xl border border-border bg-background p-4"
                  >
                    <div className="text-xs uppercase tracking-wider text-text-muted">
                      {m.k}
                    </div>
                    <div
                      className={cn(
                        "mt-1 font-display text-2xl font-bold",
                        m.tone
                      )}
                    >
                      {m.v}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs text-text-muted">
                Live data from the Vistaar partner portal. Connected to your
                stack, not a slide.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function PreviewCard({
  tag,
  title,
  items,
  tone,
}: {
  tag: string;
  title: string;
  items: string[];
  tone: "coral" | "blue" | "violet";
}) {
  const toneStyles = {
    coral: {
      text: "text-primary",
      dot: "bg-primary",
    },
    blue: {
      text: "text-secondary",
      dot: "bg-secondary",
    },
    violet: {
      text: "text-accent",
      dot: "bg-accent",
    },
  }[tone];
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-background p-5 transition-all hover:-translate-y-1 hover:shadow-card-hover">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-glow blur-2xl"
      />
      <div className="relative">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
          {tag}
        </div>
        <div className="mt-1 font-display text-lg font-semibold text-text-primary">
          {title}
        </div>
        <ul className="mt-4 space-y-2 text-sm text-text-secondary">
          {items.map((it) => (
            <li key={it} className="flex items-center gap-2">
              <Zap className={cn("h-3.5 w-3.5", toneStyles.text)} />
              {it}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ============================================================
   STATS
   ============================================================ */
const STATS = [
  { value: "200M+", label: "Brand Impressions Generated" },
  { value: "100+", label: "Brands Built" },
  { value: "1K+", label: "Workflows Automated" },
  { value: "10K+", label: "Leads Captured" },
];

function Stats() {
  return (
    <section className="relative border-y border-border bg-background-tint py-20">
      <Container>
        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i + 1}>
              <div className="text-center sm:text-left">
                <div className="font-display text-4xl font-bold text-text-primary sm:text-5xl">
                  <span className="bg-[image:var(--gradient-accent)] bg-clip-text text-transparent">
                    {s.value}
                  </span>
                </div>
                <div className="mt-1.5 text-xs uppercase tracking-wider text-text-muted sm:text-sm">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ============================================================
   COMPARISON — Vistaar vs traditional agency
   ============================================================ */
const COMPARISON = [
  {
    feature: "First conversation",
    vistaar: "Strategy-led discovery call within 24 hours",
    other: "Form submission → sales rep → proposal in 2 weeks",
  },
  {
    feature: "Working model",
    vistaar: "Embedded partner, async updates, shared workspace",
    other: "Weekly status decks, account manager handoffs",
  },
  {
    feature: "Strategy depth",
    vistaar: "Business, brand, and tech strategy from day one",
    other: "Strategy bolted on after the design is approved",
  },
  {
    feature: "AI integration",
    vistaar: "AI workflows, automations, agents built in-house",
    other: "AI added as a separate line item if you ask",
  },
  {
    feature: "Pricing",
    vistaar: "Transparent, milestone-based, no surprise retainers",
    other: "Opaque hours, scope creep, change-order fees",
  },
  {
    feature: "Post-launch",
    vistaar: "30 / 90 / 365-day growth reviews built in",
    other: "Launch, invoice, and disappear",
  },
];

function Comparison() {
  return (
    <section className="relative py-24 sm:py-28 lg:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Why teams pick Vistaar over a traditional agency.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
              Six honest differences you&rsquo;ll feel inside the first two weeks.
            </p>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="mt-14 overflow-hidden rounded-3xl border border-border bg-surface-strong shadow-card">
            <div className="grid grid-cols-12 border-b border-border bg-background-muted/40 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-text-muted sm:px-7">
              <div className="col-span-12 sm:col-span-4">What matters</div>
              <div className="col-span-6 sm:col-span-4">
                <span className="inline-flex items-center gap-1.5 text-primary">
                  <Check className="h-3.5 w-3.5" /> Vistaar
                </span>
              </div>
              <div className="col-span-6 sm:col-span-4">Traditional agency</div>
            </div>
            {COMPARISON.map((row, i) => (
              <div
                key={row.feature}
                className={cn(
                  "grid grid-cols-12 gap-3 px-5 py-5 text-sm sm:px-7",
                  i !== COMPARISON.length - 1 && "border-b border-border"
                )}
              >
                <div className="col-span-12 font-medium text-text-primary sm:col-span-4">
                  {row.feature}
                </div>
                <div className="col-span-6 text-text-secondary sm:col-span-4">
                  <span className="sm:hidden text-xs font-semibold uppercase text-primary">
                    Vistaar
                  </span>{" "}
                  {row.vistaar}
                </div>
                <div className="col-span-6 text-text-muted sm:col-span-4">
                  <span className="sm:hidden text-xs font-semibold uppercase text-text-muted">
                    Traditional
                  </span>{" "}
                  {row.other}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ============================================================
   TESTIMONIALS
   ============================================================ */
const TESTIMONIALS = [
  {
    quote:
      "Vistaar didn't just build us a website. They rebuilt how we think about growth. Six months in, our pipeline is up 3x and we finally have a brand we're proud to send into a room.",
    name: "Ananya Rao",
    role: "Co-founder, Helios",
    initials: "AR",
  },
  {
    quote:
      "The team embedded like an internal growth squad. AI workflows they built for us now handle 60% of our lead enrichment — what used to be four people is now one afternoon.",
    name: "Marcus Whitfield",
    role: "Head of Growth, Lattice",
    initials: "MW",
  },
  {
    quote:
      "We'd worked with three agencies before. Vistaar is the first team that brought us real strategy, not just deliverables. The brand book alone changed how our sales team pitches.",
    name: "Priya Mehta",
    role: "Founder, Aurelia",
    initials: "PM",
  },
];

function Testimonials() {
  return (
    <section className="relative py-24 sm:py-28 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-soft-tint"
      />
      <Halo tone="violet" className="top-24 left-1/2 -z-10 h-[420px] w-[560px] -translate-x-1/2" />
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Loved by founders and teams.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
              From first-time founders to public company leaders — the people
              we partner with tend to stick around.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i + 1}>
              <GlassCard
                tone={(["blue", "coral", "violet"] as const)[i % 3]}
                className="flex h-full flex-col p-7"
              >
                <Quote className="h-6 w-6 text-primary" />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-text-primary sm:text-base">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary">
                    {t.initials}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-text-primary">
                      {t.name}
                    </div>
                    <div className="text-xs text-text-muted">{t.role}</div>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ============================================================
   FAQ
   ============================================================ */
const FAQ_ITEMS = [
  {
    q: "How long does a typical project take?",
    a: "Most engagements run 8 to 16 weeks from kickoff to launch. A focused brand sprint can land in 3 weeks; a full SaaS build with AI workflows usually runs 3 to 6 months. We share a realistic timeline at the proposal stage — never a sales-pitch estimate.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Yes — and often. We have a pricing tier and a faster engagement model specifically designed for seed and Series A teams. If you're pre-funding, we can scope a small first sprint that delivers real value within your runway.",
  },
  {
    q: "Can I hire Vistaar for a single service?",
    a: "Absolutely. While we think the ecosystem model works best, plenty of clients come to us for one thing — a rebrand, a website rebuild, a marketing sprint — and stay for the rest. We'll be honest if a single-service engagement isn't the right move for you.",
  },
  {
    q: "How does your AI automation work in practice?",
    a: "We start by mapping the workflows that eat the most time — lead enrichment, customer support, content ops, reporting. Then we build AI agents, automations, and integrations that actually ship into your stack (HubSpot, Salesforce, Notion, your custom backend). Every workflow has measurable KPIs we report on monthly.",
  },
  {
    q: "Do you provide post-launch support?",
    a: "Yes. Every project includes a 30 / 90 / 365-day growth review. We also offer ongoing retainers for design, development, AI, and marketing — sized to your stage. Most clients stay with us for years, not weeks.",
  },
  {
    q: "Can you sign an NDA?",
    a: "Of course. Mutual NDAs are standard. We can also work inside your secure environment if your data requires it, and we're happy to start with a discovery call under NDA before sharing any specifics.",
  },
];

function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-24 sm:py-28 lg:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Questions founders ask us first.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
              If yours isn&rsquo;t here, the easiest path is a quick call.
            </p>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="mx-auto mt-14 max-w-8xl divide-y divide-border rounded-3xl border border-border bg-surface-strong">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-background-muted/40 sm:px-7"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-semibold text-text-primary sm:text-base">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 text-text-muted transition-transform",
                        isOpen && "rotate-180 text-primary"
                      )}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-6 text-sm leading-relaxed text-text-secondary sm:px-7">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ============================================================
   FINAL CTA
   ============================================================ */
function FinalCta() {
  return (
    <section className="relative py-24 sm:py-28 lg:py-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface-strong px-6 py-14 text-center shadow-elevated sm:px-12 sm:py-20">
            <Halo tone="coral" className="top-1/2 left-1/2 -z-0 h-[420px] w-[680px] -translate-x-1/2 -translate-y-1/2" />
            <Halo tone="blue" className="-top-10 -right-20 -z-0 h-[320px] w-[320px]" />
            <Halo tone="violet" className="-bottom-10 -left-20 -z-0 h-[320px] w-[320px]" />
            <div className="relative">
              <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
                Your next big idea deserves{" "}
                <span className="bg-[image:var(--gradient-accent)] bg-clip-text text-transparent">
                  the right partner.
                </span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
                Whether you&rsquo;re launching, rebranding, or scaling through
                AI — start with a free 30-minute strategy call. No pitch deck,
                no pressure.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="primary"
                    rightIcon={<ArrowRight className="h-5 w-5" />}
                  >
                    Start Your Project
                  </Button>
                </Link>
                <Link href="/method">
                  <Button
                    size="lg"
                    variant="secondary"
                    rightIcon={<ArrowUpRight className="h-5 w-5" />}
                  >
                    See Our Method
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function HomePage() {
  return (
    <main className="relative">
      <Hero />
      <TrustedBy />
      <ServicesOverview />
      <Showcase />
      <Stats />
      <Comparison />
      <Testimonials />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
