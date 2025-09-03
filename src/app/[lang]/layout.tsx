import '@/static/scss/globals.scss';
import type { Metadata } from 'next';
import { Header } from '@/views/Header';
import { Footer } from '@/views/Footer'
import { Providers } from '@/providers';
import { LangType, languages } from '@/config/i18n/settings';
import GlobalComponents from '@/views/GlobalComponents';
import { getAlternatesUrls, getDomain, getOgTagsDefault} from '@/utils/helpers';
import { getTranslationServer } from '@/config/i18n';
// import { OtherScripts } from '@/views/OtherScripts';
import { HeadScripts } from '@/views/HeadScripts';

interface IProps {
  params: { lang: LangType };
}
export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const { lang } = params;
  const { t } = await getTranslationServer(lang, ['site']);
  const slug = '/';

  const config: Metadata = {
    title: t('site.main_layout.seo.title'),
    description: t('site.main_layout.seo.description'),
    keywords: t('site.main_layout.seo.keywords'),
    alternates: getAlternatesUrls({ slug, lang }),
    metadataBase: new URL(getDomain()),
    openGraph: {
      title: t('site.main_layout.seo.title'),
      description: t('site.main_layout.seo.description'),
      images: '/img/og_image.png',
      ...getOgTagsDefault({ lang, slug }),
    },
  };

  return config
};

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: LangType };
}) {
  return (
    <html lang={lang}>
      <head>
        <HeadScripts />
      </head>
      <body className="holdyou">
        <Providers lang={lang} text={{}}>
          <Header />
          <main className="app-main">{children}</main>
          <Footer />
          <GlobalComponents lang={lang} />
        </Providers>
        <div id="ajax-sprite" />
        <div id="ajax-sprite-mask" />
        {/* <OtherScripts /> */}
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}
