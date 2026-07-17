import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Vistaar is an AI-powered Brand Growth Company. We help startups, founders, and businesses build meaningful brands, powerful digital experiences, and scalable business systems — under one strategy, one team, one partnership.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
