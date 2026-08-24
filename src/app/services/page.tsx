"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight, Brain, Check, Code2, Compass, LineChart, Palette, Wrench } from "lucide-react";
import { Button } from "@/components/button";
import { Container, Section, SectionHeading } from "@/components/layout";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useInView } from "framer-motion";

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
   SERVICE TABS — full-stack cloud
   ============================================================ */
const SERVICE_TABS = [
  {
    id: "strategy",
    label: "Brand Strategy",
    description:
      "Position, voice, story, identity. Foundations that compound for years — strategy that makes every downstream decision easier.",
    deliverables: [
      "Market & competitor research",
      "Positioning & messaging",
      "Audience segmentation",
      "Brand architecture",
      "Voice & tone guide",
    ],
    Icon: Compass,
  },
  {
    id: "identity",
    label: "Brand Identity",
    description:
      "Logos, systems, guidelines, packaging. A brand people remember — and recognise across every touchpoint.",
    deliverables: [
      "Logo & mark design",
      "Color & typography systems",
      "Brand guidelines",
      "Packaging & merch",
      "Asset library",
    ],
    Icon: Palette,
  },
  {
    id: "engineering",
    label: "Web & App Development",
    description:
      "Marketing sites, SaaS, mobile apps. Built for performance and scale, with code your team can own and extend.",
    deliverables: [
      "Marketing websites",
      "SaaS platforms",
      "Mobile applications",
      "CMS & API integrations",
      "E-commerce",
    ],
    Icon: Code2,
  },
  {
    id: "ai",
    label: "AI & Automation",
    description:
      "Workflow automation, chatbots, AI agents. Less busywork, more output — measurable ROI, not slides.",
    deliverables: [
      "Workflow automation",
      "AI agents & chatbots",
      "CRM & lead routing",
      "Internal tools",
      "BI dashboards",
    ],
    Icon: Brain,
  },
  {
    id: "growth",
    label: "Growth Marketing",
    description:
      "SEO, paid, lifecycle, content. Acquisition and retention, working together — the system that compounds.",
    deliverables: [
      "SEO & content",
      "Paid acquisition",
      "Lifecycle & email",
      "Conversion optimization",
      "Analytics & reporting",
    ],
    Icon: LineChart,
  },
  {
    id: "consulting",
    label: "Business Consulting",
    description:
      "Strategy, GTM, digital transformation. A thinking partner, not a vendor — we work with you, not at you.",
    deliverables: [
      "GTM strategy",
      "Digital transformation",
      "Operating model design",
      "Workshop facilitation",
      "Fractional leadership",
    ],
    Icon: Wrench,
  },
];

