"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "./button";
import { Container } from "./layout";
import { VistaarLogo } from "./vistaar-logo";

export function Newsletter() {
  return (
    <div className="bg-[var(--canvas)] text-[var(--ink)]">
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
    </div>
  );
}
