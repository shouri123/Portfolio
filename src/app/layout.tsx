import type { Metadata } from "next";
import { Almarai, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CommandPalette from "@/components/CommandPalette";
import { FootballModeProvider } from "@/lib/context/FootballModeContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

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
  metadataBase: new URL("https://devshouri.in"),
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/developer_portrait.jpg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devshouri.in",
    title: "Shouri Chakraborty | AI Developer & Software Engineer",
    description: "Explore the portfolio of Shouri Chakraborty, an aspiring developer and AI engineer in Kolkata specializing in Generative AI, coding agents, NLP, and Next.js.",
    siteName: "Shouri Chakraborty Portfolio",
    images: [
      {
        url: "/developer_portrait.jpg",
        width: 800,
        height: 800,
        alt: "Shouri Chakraborty portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shouri Chakraborty | AI Developer & Software Engineer",
    description: "Explore the portfolio of Shouri Chakraborty, an aspiring developer and AI engineer in Kolkata specializing in Generative AI, coding agents, NLP, and Next.js.",
    images: ["/developer_portrait.jpg"],
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
    "alternateName": ["Shouri", "devshouri", "Shouri Chakraborty Portfolio", "shouri123"],
    "url": "https://devshouri.in",
    "image": "https://devshouri.in/developer_portrait.jpg",
    "email": "chakrabortyshouri@gmail.com",
    "jobTitle": "AI Developer & Software Engineer",
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Institute of Engineering & Management, Kolkata"
    },
    "sameAs": [
      "https://github.com/shouri123",
      "https://www.linkedin.com/in/shouri-chakraborty-224b5330b/",
      "https://instagram.com/shourichakraborty"
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
    "alternateName": "Shouri Portfolio",
    "url": "https://devshouri.in",
    "description": "Professional developer portfolio of Shouri Chakraborty, specializing in Next.js, Generative AI, and Agentic systems."
  };

  return (
    <html lang="en" className={`${almarai.variable} ${instrumentSerif.variable}`} suppressHydrationWarning>
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
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WVKZDX9D');`}
        </Script>
      </head>
      <body className="antialiased font-sans">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WVKZDX9D"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <FootballModeProvider>
          <LenisProvider>
            <CommandPalette />
            {children}
          </LenisProvider>
        </FootballModeProvider>
        <SpeedInsights />
        <Analytics />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HC19S895RB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HC19S895RB');
          `}
        </Script>
      </body>
    </html>
  );
}
