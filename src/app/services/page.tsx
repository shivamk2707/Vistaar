"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/button";
import { Container } from "@/components/layout";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Halo, GlassCard } from "@/components/halo";
import { cn } from "@/lib/utils";

/* ============================================================
   DATA
   ============================================================ */
const ECOSYSTEM = [
  {
    id: "consulting",
    title: "Business Intelligence",
    Icon: Sparkles,
    tagline: "Clarity before code.",
    description:
      "Every successful business starts with clarity. Before designing a website or launching a campaign, we understand your business model, market, competitors, customers, and future goals.",
    services: [
      "Business Consulting",
      "Startup Consulting",
      "Business Growth Strategy",
      "Market Research",
      "Competitor Analysis",
      "Digital Transformation",
      "Revenue Growth Planning",
      "Go-To-Market Strategy",
    ],
    tone: "coral" as const,
  },
  {
    id: "branding",
    title: "Brand Studio",
    Icon: Sparkles,
    tagline: "More than a logo.",
    description:
      "Your brand is more than a logo. It's the perception people have when they think about your business. We create memorable brand identities that communicate trust, professionalism, and purpose.",
    services: [
      "Brand Identity Design",
      "Logo Design",
      "Brand Guidelines",
      "Color System",
      "Typography",
      "Visual Identity",
      "Packaging Design",
      "Rebranding",
    ],
    tone: "violet" as const,
  },
  {
    id: "engineering",
    title: "Digital Engineering",
    Icon: Sparkles,
    tagline: "Built to scale.",
    description:
      "Technology is the foundation of modern businesses. Our engineering team creates scalable digital experiences that are secure, responsive, and built for long-term growth.",
    services: [
      "Website Development",
      "Landing Pages",
      "Corporate Websites",
      "E-Commerce",
      "Web Applications",
      "Mobile Applications",
      "SaaS Platforms",
      "API Integration",
    ],
    tech: ["React", "Next.js", "Node.js", "Tailwind CSS", "TypeScript"],
    tone: "blue" as const,
  },
  {
    id: "ai",
    title: "AI & Automation Lab",
    Icon: Sparkles,
    tagline: "Less busywork, more output.",
    description:
      "Businesses shouldn't waste time on repetitive work. We build AI-powered systems that automate workflows, improve productivity, and enable smarter decision-making.",
    services: [
      "AI Automation",
      "AI Chatbots",
      "Workflow Automation",
      "CRM Automation",
      "Email Automation",
      "WhatsApp Automation",
      "AI Agents",
      "Process Optimization",
    ],
    tone: "violet" as const,
  },
  {
    id: "creative",
    title: "Creative Lab",
    Icon: Sparkles,
    tagline: "Every detail, intentional.",
    description:
      "Every interaction with your audience should leave an impression. Our creative team transforms ideas into visually engaging experiences across digital and physical platforms.",
    services: [
      "UI/UX Design",
      "Graphic Design",
      "Motion Graphics",
      "Video Editing",
      "Product Mockups",
      "Presentation Design",
      "Social Media Creatives",
      "Print Design",
    ],
    tone: "coral" as const,
  },
  {
    id: "growth",
    title: "Growth Marketing",
    Icon: Sparkles,
    tagline: "Right message, right time.",
    description:
      "Marketing isn't about posting every day. It's about reaching the right audience with the right message at the right time. We build data-driven campaigns focused on sustainable business growth.",
    services: [
      "Digital Marketing",
      "Performance Marketing",
      "SEO",
      "Google Ads",
      "Meta Ads",
      "LinkedIn Marketing",
      "Email Marketing",
      "Analytics & Reporting",
    ],
    tone: "blue" as const,
  },
];

