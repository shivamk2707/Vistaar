"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowRight, ArrowUpRight, Bookmark, Search } from "lucide-react";
import { Button } from "@/components/button";
import { Container, Section, SectionHeading } from "@/components/layout";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

/* ============================================================
   DATA
   ============================================================ */
const FEATURED = {
  client: "Helios Education",
  industry: "Education",
  title: "Rebuilding a 12-year-old coaching brand for the next decade.",
  image: "/insights/insightds-case-study.png",
  excerpt:
    "How we took Helios from a regional coaching institute to a national education brand — rebranding, rebuilding the website, launching AI admissions, and cutting acquisition cost by 41%.",
  services: ["Branding", "Website", "SEO", "Performance Marketing", "AI Admissions"],
  results: [
    { label: "Lead growth", value: "+120%" },
    { label: "Website traffic", value: "+65%" },
    { label: "Conversion rate", value: "+42%" },
    { label: "CAC reduction", value: "−41%" },
  ],
  duration: "6 months",
};

const CASE_STUDIES = [
  {
    name: "Lattice — SaaS onboarding",
    industry: "SaaS",
    services: ["Product UX", "Web App", "Lifecycle"],
    summary: "Cut activation time from 14 days to 4 with a new onboarding flow.",
    date: "Q1 2026",
  },
  {
    name: "Aurelia — D2C relaunch",
    industry: "E-commerce",
    services: ["Brand", "E-commerce", "Performance"],
    summary: "Replatformed to Shopify, scaled paid + organic 3.4× in 5 months.",
    date: "Q4 2025",
  },
  {
    name: "Orbit Labs — AI agent platform",
    industry: "AI / SaaS",
    services: ["Brand", "Web", "GTM", "AI"],
    summary: "Launched category-defining brand and hit 1,200 signups in 6 weeks.",
    date: "Q3 2025",
  },
  {
    name: "Crescent — Real estate",
    industry: "Real Estate",
    services: ["Website", "Lead Gen", "Automation"],
    summary: "Built a lead engine that produces 200+ qualified leads per month.",
    date: "Q2 2025",
  },
  {
    name: "Sable — Personal brand",
    industry: "Creator",
    services: ["Personal Brand", "Web", "Content"],
    summary: "Helped a solo creator monetize at ₹10 Cr ARR in 11 months.",
    date: "Q1 2025",
  },
  {
    name: "Quantum — Healthcare",
    industry: "Healthcare",
    services: ["Brand", "Web", "Compliance"],
    summary: "HIPAA-ready patient platform with 4.8★ satisfaction.",
    date: "Q4 2024",
  },
];

