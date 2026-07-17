"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  Clock,
  Bookmark,
  TrendingUp,
  BarChart3,
  Mail,
} from "lucide-react";
import { Button } from "@/components/button";
import { Container } from "@/components/layout";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Halo, GlassCard } from "@/components/halo";
import { useState } from "react";
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
  tone: "coral" as const,
};

const CASE_STUDIES = [
  {
    name: "Lattice — SaaS onboarding",
    industry: "SaaS",
    services: ["Product UX", "Web App", "Lifecycle"],
    summary: "Cut activation time from 14 days to 4 with a new onboarding flow.",
    date: "Q1 2026",
    tone: "blue" as const,
  },
  {
    name: "Aurelia — D2C relaunch",
    industry: "E-commerce",
    services: ["Brand", "E-commerce", "Performance"],
    summary: "Replatformed to Shopify, scaled paid + organic 3.4× in 5 months.",
    date: "Q4 2025",
    tone: "coral" as const,
  },
  {
    name: "Orbit Labs — AI agent platform",
    industry: "AI / SaaS",
    services: ["Brand", "Web", "GTM", "AI"],
    summary: "Launched category-defining brand and hit 1,200 signups in 6 weeks.",
    date: "Q3 2025",
    tone: "violet" as const,
  },
  {
    name: "Crescent — Real estate",
    industry: "Real Estate",
    services: ["Website", "Lead Gen", "Automation"],
    summary: "Built a lead engine that produces 200+ qualified leads per month.",
    date: "Q2 2025",
    tone: "blue" as const,
  },
  {
    name: "Sable — Personal brand",
    industry: "Creator",
    services: ["Personal Brand", "Web", "Content"],
    summary: "Helped a solo creator monetize at $1.2M ARR in 11 months.",
    date: "Q1 2025",
    tone: "coral" as const,
  },
  {
    name: "Quantum — Healthcare",
    industry: "Healthcare",
    services: ["Brand", "Web", "Compliance"],
    summary: "HIPAA-ready patient platform with 4.8★ satisfaction.",
    date: "Q4 2024",
    tone: "violet" as const,
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
    tone: "coral" as const,
  },
  {
    title: "Five AI workflows every growing business should ship in 2026.",
    category: "AI & Automation",
    readTime: "9 min read",
    author: "Maya Chen",
    date: "Mar 4, 2026",
    excerpt:
      "Lead enrichment, support triage, content briefs, reporting, and customer health — the five automations with the highest ROI.",
    tone: "blue" as const,
  },
  {
    title: "From $0 to $1M ARR: the GTM playbook we use with seed-stage founders.",
    category: "Startup",
    readTime: "11 min read",
    author: "Arjun Iyer",
    date: "Feb 24, 2026",
    excerpt:
      "The same five-step go-to-market framework we apply to every new product launch — and why most founders skip step two.",
    tone: "violet" as const,
  },
  {
    title: "Performance marketing isn't dead — but the bar is much higher now.",
    category: "Marketing",
    readTime: "7 min read",
    author: "Arjun Iyer",
    date: "Feb 11, 2026",
    excerpt:
      "What changed in paid acquisition, why creative is now the moat, and how to structure campaigns for compounding returns.",
    tone: "coral" as const,
  },
  {
    title: "The hidden cost of building software nobody asks for.",
    category: "Product",
    readTime: "8 min read",
    author: "Devansh Rao",
    date: "Jan 28, 2026",
    excerpt:
      "Engineering velocity without customer insight is a tax. Here's the discovery loop that keeps our builds useful.",
    tone: "blue" as const,
  },
  {
    title: "Designing a brand system that scales across product, marketing, and motion.",
    category: "Design",
    readTime: "10 min read",
    author: "Sara Kapoor",
    date: "Jan 15, 2026",
    excerpt:
      "How we structure design tokens, components, and brand expressions to keep a coherent identity at 10x the surface area.",
    tone: "violet" as const,
  },
];

