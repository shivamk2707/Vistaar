"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Star,
  CheckCircle2,
  Rocket,
  Compass,
  Palette,
  Code2,
  Brain,
  LineChart,
  Wrench,
  Quote,
  Plus,
  Search,
  ChevronDown,
  Check,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/button";
import { Container, Section, SectionHeading } from "@/components/layout";
import { Reveal } from "@/components/reveal";
import { GradientRibbon } from "@/components/gradient-ribbon";
import { cn } from "@/lib/utils";

/* ============================================================
   HERO — dark canvas band with display headline + gradient ribbon
   ============================================================ */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--canvas-dark)] text-[var(--on-dark)]">
      <div className="relative py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: headline cluster */}
            <div className="max-w-2xl">
              <Reveal>
                <span className="mono-eyebrow text-[var(--on-dark)] opacity-70">
                  AI-Powered Brand Growth Company
                </span>
              </Reveal>
              <Reveal delay={1}>
                <h1 className="mt-6 text-display-xxl text-[var(--on-dark)]">
                  Build what&rsquo;s next on the AI Native Cloud.
                </h1>
              </Reveal>
              <Reveal delay={2}>
                <p className="mt-6 max-w-xl text-[18px] leading-[1.45] text-[var(--on-dark)] opacity-80">
                  Vistaar partners with startups, founders, and businesses to
                  create impactful brands, modern websites, intelligent AI
                  solutions, and scalable growth systems that transform ideas
                  into successful businesses.
                </p>
              </Reveal>
              <Reveal delay={3}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button
                    size="lg"
                    variant="secondary-mint"
                    rightIcon={<ArrowUpRight className="h-4 w-4" />}
                    href="/contact"
                  >
                    Start a project
                  </Button>
                  <Button
                    size="lg"
                    variant="secondary-white"
                    rightIcon={<ArrowUpRight className="h-4 w-4" />}
                    href="/method"
                  >
                    See the method
                  </Button>
                </div>
              </Reveal>
              <Reveal delay={4}>
                <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-[var(--on-dark)] opacity-60">
                  <span className="mono-label">Free 30-min discovery call</span>
                  <span className="hidden h-3 w-px bg-white/20 sm:inline-block" />
                  <span className="mono-label">NDA on request</span>
                  <span className="hidden h-3 w-px bg-white/20 sm:inline-block" />
                  <span className="mono-label">Reply within 1 business day</span>
                </div>
              </Reveal>
            </div>

            {/* Right: gradient ribbon graphic */}
            <Reveal delay={2}>
              <div className="relative aspect-square w-full max-w-[520px] mx-auto lg:ml-auto lg:mr-0">
                <GradientRibbon className="absolute inset-0" />
              </div>
            </Reveal>
          </div>
        </Container>
      </div>
    </section>
  );
}

/* ============================================================
   TRUSTED BY — infinite logo marquee on light band
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
    <section className="border-y border-[var(--hairline)] bg-[var(--canvas)] py-12">
      <Container>
        <Reveal>
          <p className="text-center mono-eyebrow text-[var(--body)]">
            Trusted by founders and teams at
          </p>
        </Reveal>
      </Container>
      <div className="mt-8 overflow-hidden" aria-hidden>
        <div className="flex w-max items-center gap-16 animate-marquee">
          {[...TRUSTED_LOGOS, ...TRUSTED_LOGOS].map((name, i) => (
            <span
              key={i}
              className="text-[24px] font-medium tracking-tight text-[var(--body)] transition-colors hover:text-[var(--ink)]"
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
   SERVICE TABS — full-stack cloud
   ============================================================ */