const ARTICLES = [
  {
    title: "Why your rebrand isn't moving the needle (and what to do instead).",
    category: "Branding",
    readTime: "6 min read",
    author: "Sara Kapoor",
    date: "Mar 12, 2026",
    excerpt:
      "Most rebrands change the surface. Real brand growth starts with positioning, voice, and operations — not a new logo.",
    image: "/insights/rebrand-strategy.jpg",
    services: ["Brand Strategy", "Visual Identity", "Tone of Voice", "Positioning"],
    results: [
      { label: "Recall Lift", value: "+85%" },
      { label: "Brand Equity", value: "3.2×" },
      { label: "CAC Impact", value: "−34%" },
      { label: "Conversion", value: "+44%" },
    ],
  },
  {
    title: "Five AI workflows every growing business should ship in 2026.",
    category: "AI & Automation",
    readTime: "9 min read",
    author: "Maya Chen",
    date: "Mar 4, 2026",
    excerpt:
      "Lead enrichment, support triage, content briefs, reporting, and customer health — the five automations with the highest ROI.",
    image: "/insights/ai-workflows.png",
    services: ["AI Agents", "Workflow Ops", "Lead Routing", "CRM Automation"],
    results: [
      { label: "Hours Saved", value: "+120h" },
      { label: "Response Speed", value: "<15s" },
      { label: "Triage Accuracy", value: "98.4%" },
      { label: "ROI Multiple", value: "4.8×" },
    ],
  },
  {
    title: "From ₹0 to ₹10 Cr ARR: the GTM playbook we use with seed-stage founders.",
    category: "Startup",
    readTime: "11 min read",
    author: "Arjun Iyer",
    date: "Feb 24, 2026",
    excerpt:
      "The same five-step go-to-market framework we apply to every new product launch — and why most founders skip step two.",
    image: "/insights/startup-gtm.jpg",
    services: ["GTM Strategy", "Founder Outbound", "Pricing Models", "Funnel Ops"],
    results: [
      { label: "ARR Growth", value: "₹10 Cr" },
      { label: "Payback Period", value: "4.2 mo" },
      { label: "Lead Pipeline", value: "+210%" },
      { label: "Close Rate", value: "+38%" },
    ],
  },
  {
    title: "Performance marketing isn't dead — but the bar is much higher now.",
    category: "Marketing",
    readTime: "7 min read",
    author: "Arjun Iyer",
    date: "Feb 11, 2026",
    excerpt:
      "What changed in paid acquisition, why creative is now the moat, and how to structure campaigns for compounding returns.",
    image: "/insights/performance-marketing.jpg",
    services: ["Paid Ads", "Creative Testing", "Attribution", "Lifecycle Email"],
    results: [
      { label: "Blended MER", value: "3.8×" },
      { label: "Creative Output", value: "+30/mo" },
      { label: "ROAS Stability", value: "+52%" },
      { label: "CPA Reduction", value: "−28%" },
    ],
  },
  {
    title: "The hidden cost of building software nobody asks for.",
    category: "Product",
    readTime: "8 min read",
    author: "Devansh Rao",
    date: "Jan 28, 2026",
    excerpt:
      "Engineering velocity without customer insight is a tax. Here's the discovery loop that keeps our builds useful.",
    image: "/insights/clean-code.png",
    services: ["Product Discovery", "UX Research", "Engineering Sprints", "Telemetry"],
    results: [
      { label: "Dev Velocity", value: "+65%" },
      { label: "Feature Adoption", value: "92%" },
      { label: "Codebase Debt", value: "−50%" },
      { label: "User NPS", value: "78+" },
    ],
  },
  {
    title: "Designing a brand system that scales across product, marketing, and motion.",
    category: "Design",
    readTime: "10 min read",
    author: "Sara Kapoor",
    date: "Jan 15, 2026",
    excerpt:
      "How we structure design tokens, components, and brand expressions to keep a coherent identity at 10x the surface area.",
    image: "/insights/design-system.jpg",
    services: ["Design Tokens", "Figma Systems", "Motion Primitives", "UI Kit"],
    results: [
      { label: "Design Velocity", value: "2.5×" },
      { label: "Token Parity", value: "100%" },
      { label: "Brand Cohesion", value: "4.9★" },
      { label: "Sprint Cycles", value: "−40%" },
    ],
  },
];

const RESOURCES = [
  { name: "Brand Strategy Template", kind: "PDF" },
  { name: "Website Planning Guide", kind: "PDF" },
  { name: "Marketing Calendar 2026", kind: "Notion" },
  { name: "Business Growth Roadmap", kind: "PDF" },
  { name: "AI Workflow Pack", kind: "ZIP" },
  { name: "Startup Launch Checklist", kind: "PDF" },
];

const CATEGORIES = ["All", "Branding", "AI", "Startup", "Marketing", "Product", "Design"];

/* ============================================================
   STAT COUNTER
   ============================================================ */
function parseStatValue(value: string) {
  // Capture: leading sign/symbol, integer (commas/decimals allowed), trailing unit
  // Examples handled: "+120%", "−41%", "1,200", "4.8★", "$2.4M"
  const match = value.match(/^([^\d-]*)(-?[\d,]+(?:\.\d+)?)([^\d]*)$/);
  if (!match) return { prefix: "", number: null as number | null, suffix: value, decimals: 0 };
  const [, prefix, numStr, suffix] = match;
  const number = parseFloat(numStr.replace(/,/g, ""));
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { prefix, number, suffix, decimals };
}

