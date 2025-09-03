import { getServerSideSitemap } from 'next-sitemap';
import { serverFetch } from '@/utils/service';
import { generatePagePreviewLink, getDomain } from '@/utils/helpers';
import { languages } from '@/config/i18n/settings';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  async function fetchAllPages(_languages: any) {
    let urls: any = [];

    const pushIntoArray = (arr: Array<any>) => {
      arr?.forEach((e) => {
        urls.push({
          loc: getDomain(
            `${generatePagePreviewLink({
              slug: e?.slug,
              template: e?.template,
              locale: e?.locale,
            })}`
          ),
          lastmod: new Date(e?.updated).toISOString(),
        });
      });
    };

    for (const lang of _languages) {
      let res = await serverFetch('/page', { lang, next: { tags: ['all'], revalidate: 0 } });
      if (res?.count > 0) {
        pushIntoArray(res?.results);
        for (let i = 2; i <= Math.ceil(res?.count / res?.size); i++) {
          res = await serverFetch(`/page?page=${i}`, { lang, next: { tags: ['all'], revalidate: 0 } });
          pushIntoArray(res?.results);
        }
      }
    }

    return urls;
  }

  const urls = await fetchAllPages(languages);

  return getServerSideSitemap(urls)
}
