"use client";

import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Palette,
  Code2,
  Brain,
  LineChart,
  Wrench,
  Quote,
  ChevronDown,
  Check,
  X,
  Building2,
  BriefcaseBusiness,
  GraduationCap,
  HeartPulse,
  Hotel,
  Landmark,
  Rocket,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/button";
import { Container, Section, SectionHeading } from "@/components/layout";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import ModernLandingHero from "@/components/modern-landing-hero";
import Link from "next/link";

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
                    className="w-full max-w-lg overflow-hidden relative"
                  >
                    <img
                      src={
                        activeIndex === 0 ? "/images/practice/practice-illustration-01.png" :
                          activeIndex === 1 ? "/images/practice/practice-illustration-02.png" :
                            activeIndex === 2 ? "/images/practice/practice-illustration-03.png" :
                              activeIndex === 3 ? "/images/practice/practice-illustration-04.png" :
                                activeIndex === 4 ? "/images/practice/practice-illustration-05.png" :
                                  "/images/practice/practice-illustration-06.png"
                      }
                      alt="Service Visual"
                      className="w-full h-full object-contatin"
                    />
                    {/* Gradient overlay for text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  </motion.div>
                </AnimatePresence>
                {/* Number Overlay */}
                <div className="absolute bottom-0 left-8 text-7xl lg:text-8xl font-bold tracking-tighter text-white/90 drop-shadow-2xl">
                  0{activeIndex + 1}
                </div>
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
  { value: "10+", label: "Brand Build", tone: "bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20" },
  { value: "30+", label: "Projects Delivered", tone: "bg-orange-500/10 border-orange-500/20 hover:bg-orange-500/20" },
  { value: "8+", label: "Industries Served", tone: "bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20" },
  { value: "5+", label: "Digital Products Built", tone: "bg-fuchsia-500/10 border-fuchsia-500/20 hover:bg-fuchsia-500/20" },
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
            eyebrow=""
            title="Vistaar vs. Traditional Agency"
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
  {
    quote:
      "Vistaar helped us turn a complex product into a clear, confident story. Our launch conversations became sharper, and the quality of inbound interest improved within weeks.",
    name: "Rohan Kulkarni",
    role: "Co-founder, Orbit Labs",
    initials: "RK",
    image: "https://i.pravatar.cc/150?u=Rohan",
  },
  {
    quote:
      "The new website finally reflects the ambition of our team. Vistaar brought strategy, design, and execution together without losing sight of what our customers actually need.",
    name: "Ishita Nair",
    role: "Director, Northstar Learning",
    initials: "IN",
    image: "https://i.pravatar.cc/150?u=Ishita",
  },
  {
    quote:
      "We came in looking for marketing support and left with a growth system. The team made our priorities visible, measurable, and much easier to execute.",
    name: "Arjun Shah",
    role: "Founder, Terra Commerce",
    initials: "AS",
    image: "https://i.pravatar.cc/150?u=Arjun",
  },
];

const INDUSTRIES = [
  {
    name: "Real Estate",
    description: "Positioning, sales journeys, and digital experiences that help property brands convert trust into qualified leads.",
    icon: Building2,
    accent: "from-sky-400/60 via-cyan-400/25 to-transparent",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8UmVhbCUyMEVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    name: "Hotel Chains",
    description: "Guest experiences, brand storytelling, and direct-booking funnels designed for simple discovery and higher conversion.",
    icon: Hotel,
    accent: "from-violet-400/60 via-indigo-400/25 to-transparent",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmCc3cbFuDBYFibKYHHMhsfgvCTtRqzwurex3uYoDaLQ&s=10"
  },
  {
    name: "Startups",
    description: "Sharp positioning, product storytelling, and launch systems that help new ventures stand out under pressure.",
    icon: Rocket,
    accent: "from-cyan-400/60 via-sky-400/25 to-transparent",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Education",
    description: "Trust-first digital experiences that simplify admissions, strengthen reputation, and improve enquiry quality.",
    icon: GraduationCap,
    accent: "from-blue-400/60 via-indigo-400/25 to-transparent",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEVkdWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    name: "Healthcare",
    description: "Clearer patient journeys, better digital trust, and better-performing service experiences across care teams.",
    icon: HeartPulse,
    accent: "from-emerald-400/60 via-cyan-400/25 to-transparent",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SGVhbHRoY2FyZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    name: "E-Commerce",
    description: "Conversion-focused storefronts, product storytelling, and growth systems that turn browsing into loyal customers.",
    icon: ShoppingCart,
    accent: "from-amber-400/60 via-orange-400/25 to-transparent",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fHww"
  },
  {
    name: "IT Firms",
    description: "Brand systems and growth infrastructure that help technical teams explain value clearly and win better-fit clients.",
    icon: BriefcaseBusiness,
    accent: "from-violet-400/60 via-fuchsia-400/25 to-transparent",
    image: "https://plus.unsplash.com/premium_photo-1661488246595-7f21bf98b7cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SVQlMjBGaXJtc3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    name: "Law Firms",
    description: "Reputation-led digital presence built to communicate expertise, credibility, and trust with clarity.",
    icon: Landmark,
    accent: "from-sky-300/60 via-blue-400/25 to-transparent",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TGF3JTIwRmlybXN8ZW58MHx8MHx8fDA%3D"
  },
] as const;

