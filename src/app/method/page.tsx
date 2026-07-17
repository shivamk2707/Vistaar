"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Sparkles, type LucideIcon } from "lucide-react";
import { Button } from "@/components/button";
import { Container } from "@/components/layout";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Halo, GlassCard } from "@/components/halo";
import { cn } from "@/lib/utils";

/* ============================================================
   DATA
   ============================================================ */
const PHASES = [
  {
    n: "01",
    title: "Discover",
    objective: "Understand the client's business before proposing any solution.",
    activities: [
      "Discovery Call",
      "Business Understanding",
      "Requirement Gathering",
      "Target Audience Analysis",
      "Competitor Research",
      "Industry Research",
      "Existing Brand Audit",
      "Technical Assessment",
    ],
    deliverables: [
      "Discovery Notes",
      "Business Requirement Document",
      "Initial Recommendations",
      "Project Scope",
    ],
    timeline: "2–5 Days",
    involvement: "High",
    Icon: Sparkles,
    tone: "coral" as const,
  },
  {
    n: "02",
    title: "Research & Strategy",
    objective:
      "Build a roadmap that aligns technology, branding, and business goals.",
    activities: [
      "Market Research",
      "SWOT Analysis",
      "Customer Persona Development",
      "Positioning Strategy",
      "Brand Direction",
      "Digital Strategy",
      "Technology Selection",
    ],
    deliverables: [
      "Strategy Presentation",
      "Brand Positioning Document",
      "User Journey Map",
      "Technical Roadmap",
    ],
    timeline: "3–7 Days",
    involvement: "Medium",
    Icon: Sparkles,
    tone: "blue" as const,
  },
  {
    n: "03",
    title: "Brand Experience Design",
    objective:
      "Create a visual identity that communicates trust, personality, and professionalism.",
    activities: [
      "Logo Design",
      "Brand Identity",
      "Typography",
      "Color Palette",
      "UI/UX Design",
      "Wireframes",
      "Design System",
      "Interactive Prototype",
    ],
    deliverables: [
      "Brand Guidelines",
      "UI Design",
      "Prototype",
      "Design Assets",
    ],
    timeline: "1–3 Weeks",
    involvement: "Medium",
    Icon: Sparkles,
    tone: "violet" as const,
  },
  {
    n: "04",
    title: "Engineering & Development",
    objective: "Transform approved designs into scalable digital products.",
    activities: [
      "Frontend Development",
      "Backend Development",
      "CMS Integration",
      "API Development",
      "Database Design",
      "Authentication",
      "Payment Gateway Integration",
      "Performance Optimization",
    ],
    deliverables: [
      "Functional Website",
      "Admin Dashboard",
      "API Documentation",
      "Source Code",
      "Deployment Environment",
    ],
    timeline: "2–8 Weeks",
    involvement: "Low",
    Icon: Sparkles,
    tone: "coral" as const,
  },
  {
    n: "05",
    title: "AI & Automation Integration",
    objective:
      "Increase efficiency by integrating intelligent systems into the business.",
    activities: [
      "AI Chatbots",
      "CRM Automation",
      "Lead Management",
      "WhatsApp Automation",
      "Workflow Automation",
      "AI Agents",
      "Business Intelligence Dashboard",
    ],
    deliverables: [
      "AI Workflows",
      "Automation Reports",
      "AI Knowledge Base",
      "Integration Documentation",
    ],
    timeline: "Depends on scope",
    involvement: "Medium",
    Icon: Sparkles,
    tone: "blue" as const,
  },
  {
    n: "06",
    title: "Testing & Quality Assurance",
    objective:
      "Ensure every solution meets Vistaar's quality standards before launch.",
    activities: [
      "UI Testing",
      "Functional Testing",
      "Responsive Testing",
      "Browser Compatibility",
      "Security Testing",
      "Performance Testing",
      "SEO Validation",
      "Accessibility Testing",
    ],
    deliverables: [
      "QA Report",
      "Bug Fix Report",
      "Performance Report",
    ],
    timeline: "1–2 Weeks",
    involvement: "Low",
    Icon: Sparkles,
    tone: "violet" as const,
  },
  {
    n: "07",
    title: "Launch",
    objective: "Deploy the project smoothly with minimal downtime.",
    activities: [
      "Production Deployment",
      "Domain Configuration",
      "Hosting Setup",
      "SSL Configuration",
      "Analytics Setup",
      "Search Console",
      "Backup Configuration",
    ],
    deliverables: [
      "Live Website",
      "Launch Checklist",
      "Training Session",
      "Handover Documentation",
    ],
    timeline: "1–3 Days",
    involvement: "Medium",
    Icon: Sparkles,
    tone: "coral" as const,
  },
  {
    n: "08",
    title: "Grow & Optimize",
    objective:
      "Continuous improvement based on analytics, customer behaviour, and market trends.",
    activities: [
      "SEO Improvements",
      "Marketing Campaigns",
      "AI Optimization",
      "Performance Monitoring",
      "Feature Enhancements",
      "Content Updates",
      "Monthly Reports",
      "Strategy Reviews",
    ],
    deliverables: [
      "Growth Reports",
      "Analytics Dashboard",
      "Quarterly Strategy Review",
      "Optimization Roadmap",
    ],
    timeline: "Ongoing",
    involvement: "Low",
    Icon: Sparkles,
    tone: "blue" as const,
  },
];

