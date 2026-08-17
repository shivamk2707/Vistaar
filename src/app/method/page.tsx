"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/button";
import { Container, Section, SectionHeading } from "@/components/layout";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
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
    tone: "mint",
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
    tone: "periwinkle",
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
    tone: "magenta",
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
    tone: "orange",
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
    tone: "periwinkle",
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
    tone: "mint",
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
    tone: "orange",
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
    tone: "magenta",
  },
];

/* ============================================================
   TONES — light tints for each phase card.
   Pairs with each PHASE's `tone` field; cycle is intentional
   so adjacent cards read as distinct but the section feels
   coherent (mint → periwinkle → orange → magenta).
   ============================================================ */
type ToneKey = "mint" | "periwinkle" | "orange" | "magenta";

const TONES: Record<
  ToneKey,
  {
    /** Soft wash used as the card background. */
    wash: string;
    /** Pill / chip color for the phase number badge. */
    badge: string;
    /** Stronger color for the accent line + active border glow. */
    accent: string;
  }
> = {
  mint: {
    wash: "linear-gradient(135deg, rgba(200,246,249,0.55) 0%, rgba(200,246,249,0.18) 60%, transparent 100%)",
    badge: "#0e6b6f",
    accent: "#c8f6f9",
  },
  periwinkle: {
    wash: "linear-gradient(135deg, rgba(189,187,255,0.45) 0%, rgba(189,187,255,0.16) 60%, transparent 100%)",
    badge: "#3b3a8a",
    accent: "#bdbbff",
  },
  orange: {
    wash: "linear-gradient(135deg, rgba(252,76,2,0.16) 0%, rgba(252,76,2,0.06) 60%, transparent 100%)",
    badge: "#fc4c02",
    accent: "#fc4c02",
  },
  magenta: {
    wash: "linear-gradient(135deg, rgba(239,44,193,0.16) 0%, rgba(239,44,193,0.06) 60%, transparent 100%)",
    badge: "#ef2cc1",
    accent: "#ef2cc1",
  },
};

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

/* ============================================================
   PHASE TIMELINE — scroll-driven directional slide in/out,
   brand-gradient spine that fills with scroll, active-dot
   glow when the phase hits the viewport center.
   ============================================================ */
const SIDE_OFFSET = 120; // px the card slides in/out from

/**
 * One row in the timeline. Direction of the slide-in/out is set by
 * the row's `reverse` flag (alternating): even rows come in from
 * the left, odd rows come in from the right. Scrolling up reverses
 * the direction so the card "leaves" back the way it came.
 */
