import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#20242e] text-white py-14 px-4 sm:px-8 border-t border-stone-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div>
          <div className="flex items-center justify-center md:justify-start gap-2.5 mb-2">
            <span className="w-7 h-7 rounded-lg bg-stone-100 text-[#20242e] flex items-center justify-center font-serif text-base font-bold">
              I
            </span>
            <h2 className="font-serif text-2xl font-semibold tracking-[3px] text-white">
              INTERIORS
            </h2>
          </div>
          <p className="text-stone-400 text-xs sm:text-sm max-w-sm">
            Premium interior design selection platform. Tailored architecture and interior concepts engineered for your home.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-xs text-stone-300 font-medium">
          <a href="#sel" className="hover:text-white transition-colors">Selection Brief</a>
          <a href="#gallery" className="hover:text-white transition-colors">Curated Designs</a>
          <span className="text-stone-600">•</span>
          <span className="text-stone-400">Hyderabad • Bengaluru • Mumbai • Delhi</span>
        </div>

        <div className="text-stone-500 text-xs text-center md:text-right">
          <p>&copy; {new Date().getFullYear()} INTERIORS Studio.</p>
          <p className="mt-0.5">All architectural rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
