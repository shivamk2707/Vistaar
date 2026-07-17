"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, Search } from "lucide-react";
import { Button } from "@/components/button";
import { Container } from "@/components/layout";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Halo, GlassCard } from "@/components/halo";
import { cn } from "@/lib/utils";

const FAQ = [
  {
    cat: "Getting started",
    items: [
      {
        q: "How long does a typical project take?",
        a: "Most engagements run 8 to 16 weeks from kickoff to launch. A focused brand sprint can land in 3 weeks; a full SaaS build with AI workflows usually runs 3 to 6 months. We share a realistic timeline at the proposal stage — never a sales-pitch estimate.",
      },
      {
        q: "How much does a project cost?",
        a: "Projects range from $5K for focused sprints to $150K+ for full ecosystem builds. We share a detailed quote after the discovery call, with line-item breakdown. No surprise change orders, ever.",
      },
      {
        q: "How soon can we start?",
        a: "Most engagements kick off within 1–2 weeks of contract signature. For urgent work, we can sometimes start in 3 days. The fastest path is to fill in the contact form with as much detail as possible.",
      },
    ],
  },
  {
    cat: "Working together",
    items: [
      {
        q: "Do you work with early-stage startups?",
        a: "Yes — and often. We have a pricing tier and a faster sprint model specifically designed for seed and Series A teams. If you're pre-funding, we can scope a small first sprint that delivers real value within your runway.",
      },
      {
        q: "Can I hire Vistaar for a single service?",
        a: "Absolutely. While we think the ecosystem model works best, plenty of clients come to us for one thing — a rebrand, a website rebuild, a marketing sprint — and stay for the rest. We'll be honest if a single-service engagement isn't the right move.",
      },
      {
        q: "Do you work internationally?",
        a: "Yes. We've delivered projects across 14 countries. We work async, overlap for key calls, and contract under your jurisdiction. Time zones rarely get in the way of shipping great work.",
      },
      {
        q: "Can you sign an NDA?",
        a: "Of course. Mutual NDAs are standard and we can sign before any sensitive details are shared. We can also work inside your secure environment if your data requires it.",
      },
    ],
  },
  {
    cat: "AI & automation",
    items: [
      {
        q: "How does your AI automation work in practice?",
        a: "We start by mapping the workflows that eat the most time — lead enrichment, customer support, content ops, reporting. Then we build AI agents, automations, and integrations that ship into your stack (HubSpot, Salesforce, Notion, your custom backend). Every workflow has measurable KPIs we report on monthly.",
      },
      {
        q: "Do you build custom AI solutions?",
        a: "Yes. We build custom AI agents, RAG systems, and intelligent workflows for businesses that need more than off-the-shelf tools. We also integrate leading platforms (OpenAI, Anthropic, etc.) where it makes sense.",
      },
      {
        q: "Will AI replace my team?",
        a: "We think AI is a force multiplier, not a replacement. Our goal is to free your team from repetitive work so they can focus on the high-judgment, high-creativity work that humans are best at.",
      },
    ],
  },
  {
    cat: "Operations",
    items: [
      {
        q: "Do you provide post-launch support?",
        a: "Yes. Every project includes a 30 / 90 / 365-day growth review. We also offer ongoing retainers for design, development, AI, and marketing — sized to your stage. Most clients stay with us for years, not weeks.",
      },
      {
        q: "What does the discovery process look like?",
        a: "A 30-minute intro call to align on goals, a paid or waived discovery sprint (1–2 weeks) where we dig into your business and produce a written strategy brief, and a proposal. Total time from first call to signed contract is usually 2–4 weeks.",
      },
      {
        q: "How do you handle pricing and contracts?",
        a: "We use milestone-based pricing tied to deliverables, with a clear change-order process. Contracts are straightforward, ownership of work transfers on final payment, and we offer net-15 / net-30 terms for established clients.",
      },
    ],
  },
];

