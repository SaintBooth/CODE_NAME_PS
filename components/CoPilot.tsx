import React, { useState, useRef, useEffect } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { ChatBubbleLeftRightIcon, XMarkIcon, SparklesIcon } from './icons';
import { getCoPilotResponse } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const CoPilot: React.FC = () => {
  const { t } = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([{ role: 'model', text: t('copilot_greeting') }]);
    }
  }, [isOpen, t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await getCoPilotResponse(input);
      const modelMessage: Message = { role: 'model', text: responseText };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      const errorMessage: Message = { role: 'model', text: "Sorry, I encountered an error. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const transitionClasses = 'transition-all duration-300 ease-in-out';

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`soft-ui-button rounded-full p-4 text-sky-500 dark:text-sky-400 ${transitionClasses} ${isOpen ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`}
          aria-label={t('ai_copilot')}
        >
          <ChatBubbleLeftRightIcon className="h-8 w-8" />
        </button>
      </div>

      <div
        className={`fixed bottom-6 right-6 z-50 w-[calc(100%-3rem)] max-w-sm h-[70vh] flex flex-col soft-ui-container rounded-2xl shadow-2xl ${transitionClasses} ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-300/50 dark:border-slate-700/50 flex-shrink-0">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <SparklesIcon className="text-sky-400" /> {t('ai_copilot')}
          </h3>
          <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-slate-300/30 dark:hover:bg-slate-700/30">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-grow p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-sky-500 text-white rounded-br-lg' : 'soft-ui-button rounded-bl-lg'}`}>
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex gap-3 justify-start">
                <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl soft-ui-button rounded-bl-lg">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
                        <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-300/50 dark:border-slate-700/50 flex-shrink-0">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t('type_message')}
              className="w-full soft-ui-input p-2.5 text-slate-900 dark:text-white focus:outline-none"
            />
            <button onClick={handleSend} disabled={isLoading} className="soft-ui-button text-sky-500 p-2.5 rounded-lg disabled:opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" /></svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoPilot;