import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Plain-English terms that govern your use of vistaar.com and any services we deliver.",
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