function formatCount(n: number, decimals: number) {
  return n.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function StatCard({
  label,
  value,
  index,
}: {
  label: string;
  value: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-10% 0px" });
  const parsed = useMemo(() => parseStatValue(value), [value]);

  // Spring-driven count for a smooth, premium feel
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, {
    duration: 1400,
    bounce: 0,
  });

  // Initial display — chosen based on whether the value is numeric.
  // No synchronous setState in any effect.
  const [display, setDisplay] = useState<string>(() =>
    parsed.number === null
      ? value
      : `${parsed.prefix}0${parsed.suffix}`
  );

  useEffect(() => {
    if (!inView) return;
    if (parsed.number === null) return; // already showing the raw value
    const target = parsed.number;
    const prefix = parsed.prefix;
    const suffix = parsed.suffix;
    const decimals = parsed.decimals;
    const unsub = springVal.on("change", (latest) => {
      setDisplay(`${prefix}${formatCount(latest, decimals)}${suffix}`);
    });
    // Per-index stagger for a sequenced reveal
    const t = setTimeout(() => motionVal.set(target), index * 110);
    // Settle: snap to the exact integer on completion (avoids "119.7%")
    const settle = setTimeout(() => {
      setDisplay(`${prefix}${formatCount(target, decimals)}${suffix}`);
    }, 1400 + index * 110);
    return () => {
      unsub();
      clearTimeout(t);
      clearTimeout(settle);
    };
  }, [inView, parsed, index, springVal, motionVal]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.2, 0.7, 0.2, 1],
      }}
      className={cn(
        "group relative overflow-hidden rounded-[16px] border border-[var(--hairline)] bg-[var(--canvas)] p-3",
        "transition-colors hover:border-[var(--ink)]"
      )}
    >
      <div className="mono-eyebrow text-[var(--body)]">{label}</div>
      <div
        className={cn(
          "mt-2 text-[32px] font-medium leading-[1.1] tracking-[-0.02em] text-[var(--ink)]",
          "tabular-nums"
        )}
      >
        {display}
      </div>

      {/* Subtle highlight bar that fills as the count completes */}
      <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{
          duration: 1.4,
          delay: index * 0.08,
          ease: [0.2, 0.7, 0.2, 1],
        }}
        style={{ transformOrigin: "left center" }}
        className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-[var(--accent-cyan)] via-[var(--accent-blue)] to-[var(--accent-sky)]"
      />
    </motion.div>
  );
}

/* ============================================================
   TYPEWRITER HOOK
   Types character-by-character when `enabled` is true.
   Skips straight to the final text when reduced motion is preferred.
   ============================================================ */
function useTypewriter(
  text: string,
  enabled: boolean,
  opts: { speed?: number; startDelay?: number } = {}
) {
  const { speed = 26, startDelay = 0 } = opts;
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  // No setState-on-mount gymnastics: pick the initial value from the props.
  const [displayed, setDisplayed] = useState<string>(() =>
    reduced || !enabled ? text : ""
  );
  const [done, setDone] = useState<boolean>(() => reduced || !enabled);

  useEffect(() => {
    // We only animate when enabled flips to true (the only interesting path).
    // Otherwise the initial state already reflects `text`.
    if (!enabled || reduced) return;
    let i = 0;
    let cancelled = false;
    const start = window.setTimeout(() => {
      if (cancelled) return;
      const id = window.setInterval(() => {
        if (cancelled) return;
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          window.clearInterval(id);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => {
      cancelled = true;
      window.clearTimeout(start);
    };
  }, [text, enabled, speed, startDelay, reduced]);

  return { displayed, done };
}

function Typewriter({
  text,
  start,
  speed,
  delay,
  className,
}: {
  text: string;
  start: boolean;
  speed?: number;
  delay?: number;
  className?: string;
}) {
  const { displayed, done } = useTypewriter(text, start, { speed, startDelay: delay });
  return (
    <span className={className}>
      {displayed}
      <AnimatePresence>
        {!done && (
          <motion.span
            key="caret"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: [1, 0, 1] }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.9, repeat: Infinity, ease: "linear" },
            }}
            className="inline-block w-[1.5px] h-[1em] align-baseline ml-0.5 bg-current"
          />
        )}
      </AnimatePresence>
    </span>
  );
}

/* ============================================================
   FEATURED CASE STUDY — typing + sequenced fade-ins
   ============================================================ */
const featuredVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const featuredItem: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] },
  },
};

const tagPop: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.92 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

