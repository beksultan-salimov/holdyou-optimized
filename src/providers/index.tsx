'use client';
// import { AntdProvider } from './AntProvider';
import { StoreProvider } from '@/store/StoreProvider';
import { IntlProvider } from './IntlProvider';
import { AuthProvider } from './AuthProvider';
import { LangType } from '@/config/i18n/settings';

const Providers = ({ children, lang, text }: {children: React.ReactNode, lang: LangType, text: any}) => {
  return (
    <IntlProvider lang={lang} text={text}>
      <StoreProvider>
        <AuthProvider>
          {/* <AntdProvider> */}
          {children}
          {/* </AntdProvider> */}
        </AuthProvider>
      </StoreProvider>
    </IntlProvider>
  );
};

export { Providers };
