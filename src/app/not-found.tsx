"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/button";
import { Container } from "@/components/layout";

export default function NotFound() {
  return (
    <main className="relative bg-[var(--canvas)]">
      <Container className="relative flex min-h-[70vh] flex-col items-center justify-center text-center">
        <span className="mono-eyebrow text-[var(--body)]">404</span>
        <h1 className="mt-6 text-display-xxl text-[var(--ink)] max-w-2xl">
          Lost in <span className="text-gradient-brand">growth</span>.
        </h1>
        <p className="mt-5 max-w-md text-[17px] leading-[1.5] text-[var(--body)]">
          We couldn&rsquo;t find that page. It may have moved, or it may have
          never existed. Either way, we&rsquo;ve got you.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Link href="/">
            <Button
              size="lg"
              variant="primary"
              leftIcon={<ArrowLeft className="h-4 w-4" />}
            >
              Back to Home
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Contact us
            </Button>
          </Link>
        </div>
      </Container>
    </main>
  );
}