export default function FaqPage() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("All");

  const all = FAQ.flatMap((g) => g.items.map((i) => ({ ...i, cat: g.cat })));
  const filtered = all.filter((item) => {
    const matchesQ =
      query.trim() === "" ||
      item.q.toLowerCase().includes(query.toLowerCase()) ||
      item.a.toLowerCase().includes(query.toLowerCase());
    const matchesCat = activeCat === "All" || item.cat === activeCat;
    return matchesQ && matchesCat;
  });

  return (
    <main className="relative">
      <PageHero
        eyebrow="FAQ"
        title="Questions, answered."
        highlight="Honestly."
        description="The things founders and teams ask us most often. Can't find what you need? Send us a note — we usually reply within a day."
      >
        <Link href="/contact">
          <Button size="lg" variant="primary" rightIcon={<ArrowRight className="h-5 w-5" />}>
            Ask Us Directly
          </Button>
        </Link>
      </PageHero>

      {/* Search + filter */}
      <section className="relative pt-10 sm:pt-14">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <div className="relative">
                <div className="pointer-events-none absolute -inset-2 rounded-full bg-[image:var(--gradient-primary)] opacity-10 blur-2xl" />
                <div className="relative flex items-center gap-2 rounded-full border border-border bg-background-elevated p-1.5 shadow-card">
                  <div className="pl-4 text-text-muted">
                    <Search className="h-4 w-4" />
                  </div>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search the FAQ…"
                    className="h-12 flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none"
                  />
                </div>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                  Category
                </span>
                {["All", ...FAQ.map((g) => g.cat)].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setActiveCat(c)}
                    className={cn(
                      "rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium transition-colors",
                      activeCat === c
                        ? "border-primary bg-primary text-white"
                        : "text-text-secondary hover:border-primary/40"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* FAQ list */}
      <section className="relative py-12 sm:py-16">
        <Container>
          {filtered.length === 0 ? (
            <Reveal>
              <GlassCard tone="coral" className="mx-auto max-w-2xl p-10 text-center">
                <h3 className="font-display text-xl font-bold text-text-primary">
                  No matches for &ldquo;{query}&rdquo;.
                </h3>
                <p className="mt-2 text-sm text-text-secondary">
                  Try a broader search, or just ask us directly.
                </p>
                <div className="mt-5">
                  <Link href="/contact">
                    <Button size="md" variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
                      Ask Us
                    </Button>
                  </Link>
                </div>
              </GlassCard>
            </Reveal>
          ) : (
            <div className="mx-auto max-w-3xl space-y-3">
              {filtered.map((item, i) => (
                <Reveal key={item.q} delay={(i % 4) + 1}>
                  <FaqRow q={item.q} a={item.a} cat={item.cat} />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* CTA */}
      <section className="relative py-16">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface-strong px-6 py-12 text-center shadow-elevated sm:px-12">
              <Halo tone="coral" className="top-1/2 left-1/2 -z-0 h-[360px] w-[600px] -translate-x-1/2 -translate-y-1/2" />
              <div className="relative">
                <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl">
                  Still have a question?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
                  We respond to every enquiry within one business day. Real
                  humans, no auto-replies.
                </p>
                <div className="mt-7">
                  <Link href="/contact">
                    <Button size="lg" variant="primary" rightIcon={<ArrowRight className="h-5 w-5" />}>
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}

function FaqRow({ q, a, cat }: { q: string; a: string; cat: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-border bg-surface-strong shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-background-muted/40 sm:px-7"
        aria-expanded={open}
      >
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
            {cat}
          </div>
          <div className="mt-1 text-sm font-semibold text-text-primary sm:text-base">
            {q}
          </div>
        </div>
        <span
          className={cn(
            "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-base transition-transform",
            open && "rotate-45 border-primary text-primary"
          )}
        >
          +
        </span>
      </button>
      {open && (
        <div className="px-5 pb-6 text-sm leading-relaxed text-text-secondary sm:px-7">
          {a}
        </div>
      )}
    </div>
  );
}
