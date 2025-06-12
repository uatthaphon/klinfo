import en from './en';
import th from './th';

export const dictionaries = { en, th } as const;
export type Dictionaries = typeof dictionaries;
export type TranslationDict = Dictionaries[keyof Dictionaries];
