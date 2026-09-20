import React, { useState, useEffect, useMemo } from 'react';
import { DESIGNS_DATA, INITIAL_BRIEF, calculateMatchScore } from './data/designs';
import { DesignItem, BriefSelection, Enquiry } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BriefBuilder } from './components/BriefBuilder';
import { DesignCard } from './components/DesignCard';
import { DesignModal } from './components/DesignModal';
import { RequestModal } from './components/RequestModal';
import { EnquiriesDrawer } from './components/EnquiriesDrawer';
import { Footer } from './components/Footer';
import { Search, SlidersHorizontal, Sparkles, Heart, Filter, X } from 'lucide-react';

export default function App() {
  const [brief, setBrief] = useState<BriefSelection>(INITIAL_BRIEF);
  const [selectedDesign, setSelectedDesign] = useState<DesignItem | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestDesignTitle, setRequestDesignTitle] = useState<string>('');
  const [isEnquiriesOpen, setIsEnquiriesOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'saved'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [matchFilter, setMatchFilter] = useState<'all' | 'high'>('all');

  // Persistence: Saved Favorites
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('interiors_saved');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistence: Enquiries
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    try {
      const stored = localStorage.getItem('enquiries');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Sync saved to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('interiors_saved', JSON.stringify(savedIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedIds]);

  // Sync enquiries to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('enquiries', JSON.stringify(enquiries));
    } catch (e) {
      console.error(e);
    }
  }, [enquiries]);

  // Handle brief attribute modification
  const handleBriefChange = (key: keyof BriefSelection, value: any) => {
    setBrief((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetBrief = () => {
    setBrief(INITIAL_BRIEF);
  };

  const handleToggleSave = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenRequest = (designTitle?: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setRequestDesignTitle(designTitle || '');
    setIsRequestModalOpen(true);
  };

  const handleClearEnquiries = () => {
    if (window.confirm('Are you sure you want to clear your inquiry history?')) {
      setEnquiries([]);
      localStorage.removeItem('enquiries');
    }
  };

  // Distinct room/area categories for quick navigation
  const categories = useMemo(() => {
    const set = new Set<string>();
    DESIGNS_DATA.forEach((d) => set.add(d.area));
    return ['All', ...Array.from(set)];
  }, []);

  // Compute matched rankings for all designs based on current brief
  const rankedDesigns = useMemo(() => {
    const withScores = DESIGNS_DATA.map((design) => {
      const match = calculateMatchScore(design, brief);
      return {
        design,
        matchPercentage: match.percentage,
        matchedCount: match.score,
        matchedFields: match.matchedFields,
      };
    });

    // Sort descending by match score, exactly like original code: b[1] - a[1]
    return withScores.sort((a, b) => b.matchedCount - a.matchedCount);
  }, [brief]);

  // Filtered designs based on search, active tab, category, and match filter
  const displayedDesigns = useMemo(() => {
    return rankedDesigns.filter(({ design, matchedCount }) => {
      // Saved tab filter
      if (activeTab === 'saved' && !savedIds.includes(design.id)) {
        return false;
      }

      // Match filter (e.g. high match only >= 4)
      if (matchFilter === 'high' && matchedCount < 4) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && design.area !== selectedCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = design.title.toLowerCase().includes(query);
        const matchesLocation = design.location.toLowerCase().includes(query);
        const matchesStyle = design.style.toLowerCase().includes(query);
        const matchesCategory = design.category.toLowerCase().includes(query);
        const matchesArea = design.area.toLowerCase().includes(query);
        return (
          matchesTitle ||
          matchesLocation ||
          matchesStyle ||
          matchesCategory ||
          matchesArea
        );
      }

      return true;
    });
  }, [rankedDesigns, activeTab, savedIds, matchFilter, selectedCategory, searchQuery]);

  // Count of perfect or high matches
  const topMatchesCount = useMemo(() => {
    return rankedDesigns.filter((r) => r.matchedCount >= 5).length;
  }, [rankedDesigns]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f6f4] text-[#202838]">
      {/* Header Bar */}
      <Header
        onOpenRequest={(title) => handleOpenRequest(title)}
        onOpenEnquiries={() => setIsEnquiriesOpen(true)}
        savedCount={savedIds.length}
        enquiriesCount={enquiries.length}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="flex-1">
        {/* Editorial Hero Banner */}
        <Hero
          onScrollToBrief={() => {
            document.getElementById('sel')?.scrollIntoView({ behavior: 'smooth' });
          }}
          designsCount={DESIGNS_DATA.length}
        />

        {/* Interactive Brief Builder */}
        <BriefBuilder
          brief={brief}
          onChange={handleBriefChange}
          onReset={handleResetBrief}
          matchCount={topMatchesCount}
          totalCount={DESIGNS_DATA.length}
        />

        {/* Interior Designs Gallery Section */}
        <section id="gallery" className="max-w-[1250px] mx-auto px-4 sm:px-6 pt-4 pb-24">
          {/* Top Bar with Title and Controls */}
          <div className="bg-white rounded-2xl p-5 sm:p-7 border border-stone-200/80 shadow-xs mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-stone-100">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#202838] tracking-tight">
                    {activeTab === 'saved' ? 'Saved Collections' : 'Curated Interior Designs'}
                  </h2>
                  <span
                    id="count"
                    className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700"
                  >
                    {displayedDesigns.length} designs
                  </span>
                </div>
                <p className="text-stone-500 text-xs sm:text-sm mt-1">
                  {activeTab === 'saved'
                    ? 'Designs you have bookmarked for your project.'
                    : 'Ranked organically by compatibility with your active design brief.'}
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search styles, rooms, cities..."
                  className="w-full pl-10 pr-8 py-2 text-xs sm:text-sm rounded-xl border border-stone-300 focus:border-stone-800 bg-stone-50/50 focus:bg-white focus:outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-700 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Sub-Filters: Categories & Match Ranking Filter */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-3">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                <span className="text-xs font-medium text-stone-400 mr-1 flex items-center gap-1">
                  <Filter className="w-3 h-3" />
                  <span>Room:</span>
                </span>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#202838] text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Match Filter Toggle */}
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setMatchFilter('all')}
                  className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${
                    matchFilter === 'all'
                      ? 'bg-stone-200 text-stone-900 font-semibold'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  All Ranked
                </button>
                <button
                  type="button"
                  onClick={() => setMatchFilter(matchFilter === 'high' ? 'all' : 'high')}
                  className={`px-3 py-1 rounded-full cursor-pointer transition-colors flex items-center gap-1 ${
                    matchFilter === 'high'
                      ? 'bg-emerald-700 text-white font-semibold'
                      : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>High Match Only</span>
                </button>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          {displayedDesigns.length > 0 ? (
            <div id="grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {displayedDesigns.map(({ design, matchPercentage, matchedCount }) => (
                <DesignCard
                  key={design.id}
                  design={design}
                  matchPercentage={matchPercentage}
                  matchedCount={matchedCount}
                  isSaved={savedIds.includes(design.id)}
                  onToggleSave={(id, e) => handleToggleSave(id, e)}
                  onSelect={(d) => setSelectedDesign(d)}
                  onRequestDesign={(title, e) => handleOpenRequest(title, e)}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80 max-w-lg mx-auto shadow-xs">
              <div className="w-14 h-14 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-stone-800 font-semibold mb-1">
                {activeTab === 'saved' ? 'No Saved Designs' : 'No Matching Designs Found'}
              </h3>
              <p className="text-stone-500 text-xs sm:text-sm max-w-xs mx-auto mb-6">
                {activeTab === 'saved'
                  ? 'Explore the curated gallery and tap the heart icon to save your favorite concepts.'
                  : 'Try loosening your search query or switching to "All Ranked" to discover more options.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('all');
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setMatchFilter('all');
                }}
                className="px-5 py-2.5 rounded-full bg-[#202838] text-white text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Detail Modal */}
      <DesignModal
        design={selectedDesign}
        brief={brief}
        onClose={() => setSelectedDesign(null)}
        onRequestDesign={(title) => handleOpenRequest(title)}
        isSaved={selectedDesign ? savedIds.includes(selectedDesign.id) : false}
        onToggleSave={(id) => handleToggleSave(id)}
      />

      {/* Request Form Modal */}
      <RequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        selectedDesignTitle={requestDesignTitle}
        defaultProperty={brief.property}
        onSuccessSubmit={(newEnquiry) => {
          setEnquiries((prev) => [newEnquiry, ...prev]);
        }}
      />

      {/* Enquiries History Drawer */}
      <EnquiriesDrawer
        isOpen={isEnquiriesOpen}
        onClose={() => setIsEnquiriesOpen(false)}
        enquiries={enquiries}
        onClearEnquiries={handleClearEnquiries}
      />
    </div>
  );
}
