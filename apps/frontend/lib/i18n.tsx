'use client';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { dictionaries } from './dictionaries';

type TranslationDict = {
  [key: string]: string | TranslationDict;
};

export type Language = keyof typeof dictionaries;

function getNested(dict: TranslationDict, path: string[]): string | undefined {
  return path.reduce<string | TranslationDict | undefined>((acc, key) => {
    if (typeof acc === 'object') return acc[key];
    return undefined;
  }, dict) as string | undefined;
}

const TranslationContext = createContext<{
  lang: Language;
  t: (key: string, vars?: Record<string, string>) => string;
  setLang: (lang: Language) => void;
}>({
  lang: 'en',
  t: (key) => key,
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    const stored = localStorage.getItem('lang') as Language | null;
    if (stored) setLangState(stored);
    document.documentElement.lang = stored || 'en';
  }, []);

  function setLang(l: Language) {
    localStorage.setItem('lang', l);
    setLangState(l);
    document.documentElement.lang = l;
  }

  function t(key: string, vars?: Record<string, string>): string {
    const path = key.split('.');
    const value = getNested(dictionaries[lang], path);
    if (typeof value === 'string') {
      if (vars) {
        return value.replace(/{{(.*?)}}/g, (_, v) => vars[v.trim()] ?? '');
      }
      return value;
    }
    return key;
  }

  return <TranslationContext.Provider value={{ lang, setLang, t }}>{children}</TranslationContext.Provider>;
}

export function useTranslation() {
  return useContext(TranslationContext);
}

export function useTranslations(prefix: string) {
  const { t } = useTranslation();
  return {
    t: (key: string, vars?: Record<string, string>) => t(`${prefix}.${key}`, vars),
  };
}
