"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/button";
import { Container, Section, SectionHeading } from "@/components/layout";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

/* ============================================================
   DATA
   ============================================================ */
const ECOSYSTEM = [
  {
    id: "consulting",
    title: "Business Intelligence",
    tagline: "Clarity before code.",
    description:
      "Every successful business starts with clarity. Before designing a website or launching a campaign, we understand your business model, market, competitors, customers, and future goals.",
    services: [
      "Business Consulting",
      "Startup Consulting",
      "Business Growth Strategy",
      "Market Research",
      "Competitor Analysis",
      "Digital Transformation",
      "Revenue Growth Planning",
      "Go-To-Market Strategy",
    ],
  },
  {
    id: "branding",
    title: "Brand Studio",
    tagline: "More than a logo.",
    description:
      "Your brand is more than a logo. It's the perception people have when they think about your business. We create memorable brand identities that communicate trust, professionalism, and purpose.",
    services: [
      "Brand Identity Design",
      "Logo Design",
      "Brand Guidelines",
      "Color System",
      "Typography",
      "Visual Identity",
      "Packaging Design",
      "Rebranding",
    ],
  },
  {
    id: "engineering",
    title: "Digital Engineering",
    tagline: "Built to scale.",
    description:
      "Technology is the foundation of modern businesses. Our engineering team creates scalable digital experiences that are secure, responsive, and built for long-term growth.",
    services: [
      "Website Development",
      "Landing Pages",
      "Corporate Websites",
      "E-Commerce",
      "Web Applications",
      "Mobile Applications",
      "SaaS Platforms",
      "API Integration",
    ],
    tech: ["React", "Next.js", "Node.js", "Tailwind CSS", "TypeScript"],
  },
  {
    id: "ai",
    title: "AI & Automation Lab",
    tagline: "Less busywork, more output.",
    description:
      "Businesses shouldn't waste time on repetitive work. We build AI-powered systems that automate workflows, improve productivity, and enable smarter decision-making.",
    services: [
      "AI Automation",
      "AI Chatbots",
      "Workflow Automation",
      "CRM Automation",
      "Email Automation",
      "WhatsApp Automation",
      "AI Agents",
      "Process Optimization",
    ],
  },
  {
    id: "creative",
    title: "Creative Lab",
    tagline: "Every detail, intentional.",
    description:
      "Every interaction with your audience should leave an impression. Our creative team transforms ideas into visually engaging experiences across digital and physical platforms.",
    services: [
      "UI/UX Design",
      "Graphic Design",
      "Motion Graphics",
      "Video Editing",
      "Product Mockups",
      "Presentation Design",
      "Social Media Creatives",
      "Print Design",
    ],
  },
  {
    id: "growth",
    title: "Growth Marketing",
    tagline: "Right message, right time.",
    description:
      "Marketing isn't about posting every day. It's about reaching the right audience with the right message at the right time. We build data-driven campaigns focused on sustainable business growth.",
    services: [
      "Digital Marketing",
      "Performance Marketing",
      "SEO",
      "Google Ads",
      "Meta Ads",
      "LinkedIn Marketing",
      "Email Marketing",
      "Analytics & Reporting",
    ],
  },
];

/* ============================================================
   STACKED SERVICES — sticky stack with mono-eyebrow progress
   ============================================================ */
