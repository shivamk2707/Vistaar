import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Vistaar collects, uses, and protects your information when you use our site or work with us.",
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
