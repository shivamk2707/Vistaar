import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Case studies, articles, and free resources on branding, AI, growth, product, and the business of building a modern company.",
};

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
