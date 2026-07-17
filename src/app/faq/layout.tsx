import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "The questions founders and teams ask us most often, answered in plain English. Can't find what you need? Send us a note.",
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
