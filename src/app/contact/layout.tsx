import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project, book a strategy session, or just start a conversation. Vistaar responds within one business day — real humans, no auto-replies.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
