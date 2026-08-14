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
import { motion, useInView, AnimatePresence } from "framer-motion";
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
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        >
          <source src="/videos/vistaar-home-hero-bg.mp4" type="video/mp4" />
        </video>
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

function ServiceStep({ service, index, onInView }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (isInView) {
      onInView();
    }
  }, [isInView, onInView]);

  return (
    <div ref={ref} className="flex flex-col gap-6 scroll-mt-40 transition-opacity duration-500" style={{ opacity: isInView ? 1 : 0.4 }}>
      {/* Mobile-only step number */}
      <div className="text-6xl font-bold text-white/10 lg:hidden">
        0{index + 1}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/20 border border-blue-500/20 shadow-sm">
          <service.Icon className="h-6 w-6 text-blue-400" />
        </div>
        <h3 className="text-3xl font-bold tracking-tight text-white">{service.label}</h3>
      </div>

      <p className="text-[16px] leading-[1.6] text-zinc-400 max-w-xl">
        {service.description}
      </p>

      <div className="mt-4 border-l border-[var(--hairline)] pl-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-4">What&rsquo;s included</h4>
        <ul className="space-y-4">
          {service.deliverables.map((d: string) => (
            <li key={d} className="flex items-center gap-4 group">
              <div className="rounded-full bg-blue-500/10 p-1 group-hover:bg-blue-500/20 transition-colors">
                <Check className="h-4 w-4 shrink-0 text-blue-400" />
              </div>
              <span className="text-[15px] font-medium text-zinc-300">{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ServicesStepper() {
  const [activeIndex, setActiveIndex] = useState(0);

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

        <div className="mt-20 flex flex-col lg:flex-row lg:gap-20 relative items-start">
          {/* Sticky Left Column */}
          <div className="hidden lg:block lg:w-1/2 sticky top-40 self-start">
            <div className="relative h-[300px]">
              <div className="absolute inset-0 flex items-start">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full max-w-lg aspect-square rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.5)] border border-[var(--hairline)] relative"
                  >
                    <img
                      src={
                        activeIndex === 0 ? "/images/practice/practice-01.png" :
                          activeIndex === 1 ? "/images/practice/practice-02.png" :
                            activeIndex === 2 ? "/images/practice/practice-03.png" :
                              activeIndex === 3 ? "/images/practice/practice-04.png" :
                                activeIndex === 4 ? "/images/practice/practice-05.png" :
                                  "/images/practice/practice-06.png"
                      }
                      alt="Service Visual"
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient overlay for text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Number Overlay */}
                    <div className="absolute bottom-8 left-8 text-7xl lg:text-8xl font-bold tracking-tighter text-white/90 drop-shadow-2xl">
                      0{activeIndex + 1}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* Visual indicator of total progress */}
              <div className="absolute bottom-0 left-0 flex items-center gap-2">
                {SERVICE_TABS.map((s, i) => (
                  <div
                    key={s.id}
                    className={cn(
                      "h-1 rounded-full transition-all duration-300",
                      i === activeIndex ? "w-8 bg-blue-500" : "w-4 bg-white/10"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Scrolling Right Column */}
          <div className="flex w-full flex-col gap-32 pb-32 lg:w-1/2 lg:mt-0">
            {SERVICE_TABS.map((s, i) => (
              <ServiceStep
                key={s.id}
                service={s}
                index={i}
                onInView={() => setActiveIndex(i)}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   STATS — pastel-tinted stat tiles
   ============================================================ */
const STATS = [
  { value: "200M+", label: "Brand Impressions Generated", tone: "bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20" },
  { value: "100+", label: "Brands Built", tone: "bg-orange-500/10 border-orange-500/20 hover:bg-orange-500/20" },
  { value: "1K+", label: "Workflows Automated", tone: "bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20" },
  { value: "10K+", label: "Leads Captured", tone: "bg-fuchsia-500/10 border-fuchsia-500/20 hover:bg-fuchsia-500/20" },
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
              className={cn("rounded-2xl p-8 border shadow-sm transition-all cursor-default", s.tone)}
            >
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
                className="text-[40px] font-bold leading-[1.1] tracking-tight text-white"
              >
                {s.value}
              </motion.div>
              <div className="mt-3 text-sm font-semibold uppercase tracking-wider text-zinc-400">
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

        <div className="mt-20 relative mx-auto max-w-5xl">
          {/* Table Header */}
          <div className="hidden grid-cols-12 mb-4 md:grid">
            <div className="col-span-4 px-6 text-xs font-semibold uppercase tracking-wider text-zinc-500">What matters</div>
            <div className="col-span-4 px-6 text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
              Vistaar
            </div>
            <div className="col-span-4 px-6 text-xs font-semibold uppercase tracking-wider text-zinc-500">Traditional agency</div>
          </div>

          <div className="flex flex-col relative z-10">
            {COMPARISON.map((row, i) => {
              const isFirst = i === 0;
              const isLast = i === COMPARISON.length - 1;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  key={row.feature}
                  className="group relative grid grid-cols-1 md:grid-cols-12 items-stretch"
                >
                  {/* Row hover effect (background) */}
                  <div className="absolute inset-0 bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity rounded-xl -z-10" />

                  {/* Feature Name */}
                  <div className="md:col-span-4 px-6 py-6 flex items-center text-[16px] font-semibold text-white">
                    {row.feature}
                  </div>

                  {/* Vistaar Column (Highlighted) */}
                  <div className={cn(
                    "md:col-span-4 px-6 py-6 flex flex-col justify-center relative",
                    "bg-blue-500/[0.08] border-x border-blue-500/20 backdrop-blur-sm",
                    isFirst && "border-t rounded-t-2xl",
                    isLast && "border-b rounded-b-2xl",
                  )}>
                    <span className="md:hidden text-xs font-bold uppercase tracking-wider text-blue-400 mb-2 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Vistaar
                    </span>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-full bg-blue-500/20 p-1 hidden md:block shrink-0">
                        <Check className="w-4 h-4 text-blue-400" />
                      </div>
                      <p className="text-[15px] font-medium text-white leading-snug">
                        {row.vistaar}
                      </p>
                    </div>
                  </div>

                  {/* Traditional Column */}
                  <div className="md:col-span-4 px-6 py-6 flex flex-col justify-center">
                    <span className="md:hidden text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-1 mt-4">
                      <X className="w-3 h-3" /> Traditional
                    </span>
                    <div className="flex items-start gap-3 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="mt-0.5 rounded-full bg-zinc-800 p-1 hidden md:block shrink-0">
                        <X className="w-4 h-4 text-zinc-400" />
                      </div>
                      <p className="text-[15px] font-medium text-zinc-400 leading-snug">
                        {row.other}
                      </p>
                    </div>
                  </div>

                  {/* Divider line for non-highlighted columns */}
                  {!isLast && (
                    <div className="hidden md:block absolute bottom-0 left-6 right-6 h-[1px] bg-[var(--hairline)] -z-20" />
                  )}
                </motion.div>
              )
            })}
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
              className="group flex h-full flex-col rounded-2xl border border-white/5 bg-zinc-900/50 p-7 shadow-sm transition-all hover:shadow-[0_8px_30px_rgba(255,255,255,0.04)] cursor-default"
            >
              <div className="mb-4 rounded-full bg-blue-500/10 w-10 h-10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <Quote className="h-4 w-4 text-blue-400" />
              </div>
              <p className="flex-1 text-[16px] leading-[1.6] text-zinc-300">
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
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-500/20 text-[14px] font-bold text-blue-400 shadow-inner">
                    {t.initials}
                  </div>
                )}
                <div>
                  <div className="text-[15px] font-bold text-white">{t.name}</div>
                  <div className="text-[13px] font-medium text-zinc-500">{t.role}</div>
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
                  className="flex w-full items-center justify-between gap-4 py-6 text-left transition-colors hover:bg-white/5"
                  aria-expanded={isOpen}
                >
                  <span className={cn("text-[17px] font-semibold transition-colors", isOpen ? "text-blue-400" : "text-white")}>
                    {item.q}
                  </span>
                  <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors", isOpen ? "bg-blue-500/20" : "bg-zinc-800")}>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-300",
                        isOpen ? "rotate-180 text-blue-400" : "text-zinc-500"
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
                  <div className="pb-8 pr-12 text-[15px] leading-[1.6] text-zinc-400">
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
      className="relative overflow-hidden bg-zinc-950 py-32"
    >
      <div className="absolute inset-0 pointer-events-none">
        <video
          src="/videos/cta-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950" />
      </div>
      <Container className="relative z-10">
        <Reveal>
          <div className="relative mx-auto max-w-3xl text-center flex flex-col items-center">
            <span className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-semibold tracking-wide text-blue-400 backdrop-blur-md shadow-sm">
              Get started
            </span>
            <h2 className="mt-8 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white" style={{ fontFamily: "var(--font-ubuntu), sans-serif" }}>
              Start building on Vistaar.
            </h2>
            <p className="mt-6 text-[18px] leading-[1.6] text-zinc-300 max-w-xl">
              Whether you're launching, rebranding, or scaling through AI —
              start with a free 30-minute strategy call. No pitch deck, no
              pressure.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row w-full sm:w-auto">
              <Button
                size="lg"
                variant="secondary-mint"
                className="text-black w-full sm:w-auto"
                rightIcon={<ArrowRight className="h-4 w-4" />}
                href="/contact"
              >
                Start your project
              </Button>
              <Button
                size="lg"
                variant="secondary-white"
                className="w-full sm:w-auto"
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
                    "rounded-full border border-white/10 bg-zinc-900/50 px-5 py-2.5 text-[14px] font-semibold text-zinc-300 shadow-sm transition-all cursor-default",
                    i === FLOW.length - 1 && "border-blue-500/30 bg-blue-600 text-white shadow-md",
                    i === 0 && "border-blue-500/20 bg-blue-500/10 text-blue-400"
                  )}
                >
                  {step}
                </motion.span>
                {i < FLOW.length - 1 && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    whileInView={{ opacity: 1, width: "auto" }}
                    transition={{ duration: 0.3, delay: i * 0.1 + 0.2 }}
                    className="text-zinc-500 mx-1"
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
      <ServicesStepper />
      <Flow />
      <Testimonials />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
