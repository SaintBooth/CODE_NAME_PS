import React from 'react';
import { Page } from './Header';
import { useTranslations } from '../hooks/useTranslations';
import { CodeBracketIcon, XMarkIcon } from './icons';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onNavigate, currentPage }) => {
  const { t } = useTranslations();
  
  const handleNavigation = (page: Page) => {
    onNavigate(page);
    onClose();
  };
  
  const navLinkClasses = (page: Page) => {
    const baseClasses = 'w-full text-left font-medium p-3 rounded-md transition-colors';
    if (currentPage === page) {
      return `${baseClasses} text-sky-500 dark:text-sky-400 bg-slate-200/50 dark:bg-slate-700/50`;
    }
    return `${baseClasses} text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400`;
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      {/* Menu */}
      <div className={`fixed top-0 right-0 h-full w-72 bg-e0e5ec dark:bg-2c3038 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-slate-300/50 dark:border-slate-700/50">
          <div className="flex items-center space-x-2">
            <CodeBracketIcon className="h-7 w-7 text-sky-500" />
            <span className="text-lg font-bold text-slate-800 dark:text-white">PromptSpace</span>
          </div>
          <button onClick={onClose} aria-label={t('close_menu')} className="p-1 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li><button onClick={() => handleNavigation('Browse')} className={navLinkClasses('Browse')}>{t('browse')}</button></li>
            <li><button onClick={() => handleNavigation('Sell')} className={navLinkClasses('Sell')}>{t('sell_prompts')}</button></li>
            <li><button onClick={() => handleNavigation('Community')} className={navLinkClasses('Community')}>{t('community')}</button></li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;