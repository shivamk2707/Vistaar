"use client";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useState, useRef, MouseEvent } from "react";

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
            <main className="flex w-full max-w-[1000px] flex-col items-center px-6 pt-32 text-center md:pt-40 z-10">

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
                        className="relative z-0 text-balance text-5xl font-medium tracking-tighter sm:text-7xl lg:text-8xl"
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

                    {/* Masked Rainbow Text Overlay */}
                    <div
                        className="pointer-events-none absolute inset-0 py-10 px-4 z-20 transition-opacity duration-300"
                        style={{
                            opacity: isHovering ? 1 : 0,
                            WebkitMaskImage: `radial-gradient(circle 32px at ${mousePosition.x}px ${mousePosition.y}px, black 95%, transparent 100%)`,
                            maskImage: `radial-gradient(circle 32px at ${mousePosition.x}px ${mousePosition.y}px, black 95%, transparent 100%)`,
                        }}
                    >
                        <h1
                            className="text-balance text-5xl font-medium tracking-tighter sm:text-7xl lg:text-8xl"
                            style={{ fontFamily: "var(--font-ubuntu), sans-serif" }}
                            aria-hidden="true"
                        >
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500">
                                AI-Powered Brand Growth Company
                            </span>
                            <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                                Build what&rsquo;s next on the AI Native Cloud.
                            </span>
                        </h1>
                    </div>
                </div>

                <p className="mx-auto mb-10 max-w-[800px] text-balance text-base leading-relaxed text-neutral-400 sm:text-lg">
                    Vistaar partners with startups, founders, and businesses to create impactful brands, modern websites, intelligent AI solutions, and scalable growth systems that transform ideas into successful businesses.
                </p>

                {/* Call to Actions - High contrast, sharp edges */}
                <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
                    <button className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-white px-6 text-sm font-medium text-black transition-all hover:bg-neutral-200 active:scale-[0.98] sm:w-auto">
                        Start Building
                        <ArrowRight className="h-4 w-4" />
                    </button>
                    <button className="flex h-11 w-full items-center justify-center rounded-md border border-white/[0.12] bg-transparent px-6 text-sm font-medium text-white transition-all hover:bg-white/[0.05] active:scale-[0.98] sm:w-auto">
                        Documentation
                    </button>
                </div>
            </main>
        </section>
    );
}