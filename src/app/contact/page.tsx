"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Mail,
  MapPin,
  Phone,
  Clock,
  Sparkles,
  ArrowLeft,
  Paperclip,
} from "lucide-react";
import { Button } from "@/components/button";
import { Container } from "@/components/layout";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Halo, GlassCard } from "@/components/halo";
import { cn } from "@/lib/utils";
import { useState } from "react";

/* ============================================================
   SERVICE PICKER
   ============================================================ */
const SERVICE_OPTIONS = [
  {
    label: "Branding",
    items: ["Logo", "Identity", "Packaging", "Personal Branding"],
    tone: "coral" as const,
  },
  {
    label: "Website",
    items: ["Business Website", "Landing Page", "Portfolio", "E-commerce"],
    tone: "blue" as const,
  },
  {
    label: "App Development",
    items: ["Android", "iOS", "Cross Platform"],
    tone: "violet" as const,
  },
  {
    label: "AI & Automation",
    items: ["AI Chatbots", "Business Automation", "AI Agents", "CRM Automation"],
    tone: "coral" as const,
  },
  {
    label: "Marketing",
    items: ["SEO", "Google Ads", "Meta Ads", "Social Media"],
    tone: "blue" as const,
  },
  {
    label: "Business Strategy",
    items: ["Consulting", "Growth Strategy", "Go-To-Market", "Digital Transformation"],
    tone: "violet" as const,
  },
];

const BUDGETS = [
  "< $5K",
  "$5K – $15K",
  "$15K – $50K",
  "$50K – $150K",
  "$150K+",
];

const TIMELINES = [
  "ASAP",
  "1–2 months",
  "3–6 months",
  "Flexible",
];

/* ============================================================
   PROJECT ENQUIRY FORM — 3-step guided flow
   ------------------------------------------------------------
   Requires (unchanged from original, assumed already in file):
     - Field, SERVICE_OPTIONS, BUDGETS, TIMELINES
     - Container, Reveal, GlassCard, Button, cn
     - useState from "react", Link from "next/link"
   New icon import needed:
     - ArrowLeft, Paperclip  (add to the lucide-react import line)
   ============================================================ */

const STEPS = [
  { id: 1, label: "Project" },
  { id: 2, label: "Scope" },
  { id: 3, label: "Contact" },
] as const;

