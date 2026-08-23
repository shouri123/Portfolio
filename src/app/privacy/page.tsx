import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, FileText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Shouri Chakraborty Portfolio",
  description: "Privacy policy for devshouri.in. Learn how user privacy, data handling, and analytics are managed across this portfolio website.",
};

export default function PrivacyPage() {
  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col justify-between selection:bg-primary selection:text-black">
      <Navbar />

      <main className="w-full max-w-4xl mx-auto px-6 pt-32 pb-20 flex-1">
        <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary/70 hover:text-primary mb-8 font-mono transition-colors">
          <ArrowLeft size={14} /> Back to Overview
        </Link>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#E1E0CC] mb-4">
          Privacy <span className="font-serif italic font-normal text-white">Policy</span>
        </h1>
        <p className="text-xs uppercase tracking-widest text-primary font-mono mb-12">
          Effective Date: January 1, 2026
        </p>

        <div className="flex flex-col gap-10 text-gray-300 text-sm leading-relaxed">
          <section className="bg-white/3 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Shield className="text-primary" size={18} /> 1. Commitment to Privacy
            </h2>
            <p>
              At <strong>devshouri.in</strong>, respecting visitor privacy is a fundamental principle. This Privacy Policy outlines what information is collected, how it is handled, and your rights regarding any data submitted through this website.
            </p>
          </section>

          <section className="bg-white/3 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Eye className="text-primary" size={18} /> 2. Information Collected
            </h2>
            <p className="mb-3">
              We collect minimal information necessary to deliver a high-quality web experience and process communication:
            </p>
            <ul className="list-disc list-inside flex flex-col gap-2 pl-2 text-gray-400 font-mono text-xs">
              <li><strong>Contact Form Data</strong>: When you submit a message through the contact form, we collect your Name, Email address, and message text to respond to your inquiry.</li>
              <li><strong>Usage Analytics</strong>: Aggregated, non-personally identifiable telemetry data (e.g. page views, referral sources, browser type) via Vercel Analytics and Google Tag Manager.</li>
            </ul>
          </section>

          <section className="bg-white/3 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Lock className="text-primary" size={18} /> 3. Data Protection & Sharing
            </h2>
            <p>
              Your personal information is <strong>never sold, rented, or distributed</strong> to third-party marketers. Contact form transmissions are encrypted in transit via SSL/TLS and stored in protected database systems for communication purposes only.
            </p>
          </section>

          <section className="bg-white/3 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <FileText className="text-primary" size={18} /> 4. AI Crawlers & Agent Interaction
            </h2>
            <p>
              This website provides machine-readable indexes (such as <code>llms.txt</code> and <code>sitemap.xml</code>) to facilitate accurate agentic search and indexing. Autonomous AI agents are encouraged to parse content in accordance with standard web crawler policies.
            </p>
          </section>

          <section className="border-t border-white/10 pt-6">
            <h2 className="text-base font-bold text-white mb-2">5. Contact Information</h2>
            <p className="text-xs text-gray-400">
              For any questions or data removal requests regarding this Privacy Policy, email: <a href="mailto:chakrabortyshouri@gmail.com" className="text-primary hover:underline">chakrabortyshouri@gmail.com</a>.
            </p>
          </section>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
