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
        "group relative overflow-hidden rounded-[4px] border border-[var(--hairline)] bg-[var(--canvas)] p-3",
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
          className="overflow-hidden rounded-[4px] border border-[var(--hairline)] bg-[var(--canvas)]"
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
                    className="rounded-[3.25px] border border-[var(--hairline)] bg-[var(--canvas)] px-2.5 py-1 text-[11px] text-[var(--body)]"
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
   ARTICLE DETAIL DATA
   ============================================================ */
const ARTICLE_DETAILS: Record<string, {
  content: string[];
  tags: string[];
  takeaways: string[];
}> = {
  "Why your rebrand isn't moving the needle (and what to do instead).": {
    tags: ["Branding", "Strategy", "Positioning"],
    takeaways: [
      "A logo change without operational repositioning rarely impacts revenue.",
      "Customer discovery loops must precede brand visual identity sprints.",
      "Coherent multi-channel tone of voice yields 3.2× higher recall."
    ],
    content: [
      "Most rebrands change the surface. Real brand growth starts with positioning, voice, and operations — not a new logo.",
      "When companies experience plateauing growth, the instinctive reaction is often cosmetic: new typography, modern gradients, and a sleek logo mark. Yet within six months, CAC remains elevated and pipeline velocity stalls.",
      "The issue isn't aesthetic execution; it's the disconnect between brand promises and operational truth. A strategic brand system aligns positioning with product truth, sales enablement, and customer lifecycle touchpoints."
    ]
  },
  "Five AI workflows every growing business should ship in 2026.": {
    tags: ["AI & Automation", "Workflows", "Agents"],
    takeaways: [
      "Lead enrichment automations cut SDR research time by 75%.",
      "Support triage AI agents resolve 45% of Tier-1 tickets autonomously.",
      "Real-time BI summaries replace manual weekly status slide decks."
    ],
    content: [
      "Lead enrichment, support triage, content briefs, reporting, and customer health — the five automations with the highest ROI.",
      "In 2026, AI is no longer an experimental research sandbox; it is the fundamental operating substrate of high-velocity organizations. Companies winning today are not building raw LLM wrappers; they are orchestrating deterministic pipelines.",
      "By integrating lightweight vector embeddings and webhook-triggered agent chains, teams eliminate repetitive administrative toil while compounding high-touch human relationships where they matter most."
    ]
  },
  "From ₹0 to ₹10 Cr ARR: the GTM playbook we use with seed-stage founders.": {
    tags: ["Startup", "GTM", "Scaling"],
    takeaways: [
      "Define non-consensus positioning before writing marketing copy.",
      "Founder-led outbound must precede programmatic ad spend.",
      "Retention metrics at month 3 determine month 12 valuation multiples."
    ],
    content: [
      "The same five-step go-to-market framework we apply to every new product launch — and why most founders skip step two.",
      "Scaling from initial concept to ₹10 Cr ARR is a brutal test of distribution precision. Founders routinely fail by scaling ad budgets before achieving message-market congruence.",
      "Our five-step playbook forces founders through rigorous customer problem dissection, positioning differentiation, high-leverage content distribution, and iterative pricing validation."
    ]
  },
  "Performance marketing isn't dead — but the bar is much higher now.": {
    tags: ["Marketing", "Growth", "Paid Media"],
    takeaways: [
      "Creative volume and modular storytelling are the primary algorithmic levers.",
      "First-party data infrastructure protects margin against signal degradation.",
      "Blended MER (Marketing Efficiency Ratio) beats siloed in-platform ROAS."
    ],
    content: [
      "What changed in paid acquisition, why creative is now the moat, and how to structure campaigns for compounding returns.",
      "The era of lazy pixel tracking and generic single-image ads is permanently over. With platform algorithms automating media bidding, your creative asset pipeline is the sole lever for outsized return.",
      "Teams that produce 30+ modular creative angles per month while anchoring on clean zero-party data consistently outperform competitors paying exorbitant auction taxes."
    ]
  },
  "The hidden cost of building software nobody asks for.": {
    tags: ["Product", "Engineering", "UX"],
    takeaways: [
      "Feature bloat creates irreversible engineering debt and cognitive load.",
      "Continuous user interview cadence prevents multi-quarter roadmap mistakes.",
      "Measure product health by daily active feature utilization, not release count."
    ],
    content: [
      "Engineering velocity without customer insight is a tax. Here's the discovery loop that keeps our builds useful.",
      "Shipping fast feels like winning, until you realize 60% of shipped features are clicked by less than 2% of users. Feature bloat burdens codebases, complicates onboarding, and slows core execution.",
      "We implement a rigorous 10-day continuous discovery loop that pairs engineers directly with real user sessions before a single pull request is merged."
    ]
  },
  "Designing a brand system that scales across product, marketing, and motion.": {
    tags: ["Design", "Systems", "Identity"],
    takeaways: [
      "Design tokens must map seamlessly between Figma variables and CSS tokens.",
      "Motion guidelines give static brand systems dynamic personality.",
      "Component libraries should serve marketing landing pages and core SaaS apps alike."
    ],
    content: [
      "How we structure design tokens, components, and brand expressions to keep a coherent identity at 10x the surface area.",
      "As high-growth companies scale from 10 to 100 people, brand fragmentation inevitably occurs. Sales decks look different from social campaigns, and marketing landing pages clash with the core product interface.",
      "A unified brand architecture establishes single-source tokens, motion primitives, and expressive component patterns that evolve effortlessly across all brand surfaces."
    ]
  }
};

