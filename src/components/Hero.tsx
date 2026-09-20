import React from 'react';
import { Compass, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface HeroProps {
  onScrollToBrief: () => void;
  designsCount: number;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToBrief, designsCount }) => {
  return (
    <section className="bg-white border-b border-stone-200/80 pt-16 pb-14 px-4 sm:px-6 relative overflow-hidden">
      {/* Subtle decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] bg-gradient-to-b from-stone-100/60 to-transparent pointer-events-none rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-100 border border-stone-200/80 text-[#e85c43] text-xs font-semibold tracking-[0.2em] uppercase mb-5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Customer Design Selection</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#202838] tracking-tight leading-[1.15] mb-5">
          Find Your Perfect Interior
        </h1>

        <p className="text-stone-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
          Choose your property, home type, budget and style to discover interiors curated for your exact space and lifestyle requirements.
        </p>

        {/* Quick Highlights / Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-2 text-xs sm:text-sm text-stone-500 border-t border-stone-100 max-w-2xl mx-auto">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{designsCount} Curated Concepts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Transparent Pricing</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-emerald-600" />
            <span>Turnkey Execution</span>
          </div>
        </div>
      </div>
    </section>
  );
};
