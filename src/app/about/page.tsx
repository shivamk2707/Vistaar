"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";
import { Button } from "@/components/button";
import { Container, Section, SectionHeading } from "@/components/layout";
import { Reveal } from "@/components/reveal";
import { WhatsAppButton } from "@/components/whatsapp-button";
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
  { value: "10+", label: "Brand Build" },
  { value: "30+", label: "Projects Delivered" },
  { value: "8+", label: "Industries Served" },
  { value: "5+", label: "Digital Products Built" },
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
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const cardGradients = [
    "from-blue-600/40 to-blue-900/10",
    "from-emerald-600/40 to-emerald-900/10",
    "from-orange-600/40 to-orange-900/10",
    "from-fuchsia-600/40 to-fuchsia-900/10",
    "from-sky-600/40 to-sky-900/10",
    "from-violet-600/40 to-violet-900/10",
  ];

  return (
    <Section className="bg-[var(--canvas)] relative overflow-hidden">
      <Container className="relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow="Working principles"
            title="Six principles that shape every project."
            description="We hold these as standards, not slogans. Every engagement, every team, every deliverable."
          />
        </Reveal>

        <div
          className="mt-20 flex flex-col lg:flex-row w-full h-[800px] lg:h-[550px] gap-4"
          onMouseLeave={() => setHoveredIndex(0)}
        >
          {PRINCIPLES.map((p, i) => {
            const isActive = hoveredIndex === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                className={cn(
                  "group relative overflow-hidden rounded-[32px] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer border",
                  isActive
                    ? "lg:flex-[4] flex-[3] border-white/20 shadow-[0_8px_40px_rgba(255,255,255,0.05)] bg-white/5"
                    : "lg:flex-[1] flex-[1] border-white/5 bg-transparent",
                )}
              >
                {/* Background Glows */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br transition-opacity duration-700",
                  isActive ? "opacity-100" : "opacity-0",
                  cardGradients[i]
                )} />

                {/* Subtle base noise/texture */}
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                {/* Content Container */}
                <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-between">
                  {/* Top: Number & Icon */}
                  <div className="flex items-center justify-between">
                    <span className={cn(
                      "font-bold transition-all duration-700 tracking-tighter",
                      isActive ? "text-5xl lg:text-7xl text-white/50" : "text-2xl text-white/20"
                    )}>
                      0{i + 1}
                    </span>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="h-14 w-14 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md shadow-inner border border-white/20"
                      >
                        <Check className="h-7 w-7 text-white" />
                      </motion.div>
                    )}
                  </div>

                  {/* Bottom: Titles & Content */}
                  <div className="relative h-full flex items-end">

                    {/* Active Content */}
                    <div className={cn(
                      "absolute bottom-0 left-0 w-full flex flex-col gap-4 transition-all duration-700",
                      isActive ? "opacity-100 translate-y-0 delay-200" : "opacity-0 translate-y-8 pointer-events-none"
                    )}>
                      <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight max-w-md">
                        {p.title}
                      </h3>
                      <p className="text-white/70 text-base leading-relaxed max-w-sm">
                        {p.body}
                      </p>
                    </div>

                    {/* Inactive Content - Vertical on Desktop, Horizontal on Mobile */}
                    <div className={cn(
                      "absolute inset-0 w-full flex flex-col justify-end transition-all duration-700 origin-bottom",
                      isActive ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100 delay-200"
                    )}>
                      {/* Desktop vertical title */}
                      <div className="hidden lg:flex w-full items-end justify-center h-full pb-6">
                        <h3
                          className="text-lg font-bold text-white/40 whitespace-nowrap uppercase tracking-[0.2em]"
                          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                        >
                          {p.title}
                        </h3>
                      </div>

                      {/* Mobile horizontal title */}
                      <h3 className="lg:hidden text-lg font-bold text-white/40 whitespace-nowrap truncate w-full text-center pb-2">
                        {p.title}
                      </h3>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
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
            size="md"
            variant="secondary-mint"
            className="rounded-full text-sm font-semibold shadow-sm transition-all group-hover:shadow-md"
            rightIcon={<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
            href="/contact"
          >
            Start a conversation
          </Button>
          <Button
            size="md"
            variant="secondary-white"
            className="rounded-full text-sm font-semibold shadow-sm transition-all group-hover:shadow-md"
            rightIcon={<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
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
   TRUST SECTION
   ============================================================ */
function TrustSection() {
  return (
    <Section className="bg-[var(--canvas)] relative overflow-hidden py-24 sm:py-32">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image Side */}
          <Reveal direction="right" className="relative order-2 lg:order-1">
            <div className="relative rounded-[32px] overflow-hidden aspect-[4/5] lg:aspect-square bg-zinc-900 border border-white/5 shadow-2xl group">
              <img
                src="/images/about/trust_years.png"
                alt="Trust and Excellence"
                className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

              {/* Floating Badge */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl"
              >
                <div className="flex items-center gap-5">
                  <div className="text-5xl sm:text-6xl font-bold text-white tracking-tighter">8<span className="text-blue-400">+</span></div>
                  <div className="text-[13px] sm:text-sm font-bold text-white/80 uppercase tracking-widest leading-tight">
                    Industries<br />Served
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>

          {/* Text Side */}
          <div className="relative order-1 lg:order-2">
            <Reveal direction="left">
              <span className="mono-eyebrow text-blue-400 mb-6 block">Our Legacy</span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8 leading-[1.1]">
                A decade of trust, built <span className="text-white/40">one successful partnership at a time.</span>
              </h2>
              <p className="text-lg text-zinc-400 leading-relaxed mb-12 max-w-xl">
                At Vistaar, we don&rsquo;t just deliver projects; we forge enduring partnerships. Over the past 1 year, we&rsquo;ve helped hundreds of businesses navigate the complexities of digital transformation, scale their operations, and redefine their brand presence on a global scale.
              </p>

              <div className="grid sm:grid-cols-2 gap-8 max-w-xl">
                <div>
                  <div className="text-4xl font-bold text-white mb-2 tracking-tighter">10+</div>
                  <div className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Brands Build</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-2 tracking-tighter">98%</div>
                  <div className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Clients Satisfaction</div>
                </div>
                <div className="sm:col-span-2 pt-8 border-t border-white/10 mt-2">
                  <p className="text-sm text-zinc-500 italic leading-relaxed">
                    &quot;Trust is the ultimate currency of business. We measure our success not by the number of projects we launch, but by the number of clients who choose to stay with us year after year.&quot;
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function AboutPage() {
  return (
    <main className="relative">
      <GlassHero />
      <TrustSection />

      <StorySection />
      <Stats />
      <Principles />

      <WhatsAppButton />
    </main>
  );
}