function StepRail({ step }: { step: number }) {
  return (
    <div className="mx-auto flex max-w-md items-center justify-between">
      {STEPS.map((s, i) => {
        const isDone = step > s.id;
        const isActive = step === s.id;
        return (
          <div key={s.id} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-all",
                  isDone && "border-primary bg-primary text-white",
                  isActive && "border-primary bg-primary-soft text-primary shadow-coral",
                  !isDone && !isActive && "border-border bg-surface text-text-muted"
                )}
              >
                {isDone ? <Check className="h-4 w-4" /> : `0${s.id}`}
              </span>
              <span
                className={cn(
                  "text-[11px] font-medium uppercase tracking-[0.14em]",
                  isActive ? "text-primary" : "text-text-muted"
                )}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span
                className={cn(
                  "mx-3 h-px flex-1 -translate-y-3",
                  isDone ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function ProjectForm() {
  const [step, setStep] = useState(1);
  const [picked, setPicked] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const canContinue =
    (step === 1 && Boolean(picked)) || (step === 2 && Boolean(budget) && Boolean(timeline));

  const goNext = () => setStep((s) => Math.min(s + 1, 3));
  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const reset = () => {
    setStep(1);
    setPicked(null);
    setBudget(null);
    setTimeline(null);
    setFileName(null);
    setSubmitted(false);
  };

  return (
    <section className="relative py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Tell us about your project.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
              Three quick steps. We reply within one business day.
            </p>
          </div>
        </Reveal>

        {submitted ? (
          <Reveal>
            <GlassCard tone="coral" className="mx-auto mt-12 max-w-2xl p-10 text-center">
              <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-coral">
                <Check className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold text-text-primary">
                Your brief is in.
              </h3>
              <p className="mt-3 text-sm text-text-secondary sm:text-base">
                We&rsquo;ll review it and reply within one business day. Urgent?
                Write to{" "}
                <a className="text-primary" href="mailto:hello@vistaar.com">
                  hello@vistaar.com
                </a>
                .
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-6 text-sm font-medium text-primary underline underline-offset-4"
              >
                Send another enquiry
              </button>
            </GlassCard>
          </Reveal>
        ) : (
          <Reveal delay={1}>
            <div className="mx-auto mt-12 w-full">
              <div className="mx-auto max-w-xl">
                <StepRail step={step} />
              </div>

              <GlassCard className="mt-8 p-7 sm:p-10">
                <form onSubmit={onSubmit}>
                  {/* STEP 1 — what are you building */}
                  {step === 1 && (
                    <div className="step-panel">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                        What are you looking to build?
                      </span>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {SERVICE_OPTIONS.map((opt) => {
                          const isPicked = picked === opt.label;
                          return (
                            <button
                              key={opt.label}
                              type="button"
                              onClick={() => setPicked(opt.label)}
                              className={cn(
                                "relative rounded-2xl border border-border bg-surface p-4 text-left transition-all hover:-translate-y-0.5",
                                isPicked
                                  ? "border-primary bg-primary-soft shadow-coral"
                                  : "hover:border-primary/40"
                              )}
                            >
                              {isPicked && (
                                <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                                  <Check className="h-3 w-3" />
                                </span>
                              )}
                              <div className="flex items-center gap-2">
                                <span
                                  className={cn(
                                    "inline-flex h-7 w-7 items-center justify-center rounded-lg",
                                    opt.tone === "coral" && "bg-primary-soft text-primary",
                                    opt.tone === "blue" && "bg-secondary-soft text-secondary",
                                    opt.tone === "violet" && "bg-accent-soft text-accent"
                                  )}
                                >
                                  <Sparkles className="h-3.5 w-3.5" />
                                </span>
                                <span className="font-display text-sm font-semibold text-text-primary">
                                  {opt.label}
                                </span>
                              </div>
                              <div className="mt-2 text-xs text-text-secondary">
                                {opt.items.join(" · ")}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-6">
                        <Field label="Project description" full>
                          <textarea
                            rows={4}
                            placeholder="What are you building? What problem are you solving? Any links we should see?"
                            className="input min-h-[120px] rounded-2xl py-3"
                          />
                        </Field>
                      </div>
                    </div>
                  )}

                  {/* STEP 2 — scope */}
                  {step === 2 && (
                    <div className="step-panel">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                          Estimated budget
                        </span>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {BUDGETS.map((b) => (
                            <button
                              key={b}
                              type="button"
                              onClick={() => setBudget(b)}
                              className={cn(
                                "rounded-full border border-border bg-surface px-4 py-2 text-sm transition-all",
                                budget === b
                                  ? "border-primary bg-primary text-white shadow-coral"
                                  : "text-text-secondary hover:border-primary/40"
                              )}
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8">
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                          Preferred timeline
                        </span>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {TIMELINES.map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setTimeline(t)}
                              className={cn(
                                "rounded-full border border-border bg-surface px-4 py-2 text-sm transition-all",
                                timeline === t
                                  ? "border-primary bg-primary text-white shadow-coral"
                                  : "text-text-secondary hover:border-primary/40"
                              )}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3 — contact */}
                  {step === 3 && (
                    <div className="step-panel">
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                        How do we reach you?
                      </span>
                      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        <Field label="Full name" required>
                          <input required type="text" placeholder="Jane Doe" className="input" />
                        </Field>
                        <Field label="Company name">
                          <input type="text" placeholder="Acme Inc." className="input" />
                        </Field>
                        <Field label="Email" required>
                          <input required type="email" placeholder="jane@acme.com" className="input" />
                        </Field>
                        <Field label="Phone">
                          <input type="tel" placeholder="+91 000 000 0000" className="input" />
                        </Field>
                        <Field label="Country">
                          <input type="text" placeholder="India" className="input" />
                        </Field>
                        <Field label="Business website">
                          <input type="url" placeholder="https://acme.com" className="input" />
                        </Field>
                        <Field label="Industry" full>
                          <input type="text" placeholder="SaaS, E-commerce, Education…" className="input" />
                        </Field>
                        <Field label="How did you hear about us?" full>
                          <input type="text" placeholder="Referral, search, social, event…" className="input" />
                        </Field>
                      </div>

                      <div className="mt-5">
                        <Field label="Attachment (optional)" full>
                          <label className="flex cursor-pointer items-center justify-between gap-4 rounded-full border border-dashed border-border bg-surface px-5 py-3 text-sm text-text-secondary transition-colors hover:border-primary">
                            <span className="flex items-center gap-2 truncate">
                              <Paperclip className="h-4 w-4 shrink-0 text-text-muted" />
                              {fileName ?? "Drop a brief, deck, or RFP — or click to browse"}
                            </span>
                            <span className="shrink-0 text-xs text-text-muted">
                              PDF, DOCX, PNG, MP4 · max 25 MB
                            </span>
                            <input
                              type="file"
                              className="hidden"
                              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                            />
                          </label>
                        </Field>
                      </div>
                    </div>
                  )}

                  {/* NAV */}
                  <div className="mt-9 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                    {step === 3 ? (
                      <p className="text-xs text-text-muted">
                        By submitting, you agree to our{" "}
                        <Link href="/privacy" className="text-primary">
                          privacy policy
                        </Link>
                        .
                      </p>
                    ) : (
                      <span className="text-xs text-text-muted">
                        Step {step} of {STEPS.length}
                      </span>
                    )}

                    <div className="flex gap-3 sm:justify-end">
                      {step > 1 && (
                        <Button type="button" size="lg" variant="secondary" onClick={goBack} leftIcon={<ArrowLeft className="h-5 w-5" />}>
                          Back
                        </Button>
                      )}
                      {step < 3 ? (
                        <Button
                          type="button"
                          size="lg"
                          variant="primary"
                          disabled={!canContinue}
                          onClick={goNext}
                          rightIcon={<ArrowRight className="h-5 w-5" />}
                        >
                          Continue
                        </Button>
                      ) : (
                        <Button type="submit" size="lg" variant="primary" rightIcon={<ArrowRight className="h-5 w-5" />}>
                          Send project brief
                        </Button>
                      )}
                    </div>
                  </div>
                </form>
              </GlassCard>
            </div>
          </Reveal>
        )}

        <style jsx>{`
            .input {
              height: 48px;
              width: 100%;
              border-radius: 9999px;
              border: 1px solid var(--border);
              background: var(--background);
              padding: 0 1.25rem;
              font-size: 0.95rem;
              color: var(--text-primary);
              outline: none;
              transition: border-color 200ms, box-shadow 200ms;
            }
            .input::placeholder {
              color: var(--text-muted);
            }
            .input:focus {
              border-color: var(--primary);
              box-shadow: 0 0 0 3px rgba(255, 90, 54, 0.2);
            }
            textarea.input {
              border-radius: 1.25rem;
              padding: 0.75rem 1.25rem;
            }
            .step-panel {
              animation: step-in 320ms ease both;
            }
            @keyframes step-in {
              from {
                opacity: 0;
                transform: translateY(8px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @media (prefers-reduced-motion: reduce) {
              .step-panel {
                animation: none;
              }
            }
          `}</style>
      </Container>
    </section>
  );
}

function Field({
  label,
  required,
  full,
  children,
}: {
  label: string;
  required?: boolean;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block", full && "sm:col-span-2")}>
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
        {label}
        {required && <span className="ml-1 text-primary">*</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

/* ============================================================
   STRATEGY SESSION
   ============================================================ */
const SESSIONS = [
  { name: "Discovery Call", duration: "30 min", desc: "Quick alignment on what you're building and how Vistaar can help." },
  { name: "Project Consultation", duration: "60 min", desc: "Deeper scope review with a strategist and a relevant specialist." },
  { name: "AI Consultation", duration: "60 min", desc: "Map your workflows and identify the highest-ROI AI automations." },
  { name: "Brand Audit", duration: "45 min", desc: "Honest teardown of your current brand, with a written summary." },
  { name: "Website Review", duration: "45 min", desc: "Conversion, performance, and SEO audit with prioritized fixes." },
  { name: "Business Strategy", duration: "60 min", desc: "GTM, positioning, or growth strategy session with our founder." },
];

function StrategySession() {
  return (
    <section className="relative py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-soft-tint"
      />
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Or book a strategy session.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
              Pick the conversation that fits where you are. Free, no pitch, real
              takeaways.
            </p>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SESSIONS.map((s, i) => (
            <Reveal key={s.name} delay={(i % 3) + 1}>
              <GlassCard
                tone={(["coral", "blue", "violet"] as const)[i % 3]}
                className="flex h-full flex-col p-6"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="rounded-full border border-border bg-background px-2.5 py-0.5 font-semibold text-primary">
                    {s.duration}
                  </span>
                  <span className="text-text-muted">Free</span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold text-text-primary">
                  {s.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {s.desc}
                </p>
                <button
                  type="button"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary"
                >
                  Pick a time <ArrowUpRight className="h-4 w-4" />
                </button>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ============================================================
   OFFICES + CONTACT
   ============================================================ */
function Offices() {
  return (
    <section id="offices" className="relative py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <GlassCard tone="blue" className="overflow-hidden p-0">
              <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-primary-soft via-background-muted to-secondary-soft">
                <Halo tone="coral" className="top-1/3 left-1/3 -z-0 h-[200px] w-[200px]" />
                <Halo tone="blue" className="bottom-1/4 right-1/4 -z-0 h-[160px] w-[160px]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-2xl border border-border bg-surface-strong p-5 shadow-elevated">
                    <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                      <MapPin className="h-4 w-4 text-primary" />
                      Mumbai · India
                    </div>
                    <p className="mt-1 text-xs text-text-muted">
                      19.0760° N · 72.8777° E
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>

            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-soft" />
                Our offices
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl">
                Remote-first, globally connected.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-text-secondary">
                We work async across time zones, with one home base in Mumbai.
                Visit by appointment, or jump on a call.
              </p>
              <ul className="mt-7 space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <div className="font-semibold text-text-primary">Mumbai HQ</div>
                    <div className="text-text-muted">Bandra Kurla Complex · Mumbai 400 051</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <div className="font-semibold text-text-primary">Phone</div>
                    <a href="tel:+910000000000" className="text-text-muted hover:text-text-primary">
                      +91 000 000 0000
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <div className="font-semibold text-text-primary">Email</div>
                    <a href="mailto:hello@vistaar.com" className="text-text-muted hover:text-text-primary">
                      hello@vistaar.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <div className="font-semibold text-text-primary">Business hours</div>
                    <div className="text-text-muted">Mon – Sat · 9:00 – 19:00 IST</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ============================================================
   FAQ (mini)
   ============================================================ */
const FAQ = [
  {
    q: "How soon can we start?",
    a: "Most engagements kick off within 1–2 weeks of contract signature. For urgent work, we can sometimes start in 3 days.",
  },
  {
    q: "How much does a project cost?",
    a: "Projects range from $5K for focused sprints to $150K+ for full ecosystem builds. We share a detailed quote after the discovery call.",
  },
  {
    q: "Do you work internationally?",
    a: "Yes. We've delivered projects across 14 countries. We work async, overlap for key calls, and contract under your jurisdiction.",
  },
  {
    q: "Can you sign an NDA?",
    a: "Of course. Mutual NDAs are standard and we can sign before any sensitive details are shared.",
  },
  {
    q: "Do you provide post-launch support?",
    a: "Yes. Every project includes 30 / 90 / 365-day growth reviews and an optional ongoing retainer.",
  },
  {
    q: "Can we hire Vistaar for one service?",
    a: "Absolutely. Single-service engagements are common and we won't try to upsell you into something you don't need.",
  },
  {
    q: "Do you work with startups?",
    a: "Yes — and often. We have a specific pricing tier and a faster sprint model for seed and Series A teams.",
  },
];

function MiniFaq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Quick answers.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
              Still curious? The fastest way is the contact form above.
            </p>
          </div>
        </Reveal>
        <Reveal delay={1}>
          <div className="mx-auto mt-12 w-full divide-y divide-border rounded-3xl border border-border bg-surface-strong">
            {FAQ.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-background-muted/40 sm:px-7"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-semibold text-text-primary sm:text-base">
                      {item.q}
                    </span>
                    <span
                      className={cn(
                        "inline-flex h-7 w-7 items-center justify-center rounded-full border border-border text-base transition-transform",
                        isOpen && "rotate-45 border-primary text-primary"
                      )}
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-6 text-sm leading-relaxed text-text-secondary sm:px-7">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>
        <Reveal delay={2}>
          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary"
            >
              See the full FAQ <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function ContactPage() {
  return (
    <main className="relative">
      <PageHero
        eyebrow="Let's Build Something Extraordinary"
        title="Start a project, or just a conversation."
        description="Whether you're launching your first startup, redesigning your brand, developing a digital product, or integrating AI — we're here to help you build with confidence."
        tone="coral"
      />
      <ProjectForm />
      <StrategySession />
      <Offices />
      <MiniFaq />
    </main>
  );
}
