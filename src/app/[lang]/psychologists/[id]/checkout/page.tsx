import { Metadata } from 'next';
import { LangType } from '@/config/i18n/settings';
import { serverFetch } from '@/utils/service';
import { Title } from '@/components/Title';
import { PsychologistCard } from '@/views/PsychologistCard';
import { getTranslationServer } from '@/config/i18n';
import { Container } from '@/components/Container';
import { PsychologistCheckoutWrapper } from '@/views/PsychologistViews/PsychologistCheckoutWrapper';
import { getAlternatesUrls, getLocalePrefix, getOgTagsDefault } from '@/utils/helpers';
import { notFound } from 'next/navigation';

interface IProps {
  params: { lang: LangType; id: string };
}
export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const { lang, id } = params;
  const psychologist = await getPsychologistPageData({ id, lang });
  const { fullname = '', description = '', photo, seo_title, seo_description, og_image, keywords } = psychologist || {};
  const { t } = await getTranslationServer(lang, ['psychologist', 'site']);
  const title = fullname + t('psychologist.seo.title_suffix')

  return {
    title: seo_title || title,
    description: seo_description || description,
    keywords: keywords || t('site.main_layout.seo.keywords'),
    alternates: getAlternatesUrls({
      lang,
      slug: id + '/checkout',
      prefixSlug: 'psychologists',
      canonical: `${getLocalePrefix(lang)}/psychologists/${id}`,
    }),
    openGraph: {
      title: seo_title || title,
      description: seo_description || description,
      images: og_image || photo?.thumbnail,
      ...(getOgTagsDefault({
        lang,
        slug: id + '/checkout',
        prefixSlug: 'psychologists',
      }) || {}),
    },
  };
}

export default async function PsychologistCheckoutPage({
  params: { lang, id },
}: {
  params: { lang: LangType; id: string };
}) {
  const { t } = await getTranslationServer(lang, ['site']);
  const psychologist = await getPsychologistPageData({ id, lang });

  if (!psychologist?.id) {
    console.log(
      `>>> notFound >>> \n src/app/[lang]/psychologists/[id]/checkout/page.tsx \n`,
      `id: ${id} \n`,
      `lang: ${lang} \n`,
      `psychologist: ${JSON.stringify(psychologist, null, 3)} \n`,
      `psychologist.id: ${psychologist?.id} \n`,
      `date: ${new Date()} \n`,
    );
    return notFound();
  }

  return (
    <div className="page page-checkout">
      <Container size="md">
        <Title tag="h1" size="xlg" isCenter className="page-checkout__title">
          {t('site.checkout.title')}
        </Title>
        <Title tag="h2" size="lg" isCenter className="page-checkout__psh-title">
          {psychologist.fullname}
        </Title>

        <div className="checkout">
          <div className="checkout-col-sidebar">
            <PsychologistCard item={psychologist} type="simple" />
          </div>
          <div className="checkout-col-content">
            <PsychologistCheckoutWrapper psychologist={psychologist} id={id} />
          </div>
        </div>
      </Container>
    </div>
  );
}

const getPsychologistPageData = async ({
  id,
  lang,
}: {
  id: string;
  lang: string;
}) => {
  return await serverFetch(`/psychologists/${id}`, { lang });
};
