"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/button";
import { Container } from "@/components/layout";
import { PageHero, Stat } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Halo, GlassCard } from "@/components/halo";
import { cn } from "@/lib/utils";
import { useState } from "react";

/* ============================================================
   DATA
   ============================================================ */
const STORY = [
  {
    q: "Who are we?",
    body: "Vistaar is an AI-powered Brand Growth Company. We help startups, founders, and established businesses build meaningful brands, powerful digital experiences, and scalable business systems — under one strategy, under one team. We don't sell isolated services. We build ecosystems where branding, technology, AI, and marketing work together to produce measurable growth.",
  },
  {
    q: "What do we do?",
    body: "We help businesses at every stage of their journey — launching a startup, refreshing a brand, building a SaaS product, automating workflows, scaling campaigns, entering new markets. Our work combines creative thinking, business strategy, software development, AI solutions, and performance marketing into one connected ecosystem.",
  },
  {
    q: "How do we work?",
    body: "Every project follows a proven eight-phase methodology. We start by understanding your business, customers, competitors, and goals. Then we shape a strategy, design the experience, build the product, integrate AI, test ruthlessly, launch carefully, and stay on to optimize. Growth is not a single campaign — it's a system that evolves with you.",
  },
  {
    q: "Why choose Vistaar?",
    body: "Most agencies sell deliverables. We sell outcomes. You'll work with senior strategists, designers, engineers, and AI specialists — not a sales-led handoff chain. Strategy comes before execution. AI is part of the work, not an upsell. Pricing is transparent. And we measure success by your growth, not by the project ending.",
  },
];

const PRINCIPLES = [
  {
    title: "Strategy before execution",
    body: "We don't open Figma before we understand your business.",
  },
  {
    title: "One partner, every solution",
    body: "Branding, technology, AI, marketing, consulting — under one roof.",
  },
  {
    title: "AI-first thinking",
    body: "We treat AI as a default layer, not a separate line item.",
  },
  {
    title: "Transparent communication",
    body: "Async updates, shared workspace, no hidden retainers.",
  },
  {
    title: "Scalable systems",
    body: "Everything we build is designed to grow with your business.",
  },
  {
    title: "Long-term partnership",
    body: "We measure success by your growth over years, not weeks.",
  },
];

const TEAM = [
  {
    name: "Arjun Iyer",
    role: "Founder & Strategy Lead",
    bio: "12+ years across brand strategy, growth, and product. Previously led growth at two SaaS unicorns.",
    initials: "AI",
    tone: "coral" as const,
  },
  {
    name: "Sara Kapoor",
    role: "Head of Design",
    bio: "Brand identity and product design. Has shipped design systems used by 20M+ people.",
    initials: "SK",
    tone: "blue" as const,
  },
  {
    name: "Devansh Rao",
    role: "Head of Engineering",
    bio: "Full-stack architect. Loves clean code, fast pages, and solving impossible migration problems.",
    initials: "DR",
    tone: "violet" as const,
  },
  {
    name: "Maya Chen",
    role: "AI & Automation Lead",
    bio: "Builds production AI agents for B2B. Ex-researcher, current practitioner.",
    initials: "MC",
    tone: "pink" as const,
  },
];

/* ============================================================
   INTERACTIVE STORY ACCORDION
   ============================================================ */
function StorySection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="story" className="relative py-20 sm:py-24 lg:py-28">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-soft" />
              More than an agency
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              A growth partner, not a vendor.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
              The four answers every founder wants before they hire anyone.
            </p>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="mx-auto mt-12 max-w-full divide-y divide-border rounded-3xl border border-border bg-surface-strong shadow-card">
            {STORY.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className={cn(
                      "flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors sm:px-7",
                      isOpen ? "bg-primary-soft/40" : "hover:bg-background-muted/40"
                    )}
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={cn(
                          "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                          isOpen
                            ? "bg-primary text-white"
                            : "bg-background-muted text-text-muted"
                        )}
                      >
                        0{i + 1}
                      </span>
                      <span className="text-base font-semibold text-text-primary sm:text-lg">
                        {item.q}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border transition-transform",
                        isOpen && "rotate-45 bg-primary/10 text-primary"
                      )}
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-6 text-sm leading-relaxed text-text-secondary sm:px-7 sm:text-base">
                      <p>{item.body}</p>
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
   PRINCIPLES
   ============================================================ */
