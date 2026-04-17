"use client";

export default function FooterSection() {
  return (
    <footer id="connect" className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden bg-black text-[#DEDBC8] pt-20 pb-10 border-t border-white/5">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-40 z-0 mix-blend-screen pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
        src="/videos/footer_bg.mp4"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black z-10 pointer-events-none" />
      
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full max-w-4xl mt-10">
        <h2 className="text-6xl md:text-[8rem] font-bold tracking-tighter mb-6 leading-none">Let's <span className="font-serif italic font-normal text-white">Connect</span></h2>
        <p className="text-gray-400 max-w-lg mb-12 text-sm md:text-base">
          Always open to discussing new projects, creative ideas or opportunities to be part of your visions.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-20 text-xs md:text-sm uppercase tracking-widest font-medium">
          <a href="mailto:hello@example.com" className="hover:text-white border-b-2 border-transparent hover:border-[#DEDBC8] transition-all pb-1 duration-300">Email</a>
          <a href="https://github.com/shouri123" target="_blank" rel="noreferrer" className="hover:text-white border-b-2 border-transparent hover:border-[#DEDBC8] transition-all pb-1 duration-300">Github</a>
          <a href="#" target="_blank" rel="noreferrer" className="hover:text-white border-b-2 border-transparent hover:border-[#DEDBC8] transition-all pb-1 duration-300">LinkedIn</a>
          <a href="#" target="_blank" rel="noreferrer" className="hover:text-white border-b-2 border-transparent hover:border-[#DEDBC8] transition-all pb-1 duration-300">Twitter</a>
        </div>
        
        <div className="w-full border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] md:text-xs text-white/30 uppercase tracking-widest gap-4">
          <p>© {new Date().getFullYear()} Shouri. All rights reserved.</p>
          <p>Engineered for the future.</p>
        </div>
      </div>
    </footer>
  );
}