function ServiceStep({ service, index, onInView }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (isInView) {
      onInView();
    }
  }, [isInView, onInView]);

  return (
    <div id={service.id} ref={ref} className="flex flex-col gap-6 scroll-mt-40 transition-opacity duration-500" style={{ opacity: isInView ? 1 : 0.4 }}>
      {/* Mobile-only step number */}
      <div className="text-6xl font-bold text-white/10 lg:hidden">
        0{index + 1}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/20 border border-blue-500/20 shadow-sm">
          <service.Icon className="h-6 w-6 text-blue-400" />
        </div>
        <h3 className="text-3xl font-bold tracking-tight text-white">{service.label}</h3>
      </div>

      <p className="text-[16px] leading-[1.6] text-zinc-400 max-w-xl">
        {service.description}
      </p>

      <div className="mt-4 border-l border-[var(--hairline)] pl-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-4">What&rsquo;s included</h4>
        <ul className="space-y-4">
          {service.deliverables.map((d: string) => (
            <li key={d} className="flex items-center gap-4 group">
              <div className="rounded-full bg-blue-500/10 p-1 group-hover:bg-blue-500/20 transition-colors">
                <Check className="h-4 w-4 shrink-0 text-blue-400" />
              </div>
              <span className="text-[15px] font-medium text-zinc-300">{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ServicesStepper() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Section className="bg-[var(--canvas)]" id="services-overview">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Our Prior Identities"
            title="The Full-Stack Cloud for Modern Brands."
            description="Six connected practices that work as a single growth system. Mix them, sequence them, or hand us the whole map."
          />
        </Reveal>

        <div className="mt-20 flex flex-col lg:flex-row lg:gap-20 relative items-start">
          {/* Sticky Left Column */}
          <div className="hidden lg:block lg:w-1/2 sticky top-40 self-start">
            <div className="relative h-[300px]">
              <div className="absolute inset-0 flex items-start">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0, filter: "blur(10px)" }}
                    transition={{ duration: 0, ease: "easeOut" }}
                    className="w-full max-w-lg overflow-hidden relative"
                  >
                    <img
                      src={
                        activeIndex === 0 ? "/images/practice/practice-illustration-01.png" :
                          activeIndex === 1 ? "/images/practice/practice-illustration-02.png" :
                            activeIndex === 2 ? "/images/practice/practice-illustration-03.png" :
                              activeIndex === 3 ? "/images/practice/practice-illustration-04.png" :
                                activeIndex === 4 ? "/images/practice/practice-illustration-05.png" :
                                  "/images/practice/practice-illustration-06.png"
                      }
                      alt="Service Visual"
                      className="w-full h-full object-contain"
                    />

                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Scrolling Right Column */}
          <div className="flex w-full flex-col gap-32 pb-32 lg:w-1/2 lg:mt-0">
            {SERVICE_TABS.map((s, i) => (
              <ServiceStep
                key={s.id}
                service={s}
                index={i}
                onInView={() => setActiveIndex(i)}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

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
        title="Everything Your Business Needs."
        highlight="Under One Vision."
        description="Six connected practices that work as a single growth system. Mix them, sequence them, or hand us the whole map. Each one reinforces the others."
      >
        <Button
          size="md"
          variant="secondary-mint"
          className="rounded-full text-sm font-semibold shadow-sm transition-all group-hover:shadow-md"
          rightIcon={<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
          href="/contact"
        >
          Start a project
        </Button>
      </PageHero>

      <ServicesStepper />

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

function ProcessSection() {
  return (
    <Section className="bg-[var(--canvas)] relative overflow-hidden py-24 sm:py-32 border-t border-white/5">
      {/* Background Glows */}
      <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-24">
            <span className="mono-eyebrow text-blue-400">Our Methodology</span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Built for momentum.
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              A disciplined four-phase approach to ensure your brand and platform not only launch successfully, but continuously evolve.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 relative">
          {/* Connector Line (Desktop only) */}
          <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {[
            {
              step: "01",
              title: "Planning",
              desc: "We map out the strategy, define KPIs, and structure the architecture before a single line of code is written.",
              icon: Compass,
              color: "from-blue-400/20 to-blue-500/5",
              iconColor: "text-blue-400"
            },
            {
              step: "02",
              title: "Execution",
              desc: "Rapid, high-fidelity implementation. From brand identity to full-stack engineering, we build systems designed to scale.",
              icon: Wrench,
              color: "from-purple-400/20 to-purple-500/5",
              iconColor: "text-purple-400"
            },
            {
              step: "03",
              title: "Monitoring",
              desc: "Real-time tracking of performance metrics, user behavior, and system health to ensure maximum uptime.",
              icon: Brain,
              color: "from-emerald-400/20 to-emerald-500/5",
              iconColor: "text-emerald-400"
            },
            {
              step: "04",
              title: "Analysis",
              desc: "Data-driven insights to refine our approach. We constantly measure, learn, and iterate to compound growth.",
              icon: LineChart,
              color: "from-orange-400/20 to-orange-500/5",
              iconColor: "text-orange-400"
            }
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col rounded-[24px] border border-white/10 bg-white/[0.02] p-8 backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_8px_30px_rgba(255,255,255,0.04)]"
            >
              {/* Subtle gradient background on hover */}
              <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100", item.color)} />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 shadow-inner overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <item.icon className={cn("h-7 w-7 transition-transform duration-500 group-hover:scale-110", item.iconColor)} />
                  </div>
                  <span className="text-5xl font-bold text-white/15 group-hover:text-white/40 transition-colors duration-500 tracking-tighter">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed text-[15px]">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
