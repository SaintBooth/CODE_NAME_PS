import React from 'react';
import { Category } from '../types';
import { CATEGORIES, AI_MODELS, MAX_PRICE } from '../constants';
import { useTranslations } from '../hooks/useTranslations';

interface FilterSidebarProps {
  activeCategory: Category | 'All';
  onCategoryChange: (category: Category | 'All') => void;
  selectedModels: string[];
  onModelChange: (model: string) => void;
  priceValue: number;
  onPriceChange: (value: number) => void;
  onResetFilters: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  activeCategory,
  onCategoryChange,
  selectedModels,
  onModelChange,
  priceValue,
  onPriceChange,
  onResetFilters
}) => {
  const { t } = useTranslations();
  
  const activeBtnClasses = 'text-sky-500 dark:text-sky-400 font-semibold shadow-[inset_4px_4px_8px_#bec3c9,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#23262c,inset_-4px_-4px_8px_#353a44]';
  const inactiveBtnClasses = 'text-slate-600 dark:text-slate-400 soft-ui-button';

  return (
    <aside className="lg:sticky top-24 h-fit soft-ui-container p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('filters')}</h3>
        <button 
          onClick={onResetFilters}
          className="text-sm text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-300 transition-colors">
          {t('reset')}
        </button>
      </div>
      
      {/* Category Filter */}
      <div>
        <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-3">{t('category')}</h4>
        <ul className="space-y-2">
          <li>
            <button 
              onClick={() => onCategoryChange('All')}
              className={`w-full text-left text-sm p-3 rounded-lg transition-all duration-200 ${activeCategory === 'All' ? activeBtnClasses : inactiveBtnClasses}`}>
              {t('all_categories')}
            </button>
          </li>
          {CATEGORIES.map(category => (
            <li key={category}>
              <button 
                onClick={() => onCategoryChange(category)}
                className={`w-full text-left text-sm p-3 rounded-lg transition-all duration-200 ${activeCategory === category ? activeBtnClasses : inactiveBtnClasses}`}>
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Model Filter */}
      <div className="mt-6 border-t border-slate-300/50 dark:border-slate-700/50 pt-6">
        <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-3">{t('ai_model')}</h4>
        <div className="space-y-3">
          {AI_MODELS.map(model => (
            <label key={model} className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-slate-300/20 dark:hover:bg-slate-700/20">
              <input
                type="checkbox"
                checked={selectedModels.includes(model)}
                onChange={() => onModelChange(model)}
                className="h-4 w-4 rounded border-slate-400/50 text-sky-500 focus:ring-sky-500/50"
                style={{
                  boxShadow: 'inset 2px 2px 4px #bec3c9, inset -2px -2px 4px #ffffff',
                }}
              />
              <span className="text-sm text-slate-600 dark:text-slate-400">{model}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Price Filter */}
      <div className="mt-6 border-t border-slate-300/50 dark:border-slate-700/50 pt-6">
        <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-3">{t('max_price')}</h4>
        <div className="flex flex-col">
            <input
                type="range"
                min="0"
                max={MAX_PRICE}
                value={priceValue}
                onChange={(e) => onPriceChange(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer soft-ui-input"
            />
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
                <span>$0</span>
                <span className="text-sm font-semibold text-sky-500 dark:text-sky-400">${priceValue}</span>
                <span>${MAX_PRICE}</span>
            </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;