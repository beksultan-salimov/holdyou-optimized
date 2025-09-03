import type { Metadata } from 'next';
import { getTranslationServer } from '@/config/i18n';
import { LangType } from '@/config/i18n/settings';
import { getAlternatesUrls, getOgTagsDefault } from '@/utils/helpers';
import { getMainPageData, getMainQuiz, getSeoBySlug, getServicesSubscription } from '@/utils/services';
import { HomeView } from '@/views/HomeView';
import './home.scss';

export const revalidate = 10;
interface IProps {
  params: {
    lang: LangType;
  };
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const slug = '/';
  const { lang } = params;
  const { t } = await getTranslationServer(lang, ['site']);
  const pageSeo = await getSeoBySlug({ lang, slug: 'home' });
  const { title, description, keywords } = pageSeo || {};

  return {
    title: title || t('site.main_layout.seo.title'),
    description: description || t('site.main_layout.seo.description'),
    keywords: keywords || t('site.main_layout.seo.keywords'),
    alternates: getAlternatesUrls({ slug, lang }),
    openGraph: {
      title: title || t('site.main_layout.seo.title'),
      description: description || t('site.main_layout.seo.description'),
      ...(getOgTagsDefault({ lang, slug }) || {}),
    },
  };
}

export default async function Home({ params: { lang } }: IProps) {
  const mainData = await getMainPageData({ lang });
  const servicesSubscription = await getServicesSubscription({ lang });
  const mainQuiz = await getMainQuiz({ lang });

  return (
    <div className="page page-hn">
      <HomeView
        mainData={mainData}
        mainQuiz={mainQuiz}
        servicesSubscription={servicesSubscription}
        lang={lang}
      />
    </div>
  );
}
