"use client";

import { Container, Section } from "@/components/layout";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";

const SECTIONS = [
  {
    title: "1. Introduction",
    body: "Vistaar ('we', 'us', or 'our') operates the website vistaar.com and related services. This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website, contact us, or engage our services. By using the site, you agree to the terms of this policy.",
  },
  {
    title: "2. Information we collect",
    body: "We collect information you voluntarily provide when you fill in a form, subscribe to the newsletter, book a session, or otherwise contact us. This may include your name, email, phone, company, country, role, project details, and any documents you upload. We also automatically collect technical information (IP, browser, device, pages viewed) through cookies and analytics tools.",
  },
  {
    title: "3. How we use your information",
    body: "We use the information we collect to respond to enquiries, deliver and improve our services, send newsletters and product updates (with consent), monitor site performance, and protect against abuse. We do not sell your information to third parties.",
  },
  {
    title: "4. Legal basis for processing",
    body: "We process your data on the basis of (a) your consent (e.g. when you subscribe to a newsletter), (b) the performance of a contract (e.g. when you engage us for a project), and (c) our legitimate interest in operating, securing, and improving our services.",
  },
  {
    title: "5. Cookies & analytics",
    body: "We use first- and third-party cookies for essential site functionality, analytics (Google Analytics 4 and Microsoft Clarity), and marketing (Meta Pixel, LinkedIn Insight Tag). You can manage cookie preferences through your browser or our cookie banner.",
  },
  {
    title: "6. Sharing your data",
    body: "We share data with vetted service providers who help us run the site and business — including hosting (Vercel), email (Resend), analytics (Google, Microsoft), and CRM (HubSpot). These providers are contractually obligated to protect your data. We may also disclose data where required by law.",
  },
  {
    title: "7. International transfers",
    body: "We are headquartered in India and may transfer your data to other countries where our service providers operate. Where required, we use standard contractual clauses or rely on adequacy decisions to protect your information.",
  },
  {
    title: "8. Data retention",
    body: "We retain personal data for as long as needed to provide our services, comply with legal obligations, and resolve disputes. Marketing data is retained until you unsubscribe. Project data is retained for 7 years for contractual and tax purposes.",
  },
  {
    title: "9. Your rights",
    body: "You have the right to access, correct, delete, or port your personal data, and to object to or restrict its processing. To exercise these rights, write to privacy@vistaar.com. We respond to all valid requests within 30 days.",
  },
  {
    title: "10. Security",
    body: "We use industry-standard security measures including HTTPS, encrypted storage, role-based access, and regular audits. No system is 100% secure — if you discover a vulnerability, please report it to security@vistaar.com and we'll respond within 48 hours.",
  },
  {
    title: "11. Children's privacy",
    body: "Our site and services are not directed to children under 16, and we do not knowingly collect personal data from them.",
  },
  {
    title: "12. Changes to this policy",
    body: "We may update this policy from time to time. We will post the revised version on this page and update the 'last updated' date. For material changes, we will notify subscribers by email.",
  },
  {
    title: "13. Contact",
    body: "Questions, complaints, or data requests? Email privacy@vistaar.com or write to: Vistaar, Pune 4110141, India.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="relative">
      <PageHero
        eyebrow="Privacy"
        title="Your data, your rules."
        description="Plain-English summary of how we collect, use, and protect your information when you use vistaar.com or work with us."
      />
      <Section className="bg-[var(--canvas)]">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="mono-eyebrow text-[var(--body)]">
                Last updated · 07 August 2026
              </p>
            </Reveal>
            <div className="mt-10 space-y-10">
              {SECTIONS.map((s, i) => (
                <Reveal key={s.title} delay={(i % 4) + 1}>
                  <div>
                    <h2 className="text-[20px] font-medium text-[var(--ink)] sm:text-[22px]">
                      {s.title}
                    </h2>
                    <p className="mt-3 text-[15px] leading-[1.5] text-[var(--body)]">
                      {s.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