/* ============================================================
   ECOSYSTEM MAP — root/tree layout
   VISTAAR sits at the top as the root; all six practices branch
   down from it. Swap this in to replace the existing
   EcosystemMap function in src/app/services/page.tsx
   ============================================================ */
   function EcosystemMap({ activeId, onSelect }: { activeId: string; onSelect: (id: string) => void }) {
    const root = { x: 50, y: 10 };
  
    const nodes = [
      { id: "consulting", label: "Business Intelligence", x: 15, y: 45 },
      { id: "branding", label: "Brand Design", x: 50, y: 45 },
      { id: "engineering", label: "Engineering", x: 85, y: 45 },
      { id: "ai", label: "AI & Automation", x: 15, y: 82 },
      { id: "creative", label: "Creative", x: 50, y: 82 },
      { id: "growth", label: "Growth", x: 85, y: 82 },
    ];
  
    return (
      <div className="relative aspect-[4/3] w-full">
        <Halo tone="blue" className="top-1/2 left-1/2 -z-0 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2" />
  
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          {/* Branches: root → each node */}
          {nodes.map((n) => (
            <line
              key={`root-${n.id}`}
              x1={root.x}
              y1={root.y}
              x2={n.x}
              y2={n.y}
              stroke={activeId === n.id ? "#ff5a36" : "#e2e6ef"}
              strokeWidth={activeId === n.id ? 0.5 : 0.25}
              strokeOpacity={activeId === n.id ? 0.85 : 0.5}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
  
        {/* Root node */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${root.x}%`, top: `${root.y}%` }}
        >
          <div className="rounded-full border border-primary bg-background-elevated px-5 py-2.5 text-sm font-bold tracking-wider text-primary shadow-coral">
            VISTAAR
          </div>
        </div>
  
        {/* Practice nodes */}
        {nodes.map((n) => {
          const isActive = activeId === n.id;
          return (
            <button
              key={n.id}
              type="button"
              onClick={() => onSelect(n.id)}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-border bg-background-elevated px-3.5 py-2 text-xs font-medium shadow-card transition-all hover:scale-105",
                isActive && "scale-110 border-primary text-primary shadow-coral"
              )}
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              {n.label}
            </button>
          );
        })}
      </div>
    );
  }
/* ============================================================
   STACKED SERVICES — sticky-stack pattern
   ------------------------------------------------------------
   Each card is `position: sticky; top: <offset>`. Because later
   cards sit later in the DOM and get a higher z-index, they
   naturally slide up and cover the previous card as you scroll —
   no manual scroll-range math, no pin desync, works at any
   viewport height out of the box.

   GSAP layers on top for polish only:
     - each card fades/slides in the first time it's revealed
     - as the NEXT card arrives, the current card scales down,
       dims, and blurs slightly to read as "receding" underneath
   ============================================================ */
function StackedServices() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const cards = cardRefs.current.filter((el): el is HTMLDivElement => Boolean(el));
    if (cards.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const scrollTriggers: ScrollTrigger[] = [];

      cards.forEach((card, i) => {
        // Entrance: fade/slide up the first time each card comes into view
        const enterTween = gsap.fromTo(
          card,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
        if (enterTween.scrollTrigger) scrollTriggers.push(enterTween.scrollTrigger);

        // Recede: as the NEXT card slides in over this one, scale/dim it
        const next = cards[i + 1];
        if (next) {
          const recedeTween = gsap.fromTo(
            card,
            { scale: 1, opacity: 1, filter: "blur(0px)" },
            {
              scale: 0.94,
              opacity: 0.55,
              filter: "blur(1px)",
              ease: "none",
              scrollTrigger: {
                trigger: next,
                start: "top bottom",
                end: "top top",
                scrub: true,
              },
            }
          );
          if (recedeTween.scrollTrigger) scrollTriggers.push(recedeTween.scrollTrigger);
        }
      });

      return () => {
        scrollTriggers.forEach((t) => t.kill());
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="relative py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl px-5 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-soft" />
              The Six-Part Ecosystem
            </span>
            <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-text-primary sm:text-5xl">
              One stack. <span className="text-primary">Six services.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
              Scroll to peel the stack — each practice slides into place, layered over the last.
            </p>
          </div>
        </Reveal>
      </Container>

      <div className="relative mt-14">
        {ECOSYSTEM.map((item, i) => (
          <div
            key={item.id}
            id={item.id}
            className="sticky top-[6vh] pb-10 sm:top-[14vh]"
            style={{ zIndex: i + 1 }}
          >
            <div
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="mx-auto w-[94%] origin-top will-change-transform"
              style={{ maxWidth: "1100px" }}
            >
              <GlassCard tone={item.tone} className="relative overflow-hidden p-0 shadow-elevated">
                {/* Top progress strip */}
                <div className="flex items-center justify-between border-b border-border bg-background-soft/60 px-5 py-2.5 text-[11px] sm:px-7">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-primary font-semibold">0{i + 1}</span>
                    <span className="text-text-muted">/ 0{ECOSYSTEM.length}</span>
                  </div>
                  <span className="hidden text-text-muted sm:inline">{item.tagline}</span>
                  <span className="text-text-muted">Vistaar · 2026</span>
                </div>

                {/* Two-column body — stacks to 1 column below lg */}
                <div className="grid grid-cols-1 lg:grid-cols-12 lg:min-h-[420px]">
                  <div className="flex flex-col justify-center p-7 sm:p-9 lg:col-span-5">
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                      <span className="font-display text-sm not-italic">0{i + 1}</span>
                      <span className="h-1 w-1 rounded-full bg-text-muted" />
                      {item.tagline}
                    </div>
                    <h3
                      className="mt-4 font-display text-2xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-3xl"
                      style={{ letterSpacing: "-0.025em" }}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">{item.description}</p>
                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      <Link href="/contact">
                        <Button size="sm" variant="primary" rightIcon={<ArrowUpRight className="h-3.5 w-3.5" />}>
                          Discuss this
                        </Button>
                      </Link>
                      <Link href="/method">
                        <Button size="sm" variant="secondary" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                          See the process
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="border-t border-border bg-surface/40 p-7 sm:p-9 lg:col-span-7 lg:border-l lg:border-t-0">
                    <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                      What&rsquo;s included
                    </h3>
                    <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                      {item.services.slice(0, 8).map((s) => (
                        <li key={s} className="flex items-start gap-2 text-sm text-text-primary">
                          <span
                            className={cn(
                              "mt-0.5 inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full",
                              item.tone === "coral" && "bg-primary-soft text-primary",
                              item.tone === "blue" && "bg-secondary-soft text-secondary",
                              item.tone === "violet" && "bg-accent-soft text-accent"
                            )}
                          >
                            <Check className="h-2 w-2" />
                          </span>
                          {s}
                        </li>
                      ))}
                    </ul>
                    {item.tech && (
                      <div className="mt-5 border-t border-border pt-4">
                        <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted">Tech</h3>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {item.tech.slice(0, 5).map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[10px] text-text-secondary"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   HOW EVERYTHING CONNECTS — flow diagram
   ============================================================ */
const FLOW = [
  "Business Idea",
  "Business Strategy",
  "Brand Identity",
  "Website Development",
  "Marketing",
  "Lead Generation",
  "AI Automation",
  "Business Growth",
  "Scale",
];

function Flow() {
  return (
    <section className="relative py-20 sm:py-24 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-soft-tint" />
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              How everything connects.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
              One flow, no dead ends. Each service feeds the next.
            </p>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="mx-auto mt-12 max-w-5xl">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {FLOW.map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <span
                    className={cn(
                      "rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium shadow-sm",
                      i === FLOW.length - 1 && "border-primary bg-primary text-white shadow-coral",
                      i === 0 && "border-secondary bg-secondary text-white shadow-blue"
                    )}
                  >
                    {step}
                  </span>
                  {i < FLOW.length - 1 && (
                    <span className="text-text-muted" aria-hidden>
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ============================================================
   WHY GROWTH ECOSYSTEM
   ============================================================ */
const REASONS = [
  {
    title: "Strategy before execution",
    body: "Every project starts with understanding the business, not jumping into design or development.",
  },
  {
    title: "One partner, every solution",
    body: "Branding, technology, AI, marketing, and consulting — all under one roof.",
  },
  {
    title: "AI-first thinking",
    body: "Modern businesses need intelligent systems, not just digital assets.",
  },
  {
    title: "Scalable solutions",
    body: "Every solution is designed to grow alongside your business.",
  },
  {
    title: "Data-driven decisions",
    body: "We rely on research, analytics, and measurable outcomes rather than assumptions.",
  },
  {
    title: "Long-term partnership",
    body: "We measure success by your growth over time, not by the completion of a project.",
  },
];

/* ============================================================
   PAGE
   ============================================================ */
export default function ServicesPage() {
  const handleSelect = (id: string) => {
    if (typeof document !== "undefined") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="relative">
      <PageHero
        eyebrow="The Growth Ecosystem"
        title="Everything your business needs."
        highlight="Under one vision."
        description="Six connected practices that work as a single growth system. Mix them, sequence them, or hand us the whole map. Each one reinforces the others."
      >
        <Link href="/contact">
          <Button size="lg" variant="primary" rightIcon={<ArrowRight className="h-5 w-5" />}>
            Start a Project
          </Button>
        </Link>
        <Link href="/method">
          <Button size="lg" variant="secondary" rightIcon={<ArrowUpRight className="h-5 w-5" />}>
            See Our Method
          </Button>
        </Link>
      </PageHero>

      {/* Ecosystem map */}
      <section className="relative py-20 sm:py-24">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-2xl font-bold leading-tight text-text-primary sm:text-3xl">
                One ecosystem. Six connected practices.
              </h2>
              <p className="mt-3 text-sm text-text-secondary sm:text-base">Click any node to jump to its detail.</p>
            </div>
          </Reveal>
          <Reveal delay={1}>
            {/* <GlassCard tone="blue" className="mx-auto mt-10 max-w-4xl p-6 sm:p-10"> */}
              <EcosystemMap activeId="consulting" onSelect={handleSelect} />
            {/* </GlassCard> */}
          </Reveal>
        </Container>
      </section>

      {/* The GSAP-driven sticky-stacked service section */}
      <StackedServices />

      <Flow />

      <section className="relative py-20 sm:py-24 lg:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
                Why the ecosystem model works.
              </h2>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {REASONS.map((r, i) => (
              <Reveal key={r.title} delay={(i % 3) + 1}>
                <GlassCard tone={(["coral", "blue", "violet"] as const)[i % 3]} className="h-full p-7">
                  <h3 className="font-display text-lg font-semibold text-text-primary">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{r.body}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative py-20">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface-strong px-6 py-12 text-center shadow-elevated sm:px-12">
              <Halo tone="coral" className="top-1/2 left-1/2 -z-0 h-[360px] w-[600px] -translate-x-1/2 -translate-y-1/2" />
              <div className="relative">
                <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl">
                  Ready to build something bigger than a website?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
                  Let&rsquo;s design a brand, build intelligent systems, and create a business that grows with
                  confidence.
                </p>
                <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link href="/contact">
                    <Button size="lg" variant="primary" rightIcon={<ArrowRight className="h-5 w-5" />}>
                      Start Your Project
                    </Button>
                  </Link>
                  <Link href="/method">
                    <Button size="lg" variant="secondary" rightIcon={<ArrowUpRight className="h-5 w-5" />}>
                      Schedule a Discovery Call
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
