import { Metadata } from 'next';
import { PAGE_TEMPLATES, ROUTES } from '@/config';
import { LangType } from '@/config/i18n/settings';
import { getTranslationServer } from '@/config/i18n';
import { getAlternatesUrls, getOgTagsDefault, pick } from '@/utils/helpers';
import { serverFetch } from '@/utils/service';
import { getSeoBySlug } from '@/utils/services';
import { Title } from '@/components/Title';
import { ProblemItems } from '@/components/ProblemItems';
import { Container } from '@/components/Container';
import { Breadcrumbs } from '@/views/Breadcrumbs';

interface IProps {
  params: { lang: LangType };
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const slug = 'courses';
  const { lang } = params;
  const { t } = await getTranslationServer(lang, ['site']);
  const pageSeo = !!slug && (await getSeoBySlug({ lang, slug }));
  const { title, description, keywords } = pageSeo || {};

  return {
    title: title || t('site.courses_page.seo.title'),
    description: description || t('site.courses_page.seo.description'),
    keywords: keywords || t('site.courses_page.seo.keywords'),
    alternates: getAlternatesUrls({ slug, lang }),
    openGraph: {
      title: title || t('site.courses_page.seo.title'),
      description: description || t('site.courses_page.seo.description'),
      ...(getOgTagsDefault({ lang, slug }) || {}),
    },
  };
}

export default async function Courses({ params: { lang } }: IProps) {
  const data = await getPosts({ lang });
  const { results: items } = data || {};
  const { t } = await getTranslationServer(lang, ['site']);
  return (
    <div className="page page-default page-problems">
      <Container size="sm">
        <Title size="sm" isCenter className="page-default-title" tag="h1">
          {t('site.courses_page.title')}
        </Title>
        <Breadcrumbs
          items={[
            {
              label: t('site.breadcrumbs.courses'),
              link: ROUTES.courses,
            },
          ]}
        />
        <ProblemItems items={items} />
      </Container>
    </div>
  );
}

const getPosts = async ({ lang }: { lang: LangType }) => {
  return await serverFetch(`/page?template=${PAGE_TEMPLATES.COURSES}`, { lang });
};