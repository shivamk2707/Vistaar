"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/button";
import { Container } from "@/components/layout";
import { Halo } from "@/components/halo";

export default function NotFound() {
  return (
    <main className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-page-mesh"
      />
      <Halo tone="coral" className="top-1/4 left-1/2 -z-10 h-[420px] w-[560px] -translate-x-1/2" />
      <Container className="relative flex min-h-[70vh] flex-col items-center justify-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-soft" />
          404
        </span>
        <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-text-primary sm:text-6xl lg:text-7xl">
          Lost in <span className="bg-[image:var(--gradient-accent)] bg-clip-text text-transparent">growth</span>.
        </h1>
        <p className="mt-4 max-w-md text-base text-text-secondary sm:text-lg">
          We couldn&rsquo;t find that page. It may have moved, or it may have
          never existed. Either way, we&rsquo;ve got you.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Link href="/">
            <Button size="lg" variant="primary" leftIcon={<ArrowLeft className="h-5 w-5" />}>
              Back to Home
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="secondary" rightIcon={<ArrowRight className="h-5 w-5" />}>
              Contact Us
            </Button>
          </Link>
        </div>
      </Container>
    </main>
  );
}
