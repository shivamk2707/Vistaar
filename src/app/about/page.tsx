"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";
import { Button } from "@/components/button";
import { Container, Section, SectionHeading } from "@/components/layout";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

/* ============================================================
   DATA
   ============================================================ */
const STORY = [
  {
    q: "Who are we?",
    body: "Vistaar is an AI-powered Brand Growth Company. We help startups, founders, and established businesses build meaningful brands, powerful digital experiences, and scalable business systems — under one strategy, under one team. We don't sell isolated services. We build ecosystems where branding, technology, AI, and marketing work together to produce measurable growth.",
  },
  {
    q: "What do we do?",
    body: "We help businesses at every stage of their journey — launching a startup, refreshing a brand, building a SaaS product, automating workflows, scaling campaigns, entering new markets. Our work combines creative thinking, business strategy, software development, AI solutions, and performance marketing into one connected ecosystem.",
  },
  {
    q: "How do we work?",
    body: "Every project follows a proven eight-phase methodology. We start by understanding your business, customers, competitors, and goals. Then we shape a strategy, design the experience, build the product, integrate AI, test ruthlessly, launch carefully, and stay on to optimize. Growth is not a single campaign — it's a system that evolves with you.",
  },
  {
    q: "Why choose Vistaar?",
    body: "Most agencies sell deliverables. We sell outcomes. You'll work with senior strategists, designers, engineers, and AI specialists — not a sales-led handoff chain. Strategy comes before execution. AI is part of the work, not an upsell. Pricing is transparent. And we measure success by your growth, not by the project ending.",
  },
];

const PRINCIPLES = [
  {
    title: "Strategy before execution",
    body: "We don't open Figma before we understand your business.",
  },
  {
    title: "One partner, every solution",
    body: "Branding, technology, AI, marketing, consulting — under one roof.",
  },
  {
    title: "AI-first thinking",
    body: "We treat AI as a default layer, not a separate line item.",
  },
  {
    title: "Transparent communication",
    body: "Async updates, shared workspace, no hidden retainers.",
  },
  {
    title: "Scalable systems",
    body: "Everything we build is designed to grow with your business.",
  },
  {
    title: "Long-term partnership",
    body: "We measure success by your growth over years, not weeks.",
  },
];

const TEAM = [
  {
    name: "Arjun Iyer",
    role: "Founder & Strategy Lead",
    bio: "12+ years across brand strategy, growth, and product. Previously led growth at two SaaS unicorns.",
    initials: "AI",
  },
  {
    name: "Sara Kapoor",
    role: "Head of Design",
    bio: "Brand identity and product design. Has shipped design systems used by 20M+ people.",
    initials: "SK",
  },
  {
    name: "Devansh Rao",
    role: "Head of Engineering",
    bio: "Full-stack architect. Loves clean code, fast pages, and solving impossible migration problems.",
    initials: "DR",
  },
  {
    name: "Maya Chen",
    role: "AI & Automation Lead",
    bio: "Builds production AI agents for B2B. Ex-researcher, current practitioner.",
    initials: "MC",
  },
];

const STATS = [
  { value: "100+", label: "Brands Built" },
  { value: "1K+", label: "Workflows Automated" },
  { value: "40+", label: "Industries Served" },
  { value: "98%", label: "Retention Rate" },
];

/* ============================================================
   STORY ACCORDION
   ============================================================ */
