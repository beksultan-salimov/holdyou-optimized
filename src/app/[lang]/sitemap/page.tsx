// app/sitemap/page.tsx
import Link from 'next/link';
import {PAGE_TEMPLATES, ROUTES} from '@/config';
import {LangType} from '@/config/i18n/settings';
import {serverFetch} from '@/utils/service';
import {getTranslationServer} from '@/config/i18n';
import './sitemap.css';
import {generatePageLink, getAlternatesUrls, getOgTagsDefault} from "@/utils/helpers";
import {Metadata} from "next";
import {getSeoBySlug} from "@/utils/services";

type RouteEntry = {
    url: string;
    title: string;
};

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
    const slug = 'sitemap';
    const { lang } = params;
    const { t } = await getTranslationServer(lang, ['sitemap']);
    const pageSeo = !!slug && (await getSeoBySlug({ lang, slug }));
    const { title, description, keywords } = pageSeo || {};

    return {
        title: title || t('sitemap.seo.title'),
        description: description || t('sitemap.seo.description'),
        keywords: keywords || t('sitemap.seo.keywords'),
        alternates: getAlternatesUrls({ slug, lang }),
        openGraph: {
            title: title || t('sitemap.seo.title'),
            description: description || t('sitemap.seo.description'),
            ...(getOgTagsDefault({ lang, slug }) || {}),
        },
    };
}

const PAGE_SECTIONS = [
    {
        template: PAGE_TEMPLATES.POST,
        route: ROUTES.news,
        titleKey: 'site.header.news',
        routeBuilder: (item: any) => ROUTES.newsSingle(item.slug),
    },
    {
        template: PAGE_TEMPLATES.COURSES,
        route: ROUTES.courses,
        titleKey: 'site.header.courses',
        routeBuilder: (item: any) => ROUTES.newsSingle(item.slug),
    },
    {
        template: PAGE_TEMPLATES.PSY_TEST,
        route: ROUTES.psyhologichni_testy,
        titleKey: 'site.header.psyhologichni_testy',
        routeBuilder: (item: any) => ROUTES.newsSingle(item.slug),
    },
    {
        template: PAGE_TEMPLATES.DOROSLY_TEMY,
        route: ROUTES.dorosly_temy,
        titleKey: 'site.header.dorosly_temy',
        routeBuilder: (item: any) => ROUTES.newsSingle(item.slug),
    },
    {
        template: PAGE_TEMPLATES.PROBLEMS,
        route: ROUTES.problems,
        titleKey: 'site.header.problems',
        routeBuilder: (item: any) => ROUTES.newsSingle(item.slug),
    },
    {
        template: PAGE_TEMPLATES.PERSONALITIES,
        route: ROUTES.personalities,
        titleKey: 'site.header.personalities',
        routeBuilder: (item: any) => ROUTES.newsSingle(item.slug),
    },
];

const fetchPagesByTemplate = async (lang: LangType, template: string) => {
    const res = await serverFetch(`/page?template=${template}`, {
        lang,
        next: {cache: 'no-store'},
    });
    return res.results || [];
};

const getPsychologists = async ({lang}: { lang: LangType }) => {
    return await serverFetch('/psychologists', {
        lang,
        next: {cache: 'no-store'},
    }).then((data: any) => data);
};

interface IProps {
    params: { lang: LangType };
}

