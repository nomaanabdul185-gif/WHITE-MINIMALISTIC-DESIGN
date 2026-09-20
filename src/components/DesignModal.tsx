import React from 'react';
import { X, Heart, MapPin, Sparkles, Check, Share2, Calendar, Layers } from 'lucide-react';
import { DesignItem, BriefSelection } from '../types';

interface DesignModalProps {
  design: DesignItem | null;
  brief: BriefSelection;
  onClose: () => void;
  onRequestDesign: (designTitle: string) => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const DesignModal: React.FC<DesignModalProps> = ({
  design,
  brief,
  onClose,
  onRequestDesign,
  isSaved,
  onToggleSave,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!design) return null;

  const formattedPrice = '₹' + design.price.toLocaleString('en-IN');

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="view"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col md:grid md:grid-cols-2 relative border border-stone-200">
        {/* Close Button Top Right */}
        <button
          id="close-modal-btn"
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-stone-200 hover:bg-stone-100 flex items-center justify-center text-stone-700 transition-colors shadow-sm cursor-pointer"
          title="Close details"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Image Section */}
        <div className="relative h-64 md:h-full min-h-[320px] md:min-h-[540px] bg-stone-100">
          <img
            id="vimg"
            src={design.image}
            alt={design.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent md:hidden" />

          {/* Left image floating badges */}
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 z-10">
            <span className="bg-white/95 backdrop-blur-md text-stone-900 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
              {design.style}
            </span>
            <span className="bg-stone-900/90 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-400" />
              {design.location}
            </span>
          </div>

          {/* Save icon in photo */}
          <button
            type="button"
            onClick={() => onToggleSave(design.id)}
            className="absolute top-4 left-4 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md hover:bg-white flex items-center justify-center text-stone-700 transition-colors shadow-sm cursor-pointer"
            title={isSaved ? 'Remove from saved' : 'Save to favorites'}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#e85c43] text-[#e85c43]' : ''}`} />
          </button>
        </div>

        {/* Right Details Section */}
        <div className="p-6 sm:p-8 overflow-y-auto flex flex-col justify-between max-h-[60vh] md:max-h-[92vh]">
          <div>
            {/* Header info */}
            <div className="flex items-center justify-between gap-2 mb-2 pr-8">
              <span id="vcat" className="text-xs font-bold text-[#e85c43] tracking-[0.15em] uppercase">
                {design.category}
              </span>
              <button
                type="button"
                onClick={handleShare}
                className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 cursor-pointer transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Link Copied' : 'Share'}</span>
              </button>
            </div>

            <h2 id="vtitle" className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#202838] tracking-tight mb-2">
              {design.title}
            </h2>

            <div className="flex items-baseline gap-3 mb-6">
              <h3 id="vprice" className="text-xl sm:text-2xl font-bold text-stone-900">
                {formattedPrice}
              </h3>
              <span className="text-xs text-stone-400 font-medium">Est. turnkey budget</span>
            </div>

            {/* Specifications Definition Table */}
            <div className="border-t border-stone-200 text-xs sm:text-sm divide-y divide-stone-100 mb-6">
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-stone-500">Property</span>
                <span id="vproperty" className="font-semibold text-stone-900 flex items-center gap-1.5">
                  {design.property}
                  {design.property === brief.property && (
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded font-medium">Matches Brief</span>
                  )}
                </span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-stone-500">Project</span>
                <span className="font-semibold text-stone-900 flex items-center gap-1.5">
                  {design.project}
                  {design.project === brief.project && (
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded font-medium">Matches Brief</span>
                  )}
                </span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-stone-500">Home Type</span>
                <span id="vhome" className="font-semibold text-stone-900 flex items-center gap-1.5">
                  {design.homeType}
                  {design.homeType === brief.homeType && (
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded font-medium">Matches Brief</span>
                  )}
                </span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-stone-500">Budget Tier</span>
                <span id="vbudget" className="font-semibold text-stone-900 flex items-center gap-1.5">
                  {design.budget}
                  {design.budget === brief.budget && (
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded font-medium">Matches Brief</span>
                  )}
                </span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-stone-500">Design Choice</span>
                <span id="vdesign" className="font-semibold text-stone-900 flex items-center gap-1.5">
                  {design.designChoice}
                  {design.designChoice === brief.designChoice && (
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded font-medium">Matches Brief</span>
                  )}
                </span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-stone-500">Style</span>
                <span id="vstyle" className="font-semibold text-stone-900 flex items-center gap-1.5">
                  {design.style}
                  {design.style === brief.style && (
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded font-medium">Matches Brief</span>
                  )}
                </span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-stone-500">Location</span>
                <span id="vlocation" className="font-semibold text-stone-900">{design.location}</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-stone-500">Area</span>
                <span id="varea" className="font-semibold text-stone-900">{design.area}</span>
              </div>
              {design.timeline && (
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-stone-500 flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-stone-400" /> Timeline</span>
                  <span className="font-semibold text-stone-900">{design.timeline}</span>
                </div>
              )}
              {design.dimensions && (
                <div className="py-2.5 flex justify-between items-center">
                  <span className="text-stone-500 flex items-center gap-1"><Layers className="w-3.5 h-3.5 text-stone-400" /> Space Scope</span>
                  <span className="font-semibold text-stone-900">{design.dimensions}</span>
                </div>
              )}
            </div>

            {/* Architectural Highlights */}
            {design.highlights && design.highlights.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-semibold text-stone-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#e85c43]" />
                  <span>Key Specifications & Materials</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-stone-600">
                  {design.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-1.5 shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Description */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5">
                Design Philosophy
              </h4>
              <p id="vdesc" className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                {design.description}
              </p>
            </div>
          </div>

          {/* CTA Action */}
          <div className="pt-4 border-t border-stone-100 flex flex-col gap-2">
            <button
              id="request-this-design-btn"
              type="button"
              onClick={() => {
                onClose();
                onRequestDesign(design.title);
              }}
              className="w-full py-3.5 px-6 rounded-full bg-[#202838] hover:bg-[#161c27] text-white text-sm font-semibold tracking-wide shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Request This Design</span>
            </button>
            <p className="text-center text-[11px] text-stone-400">
              Free consultation & customization with our senior architect team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
