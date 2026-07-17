"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Sparkles, type LucideIcon } from "lucide-react";
import { Button } from "@/components/button";
import { Container } from "@/components/layout";
import { PageHero, Stat } from "@/components/page-hero";
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
      "Brand Positioning",
      "Customer Journey Mapping",
    ],
    deliverables: [
      "Growth Roadmap",
      "Business Strategy Document",
      "Market Analysis Report",
      "SWOT Analysis",
      "Digital Transformation Plan",
      "Quarterly Growth Strategy",
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
      "Stationery Design",
      "Rebranding",
      "Employer Branding",
      "Personal Branding",
    ],
    deliverables: [
      "Logo Package",
      "Brand Book",
      "Brand Guidelines",
      "Social Media Kit",
      "Print Assets",
      "Digital Brand Assets",
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
      "Portfolio Websites",
      "E-Commerce",
      "Web Applications",
      "Mobile Applications",
      "SaaS Platforms",
      "Dashboard Development",
      "API Integration",
      "CRM Development",
      "Maintenance & Support",
    ],
    deliverables: [
      "Production Website",
      "Admin Dashboard",
      "API Documentation",
      "Source Code",
      "Deployment Environment",
    ],
    tech: ["React", "Next.js", "Node.js", "Tailwind CSS", "TypeScript", "MongoDB", "Supabase", "Firebase", "Vercel", "Docker"],
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
      "Business Intelligence Dashboards",
      "Process Optimization",
      "Custom AI Solutions",
    ],
    benefits: [
      "Reduce manual work",
      "Save operational costs",
      "Improve customer support",
      "Faster response time",
      "Better decision-making",
      "Increased productivity",
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
      "Event Branding",
      "Marketing Collaterals",
      "Print Design",
    ],
    deliverables: [
      "Design Systems",
      "Marketing Assets",
      "Brand Templates",
      "Presentation Decks",
      "Social Media Packs",
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
      "Content Strategy",
      "Social Media Management",
      "Influencer Campaigns",
      "Analytics & Reporting",
    ],
    kpis: [
      "Lead Generation",
      "Conversion Rate",
      "ROI",
      "Brand Reach",
      "Customer Retention",
      "Website Traffic",
      "Engagement Rate",
    ],
    tone: "blue" as const,
  },
];

/* ============================================================
   ECOSYSTEM MAP — visual node graph
   ============================================================ */
