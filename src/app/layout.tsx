import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const fredokaOne = Fredoka({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});

const nunito = Nunito({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kuttappan.in"),
  title: {
    template: "%s | Kuttappan",
    default: "Kuttappan | Big Plans. Bigger Fails. Biggest Heart.",
  },
  description:
    "Kuttappan is a 3D animated kids series about a mischievous boy from a Kerala village whose plans always fail but whose heart always wins. Human-directed, AI-powered animation by AImaginist Studio.",
  openGraph: {
    type: "website",
    url: "https://kuttappan.in",
    siteName: "Kuttappan",
    images: [
      {
        url: "/images/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kuttappan — Big Plans. Bigger Fails. Biggest Heart.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@KuttappanShow",
    images: ["/images/brand/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-192.png", sizes: "192x192" },
      { url: "/icon-512.png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://kuttappan.in/#website",
      url: "https://kuttappan.in",
      name: "Kuttappan",
      description: "3D animated kids series from Kerala by AImaginist Studio",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://kuttappan.in/?s={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://kuttappan.in/#organization",
      name: "AImaginist Studio",
      url: "https://aimaginist.studio",
      sameAs: [
        "https://youtube.com/@Kuttappan",
        "https://instagram.com/kuttappan.official",
        "https://x.com/KuttappanShow",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fredokaOne.variable} ${nunito.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-body bg-warm-cream text-soft-black">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
