"use client";

import { Container, Section } from "@/components/layout";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";

const SECTIONS = [
  {
    title: "1. Agreement",
    body: "These terms govern your use of the Vistaar website (vistaar.com) and any services we provide. By using the site or engaging us, you agree to these terms. If you don't agree, please don't use the site or our services.",
  },
  {
    title: "2. Use of the site",
    body: "You may browse the site, share links, and contact us. You may not scrape, mirror, or otherwise reproduce the site or its content without written permission. You may not attempt to gain unauthorized access to any part of the site or its underlying systems.",
  },
  {
    title: "3. Intellectual property",
    body: "All content on this site — copy, designs, code, illustrations, photographs, videos, and trademarks — is owned by Vistaar or our licensors. The Vistaar name and logo are trademarks of Vistaar. You may not use them without prior written consent.",
  },
  {
    title: "4. Engagements & deliverables",
    body: "Specific services are governed by individual statements of work (SOWs) signed by both parties. In case of conflict, the SOW controls. Deliverables become your property upon final payment. We retain the right to display work in our portfolio unless you request otherwise in writing.",
  },
  {
    title: "5. Payment terms",
    body: "Projects are billed per the agreed milestone schedule. Standard terms are 50% on signing, 50% on delivery, with milestone-based options for larger engagements. Late payments accrue interest at 1.5% per month. We pause work on accounts more than 30 days past due.",
  },
  {
    title: "6. Revisions & change orders",
    body: "Each deliverable includes a defined number of revision rounds as specified in the SOW. Additional revisions or scope changes are billed at our standard rates. We document change orders in writing before executing them.",
  },
  {
    title: "7. Cancellations & refunds",
    body: "You may cancel an engagement with 14 days' written notice. We refund prepaid fees for undelivered work, less a 15% administrative fee and any non-recoverable third-party costs already incurred.",
  },
  {
    title: "8. Confidentiality",
    body: "Both parties will treat non-public information shared during an engagement as confidential. We will sign a mutual NDA on request. Confidentiality obligations survive termination of the engagement for 3 years.",
  },
  {
    title: "9. Warranties & disclaimers",
    body: "We warrant that we will perform services in a professional and workmanlike manner. EXCEPT AS EXPRESSLY STATED, THE SITE AND SERVICES ARE PROVIDED 'AS IS' WITHOUT WARRANTY OF ANY KIND. WE DISCLAIM ALL IMPLIED WARRANTIES, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.",
  },
  {
    title: "10. Limitation of liability",
    body: "TO THE MAXIMUM EXTENT PERMITTED BY LAW, VISTAAR'S TOTAL LIABILITY ARISING FROM OR RELATED TO YOUR USE OF THE SITE OR SERVICES WILL NOT EXCEED THE FEES YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM. WE WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES.",
  },
  {
    title: "11. Indemnification",
    body: "You agree to indemnify and hold Vistaar harmless from claims arising from (a) your breach of these terms, (b) your misuse of the site or services, or (c) your violation of any third-party rights.",
  },
  {
    title: "12. Third-party links",
    body: "Our site may link to third-party sites we don't control. We're not responsible for their content or practices. Reading their terms and privacy policies is your responsibility.",
  },
  {
    title: "13. Termination",
    body: "We may suspend or terminate your access to the site at any time, with or without cause, with reasonable notice. SOW terms survive termination where they relate to ongoing obligations.",
  },
  {
    title: "14. Governing law & disputes",
    body: "These terms are governed by the laws of India. Disputes will be resolved through binding arbitration in Pune, in English. Nothing in this clause prevents either party from seeking injunctive relief to protect intellectual property.",
  },
  {
    title: "15. Changes",
    body: "We may update these terms from time to time. We will post the revised version on this page and update the 'last updated' date. For material changes, we will notify subscribers by email at least 30 days before the changes take effect.",
  },
  {
    title: "16. Contact",
    body: "Questions about these terms? Email legal@vistaar.com or write to: Vistaar, Pune 411041, India.",
  },
];

export default function TermsPage() {
  return (
    <main className="relative">
      <PageHero
        eyebrow="Terms of Service"
        title="The fine print, made human."
        description="Plain-English version of the terms that govern your use of vistaar.com and any services we deliver. We aim to be fair, transparent, and boring — in the best way."
      />
      <Section className="bg-[var(--canvas)]">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="mono-eyebrow text-[var(--body)]">
                Last updated · 17 March 2026
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
