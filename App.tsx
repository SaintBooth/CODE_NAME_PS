import React, { useState } from 'react';
import { I18nProvider } from './contexts/I18nContext';
import { Prompt } from './types';
import Header, { Page } from './components/Header';
import HomePage from './components/HomePage';
import PromptDetailView from './components/PromptDetailView';
import Footer from './components/Footer';
import SellPromptPage from './components/SellPromptPage';
import CommunityPage from './components/CommunityPage';
import CoPilot from './components/CoPilot';

const AppContent: React.FC = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('Browse');

  const handlePromptSelect = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
  };

  const handleCloseDetailView = () => {
    setSelectedPrompt(null);
  };
  
  const handleNavigate = (page: Page) => {
    setSelectedPrompt(null); // Close detail view when navigating
    setCurrentPage(page);
  };

  const renderPage = () => {
    if (selectedPrompt) {
      return <PromptDetailView prompt={selectedPrompt} onClose={handleCloseDetailView} />;
    }
    switch (currentPage) {
      case 'Browse':
        return <HomePage onPromptSelect={handlePromptSelect} />;
      case 'Sell':
        return <SellPromptPage />;
      case 'Community':
        return <CommunityPage />;
      default:
        return <HomePage onPromptSelect={handlePromptSelect} />;
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col animate-fade-in">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
      <CoPilot />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
};

export default App;