function EcosystemMap({ activeId, onSelect }: { activeId: string; onSelect: (id: string) => void }) {
  const nodes = [
    { id: "consulting", label: "Strategy", x: 50, y: 18, tone: "coral" as const },
    { id: "branding", label: "Branding", x: 16, y: 42, tone: "violet" as const },
    { id: "engineering", label: "Engineering", x: 84, y: 42, tone: "blue" as const },
    { id: "ai", label: "AI & Automation", x: 26, y: 78, tone: "violet" as const },
    { id: "creative", label: "Creative", x: 74, y: 78, tone: "coral" as const },
    { id: "growth", label: "Growth", x: 50, y: 92, tone: "blue" as const },
  ];
  return (
    <div className="relative aspect-[4/3] w-full">
      <Halo tone="blue" className="top-1/2 left-1/2 -z-0 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2" />
      {/* SVG connecting lines */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {nodes.map((a, i) =>
          nodes.slice(i + 1).map((b) => (
            <line
              key={`${a.id}-${b.id}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={activeId === a.id || activeId === b.id ? "#ff5a36" : "#e2e6ef"}
              strokeWidth={activeId === a.id || activeId === b.id ? 0.5 : 0.25}
              strokeOpacity={activeId === a.id || activeId === b.id ? 0.8 : 0.5}
              vectorEffect="non-scaling-stroke"
            />
          ))
        )}
      </svg>
      {/* Center label */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="rounded-full border border-border bg-background-elevated px-4 py-2 text-xs font-semibold tracking-wider shadow-card">
          VISTAAR
        </div>
      </div>
      {/* Nodes */}
      {nodes.map((n) => {
        const isActive = activeId === n.id;
        return (
          <button
            key={n.id}
            type="button"
            onClick={() => onSelect(n.id)}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-background-elevated px-3.5 py-2 text-xs font-medium shadow-card transition-all hover:scale-105",
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
   SERVICE SECTION
   ============================================================ */
function ServiceSection({
  index,
  item,
  onSelect,
}: {
  index: number;
  item: (typeof ECOSYSTEM)[number];
  onSelect: (id: string) => void;
}) {
  const reverse = index % 2 === 1;
  const toneClasses: Record<string, string> = {
    coral: "bg-primary-soft text-primary",
    blue: "bg-secondary-soft text-secondary",
    violet: "bg-accent-soft text-accent",
  };
  return (
    <section
      id={item.id}
      className="relative py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div
          className={cn(
            "grid items-start gap-10 lg:grid-cols-12 lg:gap-16",
            reverse && "lg:[&>*:first-child]:order-2"
          )}
        >
          <div className="lg:col-span-5">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                <span className="font-display text-base not-italic">
                  0{index + 1}
                </span>
                <span className="h-1 w-1 rounded-full bg-text-muted" />
                {item.tagline}
              </div>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl">
                {item.title}
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">
                {item.description}
              </p>
            </Reveal>
            <Reveal delay={3}>
              <button
                type="button"
                onClick={() => onSelect(item.id)}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-hover"
              >
                Highlight in ecosystem map
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={1}>
              <GlassCard tone={item.tone} className="p-7">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                    What&rsquo;s included
                  </h3>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {item.services.map((s) => (
                      <li
                        key={s}
                        className="flex items-start gap-2.5 text-sm text-text-primary"
                      >
                        <span className={cn("mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full", toneClasses[item.tone])}>
                          <Check className="h-2.5 w-2.5" />
                        </span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {"deliverables" in item && item.deliverables && (
                  <div className="mt-7 border-t border-border pt-6">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                      Deliverables
                    </h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {item.deliverables.map((d) => (
                        <li
                          key={d}
                          className="rounded-full border border-border bg-background px-3 py-1 text-xs text-text-secondary"
                        >
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {"tech" in item && item.tech && (
                  <div className="mt-7 border-t border-border pt-6">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                      Technologies
                    </h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {item.tech.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-border bg-background px-3 py-1 text-xs text-text-secondary"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {"benefits" in item && item.benefits && (
                  <div className="mt-7 border-t border-border pt-6">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                      Business benefits
                    </h3>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {item.benefits.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2 text-sm text-text-primary"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {"kpis" in item && item.kpis && (
                  <div className="mt-7 border-t border-border pt-6">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                      KPIs we track
                    </h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {item.kpis.map((k) => (
                        <li
                          key={k}
                          className="rounded-full border border-border bg-background px-3 py-1 text-xs text-text-secondary"
                        >
                          {k}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </Container>
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
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-soft-tint"
      />
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
  // For the interactive map highlight, we use a simple anchor-based approach
  // (clicking a node scrolls to the section). This keeps the component
  // server-renderable while still feeling interactive.
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
      <section className="relative pb-20 sm:pb-24">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-2xl font-bold leading-tight text-text-primary sm:text-3xl">
                One ecosystem. Six connected practices.
              </h2>
              <p className="mt-3 text-sm text-text-secondary sm:text-base">
                Click any node to jump to its detail.
              </p>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <GlassCard tone="blue" className="mx-auto mt-10 max-w-4xl p-6 sm:p-10">
              <EcosystemMap activeId="consulting" onSelect={handleSelect} />
            </GlassCard>
          </Reveal>
        </Container>
      </section>

      {ECOSYSTEM.map((item, i) => (
        <ServiceSection key={item.id} index={i} item={item} onSelect={handleSelect} />
      ))}

      <Flow />

      {/* Why Growth Ecosystem */}
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
                <GlassCard
                  tone={(["coral", "blue", "violet"] as const)[i % 3]}
                  className="h-full p-7"
                >
                  <h3 className="font-display text-lg font-semibold text-text-primary">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {r.body}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
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
                  Let&rsquo;s design a brand, build intelligent systems, and create
                  a business that grows with confidence.
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
