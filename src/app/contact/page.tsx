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
  ArrowLeft,
  Paperclip,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/button";
import { Container, Section } from "@/components/layout";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

/* ============================================================
   DATA
   ============================================================ */
const SERVICE_OPTIONS = [
  {
    label: "Branding",
    items: ["Logo", "Identity", "Packaging", "Personal Branding"],
  },
  {
    label: "Website",
    items: ["Business Website", "Landing Page", "Portfolio", "E-commerce"],
  },
  {
    label: "App Development",
    items: ["Android", "iOS", "Cross Platform"],
  },
  {
    label: "AI & Automation",
    items: ["AI Chatbots", "Business Automation", "AI Agents", "CRM Automation"],
  },
  {
    label: "Marketing",
    items: ["SEO", "Google Ads", "Meta Ads", "Social Media"],
  },
  {
    label: "Business Strategy",
    items: ["Consulting", "Growth Strategy", "Go-To-Market", "Digital Transformation"],
  },
];

const TIMELINES = [
  "ASAP",
  "1–2 months",
  "3–6 months",
  "Flexible",
];

const STEPS = [
  { id: 1, label: "Project" },
  { id: 2, label: "Scope" },
  { id: 3, label: "Contact" },
] as const;

/* ============================================================
   STEP RAIL
   ============================================================ */
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
                  "flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-medium transition-all",
                  isDone && "bg-[var(--ink)] text-[var(--canvas)]",
                  isActive && "border border-[var(--ink)] bg-[var(--canvas)] text-[var(--ink)]",
                  !isDone && !isActive && "border border-[var(--hairline)] bg-[var(--canvas)] text-[var(--body)]"
                )}
              >
                {isDone ? <Check className="h-4 w-4" /> : `0${s.id}`}
              </span>
              <span
                className={cn(
                  "mono-eyebrow",
                  isActive ? "text-[var(--ink)]" : "text-[var(--body)]"
                )}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span
                className={cn(
                  "mx-3 h-px flex-1 -translate-y-3",
                  isDone ? "bg-[var(--ink)]" : "bg-[var(--hairline)]"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ============================================================
   PROJECT FORM
   ============================================================ */
function ProjectForm() {
  const [step, setStep] = useState(1);
  const [picked, setPicked] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>("");
  const [timeline, setTimeline] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const togglePicked = (label: string) => {
    setPicked((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };
  const clearPicked = () => setPicked([]);

  // Strip everything that's not a digit (defence-in-depth — the onChange
  // already filters, but this also blocks paste/drag-drop of non-digits).
  const onBudgetChange = (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    setBudget(digits);
  };

  const canContinue =
    (step === 1 && picked.length > 0) ||
    (step === 2 && budget.trim().length > 0 && Boolean(timeline));

  const goNext = () => setStep((s) => Math.min(s + 1, 3));
  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const reset = () => {
    setStep(1);
    setPicked([]);
    setBudget("");
    setTimeline(null);
    setFileName(null);
    setSubmitted(false);
  };

  return (
    <Section className="bg-[var(--canvas)]">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mono-eyebrow text-[var(--body)]">Project enquiry</span>
            <h2 className="mt-3 text-display-xl text-[var(--ink)]">
              Tell us about your project.
            </h2>
            <p className="mt-4 text-[17px] leading-[1.5] text-[var(--body)]">
              Three quick steps. We reply within one business day.
            </p>
          </div>
        </Reveal>

        {submitted ? (
          <Reveal>
            <div className="mx-auto mt-12 max-w-2xl rounded-[4px] border border-[var(--hairline)] bg-[var(--canvas)] p-10 text-center">
              <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--ink)] text-[var(--canvas)]">
                <Check className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-[22px] font-medium text-[var(--ink)]">
                Your brief is in.
              </h3>
              <p className="mt-3 text-[15px] text-[var(--body)]">
                We&rsquo;ll review it and reply within one business day. Urgent?
                Write to{" "}
                <a className="text-[var(--ink)] underline underline-offset-4" href="mailto:hello@vistaar.com">
                  hello@vistaar.com
                </a>
                .
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-6 text-[14px] font-medium text-[var(--ink)] underline underline-offset-4"
              >
                Send another enquiry
              </button>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={1}>
            <div className="mx-auto mt-12 max-w-3xl">
              <StepRail step={step} />

              <div className="mt-8 rounded-[4px] border border-[var(--hairline)] bg-[var(--canvas)] p-7 sm:p-10">
                <form onSubmit={onSubmit}>
                  {step === 1 && (
                    <div>
                      <div className="flex flex-wrap items-end justify-between gap-3">
                        <div>
                          <span className="mono-eyebrow text-[var(--body)]">
                            What are you looking to build?
                          </span>
                          <p className="mt-1 text-[12px] text-[var(--body)]">
                            Select all that apply — you can pick more than one.
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={cn(
                              "mono-eyebrow",
                              picked.length > 0
                                ? "text-[var(--ink)]"
                                : "text-[var(--body)]"
                            )}
                            aria-live="polite"
                          >
                            {picked.length > 0
                              ? `${picked.length} selected`
                              : "0 selected"}
                          </span>
                          {picked.length > 0 && (
                            <button
                              type="button"
                              onClick={clearPicked}
                              className="text-[12px] font-medium text-[var(--body)] underline underline-offset-4 transition-colors hover:text-[var(--ink)]"
                            >
                              Clear
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {SERVICE_OPTIONS.map((opt) => {
                          const isPicked = picked.includes(opt.label);
                          return (
                            <button
                              key={opt.label}
                              type="button"
                              onClick={() => togglePicked(opt.label)}
                              aria-pressed={isPicked}
                              className={cn(
                                "relative rounded-[4px] border bg-[var(--canvas)] p-4 text-left transition-colors",
                                isPicked
                                  ? "border-[var(--ink)] ring-1 ring-[var(--ink)]"
                                  : "border-[var(--hairline)] hover:border-[var(--ink)]"
                              )}
                            >
                              {isPicked ? (
                                <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--ink)] text-[var(--canvas)]">
                                  <Check className="h-3 w-3" />
                                </span>
                              ) : (
                                <span
                                  className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full border border-[var(--hairline)] text-transparent"
                                  aria-hidden
                                />
                              )}
                              <div className="pr-7 text-[14px] font-medium text-[var(--ink)]">
                                {opt.label}
                              </div>
                              <div className="mt-2 text-[12px] text-[var(--body)]">
                                {opt.items.join(" · ")}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Selection summary */}
                      {picked.length > 0 ? (
                        <div className="mt-5 flex flex-wrap items-center gap-2 rounded-[4px] border border-dashed border-[var(--hairline)] bg-[#fafafa] px-4 py-3">
                          <span className="mono-eyebrow text-[var(--body)]">
                            You picked
                          </span>
                          <div className="flex flex-wrap items-center gap-1.5">
                            {picked.map((label) => (
                              <span
                                key={label}
                                className="inline-flex items-center gap-1.5 rounded-[3.25px] border border-[var(--ink)] bg-[var(--ink)] px-2.5 py-1 text-[11px] font-medium text-[var(--canvas)]"
                              >
                                {label}
                                <button
                                  type="button"
                                  onClick={() => togglePicked(label)}
                                  aria-label={`Remove ${label}`}
                                  className="rounded-full p-0.5 transition-colors hover:bg-white/15"
                                >
                                  <svg
                                    viewBox="0 0 8 8"
                                    className="h-2.5 w-2.5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                  >
                                    <path d="M1 1L7 7M7 1L1 7" />
                                  </svg>
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="mt-5 text-[12px] text-[var(--body)]">
                          Nothing picked yet — tap a card to select.
                        </p>
                      )}

                      <div className="mt-6">
                        <Field label="Project description" full>
                          <textarea
                            rows={4}
                            placeholder="What are you building? What problem are you solving? Any links we should see?"
                            className="w-full rounded-[4px] border border-[var(--hairline)] bg-[var(--canvas)] p-4 text-[15px] text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--body)] focus:border-[var(--ink)]"
                          />
                        </Field>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <div>
                        <div className="flex items-end justify-between gap-3">
                          <span className="mono-eyebrow text-[var(--body)]">
                            Estimated budget
                          </span>
                          <span className="mono-eyebrow text-[var(--body)]">
                            in INR
                          </span>
                        </div>

                        <div className="mt-3 relative">
                          <span
                            className="pointer-events-none absolute inset-y-0 left-0 flex w-12 items-center justify-center text-[18px] font-medium text-[var(--ink)]"
                            aria-hidden
                          >
                            ₹
                          </span>
                          <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            autoComplete="off"
                            value={budget}
                            onChange={(e) => onBudgetChange(e.target.value)}
                            onKeyDown={(e) => {
                              // Block letters, spaces, operators, etc. at the keypress level.
                              const allowed = new Set([
                                "Backspace",
                                "Delete",
                                "Tab",
                                "ArrowLeft",
                                "ArrowRight",
                                "Home",
                                "End",
                                "Enter",
                              ]);
                              if (
                                e.ctrlKey ||
                                e.metaKey ||
                                allowed.has(e.key) ||
                                /^[0-9]$/.test(e.key)
                              ) {
                                return;
                              }
                              e.preventDefault();
                            }}
                            onPaste={(e) => {
                              e.preventDefault();
                              const text = e.clipboardData.getData("text");
                              onBudgetChange(text);
                            }}
                            placeholder="e.g. 800000"
                            aria-label="Estimated budget in Indian rupees"
                            className="form-input w-full !pl-12 !pr-16 !h-12 text-[15px] tabular-nums tracking-wide"
                          />
                          <span
                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-[12px] text-[var(--body)]"
                            aria-hidden
                          >
                            INR
                          </span>
                        </div>

                        <p className="mt-2 text-[12px] text-[var(--body)]">
                          Approximate is fine — we&rsquo;ll confirm in the next call. Numbers only.
                        </p>
                      </div>

                      <div className="mt-8">
                        <span className="mono-eyebrow text-[var(--body)]">
                          Preferred timeline
                        </span>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {TIMELINES.map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setTimeline(t)}
                              className={cn(
                                "h-9 rounded-[3.25px] border border-[var(--hairline)] bg-[var(--canvas)] px-4 text-[13px] transition-colors",
                                timeline === t
                                  ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--canvas)]"
                                  : "text-[var(--body)] hover:border-[var(--ink)] hover:text-[var(--ink)]"
                              )}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <span className="mono-eyebrow text-[var(--body)]">
                        How do we reach you?
                      </span>
                      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        <Field label="Full name" required>
                          <input required type="text" placeholder="Jane Doe" className="form-input" />
                        </Field>
                        <Field label="Company name">
                          <input type="text" placeholder="Acme Inc." className="form-input" />
                        </Field>
                        <Field label="Email" required>
                          <input required type="email" placeholder="jane@acme.com" className="form-input" />
                        </Field>
                        <Field label="Phone">
                          <input type="tel" placeholder="+91 000 000 0000" className="form-input" />
                        </Field>
                        <Field label="Country">
                          <input type="text" placeholder="India" className="form-input" />
                        </Field>
                        <Field label="Business website">
                          <input type="url" placeholder="https://acme.com" className="form-input" />
                        </Field>
                        <Field label="Industry" full>
                          <input type="text" placeholder="SaaS, E-commerce, Education…" className="form-input" />
                        </Field>
                        <Field label="How did you hear about us?" full>
                          <input type="text" placeholder="Referral, search, social, event…" className="form-input" />
                        </Field>
                      </div>

                      <div className="mt-5">
                        <Field label="Attachment (optional)" full>
                          <label className="flex cursor-pointer items-center justify-between gap-4 rounded-[4px] border border-dashed border-[var(--hairline)] bg-[var(--canvas)] px-5 py-3 text-[14px] text-[var(--body)] transition-colors hover:border-[var(--ink)]">
                            <span className="flex items-center gap-2 truncate">
                              <Paperclip className="h-4 w-4 shrink-0 text-[var(--body)]" />
                              {fileName ?? "Drop a brief, deck, or RFP — or click to browse"}
                            </span>
                            <span className="shrink-0 text-[12px] text-[var(--body)]">
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

                  <div className="mt-9 flex flex-col gap-4 border-t border-[var(--hairline)] pt-6 sm:flex-row sm:items-center sm:justify-between">
                    {step === 3 ? (
                      <p className="text-[12px] text-[var(--body)]">
                        By submitting, you agree to our{" "}
                        <Link href="/privacy" className="text-[var(--ink)] underline underline-offset-4">
                          privacy policy
                        </Link>
                        .
                      </p>
                    ) : (
                      <span className="text-[12px] text-[var(--body)]">
                        Step {step} of {STEPS.length}
                      </span>
                    )}

                    <div className="flex gap-3 sm:justify-end">
                      {step > 1 && (
                        <Button type="button" variant="outline" onClick={goBack} leftIcon={<ArrowLeft className="h-4 w-4" />}>
                          Back
                        </Button>
                      )}
                      {step < 3 ? (
                        <Button
                          type="button"
                          variant="primary"
                          disabled={!canContinue}
                          onClick={goNext}
                          rightIcon={<ArrowRight className="h-4 w-4" />}
                        >
                          Continue
                        </Button>
                      ) : (
                        <Button type="submit" variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
                          Send project brief
                        </Button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Reveal>
        )}

        <style jsx>{`
            .form-input {
              height: 44px;
              width: 100%;
              border-radius: 4px;
              border: 1px solid var(--hairline);
              background: var(--canvas);
              padding: 0 14px;
              font-size: 14px;
              color: var(--ink);
              outline: none;
              transition: border-color 200ms;
            }
            .form-input::placeholder {
              color: var(--body);
            }
            .form-input:focus {
              border-color: var(--ink);
            }
            textarea.form-input {
              height: auto;
              border-radius: 4px;
              padding: 12px 14px;
            }
          `}</style>
      </Container>
    </Section>
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
    <label className={cn("block", full && "sm:col-span-2 lg:col-span-3")}>
      <span className="mono-eyebrow text-[var(--body)]">
        {label}
        {required && <span className="ml-1 text-[var(--ink)]">*</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

/* ============================================================
   OFFICES
   ============================================================ */
function Offices() {
  return (
    <Section className="bg-[var(--canvas)]" id="offices">
      <Container>
        <Reveal>
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[4px] border border-[var(--hairline)] bg-[var(--canvas-dark)]">
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="rounded-[4px] border border-[var(--surface-dark-soft)] bg-[var(--surface-dark-soft)] p-5">
                  <div className="flex items-center gap-2 text-[14px] font-medium text-[var(--on-dark)]">
                    <MapPin className="h-4 w-4 text-[var(--on-dark)]" />
                    Mumbai · India
                  </div>
                  <p className="mt-1 mono-caption text-[var(--on-dark)] opacity-60">
                    19.0760° N · 72.8777° E
                  </p>
                </div>
              </div>
            </div>

            <div>
              <span className="mono-eyebrow text-[var(--body)]">Our offices</span>
              <h2 className="mt-3 text-display-lg text-[var(--ink)]">
                Remote-first, globally connected.
              </h2>
              <p className="mt-4 text-[16px] leading-[1.5] text-[var(--body)]">
                We work async across time zones, with one home base in Mumbai.
                Visit by appointment, or jump on a call.
              </p>
              <ul className="mt-7 space-y-4 text-[14px]">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ink)]" />
                  <div>
                    <div className="font-medium text-[var(--ink)]">Pune HQ</div>
                    <div className="text-[var(--body)]">Pune City · Pune 411041</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ink)]" />
                  <div>
                    <div className="font-medium text-[var(--ink)]">Phone</div>
                    <a href="tel:+910000000000" className="text-[var(--body)] hover:text-[var(--ink)]">
                      +91 985 415 8521
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ink)]" />
                  <div>
                    <div className="font-medium text-[var(--ink)]">Email</div>
                    <a href="mailto:hello@vistaar.com" className="text-[var(--body)] hover:text-[var(--ink)]">
                      hello@vistaar.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ink)]" />
                  <div>
                    <div className="font-medium text-[var(--ink)]">Business hours</div>
                    <div className="text-[var(--body)]">Mon – Fri  · 9:00 AM – 06:00 PM (IST)</div>
                  </div>
                </li>
              </ul>
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
export default function ContactPage() {
  return (
    <main className="relative">
      <PageHero
        eyebrow="Let's Build Something Extraordinary"
        title="Start a project,"
        highlight=" or just a conversation."
        description="Whether you're launching your first startup, redesigning your brand, developing a digital product, or integrating AI — we're here to help you build with confidence."
      />
      <ProjectForm />
      <Offices />
    </main>
  );
}
