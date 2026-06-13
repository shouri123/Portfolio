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
  title: "Shouri Chakraborty | Cinematic Portfolio",
  description: "Aspiring developer diving deep into Generative AI, Agentic systems, AI/ML, and NLP.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Shouri Chakraborty",
    "url": "https://devshouri.in",
    "jobTitle": "Developer & AI Engineer",
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
      "React"
    ]
  };

  return (
    <html lang="en" className={`${almarai.variable} ${instrumentSerif.variable}`}>
      <head>
        <link rel="canonical" href="https://devshouri.in" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
