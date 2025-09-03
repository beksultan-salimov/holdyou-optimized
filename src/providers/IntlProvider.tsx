'use client'
import { createContext } from 'react';
import { LangType, defaultLng } from '@/config/i18n/settings';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import 'dayjs/locale/uk';

export const IntlContext = createContext({ lang: defaultLng, text: {} });

export const IntlProvider = ({ children, lang, text }: { children: React.ReactNode, lang: LangType, text: any }) => {
  dayjs.locale(lang);
  return (
    <IntlContext.Provider value={{ lang, text }}>
      {children}
    </IntlContext.Provider>
  );
}