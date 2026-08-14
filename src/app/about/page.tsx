"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";
import { Button } from "@/components/button";
import { Container, Section, SectionHeading } from "@/components/layout";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

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
  },
  {
    name: "Sara Kapoor",
    role: "Head of Design",
    bio: "Brand identity and product design. Has shipped design systems used by 20M+ people.",
    initials: "SK",
  },
  {
    name: "Devansh Rao",
    role: "Head of Engineering",
    bio: "Full-stack architect. Loves clean code, fast pages, and solving impossible migration problems.",
    initials: "DR",
  },
  {
    name: "Maya Chen",
    role: "AI & Automation Lead",
    bio: "Builds production AI agents for B2B. Ex-researcher, current practitioner.",
    initials: "MC",
  },
];

const STATS = [
  { value: "100+", label: "Brands Built" },
  { value: "1K+", label: "Workflows Automated" },
  { value: "40+", label: "Industries Served" },
  { value: "98%", label: "Retention Rate" },
];

/* ============================================================
   STORY ACCORDION
   ============================================================ */
function StorySection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section className="bg-[var(--canvas)]" id="story">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="More than an agency"
            title="A growth partner, not a vendor."
            description="The four answers every founder wants before they hire anyone."
          />
        </Reveal>

        <Reveal delay={1}>
          <div className="mx-auto mt-14 max-w-3xl divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
            {STORY.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:bg-white/5"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={cn(
                          "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-medium",
                          isOpen
                            ? "bg-[var(--ink)] text-[var(--canvas)]"
                            : "bg-[var(--hairline)] text-[var(--body)]"
                        )}
                      >
                        0{i + 1}
                      </span>
                      <span className="text-[18px] font-medium text-[var(--ink)]">
                        {item.q}
                      </span>
                    </div>
                    <Plus
                      className={cn(
                        "h-4 w-4 shrink-0 text-[var(--body)] transition-transform",
                        isOpen && "rotate-45 text-[var(--ink)]"
                      )}
                    />
                  </button>
                  {isOpen && (
                    <div className="pb-6 pl-13 pr-10 text-[15px] leading-[1.5] text-[var(--body)] sm:pl-[52px]">
                      {item.body}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ============================================================
   STATS — dark band
   ============================================================ */
function Stats() {
  return (
    <Section tone="dark" className="bg-[var(--canvas-dark)]">
      <Container>
        <Reveal>
          <span className="mono-eyebrow text-[var(--on-dark)] opacity-70">
            By the numbers
          </span>
          <h2 className="mt-4 text-display-xl text-[var(--on-dark)] max-w-2xl">
            Outcomes, not deliverables.
          </h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i + 1}>
              <div className="rounded-[4px] bg-[var(--surface-dark-soft)] p-8">
                <div className="text-[40px] font-medium leading-[1.1] tracking-[-0.02em] text-[var(--on-dark)]">
                  {s.value}
                </div>
                <div className="mt-3 mono-eyebrow text-[var(--on-dark)] opacity-70">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   PRINCIPLES
   ============================================================ */
function Principles() {
  const cardGradients = [
    "from-blue-500/20 via-indigo-500/10 to-purple-500/20",
    "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
    "from-orange-500/20 via-rose-500/10 to-red-500/20",
    "from-fuchsia-500/20 via-pink-500/10 to-rose-500/20",
    "from-amber-500/20 via-yellow-500/10 to-orange-500/20",
    "from-violet-500/20 via-purple-500/10 to-fuchsia-500/20",
  ];

  const renderParticles = (i: number) => {
    const isEven = i % 2 === 0;
    return (
      <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 overflow-hidden pointer-events-none z-0">
        {/* Soft glowing orbs */}
        <div className={`absolute ${isEven ? '-top-4 -left-4' : '-bottom-4 -right-4'} h-24 w-24 rounded-full bg-indigo-500/10 blur-xl animate-float-slow`}></div>
        <div className={`absolute ${isEven ? 'bottom-8 right-8' : 'top-8 left-8'} h-16 w-16 rounded-full bg-fuchsia-500/10 blur-lg animate-float-slow`} style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/4 left-1/4 h-20 w-20 rounded-full bg-orange-500/10 blur-2xl animate-pulse-soft" style={{ animationDelay: '2s' }}></div>

        {/* Geometric structures / particles */}
        <svg className={`absolute ${isEven ? 'top-1/4 right-1/4' : 'bottom-1/4 left-1/4'} h-4 w-4 text-indigo-500/30 animate-pulse-soft`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12h14" />
        </svg>
        <svg className={`absolute ${isEven ? 'bottom-1/3 right-1/2' : 'top-1/3 left-1/2'} h-3 w-3 text-fuchsia-500/30 animate-float-slow`} style={{ animationDelay: '1.5s' }} viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" />
        </svg>
        <svg className={`absolute ${isEven ? 'top-1/2 left-8' : 'bottom-1/2 right-8'} h-5 w-5 text-orange-500/30 animate-pulse-soft`} style={{ animationDelay: '0.5s' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L15 8L22 9L17 14L18 21L12 17.5L6 21L7 14L2 9L9 8L12 2Z" />
        </svg>
      </div>
    );
  };

  return (
    <Section className="bg-[var(--canvas)]">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Working principles"
            title="Six principles that shape every project."
            description="We hold these as standards, not slogans. Every engagement, every team, every deliverable."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) + 1}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--canvas)] p-8 transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 hover:border-transparent">
                {/* Animated gradient background on hover */}
                <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br ${cardGradients[i]} animate-gradient-shift pointer-events-none z-0`}></div>

                {/* Particle Effects */}
                {renderParticles(i)}

                {/* Top gradient border highlight on hover */}
                <div className="absolute top-0 left-0 h-1 w-full scale-x-0 bg-gradient-brand transition-transform duration-500 origin-left group-hover:scale-x-100 pointer-events-none z-10"></div>

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--ink)] text-[var(--canvas)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 shadow-sm">
                    <Check className="h-5 w-5" />
                  </div>
                  <h3 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.01em] text-[var(--ink)] transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.6] text-[var(--body)] transition-colors duration-300 group-hover:text-[var(--ink)]">
                    {p.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   GLASS HERO
   ============================================================ */
function GlassHero() {
  return (
    <div
      className="flex min-h-[80vh] items-center justify-center bg-cover bg-center px-4 pt-28 pb-12 sm:pt-32 sm:pb-16"
      style={{ backgroundImage: 'url("https://img.magnific.com/free-vector/dark-background-with-dynamic-shapes_361591-3104.jpg?semt=ais_hybrid&w=740&q=80")' }}
    >
      <div className="bg-white/10 backdrop-blur-lg p-10 sm:p-14 rounded-2xl shadow-2xl max-w-3xl w-full text-center">
        <span className="mono-eyebrow text-white mb-6 block uppercase tracking-wider text-sm font-semibold opacity-90">About Vistaar</span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white mb-6 leading-tight">
          <Reveal direction="up" className="block">
            More than an agency.
          </Reveal>
          <Reveal direction="down" delay={1} className="block -mt-4">
            <span className="text-gradient-brand">A growth partner.</span>
          </Reveal>
        </h1>
        <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          We exist for founders and businesses who want more than deliverables. Strategy, brand, technology, and AI — under one vision, one team, one partnership.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            variant="secondary-mint"
            className="text-black"
            rightIcon={<ArrowRight className="h-4 w-4" />}
            href="/contact"
          >
            Start a conversation
          </Button>
          <Button
            size="lg"
            variant="secondary-white"
            rightIcon={<ArrowUpRight className="h-4 w-4" />}
            href="/services"
          >
            See what we do
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function AboutPage() {
  return (
    <main className="relative">
      <GlassHero />

      <StorySection />
      <Stats />
      <Principles />
    </main>
  );
}
