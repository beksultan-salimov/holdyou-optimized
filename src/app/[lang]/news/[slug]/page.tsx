import {Metadata} from 'next';
import {LangType} from '@/config/i18n/settings';
import {getTranslationServer} from '@/config/i18n';
import {serverFetch} from '@/utils/service';
import {getAlternatesUrls, getOgTagsDefault, isJsonString, omit} from '@/utils/helpers';
import {getTemplate} from '@/views/PageTemplates';
import {PageContent} from '@/views/PageTemplates/PageContent';
import {notFound} from 'next/navigation';
import {INews} from '@/types/NewsTypes';
import {PAGE_TEMPLATES} from '@/config';
import Script from 'next/script';

interface IProps {
    params: { lang: LangType; slug: string };
}

export async function generateMetadata({params}: IProps): Promise<Metadata> {
    const {lang, slug} = params;
    const pageData = !!slug && (await getPageData({lang, page: slug}));
    const {
        title = '',
        description = '',
        preview,
        og_image,
        og_title,
        og_description,
        og_keywords,
    } = pageData || {};

    return {
        title: og_title || title,
        description: og_description || description,
        keywords: og_keywords,
        alternates: getAlternatesUrls({slug, lang, prefixSlug: 'news'}),
        openGraph: {
            title: og_title || title,
            description: og_description || description,
            images: og_image || preview?.thumbnail,
            ...(getOgTagsDefault({lang, slug, prefixSlug: 'news'}) || {}),
        },
    };
}

export default async function SingleNews({params: {slug, lang}}: IProps) {
    const pageData = !!slug && (await getPageData({lang, page: slug}));
    const {template, html_content, id} = pageData || {};
    const data = !!html_content && isJsonString(html_content) ? JSON.parse(html_content) : {};
    const relatedItems: any = await getRelatedNews({id, lang});
    const {t} = await getTranslationServer(lang, ['site']);
    if (!!pageData && !pageData?.id) {
        console.log(`>>> notFound >>> \n src/app/[lang]/news/[slug]/page.tsx \n`, `lang: ${lang} \n`, `slug: /news/${slug} \n`, `pageData: ${JSON.stringify(pageData, null, 3)} \n`, `date: ${new Date()} \n`);
        return notFound();
    }


    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": pageData.og_title || pageData.title,
        "publisher": {
            "@type": "Organization",
            "name": "HoldYou",
            "logo": {
                "@type": "ImageObject",
                "url": "https://holdyou.net/favicon.ico"
            }
        },
        "datePublished": pageData.created,
        "dateModified": pageData.updated,
        "image": pageData.image,
        "keywords": pageData.og_keywords,
        "description": pageData.og_description || pageData.description,
    };


    return (
        <div className="page pb">
            <Script id="article-script" type="application/ld+json">
                { JSON.stringify(articleJsonLd) }
            </Script>
            {!!id &&
                getTemplate(template, {
                    pageData: omit(pageData, ['html_content']),
                    content: <PageContent pageId={id} data={data} template={template}/>,
                    relatedItems,
                    t,
                    lang
                })}
        </div>
    );
}

const getPageData = async ({lang, page}: { lang: LangType; page: string }) => {
    return await serverFetch(`/page/${page}`, {lang});
};

export async function generateStaticParams({lang}: { lang: string }) {
    const news = await serverFetch(`/page?template=${PAGE_TEMPLATES.POST}`, {lang});
    return (!!news && !!news?.results) ? news?.results.map((item: INews) => ({
        id: item?.id?.toString(),
    })) : [];
}


const getRelatedNews = async ({id, lang}: { id: string | number, lang: LangType }) => {
    return await serverFetch(`/page?template=${PAGE_TEMPLATES.POST}`, {lang}).then((res) =>
        (res?.results || []).slice(0, 3)
    );
};
