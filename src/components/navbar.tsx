"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "./button";
import { ThemeToggle } from "./theme-toggle";
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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize up
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "pt-2 sm:pt-3" : "pt-4 sm:pt-5"
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "flex h-14 items-center justify-between rounded-2xl border px-3 transition-all duration-300 sm:h-16 sm:px-4",
            scrolled
              ? "border-border bg-surface-strong shadow-card backdrop-blur-xl"
              : "border-transparent bg-transparent"
          )}
        >
          <Link
            href="/"
            className="group flex items-center gap-2.5 rounded-lg px-1 py-1"
            aria-label="Vistaar home"
          >
            <VistaarLogo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {link.label}
                  {active && (
                    <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-[image:var(--gradient-primary)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/contact" className="hidden sm:inline-flex">
              <Button
                size="sm"
                variant="primary"
                rightIcon={<ArrowUpRight className="h-4 w-4" />}
              >
                Book a Call
              </Button>
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text-primary lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "mx-auto mt-2 max-w-7xl overflow-hidden px-4 transition-all duration-300 lg:hidden",
          open ? "max-h-[560px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="rounded-2xl border border-border bg-surface-strong p-3 shadow-elevated backdrop-blur-xl">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    active
                      ? "bg-background-muted text-text-primary"
                      : "text-text-secondary hover:bg-background-muted hover:text-text-primary"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link href="/contact" className="pt-1">
              <Button
                fullWidth
                variant="primary"
                rightIcon={<ArrowUpRight className="h-4 w-4" />}
              >
                Book a Call
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