const PRINCIPLES = [
  {
    title: "Business First",
    body: "We understand your business before proposing technology.",
  },
  {
    title: "Strategy Over Trends",
    body: "We build sustainable systems instead of following short-lived trends.",
  },
  {
    title: "Transparency",
    body: "Clear communication throughout every project.",
  },
  {
    title: "Innovation",
    body: "We continuously adopt emerging technologies to create better solutions.",
  },
  {
    title: "Collaboration",
    body: "Our clients become part of the creative and strategic process.",
  },
  {
    title: "Long-Term Growth",
    body: "Success is measured by your business growth — not project completion.",
  },
];

const CLIENT_JOURNEY = [
  "Initial Enquiry",
  "Discovery Meeting",
  "Proposal & Quotation",
  "Project Kickoff",
  "Research & Planning",
  "Design Approval",
  "Development",
  "Testing",
  "Launch",
  "Growth Partnership",
];

const PROCESS_BENEFITS = [
  "Clear Communication",
  "Defined Timelines",
  "Dedicated Team",
  "No Hidden Processes",
  "Data-Driven Decisions",
  "Continuous Support",
];

const DASHBOARD_MODULES = [
  "Project Status",
  "Timeline",
  "Tasks",
  "Shared Files",
  "Feedback",
  "Meeting Notes",
  "Invoice Status",
  "Team Members",
  "Milestones",
  "Support Requests",
];

/* ============================================================
   PHASE TIMELINE
   ============================================================ */
