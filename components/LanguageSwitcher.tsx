
import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useTranslations();

  const buttonClasses = (lang: 'en' | 'ru') =>
    `px-3 py-1 rounded-md text-sm font-semibold transition-colors ${
      language === lang
        ? 'bg-sky-500 text-white'
        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
    }`;

  return (
    <div className="flex items-center space-x-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
      <button onClick={() => setLanguage('en')} className={buttonClasses('en')}>
        EN
      </button>
      <button onClick={() => setLanguage('ru')} className={buttonClasses('ru')}>
        RU
      </button>
    </div>
  );
};

export default LanguageSwitcher;
