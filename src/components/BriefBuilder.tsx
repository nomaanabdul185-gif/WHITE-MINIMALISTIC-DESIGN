import React from 'react';
import { RotateCcw, SlidersHorizontal, Check } from 'lucide-react';
import { BriefSelection, PropertyType, ProjectType, HomeType, BudgetType, DesignChoiceType, StyleType } from '../types';

interface BriefBuilderProps {
  brief: BriefSelection;
  onChange: (key: keyof BriefSelection, value: any) => void;
  onReset: () => void;
  matchCount: number;
  totalCount: number;
}

const PROPERTY_OPTIONS: PropertyType[] = ['Residential', 'Commercial', 'Farm Stays'];
const PROJECT_OPTIONS: ProjectType[] = ['Renovations', 'New Homes'];
const HOME_OPTIONS: HomeType[] = ['2 BHK', '3 BHK', 'Villa'];
const BUDGET_OPTIONS: BudgetType[] = ['Affordable', 'Premium', 'Luxury'];
const DESIGN_CHOICE_OPTIONS: DesignChoiceType[] = ['Regular Design', 'Trending', 'Designer Choice'];
const STYLE_OPTIONS: StyleType[] = ['Modern', 'Minimal', 'Traditional', 'Japandi'];

export const BriefBuilder: React.FC<BriefBuilderProps> = ({
  brief,
  onChange,
  onReset,
  matchCount,
  totalCount,
}) => {
  return (
    <section id="sel" className="max-w-[1250px] mx-auto px-4 sm:px-6 my-8">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-9 shadow-sm border border-stone-200/80 transition-all">
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <SlidersHorizontal className="w-5 h-5 text-[#e85c43]" />
              <h2 className="font-serif text-2xl sm:text-3xl text-[#202838] tracking-tight">
                Build Your Design Brief
              </h2>
            </div>
            <p className="text-stone-500 text-xs sm:text-sm">
              Tailor each attribute to align with your floorplan, budget band, and aesthetic taste.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-stone-100 px-3.5 py-1.5 rounded-full text-xs font-medium text-stone-700">
              <span className="font-bold text-[#202838]">{matchCount}</span> of {totalCount} matching
            </div>
            <button
              id="reset-selection-btn"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-[#202838] hover:bg-stone-100 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
              title="Reset to default selection"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Selection</span>
            </button>
          </div>
        </div>

        {/* Options Selection Form */}
        <div className="space-y-6 pt-5">
          {/* Property */}
          <div>
            <label className="block text-stone-500 text-[11px] font-semibold tracking-[0.1em] uppercase mb-2.5">
              Property Type
            </label>
            <div className="flex flex-wrap gap-2.5">
              {PROPERTY_OPTIONS.map((val) => {
                const isSelected = brief.property === val;
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => onChange('property', val)}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-[#202838] text-white border-[#202838] shadow-sm scale-[1.02]'
                        : 'bg-white text-stone-700 border-stone-300/90 hover:border-stone-400 hover:bg-stone-50'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    <span>{val}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Project */}
          <div>
            <label className="block text-stone-500 text-[11px] font-semibold tracking-[0.1em] uppercase mb-2.5">
              Project Type
            </label>
            <div className="flex flex-wrap gap-2.5">
              {PROJECT_OPTIONS.map((val) => {
                const isSelected = brief.project === val;
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => onChange('project', val)}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-[#202838] text-white border-[#202838] shadow-sm scale-[1.02]'
                        : 'bg-white text-stone-700 border-stone-300/90 hover:border-stone-400 hover:bg-stone-50'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    <span>{val}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Home Type */}
          <div>
            <label className="block text-stone-500 text-[11px] font-semibold tracking-[0.1em] uppercase mb-2.5">
              Home Type
            </label>
            <div className="flex flex-wrap gap-2.5">
              {HOME_OPTIONS.map((val) => {
                const isSelected = brief.homeType === val;
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => onChange('homeType', val)}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-[#202838] text-white border-[#202838] shadow-sm scale-[1.02]'
                        : 'bg-white text-stone-700 border-stone-300/90 hover:border-stone-400 hover:bg-stone-50'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    <span>{val}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-stone-500 text-[11px] font-semibold tracking-[0.1em] uppercase mb-2.5">
              Budget Tier
            </label>
            <div className="flex flex-wrap gap-2.5">
              {BUDGET_OPTIONS.map((val) => {
                const isSelected = brief.budget === val;
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => onChange('budget', val)}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-[#202838] text-white border-[#202838] shadow-sm scale-[1.02]'
                        : 'bg-white text-stone-700 border-stone-300/90 hover:border-stone-400 hover:bg-stone-50'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    <span>{val}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Design Choice */}
          <div>
            <label className="block text-stone-500 text-[11px] font-semibold tracking-[0.1em] uppercase mb-2.5">
              Design Choice
            </label>
            <div className="flex flex-wrap gap-2.5">
              {DESIGN_CHOICE_OPTIONS.map((val) => {
                const isSelected = brief.designChoice === val;
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => onChange('designChoice', val)}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-[#202838] text-white border-[#202838] shadow-sm scale-[1.02]'
                        : 'bg-white text-stone-700 border-stone-300/90 hover:border-stone-400 hover:bg-stone-50'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    <span>{val}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Style */}
          <div>
            <label className="block text-stone-500 text-[11px] font-semibold tracking-[0.1em] uppercase mb-2.5">
              Style
            </label>
            <div className="flex flex-wrap gap-2.5">
              {STYLE_OPTIONS.map((val) => {
                const isSelected = brief.style === val;
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => onChange('style', val)}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-[#202838] text-white border-[#202838] shadow-sm scale-[1.02]'
                        : 'bg-white text-stone-700 border-stone-300/90 hover:border-stone-400 hover:bg-stone-50'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    <span>{val}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Current Active Brief Pills */}
        <div className="mt-8 pt-5 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-semibold text-stone-700">Active Brief:</span>
            <span className="px-2.5 py-1 rounded-md bg-stone-100 font-medium text-stone-800">{brief.property}</span>
            <span>•</span>
            <span className="px-2.5 py-1 rounded-md bg-stone-100 font-medium text-stone-800">{brief.project}</span>
            <span>•</span>
            <span className="px-2.5 py-1 rounded-md bg-stone-100 font-medium text-stone-800">{brief.homeType}</span>
            <span>•</span>
            <span className="px-2.5 py-1 rounded-md bg-stone-100 font-medium text-stone-800">{brief.budget}</span>
            <span>•</span>
            <span className="px-2.5 py-1 rounded-md bg-stone-100 font-medium text-stone-800">{brief.designChoice}</span>
            <span>•</span>
            <span className="px-2.5 py-1 rounded-md bg-stone-100 font-medium text-stone-800">{brief.style}</span>
          </div>

          <a
            href="#gallery"
            className="text-stone-700 hover:text-stone-900 font-medium underline underline-offset-4"
          >
            View Ranked Results &darr;
          </a>
        </div>
      </div>
    </section>
  );
};
