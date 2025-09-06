import '@/static/scss/globals.scss';
import type {Metadata} from 'next';
import {Header} from '@/views/Header';
import {Footer} from '@/views/Footer'
import {AppPanelTop} from "@/views/AppPanelTop";
import {Providers} from '@/providers';
import {LangType, languages} from '@/config/i18n/settings';
import GlobalComponents from '@/views/GlobalComponents';
import {getAlternatesUrls, getDomain, getOgTagsDefault} from '@/utils/helpers';
import {getTranslationServer} from '@/config/i18n';
import {bloggerSans, ceraPro} from '@/app/fonts';
import {HeadScripts} from "@/views/HeadScripts";

interface IProps {
    params: { lang: LangType };
}

export async function generateMetadata({params}: IProps): Promise<Metadata> {
    const {lang} = params;
    const {t} = await getTranslationServer(lang, ['site']);
    const slug = '/';

    return {
        title: t('site.main_layout.seo.title'),
        description: t('site.main_layout.seo.description'),
        keywords: t('site.main_layout.seo.keywords'),
        alternates: getAlternatesUrls({slug, lang}),
        metadataBase: new URL(getDomain()),
        openGraph: {
            title: t('site.main_layout.seo.title'),
            description: t('site.main_layout.seo.description'),
            images: '/img/og_image.png',
            ...getOgTagsDefault({lang, slug}),
        },
    }
}

export default async function RootLayout({
                                             children,
                                             params: {lang},
                                         }: {
    children: React.ReactNode;
    params: { lang: LangType };
}) {
    return (
        <html lang={lang} className={`${bloggerSans.variable} ${ceraPro.variable} font-sans`}>
        <head>
            <HeadScripts />
        </head>
        <body>
        <Providers lang={lang} text={{}}>
            <div className="app-wrapper">
                <Header/>
                <main className={'main'}>{children}</main>
                <Footer/>
                <GlobalComponents lang={lang}/>
            </div>
        </Providers>
        <div id="ajax-sprite" />
        <div id="ajax-sprite-mask" />
        </body>
        </html>
    );
}

export async function generateStaticParams() {
    return languages.map((lang) => ({lang}));
}
