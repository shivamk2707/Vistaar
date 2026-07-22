"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "./button";
import { VistaarLogo } from "./vistaar-logo";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/method", label: "Method" },
  { href: "/insights", label: "Insights" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (window.innerWidth >= 1024) setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-[var(--canvas-dark)] text-[var(--on-dark)]">
        <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between lg:h-16">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center"
              aria-label="Vistaar home"
            >
              <VistaarLogo onDark />
            </Link>

            {/* Center nav */}
            <nav className="hidden items-center gap-6 lg:flex">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative text-[14px] font-normal transition-opacity hover:opacity-100",
                      active ? "opacity-100" : "opacity-70"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <Link href="/contact" className="hidden sm:inline-flex">
                <Button
                  size="sm"
                  variant="secondary-mint"
                  rightIcon={<ArrowUpRight className="h-3.5 w-3.5" />}
                >
                  Get started
                </Button>
              </Link>
              <Link href="/contact" className="hidden sm:inline-flex">
                <Button size="sm" variant="primary">
                  Sign in
                </Button>
              </Link>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="inline-flex h-9 w-9 items-center justify-center text-[var(--on-dark)] lg:hidden"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-b border-[var(--surface-dark-soft)] bg-[var(--canvas-dark)] transition-all duration-300 lg:hidden",
          open ? "max-h-[640px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="mx-auto max-w-[1280px] px-4 py-4 sm:px-6">
          <nav className="flex flex-col">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "border-b border-[var(--surface-dark-soft)] py-3.5 text-[15px] text-[var(--on-dark)] transition-opacity",
                    active ? "opacity-100" : "opacity-70"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-4 flex flex-col gap-2 pb-2">
              <Link href="/contact">
                <Button
                  fullWidth
                  variant="secondary-mint"
                  rightIcon={<ArrowUpRight className="h-3.5 w-3.5" />}
                >
                  Get started
                </Button>
              </Link>
              <Link href="/contact">
                <Button fullWidth variant="primary">
                  Sign in
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