function Featured() {
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, { once: true, margin: "-12% 0px" });
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInView = useInView(imageRef, { once: true, margin: "-10% 0px" });

  const metaText = `Client: ${FEATURED.client}  ·  Industry: ${FEATURED.industry}`;
  // Title starts after the meta line finishes typing
  const titleDelay = Math.min(1400, metaText.length * 22 + 250 + 350);

  return (
    <Section className="bg-[var(--canvas)]">
      <Container>
        <Reveal>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <span className="mono-eyebrow text-[var(--body)]">
                Featured Case Study
              </span>
              <h2 className="mt-3 text-display-xl text-[var(--ink)]">
                The work, the wins, the receipts.
              </h2>
            </div>
            <Link
              href="/contact"
              className="hidden text-[14px] font-medium text-[var(--ink)] hover:opacity-70 sm:inline-flex sm:items-center sm:gap-1"
            >
              Start a project <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div
          ref={cardRef}
          className="overflow-hidden rounded-[20px] border border-[var(--hairline)] bg-[var(--canvas)]"
        >
          <div className="grid gap-0 lg:grid-cols-2">
            {/* Left: image with reveal animation */}
            <div
              ref={imageRef}
              className="relative aspect-[4/3] w-full overflow-hidden border-b border-[var(--hairline)] bg-[var(--canvas-dark)] lg:aspect-auto lg:border-b-0 lg:border-r"
            >
              <motion.div
                initial={{ scale: 1.12, opacity: 0 }}
                animate={imageInView ? { scale: 1, opacity: 1 } : undefined}
                transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1] }}
                className="absolute inset-0"
              >
                <motion.div
                  initial={{ y: "6%" }}
                  animate={imageInView ? { y: "0%" } : undefined}
                  transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={FEATURED.image}
                    alt={FEATURED.title}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </motion.div>
              {/* Sheen sweep on first reveal */}
              <motion.div
                aria-hidden
                initial={{ x: "-120%" }}
                animate={imageInView ? { x: "120%" } : undefined}
                transition={{ duration: 1.6, delay: 0.4, ease: "easeInOut" }}
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent"
              />
            </div>

            {/* Right: sequenced fade + typing */}
            <motion.div
              variants={featuredVariants}
              initial="hidden"
              animate={cardInView ? "visible" : "hidden"}
              className="p-7 sm:p-10"
            >
              <motion.div variants={tagPop} className="mono-eyebrow text-[var(--body)]">
                <Typewriter
                  text={metaText}
                  start={imageInView}
                  speed={22}
                  delay={350}
                  className="text-[var(--body)]"
                />
              </motion.div>

              <motion.h3
                variants={featuredItem}
                className="mt-3 text-display-md text-[var(--ink)]"
              >
                <Typewriter
                  text={FEATURED.title}
                  start={imageInView}
                  speed={28}
                  delay={titleDelay}
                />
              </motion.h3>

              <motion.p
                variants={featuredItem}
                className="mt-4 text-[15px] leading-[1.5] text-[var(--body)]"
              >
                {FEATURED.excerpt}
              </motion.p>

              <motion.div
                variants={featuredVariants}
                initial="hidden"
                animate={cardInView ? "visible" : "hidden"}
                className="mt-6 flex flex-wrap gap-1.5"
              >
                {FEATURED.services.map((s) => (
                  <motion.span
                    key={s}
                    variants={tagPop}
                    className="rounded-[20px] border border-[var(--hairline)] bg-[var(--canvas)] px-2.5 py-1 text-[11px] text-[var(--body)]"
                  >
                    {s}
                  </motion.span>
                ))}
              </motion.div>

              <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {FEATURED.results.map((r, i) => (
                  <StatCard key={r.label} label={r.label} value={r.value} index={i} />
                ))}
              </div>

              <motion.div
                variants={featuredItem}
                className="mt-7 flex items-center justify-between"
              >
                <span className="text-[12px] text-[var(--body)]">
                  Duration: {FEATURED.duration}
                </span>
                <Link href="/contact">
                  <Button size="md"
                    variant="primary"
                    className="rounded-full text-sm font-semibold shadow-sm transition-all group-hover:shadow-md"
                    rightIcon={<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}>
                    Read Full Case Study
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
/* ============================================================
   BENTO GRID BLOG CARDS (INTERACTIVE MASONRY)
   ============================================================ */