const SERVICE_TABS = [
  {
    id: "strategy",
    label: "Brand Strategy",
    description:
      "Position, voice, story, identity. Foundations that compound for years — strategy that makes every downstream decision easier.",
    deliverables: [
      "Market & competitor research",
      "Positioning & messaging",
      "Audience segmentation",
      "Brand architecture",
      "Voice & tone guide",
    ],
    Icon: Compass,
  },
  {
    id: "identity",
    label: "Brand Identity",
    description:
      "Logos, systems, guidelines, packaging. A brand people remember — and recognise across every touchpoint.",
    deliverables: [
      "Logo & mark design",
      "Color & typography systems",
      "Brand guidelines",
      "Packaging & merch",
      "Asset library",
    ],
    Icon: Palette,
  },
  {
    id: "engineering",
    label: "Web & App Development",
    description:
      "Marketing sites, SaaS, mobile apps. Built for performance and scale, with code your team can own and extend.",
    deliverables: [
      "Marketing websites",
      "SaaS platforms",
      "Mobile applications",
      "CMS & API integrations",
      "E-commerce",
    ],
    Icon: Code2,
  },
  {
    id: "ai",
    label: "AI & Automation",
    description:
      "Workflow automation, chatbots, AI agents. Less busywork, more output — measurable ROI, not slides.",
    deliverables: [
      "Workflow automation",
      "AI agents & chatbots",
      "CRM & lead routing",
      "Internal tools",
      "BI dashboards",
    ],
    Icon: Brain,
  },
  {
    id: "growth",
    label: "Growth Marketing",
    description:
      "SEO, paid, lifecycle, content. Acquisition and retention, working together — the system that compounds.",
    deliverables: [
      "SEO & content",
      "Paid acquisition",
      "Lifecycle & email",
      "Conversion optimization",
      "Analytics & reporting",
    ],
    Icon: LineChart,
  },
  {
    id: "consulting",
    label: "Business Consulting",
    description:
      "Strategy, GTM, digital transformation. A thinking partner, not a vendor — we work with you, not at you.",
    deliverables: [
      "GTM strategy",
      "Digital transformation",
      "Operating model design",
      "Workshop facilitation",
      "Fractional leadership",
    ],
    Icon: Wrench,
  },
];

