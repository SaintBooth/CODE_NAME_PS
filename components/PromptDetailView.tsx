import React, { useState, useMemo } from 'react';
import { Prompt } from '../types';
import { StarIcon, SparklesIcon, ArrowLeftIcon } from './icons';
import { testPrompt } from '../services/geminiService';
import { useTranslations } from '../hooks/useTranslations';

interface PromptDetailViewProps {
  prompt: Prompt;
  onClose: () => void;
}

const PromptDetailView: React.FC<PromptDetailViewProps> = ({ prompt, onClose }) => {
  const { t } = useTranslations();
  const [testInputs, setTestInputs] = useState<Record<string, string>>({});
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [testError, setTestError] = useState<string | null>(null);

  const placeholders = useMemo(() => {
    const regex = /\[(.*?)\]/g;
    const matches = prompt.promptText.match(regex) || [];
    return matches.map(match => match.slice(1, -1));
  }, [prompt.promptText]);

  const handleInputChange = (placeholder: string, value: string) => {
    setTestInputs(prev => ({ ...prev, [placeholder]: value }));
  };

  const handleTestPrompt = async () => {
    setIsLoading(true);
    setTestResult('');
    setTestError(null);
    let finalPrompt = prompt.promptText;
    for (const placeholder in testInputs) {
      finalPrompt = finalPrompt.replace(`[${placeholder}]`, testInputs[placeholder]);
    }

    try {
        const result = await testPrompt(finalPrompt);
        setTestResult(result);
    } catch (err) {
        if (err instanceof Error) {
            setTestError(err.message);
        } else {
            setTestError("An unknown error occurred.");
        }
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
      <button onClick={onClose} className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 mb-6 transition-colors">
        <ArrowLeftIcon />
        <span>{t('back_to_marketplace')}</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Prompt Info */}
        <div className="lg:col-span-2 soft-ui-container p-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-sm font-medium bg-sky-500/10 text-sky-600 dark:bg-sky-500/20 dark:text-sky-300 px-3 py-1 rounded-full">{prompt.category}</span>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-3">{prompt.title}</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t('by')} <span className="font-semibold text-slate-700 dark:text-slate-200">{prompt.author}</span> {t('for')} <span className="font-semibold text-slate-700 dark:text-slate-200">{prompt.model}</span></p>
            </div>
            <div className="flex items-center space-x-1 text-amber-400">
              <StarIcon className="h-6 w-6" />
              <span className="text-xl font-bold text-slate-800 dark:text-white">{prompt.rating}</span>
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-300 mt-6">{prompt.description}</p>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">{t('prompt_text')}</h3>
            <pre className="soft-ui-input p-4 text-slate-600 dark:text-slate-300 text-sm whitespace-pre-wrap font-mono">{prompt.promptText}</pre>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">{t('example_output')}</h3>
            <div className="soft-ui-input p-4 text-slate-600 dark:text-slate-300 text-sm italic">
              {prompt.exampleOutput}
            </div>
          </div>

        </div>

        {/* Right Column: Purchase & Test */}
        <div className="lg:col-span-1 space-y-6">
          <div className="soft-ui-container p-6">
            <span className="text-4xl font-bold text-sky-500 dark:text-sky-400">${prompt.price.toFixed(2)}</span>
            <button className="w-full mt-4 bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-lg transition-all duration-150 ease-in-out text-lg soft-ui-button">
              {t('buy_prompt')}
            </button>
          </div>

          <div className="soft-ui-container p-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center space-x-2">
              <SparklesIcon className="text-sky-500 dark:text-sky-400"/>
              <span>{t('test_this_prompt')}</span>
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{t('test_this_prompt_desc')}</p>
            <div className="space-y-4 mt-4">
              {placeholders.length > 0 ? placeholders.map(p => (
                <div key={p}>
                  <label htmlFor={p} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{p}</label>
                  <input 
                    type="text" 
                    id={p}
                    value={testInputs[p] || ''}
                    onChange={(e) => handleInputChange(p, e.target.value)}
                    className="w-full soft-ui-input p-2 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              )) : (
                 <p className="text-sm text-slate-500">{t('no_placeholders')}</p>
              )}
            </div>
             <button 
                onClick={handleTestPrompt} 
                disabled={isLoading}
                className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 rounded-lg transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center soft-ui-button"
             >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('generating')}
                  </>
                ) : t('generate')}
            </button>
            {testError && (
              <div className="mt-4 p-3 rounded-md soft-ui-input border border-red-500/20">
                <h4 className="font-semibold text-red-500 dark:text-red-400">{t('error')}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{testError}</p>
              </div>
            )}
            {testResult && (
              <div className="mt-4">
                <h4 className="font-semibold text-slate-800 dark:text-white">{t('result')}</h4>
                <div className="soft-ui-input p-3 mt-2 rounded-md text-sm text-slate-600 dark:text-slate-300">
                  {testResult}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptDetailView;