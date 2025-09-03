import { Metadata } from 'next';
import { headers } from 'next/headers';
import {
  FAMILY_FILTERS_QS_KEY,
  JUNIOR_FILTERS_QS_KEY,
  PAGE_TEMPLATES,
  ROUTES,
  expFilters,
  meetFilters,
  nearestFilterItem,
} from '@/config';
import { getTranslationServer } from '@/config/i18n';
import { LangType } from '@/config/i18n/settings';
import { serverFetch } from '@/utils/service';
import { getSeoBySlug, getServicesSubscription } from '@/utils/services';
import {
  get,
  getAlternatesUrls,
  getDeviceType,
  getOgTagsDefault,
  getPshFilterData,
  isEmpty,
} from '@/utils/helpers';
import { Title } from '@/components/Title';
import { Section } from '@/components/Section';
import { PsychologistsAndFilters } from '@/views/PsychologistsList/PsychologistsFilters';
import { Breadcrumbs } from '@/views/Breadcrumbs';
import { FeedbackSection } from '@/views/FeedbackSection';
import { BlogHome } from '@/views/BlogHome';
import { Tariffs } from '@/views/Tariffs';
import './psychologists.scss';
import {Button} from "@/components/Button";
import {Link} from "@/components/Link";

export const revalidate = 10;

interface IProps {
  params: { lang: LangType };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const slug = 'psychologists';
  const { lang } = params;
  const { t } = await getTranslationServer(lang, ['site']);
  const pageSeo = !!slug && (await getSeoBySlug({ lang, slug }));
  const { title, description, keywords } = pageSeo || {};

  return {
    title: title || t('site.psychologists.seo.title'),
    description: description || t('site.psychologists.seo.description'),
    keywords: keywords || t('site.psychologists.seo.keywords'),
    alternates: getAlternatesUrls({ slug, lang }),
    openGraph: {
      title: title || t('site.psychologists.seo.title'),
      description: description || t('site.psychologists.seo.description'),
      ...(getOgTagsDefault({ lang, slug }) || {}),
    },
  };
}

export default async function Psychologists({
  params: { lang },
  searchParams,
}: IProps) {
  const filters = await getFilters({ lang });
  let page = searchParams['page'];
  if (Array.isArray(page) || typeof page === 'undefined') {
    page = '1'
  }
  const psychologists = await getPsychologists({ lang, page });
  const news = await getNews({ lang });
  const servicesSubscription = await getServicesSubscription({ lang });
  const { t } = await getTranslationServer(lang, ['site']);

  const is_junior = get(searchParams, [JUNIOR_FILTERS_QS_KEY]);
  const is_family = get(searchParams, [FAMILY_FILTERS_QS_KEY]);
  const qsFilters = { is_family, is_junior };

  const userAgent = headers().get('user-agent') || '';
  const { isMobile } = getDeviceType(userAgent);

  return (
    <div className="page page-psychologists">
      <section className="page-psychologists-main">
        <div className="container container-md">
          <Breadcrumbs
            items={[
              {
                label: t('site.breadcrumbs.psychologists'),
                link: ROUTES.psychologists,
              },
            ]}
          />
          <Title
            tag="h1"
            size="sm"
            className="page-psychologists__title"
          >
            {t('site.psychologists.title')}
          </Title>
          <PsychologistsAndFilters
            filters={filters}
            psychologists={psychologists}
            qsFilters={qsFilters}
            isMobile={isMobile}
          />
        </div>
        <div className="container container-md pagination-row">
          <Link href="/psychologists?page=1">
            <Button type={ page === '1' ? 'primary-old' : 'default' }>1</Button>
          </Link>
          <Link href="/psychologists?page=2">
            <Button type={ page === '2' ? 'primary-old' : 'default' }>2</Button>
          </Link>
        </div>
      </section>

      <Section
        className="page-psychologists-prices"
        id="hn-prices"
        container="sm"
      >
        <Title
          tag="h3"
          size="xlg"
          className="page-psychologists-prices__title"
          isCenter
        >
          {t('site.abonement.title')}
        </Title>
        <p className="page-psychologists-prices__subtitle">
          {t('site.abonement.subtitle')}
        </p>

        <Tariffs
          services={servicesSubscription}
          isVisiblePromocode={false}
          viewType="accent"
          isCarousel
          isTabs={false}
          isAbonementFooterInfo
        />
      </Section>

      <Section className="page-psychologists-blog" container="md">
        <Title
          tag="h4"
          size="lg"
          className="page-psychologists-blog__title"
          isCenter
        >
          {t('site.blog_title')}
        </Title>
        <BlogHome items={news} />
      </Section>

      <FeedbackSection className="page-psychologists-feedback" />
    </div>
  );
}

const getPsychologists = async ({ lang, page }: { lang: LangType, page: string }) => {
  return await serverFetch(`/psychologists?page=${page}`, {
    lang,
    next: { cache: 'no-store' },
  }).then(async (data: any) => {
    const res = data?.map((item: any) => {
      const expYears = item.experience_years;
      const isJunior = item.is_junior;
      const filterIds = item.filter_ids?.map((i: any) => i.id);

      Object.keys(meetFilters).forEach((m) => {
        if (item[m]) filterIds.push(m);
      });

      Object.keys(expFilters).forEach((m) => {
        if (m === 'junior' && isJunior) {
          filterIds.push(m);
        } else if (
          expYears <= expFilters[m].value[1] &&
          expYears >= expFilters[m].value[0]
        ) {
          filterIds.push(m);
        }
      });

      if (item?.nearest_schedule?.id) {
        filterIds.push(nearestFilterItem.id);
      }

      return {
        ...item,
        filter_ids: filterIds,
        filter_data: getPshFilterData(item.filter_ids),
      };
    });
    return res;
  });
};

const getFilters = async ({ lang }: { lang: LangType }) => {
  const { t } = await getTranslationServer(lang, ['site']);

  return await serverFetch('/filters', {
    lang,
    next: { tags: ['all', 'filters'], cache: 'no-store' },
  }).then(async (data: any) => {
    const availableFilters = data?.filter((item: any) => !!item.is_active);
    const exps = Object.keys(expFilters).map((id: any) => ({
      id,
      ...expFilters[id],
      text: t(`site.exps.${id}`),
    }));
    const meets = Object.keys(meetFilters).map((id: any) => ({
      id,
      ...meetFilters[id],
    }));
    return [...(availableFilters || []), ...exps, ...meets];
  });
};

const getNews = async ({
  lang,
  query,
}: {
  lang: LangType;
  query?: any;
}) => {
  const qs = !isEmpty(query) ? '&' + new URLSearchParams(query) : '';
  return await serverFetch(`/page?template=${PAGE_TEMPLATES.POST}${qs}`, {
    lang,
    next: { cache: 'no-store' },
  }).then((res) => {
    if (res?.results) {
      return res?.results?.slice(0, 3);
    }
  });
};
