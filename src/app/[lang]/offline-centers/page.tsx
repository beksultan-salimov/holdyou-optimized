import { Metadata } from 'next';
import { LangType } from '@/config/i18n/settings';
import { getTranslationServer } from '@/config/i18n';
import { getNewsCarousel, getOfflineCenters, getSeoBySlug } from '@/utils/services';
import { serverFetch } from '@/utils/service';
import { getAlternatesUrls, getOgTagsDefault } from '@/utils/helpers';
import { OfflineCentersView } from './OfflineCentersView';
import './offlineCentersPage.scss';

interface IProps {
  params: { lang: LangType };
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const slug = 'offline-centers';
  const { lang } = params;
  const { t } = await getTranslationServer(lang, ['offline_centers']);
  const pageSeo = !!slug && (await getSeoBySlug({ lang, slug }));
  const { title, description, keywords } = pageSeo || {};

  return {
    title: title || t('offline_centers.seo.title'),
    description: description || t('offline_centers.seo.description'),
    keywords: keywords || t('offline_centers.seo.keywords'),
    alternates: getAlternatesUrls({ slug, lang }),
    openGraph: {
      title: title || t('offline_centers.seo.title'),
      description: description || t('offline_centers.seo.description'),
      ...(getOgTagsDefault({ lang, slug }) || {}),
    },
  };
}

export default async function OfflineCentersPage({ params: { lang } }: IProps) {
  const offlineCenters = await getOfflineCenters({ lang });
  const news = await getNewsCarousel({ lang });
  const psychologists = await getPsychologists({ lang });

  return (
    <div className="page page-offline_centers">
      <OfflineCentersView
        lang={lang}
        news={news}
        offlineCenters={offlineCenters}
        psychologists={psychologists}
      />
    </div>
  );
}

export const getPsychologists = async ({ lang }: { lang: LangType }) => {
  const psychologists = await serverFetch('/psychologists', { lang })
  return psychologists.filter((p: any) => p.offline === true);
};