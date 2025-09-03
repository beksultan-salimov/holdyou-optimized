import { Metadata } from 'next';
import { PAGE_TEMPLATES, ROUTES } from '@/config';
import { LangType } from '@/config/i18n/settings';
import { getTranslationServer } from '@/config/i18n';
import { getAlternatesUrls, getOgTagsDefault, pick } from '@/utils/helpers';
import { serverFetch } from '@/utils/service';
import { getSeoBySlug } from '@/utils/services';
import { ISinglePage } from '@/types/SinglePageTypes';
import { Breadcrumbs } from '@/views/Breadcrumbs';
import { Title } from '@/components/Title';
import { ProblemItems } from '@/components/ProblemItems';
import { Container } from '@/components/Container';

interface IProps {
  params: { lang: LangType };
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const slug = 'problems';
  const { lang } = params;
  const { t } = await getTranslationServer(lang, ['site']);
  const pageSeo = !!slug && (await getSeoBySlug({ lang, slug }));
  const { title, description, keywords } = pageSeo || {};

  return {
    title: title || t('site.problems_page.seo.title'),
    description: description || t('site.problems_page.seo.description'),
    keywords: keywords || t('site.problems_page.seo.keywords'),
    alternates: getAlternatesUrls({ slug, lang }),
    openGraph: {
      title: title || t('site.problems_page.seo.title'),
      description: description || t('site.problems_page.seo.description'),
      ...(getOgTagsDefault({ lang, slug }) || {}),
    },
  };
}

export default async function Problems({ params: { lang } }: IProps) {
  const items = await getPosts({ lang });
  const { t } = await getTranslationServer(lang, ['site']);

  return (
    <div className="page page-default page-problems">
      <Container size="sm">
        <Title size="sm" isCenter className="page-default-title" tag="h1">
          {t('site.problems_page.title')}
        </Title>
        <Breadcrumbs
          items={[
            {
              label: t('site.breadcrumbs.problems'),
              link: ROUTES.problems,
            },
          ]}
        />
        <ProblemItems items={items} />
      </Container>
    </div>
  );
}

const getPosts = async ({ lang }: { lang: LangType }) => {
  const data =  await serverFetch(`/page?template=${PAGE_TEMPLATES.PROBLEMS}`, { lang });
  const { results: items } = data || {};
  return items?.map((i: ISinglePage) => pick(i, ['title', 'slug', 'id', 'preview', 'locale']))
};