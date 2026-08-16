"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  FileText,
  Mail,
  MapPin,
  Menu,
  Paperclip,
  Phone,
  Upload,
  UserRound,
  X,
} from "lucide-react";
import { Button } from "./button";
import { VistaarLogo } from "./vistaar-logo";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/method", label: "Method" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const;

const JOIN_INTERESTS = [
  "Brand Strategy",
  "Design & UX",
  "Development",
  "AI & Automation",
  "Marketing",
  "Operations",
] as const;

const JOIN_STEPS = [
  { id: 1, label: "Role" },
  { id: 2, label: "Profile" },
  { id: 3, label: "Resume" },
] as const;

function StepRail({ step }: { step: number }) {
  return (
    <div className="mx-auto flex max-w-md items-center justify-between">
      {JOIN_STEPS.map((s, i) => {
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
            {i < JOIN_STEPS.length - 1 && (
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

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [joinStep, setJoinStep] = useState(1);
  const [pickedInterests, setPickedInterests] = useState<string[]>([]);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    portfolio: "",
    experience: "",
    message: "",
  });

  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 1024) setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!joinModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [joinModalOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const toggleInterest = (label: string) => {
    setPickedInterests((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const canContinue =
    (joinStep === 1 && pickedInterests.length > 0) ||
    (joinStep === 2 &&
      formData.fullName.trim() &&
      formData.email.trim() &&
      formData.phone.trim() &&
      formData.location.trim()) ||
    (joinStep === 3 && Boolean(resumeName));

  const resetJoinForm = () => {
    setJoinStep(1);
    setPickedInterests([]);
    setResumeName(null);
    setSubmitted(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      location: "",
      portfolio: "",
      experience: "",
      message: "",
    });
  };

  const closeJoinModal = () => {
    setJoinModalOpen(false);
    setTimeout(resetJoinForm, 100);
  };

  const onJoinSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 transition-all duration-300">
        <div
          className={cn(
            "w-full max-w-[1200px] transition-all duration-500 ease-in-out",
            scrolled ? "rounded-full border border-white/10 bg-zinc-950/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.4)]" : "rounded-2xl border border-transparent bg-transparent"
          )}
        >
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Link
                href="/"
                className="group flex items-center transition-transform hover:scale-105"
                aria-label="Vistaar home"
              >
                <VistaarLogo onDark={true} />
              </Link>

              <nav className="hidden items-center gap-1 rounded-full border border-white/5 bg-zinc-900/50 px-2 py-1.5 shadow-sm backdrop-blur-md lg:flex">
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "relative rounded-full px-4 py-1.5 text-[14px] font-medium transition-all duration-300",
                        active
                          ? "bg-white text-black shadow-md"
                          : "text-zinc-400 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex items-center gap-3">
                <Button
                  size="md"
                  variant="secondary-mint"
                  className="hidden rounded-full font-semibold shadow-sm transition-all group-hover:shadow-md sm:inline-flex"
                  onClick={() => setJoinModalOpen(true)}
                >
                  Join Us
                </Button>
                <button
                  type="button"
                  onClick={() => setOpen((o) => !o)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-zinc-900/80 text-white shadow-sm backdrop-blur-md transition-colors hover:bg-zinc-800 lg:hidden"
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-expanded={open}
                >
                  {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "absolute inset-x-4 top-[84px] overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/95 backdrop-blur-xl shadow-xl transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden",
            open ? "max-h-[640px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-4 pointer-events-none border-transparent"
          )}
        >
          <div className="px-6 py-6">
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-xl px-4 py-3 text-[16px] font-semibold transition-all",
                      active
                        ? "bg-white text-black"
                        : "text-zinc-300 hover:bg-white/5 hover:text-white"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6">
                <Button
                  fullWidth
                  variant="secondary-mint"
                  className="h-12 rounded-xl text-[16px] text-black"
                  onClick={() => {
                    setOpen(false);
                    setJoinModalOpen(true);
                  }}
                >
                  Join Us
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {joinModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020912]/70 p-3 backdrop-blur-sm sm:p-4"
          onClick={closeJoinModal}
        >
          <div
            className="relative w-full max-w-3xl max-h-[92vh] overflow-hidden rounded-[4px] border border-[var(--hairline)] bg-[var(--canvas)] shadow-[0_30px_80px_rgba(2,9,18,0.7)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[var(--hairline)] bg-[var(--surface-dark-soft)] px-5 py-4 sm:px-7">
              <div>
                <span className="mono-eyebrow text-[var(--body)]">Join Vistaar</span>
                <h3 className="mt-1 text-[20px] font-medium text-[var(--ink)]">
                  Build with us.
                </h3>
              </div>
              <button
                type="button"
                onClick={closeJoinModal}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--hairline)] bg-[var(--canvas)] text-[var(--body)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)]"
                aria-label="Close join form"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[calc(92vh-72px)] overflow-y-auto p-5 sm:p-8">
              {submitted ? (
                <div className="mx-auto max-w-lg py-8 text-center">
                  <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--ink)] text-[var(--canvas)]">
                    <Check className="h-5 w-5" />
                  </span>
                  <h4 className="mt-5 text-[22px] font-medium text-[var(--ink)]">
                    Application received.
                  </h4>
                  <p className="mt-3 text-[15px] text-[var(--body)]">
                    Thanks for applying. We&apos;ll review your profile and reach out within 1–2 business days.
                  </p>
                  <button
                    type="button"
                    onClick={closeJoinModal}
                    className="mt-6 text-[14px] font-medium text-[var(--ink)] underline underline-offset-4"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={onJoinSubmit}>
                  <div className="mb-8">
                    <StepRail step={joinStep} />
                  </div>

                  {joinStep === 1 && (
                    <div>
                      <div className="flex items-end justify-between gap-3">
                        <div>
                          <span className="mono-eyebrow text-[var(--body)]">What role interests you?</span>
                          <p className="mt-1 text-[12px] text-[var(--body)]">
                            Pick the areas that fit your strengths.
                          </p>
                        </div>
                        <span className="mono-eyebrow text-[var(--body)]">
                          {pickedInterests.length} selected
                        </span>
                      </div>

                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        {JOIN_INTERESTS.map((interest) => {
                          const active = pickedInterests.includes(interest);
                          return (
                            <button
                              key={interest}
                              type="button"
                              onClick={() => toggleInterest(interest)}
                              className={cn(
                                "flex items-center justify-between rounded-[4px] border bg-[var(--canvas)] p-4 text-left transition-colors",
                                active
                                  ? "border-[var(--ink)] ring-1 ring-[var(--ink)]"
                                  : "border-[var(--hairline)] hover:border-[var(--ink)]"
                              )}
                            >
                              <span className="flex items-center gap-3">
                                <span className={cn(
                                  "flex h-8 w-8 items-center justify-center rounded-full",
                                  active ? "bg-[var(--ink)] text-[var(--canvas)]" : "bg-[var(--surface-dark-soft)] text-[var(--body)]"
                                )}>
                                  <BriefcaseBusiness className="h-4 w-4" />
                                </span>
                                <span className="text-[14px] font-medium text-[var(--ink)]">{interest}</span>
                              </span>
                              {active && <Check className="h-4 w-4 text-[var(--ink)]" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {joinStep === 2 && (
                    <div>
                      <span className="mono-eyebrow text-[var(--body)]">Profile details</span>
                      <div className="mt-5 grid gap-5 sm:grid-cols-2">
                        <Field label="Full name" required>
                          <input
                            required
                            type="text"
                            value={formData.fullName}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                            }
                            placeholder="Jane Doe"
                            className="form-input"
                          />
                        </Field>

                        <Field label="Email" required>
                          <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, email: e.target.value }))
                            }
                            placeholder="jane@company.com"
                            className="form-input"
                          />
                        </Field>

                        <Field label="Phone" required>
                          <input
                            required
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, phone: e.target.value }))
                            }
                            placeholder="+91 98765 43210"
                            className="form-input"
                          />
                        </Field>

                        <Field label="Location" required>
                          <input
                            required
                            type="text"
                            value={formData.location}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, location: e.target.value }))
                            }
                            placeholder="Pune, India"
                            className="form-input"
                          />
                        </Field>

                        <Field label="Portfolio / LinkedIn" full>
                          <input
                            type="url"
                            value={formData.portfolio}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, portfolio: e.target.value }))
                            }
                            placeholder="https://linkedin.com/in/yourname"
                            className="form-input"
                          />
                        </Field>

                        <Field label="Years of experience" full>
                          <input
                            type="text"
                            value={formData.experience}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, experience: e.target.value }))
                            }
                            placeholder="3+ years, design, marketing, product..."
                            className="form-input"
                          />
                        </Field>

                        <Field label="Why do you want to join?" full>
                          <textarea
                            rows={4}
                            value={formData.message}
                            onChange={(e) =>
                              setFormData((prev) => ({ ...prev, message: e.target.value }))
                            }
                            placeholder="Tell us about the projects, skills, or ideas you are excited to work on."
                            className="form-input h-auto resize-none px-4 py-3"
                          />
                        </Field>
                      </div>
                    </div>
                  )}

                  {joinStep === 3 && (
                    <div>
                      <span className="mono-eyebrow text-[var(--body)]">Resume & work samples</span>
                      <div className="mt-5 rounded-[4px] border border-dashed border-[var(--hairline)] bg-[var(--surface-dark-soft)] p-5">
                        <label className="flex cursor-pointer flex-col items-center justify-center gap-4 rounded-[4px] border border-dashed border-[var(--hairline)] bg-[var(--canvas)] px-5 py-8 text-center transition-colors hover:border-[var(--ink)]">
                          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--ink)] text-[var(--canvas)]">
                            <Upload className="h-5 w-5" />
                          </span>
                          <div>
                            <p className="text-[15px] font-medium text-[var(--ink)]">
                              {resumeName ? resumeName : "Upload your resume"}
                            </p>
                            <p className="mt-1 text-[12px] text-[var(--body)]">
                              PDF, DOC, DOCX, or a short portfolio file. Max 25 MB.
                            </p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx,.txt,.ppt,.pptx"
                            onChange={(e) => setResumeName(e.target.files?.[0]?.name ?? null)}
                          />
                        </label>
                      </div>

                      <div className="mt-5 grid gap-5 sm:grid-cols-2">
                        <Field label="Best known skills">
                          <input
                            type="text"
                            placeholder="Brand strategy, motion design, product marketing..."
                            className="form-input"
                          />
                        </Field>
                        <Field label="Availability">
                          <input
                            type="text"
                            placeholder="Immediate / 2 weeks / Flexible"
                            className="form-input"
                          />
                        </Field>
                      </div>
                    </div>
                  )}

                  <div className="mt-8 flex flex-col gap-4 border-t border-[var(--hairline)] pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-[12px] text-[var(--body)]">
                      Step {joinStep} of {JOIN_STEPS.length}
                    </span>

                    <div className="flex gap-3 sm:justify-end">
                      {joinStep > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="md"
                          className="rounded-full text-sm font-semibold"
                          onClick={() => setJoinStep((s) => Math.max(s - 1, 1))}
                          leftIcon={<ArrowLeft className="h-4 w-4" />}
                        >
                          Back
                        </Button>
                      )}

                      {joinStep < 3 ? (
                        <Button
                          type="button"
                          variant="primary"
                          disabled={!canContinue}
                          size="md"
                          className="rounded-full text-sm font-semibold"
                          onClick={() => setJoinStep((s) => Math.min(s + 1, 3))}
                          rightIcon={<ArrowRight className="h-4 w-4" />}
                        >
                          Continue
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          variant="primary"
                          size="md"
                          className="rounded-full text-sm font-semibold"
                          rightIcon={<ArrowRight className="h-4 w-4" />}
                          disabled={!canContinue}
                        >
                          Submit profile
                        </Button>
                      )}
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
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
          min-height: 120px;
          height: auto;
          border-radius: 4px;
          padding: 12px 14px;
          resize: vertical;
        }
      `}</style>
    </>
  );
}
