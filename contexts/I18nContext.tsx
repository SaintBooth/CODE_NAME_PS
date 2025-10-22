import React, { createContext, useState, useCallback, ReactNode } from 'react';

const translations = {
  en: {
    browse: 'Browse',
    sell_prompts: 'Sell Prompts',
    community: 'Community',
    sign_in: 'Sign In',
    sign_up: 'Sign Up',
    copyright: '© {year} PromptSpace. All rights reserved.',
    about: 'About',
    terms_of_service: 'Terms of Service',
    privacy_policy: 'Privacy Policy',
    back_to_marketplace: 'Back to Marketplace',
    by: 'by',
    for: 'for',
    prompt_text: 'Prompt Text',
    example_output: 'Example Output',
    buy_prompt: 'Buy Prompt',
    test_this_prompt: 'Test This Prompt',
    test_this_prompt_desc: 'Fill in the placeholders to try this prompt with Gemini.',
    no_placeholders: 'This prompt has no placeholders to fill.',
    generating: 'Generating...',
    generate: 'Generate',
    error: 'Error',
    result: 'Result',
    error_load_prompts: 'Failed to load prompts. Please try again later.',
    loading_prompts: 'Loading prompts...',
    error_oops: 'Oops! Something went wrong.',
    no_prompts_found: 'No prompts found matching your criteria.',
    prompt_of_the_day: 'Prompt of the Day',
    total_prompts: 'Total Prompts',
    top_models: 'Top Models',
    trending_tags: 'Trending Tags',
    discover_perfect_prompt: 'Discover the Perfect Prompt',
    unlock_potential: 'Unlock the full potential of AI. Find top-tier prompts for any model, for any task.',
    search_prompts: 'Search prompts by title, description, or tag...',
    filters: 'Filters',
    sort_by: 'Sort by',
    sort_by_rating: 'Sort by: Rating',
    sort_by_newest: 'Sort by: Newest',
    sort_by_price_asc: 'Sort by: Price (Low to High)',
    sort_by_price_desc: 'Sort by: Price (High to Low)',
    monetize_expertise: 'Monetize Your Prompt Engineering Expertise',
    sell_prompts_desc: 'Join our community of creators and start earning from your high-quality AI prompts. Our marketplace is coming soon!',
    get_notified: 'Get Notified When We Launch!',
    get_notified_desc: 'Sign up for our waitlist to be the first to know when you can start selling prompts.',
    email_placeholder: 'Your email address',
    notify_me: 'Notify Me',
    waitlist_soon: "We're putting the finishing touches on our seller platform. Stay tuned!",
    join_conversation: 'Join the Conversation',
    community_desc: 'Connect with other prompt engineers, share tips, and collaborate on new ideas. Our community hub is launching soon.',
    community_hub_soon: 'Community Hub Coming Soon',
    reset: 'Reset',
    category: 'Category',
    all_categories: 'All Categories',
    ai_model: 'AI Model',
    max_price: 'Max Price',
    close_menu: 'Close menu',
    copilot_greeting: "Hi there! I'm your AI Co-Pilot. How can I help you find the perfect prompt today?",
    ai_copilot: 'AI Co-Pilot',
    type_message: 'Type a message...',
  },
  ru: {
    browse: 'Обзор',
    sell_prompts: 'Продать Промпты',
    community: 'Сообщество',
    sign_in: 'Войти',
    sign_up: 'Регистрация',
    copyright: '© {year} PromptSpace. Все права защищены.',
    about: 'О нас',
    terms_of_service: 'Условия использования',
    privacy_policy: 'Политика конфиденциальности',
    back_to_marketplace: 'Назад на маркетплейс',
    by: 'от',
    for: 'для',
    prompt_text: 'Текст промпта',
    example_output: 'Пример вывода',
    buy_prompt: 'Купить промпт',
    test_this_prompt: 'Протестировать этот промпт',
    test_this_prompt_desc: 'Заполните плейсхолдеры, чтобы попробовать этот промпт с Gemini.',
    no_placeholders: 'У этого промпта нет плейсхолдеров для заполнения.',
    generating: 'Генерация...',
    generate: 'Сгенерировать',
    error: 'Ошибка',
    result: 'Результат',
    error_load_prompts: 'Не удалось загрузить промпты. Пожалуйста, попробуйте позже.',
    loading_prompts: 'Загрузка промптов...',
    error_oops: 'Ой! Что-то пошло не так.',
    no_prompts_found: 'Не найдено промптов, соответствующих вашим критериям.',
    prompt_of_the_day: 'Промпт дня',
    total_prompts: 'Всего промптов',
    top_models: 'Топ модели',
    trending_tags: 'Популярные теги',
    discover_perfect_prompt: 'Найдите идеальный промпт',
    unlock_potential: 'Раскройте весь потенциал ИИ. Найдите первоклассные промпты для любой модели и любой задачи.',
    search_prompts: 'Искать промпты по названию, описанию или тегу...',
    filters: 'Фильтры',
    sort_by: 'Сортировать по',
    sort_by_rating: 'Сортировка: Рейтинг',
    sort_by_newest: 'Сортировка: Новизна',
    sort_by_price_asc: 'Сортировка: Цена (по возрастанию)',
    sort_by_price_desc: 'Сортировка: Цена (по убыванию)',
    monetize_expertise: 'Монетизируйте свой опыт в инженерии промптов',
    sell_prompts_desc: 'Присоединяйтесь к нашему сообществу авторов и начните зарабатывать на своих высококачественных ИИ-промптах. Наш маркетплейс скоро откроется!',
    get_notified: 'Получите уведомление о запуске!',
    get_notified_desc: 'Подпишитесь на наш список ожидания, чтобы первыми узнать, когда можно будет начать продавать промпты.',
    email_placeholder: 'Ваш адрес электронной почты',
    notify_me: 'Уведомить меня',
    waitlist_soon: 'Мы вносим последние штрихи в нашу платформу для продавцов. Следите за обновлениями!',
    join_conversation: 'Присоединяйтесь к обсуждению',
    community_desc: 'Общайтесь с другими инженерами промптов, делитесь советами и сотрудничайте над новыми идеями. Наш центр сообщества скоро запустится.',
    community_hub_soon: 'Центр сообщества скоро будет',
    reset: 'Сбросить',
    category: 'Категория',
    all_categories: 'Все категории',
    ai_model: 'ИИ Модель',
    max_price: 'Макс. цена',
    close_menu: 'Закрыть меню',
    copilot_greeting: 'Привет! Я ваш ИИ-помощник. Как я могу помочь вам найти идеальный промпт сегодня?',
    ai_copilot: 'ИИ-помощник',
    type_message: 'Введите сообщение...',
  }
};

type Language = 'en' | 'ru';
export type TranslationKeys = keyof typeof translations.en;

interface I18nContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKeys, options?: Record<string, string | number>) => string;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'ru' ? 'ru' : 'en';
  });

  const t = useCallback((key: TranslationKeys, options?: Record<string, string | number>) => {
    let text = translations[language][key] || translations.en[key];
    if (options) {
      Object.entries(options).forEach(([optionKey, optionValue]) => {
        text = text.replace(`{${optionKey}}`, String(optionValue));
      });
    }
    return text;
  }, [language]);

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};