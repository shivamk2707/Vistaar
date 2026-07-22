"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  const match = value.match(/^([^\d.]*)([\d,.]+)([^\d.]*)$/);
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

function StatCard({ label, value, index }: { label: string; value: string; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const parsed = useMemo(() => parseStatValue(value), [value]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const triggers: ScrollTrigger[] = [];

      if (cardRef.current) {
        const entrance = gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 20, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            delay: index * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
        if (entrance.scrollTrigger) triggers.push(entrance.scrollTrigger);
      }

      if (numRef.current && parsed.number !== null && cardRef.current) {
        const counter = { val: 0 };
        const countUp = gsap.to(counter, {
          val: parsed.number,
          duration: 1.3,
          delay: index * 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            if (numRef.current) {
              numRef.current.textContent =
                parsed.prefix + formatCount(counter.val, parsed.decimals) + parsed.suffix;
            }
          },
        });
        if (countUp.scrollTrigger) triggers.push(countUp.scrollTrigger);
      }

      return () => triggers.forEach((t) => t.kill());
    });

    return () => mm.revert();
  }, [index, parsed]);

  return (
    <div
      ref={cardRef}
      className="rounded-[4px] border border-[var(--hairline)] bg-[var(--canvas)] p-5"
    >
      <div className="mono-eyebrow text-[var(--body)]">{label}</div>
      <div className="mt-2 text-[28px] font-medium leading-[1.1] tracking-[-0.02em] text-[var(--ink)]">
        <span ref={numRef}>
          {parsed.number === null ? value : parsed.prefix + "0" + parsed.suffix}
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   FEATURED CASE STUDY
   ============================================================ */
function Featured() {
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

        <Reveal delay={1}>
          <div className="overflow-hidden rounded-[4px] border border-[var(--hairline)] bg-[var(--canvas)]">
            <div className="grid gap-0 lg:grid-cols-2">
              <div className="relative flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 border-b border-[var(--hairline)] bg-[var(--canvas-dark)] p-8 text-center lg:aspect-auto lg:border-b-0 lg:border-r">
                <span className="mono-eyebrow text-[var(--on-dark)] opacity-50">
                  Case Study
                </span>
                <span className="text-[36px] font-medium text-[var(--on-dark)] sm:text-[44px]">
                  {FEATURED.client}
                </span>
                <span className="rounded-[3.25px] border border-[var(--surface-dark-soft)] bg-[var(--surface-dark-soft)] px-3 py-1 text-[12px] text-[var(--on-dark)] opacity-80">
                  {FEATURED.industry}
                </span>
              </div>
              <div className="p-7 sm:p-10">
                <h3 className="text-display-md text-[var(--ink)]">
                  {FEATURED.title}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.5] text-[var(--body)]">
                  {FEATURED.excerpt}
                </p>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {FEATURED.services.map((s) => (
                    <span
                      key={s}
                      className="rounded-[3.25px] border border-[var(--hairline)] bg-[var(--canvas)] px-2.5 py-1 text-[11px] text-[var(--body)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {FEATURED.results.map((r, i) => (
                    <StatCard key={r.label} label={r.label} value={r.value} index={i} />
                  ))}
                </div>

                <div className="mt-7 flex items-center justify-between">
                  <span className="text-[12px] text-[var(--body)]">
                    Duration: {FEATURED.duration}
                  </span>
                  <Link href="/contact">
                    <Button size="sm" variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
                      Read Full Case Study
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ============================================================
   CASE STUDIES GRID
   ============================================================ */
function CaseStudies() {
  return (
    <Section className="bg-[var(--canvas)]">
      <Container>
        <Reveal>
          <h2 className="text-display-lg text-[var(--ink)]">
            More success stories.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.map((c, i) => (
            <Reveal key={c.name} delay={(i % 3) + 1}>
              <div className="flex h-full flex-col rounded-[4px] border border-[var(--hairline)] bg-[var(--canvas)] p-6">
                <div className="flex items-center justify-between text-[12px] text-[var(--body)]">
                  <span className="mono-eyebrow">{c.industry}</span>
                  <span className="mono-eyebrow">{c.date}</span>
                </div>
                <h3 className="mt-4 text-[18px] font-medium leading-snug text-[var(--ink)]">
                  {c.name}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.5] text-[var(--body)]">
                  {c.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.services.map((s) => (
                    <span
                      key={s}
                      className="rounded-[3.25px] border border-[var(--hairline)] bg-[var(--canvas)] px-2.5 py-0.5 text-[11px] text-[var(--body)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-auto pt-5 inline-flex items-center gap-1 text-[13px] font-medium text-[var(--ink)]">
                  Read case study <ArrowUpRight className="h-3.5 w-3.5" />
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
   ARTICLES — category filter
   ============================================================ */
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
            <div className="flex flex-wrap gap-1 rounded-[4px] bg-[var(--hairline)] p-1">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActive(c)}
                  className={cn(
                    "h-8 rounded-[3.25px] px-3 text-[12px] font-medium transition-all",
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

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a, i) => (
            <Reveal key={a.title} delay={(i % 3) + 1}>
              <article className="flex h-full flex-col overflow-hidden rounded-[4px] border border-[var(--hairline)] bg-[var(--canvas)]">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--hairline)]">
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 text-[12px]">
                    <span className="rounded-[3.25px] border border-[var(--hairline)] bg-[var(--canvas)] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[var(--ink)]">
                      {a.category}
                    </span>
                    <span className="text-[var(--body)]">· {a.readTime}</span>
                  </div>
                  <h3 className="mt-3 text-[18px] font-medium leading-snug text-[var(--ink)]">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.5] text-[var(--body)]">
                    {a.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-5 text-[12px] text-[var(--body)]">
                    <span>
                      {a.author} · {a.date}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[var(--ink)]">
                      Read <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   RESOURCES
   ============================================================ */
function Resources() {
  return (
    <Section className="bg-[var(--canvas)]">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Free resources"
            title="Free resources, no email gate."
            description="Templates, checklists, and playbooks we use on our own projects."
          />
        </Reveal>
        <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((r, i) => (
            <Reveal key={r.name} delay={(i % 3) + 1}>
              <a
                href="#"
                className="group flex items-center justify-between gap-4 rounded-[4px] border border-[var(--hairline)] bg-[var(--canvas)] p-5 transition-colors hover:border-[var(--ink)]"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-[4px] bg-[var(--hairline)] text-[var(--ink)]">
                    <Bookmark className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="text-[14px] font-medium text-[var(--ink)]">
                      {r.name}
                    </div>
                    <div className="text-[12px] text-[var(--body)]">{r.kind}</div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[var(--body)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--ink)]" />
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   CTA
   ============================================================ */
function InsightsCta() {
  return (
    <Section tone="dark" className="bg-[var(--canvas-dark)]">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mono-eyebrow text-[var(--on-dark)] opacity-70">
              Get started
            </span>
            <h2 className="mt-5 text-display-xl text-[var(--on-dark)]">
              Ready to become our next success story?
            </h2>
            <p className="mt-5 text-[17px] leading-[1.5] text-[var(--on-dark)] opacity-80">
              Whether you&rsquo;re launching your first startup or scaling an
              established business, we&rsquo;d love to build the next chapter
              with you.
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
                href="/contact"
              >
                Book a strategy call
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
          href="/contact"
        >
          Book a strategy call
        </Button>
      </PageHero>

      <Featured />
      <CaseStudies />
      <Articles />
      <Resources />
      <InsightsCta />
    </main>
  );
}
