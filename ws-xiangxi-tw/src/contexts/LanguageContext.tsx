import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations } from '../lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['en-US'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Function to detect the best language based on browser settings
function detectLanguage(): Language {
  // First, check if user has a saved preference
  const savedLanguage = localStorage.getItem('preferred-language');
  if (savedLanguage) {
    return savedLanguage as Language;
  }

  // Get browser languages (navigator.languages provides an array of preferred languages)
  const browserLanguages = navigator.languages || [navigator.language];
  
  // Map of browser language codes to our supported languages
  const languageMap: Record<string, Language> = {
    'en-US': 'en-US',
    'en': 'en-US',
    'en-GB': 'en-US',
    'en-UK': 'en-US',
    'en-AU': 'en-US',
    'en-CA': 'en-US',
    'en-NZ': 'en-US',
    'zh-TW': 'zh-TW',
    'zh-HK': 'zh-TW',
    'zh-Hant': 'zh-TW',
    'zh-Hant-TW': 'zh-TW',
    'zh-Hant-HK': 'zh-TW',
    'zh': 'zh-TW',
    'zh-CN': 'zh-TW',
    'zh-SG': 'zh-TW',
  };

  // Try to find a matching language
  for (const browserLang of browserLanguages) {
    const normalizedLang = browserLang.toLowerCase();
    
    // First try exact match
    if (languageMap[browserLang]) {
      return languageMap[browserLang];
    }
    
    // Then try normalized match
    if (languageMap[normalizedLang]) {
      return languageMap[normalizedLang];
    }
    
    // Try just the language code without region (e.g., 'en' from 'en-AU')
    const langCode = browserLang.split('-')[0].toLowerCase();
    if (languageMap[langCode]) {
      return languageMap[langCode];
    }
  }

  // Default to zh-TW if no match found
  return 'zh-TW';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    return detectLanguage();
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('preferred-language', lang);
  };

  const t = translations[language];

  // Log the detected language for debugging (optional)
  useEffect(() => {
    console.log(`Language detected: ${language}`);
    console.log(`Browser languages: ${navigator.languages?.join(', ') || navigator.language}`);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}