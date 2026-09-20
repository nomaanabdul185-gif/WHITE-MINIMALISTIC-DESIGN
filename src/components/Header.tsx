import React from 'react';
import { Sparkles, Heart, FileText, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onOpenRequest: (designTitle?: string) => void;
  onOpenEnquiries: () => void;
  savedCount: number;
  enquiriesCount: number;
  activeTab: 'all' | 'saved';
  setActiveTab: (tab: 'all' | 'saved') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenRequest,
  onOpenEnquiries,
  savedCount,
  enquiriesCount,
  activeTab,
  setActiveTab,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="h-[74px] bg-white/95 backdrop-blur-md border-b border-stone-200 sticky top-0 z-40 px-4 sm:px-8 transition-all">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          id="brand-logo"
          className="flex items-center gap-2 group text-stone-900 tracking-[0.2em] font-serif text-xl sm:text-2xl select-none"
        >
          <span className="w-8 h-8 rounded-lg bg-[#202838] text-white flex items-center justify-center font-serif text-lg font-bold shadow-sm transition-transform group-hover:scale-105">
            I
          </span>
          <span className="font-semibold tracking-[3px]">INTERIORS</span>
        </a>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-stone-600">
          <button
            id="nav-selection"
            onClick={() => scrollTo('sel')}
            className="px-4 py-2 rounded-lg hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            Brief Selection
          </button>
          <button
            id="nav-designs"
            onClick={() => {
              setActiveTab('all');
              scrollTo('gallery');
            }}
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'all'
                ? 'text-stone-900 bg-stone-100 font-semibold'
                : 'hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            Designs Gallery
          </button>
          <button
            id="nav-saved"
            onClick={() => {
              setActiveTab(activeTab === 'saved' ? 'all' : 'saved');
              scrollTo('gallery');
            }}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'saved'
                ? 'text-[#e85c43] bg-orange-50 font-semibold'
                : 'hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Heart className={`w-4 h-4 ${savedCount > 0 ? 'fill-current text-[#e85c43]' : ''}`} />
            <span>Saved</span>
            {savedCount > 0 && (
              <span className="ml-1 text-xs px-1.5 py-0.2 rounded-full bg-[#e85c43] text-white font-medium">
                {savedCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {enquiriesCount > 0 && (
            <button
              id="header-enquiries-btn"
              onClick={onOpenEnquiries}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
              title="View your submitted design requests"
            >
              <FileText className="w-3.5 h-3.5 text-stone-500" />
              <span>Enquiries ({enquiriesCount})</span>
            </button>
          )}

          <button
            id="header-request-design-btn"
            onClick={() => onOpenRequest()}
            className="inline-flex items-center gap-2 bg-[#202838] hover:bg-[#151c29] text-white text-xs sm:text-sm font-medium py-2.5 px-4 sm:px-6 rounded-full shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Request Design</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-60 hidden sm:inline" />
          </button>
        </div>
      </div>
    </header>
  );
};
