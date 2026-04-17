import GsapWordsPullUpMultiStyle from "@/components/animations/GsapWordsPullUpMultiStyle";
import GsapScrollRevealChars from "@/components/animations/GsapScrollRevealChars";

export default function AboutSection() {
  const headingSegments = [
    { text: "I am Shouri," },
    { text: "an aspiring developer.", className: "font-serif italic" },
    { text: "I love exploring new AI tools and building things that make computers feel smarter." }
  ];

  return (
    <section id="about" className="w-full bg-black py-20 md:py-32 px-4 md:px-6">
      <div className="max-w-6xl mx-auto bg-[#101010] rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 lg:p-24 flex flex-col items-center text-center border border-white/5">
        
        <p className="text-primary text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-8 md:mb-12">
          Engineering & AI
        </p>

        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl max-w-4xl mx-auto leading-[1.05] sm:leading-[1] mb-12 md:mb-20">
          <GsapWordsPullUpMultiStyle segments={headingSegments} />
        </div>

        <div className="w-full max-w-3xl mx-auto">
          <GsapScrollRevealChars 
            text="Curiosity. I enjoy breaking concepts down, trying bold ideas, and pushing boundaries with AI. Whether it’s a new tool, a coding agent, or a fresh model architecture — if it’s interesting, I’m jumping in."
            className="text-[#DEDBC8] text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-center justify-center font-medium"
          />
        </div>

      </div>
    </section>
  );
}