function ArticleCard({ article, className }: { article: typeof ARTICLES[number]; className?: string }) {
  return (
    <div className={cn("group relative overflow-hidden rounded-2xl border border-zinc-800 bg-[#121318] transition-all hover:border-zinc-700 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)]", className)}>
      {/* Default State */}
      <Image src={article.image} alt={article.title} fill className="object-cover opacity-50 transition-all duration-500 ease-out group-hover:scale-105 group-hover:opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#121318] via-[#121318]/40 to-transparent pointer-events-none" />
      
      <div className="absolute bottom-6 left-6 right-6 flex flex-col justify-end transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
        <span className="mb-3 w-max rounded-[4px] border border-blue-500/40 bg-blue-950/80 px-2 py-0.5 text-[10px] font-mono font-medium uppercase tracking-wider text-blue-300">
          {article.category}
        </span>
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white leading-snug line-clamp-2 drop-shadow-md">
          {article.title}
        </h3>
      </div>

      {/* Hover State Reveal */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-7 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
        
        <div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white line-clamp-2">{article.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300 line-clamp-3">{article.excerpt}</p>
        </div>

        <div className="mt-auto pt-6 pointer-events-auto">
          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-2 border-y border-zinc-800/80 py-3 mb-4">
            {article.results.slice(0, 4).map((r, i) => (
              <div key={i} className="flex flex-col items-center justify-center border-r border-zinc-800/80 last:border-0 px-1">
                <span className="text-[11px] font-mono text-zinc-500 mb-0.5 hidden sm:block truncate w-full text-center">{r.label}</span>
                <span className="text-xs sm:text-sm font-mono font-semibold text-blue-500">{r.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function BentoBlogSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const matchesCategory = (article: typeof ARTICLES[number]) =>
    activeCategory === "All" || article.category === activeCategory;

  return (
    <Section className="bg-[var(--canvas)] py-16 sm:py-24" id="articles">
      <Container>
        {/* 3-Column Random Span grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[300px]">
            {/* Blog 1: 1 Col */}
            <Reveal className={cn("col-span-1 transition-opacity duration-300", !matchesCategory(ARTICLES[0]) && "opacity-30 grayscale pointer-events-none")}>
              <ArticleCard article={ARTICLES[0]} className="h-full w-full" />
            </Reveal>
            
            {/* Blog 2: 2 Cols */}
            <Reveal className={cn("col-span-1 md:col-span-2 transition-opacity duration-300", !matchesCategory(ARTICLES[1]) && "opacity-30 grayscale pointer-events-none")}>
              <ArticleCard article={ARTICLES[1]} className="h-full w-full" />
            </Reveal>

            {/* Blog 3: 2 Cols */}
            <Reveal className={cn("col-span-1 md:col-span-2 transition-opacity duration-300", !matchesCategory(ARTICLES[2]) && "opacity-30 grayscale pointer-events-none")}>
              <ArticleCard article={ARTICLES[2]} className="h-full w-full" />
            </Reveal>
            
            {/* Blog 4: 1 Col */}
            <Reveal className={cn("col-span-1 transition-opacity duration-300", !matchesCategory(ARTICLES[3]) && "opacity-30 grayscale pointer-events-none")}>
              <ArticleCard article={ARTICLES[3]} className="h-full w-full" />
            </Reveal>

            {/* Blog 5: 3 Cols */}
            <Reveal className={cn("col-span-1 md:col-span-3 transition-opacity duration-300", !matchesCategory(ARTICLES[4]) && "opacity-30 grayscale pointer-events-none")}>
              <ArticleCard article={ARTICLES[4]} className="h-full w-full" />
            </Reveal>
          </div>

      </Container>
    </Section>
  );
}

function Articles() {
  return <BentoBlogSection />;
}

/* ============================================================
   PAGE
   ============================================================ */
export default function InsightsPage() {
  return (
    <main className="relative">
      <PageHero
        eyebrow="Insights"
        title="Ideas."
        highlight="Strategy. Results."
        description="Where Vistaar thinks out loud. Case studies, articles, and free resources on branding, AI, growth, and the business of building a modern company."
      >
        <Button
          size="md"
          variant="secondary-mint"
          className="rounded-full text-sm font-semibold shadow-sm transition-all group-hover:shadow-md"
          rightIcon={<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
          href="/contact"
        >
          Start your project
        </Button>
        <Button
          size="md"
          variant="secondary-white"
          className="rounded-full text-sm font-semibold shadow-sm transition-all group-hover:shadow-md"
          rightIcon={<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
          href="/contact"
        >
          Book a strategy call
        </Button>
      </PageHero>

      <Featured />
      <Articles />
    </main>
  );
}
