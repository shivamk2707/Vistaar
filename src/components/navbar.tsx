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
  { href: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 transition-all duration-300">
      <div
        className={cn(
          "w-full max-w-[1220px] transition-all duration-500 ease-in-out",
          scrolled ? "rounded-full border border-black/10 bg-white/85 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]" : "rounded-full border border-transparent bg-transparent"
        )}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center transition-transform hover:scale-105"
              aria-label="Vistaar home"
            >
              <VistaarLogo onDark={false} />
            </Link>

            {/* Center nav */}
            <nav className="hidden items-center gap-1 lg:flex bg-white/50 border border-black/5 rounded-full px-2 py-1.5 shadow-sm backdrop-blur-md">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative rounded-full px-4 py-1.5 text-[14px] font-medium transition-all duration-300",
                      active
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-neutral-600 hover:bg-black/5 hover:text-neutral-900"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <Link href="/contact" className="hidden sm:inline-flex group">
                <Button
                  size="sm"
                  variant="secondary-mint"
                  className="rounded-full font-semibold shadow-sm transition-all group-hover:shadow-md"
                  rightIcon={<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
                >
                  Get started
                </Button>
              </Link>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 border border-black/10 text-neutral-800 shadow-sm backdrop-blur-md transition-colors hover:bg-neutral-100 lg:hidden"
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
          "absolute inset-x-4 top-[84px] overflow-hidden rounded-2xl border border-black/10 bg-white/95 backdrop-blur-xl shadow-xl transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden",
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
                      ? "bg-blue-50 text-blue-700"
                      : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-6 flex flex-col gap-3 border-t border-black/5 pt-6">
              <Link href="/contact" onClick={() => setOpen(false)}>
                <Button
                  fullWidth
                  variant="secondary-mint"
                  className="rounded-xl h-12 text-[16px]"
                  rightIcon={<ArrowUpRight className="h-4 w-4" />}
                >
                  Get started
                </Button>
              </Link>
              <Link href="/contact" onClick={() => setOpen(false)}>
                <Button fullWidth variant="primary" className="rounded-xl h-12 text-[16px] bg-neutral-900 text-white hover:bg-neutral-800">
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