function IndustriesSection() {
  return (
    <Section className="relative overflow-hidden bg-[var(--canvas)] py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-sky-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[260px] w-[260px] rounded-full bg-violet-500/10 blur-[120px]" />
      </div>

      <Container className="relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow="Industries"
            title="We Build Momentum Across Industries."
            description="From high-trust service brands to fast-moving digital companies, we shape the right positioning, story, and system for the business behind the brand."
          />
        </Reveal>

        <div className="mt-16">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 md:gap-x-6 md:gap-y-7">
            {INDUSTRIES.map((industry, index) => {
              const Icon = industry.icon;

              return (
                <motion.div
                  key={industry.name}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className={cn(
                    "group relative h-full min-h-[170px] overflow-hidden rounded-[20px] border border-white/10 shadow-[0_20px_60px_rgba(2,6,23,0.38)] backdrop-blur-xl transition-all duration-500 ease-out xl:col-span-1 xl:hover:z-20 xl:hover:shadow-[0_28px_80px_rgba(59,130,246,0.18)]",
                    index === 3 || index === INDUSTRIES.length - 1 ? "xl:-translate-y-2" : "",
                    index === 5 ? "xl:translate-y-2" : ""
                  )}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={industry.image}
                      alt={industry.name}
                      className="w-full h-full object-cover opacity-50 transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    {/* A single gradient that darkens the bottom for text readability, but keeps the top relatively clear */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-zinc-950/10 to-zinc-950/0" />
                  </div>

                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.10),transparent_35%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-sky-400/10 blur-3xl" />

                  <div className="relative z-10 flex h-full flex-col justify-between p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[var(--ink)] shadow-inner shadow-white/5 transition-all duration-500 group-hover:scale-105 group-hover:border-sky-300/40">
                        <Icon className="h-5 w-5 text-sky-300" />
                      </div>
                      <span className="mono-eyebrow text-[var(--body)]">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="mt-6 flex-1">
                      <h3 className="text-[22px] font-medium tracking-[-0.04em] text-[var(--ink)] transition-all duration-500 sm:text-[24px] xl:text-[26px]">
                        {industry.name}
                      </h3>

                      <p className="mt-3 max-h-0 overflow-hidden text-[14px] leading-[1.7] text-[var(--body)] opacity-0 transition-all duration-500 ease-out group-hover:max-h-[180px] group-hover:opacity-100 xl:group-hover:max-h-[220px]">
                        {industry.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
function Testimonials() {
  return (
    <Section className="bg-[var(--canvas)]">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Testimonials"
            title="AI Natives Build With Vistaar."
            description="From first-time founders to public company leaders — the people we partner with tend to stick around."
          />
        </Reveal>

        <div className="testimonials-marquee-shell mt-14 overflow-hidden">
          <div className="testimonials-marquee flex w-max gap-6">
            {[0, 1].map((setIndex) => (
              <div
                key={setIndex}
                className="flex shrink-0 gap-6"
                aria-hidden={setIndex === 1}
              >
                {TESTIMONIALS.map((t, i) => (
                  <motion.div
                    key={`${setIndex}-${t.name}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group flex h-full w-[min(85vw,360px)] shrink-0 flex-col rounded-2xl border border-white/5 bg-zinc-900/50 p-7 shadow-sm transition-all hover:shadow-[0_8px_30px_rgba(255,255,255,0.04)] lg:w-[380px]"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 transition-colors group-hover:bg-blue-500/20">
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
            ))}
          </div>
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
    q: "What services does Vistaar provide?",
    a: "Vistaar provides end-to-end business and digital solutions including business strategy, branding, website and app development, AI & automation, creative services, and digital marketing.",
  },
  {
    q: "What type of businesses do you work with?",
    a: "We work with startups, small and medium-sized businesses, established companies, entrepreneurs, and organizations looking to strengthen their brand, digital presence, or business operations.",
  },
  {
    q: "Can Vistaar create a customized solution for my business?",
    a: "Yes. We don't believe in one-size-fits-all solutions. We understand your goals, challenges, audience, and requirements before creating a solution tailored to your business",
  },
  {
    q: "What makes Vistaar different from a traditional agency?",
    a: "Vistaar combines strategy, creativity, technology, and AI to provide integrated solutions rather than treating each service as a separate requirement.",
  },
  {
    q: "Where is Vistaar based?",
    a: "Vistaar is based in Pune, India and works with businesses and organizations across different locations.",
  },
  {
    q: "Do you work with clients remotely?",
    a: "Yes. Our projects can be managed remotely using digital collaboration, communication, and project-management tools.",
  },
  {
    q: "How long does a typical project take?",
    a: "Timelines vary based on the scope. A focused brand identity or website might take 4-8 weeks, while complex full-stack or AI automation projects usually span 3 to 6 months. We provide clear delivery milestones before starting any work.",
  },
  {
    q: "How does pricing work?",
    a: "We offer transparent, milestone-based pricing rather than vague retainers. After a discovery call, we provide a detailed proposal that maps directly to the outcomes you need, ensuring you only pay for tangible value.",
  },
  {
    q: "Do you provide post-launch support?",
    a: "Absolutely. We view launch as the beginning. We offer dedicated growth retainers, technical support, and continuous AI optimization to ensure your systems scale smoothly over time.",
  },
];

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(2);

  const handleToggle = (index: number) => {
    const isOpen = open === index;
    setOpen(isOpen ? null : index);

    // Like Google "People also ask": reveal more items when one is opened
    if (!isOpen && visibleCount < FAQ_ITEMS.length) {
      setVisibleCount(prev => Math.min(prev + 2, FAQ_ITEMS.length));
    }
  };

  return (
    <Section className="bg-[var(--canvas)]">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Questions Founders Ask Us First."
            description="If yours isn't here, the easiest path is a quick call."
          />
        </Reveal>

        <div className="mt-14 max-w-3xl mx-auto divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
          {FAQ_ITEMS.slice(0, visibleCount).map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                layout
              >
                <button
                  type="button"
                  onClick={() => handleToggle(i)}
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
              Start Building With Vistaar.
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
                className="hidden rounded-full font-semibold shadow-sm transition-all group-hover:shadow-md sm:inline-flex"
                rightIcon={<ArrowRight className="h-4 w-4" />}
                href="/contact"
              >
                Start your project
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ============================================================
   FLOW — zig-zag journey with premium motion and hierarchy
   ============================================================ */
const FLOW = [
  {
    title: "Business Idea",
    description: "A raw opportunity, a problem to solve, or a product that deserves a sharper market story.",
    accent: "from-sky-500 via-cyan-400 to-blue-500",
  },
  {
    title: "Business Strategy",
    description: "Positioning, go-to-market thinking, and the decision framework that shapes every next move.",
    accent: "from-blue-500 via-indigo-500 to-violet-500",
  },
  {
    title: "Brand Identity",
    description: "Visual language, messaging, and perception design that make the brand memorable and credible.",
    accent: "from-cyan-400 via-sky-500 to-indigo-500",
  },
  {
    title: "Website Development",
    description: "A conversion-focused digital experience that turns strategy into an instant trust signal.",
    accent: "from-indigo-500 via-violet-500 to-fuchsia-500",
  },
  {
    title: "Marketing",
    description: "Demand generation systems designed to keep attention, qualify traffic, and build momentum.",
    accent: "from-violet-500 via-purple-500 to-pink-500",
  },
  {
    title: "Lead Generation",
    description: "The funnel that captures interest, qualifies intent, and turns curiosity into pipeline.",
    accent: "from-fuchsia-500 via-pink-500 to-rose-500",
  },
  {
    title: "AI Automation",
    description: "Operational leverage through intelligent workflows, assistants, and systems that reduce friction.",
    accent: "from-sky-500 via-blue-500 to-indigo-500",
  },
  {
    title: "Business Growth",
    description: "The compounding phase where better systems, stronger positioning, and smarter execution accelerate together.",
    accent: "from-cyan-400 via-blue-500 to-violet-500",
  },
  {
    title: "Scale",
    description: "A resilient engine built to compound customer trust, revenue, and long-term market advantage.",
    accent: "from-blue-500 via-indigo-500 to-purple-600",
  },
] as const;

function Flow() {
  return (
    <Section className="relative overflow-hidden bg-[var(--canvas)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.12),transparent_52%)]" />
      <Container className="relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow="The flow"
            title="How everything connects."
            description="One system, no dead ends. Strategy, design, delivery, and growth feed one another at every step."
          />
        </Reveal>

        <div className="relative mx-auto mt-16 max-w-6xl">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent md:block" />

          <div className="space-y-8 md:space-y-10">
            {FLOW.map((step, i) => {
              const isLeft = i % 2 === 0;
              const isLast = i === FLOW.length - 1;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_90px_minmax(0,1fr)]"
                >
                  {isLeft ? (
                    <>
                      <div className="flex justify-end md:col-start-1 md:pr-2">
                        <motion.div
                          whileHover={{ y: -6, scale: 1.01 }}
                          className="relative w-full max-w-[420px] overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(15,23,42,0.8))] p-6 shadow-[0_18px_40px_rgba(15,23,42,0.28)] backdrop-blur-sm"
                        >
                          <div
                            className={cn(
                              "absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
                              step.accent
                            )}
                          />
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[12px] font-semibold text-[var(--ink)]">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <span className="mono-eyebrow text-[var(--body)]">Phase {i + 1}</span>
                            </div>
                            {!isLast && (
                              <span className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--body)]">
                                <span className="h-2 w-2 rounded-full bg-[var(--primary)] shadow-[0_0_16px_rgba(143,231,255,0.7)]" />
                                Connects
                              </span>
                            )}
                          </div>

                          <h3 className="mt-5 text-[24px] font-medium tracking-[-0.03em] text-[var(--ink)]">
                            {step.title}
                          </h3>
                          <p className="mt-3 text-[15px] leading-[1.7] text-[var(--body)]">
                            {step.description}
                          </p>

                          <div className="mt-6 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--body)]">
                            <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-sky-300 to-violet-400" />
                            {isLast ? "Momentum engine" : "Next stage"}
                          </div>
                        </motion.div>
                      </div>

                      <div className="hidden md:flex md:col-start-2 md:justify-center">
                        <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-[var(--canvas)] shadow-[0_0_0_6px_rgba(148,163,184,0.06)]">
                          <span
                            className={cn(
                              "h-3.5 w-3.5 rounded-full bg-gradient-to-r shadow-[0_0_22px_rgba(96,165,250,0.8)]",
                              step.accent
                            )}
                          />
                        </div>
                      </div>

                      <div className="hidden md:block md:col-start-3" />
                    </>
                  ) : (
                    <>
                      <div className="hidden md:block md:col-start-1" />

                      <div className="hidden md:flex md:col-start-2 md:justify-center">
                        <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-[var(--canvas)] shadow-[0_0_0_6px_rgba(148,163,184,0.06)]">
                          <span
                            className={cn(
                              "h-3.5 w-3.5 rounded-full bg-gradient-to-r shadow-[0_0_22px_rgba(96,165,250,0.8)]",
                              step.accent
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex justify-start md:col-start-3 md:pl-2">
                        <motion.div
                          whileHover={{ y: -6, scale: 1.01 }}
                          className="relative w-full max-w-[420px] overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(15,23,42,0.8))] p-6 shadow-[0_18px_40px_rgba(15,23,42,0.28)] backdrop-blur-sm"
                        >
                          <div
                            className={cn(
                              "absolute inset-x-0 top-0 h-1 bg-gradient-to-r",
                              step.accent
                            )}
                          />
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[12px] font-semibold text-[var(--ink)]">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <span className="mono-eyebrow text-[var(--body)]">Phase {i + 1}</span>
                            </div>
                            {!isLast && (
                              <span className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--body)]">
                                <span className="h-2 w-2 rounded-full bg-[var(--primary)] shadow-[0_0_16px_rgba(143,231,255,0.7)]" />
                                Connects
                              </span>
                            )}
                          </div>

                          <h3 className="mt-5 text-[24px] font-medium tracking-[-0.03em] text-[var(--ink)]">
                            {step.title}
                          </h3>
                          <p className="mt-3 text-[15px] leading-[1.7] text-[var(--body)]">
                            {step.description}
                          </p>

                          <div className="mt-6 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--body)]">
                            <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-sky-300 to-violet-400" />
                            {isLast ? "Momentum engine" : "Next stage"}
                          </div>
                        </motion.div>
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
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
      <IndustriesSection />
      <Testimonials />
      <FaqSection />
      <FinalCta />
    </main>
  );
}
