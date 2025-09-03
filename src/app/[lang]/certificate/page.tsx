import { Metadata, ResolvingMetadata } from 'next';
import { getTranslationServer } from '@/config/i18n';
import { LangType } from '@/config/i18n/settings';
import { getAlternatesUrls, getOgTagsDefault } from '@/utils/helpers';
import { CertificateView } from './CertificateView';
import { getSeoBySlug, getServices } from '@/utils/services';
import './certificate.scss';

interface IProps {
  params: { lang: LangType };
}
export async function generateMetadata(
  { params }: IProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = 'certificate';
  const { lang } = params;
  const { t } = await getTranslationServer(lang, ['certificate']);
  const pageSeo = !!slug && (await getSeoBySlug({ lang, slug }));
  const { title, description, keywords } = pageSeo || {};

  return {
    title: title || t('certificate.seo.title'),
    description: description || t('certificate.seo.description'),
    keywords: keywords || t('certificate.seo.keywords'),
    alternates: getAlternatesUrls({ slug, lang }),
    openGraph: {
      title: title || t('certificate.seo.title'),
      description: description || t('certificate.seo.description'),
      ...(getOgTagsDefault({ lang, slug }) || {}),
    },
  };
}

export default async function CertificatePage({
  params: { lang },
}: {
  params: { lang: LangType };
}) {
  const services = await getServices({ lang });

  return <CertificateView lang={lang} services={services} />;
}
