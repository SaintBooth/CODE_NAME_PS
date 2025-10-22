import React from 'react';
import { Prompt } from '../types';
import { StarIcon } from './icons';

interface PromptCardProps {
  prompt: Prompt;
  onSelect: (prompt: Prompt) => void;
  style?: React.CSSProperties;
}

const ModelBadge: React.FC<{ model: string }> = ({ model }) => {
  const colors: { [key: string]: string } = {
    "Gemini": "bg-blue-500/10 text-blue-600 dark:text-blue-300",
    "ChatGPT": "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-300",
    "Midjourney": "bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-300",
    "DALL-E": "bg-pink-500/10 text-pink-600 dark:bg-pink-500/20 dark:text-pink-300",
  };
  return (
    <span className={`absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full ${colors[model] || 'bg-gray-500/10 text-gray-600 dark:bg-gray-500/20 dark:text-gray-300'}`}>
      {model}
    </span>
  );
};

const PromptCard: React.FC<PromptCardProps> = ({ prompt, onSelect, style }) => {
  return (
    <button
      onClick={() => onSelect(prompt)}
      style={style}
      className="animate-fade-in-up w-full text-left soft-ui-button h-full group"
    >
      <div className="p-5 relative h-full flex flex-col">
        <ModelBadge model={prompt.model} />
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors pr-16">{prompt.title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 h-10 overflow-hidden flex-grow">{prompt.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-slate-500 dark:text-slate-400">by <span className="font-semibold text-slate-600 dark:text-slate-300">{prompt.author}</span></div>
          <div className="flex items-center space-x-1">
            <StarIcon className="h-5 w-5 text-amber-400" />
            <span className="text-slate-700 dark:text-slate-200 font-semibold">{prompt.rating}</span>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-sky-500 dark:text-sky-400">${prompt.price.toFixed(2)}</span>
          <span className="text-xs font-medium bg-slate-500/10 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-md">{prompt.category}</span>
        </div>
      </div>
    </button>
  );
};

export default PromptCard;