function StorySection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section className="bg-[var(--canvas)]" id="story">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="More than an agency"
            title="A growth partner, not a vendor."
            description="The four answers every founder wants before they hire anyone."
          />
        </Reveal>

        <Reveal delay={1}>
          <div className="mx-auto mt-14 max-w-3xl divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
            {STORY.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:bg-[#fafafa]"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={cn(
                          "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-medium",
                          isOpen
                            ? "bg-[var(--ink)] text-[var(--canvas)]"
                            : "bg-[var(--hairline)] text-[var(--body)]"
                        )}
                      >
                        0{i + 1}
                      </span>
                      <span className="text-[18px] font-medium text-[var(--ink)]">
                        {item.q}
                      </span>
                    </div>
                    <Plus
                      className={cn(
                        "h-4 w-4 shrink-0 text-[var(--body)] transition-transform",
                        isOpen && "rotate-45 text-[var(--ink)]"
                      )}
                    />
                  </button>
                  {isOpen && (
                    <div className="pb-6 pl-13 pr-10 text-[15px] leading-[1.5] text-[var(--body)] sm:pl-[52px]">
                      {item.body}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ============================================================
   STATS — dark band
   ============================================================ */
function Stats() {
  return (
    <Section tone="dark" className="bg-[var(--canvas-dark)]">
      <Container>
        <Reveal>
          <span className="mono-eyebrow text-[var(--on-dark)] opacity-70">
            By the numbers
          </span>
          <h2 className="mt-4 text-display-xl text-[var(--on-dark)] max-w-2xl">
            Outcomes, not deliverables.
          </h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i + 1}>
              <div className="rounded-[4px] bg-[var(--surface-dark-soft)] p-8">
                <div className="text-[40px] font-medium leading-[1.1] tracking-[-0.02em] text-[var(--on-dark)]">
                  {s.value}
                </div>
                <div className="mt-3 mono-eyebrow text-[var(--on-dark)] opacity-70">
                  {s.label}
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
   PRINCIPLES
   ============================================================ */
function Principles() {
  return (
    <Section className="bg-[var(--canvas)]">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Working principles"
            title="Six principles that shape every project."
            description="We hold these as standards, not slogans. Every engagement, every team, every deliverable."
          />
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[4px] border border-[var(--hairline)] bg-[var(--hairline)] md:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) + 1}>
              <div className="flex h-full flex-col bg-[var(--canvas)] p-8">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-[4px] bg-[var(--ink)] text-[var(--canvas)]">
                  <Check className="h-4 w-4" />
                </span>
                <h3 className="mt-6 text-[20px] font-medium leading-[1.2] tracking-[-0.01em] text-[var(--ink)]">
                  {p.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.5] text-[var(--body)]">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   TEAM
   ============================================================ */
function Team() {
  return (
    <Section className="bg-[var(--canvas)]">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="The team"
            title="The people behind the work."
            description="Senior strategists, designers, engineers, and AI specialists — in-house, not subcontracted."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={(i % 4) + 1}>
              <div className="rounded-[4px] border border-[var(--hairline)] bg-[var(--canvas)] p-6">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-[4px] bg-[var(--hairline)] text-[14px] font-medium text-[var(--ink)]">
                  {m.initials}
                </div>
                <h3 className="mt-5 text-[18px] font-medium text-[var(--ink)]">
                  {m.name}
                </h3>
                <p className="mt-1 mono-eyebrow text-[var(--body)]">
                  {m.role}
                </p>
                <p className="mt-4 text-[14px] leading-[1.5] text-[var(--body)]">
                  {m.bio}
                </p>
              </div>
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
function AboutCta() {
  return (
    <Section tone="dark" className="bg-[var(--canvas-dark)]">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mono-eyebrow text-[var(--on-dark)] opacity-70">
              Get started
            </span>
            <h2 className="mt-5 text-display-xl text-[var(--on-dark)]">
              Ready to build something that lasts?
            </h2>
            <p className="mt-5 text-[17px] leading-[1.5] text-[var(--on-dark)] opacity-80">
              Start with a 30-minute call. We&rsquo;ll share our honest take on
              what you&rsquo;re working on — no pitch, no pressure.
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
                href="/method"
              >
                See how we work
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
export default function AboutPage() {
  return (
    <main className="relative">
      <PageHero
        eyebrow="About Vistaar"
        title="More than an agency."
        highlight="A growth partner."
        description="We exist for founders and businesses who want more than deliverables. Strategy, brand, technology, and AI — under one vision, one team, one partnership."
      >
        <Button
          size="lg"
          variant="secondary-mint"
          rightIcon={<ArrowRight className="h-4 w-4" />}
          href="/contact"
        >
          Start a conversation
        </Button>
        <Button
          size="lg"
          variant="secondary-white"
          rightIcon={<ArrowUpRight className="h-4 w-4" />}
          href="/services"
        >
          See what we do
        </Button>
      </PageHero>

      <StorySection />
      <Stats />
      <Principles />
      <Team />
      <AboutCta />
    </main>
  );
}