const RESOURCES = [
  { name: "Brand Strategy Template", kind: "PDF", tone: "coral" as const },
  { name: "Website Planning Guide", kind: "PDF", tone: "blue" as const },
  { name: "Marketing Calendar 2026", kind: "Notion", tone: "violet" as const },
  { name: "Business Growth Roadmap", kind: "PDF", tone: "coral" as const },
  { name: "AI Workflow Pack", kind: "ZIP", tone: "blue" as const },
  { name: "Startup Launch Checklist", kind: "PDF", tone: "violet" as const },
];

const CATEGORIES = ["All", "Branding", "AI", "Startup", "Marketing", "Product", "Design"];

/* ============================================================
   FEATURED CASE STUDY
   ============================================================ */
function Featured() {
  return (
    <section className="relative py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-soft" />
                Featured Case Study
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-text-primary sm:text-4xl">
                The work, the wins, the receipts.
              </h2>
            </div>
            <Link
              href="/contact"
              className="hidden text-sm font-medium text-primary transition-colors hover:text-primary-hover sm:inline-flex sm:items-center sm:gap-1"
            >
              Start a project <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <GlassCard tone="coral" className="overflow-hidden p-0">
            <div className="grid gap-0 lg:grid-cols-2">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-primary-soft via-background-muted to-secondary-soft lg:aspect-auto">
                <Halo tone="coral" className="top-1/2 left-1/2 -z-0 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2" />
                <Halo tone="blue" className="bottom-6 right-6 -z-0 h-[200px] w-[200px]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                    Case Study
                  </span>
                  <span className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
                    {FEATURED.client}
                  </span>
                  <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-text-secondary">
                    {FEATURED.industry}
                  </span>
                </div>
              </div>
              <div className="p-7 sm:p-10">
                <h3 className="font-display text-2xl font-bold leading-tight text-text-primary sm:text-3xl">
                  {FEATURED.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">
                  {FEATURED.excerpt}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {FEATURED.services.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border bg-background px-3 py-1 text-xs text-text-secondary"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {FEATURED.results.map((r) => (
                    <div
                      key={r.label}
                      className="rounded-2xl border border-border bg-background p-3"
                    >
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                        {r.label}
                      </div>
                      <div className="mt-1 font-display text-xl font-bold text-primary">
                        {r.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex items-center justify-between">
                  <span className="text-xs text-text-muted">
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
          </GlassCard>
        </Reveal>
      </Container>
    </section>
  );
}

/* ============================================================
   CASE STUDIES GRID
   ============================================================ */
function CaseStudies() {
  return (
    <section className="relative py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold leading-tight text-text-primary sm:text-3xl">
              More success stories.
            </h2>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.map((c, i) => (
            <Reveal key={c.name} delay={(i % 3) + 1}>
              <GlassCard tone={c.tone} className="h-full p-6">
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span>{c.industry}</span>
                  <span>{c.date}</span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-text-primary">
                  {c.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {c.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.services.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs text-text-secondary"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Read case study <ArrowUpRight className="h-4 w-4" />
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ============================================================
   ARTICLES — with category filter
   ============================================================ */
function Articles() {
  const [active, setActive] = useState("All");
  const filtered =
    active === "All" ? ARTICLES : ARTICLES.filter((a) => a.category === active);

  return (
    <section id="articles" className="relative py-16 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-soft-tint"
      />
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <div>
              <h2 className="font-display text-2xl font-bold leading-tight text-text-primary sm:text-3xl">
                Latest from the studio.
              </h2>
              <p className="mt-2 max-w-xl text-sm text-text-secondary sm:text-base">
                Thinking on branding, AI, growth, product, and the messy in-between.
              </p>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActive(c)}
                  className={cn(
                    "rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium transition-colors",
                    active === c
                      ? "border-primary bg-primary text-white"
                      : "text-text-secondary hover:border-primary/40 hover:text-text-primary"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a, i) => (
            <Reveal key={a.title} delay={(i % 3) + 1}>
              <GlassCard tone={a.tone} className="flex h-full flex-col p-6">
                <div className="aspect-[16/10] w-full rounded-2xl bg-gradient-to-br from-primary-soft via-background-muted to-secondary-soft" />
                <div className="mt-5 flex items-center gap-2 text-xs">
                  <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    {a.category}
                  </span>
                  <span className="text-text-muted">· {a.readTime}</span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-text-primary">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {a.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between pt-5 text-xs text-text-muted">
                  <span>
                    {a.author} · {a.date}
                  </span>
                  <span className="inline-flex items-center gap-1 text-primary">
                    Read <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ============================================================
   RESOURCES
   ============================================================ */
function Resources() {
  return (
    <section className="relative py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-2xl font-bold leading-tight text-text-primary sm:text-3xl">
              Free resources, no email gate.
            </h2>
            <p className="mt-2 text-sm text-text-secondary sm:text-base">
              Templates, checklists, and playbooks we use on our own projects.
            </p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((r, i) => (
            <Reveal key={r.name} delay={(i % 3) + 1}>
              <a
                href="#"
                className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface-strong p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card-hover"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "inline-flex h-10 w-10 items-center justify-center rounded-xl",
                      r.tone === "coral" && "bg-primary-soft text-primary",
                      r.tone === "blue" && "bg-secondary-soft text-secondary",
                      r.tone === "violet" && "bg-accent-soft text-accent"
                    )}
                  >
                    <Bookmark className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-text-primary">
                      {r.name}
                    </div>
                    <div className="text-xs text-text-muted">{r.kind}</div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ============================================================
   NEWSLETTER + SEARCH
   ============================================================ */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="relative py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface-strong px-6 py-12 sm:px-12">
            <Halo tone="coral" className="top-1/2 left-1/2 -z-0 h-[360px] w-[600px] -translate-x-1/2 -translate-y-1/2" />
            <div className="relative grid items-center gap-10 lg:grid-cols-2">
              <div>
                <h2 className="font-display text-2xl font-bold leading-tight text-text-primary sm:text-3xl">
                  Stay ahead of what&rsquo;s next.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
                  Insights on branding, AI, marketing, business strategy, and
                  technology — directly from the Vistaar team. One short read,
                  every other Friday.
                </p>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) {
                    setDone(true);
                    setEmail("");
                    setTimeout(() => setDone(false), 3500);
                  }
                }}
                className="grid gap-3 sm:grid-cols-2"
              >
                <input
                  type="text"
                  placeholder="Your name"
                  className="h-12 rounded-full border border-border bg-background px-5 text-sm text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="h-12 rounded-full border border-border bg-background px-5 text-sm text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <input
                  type="text"
                  placeholder="Company (optional)"
                  className="h-12 rounded-full border border-border bg-background px-5 text-sm text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 sm:col-span-2"
                />
                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  className="sm:col-span-2"
                  rightIcon={done ? <ArrowRight className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
                >
                  {done ? "Thanks — see you Friday" : "Subscribe"}
                </Button>
              </form>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ============================================================
   CTA
   ============================================================ */
function InsightsCta() {
  return (
    <section className="relative py-20">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface-strong px-6 py-12 text-center shadow-elevated sm:px-12">
            <Halo tone="violet" className="top-1/2 left-1/2 -z-0 h-[360px] w-[600px] -translate-x-1/2 -translate-y-1/2" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl">
                Ready to become our next success story?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
                Whether you&rsquo;re launching your first startup or scaling an
                established business, we&rsquo;d love to build the next chapter
                with you.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/contact">
                  <Button size="lg" variant="primary" rightIcon={<ArrowRight className="h-5 w-5" />}>
                    Start Your Project
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="secondary" rightIcon={<ArrowUpRight className="h-5 w-5" />}>
                    Book a Strategy Call
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
export default function InsightsPage() {
  return (
    <main className="relative">
      <PageHero
        eyebrow="Insights"
        title="Ideas."
        highlight="Strategy. Results."
        description="Where Vistaar thinks out loud. Case studies, articles, and free resources on branding, AI, growth, and the business of building a modern company."
      >
        <Link href="/contact">
          <Button size="lg" variant="primary" rightIcon={<ArrowRight className="h-5 w-5" />}>
            Start Your Project
          </Button>
        </Link>
        <Link href="/contact">
          <Button size="lg" variant="secondary" rightIcon={<ArrowUpRight className="h-5 w-5" />}>
            Book a Strategy Call
          </Button>
        </Link>
      </PageHero>

      <Featured />
      <CaseStudies />
      <Articles />
      <Resources />
      <Newsletter />
      <InsightsCta />
    </main>
  );
}
