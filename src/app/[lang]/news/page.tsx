import { Metadata } from 'next';
import { getTranslationServer } from '@/config/i18n';
import { LangType } from '@/config/i18n/settings';
import { PAGE_TEMPLATES, ROUTES } from '@/config';
import { getAlternatesUrls, getOgTagsDefault, isEmpty } from '@/utils/helpers';
import { getSeoBySlug } from '@/utils/services';
import { serverFetch } from '@/utils/service';
import { Title } from '@/components/Title';
import { Container } from '@/components/Container';
import { NewsListItem } from '@/views/NewsListItem';
import { Breadcrumbs } from '@/views/Breadcrumbs';
import { PaginationSite } from '@/components/PaginationSite';
import './news.scss';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
interface IProps {
  params: { lang: LangType };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params, searchParams }: IProps): Promise<Metadata> {
  const slug = 'news';
  const { lang } = params;
  const { t } = await getTranslationServer(lang, ['site']);
  const pageSeo = !!slug && (await getSeoBySlug({ lang, slug }));
  const { title, description, keywords } = pageSeo || {};

  return {
    title: title || t('site.news.seo.title'),
    description: description || t('site.news.seo.description'),
    keywords: keywords || t('site.news.seo.keywords'),
    alternates: getAlternatesUrls({ slug, lang, isLanguages: isEmpty(searchParams) }),
    openGraph: {
      title: title || t('site.news.seo.title'),
      description: description || t('site.news.seo.description'),
      ...(getOgTagsDefault({ lang, slug }) || {}),
    },
  };
}

export default async function News({ params: { lang }, searchParams }: IProps) {
  const data = await getNews({ lang, query: searchParams });
  const { page } = searchParams || {};
  const { results: items, count, size } = data || {};
  const { t } = await getTranslationServer(lang, ['site']);

  if (!!page && !data?.count) {
    console.log(
      `>>> notFound >>> \n src/app/[lang]/news/page.tsx \n`,
      `lang: ${lang} \n`,
      `?page: ${page} \n`,
      `data: ${JSON.stringify(data, null, 3)} \n`,
      `data.count: ${data?.count} \n`,
      `date: ${new Date()} \n`,
    );
    return notFound();
  }

  return (
    <div className="page page-default page-news">
      <Container size="sm">
        <Title size="lg" isCenter className="page-default-title" tag="h1">
          {t('site.news.title')}
        </Title>
        <Breadcrumbs
          items={[
            {
              label: t('site.breadcrumbs.news'),
              link: ROUTES.news,
            },
          ]}
        />
        <div className="news-list">
          {items?.map((item: any) => (
            <NewsListItem key={item?.id} news={item} lang={lang} />
          ))}
        </div>

        {(!!data?.previous || !!data?.next) && (
          <PaginationSite
            className="pagination-bar"
            currentPage={Number(page)}
            totalCount={Number(count)}
            pageSize={Number(size)}
            pathname="/news"
            query={searchParams}
          />
        )}
      </Container>
    </div>
  );
}

const getNews = async ({ lang, query }: { lang: LangType; query: any }) => {
  const qs = !isEmpty(query) ? '&' + new URLSearchParams(query) : '';
  return await serverFetch(`/page?template=${PAGE_TEMPLATES.POST}${qs}`, { lang });
};
