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
          "w-full max-w-[1200px] transition-all duration-500 ease-in-out",
          scrolled ? "rounded-full border border-white/10 bg-zinc-950/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.4)]" : "rounded-2xl border border-transparent bg-transparent"
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
              <VistaarLogo onDark={true} />
            </Link>

            {/* Center nav */}
            <nav className="hidden items-center gap-1 lg:flex bg-zinc-900/50 border border-white/5 rounded-full px-2 py-1.5 shadow-sm backdrop-blur-md">
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

            {/* Right side */}
            <div className="flex items-center gap-3">
              <Link href="/contact" className="hidden sm:inline-flex group">
                <Button
                  size="sm"
                  variant="secondary-mint"
                  className="rounded-full text-black font-semibold shadow-sm transition-all group-hover:shadow-md"
                  rightIcon={<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
                >
                  Get started
                </Button>
              </Link>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900/80 border border-white/10 text-white shadow-sm backdrop-blur-md transition-colors hover:bg-zinc-800 lg:hidden"
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
              <Link href="/contact" onClick={() => setOpen(false)}>
                <Button
                  fullWidth
                  variant="secondary-mint"
                  className="rounded-xl h-12 text-[16px] text-black"
                  rightIcon={<ArrowUpRight className="h-4 w-4" />}
                >
                  Get started
                </Button>
              </Link>
              <Link href="/contact" onClick={() => setOpen(false)}>
                <Button fullWidth variant="primary" className="rounded-xl h-12 text-[16px] bg-white text-black hover:bg-zinc-200">
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