export default async function SitemapPage({params: {lang}}: IProps) {
    const {t} = await getTranslationServer(lang, ['site']);

    const groupedPaths = [ROUTES.psychologists, ROUTES.news, ROUTES.courses, ROUTES.problems,
        ROUTES.dorosly_temy, ROUTES.personalities, ROUTES.psyhologichni_testy];

    const staticRoutes: RouteEntry[] = Object.entries(ROUTES)
        .filter(([_, value]) => {
            return (
                typeof value === 'string' &&
                value.startsWith('/') &&
                !value.startsWith('/cabinet') &&
                !groupedPaths.includes(value)
            );
        })
        .map(([key, value]) => ({
            url: value as string,
            title: t(`site.header.${key}`),
        }));


    const dynamicSections: {
        title: string;
        route: string;
        pages: RouteEntry[];
    }[] = [];

    for (const section of PAGE_SECTIONS) {
        const results = await fetchPagesByTemplate(lang, section.template);

        if (results.length > 0) {
            dynamicSections.push({
                title: t(section.titleKey),
                route: section.route,
                pages: results.map((item: any) => ({
                    url: section.routeBuilder(item),
                    title: item.title,
                })),
            });
        }
    }

    const psychologists = await getPsychologists({lang});
    const psychologistRoutes: RouteEntry[] = psychologists.map((psy: any) => ({
        url: ROUTES.psychologist(psy.id),
        title: psy.fullname,
    }));

    return (
        <main className="sitemap-container">
            <h1 className="sitemap-title">{t('site.header.sitemap')}</h1>

            <section className="sitemap-section">
                <ul className="sitemap-link-list">
                    {staticRoutes
                        .filter((r) => r.url !== ROUTES.psychologists && r.url !== ROUTES.news
                            && r.url !== ROUTES.courses && r.url !== ROUTES.sitemap)
                        .map(({url, title}) => (
                            <li key={url}>
                                <Link href={url} className="sitemap-link">
                                    {title}
                                </Link>
                            </li>
                        ))}
                    <li><Link className="sitemap-link" href={generatePageLink(lang, 'zalezhnist-ta-spivzalezhnist')}>
                        {t('site.header.services_page.zalezhnist-ta-spivzalezhnist')}
                    </Link></li>
                    <li><Link className="sitemap-link"
                              href={generatePageLink(lang, 'dytyachyy-psykholoh')}>{t('site.header.dytyachyy-psykholoh')}</Link>
                    </li>
                    <li><Link className="sitemap-link"
                              href={generatePageLink(lang, 'psycholog-sexolog')}>{t('site.header.services_page.psycholog-sexolog')}</Link>
                    </li>
                    <li><Link className="sitemap-link"
                              href={generatePageLink(lang, 'family-psychologist')}>{t('site.header.services_page.family-psychologist')}</Link>
                    </li>
                    <li><Link className="sitemap-link"
                              href={generatePageLink(lang, 'coach-online')}>{t('site.header.services_page.coach-online')}</Link>
                    </li>
                    <li><Link className="sitemap-link"
                              href={generatePageLink(lang, 'teenage-psychologist')}>{t('site.header.services_page.teenage-psychologist')}</Link>
                    </li>
                    <li><Link className="sitemap-link"
                              href={generatePageLink(lang, 'kpt-terapevt-online')}>{t('site.header.services_page.kpt-terapevt-online')}</Link>
                    </li>
                    <li><Link className="sitemap-link"
                              href={generatePageLink(lang, 'psychotherapist-online')}>{t('site.header.services_page.psychotherapist-online')}</Link>
                    </li>
                    <li><Link className="sitemap-link"
                              href={generatePageLink(lang, 'junior-psyshologiest')}>{t('site.header.junior-psyshologiest')}</Link>
                    </li>
                    <li><Link className="sitemap-link"
                              href={generatePageLink(lang, 'konsultatsya-psihatra')}>{t('site.header.services_page.psychiatrist')}</Link>
                    </li>

                    <li><Link className="sitemap-link"
                              href={generatePageLink(lang, 'kouching')}>{t('site.header.kouching')}</Link></li>
                    <li><Link className="sitemap-link"
                              href={generatePageLink(lang, 'simvoldrama')}>{t('site.header.simvoldrama')}</Link></li>
                    <li><Link className="sitemap-link"
                              href={generatePageLink(lang, 'klient-tsentrovana-terapya')}>{t('site.header.klient-tsentrovana-terapya')}</Link>
                    </li>
                    <li><Link className="sitemap-link"
                              href={generatePageLink(lang, 'krizova-psihologya')}>{t('site.header.krizova-psihologya')}</Link>
                    </li>
                    <li><Link className="sitemap-link"
                              href={generatePageLink(lang, 'metaforichn-asotsativn-karti-mak')}>{t('site.header.metaforichn-asotsativn-karti-mak')}</Link>
                    </li>
                    <li><Link className="sitemap-link"
                              href={generatePageLink(lang, 'psihodrama')}>{t('site.header.psihodrama')}</Link></li>
                    <li><Link className="sitemap-link"
                              href={generatePageLink(lang, 'kogntivno-povednkova-terapya-kpt')}>{t('site.header.kogntivno-povednkova-terapya-kpt')}</Link>
                    </li>
                    <li><Link className="sitemap-link"
                              href={generatePageLink(lang, 'geshtalt-terapiya')}>{t('site.header.geshtalt_terapya')}</Link>
                    </li>
                    <li><Link className="sitemap-link"
                              href={generatePageLink(lang, 'art-terapya')}>{t('site.header.art_terapya')}</Link></li>
                    <li><Link className="sitemap-link"
                              href={generatePageLink(lang, 'tranzaktnij-analz')}>{t('site.header.tranzaktnij-analz')}</Link>
                    </li>
                    <li><Link className="sitemap-link"
                              href={generatePageLink(lang, 'sistemna-smejna-terapya')}>{t('site.header.sistemna-smejna-terapya')}</Link>
                    </li>
                    <li><Link className="sitemap-link"
                              href={generatePageLink(lang, 'pozitivna-psihoterapya')}>{t('site.header.pozitivna-psihoterapya')}</Link>
                    </li>
                    <li><Link className="sitemap-link"
                              href={generatePageLink(lang, 'psihoanalz')}>{t('site.header.psihoanalz')}</Link></li>
                    <li><Link className="sitemap-link"
                              href={generatePageLink(lang, 'psihodinamchnij-pdhd')}>{t('site.header.psihodinamchnij-pdhd')}</Link>
                    </li>
                    <li><Link className="sitemap-link"
                              href={generatePageLink(lang, 'kazkoterapya')}>{t('site.header.kazkoterapya')}</Link></li>
                    <li><Link className="sitemap-link"
                              href={generatePageLink(lang, 'nejrolngvstichne-programuvannya-nlp')}>{t('site.header.nlp')}</Link>
                    </li>
                    <li><Link className="sitemap-link"
                              href={generatePageLink(lang, 'terms')}>{t('site.footer.terms')}</Link></li>
                    <li><Link className="sitemap-link"
                              href={generatePageLink(lang, 'privacy-policy')}>{t('site.footer.privacy_policy')}</Link>
                    </li>
                </ul>
            </section>

            <section className="sitemap-section">
                <ul className="sitemap-link-list">
                    <li>
                        <Link href={ROUTES.psychologists} className="sitemap-link">
                            {t('site.header.psychologists')}
                        </Link>
                        <ul className="sitemap-sublist">
                            {psychologistRoutes.map(({url, title}) => (
                                <li key={url}>
                                    <Link href={url} className="sitemap-link">
                                        {title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </section>

            {dynamicSections.map((section) => (
                <section className="sitemap-section" key={section.route}>
                    <ul className="sitemap-link-list">
                        <li>
                            <Link href={section.route} className="sitemap-link">
                                {section.title}
                            </Link>
                            <ul className="sitemap-sublist">
                                {section.pages.map(({url, title}) => (
                                    <li key={url}>
                                        <Link href={url} className="sitemap-link">
                                            {title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                </section>
            ))}

        </main>
    );
}
