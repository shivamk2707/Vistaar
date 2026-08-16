"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState, useRef, MouseEvent } from "react";
import { Button } from "./button";

export default function ModernLandingHero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <section className="relative flex min-h-screen w-full flex-col items-center font-sans text-white selection:bg-white selection:text-black">
            <main className="flex w-full max-w-[1000px] flex-col items-center px-6 pt-32 pb-20 text-center md:pt-40 z-10">

                {/* Text Container with Mouse Tracking */}
                <div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className="relative mb-6 max-w-4xl py-10 px-4 group"
                >
                    {/* Glass Circle following mouse */}
                    <div
                        className={cn(
                            "pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300 z-10",
                            "h-24 w-24 bg-white/10 backdrop-blur-xl",
                            isHovering ? "opacity-100" : "opacity-0"
                        )}
                        style={{
                            left: `${mousePosition.x}px`,
                            top: `${mousePosition.y}px`,
                            WebkitMaskImage: `radial-gradient(circle, black 0%, transparent 70%)`,
                            maskImage: `radial-gradient(circle, black 0%, transparent 70%)`,
                        }}
                    />

                    {/* Original Base Text */}
                    <h1
                        className="relative z-0 text-balance text-3xl font-medium tracking-tighter sm:text-5xl lg:text-7xl"
                        style={{ fontFamily: "var(--font-ubuntu), sans-serif" }}
                    >
                        <span className="text-white">
                            AI-Powered Brand Growth Company
                        </span>
                        <br className="hidden sm:block" />
                        <span className="text-neutral-400">
                            Build what&rsquo;s next on the AI Native Cloud.
                        </span>
                    </h1>
                </div>

                <p className="mx-auto mb-10 max-w-[800px] text-balance text-base leading-relaxed text-neutral-400 sm:text-lg">
                    Vistaar partners with startups, founders, and businesses to create impactful brands, modern websites, intelligent AI solutions, and scalable growth systems that transform ideas into successful businesses.
                </p>

                {/* Call to Actions - High contrast, sharp edges */}
                <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button
                        href="/contact"
                        size="md"
                        variant="secondary-mint"
                        className="hidden rounded-full text-sm font-semibold shadow-sm transition-all group-hover:shadow-md sm:inline-flex"
                        rightIcon={<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
                    >
                        Start Building
                    </Button>
                    <Button
                        href="/contact"
                        size="md"
                        className="hidden rounded-full text-sm font-semibold shadow-sm transition-all group-hover:shadow-md sm:inline-flex"
                    >
                        Documentation
                    </Button>
                </div>
            </main>
        </section>
    );
}