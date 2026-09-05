import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { STRINGS } from '../utils/strings';

const LanguageContext = createContext(null);
const STORAGE_KEY = 'bd_lang';

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'hi' ? 'hi' : 'en';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next) => setLangState(next === 'hi' ? 'hi' : 'en'), []);
  const toggle = useCallback(() => setLangState((l) => (l === 'en' ? 'hi' : 'en')), []);

  const value = useMemo(() => {
    const index = lang === 'hi' ? 1 : 0;
    /** UI string lookup, e.g. ui('heroTitle') */
    const ui = (key) => {
      const entry = STRINGS[key];
      if (!entry) return key;
      return entry[index] || entry[0];
    };
    /** Picks item[`${field}_${lang}`] with English fallback, e.g. pick(place, 'name') */
    const pick = (item, field) => {
      if (!item) return '';
      return item[`${field}_${lang}`] || item[`${field}_en`] || '';
    };
    /** Picks from a [en, hi] tuple or an { en, hi } object */
    const pickTuple = (tuple) => {
      if (!tuple) return '';
      if (Array.isArray(tuple)) return tuple[index] || tuple[0];
      return tuple[lang] || tuple.en || '';
    };
    return { lang, setLang, toggle, ui, pick, pickTuple, isHindi: lang === 'hi' };
  }, [lang, setLang, toggle]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
