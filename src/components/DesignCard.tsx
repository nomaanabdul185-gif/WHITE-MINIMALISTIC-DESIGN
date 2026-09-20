import React from 'react';
import { Heart, MapPin, Eye } from 'lucide-react';
import { DesignItem } from '../types';

interface DesignCardProps {
  design: DesignItem;
  matchPercentage: number;
  matchedCount: number;
  isSaved: boolean;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onSelect: (design: DesignItem) => void;
  onRequestDesign: (designTitle: string, e: React.MouseEvent) => void;
}

export const DesignCard: React.FC<DesignCardProps> = ({
  design,
  matchPercentage,
  matchedCount,
  isSaved,
  onToggleSave,
  onSelect,
  onRequestDesign,
}) => {
  const formattedPrice = '₹' + design.price.toLocaleString('en-IN');

  const getMatchBadgeStyle = (pct: number) => {
    if (pct === 100) return 'bg-emerald-700 text-white font-semibold';
    if (pct >= 80) return 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold';
    if (pct >= 50) return 'bg-stone-100 text-stone-800 border border-stone-200';
    return 'bg-stone-50 text-stone-600 border border-stone-200';
  };

  return (
    <article
      id={`design-card-${design.id}`}
      onClick={() => onSelect(design)}
      className="group bg-white rounded-2xl overflow-hidden border border-stone-200/80 hover:border-stone-400/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
    >
      {/* Picture Container */}
      <div className="h-64 sm:h-68 relative overflow-hidden bg-stone-100">
        <img
          src={design.image}
          alt={design.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="bg-white/95 backdrop-blur-md text-[#202838] px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide shadow-xs">
            {design.style}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] tracking-wide shadow-xs ${getMatchBadgeStyle(matchPercentage)}`}>
            {matchPercentage}% Match ({matchedCount}/6)
          </span>
        </div>

        {/* Favorite Button */}
        <button
          id={`save-btn-${design.id}`}
          type="button"
          onClick={(e) => onToggleSave(design.id, e)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md hover:bg-white flex items-center justify-center text-stone-700 hover:text-[#e85c43] transition-colors shadow-xs z-10 cursor-pointer"
          title={isSaved ? 'Remove from saved' : 'Save to favorites'}
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              isSaved ? 'fill-[#e85c43] text-[#e85c43]' : ''
            }`}
          />
        </button>

        {/* Hover quick preview banner */}
        <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 text-stone-900 text-xs font-semibold shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" />
            <span>View Full Details</span>
          </span>
        </div>

        {/* Space Category badge */}
        <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-sm text-stone-100 text-[10px] font-medium px-2 py-0.5 rounded-md">
          {design.category}
        </div>
      </div>

      {/* Info Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header & Price */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-serif text-xl sm:text-2xl text-[#202838] group-hover:text-stone-700 transition-colors leading-snug">
              {design.title}
            </h3>
            <span className="font-semibold text-stone-900 text-base sm:text-lg whitespace-nowrap">
              {formattedPrice}
            </span>
          </div>

          {/* Description */}
          <p className="text-stone-500 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
            {design.description}
          </p>
        </div>

        {/* Bottom Chips & Action */}
        <div className="pt-3 border-t border-stone-100">
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            <span className="text-[11px] bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded-full font-medium">
              {design.homeType}
            </span>
            <span className="text-[11px] bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded-full font-medium">
              {design.budget}
            </span>
            <span className="text-[11px] bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded-full font-medium inline-flex items-center gap-1">
              <MapPin className="w-3 h-3 text-stone-400" />
              {design.location}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-stone-400 font-medium">
              {design.property} • {design.project}
            </span>
            <button
              type="button"
              onClick={(e) => onRequestDesign(design.title, e)}
              className="text-stone-800 hover:text-[#e85c43] font-semibold transition-colors cursor-pointer"
            >
              Enquire &rarr;
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
