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
                  className="inline-flex h-8 w-8 items-center justify-center text-[var(--body)] transition-colors hover:text-[var(--ink)]"
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
            <span className="mono-eyebrow">Pune · India</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
