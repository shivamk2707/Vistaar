"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, Plus, Search } from "lucide-react";
import { Button } from "@/components/button";
import { Container, Section, SectionHeading } from "@/components/layout";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
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
        a: "Projects range from ₹5L for focused sprints to ₹1.25Cr+ for full ecosystem builds. We share a detailed quote after the discovery call, with line-item breakdown. No surprise change orders, ever.",
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
        <Button
          size="lg"
          variant="secondary-mint"
          rightIcon={<ArrowRight className="h-4 w-4" />}
          href="/contact"
        >
          Ask us directly
        </Button>
      </PageHero>

      {/* Search + filter */}
      <Section className="bg-[var(--canvas)] pt-12">
        <Container>
          <Reveal>
            <div className="mx-auto w-full max-w-3xl">
              <div className="relative">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--body)]">
                  <Search className="h-4 w-4" />
                </div>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search the FAQ…"
                  className="h-12 w-full rounded-[4px] border border-[var(--hairline)] bg-[var(--canvas)] pl-11 pr-4 text-[15px] text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--body)] focus:border-[var(--ink)]"
                />
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-1">
                <span className="mono-eyebrow mr-2 text-[var(--body)]">
                  Category
                </span>
                {["All", ...FAQ.map((g) => g.cat)].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setActiveCat(c)}
                    className={cn(
                      "h-8 rounded-[3.25px] border border-[var(--hairline)] bg-[var(--canvas)] px-3 text-[12px] font-medium transition-colors",
                      activeCat === c
                        ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--canvas)]"
                        : "text-[var(--body)] hover:text-[var(--ink)]"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* FAQ list */}
      <Section className="bg-[var(--canvas)]">
        <Container>
          {filtered.length === 0 ? (
            <Reveal>
              <div className="mx-auto max-w-2xl rounded-[4px] border border-[var(--hairline)] bg-[var(--canvas)] p-10 text-center">
                <h3 className="text-[20px] font-medium text-[var(--ink)]">
                  No matches for &ldquo;{query}&rdquo;.
                </h3>
                <p className="mt-2 text-[14px] text-[var(--body)]">
                  Try a broader search, or just ask us directly.
                </p>
                <div className="mt-5">
                  <Link href="/contact">
                    <Button size="md" variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
                      Ask us
                    </Button>
                  </Link>
                </div>
              </div>
            </Reveal>
          ) : (
            <div className="mx-auto max-w-3xl divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
              {filtered.map((item, i) => (
                <FaqRow key={item.q} q={item.q} a={item.a} cat={item.cat} index={i} />
              ))}
            </div>
          )}
        </Container>
      </Section>

      <Section tone="dark" className="bg-[var(--canvas-dark)]">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="mono-eyebrow text-[var(--on-dark)] opacity-70">
                Still curious?
              </span>
              <h2 className="mt-5 text-display-xl text-[var(--on-dark)]">
                Still have a question?
              </h2>
              <p className="mt-5 text-[17px] leading-[1.5] text-[var(--on-dark)] opacity-80">
                We respond to every enquiry within one business day. Real
                humans, no auto-replies.
              </p>
              <div className="mt-7">
                <Button
                  size="lg"
                  variant="secondary-mint"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  href="/contact"
                >
                  Contact us
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}

function FaqRow({ q, a, cat }: { q: string; a: string; cat: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={(Number(q.length) % 4) + 1}>
      <div>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:bg-[#fafafa]"
          aria-expanded={open}
        >
          <div>
            <div className="mono-eyebrow text-[var(--body)]">{cat}</div>
            <div className="mt-1 text-[16px] font-medium text-[var(--ink)]">
              {q}
            </div>
          </div>
          <Plus
            className={cn(
              "h-4 w-4 shrink-0 text-[var(--body)] transition-transform",
              open && "rotate-45 text-[var(--ink)]"
            )}
          />
        </button>
        {open && (
          <div className="pb-6 pr-10 text-[15px] leading-[1.5] text-[var(--body)]">
            {a}
          </div>
        )}
      </div>
    </Reveal>
  );
}
