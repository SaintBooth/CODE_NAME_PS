import React, { useState, useMemo, useEffect } from 'react';
import { Prompt, Category } from '../types';
import { MAX_PRICE, PROMPTS } from '../constants';
import { fetchPrompts } from '../api/promptApi';
import PromptCard from './PromptCard';
import FilterSidebar from './FilterSidebar';
import { useTranslations } from '../hooks/useTranslations';
import { FunnelIcon, XMarkIcon, SparklesIcon, ChartBarIcon, CpuChipIcon, TagIcon, MagnifyingGlassIcon } from './icons';

interface HomePageProps {
  onPromptSelect: (prompt: Prompt) => void;
}

type SortOption = 'rating' | 'price_asc' | 'price_desc' | 'newest';

const HomePage: React.FC<HomePageProps> = ({ onPromptSelect }) => {
  const { t } = useTranslations();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [priceValue, setPriceValue] = useState<number>(MAX_PRICE);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState<boolean>(false);

  // Sorting state
  const [sortBy, setSortBy] = useState<SortOption>('rating');
  
  const featuredPrompt = useMemo(() => PROMPTS.find(p => p.id === 7), []);

  useEffect(() => {
    const loadPrompts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedPrompts = await fetchPrompts();
        setPrompts(fetchedPrompts);
      } catch (err) {
        setError(t("error_load_prompts"));
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadPrompts();
  }, [t]);
  
  const stats = useMemo(() => {
    const totalPrompts = prompts.length;

    // FIX: Explicitly specify the generic type for `reduce`'s accumulator.
    // This ensures TypeScript correctly infers `modelCounts` as `Record<string, number>`,
    // resolving the arithmetic operation error on the subsequent `sort` call.
    const modelCounts = prompts.reduce<Record<string, number>>((acc, p) => {
      acc[p.model] = (acc[p.model] || 0) + 1;
      return acc;
    }, {});
    const topModels = Object.entries(modelCounts).sort((a, b) => b[1] - a[1]).slice(0, 2).map(m => m[0]);

    // FIX: Explicitly specify the generic type for `reduce`'s accumulator.
    // This ensures TypeScript correctly infers `tagCounts` as `Record<string, number>`,
    // resolving the arithmetic operation error on the subsequent `sort` call.
    const tagCounts = prompts.flatMap(p => p.tags).reduce<Record<string, number>>((acc, t) => {
        const tag = t.charAt(0).toUpperCase() + t.slice(1);
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
    }, {});
    const trendingTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(t => t[0]);

    return { totalPrompts, topModels, trendingTags };
  }, [prompts]);


  const handleModelChange = (model: string) => {
    setSelectedModels(prev => 
      prev.includes(model) 
        ? prev.filter(m => m !== model) 
        : [...prev, model]
    );
  };

  const resetFilters = () => {
    setActiveCategory('All');
    setSelectedModels([]);
    setPriceValue(MAX_PRICE);
    setSearchTerm('');
    setSortBy('rating');
  };

  const filteredAndSortedPrompts = useMemo(() => {
    let filtered = prompts.filter(prompt => {
      const matchesCategory = activeCategory === 'All' || prompt.category === activeCategory;
      const matchesSearch = 
        prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesModel = selectedModels.length === 0 || selectedModels.includes(prompt.model);
      const matchesPrice = prompt.price <= priceValue;

      return matchesCategory && matchesSearch && matchesModel && matchesPrice;
    });

    switch(sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        break;
    }

    return filtered;
  }, [searchTerm, activeCategory, prompts, selectedModels, priceValue, sortBy]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center py-16 col-span-1 lg:col-span-3">
          <p className="text-slate-500 dark:text-slate-400">{t('loading_prompts')}</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center my-8 p-8 bg-red-900/30 border border-red-500/50 rounded-lg max-w-2xl mx-auto col-span-1 lg:col-span-3">
            <p className="text-xl font-semibold text-red-400">{t('error_oops')}</p>
            <p className="text-slate-500 dark:text-slate-400 mt-2">{error}</p>
        </div>
      );
    }
    
    if (filteredAndSortedPrompts.length === 0) {
      return (
        <div className="text-center py-16 col-span-1 lg:col-span-3">
          <p className="text-slate-500 dark:text-slate-400">{t('no_prompts_found')}</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredAndSortedPrompts.map((prompt, index) => (
          <PromptCard 
            key={prompt.id} 
            prompt={prompt} 
            onSelect={onPromptSelect} 
            style={{ animationDelay: `${index * 50}ms` }}
          />
        ))}
      </div>
    );
  };
  
  const filterSidebarProps = {
      activeCategory,
      onCategoryChange: setActiveCategory,
      selectedModels,
      onModelChange: handleModelChange,
      priceValue,
      onPriceChange: setPriceValue,
      onResetFilters: resetFilters
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Bento Grid Hero */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div className="md:col-span-2 lg:col-span-2 p-8 soft-ui-container flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {t('discover_perfect_prompt')}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-500 dark:text-slate-400">
              {t('unlock_potential')}
            </p>
        </div>
        {featuredPrompt && (
            <button
                onClick={() => onPromptSelect(featuredPrompt)}
                className="lg:col-span-2 text-left group soft-ui-button"
            >
                <div className="p-6 h-full flex flex-col">
                  <p className="text-sm font-semibold text-sky-500 dark:text-sky-400 mb-2 flex items-center gap-2"><SparklesIcon className="w-5 h-5"/>{t('prompt_of_the_day')}</p>
                  <h3 className="font-bold text-slate-800 dark:text-white">{featuredPrompt.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex-grow">{featuredPrompt.description}</p>
                  <div className="text-right mt-2 text-xs font-bold text-sky-500 dark:text-sky-400 group-hover:translate-x-1 transition-transform">Learn More &rarr;</div>
                </div>
            </button>
        )}
        <div className="p-6 h-full soft-ui-container">
             <h3 className="font-semibold text-slate-600 dark:text-slate-300 mb-2 flex items-center gap-2"><ChartBarIcon className="w-5 h-5"/>{t('total_prompts')}</h3>
            <p className="text-5xl font-extrabold text-slate-900 dark:text-white">{stats.totalPrompts}</p>
        </div>
         <div className="p-6 h-full soft-ui-container">
              <h3 className="font-semibold text-slate-600 dark:text-slate-300 mb-2 flex items-center gap-2"><CpuChipIcon className="w-5 h-5"/>{t('top_models')}</h3>
              <div className="flex items-center gap-2 mt-4">
                {stats.topModels.map(model => (
                    <span key={model} className="text-sm font-semibold px-2.5 py-1 rounded-full bg-slate-500/10 text-slate-600 dark:bg-slate-500/20 dark:text-slate-300">{model}</span>
                ))}
              </div>
        </div>
        <div className="md:col-span-2 lg:col-span-2 p-6 h-full soft-ui-container">
             <h3 className="font-semibold text-slate-600 dark:text-slate-300 mb-2 flex items-center gap-2"><TagIcon className="w-5 h-5"/>{t('trending_tags')}</h3>
              <div className="flex flex-wrap gap-2 mt-4">
                {stats.trendingTags.map(tag => (
                    <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-300">{tag}</span>
                ))}
              </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filters Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <FilterSidebar {...filterSidebarProps} />
        </div>
        
        {/* Main Content: Search, Sort, and Grid */}
        <div className="lg:col-span-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div className="relative flex-grow">
              <input 
                type="text"
                placeholder={t('search_prompts')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 soft-ui-input text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-slate-400 dark:text-slate-500" />
              </div>
            </div>
            <div className="flex-shrink-0 flex items-center space-x-4">
              <button onClick={() => setIsFilterSidebarOpen(true)} className="lg:hidden flex items-center space-x-2 soft-ui-button p-3 text-sm font-medium">
                <FunnelIcon className="h-5 w-5"/>
                <span>{t('filters')}</span>
              </button>
              <select 
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label={t('sort_by')}
                className="soft-ui-button p-3 text-sm text-slate-900 dark:text-white focus:outline-none appearance-none w-full md:w-auto"
              >
                <option value="rating">{t('sort_by_rating')}</option>
                <option value="newest">{t('sort_by_newest')}</option>
                <option value="price_asc">{t('sort_by_price_asc')}</option>
                <option value="price_desc">{t('sort_by_price_desc')}</option>
              </select>
            </div>
          </div>
          
          {renderContent()}
        </div>
      </div>
      
      {/* Mobile Filter Sidebar */}
      {isFilterSidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/40 z-40" onClick={() => setIsFilterSidebarOpen(false)} />
      )}
      <div className={`lg:hidden fixed top-0 right-0 h-full w-80 bg-e0e5ec dark:bg-2c3038 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isFilterSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b border-slate-300/50 dark:border-slate-700/50">
            <button onClick={() => setIsFilterSidebarOpen(false)} className="absolute top-4 right-4 p-2 text-slate-500 dark:text-slate-400">
                <XMarkIcon className="h-6 w-6"/>
            </button>
        </div>
        <FilterSidebar {...filterSidebarProps} />
      </div>

    </div>
  );
};

export default HomePage;