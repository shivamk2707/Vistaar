"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
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
   ARTICLES — category filter + animated cards
   ============================================================ */
const articleContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const articleCard: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(2px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.2, 0.7, 0.2, 1] },
  },
};

const articlePart: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const articleBadge: Variants = {
  hidden: { opacity: 0, x: -10, scale: 0.92 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

function ArticleCard({ article }: { article: (typeof ARTICLES)[number] }) {
  const [hover, setHover] = useState(false);
  // Parallax for the image on hover
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const imgX = useTransform(mx, [-1, 1], [-6, 6]);
  const imgY = useTransform(my, [-1, 1], [-6, 6]);

  return (
    <motion.article
      variants={articleCard}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[4px] border border-[var(--hairline)] bg-[var(--canvas)]",
        "transition-[border-color,box-shadow] duration-300 hover:border-[var(--ink)] hover:shadow-[0_18px_40px_-24px_rgba(1,1,32,0.25)]"
      )}
    >
      {/* Image with reveal + parallax */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--hairline)]">
        <motion.div
          variants={{
            hidden: { scale: 1.1, opacity: 0 },
            visible: { scale: 1, opacity: 1, transition: { duration: 0.8, ease: [0.2, 0.7, 0.2, 1] } },
          }}
          style={{ x: imgX, y: imgY }}
          className="absolute inset-0"
        >
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className={cn(
              "h-full w-full object-cover transition-transform duration-700 ease-out",
              hover && "scale-[1.05]"
            )}
          />
        </motion.div>
        {/* Sheen sweep on hover */}
        <motion.div
          aria-hidden
          initial={false}
          animate={hover ? { x: "120%" } : { x: "-120%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />
      </div>

      <motion.div
        variants={articleContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        className="flex flex-1 flex-col p-6"
      >
        <motion.div variants={articleBadge} className="flex items-center gap-2 text-[12px]">
          <span className="rounded-[3.25px] border border-[var(--hairline)] bg-[var(--canvas)] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[var(--ink)]">
            {article.category}
          </span>
          <span className="text-[var(--body)]">· {article.readTime}</span>
        </motion.div>

        <motion.h3
          variants={articlePart}
          className="mt-3 text-[18px] font-medium leading-snug text-[var(--ink)]"
        >
          {article.title}
        </motion.h3>

        <motion.p
          variants={articlePart}
          className="mt-2 text-[14px] leading-[1.5] text-[var(--body)]"
        >
          {article.excerpt}
        </motion.p>

        <motion.div
          variants={articlePart}
          className="mt-auto flex items-center justify-between pt-5 text-[12px] text-[var(--body)]"
        >
          <span>
            {article.author} · {article.date}
          </span>
          <motion.span
            animate={hover ? { x: 3 } : { x: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="inline-flex items-center gap-1 text-[var(--ink)]"
          >
            Read <ArrowUpRight className="h-3.5 w-3.5" />
          </motion.span>
        </motion.div>

        {/* Subtle accent line that grows on hover */}
        <motion.span
          aria-hidden
          initial={false}
          animate={hover ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
          style={{ transformOrigin: "left center" }}
          className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-[var(--accent-cyan)] via-[var(--accent-blue)] to-[var(--accent-sky)]"
        />
      </motion.div>
    </motion.article>
  );
}

function Articles() {
  const [active, setActive] = useState("All");
  const filtered =
    active === "All" ? ARTICLES : ARTICLES.filter((a) => a.category === active);

  return (
    <Section className="bg-[var(--canvas)]" id="articles">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <div>
              <h2 className="text-display-lg text-[var(--ink)]">
                Latest from the studio.
              </h2>
              <p className="mt-2 max-w-xl text-[15px] text-[var(--body)]">
                Thinking on branding, AI, growth, product, and the messy in-between.
              </p>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <div className="flex flex-wrap gap-1 rounded-full bg-[var(--hairline)] p-1">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActive(c)}
                  className={cn(
                    "h-8 rounded-full px-3 text-[12px] font-medium transition-all",
                    active === c
                      ? "bg-[var(--canvas)] text-[var(--ink)]"
                      : "text-[var(--body)] hover:text-[var(--ink)]"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={articleContainer}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((a) => (
              <ArticleCard key={a.title} article={a} />
            ))}
          </motion.div>
        </AnimatePresence>
      </Container>
    </Section>
  );
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
