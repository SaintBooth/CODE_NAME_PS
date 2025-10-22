import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

const CommunityIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-7.5-2.962A3.75 3.75 0 0 1 15 12a3.75 3.75 0 0 1-2.25 3.462m-2.25 0a3.75 3.75 0 0 0-3.75 3.75M15 12a3.75 3.75 0 0 0-3.75-3.75M9 12a3.75 3.75 0 0 1 3.75-3.75m0 0a3.75 3.75 0 0 0-3.75 3.75M3 12a3.75 3.75 0 0 1 3.75-3.75m0 0a3.75 3.75 0 0 0 3.75 3.75" />
    </svg>
);


const CommunityPage: React.FC = () => {
  const { t } = useTranslations();
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="text-center py-16 soft-ui-container">
        <div className="inline-block p-4 rounded-full soft-ui-input">
            <CommunityIcon className="h-12 w-12 text-emerald-500 dark:text-emerald-400" />
        </div>
        <h1 className="mt-6 text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
          {t('join_conversation')}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-500 dark:text-slate-400">
          {t('community_desc')}
        </p>
         <div className="mt-8">
            <button 
                disabled
                className="bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-white px-8 py-3 rounded-lg text-lg font-medium cursor-not-allowed opacity-50"
            >
                {t('community_hub_soon')}
            </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;