function StackedServices() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const cards = cardRefs.current.filter((el): el is HTMLDivElement => Boolean(el));
    if (cards.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const triggers: ScrollTrigger[] = [];

      cards.forEach((card, i) => {
        const enterTween = gsap.fromTo(
          card,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
        if (enterTween.scrollTrigger) triggers.push(enterTween.scrollTrigger);

        const next = cards[i + 1];
        if (next) {
          const recedeTween = gsap.fromTo(
            card,
            { scale: 1, opacity: 1 },
            {
              scale: 0.95,
              opacity: 0.5,
              ease: "none",
              scrollTrigger: {
                trigger: next,
                start: "top bottom",
                end: "top top",
                scrub: true,
              },
            }
          );
          if (recedeTween.scrollTrigger) triggers.push(recedeTween.scrollTrigger);
        }
      });

      return () => triggers.forEach((t) => t.kill());
    });

    return () => mm.revert();
  }, []);

  return (
    <Section className="bg-[var(--canvas)]">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="The six-part ecosystem"
            title="One stack. Six services."
            description="Scroll to peel the stack — each practice slides into place, layered over the last."
          />
        </Reveal>
      </Container>

      <div className="relative mt-14">
        {ECOSYSTEM.map((item, i) => (
          <div
            key={item.id}
            id={item.id}
            className="sticky top-20 pb-6 sm:top-24"
            style={{ zIndex: i + 1 }}
          >
            <div
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="mx-auto w-[94%] origin-top will-change-transform"
              style={{ maxWidth: "1100px" }}
            >
              <div className="relative overflow-hidden rounded-[4px] border border-[var(--hairline)] bg-[var(--canvas)]">
                {/* Top progress strip */}
                <div className="flex items-center justify-between border-b border-[var(--hairline)] bg-[var(--hairline)] px-5 py-2.5 sm:px-7">
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="font-medium text-[var(--ink)]">0{i + 1}</span>
                    <span className="text-[var(--body)]">/ 0{ECOSYSTEM.length}</span>
                  </div>
                  <span className="hidden text-[var(--body)] sm:inline mono-caption">
                    {item.tagline}
                  </span>
                  <span className="text-[var(--body)] mono-caption">Vistaar · 2026</span>
                </div>

                {/* Two-column body */}
                <div className="grid grid-cols-1 lg:grid-cols-12 lg:min-h-[420px]">
                  <div className="flex flex-col justify-center p-7 sm:p-9 lg:col-span-5">
                    <div className="flex items-center gap-2">
                      <span className="mono-eyebrow text-[var(--body)]">
                        0{i + 1} · {item.tagline}
                      </span>
                    </div>
                    <h3 className="mt-4 text-display-md text-[var(--ink)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.5] text-[var(--body)]">
                      {item.description}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-2">
                      <Link href="/contact">
                        <Button size="sm" variant="primary" rightIcon={<ArrowUpRight className="h-3.5 w-3.5" />}>
                          Discuss this
                        </Button>
                      </Link>
                      <Link href="/method">
                        <Button size="sm" variant="outline" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                          See the process
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="border-t border-[var(--hairline)] p-7 sm:p-9 lg:col-span-7 lg:border-l lg:border-t-0">
                    <h3 className="mono-eyebrow text-[var(--body)]">
                      What&rsquo;s included
                    </h3>
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {item.services.map((s) => (
                        <li
                          key={s}
                          className="flex items-start gap-2 border-b border-[var(--hairline)] py-2 text-[14px] text-[var(--ink)] last:border-0"
                        >
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--ink)]" />
                          {s}
                        </li>
                      ))}
                    </ul>
                    {item.tech && (
                      <div className="mt-6 border-t border-[var(--hairline)] pt-5">
                        <h3 className="mono-eyebrow text-[var(--body)]">Tech</h3>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {item.tech.map((t) => (
                            <span
                              key={t}
                              className="rounded-[3.25px] border border-[var(--hairline)] bg-[var(--canvas)] px-2.5 py-1 text-[11px] text-[var(--ink)]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ============================================================
   REASONS — 3-up cards
   ============================================================ */
const REASONS = [
  {
    title: "Strategy before execution",
    body: "Every project starts with understanding the business, not jumping into design or development.",
  },
  {
    title: "One partner, every solution",
    body: "Branding, technology, AI, marketing, and consulting — all under one roof.",
  },
  {
    title: "AI-first thinking",
    body: "Modern businesses need intelligent systems, not just digital assets.",
  },
  {
    title: "Scalable solutions",
    body: "Every solution is designed to grow alongside your business.",
  },
  {
    title: "Data-driven decisions",
    body: "We rely on research, analytics, and measurable outcomes rather than assumptions.",
  },
  {
    title: "Long-term partnership",
    body: "We measure success by your growth over time, not by the completion of a project.",
  },
];

/* ============================================================
   PAGE
   ============================================================ */
export default function ServicesPage() {
  return (
    <main className="relative">
      <PageHero
        eyebrow="The Growth Ecosystem"
        title="Everything your business needs."
        highlight="Under one vision."
        description="Six connected practices that work as a single growth system. Mix them, sequence them, or hand us the whole map. Each one reinforces the others."
      >
        <Button
          size="lg"
          variant="secondary-mint"
          className="text-black"
          rightIcon={<ArrowRight className="h-4 w-4" />}
          href="/contact"
        >
          Start a project
        </Button>
        <Button
          size="lg"
          variant="secondary-white"
          rightIcon={<ArrowUpRight className="h-4 w-4" />}
          href="/method"
        >
          See our method
        </Button>
      </PageHero>

      <StackedServices />

      <Section tone="dark" className="bg-[var(--canvas-dark)]">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="mono-eyebrow text-[var(--on-dark)] opacity-70">
                Get started
              </span>
              <h2 className="mt-5 text-display-xl text-[var(--on-dark)]">
                Ready to build something bigger than a website?
              </h2>
              <p className="mt-5 text-[17px] leading-[1.5] text-[var(--on-dark)] opacity-80">
                Let&rsquo;s design a brand, build intelligent systems, and create
                a business that grows with confidence.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  size="lg"
                  variant="secondary-mint"
                  className="text-black"
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
                  Schedule a discovery call
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
