import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PAGE_TEMPLATES } from '@/config';
import { getTranslationServer } from '@/config/i18n';
import { LangType } from '@/config/i18n/settings';
import { serverFetch } from '@/utils/service';
import { getAlternatesUrls, getOgTagsDefault, omit } from '@/utils/helpers';
import { getTemplate } from '@/views/PageTemplates';
import { PageContent } from '@/views/PageTemplates/PageContent';

interface IProps {
  params: { lang: LangType; page: string[] };
}
export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const { lang, page } = params;
  const pageData = await getPageData({ lang, page: page[1] });
  const { title = '', description = '', preview, og_title, og_description, og_keywords, og_image, slug } = pageData || {};

  return {
    title: og_title || title,
    description: og_description || description,
    keywords: og_keywords,
    alternates: getAlternatesUrls({ slug, lang, prefixSlug: 'page' }),
    openGraph: {
      title: og_title || title,
      description: og_description || description,
      images: og_image || preview?.thumbnail,
      ...(getOgTagsDefault({ lang, slug, prefixSlug: 'page' }) || {}),
    },
  };
}

export default async function Page({ params: { lang, page } }: IProps) {
  const isPageSlug = page[0] === 'page';
  const slug = isPageSlug ? page[1] : null;
  const pageData = !!slug && await getPageData({ lang, page: slug });
  const { template, html_content, id } = pageData || {};
  const data = !!html_content ? JSON.parse(html_content) : {};
  const { t } = await getTranslationServer(lang, ['site']);

  if (!id || (isPageSlug && template === PAGE_TEMPLATES.POST)) {
    console.log(
      `>>> notFound >>> \n src/app/[lang]/[...page]/page.tsx \n`,
      `lang: ${lang} \n`,
      `slug: ${JSON.stringify(page)} \n`,
      `template: ${template} \n`,
      `pageData: ${JSON.stringify(pageData, null, 3)} \n`,
      `date: ${new Date()} \n`,
    );
    return notFound();
  }

  return (
    <div className="page pb">
      {!!id &&
        getTemplate(template, {
          pageData: omit(pageData, ['html_content']),
          content: <PageContent pageId={id} data={data} template={template} />,
          t,
          lang
        })}
    </div>
  );
}

const getPageData = async ({ lang, page }: { lang: LangType; page: string }) => {
  return await serverFetch(`/page/${page}`, { lang });
};