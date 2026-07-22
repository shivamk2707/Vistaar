"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "./button";
import { Container } from "./layout";
import { VistaarLogo } from "./vistaar-logo";
import {
  LinkedinIcon,
  InstagramIcon,
  FacebookIcon,
  XIcon as Twitter,
  YoutubeIcon,
} from "./social-icons";

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
      { href: "/services#consulting", label: "Business Consulting" },
      { href: "/services#branding", label: "Branding" },
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
      { href: "/method", label: "Our Method" },
      { href: "/faq", label: "FAQs" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms & Conditions" },
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
  return (
    <footer className="bg-[var(--canvas)] text-[var(--ink)]">
      {/* Newsletter + CTA strip */}
      <div className="border-t border-[var(--hairline)]">
        <Container>
          <div className="grid gap-10 py-16 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="mono-eyebrow text-[var(--body)]">Newsletter</span>
              <h3 className="mt-3 text-display-md">
                Insights delivered to your inbox.
              </h3>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[var(--body)]">
                Growth strategy, AI playbooks, and product thinking from the
                Vistaar studio. One short read, every other Friday.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link
                href="/contact"
                className="text-[14px] text-[var(--ink)] underline-offset-4 hover:underline"
              >
                hello@vistaar.com
              </Link>
              <Link href="/contact">
                <Button variant="primary" rightIcon={<ArrowUpRight className="h-3.5 w-3.5" />}>
                  Book a call
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Link columns */}
      <Container>
        <div className="grid gap-10 border-t border-[var(--hairline)] py-16 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-3">
            <VistaarLogo />
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-[var(--body)]">
              An AI-powered Brand Growth Company helping startups, founders, and
              businesses build, launch, market, automate, and scale.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {SOCIAL.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-8 w-8 items-center justify-center border border-[var(--hairline)] text-[var(--body)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)]"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h4 className="mono-eyebrow text-[var(--body)]">{col.title}</h4>
              <ul className="mt-5 space-y-3 text-[14px]">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-1 text-[var(--ink)] transition-opacity hover:opacity-70"
                    >
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-[var(--hairline)] py-6 text-[12px] text-[var(--body)] sm:flex-row">
          <p>© 2026 Vistaar. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-[var(--ink)]">Privacy</Link>
            <Link href="/terms" className="hover:text-[var(--ink)]">Terms</Link>
            <span className="mono-eyebrow">Mumbai · India</span>
          </div>
        </div>
      </Container>

      {/* Giant wordmark banner — the "you have arrived" sign-off */}
      <div className="overflow-hidden bg-[var(--canvas)]">
        <div
          aria-hidden
          className="select-none whitespace-nowrap text-center"
          style={{
            fontSize: "clamp(80px, 22vw, 320px)",
            fontWeight: 500,
            letterSpacing: "-0.05em",
            lineHeight: 0.85,
            color: "var(--hairline)",
          }}
        >
          vistaar.ai
        </div>
      </div>
    </footer>
  );
}
