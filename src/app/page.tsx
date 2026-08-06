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
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/button";
import { Container, Section, SectionHeading } from "@/components/layout";
import { Reveal } from "@/components/reveal";
import { GradientRibbon } from "@/components/gradient-ribbon";
import { cn } from "@/lib/utils";
import BackgroundBeamsDemo from "@/components/beams-background";
import ModernLandingHero from "@/components/modern-landing-hero";

/* ============================================================
   HERO — dark canvas band with display headline + gradient ribbon
   ============================================================ */
function Hero() {
  const bgRef = useRef<HTMLVideoElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);
  const animationFrame = useRef<number | null>(null);
  const targetOffset = useRef({ x: 0, y: 0 });
  const currentOffset = useRef({ x: 0, y: 0 });
  const pointerTarget = useRef({ x: 0, y: 0 });
  const pointerCurrent = useRef({ x: 0, y: 0 });
  const [pointerVisible, setPointerVisible] = useState(false);

  useEffect(() => {
    const animate = () => {
      if (bgRef.current) {
        currentOffset.current.x += (targetOffset.current.x - currentOffset.current.x) * 0.12;
        currentOffset.current.y += (targetOffset.current.y - currentOffset.current.y) * 0.12;
        bgRef.current.style.transform = `translate3d(${currentOffset.current.x}px, ${currentOffset.current.y}px, 0) scale(1.08)`;
      }

      if (pointerRef.current) {
        pointerCurrent.current.x += (pointerTarget.current.x - pointerCurrent.current.x) * 0.18;
        pointerCurrent.current.y += (pointerTarget.current.y - pointerCurrent.current.y) * 0.18;
        pointerRef.current.style.transform = `translate3d(calc(${pointerCurrent.current.x}px - 50%), calc(${pointerCurrent.current.y}px - 50%), 0)`;
      }

      animationFrame.current = requestAnimationFrame(animate);
    };

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    targetOffset.current = {
      x: (x - 0.5) * 32,
      y: (y - 0.5) * 26,
    };
    pointerTarget.current = {
      x: x * rect.width,
      y: y * rect.height,
    };
    setPointerVisible(true);
  };

  const handleMouseLeave = () => {
    targetOffset.current = { x: 0, y: 0 };
    pointerTarget.current = { x: 0, y: 0 };
    setPointerVisible(false);
  };

  return (
    <section
      className="relative overflow-hidden bg-[var(--canvas-dark)] text-[var(--on-dark)]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <BackgroundBeamsDemo />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/70" />
      </div>
      <ModernLandingHero />
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
          <div className="mt-14 flex flex-wrap items-center justify-center gap-1 rounded-[8px] bg-[var(--hairline)] p-1 max-w-4xl mx-auto">
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
        <div className="mt-12 overflow-hidden rounded-2xl border border-[var(--hairline)] bg-white/50 backdrop-blur-xl shadow-sm">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid gap-8 p-8 lg:grid-cols-5 lg:p-12"
          >
            <div className="lg:col-span-2">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-100 shadow-sm">
                <current.Icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-6 text-3xl font-bold tracking-tight text-neutral-900">{current.label}</h3>
              <p className="mt-4 text-[16px] leading-[1.6] text-neutral-600">
                {current.description}
              </p>
              <Link
                href="/services"
                className="group mt-8 inline-flex items-center gap-2 text-[14px] font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Learn more
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
            <div className="lg:col-span-3 lg:pl-12 lg:border-l border-[var(--hairline)]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">What&rsquo;s included</h4>
              <ul className="mt-6 space-y-4">
                {current.deliverables.map((d, i) => (
                  <motion.li
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    key={d}
                    className="flex items-center gap-4 group"
                  >
                    <div className="rounded-full bg-blue-50 p-1 group-hover:bg-blue-100 transition-colors">
                      <Check className="h-4 w-4 shrink-0 text-blue-600" />
                    </div>
                    <span className="text-[15px] font-medium text-neutral-700">{d}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
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
    <Section className="bg-[var(--canvas)] py-[0px] sm:py-[0px]">
      <Container>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={cn("rounded-2xl p-8 border border-black/5 shadow-sm transition-all cursor-default", s.tone)}
            >
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
                className="text-[40px] font-bold leading-[1.1] tracking-tight text-[var(--ink)]"
              >
                {s.value}
              </motion.div>
              <div className="mt-3 text-sm font-semibold uppercase tracking-wider text-[var(--ink)] opacity-70">
                {s.label}
              </div>
            </motion.div>
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
    <Section className="bg-[var(--canvas)] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            eyebrow="Vistaar vs. Traditional Agency"
            title="Why teams pick Vistaar over a traditional agency."
            description="Six honest differences you'll feel inside the first two weeks."
          />
        </motion.div>

        <div className="mt-16 overflow-hidden rounded-2xl border border-[var(--hairline)] bg-white/50 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.04)]">
          <div className="hidden grid-cols-12 border-b border-[var(--hairline)] bg-neutral-50/80 px-6 py-5 md:grid">
            <div className="col-span-4 text-xs font-semibold uppercase tracking-wider text-neutral-500">What matters</div>
            <div className="col-span-4 text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Vistaar
            </div>
            <div className="col-span-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">Traditional agency</div>
          </div>

          <div className="divide-y divide-[var(--hairline)]">
            {COMPARISON.map((row, i) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                key={row.feature}
                className="group grid grid-cols-1 gap-4 px-6 py-6 transition-colors hover:bg-white md:grid-cols-12 md:gap-6 items-center"
              >
                <div className="md:col-span-4 text-[16px] font-semibold text-neutral-900 group-hover:text-blue-900 transition-colors">
                  {row.feature}
                </div>

                <div className="md:col-span-4 flex flex-col gap-1 relative">
                  <span className="md:hidden text-xs font-bold uppercase tracking-wider text-blue-600 mb-1 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Vistaar
                  </span>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-blue-100 p-1 hidden md:block">
                      <Check className="w-3 h-3 text-blue-600" />
                    </div>
                    <p className="text-[15px] font-medium text-neutral-800 leading-snug">
                      {row.vistaar}
                    </p>
                  </div>
                </div>

                <div className="md:col-span-4 flex flex-col gap-1 relative">
                  <span className="md:hidden text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1 flex items-center gap-1">
                    <X className="w-3 h-3" /> Traditional
                  </span>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-neutral-100 p-1 hidden md:block">
                      <X className="w-3 h-3 text-neutral-400" />
                    </div>
                    <p className="text-[15px] text-neutral-500 leading-snug">
                      {row.other}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
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
    image: "https://i.pravatar.cc/150?u=Ananya",
  },
  {
    quote:
      "The team embedded like an internal growth squad. AI workflows they built for us now handle 60% of our lead enrichment — what used to be four people is now one afternoon.",
    name: "Marcus Whitfield",
    role: "Head of Growth, Lattice",
    initials: "MW",
    image: "https://i.pravatar.cc/150?u=Marcus",
  },
  {
    quote:
      "We'd worked with three agencies before. Vistaar is the first team that brought us real strategy, not just deliverables. The brand book alone changed how our sales team pitches.",
    name: "Priya Mehta",
    role: "Founder, Aurelia",
    initials: "PM",
    image: "https://i.pravatar.cc/150?u=Priya",
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

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div 
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group flex h-full flex-col rounded-2xl border border-black/5 bg-white p-7 shadow-sm transition-all hover:shadow-md cursor-default"
            >
              <div className="mb-4 rounded-full bg-blue-50 w-10 h-10 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <Quote className="h-4 w-4 text-blue-600" />
              </div>
              <p className="flex-1 text-[16px] leading-[1.6] text-neutral-700">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-8 flex items-center gap-4 border-t border-[var(--hairline)] pt-6">
                {t.image ? (
                  <img
                    src={t.image}
                    alt={t.name}
                    className="h-11 w-11 rounded-full object-cover shadow-sm"
                  />
                ) : (
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-[14px] font-bold text-blue-700 shadow-inner">
                    {t.initials}
                  </div>
                )}
                <div>
                  <div className="text-[15px] font-bold text-neutral-900">{t.name}</div>
                  <div className="text-[13px] font-medium text-neutral-500">{t.role}</div>
                </div>
              </div>
            </motion.div>
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

        <div className="mt-14 max-w-3xl mx-auto divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div 
                key={item.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left transition-colors hover:bg-neutral-50/50"
                  aria-expanded={isOpen}
                >
                  <span className={cn("text-[17px] font-semibold transition-colors", isOpen ? "text-blue-600" : "text-neutral-900")}>
                    {item.q}
                  </span>
                  <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors", isOpen ? "bg-blue-50" : "bg-neutral-50")}>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-300",
                        isOpen ? "rotate-180 text-blue-600" : "text-neutral-500"
                      )}
                    />
                  </div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 pr-12 text-[15px] leading-[1.6] text-neutral-600">
                    {item.a}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   FINAL CTA — dark band
   ============================================================ */
function FinalCta() {
  return (
    <Section
      tone="dark"
      className="relative overflow-hidden bg-[url('/images/home-cta-bg.png')] bg-cover bg-center"
    >
      <div className="pointer-events-none absolute inset-0" />
      <Container>
        <Reveal>
          <div className="relative mx-auto max-w-3xl text-center">
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
   FLOW — flow diagram on light
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
    <Section className="bg-[var(--canvas)]">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="The flow"
            title="How everything connects."
            description="One flow, no dead ends. Each service feeds the next."
          />
        </Reveal>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="flex flex-wrap items-center justify-center gap-y-4 gap-x-2">
            {FLOW.map((step, i) => (
              <motion.div 
                key={step} 
                className="flex items-center gap-2"
                initial={{ opacity: 0, scale: 0.9, x: -10 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <motion.span
                  whileHover={{ y: -2, scale: 1.05 }}
                  className={cn(
                    "rounded-full border border-black/10 bg-white px-5 py-2.5 text-[14px] font-semibold text-neutral-700 shadow-sm transition-all cursor-default",
                    i === FLOW.length - 1 && "border-blue-600 bg-blue-600 text-white shadow-md",
                    i === 0 && "border-blue-200 bg-blue-50 text-blue-700"
                  )}
                >
                  {step}
                </motion.span>
                {i < FLOW.length - 1 && (
                  <motion.span 
                    initial={{ opacity: 0, width: 0 }}
                    whileInView={{ opacity: 1, width: "auto" }}
                    transition={{ duration: 0.3, delay: i * 0.1 + 0.2 }}
                    className="text-neutral-300 mx-1" 
                    aria-hidden
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
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
      <Comparison />
      <Stats />
      <ServicesTabs />
      <Flow />
      <Testimonials />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
