"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Send,
  Check,
  Mail,
  MapPin,
  Phone,
  Clock,
} from "lucide-react";
import {
  LinkedinIcon,
  InstagramIcon,
  FacebookIcon,
  XIcon as Twitter,
  YoutubeIcon,
} from "./social-icons";
import { Container } from "./layout";
import { VistaarLogo } from "./vistaar-logo";
import { cn } from "@/lib/utils";

const FOOTER_LINKS = [
  {
    title: "Company",
    items: [
      { href: "/about", label: "About Vistaar" },
      { href: "/about#story", label: "Our Story" },
      { href: "/insights", label: "Case Studies" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Services",
    items: [
      { href: "/services#branding", label: "Branding" },
      { href: "/services#consulting", label: "Business Consulting" },
      { href: "/services#engineering", label: "Website Development" },
      { href: "/services#ai", label: "AI Automation" },
      { href: "/services#creative", label: "Creative Studio" },
      { href: "/services#growth", label: "Digital Marketing" },
    ],
  },
  {
    title: "Resources",
    items: [
      { href: "/insights", label: "Insights" },
      { href: "/insights#articles", label: "Articles" },
      { href: "/method", label: "Our Method" },
      { href: "/faq", label: "FAQs" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms & Conditions" },
    ],
  },
  {
    title: "Contact",
    items: [
      { href: "mailto:hello@vistaar.com", label: "hello@vistaar.com" },
      { href: "tel:+910000000000", label: "+91 000 000 0000" },
      { href: "/contact#offices", label: "Mumbai, India" },
      { href: "/contact#offices", label: "Mon–Sat · 9:00–19:00" },
    ],
  },
];

const SOCIAL: Array<{
  label: string;
  href: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}> = [
  { Icon: LinkedinIcon, label: "LinkedIn", href: "#" },
  { Icon: InstagramIcon, label: "Instagram", href: "#" },
  { Icon: FacebookIcon, label: "Facebook", href: "#" },
  { Icon: Twitter, label: "X (Twitter)", href: "#" },
  { Icon: YoutubeIcon, label: "YouTube", href: "#" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="relative mt-12 overflow-hidden border-t border-border bg-background-elevated">
      <div className="pointer-events-none absolute inset-x-0 -top-32 h-64 bg-glow opacity-60" />

      <Container className="relative">
        {/* Newsletter */}
        <div className="grid gap-10 border-b border-border py-14 lg:grid-cols-2 lg:items-center">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-soft" />
              Newsletter
            </span>
            <h3 className="mt-4 font-display text-2xl font-bold leading-tight sm:text-3xl">
              Insights delivered to your inbox.
            </h3>
            <p className="mt-2 text-text-secondary">
              Growth strategy, AI playbooks, and product thinking from the
              Vistaar studio. One short read, every other Friday.
            </p>
          </div>
          <form
            onSubmit={onSubscribe}
            className="flex w-full max-w-md flex-col gap-2 sm:flex-row lg:justify-self-end"
          >
            <div className="relative w-full">
              <Mail className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="h-12 w-full rounded-full border border-border bg-background pl-12 pr-4 text-sm text-text-primary outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                aria-label="Email address"
              />
            </div>
            <button
              type="submit"
              className={cn(
                "inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium text-white shadow-coral transition-all hover:scale-[1.02] active:scale-[0.99]",
                "bg-[image:var(--gradient-primary)]"
              )}
            >
              {subscribed ? (
                <>
                  <Check className="h-4 w-4" /> Subscribed
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Subscribe
                </>
              )}
            </button>
          </form>
        </div>

        {/* Link columns */}
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <VistaarLogo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-secondary">
              An AI-powered Brand Growth Company helping startups, founders,
              and businesses build, launch, market, automate, and scale.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-text-secondary">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Mumbai, India · Remote worldwide
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                +91 000 000 0000
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Mon – Sat · 9:00 – 19:00 IST
              </li>
            </ul>
            <div className="mt-6 flex items-center gap-2">
              {SOCIAL.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-text-secondary transition-all hover:scale-105 hover:border-primary/40 hover:text-text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3 text-sm">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-1 text-text-secondary transition-colors hover:text-text-primary"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="h-3 w-3 -translate-y-0.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-60" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border py-6 text-xs text-text-muted sm:flex-row">
          <p>© 2026 Vistaar. All rights reserved.</p>
          <p className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-soft" />
            Building Brands. Growing Businesses.
          </p>
        </div>
      </Container>
    </footer>
  );
}
