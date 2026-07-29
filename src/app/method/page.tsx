"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Zap,
  CalendarDays,
  Infinity,
} from "lucide-react";
import { Button } from "@/components/button";
import { Container, Section, SectionHeading } from "@/components/layout";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

/* ============================================================
   DATA
   ============================================================ */
const PHASES = [
  {
    n: "01",
    title: "Discover",
    objective: "Understand the client's business before proposing any solution.",
    activities: [
      "Discovery Call",
      "Business Understanding",
      "Requirement Gathering",
      "Target Audience Analysis",
      "Competitor Research",
      "Industry Research",
      "Existing Brand Audit",
      "Technical Assessment",
    ],
    deliverables: [
      "Discovery Notes",
      "Business Requirement Document",
      "Initial Recommendations",
      "Project Scope",
    ],
    timeline: "2–5 Days",
    involvement: "High",
  },
  {
    n: "02",
    title: "Research & Strategy",
    objective:
      "Build a roadmap that aligns technology, branding, and business goals.",
    activities: [
      "Market Research",
      "SWOT Analysis",
      "Customer Persona Development",
      "Positioning Strategy",
      "Brand Direction",
      "Digital Strategy",
      "Technology Selection",
    ],
    deliverables: [
      "Strategy Presentation",
      "Brand Positioning Document",
      "User Journey Map",
      "Technical Roadmap",
    ],
    timeline: "3–7 Days",
    involvement: "Medium",
  },
  {
    n: "03",
    title: "Brand Experience Design",
    objective:
      "Create a visual identity that communicates trust, personality, and professionalism.",
    activities: [
      "Logo Design",
      "Brand Identity",
      "Typography",
      "Color Palette",
      "UI/UX Design",
      "Wireframes",
      "Design System",
      "Interactive Prototype",
    ],
    deliverables: [
      "Brand Guidelines",
      "UI Design",
      "Prototype",
      "Design Assets",
    ],
    timeline: "1–3 Weeks",
    involvement: "Medium",
  },
  {
    n: "04",
    title: "Engineering & Development",
    objective: "Transform approved designs into scalable digital products.",
    activities: [
      "Frontend Development",
      "Backend Development",
      "CMS Integration",
      "API Development",
      "Database Design",
      "Authentication",
      "Payment Gateway Integration",
      "Performance Optimization",
    ],
    deliverables: [
      "Functional Website",
      "Admin Dashboard",
      "API Documentation",
      "Source Code",
      "Deployment Environment",
    ],
    timeline: "2–8 Weeks",
    involvement: "Low",
  },
  {
    n: "05",
    title: "AI & Automation Integration",
    objective:
      "Increase efficiency by integrating intelligent systems into the business.",
    activities: [
      "AI Chatbots",
      "CRM Automation",
      "Lead Management",
      "WhatsApp Automation",
      "Workflow Automation",
      "AI Agents",
      "Business Intelligence Dashboard",
    ],
    deliverables: [
      "AI Workflows",
      "Automation Reports",
      "AI Knowledge Base",
      "Integration Documentation",
    ],
    timeline: "Depends on scope",
    involvement: "Medium",
  },
  {
    n: "06",
    title: "Testing & Quality Assurance",
    objective:
      "Ensure every solution meets Vistaar's quality standards before launch.",
    activities: [
      "UI Testing",
      "Functional Testing",
      "Responsive Testing",
      "Browser Compatibility",
      "Security Testing",
      "Performance Testing",
      "SEO Validation",
      "Accessibility Testing",
    ],
    deliverables: [
      "QA Report",
      "Bug Fix Report",
      "Performance Report",
    ],
    timeline: "1–2 Weeks",
    involvement: "Low",
  },
  {
    n: "07",
    title: "Launch",
    objective: "Deploy the project smoothly with minimal downtime.",
    activities: [
      "Production Deployment",
      "Domain Configuration",
      "Hosting Setup",
      "SSL Configuration",
      "Analytics Setup",
      "Search Console",
      "Backup Configuration",
    ],
    deliverables: [
      "Live Website",
      "Launch Checklist",
      "Training Session",
      "Handover Documentation",
    ],
    timeline: "1–3 Days",
    involvement: "Medium",
  },
  {
    n: "08",
    title: "Grow & Optimize",
    objective:
      "Continuous improvement based on analytics, customer behaviour, and market trends.",
    activities: [
      "SEO Improvements",
      "Marketing Campaigns",
      "AI Optimization",
      "Performance Monitoring",
      "Feature Enhancements",
      "Content Updates",
      "Monthly Reports",
      "Strategy Reviews",
    ],
    deliverables: [
      "Growth Reports",
      "Analytics Dashboard",
      "Quarterly Strategy Review",
      "Optimization Roadmap",
    ],
    timeline: "Ongoing",
    involvement: "Low",
  },
];

