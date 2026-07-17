import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Vistaar Method",
  description:
    "Our eight-phase methodology combines research, creativity, technology, and continuous optimization — the same playbook we use on every engagement.",
};

export default function MethodLayout({ children }: { children: React.ReactNode }) {
  return children;
}
