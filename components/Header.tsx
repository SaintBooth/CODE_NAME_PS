import React, { useState } from 'react';
import { CodeBracketIcon, Bars3Icon } from './icons';
import { useTranslations } from '../hooks/useTranslations';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';

export type Page = 'Browse' | 'Sell' | 'Community';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const { t } = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClasses = (page: Page) => {
    const baseClasses = 'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200';
    if (currentPage === page) {
      return `${baseClasses} text-sky-500 dark:text-sky-400 shadow-[inset_3px_3px_6px_#bec3c9,inset_-3px_-3px_6px_#ffffff] dark:shadow-[inset_3px_3px_6px_#23262c,inset_-3px_-3px_6px_#353a44]`;
    }
    return `${baseClasses} text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400`;
  };

  return (
    <>
      <header className="sticky top-0 z-40">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <button onClick={() => onNavigate('Browse')} className="flex items-center space-x-2 text-slate-800 dark:text-white transition-transform duration-150 ease-in-out hover:scale-105 active:scale-100">
                <CodeBracketIcon className="h-8 w-8 text-sky-500" />
                <span className="text-xl font-bold">PromptSpace</span>
              </button>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <button onClick={() => onNavigate('Browse')} className={navLinkClasses('Browse')}>{t('browse')}</button>
              <button onClick={() => onNavigate('Sell')} className={navLinkClasses('Sell')}>{t('sell_prompts')}</button>
              <button onClick={() => onNavigate('Community')} className={navLinkClasses('Community')}>{t('community')}</button>
            </div>
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2">
                 <button 
                  onClick={() => alert('Sign-in functionality is coming soon!')}
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  {t('sign_in')}
                </button>
                <button 
                  onClick={() => alert('Sign-up functionality is coming soon!')}
                  className="soft-ui-button text-sky-500 dark:text-sky-400 px-4 py-2 text-sm font-semibold">
                  {t('sign_up')}
                </button>
              </div>
              <LanguageSwitcher />
              <div className="md:hidden">
                <button 
                  onClick={() => setIsMenuOpen(true)}
                  className="p-2 rounded-md text-slate-600 dark:text-slate-300"
                >
                  <Bars3Icon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onNavigate={onNavigate} currentPage={currentPage} />
    </>
  );
};

export default Header;