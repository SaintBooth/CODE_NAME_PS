import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

const Footer: React.FC = () => {
  const { t } = useTranslations();
  return (
    <footer className="bg-transparent mt-12">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-slate-500 dark:text-slate-400">
        <p>{t('copyright', { year: new Date().getFullYear() })}</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors">{t('about')}</a>
          <a href="#" className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors">{t('terms_of_service')}</a>
          <a href="#" className="hover:text-sky-500 dark:hover:text-sky-400 transition-colors">{t('privacy_policy')}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;