function Principles() {
  return (
    <section className="relative py-20 sm:py-24 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-soft-tint"
      />
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Six principles that shape every project.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
              We hold these as standards, not slogans. Every engagement, every
              team, every deliverable.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) + 1}>
              <GlassCard
                tone={(["coral", "blue", "violet"] as const)[i % 3]}
                className="h-full p-7"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-success/10 text-success">
                  <Check className="h-4 w-4" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-text-primary">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {p.body}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ============================================================
   STATS
   ============================================================ */
function Stats() {
  return (
    <section className="relative border-y border-border bg-background-tint py-20">
      <Container>
        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4">
          <Reveal delay={1}>
            <Stat value={<span className="bg-[image:var(--gradient-accent)] bg-clip-text text-transparent">100+</span>} label="Brands Built" />
          </Reveal>
          <Reveal delay={2}>
            <Stat value={<span className="bg-[image:var(--gradient-cool)] bg-clip-text text-transparent">1K+</span>} label="Workflows Automated" />
          </Reveal>
          <Reveal delay={3}>
            <Stat value={<span className="text-primary">40+</span>} label="Industries Served" />
          </Reveal>
          <Reveal delay={4}>
            <Stat value={<span className="text-accent">98%</span>} label="Retention Rate" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ============================================================
   TEAM
   ============================================================ */
function Team() {
  return (
    <section className="relative py-20 sm:py-24 lg:py-28">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              The people behind the work.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
              Senior strategists, designers, engineers, and AI specialists —
              in-house, not subcontracted.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={(i % 4) + 1}>
              <GlassCard tone={m.tone} className="h-full p-6">
                <div className="relative">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-glow blur-2xl"
                  />
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-soft text-base font-semibold text-primary">
                    {m.initials}
                  </div>
                  <h3 className="mt-5 font-display text-base font-semibold text-text-primary">
                    {m.name}
                  </h3>
                  <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-primary">
                    {m.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {m.bio}
                  </p>
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
   CTA
   ============================================================ */
function AboutCta() {
  return (
    <section className="relative py-20">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface-strong px-6 py-12 text-center shadow-elevated sm:px-12">
            <Halo tone="coral" className="top-1/2 left-1/2 -z-0 h-[360px] w-[600px] -translate-x-1/2 -translate-y-1/2" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl">
                Ready to build something that lasts?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
                Start with a 30-minute call. We&rsquo;ll share our honest take on
                what you&rsquo;re working on — no pitch, no pressure.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/contact">
                  <Button size="lg" variant="primary" rightIcon={<ArrowRight className="h-5 w-5" />}>
                    Start Your Project
                  </Button>
                </Link>
                <Link href="/method">
                  <Button size="lg" variant="secondary" rightIcon={<ArrowUpRight className="h-5 w-5" />}>
                    See How We Work
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
export default function AboutPage() {
  return (
    <main className="relative">
      <PageHero
        eyebrow="About Vistaar"
        title="More than an agency."
        highlight="A growth partner."
        description="We exist for founders and businesses who want more than deliverables. Strategy, brand, technology, and AI — under one vision, one team, one partnership."
      >
        <Link href="/contact">
          <Button size="lg" variant="primary" rightIcon={<ArrowRight className="h-5 w-5" />}>
            Start a Conversation
          </Button>
        </Link>
        <Link href="/services">
          <Button size="lg" variant="secondary" rightIcon={<ArrowUpRight className="h-5 w-5" />}>
            See What We Do
          </Button>
        </Link>
      </PageHero>

      <StorySection />
      <Stats />
      <Principles />
      <Team />
      <AboutCta />
    </main>
  );
}