function ServicesTabs() {
  const [active, setActive] = useState(SERVICE_TABS[0].id);
  const current = SERVICE_TABS.find((s) => s.id === active)!;

  return (
    <Section className="bg-[var(--canvas)]" id="services-overview">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="The Vistaar Platform"
            title="The full-stack cloud for modern brands."
            description="Six connected practices that work as a single growth system. Mix them, sequence them, or hand us the whole map."
          />
        </Reveal>

        {/* Tab pill row */}
        <Reveal delay={1}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-1 rounded-[8px] bg-[var(--hairline)] p-1 max-w-3xl mx-auto">
            {SERVICE_TABS.map((s) => {
              const isActive = active === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActive(s.id)}
                  className={cn(
                    "h-10 rounded-[4px] px-4 text-[13px] font-medium transition-all",
                    isActive
                      ? "bg-[var(--canvas)] text-[var(--ink)]"
                      : "text-[var(--body)] hover:text-[var(--ink)]"
                  )}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Active tab content */}
        <Reveal delay={2}>
          <div className="mt-12 grid gap-6 rounded-[8px] border border-[var(--hairline)] bg-[var(--canvas)] p-8 lg:grid-cols-5 lg:p-12">
            <div className="lg:col-span-2">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-[4px] bg-[var(--hairline)]">
                <current.Icon className="h-5 w-5 text-[var(--ink)]" />
              </div>
              <h3 className="mt-5 text-display-md">{current.label}</h3>
              <p className="mt-3 text-[16px] leading-[1.5] text-[var(--body)]">
                {current.description}
              </p>
              <Link
                href="/services"
                className="mt-6 inline-flex items-center gap-1 text-[14px] font-medium text-[var(--ink)] hover:opacity-70"
              >
                Learn more
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="lg:col-span-3">
              <h4 className="mono-eyebrow text-[var(--body)]">What&rsquo;s included</h4>
              <ul className="mt-5 space-y-3">
                {current.deliverables.map((d) => (
                  <li
                    key={d}
                    className="flex items-center gap-3 border-b border-[var(--hairline)] pb-3 last:border-0"
                  >
                    <Check className="h-4 w-4 shrink-0 text-[var(--ink)]" />
                    <span className="text-[15px] text-[var(--ink)]">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ============================================================
   RESEARCH / DARK BAND — "Grounded in cutting-edge work"
   ============================================================ */
const RESEARCH = [
  {
    eyebrow: "01",
    title: "Brand systems",
    body: "Build a brand that works across product, marketing, and motion — without drifting.",
  },
  {
    eyebrow: "02",
    title: "AI workflows",
    body: "Production-grade agents and automations that ship into your stack, not a slide deck.",
  },
  {
    eyebrow: "03",
    title: "Growth engine",
    body: "Acquisition, activation, retention — wired together as a system, not a series of campaigns.",
  },
  {
    eyebrow: "04",
    title: "Engineering",
    body: "Marketing sites, SaaS, mobile apps. Fast, accessible, and built to extend for years.",
  },
];

function ResearchBand() {
  return (
    <Section tone="dark" className="bg-[var(--canvas-dark)]">
      <Container>
        <Reveal>
          <div className="max-w-3xl">
            <span className="mono-eyebrow text-[var(--on-dark)] opacity-70">
              The platform
            </span>
            <h2 className="mt-5 text-display-xl text-[var(--on-dark)]">
              Grounded in cutting-edge work.
            </h2>
            <p className="mt-4 text-[17px] leading-[1.5] text-[var(--on-dark)] opacity-80">
              Every Vistaar engagement combines research-grade thinking with
              shipping-grade execution. Four pillars carry every project.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[4px] border border-[var(--surface-dark-soft)] bg-[var(--surface-dark-soft)] md:grid-cols-2 lg:grid-cols-4">
          {RESEARCH.map((r, i) => (
            <Reveal key={r.title} delay={(i % 4) + 1}>
              <div className="flex h-full flex-col bg-[var(--canvas-dark)] p-8">
                <span className="mono-eyebrow text-[var(--on-dark)] opacity-50">
                  {r.eyebrow}
                </span>
                <h3 className="mt-6 text-display-md text-[var(--on-dark)]">
                  {r.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.5] text-[var(--on-dark)] opacity-70">
                  {r.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   STATS — pastel-tinted stat tiles
   ============================================================ */
const STATS = [
  { value: "200M+", label: "Brand Impressions Generated", tone: "bg-[var(--accent-mint)]" },
  { value: "100+", label: "Brands Built", tone: "bg-[#fde7d3]" },
  { value: "1K+", label: "Workflows Automated", tone: "bg-[var(--accent-periwinkle)]" },
  { value: "10K+", label: "Leads Captured", tone: "bg-[#f7d4ec]" },
];

function Stats() {
  return (
    <Section className="bg-[var(--canvas)]">
      <Container>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i + 1}>
              <div className={cn("rounded-[4px] p-8", s.tone)}>
                <div className="text-[40px] font-medium leading-[1.1] tracking-[-0.02em] text-[var(--ink)]">
                  {s.value}
                </div>
                <div className="mt-3 mono-eyebrow text-[var(--ink)] opacity-70">
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
   COMPARISON — Vistaar vs traditional agency (data table)
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
    <Section className="bg-[var(--canvas)]">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Vistaar vs. Traditional Agency"
            title="Why teams pick Vistaar over a traditional agency."
            description="Six honest differences you'll feel inside the first two weeks."
          />
        </Reveal>

        <Reveal delay={1}>
          <div className="mt-14 overflow-hidden rounded-[4px] border border-[var(--hairline)]">
            <div className="hidden grid-cols-12 border-b border-[var(--hairline)] bg-[var(--hairline)] px-6 py-4 md:grid">
              <div className="col-span-4 mono-eyebrow text-[var(--body)]">What matters</div>
              <div className="col-span-4 mono-eyebrow text-[var(--ink)]">Vistaar</div>
              <div className="col-span-4 mono-eyebrow text-[var(--body)]">Traditional agency</div>
            </div>
            {COMPARISON.map((row, i) => (
              <div
                key={row.feature}
                className={cn(
                  "grid grid-cols-1 gap-3 border-b border-[var(--hairline)] px-6 py-5 last:border-0 md:grid-cols-12 md:gap-6",
                  i % 2 === 1 && "bg-[#fafafa]"
                )}
              >
                <div className="md:col-span-4 text-[15px] font-medium text-[var(--ink)]">
                  {row.feature}
                </div>
                <div className="md:col-span-4 text-[15px] text-[var(--ink)]">
                  <span className="md:hidden mono-eyebrow text-[var(--ink)] mb-1 block">Vistaar</span>
                  {row.vistaar}
                </div>
                <div className="md:col-span-4 text-[15px] text-[var(--body)]">
                  <span className="md:hidden mono-eyebrow text-[var(--body)] mb-1 block">Traditional</span>
                  {row.other}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ============================================================
   TESTIMONIALS — 3-up grid on white
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
    <Section className="bg-[var(--canvas)]">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Customers"
            title="AI natives build on Vistaar."
            description="From first-time founders to public company leaders — the people we partner with tend to stick around."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i + 1}>
              <div className="flex h-full flex-col rounded-[4px] border border-[var(--hairline)] bg-[var(--canvas)] p-7">
                <Quote className="h-5 w-5 text-[var(--ink)]" />
                <p className="mt-5 flex-1 text-[16px] leading-[1.5] text-[var(--ink)]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-7 flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--hairline)] text-[14px] font-medium text-[var(--ink)]">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[var(--ink)]">{t.name}</div>
                    <div className="text-[12px] text-[var(--body)]">{t.role}</div>
                  </div>
                </div>
                <div className="mt-5 border-t border-[var(--hairline)] pt-4">
                  <span className="mono-caption text-[var(--body)]">GA-DEC '25</span>
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
    <Section className="bg-[var(--canvas)]">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Questions founders ask us first."
            description="If yours isn't here, the easiest path is a quick call."
          />
        </Reveal>

        <Reveal delay={1}>
          <div className="mt-14 max-w-3xl mx-auto divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:bg-[#fafafa]"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[16px] font-medium text-[var(--ink)]">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 text-[var(--body)] transition-transform",
                        isOpen && "rotate-180 text-[var(--ink)]"
                      )}
                    />
                  </button>
                  {isOpen && (
                    <div className="pb-6 pr-10 text-[15px] leading-[1.5] text-[var(--body)]">
                      {item.a}
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
   FINAL CTA — dark band
   ============================================================ */
function FinalCta() {
  return (
    <Section tone="dark" className="bg-[var(--canvas-dark)]">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mono-eyebrow text-[var(--on-dark)] opacity-70">
              Get started
            </span>
            <h2 className="mt-6 text-display-xxl text-[var(--on-dark)]">
              Start building on Vistaar.
            </h2>
            <p className="mt-6 text-[18px] leading-[1.45] text-[var(--on-dark)] opacity-80">
              Whether you're launching, rebranding, or scaling through AI —
              start with a free 30-minute strategy call. No pitch deck, no
              pressure.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                variant="secondary-mint"
                rightIcon={<ArrowRight className="h-4 w-4" />}
                href="/contact"
              >
                Start your project
              </Button>
              <Button
                size="lg"
                variant="secondary-white"
                rightIcon={<ArrowUpRight className="h-4 w-4" />}
                href="/method"
              >
                See the method
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
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
      <ServicesTabs />
      <ResearchBand />
      <Stats />
      <Comparison />
      <Testimonials />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