const PRINCIPLES = [
  {
    title: "Business First",
    body: "We understand your business before proposing technology.",
  },
  {
    title: "Strategy Over Trends",
    body: "We build sustainable systems instead of following short-lived trends.",
  },
  {
    title: "Transparency",
    body: "Clear communication throughout every project.",
  },
  {
    title: "Innovation",
    body: "We continuously adopt emerging technologies to create better solutions.",
  },
  {
    title: "Collaboration",
    body: "Our clients become part of the creative and strategic process.",
  },
  {
    title: "Long-Term Growth",
    body: "Success is measured by your business growth — not project completion.",
  },
];

const CLIENT_JOURNEY = [
  "Initial Enquiry",
  "Discovery Meeting",
  "Proposal & Quotation",
  "Project Kickoff",
  "Research & Planning",
  "Design Approval",
  "Development",
  "Testing",
  "Launch",
  "Growth Partnership",
];

const PROCESS_BENEFITS = [
  "Clear Communication",
  "Defined Timelines",
  "Dedicated Team",
  "No Hidden Processes",
  "Data-Driven Decisions",
  "Continuous Support",
];

/* ============================================================
   PHASE TIMELINE — alternating rows
   ============================================================ */
function PhaseTimeline() {
  return (
    <Section className="bg-[var(--canvas)]">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="The Vistaar Method"
            title="The Vistaar growth cycle."
            description="Eight phases, run as a continuous loop. Each one sets up the next."
          />
        </Reveal>

        <div className="mx-auto mt-14 max-w-5xl">
          <div className="relative space-y-3">
            <div
              aria-hidden
              className="absolute left-[27px] top-2 bottom-2 hidden w-px bg-[var(--hairline)] lg:left-1/2 lg:block"
            />
            {PHASES.map((p, i) => {
              const reverse = i % 2 === 1;
              return (
                <Reveal key={p.n} delay={(i % 4) + 1}>
                  <div
                    className={cn(
                      "relative grid items-start gap-6 rounded-[4px] border border-[var(--hairline)] bg-[var(--canvas)] p-6 lg:grid-cols-2 lg:gap-8 lg:p-8",
                      reverse && "lg:[&>*:first-child]:order-2"
                    )}
                  >
                    <div className="pl-14 lg:pl-0">
                      <div className="flex items-start gap-4 lg:justify-end">
                        <div className="hidden lg:block lg:text-right">
                          <div className="mono-eyebrow text-[var(--body)]">
                            Phase {p.n}
                          </div>
                          <h3 className="mt-1 text-display-md text-[var(--ink)]">
                            {p.title}
                          </h3>
                          <p className="mt-2 text-[14px] leading-[1.5] text-[var(--body)]">
                            {p.objective}
                          </p>
                        </div>
                        <span
                          className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-medium text-[var(--canvas)]"
                          style={{ background: "var(--ink)" }}
                        >
                          {p.n}
                        </span>
                      </div>
                    </div>

                    <div className="pl-14 lg:pl-0">
                      <div className="lg:hidden">
                        <div className="mono-eyebrow text-[var(--body)]">
                          Phase {p.n}
                        </div>
                        <h3 className="mt-1 text-display-md text-[var(--ink)]">
                          {p.title}
                        </h3>
                        <p className="mt-2 text-[14px] leading-[1.5] text-[var(--body)]">
                          {p.objective}
                        </p>
                      </div>
                      <div className="mt-4">
                        <h4 className="mono-eyebrow text-[var(--body)]">
                          Activities
                        </h4>
                        <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                          {p.activities.slice(0, 6).map((a) => (
                            <li
                              key={a}
                              className="flex items-start gap-2 text-[14px] text-[var(--ink)]"
                            >
                              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--ink)]" />
                              {a}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-5 grid gap-3 border-t border-[var(--hairline)] pt-4 sm:grid-cols-2">
                          <div>
                            <div className="mono-eyebrow text-[var(--body)]">
                              Timeline
                            </div>
                            <div className="mt-1 text-[14px] font-medium text-[var(--ink)]">
                              {p.timeline}
                            </div>
                          </div>
                          <div>
                            <div className="mono-eyebrow text-[var(--body)]">
                              Client Involvement
                            </div>
                            <div className="mt-1 text-[14px] font-medium text-[var(--ink)]">
                              {p.involvement}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function MethodPage() {
  return (
    <main className="relative">
      <PageHero
        eyebrow="The Vistaar Method"
        title="From vision to victory."
        highlight="With a clear path."
        description="Successful businesses are built on process, not guesswork. Our eight-phase methodology combines research, creativity, technology, and continuous optimization — and it's the same playbook we use on every engagement."
      >
        <Button
          size="lg"
          variant="secondary-mint"
          rightIcon={<ArrowRight className="h-4 w-4" />}
          href="/contact"
        >
          Book a discovery call
        </Button>
        <Button
          size="lg"
          variant="secondary-white"
          rightIcon={<ArrowUpRight className="h-4 w-4" />}
          href="/services"
        >
          See our services
        </Button>
      </PageHero>
      <PhaseTimeline />
    </main>
  );
}
