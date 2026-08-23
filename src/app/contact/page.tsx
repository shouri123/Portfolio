import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import Link from "next/link";
import { ArrowLeft, Mail, MapPin, MessageSquare, Clock, Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Shouri Chakraborty | AI Developer & Software Engineer",
  description: "Get in touch with Shouri Chakraborty. Send direct messages for AI development, open source collaboration, internships, or freelance inquiries.",
};

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col justify-between selection:bg-primary selection:text-black">
      <Navbar />

      <main className="w-full max-w-5xl mx-auto px-6 pt-32 pb-20 flex-1">
        <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary/70 hover:text-primary mb-8 font-mono transition-colors">
          <ArrowLeft size={14} /> Back to Overview
        </Link>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#E1E0CC] mb-6">
          Contact <span className="font-serif italic font-normal text-white">Shouri Chakraborty</span>
        </h1>

        <p className="text-lg md:text-xl text-primary/80 leading-relaxed font-light mb-12 max-w-3xl">
          Always open to discussing new projects, creative ideas, internship opportunities, open source collaboration, or freelance contracts. Feel free to send a message!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-12">
          {/* Contact Details Column */}
          <div className="flex flex-col gap-8">
            <div className="bg-white/3 border border-white/10 rounded-2xl p-6 flex flex-col gap-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <MessageSquare className="text-primary" size={20} /> Communication Channels
              </h2>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-xl">
                  <Mail size={18} />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-white/50 font-mono">Direct Email</h3>
                  <a href="mailto:chakrabortyshouri@gmail.com" className="text-base text-white font-medium hover:text-primary transition-colors">
                    chakrabortyshouri@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-xl">
                  <MapPin size={18} />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-white/50 font-mono">Location</h3>
                  <p className="text-base text-white font-medium">Kolkata, West Bengal, India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-xl">
                  <Clock size={18} />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-white/50 font-mono">Response Time</h3>
                  <p className="text-sm text-gray-300">Typically responds within 24 hours (IST / UTC+5:30).</p>
                </div>
              </div>
            </div>

            <div className="bg-white/3 border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <Globe className="text-primary" size={20} /> Social & Profiles
              </h2>
              <ul className="flex flex-col gap-3 text-sm text-gray-300 font-mono">
                <li>
                  GitHub: <a href="https://github.com/shouri123" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">github.com/shouri123</a>
                </li>
                <li>
                  LinkedIn: <a href="https://www.linkedin.com/in/shouri-chakraborty-224b5330b/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">linkedin.com/in/shouri-chakraborty</a>
                </li>
                <li>
                  Instagram: <a href="https://instagram.com/shourichakraborty" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">instagram.com/shourichakraborty</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Guidelines & Direct Form Anchor */}
          <div className="bg-white/2 border border-white/10 rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Send a Transmission</h2>
              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                Whether you are a recruiter evaluating candidate profiles, an open-source contributor, or an organization looking to build custom AI agents, submit your inquiry below.
              </p>
              <div className="bg-black/50 border border-white/10 rounded-xl p-4 text-xs text-primary/80 font-mono leading-relaxed mb-6">
                All messages are recorded directly into the Shouri Command Center CRM for prompt response.
              </div>
            </div>

            <a href="/#connect" className="w-full bg-primary text-black font-semibold text-center rounded-xl py-3.5 hover:bg-white transition-colors duration-300">
              Open Interactive Message Terminal
            </a>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
