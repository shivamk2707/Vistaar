import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services · Growth Ecosystem",
  description:
    "Six connected practices — strategy, branding, engineering, AI, creative, and growth marketing — that work as one growth system. Mix them, sequence them, or hand us the whole map.",
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
