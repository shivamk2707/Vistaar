import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Ubuntu } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageTransition } from "@/components/page-transition";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vistaar.example.com"),
  title: {
    default:
      "Vistaar — AI-Powered Brand Growth Company | Build, Launch, Market, Scale",
    template: "%s · Vistaar",
  },
  description:
    "Vistaar partners with startups, founders, and businesses to create impactful brands, modern websites, intelligent AI solutions, and scalable growth systems that transform ideas into successful businesses.",
  keywords: [
    "AI Brand Growth",
    "Branding Agency",
    "Website Development",
    "AI Automation",
    "SaaS Development",
    "Digital Marketing",
    "Business Consulting",
    "Vistaar",
  ],
  authors: [{ name: "Vistaar" }],
  creator: "Vistaar",
  openGraph: {
    type: "website",
    title: "Vistaar — AI-Powered Brand Growth Company",
    description:
      "Building Brands. Growing Businesses. Strategy, design, AI, and growth marketing — under one vision.",
    siteName: "Vistaar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vistaar — AI-Powered Brand Growth Company",
    description: "Building Brands. Growing Businesses.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#010120",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jetbrainsMono.variable} ${ubuntu.variable}`}
    >
      <body className="min-h-screen bg-canvas text-ink antialiased font-sans" suppressHydrationWarning>
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
