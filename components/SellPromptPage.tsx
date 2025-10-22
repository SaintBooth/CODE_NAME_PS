import React from 'react';
import { SparklesIcon } from './icons';
import { useTranslations } from '../hooks/useTranslations';

const SellPromptPage: React.FC = () => {
  const { t } = useTranslations();
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="text-center py-16 soft-ui-container">
        <div className="inline-block p-4 rounded-full soft-ui-input">
            <SparklesIcon className="h-12 w-12 text-sky-500 dark:text-sky-400" />
        </div>
        <h1 className="mt-6 text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
          {t('monetize_expertise')}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-500 dark:text-slate-400">
          {t('sell_prompts_desc')}
        </p>
        <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('get_notified')}</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2">{t('get_notified_desc')}</p>
            <form className="mt-4 max-w-md mx-auto flex gap-2">
                <input 
                    type="email" 
                    placeholder={t('email_placeholder')}
                    disabled
                    className="w-full p-3 soft-ui-input text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 cursor-not-allowed"
                />
                <button 
                    disabled
                    className="bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-white px-6 py-2 rounded-lg text-sm font-medium cursor-not-allowed opacity-50"
                >
                    {t('notify_me')}
                </button>
            </form>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">{t('waitlist_soon')}</p>
        </div>
      </div>
    </div>
  );
};

export default SellPromptPage;