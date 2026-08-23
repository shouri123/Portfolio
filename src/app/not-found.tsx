import Link from "next/link";
import { ArrowLeft, Compass, FileText, Home, HelpCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Shouri Chakraborty",
  description: "The requested path could not be found on devshouri.in. Use the provided links to navigate back to the site map, home, or trust pages.",
};

export default function NotFoundPage() {
  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center selection:bg-primary selection:text-black">
      <div className="max-w-xl w-full bg-white/3 border border-white/10 rounded-3xl p-8 sm:p-12 flex flex-col items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
          <HelpCircle size={32} />
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#E1E0CC]">
          404 <span className="font-serif italic font-normal text-white">— Page Not Found</span>
        </h1>

        <p className="text-sm text-gray-300 leading-relaxed font-light">
          The requested path does not exist on <strong>devshouri.in</strong>. If you are an AI crawler or automated agent, please refer to the site map or agent instruction indexes below to recover.
        </p>

        <div className="w-full border-t border-white/10 pt-6 my-2 text-left">
          <h2 className="text-xs uppercase tracking-widest text-primary font-mono mb-4 flex items-center gap-2">
            <Compass size={14} /> Agent & Visitor Navigation Recovery Links
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <li>
              <Link href="/" className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 text-white hover:text-primary transition-all">
                <Home size={14} /> Homepage (/)
              </Link>
            </li>
            <li>
              <Link href="/sitemap.xml" className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 text-white hover:text-primary transition-all">
                <Compass size={14} /> Sitemap (/sitemap.xml)
              </Link>
            </li>
            <li>
              <Link href="/llms.txt" className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 text-white hover:text-primary transition-all">
                <FileText size={14} /> Agent LLMs.txt
              </Link>
            </li>
            <li>
              <Link href="/about" className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 text-white hover:text-primary transition-all">
                <FileText size={14} /> About Shouri
              </Link>
            </li>
            <li>
              <Link href="/contact" className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 text-white hover:text-primary transition-all">
                <FileText size={14} /> Contact Page
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 text-white hover:text-primary transition-all">
                <FileText size={14} /> Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <Link href="/" className="mt-4 inline-flex items-center gap-2 bg-primary text-black font-semibold text-xs rounded-full px-6 py-3 hover:bg-white transition-colors">
          <ArrowLeft size={14} /> Return to Homepage
        </Link>
      </div>
    </div>
  );
}