function PhaseCard({
  phase,
  index,
  reverse,
}: {
  phase: (typeof PHASES)[number];
  index: number;
  reverse: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-35% 0px -35% 0px" });

  // Each phase has its own scroll progress (0 → 1 as it crosses the viewport)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Card x/opacity/blur derived from scrollYProgress
  //   • Below viewport (down → 0.0):  x = +offset (hidden offscreen, "behind" the page)
  //   • Entering  (down → ~0.25):    x: +offset → 0, opacity: 0 → 1  ← left-in / right-in
  //   • In view   (~0.25 → 0.75):    x = 0, opacity = 1
  //   • Leaving   (down → 1.0):      x: 0 → -offset, opacity: 1 → 0  ← right-out / left-out
  // Scroll-up simply reverses the timeline, so the card slides back
  // out the same side it came from.
  const startX = reverse ? SIDE_OFFSET : -SIDE_OFFSET;
  const endX = reverse ? -SIDE_OFFSET : SIDE_OFFSET;
  const x = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [startX, 0, 0, 0, endX]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.35, 0.7, 0.9, 1],
    [0, 1, 1, 1, 0.4, 0]
  );
  const blur = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.7, 0.95, 1],
    [6, 0, 0, 0, 0, 6]
  );
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  // Tinted wash fades in with the card and peaks in the middle of the viewport
  const washOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 0.85, 1, 0.85, 0]
  );

  // Top accent line scales in (left → right) as the card enters
  const accentScaleX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  );

  // Active state for the center dot — true when the phase is in the
  // middle of the viewport (defined by useInView's margin above).
  const dotScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.8, 1, 1.3, 1, 0.8]
  );
  const dotOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.4, 0.7, 0.95, 1],
    [0.4, 1, 1, 1, 0.5, 0.2]
  );

  // Inner halo glow that pulses with the active phase
  const haloOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 0.6, 0.9, 0.6, 0]
  );

  const tone = TONES[phase.tone as ToneKey];

  // Internal content stagger — fades in slightly after the card starts to settle
  // (handled inline in the return below)

  return (
    <div ref={ref} className="relative">
      {/* Center spine dot (desktop) */}
      <motion.div
        style={{ scale: dotScale, opacity: dotOpacity }}
        className="absolute left-[27px] top-7 z-10 hidden h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[var(--ink)] lg:flex"
        aria-hidden
      >
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: tone.badge }}
        />
      </motion.div>
      <motion.span
        aria-hidden
        style={{ opacity: dotOpacity, background: tone.badge }}
        className="absolute left-[27px] top-7 z-0 hidden h-4 w-4 -translate-x-1/2 rounded-full blur-md lg:block"
      />

      {/* Mobile spine dot */}
      <span
        className="absolute left-[27px] top-7 z-10 inline-flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[var(--ink)] bg-[var(--canvas)] lg:hidden"
        aria-hidden
      >
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: tone.badge }}
        />
      </span>

      {/* The card itself — direction-aware slide in/out via useScroll.
          On desktop, `lg:order-2` swaps the two columns for reverse (odd)
          rows so the title+number cluster sits on the right; the swap is
          desktop-only so mobile keeps a natural top-down flow. */}
      <motion.div
        style={{ x, opacity, filter }}
        className={cn(
          "relative grid items-start gap-6 overflow-hidden rounded-[4px] border border-[var(--hairline)] p-6 transition-colors lg:grid-cols-2 lg:gap-8 lg:p-8",
          inView && "border-[var(--ink)]"
        )}
      >
        {/* Tinted background wash — fades in/out with scroll */}
        <motion.div
          aria-hidden
          style={{
            opacity: washOpacity,
            background: tone.wash,
          }}
          className="pointer-events-none absolute inset-0"
        />
        {/* Inner soft halo in the phase color — peaks at scroll center */}
        <motion.span
          aria-hidden
          style={{
            opacity: haloOpacity,
            background: `radial-gradient(60% 80% at 50% 0%, ${tone.accent}55 0%, transparent 70%)`,
          }}
          className="pointer-events-none absolute inset-0"
        />
        {/* Top accent line that scales left→right as the card enters */}
        <motion.span
          aria-hidden
          style={{
            scaleX: accentScaleX,
            transformOrigin: "left center",
            background: `linear-gradient(90deg, ${tone.accent} 0%, transparent 100%)`,
          }}
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
        />

        <div
          className={cn(
            "relative pl-14 lg:pl-0",
            reverse && "lg:order-2"
          )}
        >
          <div className="flex items-start gap-4 lg:justify-end">
            <motion.div
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.2, 0.7, 0.2, 1] }}
              className="hidden lg:block lg:text-right"
            >
              <div className="mono-eyebrow text-[var(--body)]">
                Phase {phase.n}
              </div>
              <h3 className="mt-1 text-display-md text-[var(--ink)]">
                {phase.title}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.5] text-[var(--body)]">
                {phase.objective}
              </p>
            </motion.div>
            <motion.span
              animate={
                inView
                  ? { scale: 1, boxShadow: `0 6px 18px -8px ${tone.accent}` }
                  : { scale: 0.85, boxShadow: "0 0 0 rgba(0,0,0,0)" }
              }
              transition={{ duration: 0.55, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
              className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-medium text-[var(--canvas)]"
              style={{ background: tone.badge }}
            >
              {phase.n}
            </motion.span>
          </div>
        </div>

        <div className="pl-14 lg:pl-0">
          <motion.div
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.2, 0.7, 0.2, 1] }}
            className="lg:hidden"
          >
            <div className="mono-eyebrow text-[var(--body)]">
              Phase {phase.n}
            </div>
            <h3 className="mt-1 text-display-md text-[var(--ink)]">
              {phase.title}
            </h3>
            <p className="mt-2 text-[14px] leading-[1.5] text-[var(--body)]">
              {phase.objective}
            </p>
          </motion.div>
          <motion.div
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.55, delay: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
            className="mt-4"
          >
            <h4 className="mono-eyebrow text-[var(--body)]">Activities</h4>
            <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
              {phase.activities.slice(0, 6).map((a) => (
                <li
                  key={a}
                  className="flex items-start gap-2 text-[14px] text-[var(--ink)]"
                >
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--ink)]" />
                  {a}
                </li>
              ))}
            </ul>
            <motion.div
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.55, delay: 0.32, ease: [0.2, 0.7, 0.2, 1] }}
              className="mt-5 grid gap-3 border-t border-[var(--hairline)] pt-4 sm:grid-cols-2"
            >
              <div>
                <div className="mono-eyebrow text-[var(--body)]">Timeline</div>
                <div className="mt-1 text-[14px] font-medium text-[var(--ink)]">
                  {phase.timeline}
                </div>
              </div>
              <div>
                <div className="mono-eyebrow text-[var(--body)]">
                  Client Involvement
                </div>
                <div className="mt-1 text-[14px] font-medium text-[var(--ink)]">
                  {phase.involvement}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function PhaseTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Section-level scroll progress drives the spine fill
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 25%"],
  });
  const spineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section className="bg-[var(--canvas)]">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="The Vistaar Method"
            title="The Vistaar growth cycle."
            description="Eight phases, run as a continuous loop. Each one sets up the next."
          />
        </Reveal>

        <div ref={sectionRef} className="relative mx-auto mt-14 max-w-5xl">
          {/* Static hairline spine (desktop) */}
          <div
            aria-hidden
            className="absolute left-[27px] top-2 bottom-2 hidden w-px bg-[var(--hairline)] lg:left-1/2 lg:block"
          />
          {/* Gradient fill spine (desktop) — scales with section scroll progress */}
          <motion.div
            aria-hidden
            style={{ scaleY: spineScaleY, transformOrigin: "top center" }}
            className="absolute left-[27px] top-2 bottom-2 hidden w-px lg:left-1/2 lg:block"
          >
            <div className="h-full w-full bg-gradient-to-b from-[var(--accent-cyan)] via-[var(--accent-blue)] to-[var(--accent-sky)]" />
          </motion.div>
          {/* Static hairline spine (mobile) */}
          <div
            aria-hidden
            className="absolute left-[27px] top-2 bottom-2 w-px bg-[var(--hairline)] lg:hidden"
          />

          <div className="space-y-10 lg:space-y-16">
            {PHASES.map((p, i) => (
              <PhaseCard key={p.n} phase={p} index={i} reverse={i % 2 === 1} />
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
export default function MethodPage() {
  return (
    <main className="relative">
      <PageHero
        eyebrow="The Vistaar Method"
        title="From vision to victory."
        highlight="With a clear path."
        description="Successful businesses are built on process, not guesswork. Our eight-phase methodology combines research, creativity, technology, and continuous optimization — and it's the same playbook we use on every engagement."
      >
        <Button
          size="md"
          variant="secondary-mint"
          className="rounded-full text-sm font-semibold shadow-sm transition-all group-hover:shadow-md"
          rightIcon={<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
          href="/contact"
        >
          Book a discovery call
        </Button>
        <Button
          size="md"
          variant="secondary-white"
          className="rounded-full text-sm font-semibold shadow-sm transition-all group-hover:shadow-md"
          rightIcon={<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
          href="/services"
        >
          See our services
        </Button>
      </PageHero>
      <PhaseTimeline />
    </main>
  );
}