function PhaseTimeline() {
  return (
    <section className="relative py-20 sm:py-24 lg:py-28">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              The Vistaar growth cycle.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
              Eight phases, run as a continuous loop. Each one sets up the next.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-14 max-w-5xl">
          <div className="relative space-y-6 lg:space-y-8">
            {/* vertical line on desktop */}
            <div
              aria-hidden
              className="absolute left-[27px] top-2 bottom-2 hidden w-px bg-border lg:left-1/2 lg:block"
            />
            {PHASES.map((p, i) => {
              const reverse = i % 2 === 1;
              return (
                <Reveal key={p.n} delay={(i % 4) + 1}>
                  <div
                    className={cn(
                      "relative grid items-start gap-6 lg:grid-cols-2 lg:gap-12",
                      reverse && "lg:[&>*:first-child]:order-2"
                    )}
                  >
                    <div className={cn("pl-14 lg:pl-0", reverse && "lg:pl-12")}>
                      <div className="flex items-start gap-4 lg:justify-end">
                        <div className="hidden lg:block">
                          <div className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                            Phase {p.n}
                          </div>
                          <h3 className="mt-1 font-display text-2xl font-bold leading-tight text-text-primary">
                            {p.title}
                          </h3>
                          <p className="mt-2 text-sm text-text-secondary">
                            {p.objective}
                          </p>
                        </div>
                        <span
                          className={cn(
                            "mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold shadow-sm",
                            p.tone === "coral" && "bg-primary text-white shadow-coral",
                            p.tone === "blue" && "bg-secondary text-white shadow-blue",
                            p.tone === "violet" && "bg-accent text-white shadow-violet"
                          )}
                        >
                          {p.n}
                        </span>
                      </div>
                    </div>

                    <div className="pl-14 lg:pl-0 lg:pr-12">
                      <div className="lg:hidden">
                        <div className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                          Phase {p.n}
                        </div>
                        <h3 className="mt-1 font-display text-2xl font-bold leading-tight text-text-primary">
                          {p.title}
                        </h3>
                        <p className="mt-2 text-sm text-text-secondary">
                          {p.objective}
                        </p>
                      </div>
                      <GlassCard tone={p.tone} className="mt-4 p-6">
                        <div>
                          <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                            Activities
                          </h4>
                          <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                            {p.activities.slice(0, 6).map((a) => (
                              <li
                                key={a}
                                className="flex items-start gap-2 text-sm text-text-primary"
                              >
                                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                                {a}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-5 grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
                          <div>
                            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                              Timeline
                            </div>
                            <div className="mt-1 text-sm font-semibold text-text-primary">
                              {p.timeline}
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                              Client Involvement
                            </div>
                            <div className="mt-1 text-sm font-semibold text-text-primary">
                              {p.involvement}
                            </div>
                          </div>
                        </div>
                      </GlassCard>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
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
              Our working principles.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
              The non-negotiables that shape every engagement.
            </p>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) + 1}>
              <GlassCard
                tone={(["coral", "blue", "violet"] as const)[i % 3]}
                className="h-full p-6"
              >
                <h3 className="font-display text-lg font-semibold text-text-primary">
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
   CLIENT JOURNEY
   ============================================================ */
function ClientJourney() {
  return (
    <section className="relative py-20 sm:py-24 lg:py-28">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              The client journey.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
              Ten steps from first hello to long-term partnership.
            </p>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="mx-auto mt-12 max-w-5xl overflow-x-auto">
            <ol className="flex min-w-max items-stretch gap-3 pb-4">
              {CLIENT_JOURNEY.map((step, i) => (
                <li
                  key={step}
                  className="relative flex w-44 shrink-0 flex-col rounded-2xl border border-border bg-surface-strong p-4 shadow-card"
                >
                  <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-2 text-sm font-semibold leading-snug text-text-primary">
                    {step}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs text-primary">
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    {i < 4 ? "Days" : i < 8 ? "Weeks" : "Ongoing"}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ============================================================
   DASHBOARD PREVIEW
   ============================================================ */
function DashboardPreview() {
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
              Your project, always visible.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
              A dedicated workspace where you can see status, files, decisions,
              and invoices in one place.
            </p>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="relative mx-auto mt-14 max-w-5xl">
            <Halo tone="blue" className="top-1/2 left-1/2 -z-0 h-[320px] w-[600px] -translate-x-1/2 -translate-y-1/2" />
            <GlassCard tone="blue" className="p-6 sm:p-8">
              <div className="flex items-center gap-1.5 border-b border-border pb-3">
                <span className="h-2.5 w-2.5 rounded-full bg-error/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
                <span className="ml-3 text-xs text-text-muted">
                  vistaar.studio · client-portal
                </span>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {DASHBOARD_MODULES.map((m, i) => (
                  <div
                    key={m}
                    className={cn(
                      "rounded-2xl border border-border bg-background p-4 text-sm font-medium",
                      i === 0 && "border-primary bg-primary-soft text-primary"
                    )}
                  >
                    {m}
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ============================================================
   PROCESS BENEFITS
   ============================================================ */
function ProcessBenefits() {
  return (
    <section className="relative py-20 sm:py-24 lg:py-28">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Why clients love the Vistaar process.
            </h2>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS_BENEFITS.map((b, i) => (
            <Reveal key={b} delay={(i % 3) + 1}>
              <GlassCard
                tone={(["coral", "blue", "violet"] as const)[i % 3]}
                className="h-full p-6"
              >
                <Check className="h-5 w-5 text-primary" />
                <h3 className="mt-3 font-display text-lg font-semibold text-text-primary">
                  {b}
                </h3>
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
function MethodCta() {
  return (
    <section className="relative py-20">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface-strong px-6 py-12 text-center shadow-elevated sm:px-12">
            <Halo tone="blue" className="top-1/2 left-1/2 -z-0 h-[360px] w-[600px] -translate-x-1/2 -translate-y-1/2" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl">
                Every great brand begins with a conversation.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
                Whether you&rsquo;re launching a startup, rebranding, or scaling
                through AI — our process turns ambitious ideas into measurable
                success.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/contact">
                  <Button size="lg" variant="primary" rightIcon={<ArrowRight className="h-5 w-5" />}>
                    Start Your Journey
                  </Button>
                </Link>
                <Link href="/services">
                  <Button size="lg" variant="secondary" rightIcon={<ArrowUpRight className="h-5 w-5" />}>
                    See Our Services
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
export default function MethodPage() {
  return (
    <main className="relative">
      <PageHero
        eyebrow="The Vistaar Method"
        title="From vision to victory."
        highlight="With a clear path."
        description="Successful businesses are built on process, not guesswork. Our eight-phase methodology combines research, creativity, technology, and continuous optimization — and it's the same playbook we use on every engagement."
      >
        <Link href="/contact">
          <Button size="lg" variant="primary" rightIcon={<ArrowRight className="h-5 w-5" />}>
            Book a Discovery Call
          </Button>
        </Link>
        <Link href="/services">
          <Button size="lg" variant="secondary" rightIcon={<ArrowUpRight className="h-5 w-5" />}>
            See Our Services
          </Button>
        </Link>
      </PageHero>

      <PhaseTimeline />
      <Principles />
      <ClientJourney />
      <DashboardPreview />
      <ProcessBenefits />
      <MethodCta />
    </main>
  );
}
