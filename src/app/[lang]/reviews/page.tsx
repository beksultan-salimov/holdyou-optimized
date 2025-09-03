import { Metadata } from 'next';
import { ROUTES } from '@/config';
import { LangType } from '@/config/i18n/settings';
import { getTranslationServer } from '@/config/i18n';
import { getAlternatesUrls, getOgTagsDefault, isEmpty } from '@/utils/helpers';
import { getReviews, getSeoBySlug } from '@/utils/services';
import { Title } from '@/components/Title';
import { Container } from '@/components/Container';
import { ReviewsItem } from '@/views/ReviewsItem';
import { Breadcrumbs } from '@/views/Breadcrumbs';
import { PaginationSimple } from '@/views/PaginationSimple';
import { ReviewsAddBlock } from './ReviewsAddBlock';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
interface IProps {
  params: { lang: LangType };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params, searchParams }: IProps): Promise<Metadata> {
  const slug = 'reviews';
  const { lang } = params;
  const { t } = await getTranslationServer(lang, ['reviews']);
  const pageSeo = !!slug && (await getSeoBySlug({ lang, slug }));
  const { title, description, keywords } = pageSeo || {};

  return {
    title: title || t('reviews.seo.title'),
    description: description || t('reviews.seo.description'),
    keywords: keywords || t('reviews.seo.keywords'),
    alternates: getAlternatesUrls({ slug, lang, isLanguages: isEmpty(searchParams) }),
    openGraph: {
      title: title || t('reviews.seo.title'),
      description: description || t('reviews.seo.description'),
      ...(getOgTagsDefault({ lang, slug }) || {}),
    },
  };
}

export default async function Reviews({ params: { lang }, searchParams }: IProps) {
  const data = await getReviews({ lang, query: searchParams });
  const { t } = await getTranslationServer(lang, ['reviews', 'site']);

  if (!!searchParams?.page && !data?.count) {
    console.log(
      `>>> notFound >>> \n src/app/[lang]/reviews/page.tsx \n`,
      `lang: ${lang} \n`,
      `searchParams: ${JSON.stringify(searchParams, null, 3)} \n`,
      `data: ${JSON.stringify(data, null ,3)} \n`,
      `data.count: ${data.count} \n`,
      `date: ${new Date()} \n`,
    );
    return notFound();
  }

  return (
    <div className="page page-default">
      <Container size="sm">
        <Title tag="h1" size="lg" isCenter className="page-default-title">
          {t('reviews.title')}
        </Title>
        <Breadcrumbs
          items={[
            {
              label: t('site.breadcrumbs.reviews'),
              link: ROUTES.reviews,
            },
          ]}
        />
        <ReviewsAddBlock btnAddText={t('reviews.btn_add_review')} />
        <section>
          {data?.items?.map((item: any) => (
            <ReviewsItem key={item.id} data={item} t={t} />
          ))}
        </section>
        {(!!data?.previous || !!data?.next) && (
          <PaginationSimple
            pathname="/reviews"
            query={searchParams}
            previous={data?.previous}
            next={data?.next}
            t={t}
          />
        )}
      </Container>
    </div>
  );
}
