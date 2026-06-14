import type { Metadata } from "next";
import { Almarai, Instrument_Serif } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CommandPalette from "@/components/CommandPalette";
import { SpeedInsights } from "@vercel/speed-insights/next";

const almarai = Almarai({
  subsets: ["latin"],
  weight: ["300", "400", "700", "800"],
  variable: "--font-almarai",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  title: "Shouri Chakraborty | AI Developer & Software Engineer",
  description: "Explore the portfolio of Shouri Chakraborty, an aspiring developer and AI engineer in Kolkata specializing in Generative AI, coding agents, NLP, and Next.js.",
  keywords: [
    "Shouri Chakraborty",
    "Shouri",
    "Chakraborty",
    "Developer Portfolio",
    "AI Engineer",
    "Software Engineer",
    "Kolkata Developer",
    "IEM Kolkata",
    "Next.js Developer",
    "Generative AI",
    "Coding Agents"
  ],
  authors: [{ name: "Shouri Chakraborty" }],
  creator: "Shouri Chakraborty",
  publisher: "Shouri Chakraborty",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devshouri.in",
    title: "Shouri Chakraborty | AI Developer & Software Engineer",
    description: "Explore the portfolio of Shouri Chakraborty, an aspiring developer and AI engineer in Kolkata specializing in Generative AI, coding agents, NLP, and Next.js.",
    siteName: "Shouri Chakraborty Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shouri Chakraborty | AI Developer & Software Engineer",
    description: "Explore the portfolio of Shouri Chakraborty, an aspiring developer and AI engineer in Kolkata specializing in Generative AI, coding agents, NLP, and Next.js.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Shouri Chakraborty",
    "url": "https://devshouri.in",
    "image": "https://devshouri.in/developer_portrait.jpg",
    "jobTitle": "AI Developer & Software Engineer",
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Institute of Engineering & Management, Kolkata"
    },
    "sameAs": [
      "https://github.com/shouri123",
      "https://linkedin.com/in/shouri-chakraborty",
      "https://instagram.com/devshouri"
    ],
    "knowsAbout": [
      "Generative AI",
      "Coding Agents",
      "Machine Learning",
      "Natural Language Processing",
      "System Architecture",
      "TypeScript",
      "Next.js",
      "React",
      "Python"
    ]
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Shouri Chakraborty | AI Developer & Software Engineer",
    "url": "https://devshouri.in",
    "description": "Professional developer portfolio of Shouri Chakraborty, specializing in Next.js, Generative AI, and Agentic systems."
  };

  return (
    <html lang="en" className={`${almarai.variable} ${instrumentSerif.variable}`}>
      <head>
        <link rel="canonical" href="https://devshouri.in" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="antialiased font-sans">
        <LenisProvider>
          <CommandPalette />
          {children}
        </LenisProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