/* ============================================================
   BENTO GRID BLOG CARDS (ASYMMETRIC LAYOUT + HOVER POPUP)
   ============================================================ */

function BentoBlogSection() {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePopupArticle, setActivePopupArticle] = useState<(typeof ARTICLES)[number] | null>(null);
  const [isLockedByClick, setIsLockedByClick] = useState(false);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Map articles to the 6 asymmetric Bento blocks
  const articleGtm = ARTICLES[2];       // Card 1: From ₹0 to ₹10 Cr ARR (Startup)
  const articleRebrand = ARTICLES[0];   // Card 2: Why your rebrand isn't moving (Branding)
  const articleDesign = ARTICLES[5];    // Card 3: Designing a brand system (Design)
  const articleProduct = ARTICLES[4];   // Card 4: The hidden cost of software (Product)
  const articleAi = ARTICLES[1];        // Card 5: Five AI workflows (AI & Automation)
  const articleMarketing = ARTICLES[3]; // Card 6: Performance marketing (Marketing)

  const matchesCategory = (art: (typeof ARTICLES)[number]) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "AI" && art.category.includes("AI")) return true;
    return art.category.toLowerCase().includes(activeCategory.toLowerCase());
  };

  const handleCardHoverStart = (article: (typeof ARTICLES)[number]) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setActivePopupArticle(article);
      setIsLockedByClick(false);
    }, 380); // intentional hover threshold so casual passing does not pop
  };

  const handleCardHoverEnd = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    if (!isLockedByClick) {
      closeTimerRef.current = setTimeout(() => {
        setActivePopupArticle(null);
      }, 300);
    }
  };

  const handlePopupMouseEnter = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  };

  const handlePopupMouseLeave = () => {
    if (!isLockedByClick) {
      closeTimerRef.current = setTimeout(() => {
        setActivePopupArticle(null);
      }, 250);
    }
  };

  const handleCardClick = (article: (typeof ARTICLES)[number]) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setActivePopupArticle(article);
    setIsLockedByClick(true);
  };

  const handleClosePopup = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setActivePopupArticle(null);
    setIsLockedByClick(false);
  };

  return (
    <Section className="bg-[var(--canvas)] py-16 sm:py-24" id="articles">
      <Container>
        {/* Section Header with Category Filter */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                <span className="mono-eyebrow text-zinc-400">Insights & Perspectives</span>
              </div>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
                Latest from the studio.
              </h2>
              <p className="mt-2.5 max-w-xl text-[15px] leading-relaxed text-zinc-400">
                Hover over any card to preview full strategy metrics and complete insights on-screen.
              </p>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="flex flex-wrap gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/70 p-1.5 backdrop-blur-md">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActiveCategory(c)}
                  className={cn(
                    "h-8 rounded-full px-3.5 text-[12px] font-medium transition-all",
                    activeCategory === c
                      ? "bg-white text-zinc-950 font-semibold shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* 3-Column Asymmetric Bento Grid matching the reference image layout with image cards */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          
          {/* ============================================================
              COLUMN 1 (Left): Card 1 (Top Split) & Card 2 (Bottom Survey)
             ============================================================ */}
          <div className="flex flex-col gap-5">
            
            {/* Card 1 (Top Left / Medium-Tall Split Card — Startup GTM Playbook) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
              whileHover={{ y: -4 }}
              onMouseEnter={() => handleCardHoverStart(articleGtm)}
              onMouseLeave={handleCardHoverEnd}
              onClick={() => handleCardClick(articleGtm)}
              className={cn(
                "group cursor-pointer overflow-hidden rounded-2xl border border-zinc-800 bg-[#121318] transition-all duration-300 hover:border-zinc-700 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)]",
                !matchesCategory(articleGtm) && "opacity-35 grayscale"
              )}
            >
              {/* Top Half (Elevated Metric Box with Atmospheric Image) */}
              <div className="relative overflow-hidden border-b border-zinc-800 p-6 sm:p-7 min-h-[190px] flex flex-col justify-between">
                {/* Background Image with Dark Gradient */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={articleGtm.image}
                    alt={articleGtm.title}
                    fill
                    className="object-cover opacity-25 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-35"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121318] via-[#121318]/75 to-transparent" />
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <span className="rounded-[4px] border border-cyan-500/40 bg-cyan-950/80 px-2 py-0.5 text-[10px] font-mono font-medium uppercase tracking-wider text-cyan-300 backdrop-blur-sm">
                    {articleGtm.category}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-300">
                    {articleGtm.readTime}
                  </span>
                </div>

                <div className="relative z-10 mt-5">
                  <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-mono">
                    ₹0 → ₹10 Cr
                  </div>
                  <div className="mt-1.5 text-xs font-mono font-medium uppercase tracking-wider text-zinc-300">
                    Seed-Stage GTM ARR Playbook
                  </div>
                </div>

                {/* Subtle light bar */}
                <div className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
              </div>

              {/* Bottom Half (Action / Release Box) */}
              <div className="p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  {/* High-contrast dark badge with white crescent/smile icon */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-zinc-950 border border-zinc-700/80 shadow-md group-hover:scale-105 transition-transform">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-white fill-current">
                      <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
                    </svg>
                  </div>

                  <h3 className="mt-4 text-lg sm:text-xl font-bold tracking-tight text-white line-clamp-2">
                    {articleGtm.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-zinc-400 line-clamp-2">
                    {articleGtm.excerpt}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between pt-2 border-t border-zinc-800/60 text-xs text-zinc-400">
                  <span>{articleGtm.author} · {articleGtm.date}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                    Preview Strategy <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Card 2 (Bottom Left / Compact Survey Split Card — Rebrand Strategy) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
              whileHover={{ y: -4 }}
              onMouseEnter={() => handleCardHoverStart(articleRebrand)}
              onMouseLeave={handleCardHoverEnd}
              onClick={() => handleCardClick(articleRebrand)}
              className={cn(
                "group cursor-pointer overflow-hidden rounded-2xl border border-zinc-800 bg-[#121318] transition-all duration-300 hover:border-zinc-700 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)]",
                !matchesCategory(articleRebrand) && "opacity-35 grayscale"
              )}
            >
              {/* Image Preview Header */}
              <div className="relative aspect-[21/9] w-full overflow-hidden border-b border-zinc-800 bg-zinc-950">
                <Image
                  src={articleRebrand.image}
                  alt={articleRebrand.title}
                  fill
                  className="object-cover opacity-70 transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-2.5 left-4 flex items-center gap-2">
                  <span className="rounded-[4px] border border-cyan-500/40 bg-black/70 px-2 py-0.5 text-[10px] font-mono uppercase text-cyan-300 backdrop-blur-sm">
                    {articleRebrand.category}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-300">· {articleRebrand.readTime}</span>
                </div>
              </div>

              {/* Middle Split Stat Strip */}
              <div className="grid grid-cols-2 border-b border-zinc-800">
                <div className="border-r border-zinc-800 bg-zinc-900/60 p-3.5 sm:p-4">
                  <div className="text-[11px] font-mono text-zinc-400">— Surface Logo</div>
                  <div className="mt-0.5 text-2xl sm:text-3xl font-bold text-zinc-400 font-mono">
                    15%
                  </div>
                </div>
                <div className="bg-zinc-800/40 p-3.5 sm:p-4">
                  <div className="text-[11px] font-mono text-cyan-300">— Positioning & GTM</div>
                  <div className="mt-0.5 text-2xl sm:text-3xl font-bold text-white font-mono">
                    85%
                  </div>
                </div>
              </div>

              {/* Bottom Survey Block */}
              <div className="p-6 bg-gradient-to-br from-zinc-900/90 to-zinc-950 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-white leading-snug">
                    Why your rebrand isn&apos;t moving the needle —
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-zinc-400 line-clamp-2">
                    {articleRebrand.excerpt}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between text-xs text-zinc-400 border-t border-zinc-800/60 pt-3">
                  <span>{articleRebrand.author} · {articleRebrand.date}</span>
                  <span className="inline-flex items-center gap-1 text-cyan-400 group-hover:text-cyan-300 font-medium">
                    Preview <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </motion.div>

          </div>


          {/* ============================================================
              COLUMN 2 (Center): Card 3 (Top Quote) & Card 4 (Hero Tall Card)
             ============================================================ */}
          <div className="flex flex-col gap-5">
            
            {/* Card 3 (Top Center / Framed Design System Card) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.05, ease: [0.2, 0.7, 0.2, 1] }}
              whileHover={{ y: -4 }}
              onMouseEnter={() => handleCardHoverStart(articleDesign)}
              onMouseLeave={handleCardHoverEnd}
              onClick={() => handleCardClick(articleDesign)}
              className={cn(
                "group cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900/40 p-3 transition-all duration-300 hover:border-zinc-700 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)]",
                !matchesCategory(articleDesign) && "opacity-35 grayscale"
              )}
            >
              <div className="rounded-xl border border-zinc-800/90 bg-[#121318] overflow-hidden flex flex-col justify-between">
                {/* Image Banner Header */}
                <div className="relative aspect-[24/9] w-full overflow-hidden border-b border-zinc-800 bg-zinc-950">
                  <Image
                    src={articleDesign.image}
                    alt={articleDesign.title}
                    fill
                    className="object-cover opacity-60 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121318] via-[#121318]/40 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className="rounded-[4px] border border-zinc-700/80 bg-black/70 px-2 py-0.5 text-[10px] font-mono text-zinc-300 backdrop-blur-sm">
                      {articleDesign.readTime}
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  {/* Author Avatar Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-bold text-xs">
                        SK
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                          {articleDesign.author}
                          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-500 text-[9px] text-white">✓</span>
                        </div>
                        <div className="text-[10px] font-mono text-zinc-400">Lead Brand Strategist · {articleDesign.category}</div>
                      </div>
                    </div>
                  </div>

                  {/* Real Title & Excerpt */}
                  <div className="mt-4">
                    <h3 className="text-lg sm:text-xl font-medium tracking-tight text-white leading-snug">
                      &ldquo;Designing a brand system that scales across product, marketing, and motion —&rdquo;
                    </h3>
                    <p className="mt-2 text-xs text-zinc-400 line-clamp-2">
                      {articleDesign.excerpt}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs text-zinc-400 border-t border-zinc-800/60 pt-3">
                    <span className="text-[11px] text-zinc-400">{articleDesign.date}</span>
                    <span className="inline-flex items-center gap-1 text-cyan-400 group-hover:text-cyan-300 font-medium">
                      Preview Case Study <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 4 (Bottom Center / Grand Tall Hero Bento Card — Software Discovery & Client Brands) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.15, ease: [0.2, 0.7, 0.2, 1] }}
              whileHover={{ y: -4 }}
              onMouseEnter={() => handleCardHoverStart(articleProduct)}
              onMouseLeave={handleCardHoverEnd}
              onClick={() => handleCardClick(articleProduct)}
              className={cn(
                "group relative cursor-pointer overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-b from-[#14151a] via-[#101116] to-[#090a0d] flex flex-col justify-between min-h-[480px] sm:min-h-[510px] transition-all duration-300 hover:border-zinc-700 hover:shadow-[0_24px_50px_-20px_rgba(0,0,0,0.9)]",
                !matchesCategory(articleProduct) && "opacity-35 grayscale"
              )}
            >
              {/* Background Art with Parallax zoom */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={articleProduct.image}
                  alt={articleProduct.title}
                  fill
                  className="object-cover opacity-20 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#14151a]/90 via-[#101116]/95 to-[#090a0d]" />
              </div>

              <div className="relative z-10 p-7 sm:p-8 flex flex-col justify-between h-full">
                {/* Top Asterisk + Category & Arrow */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-white leading-none">✱</span>
                    <span className="rounded-[4px] border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-mono uppercase text-cyan-300">
                      {articleProduct.category}
                    </span>
                  </div>
                  <div className="h-[1.5px] flex-1 bg-zinc-700/80 relative flex items-center justify-end">
                    <ArrowRight className="h-4 w-4 text-zinc-300 -mr-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Middle Headline with Real Article Data */}
                <div className="my-auto py-6">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white leading-[1.15]">
                    {articleProduct.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-300 line-clamp-3">
                    {articleProduct.excerpt}
                  </p>
                  <div className="mt-4 text-xs font-mono text-zinc-400">
                    By {articleProduct.author} · {articleProduct.date} · {articleProduct.readTime}
                  </div>
                </div>

                {/* Bottom Overlapping Angled Ribbon Tapes (Real Vistaar Case Study Brands) */}
                <div className="relative -mx-10 -mb-6 mt-4 h-24 overflow-hidden pointer-events-none">
                  {/* Ribbon 1 (Angled Pink/Cyan Tape) */}
                  <div
                    className="absolute left-[-20%] right-[-20%] top-2 -rotate-[14deg] bg-cyan-950/80 border-y border-cyan-500/40 text-cyan-200 py-1.5 px-6 backdrop-blur-md shadow-lg flex items-center gap-6 whitespace-nowrap text-xs font-mono font-bold uppercase tracking-widest"
                  >
                    <span>✦ HELIOS EDUCATION</span>
                    <span>✦ ORBIT LABS AI</span>
                    <span>✦ AURELIA D2C</span>
                    <span>✦ CRESCENT REALTY</span>
                    <span>✦ SABLE BRAND</span>
                  </div>

                  {/* Ribbon 2 (Angled Blue/Indigo Tape) */}
                  <div
                    className="absolute left-[-20%] right-[-20%] top-8 -rotate-[6deg] bg-blue-950/90 border-y border-blue-500/50 text-blue-200 py-1.5 px-6 backdrop-blur-md shadow-xl flex items-center gap-6 whitespace-nowrap text-xs font-mono font-bold uppercase tracking-widest"
                  >
                    <span>✦ LATTICE SAAS</span>
                    <span>✦ QUANTUM HEALTH</span>
                    <span>✦ VISTAAR STUDIO</span>
                    <span>✦ 500+ FOUNDERS</span>
                    <span>✦ AI SYSTEMS</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>


          {/* ============================================================
              COLUMN 3 (Right): Card 5 (Top Framed) & Card 6 (Bottom Tall)
             ============================================================ */}
          <div className="flex flex-col gap-5">
            
            {/* Card 5 (Top Right / Framed AI Workflows Card) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
              whileHover={{ y: -4 }}
              onMouseEnter={() => handleCardHoverStart(articleAi)}
              onMouseLeave={handleCardHoverEnd}
              onClick={() => handleCardClick(articleAi)}
              className={cn(
                "group cursor-pointer rounded-2xl border border-cyan-500/20 bg-cyan-950/10 p-3 transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)]",
                !matchesCategory(articleAi) && "opacity-35 grayscale"
              )}
            >
              <div className="rounded-xl border border-zinc-800/90 bg-[#121318] overflow-hidden flex flex-col justify-between min-h-[220px]">
                {/* Image Header Preview */}
                <div className="relative aspect-[24/9] w-full overflow-hidden border-b border-zinc-800 bg-zinc-950">
                  <Image
                    src={articleAi.image}
                    alt={articleAi.title}
                    fill
                    className="object-cover opacity-60 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121318] via-transparent to-black/40" />
                  
                  <div className="absolute top-2.5 left-3">
                    <span className="rounded-[4px] border border-cyan-500/30 bg-black/70 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-cyan-300 backdrop-blur-sm">
                      {articleAi.category}
                    </span>
                  </div>

                  <div className="absolute top-2.5 right-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-700 bg-black/80 group-hover:border-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                      <ArrowUpRight className="h-3.5 w-3.5 text-zinc-300 group-hover:text-cyan-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-white leading-snug">
                    {articleAi.title}
                  </h3>
                  <p className="mt-2 text-xs text-zinc-400 line-clamp-2">
                    {articleAi.excerpt}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-800/80">
                    <span className="font-mono text-[11px]">{articleAi.author} · {articleAi.readTime}</span>
                    <span className="text-cyan-400 group-hover:text-cyan-300 font-medium">Explore Workflows →</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 6 (Bottom Right / Tall Performance Marketing Card with Badges & Slider) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
              whileHover={{ y: -4 }}
              onMouseEnter={() => handleCardHoverStart(articleMarketing)}
              onMouseLeave={handleCardHoverEnd}
              onClick={() => handleCardClick(articleMarketing)}
              className={cn(
                "group cursor-pointer overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-b from-[#151c28] via-[#10141f] to-[#0c0e14] flex flex-col justify-between min-h-[400px] transition-all duration-300 hover:border-zinc-700 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)]",
                !matchesCategory(articleMarketing) && "opacity-35 grayscale"
              )}
            >
              {/* Image Preview Banner */}
              <div className="relative aspect-[21/9] w-full overflow-hidden border-b border-zinc-800 bg-zinc-950">
                <Image
                  src={articleMarketing.image}
                  alt={articleMarketing.title}
                  fill
                  className="object-cover opacity-60 transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151c28] via-transparent to-black/40" />

                {/* Top Dual Pill Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900/90 border border-zinc-700 text-white font-bold text-xs shadow-sm backdrop-blur-sm">
                    ✱
                  </div>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-bold text-xs shadow-sm backdrop-blur-sm">
                    ◡̈
                  </div>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <span className="rounded-[4px] border border-cyan-500/30 bg-black/70 px-2 py-0.5 text-[10px] font-mono uppercase text-cyan-300 backdrop-blur-sm">
                    {articleMarketing.category}
                  </span>
                </div>
              </div>

              {/* Middle Headline with Real Article Data */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white leading-snug">
                    {articleMarketing.title}
                  </h3>

                  <p className="mt-2.5 text-xs leading-relaxed text-zinc-400 line-clamp-3">
                    {articleMarketing.excerpt}
                  </p>

                  <div className="mt-3 text-xs font-mono text-zinc-400">
                    By {articleMarketing.author} · {articleMarketing.date} · {articleMarketing.readTime}
                  </div>
                </div>

                {/* Bottom Slider / Reading Meter Bar */}
                <div className="mt-6">
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-3.5 flex items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                        <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-sky-400 shadow-[0_0_12px_rgba(6,182,212,0.5)]" />
                      </div>
                    </div>
                    <span className="text-[11px] font-mono font-medium text-cyan-300 shrink-0">
                      Preview Strategy ↗
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </Container>

      {/* ============================================================
          FEATURED CASE STUDY STYLE INFORMATION POP-UP (NO PAGE SCROLL)
         ============================================================ */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activePopupArticle && (
              <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8 pointer-events-auto overflow-hidden">
                {/* Backdrop with Click to Dismiss */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handleClosePopup}
                  className="absolute inset-0 bg-black/85 backdrop-blur-md"
                />

                {/* Modal Container: perfectly centered within viewport with isolated internal scroll */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 12 }}
                  transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
                  onMouseEnter={handlePopupMouseEnter}
                  onMouseLeave={handlePopupMouseLeave}
                  className="relative z-10 my-auto w-full max-w-5xl max-h-[82vh] overflow-hidden rounded-2xl border border-zinc-700/90 bg-[#0c0d12] shadow-[0_25px_70px_rgba(0,0,0,0.98)] flex flex-col lg:flex-row overscroll-contain"
                >
                  {/* Close Button Top Right */}
                  <button
                    type="button"
                    onClick={handleClosePopup}
                    aria-label="Close Preview"
                    className="absolute top-3.5 right-3.5 z-40 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/90 text-zinc-300 hover:bg-white hover:text-black transition-colors shadow-md backdrop-blur-sm"
                  >
                    ✕
                  </button>

                  {/* Left Column: Pinned / Sticky Image on Desktop */}
                  <div className="relative aspect-[16/9] lg:aspect-auto lg:w-[45%] shrink-0 overflow-hidden border-b lg:border-b-0 lg:border-r border-zinc-800 bg-zinc-950">
                    <div className="relative h-full min-h-[200px] sm:min-h-[250px] lg:min-h-full w-full">
                      <Image
                        src={activePopupArticle.image}
                        alt={activePopupArticle.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 lg:hidden" />
                      
                      {/* Sheen sweep animation */}
                      <motion.div
                        aria-hidden
                        initial={{ x: "-120%" }}
                        animate={{ x: "120%" }}
                        transition={{ duration: 1.6, delay: 0.2, ease: "easeInOut" }}
                        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
                      />

                      {/* Floating Category Pill on Image */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="rounded-full border border-cyan-400/40 bg-black/80 px-3 py-1 text-[11px] font-mono font-medium uppercase tracking-wider text-cyan-300 backdrop-blur-md">
                          {activePopupArticle.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Internal Scrollable Container (Independent Scroll) */}
                  <div className="flex-1 overflow-y-auto max-h-[55vh] lg:max-h-[82vh] p-6 sm:p-8 overscroll-contain flex flex-col justify-between">
                    <div>
                      {/* Meta eyebrow */}
                      <div className="mono-eyebrow text-zinc-400 flex flex-wrap items-center gap-2">
                        <span>By {activePopupArticle.author}</span>
                        <span>·</span>
                        <span>{activePopupArticle.date}</span>
                        <span>·</span>
                        <span className="text-cyan-400 font-medium">{activePopupArticle.readTime}</span>
                      </div>

                      {/* Title */}
                      <h3 className="mt-3 text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-white leading-snug">
                        {activePopupArticle.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-zinc-300">
                        {activePopupArticle.excerpt}
                      </p>

                      {/* Services / Topic Tags */}
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {activePopupArticle.services.map((s) => (
                          <span
                            key={s}
                            className="rounded-[3.25px] border border-zinc-800 bg-zinc-900/80 px-2.5 py-1 text-[11px] text-zinc-300 font-mono"
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      {/* 4 Stat / Result Cards matching Featured Case Study */}
                      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {activePopupArticle.results.map((r, i) => (
                          <StatCard key={r.label} label={r.label} value={r.value} index={i} />
                        ))}
                      </div>

                      {/* Detailed Takeaways list */}
                      {ARTICLE_DETAILS[activePopupArticle.title]?.takeaways && (
                        <div className="mt-5 rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-4">
                          <div className="text-[11px] font-mono font-medium uppercase tracking-wider text-cyan-300 mb-2">
                            Key Insights & Strategy
                          </div>
                          <ul className="space-y-1.5 text-xs text-zinc-300">
                            {ARTICLE_DETAILS[activePopupArticle.title].takeaways.map((t, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-cyan-400 mt-0.5 font-bold">✓</span>
                                <span>{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Modal Footer CTAs */}
                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-800/80 pt-5">
                      <span className="text-xs font-mono text-zinc-400">
                        Reading duration: {activePopupArticle.readTime}
                      </span>

                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <Link href="/contact" className="w-full sm:w-auto">
                          <Button
                            size="md"
                            variant="primary"
                            className="w-full rounded-full text-xs font-semibold shadow-sm"
                            rightIcon={<ArrowRight className="h-4 w-4" />}
                          >
                            Discuss This Strategy
                          </Button>
                        </Link>
                      </div>
                    </div>

                  </div>

                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
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
