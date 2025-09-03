import { MODALS } from '@/config';
import { LangType } from "@/config/i18n/settings";
import { isArray, pick, showFormErrors, transformToMinutes, normalizeReviews, getPshSimpleData, keyBy } from "@/utils/helpers";
import { IService, ServiceEnum } from '@/types';
import { IOfflineCenter } from '@/types/OfflineCenterTypes';
import { INews } from "@/types/NewsTypes";
import { clientFetch, serverFetch } from "./service";


export const getNewsCarousel = async ({ lang }: { lang: LangType }) => {
  const data = await serverFetch('/page?template=POST', { lang });
  const { results: items } = data || {};
  return items?.map(({ id, title, description, slug, preview }: INews) => ({
    id,
    title,
    slug,
    description,
    cropped_main_image: preview?.thumbnail,
  }));
};


export const feedbackOfflineCentersSubmit = async ({
  formData,
  t,
  modalOpen,
}: {
  formData: any;
  t: any;
  modalOpen: any;
}) => {
  const phone = !!formData?.phone ? '+' + formData?.phone : undefined;
  const normalizedFormData = {
    ...formData,
    phone,
    subject: `Запис в офлайн центр ${formData?.address}`,
    source: typeof window !== 'undefined' ? window?.location?.href : 'OfflineCenters'
  };
  try {
    await clientFetch(`/admin/callback`, {
      method: 'POST',
      body: JSON.stringify(normalizedFormData),
    });
    modalOpen(MODALS.success, {
      title: t('offline_centers.feedback_form.success_modal.title'),
      text: t('offline_centers.feedback_form.success_modal.text'),
    });
  } catch (error: any) {
    return showFormErrors({ error, t });
  }
};


export const getReviews = async ({ lang, query }: { lang: LangType; query?: any }) => {
  const qs = !!query ? '?' + new URLSearchParams(query) : '';
  const data = await serverFetch(`/feedbacks${qs}`, {
    lang,
    next: { tags: ['all', 'reviews'] },
  });
  const items = data?.results?.map(normalizeReviews);
  return {
    ...pick(data, ['next', 'previous', 'count']),
    items,
  };
};

export const getReviewsMain = async ({ lang, query }: { lang: LangType; query?: any }) => {
  const qs = !!query ? '?' + new URLSearchParams(query) : '';
  const data = await serverFetch(`/feedbacks/main${qs}`, {
    lang,
    next: { tags: ['all', 'reviews'] },
  });
  const items = data?.map(normalizeReviews);
  return {
    items,
  };
};


export const getOfflineCenters = async ({ lang }: { lang: LangType }) => {
  return await serverFetch(`/centers`, { lang, next: { tags: ['all', 'centers'] }, });
};


export const getMainOfflineCenter = async ({ lang }: { lang: LangType }) => {
  return await serverFetch(`/centers`, { lang, next: { tags: ['all', 'centers'] }, }).then(
    (res: IOfflineCenter[]) => res[0]
  );
};


export const getPsychologists = async ({ lang }: { lang: string }) => {
  return await serverFetch(`/psychologists`, { lang });
};

export const getPsychologist = async ({ id, lang }: { id: string; lang: string }) => {
  return await serverFetch(`/psychologists/${id}`, { lang });
};

export const uploadImages = async ({ files, onError, onSuccess }: any) => {
  const formData = new FormData();
  formData.append('file', files);
  try {
    const response: any = await clientFetch(`/image`, {
      method: 'POST',
      body: formData,
      fileUpload: true,
    });
    if (response?.id) {
      typeof onSuccess === 'function' && onSuccess(response);
      return response;
    }
  } catch (error: any) {
    typeof onError === 'function' && onError(error);
  }
}

export const getServices = async ({ lang }: { lang: LangType }) => {
  return await serverFetch(`/services`, { lang, next: { tags: ['all'] } }).then((items) => {
    return !!items && isArray(items)
      ? items
          ?.sort((a, b) => a.sessions - b.sessions)
          ?.map((item: any) => ({
            ...item,
            price: (item?.price || '').split('.')[0],
            minutes: transformToMinutes(item?.duration),
            old_price: (item?.instead || '').split('.')[0],
          }))
      : [];
  });
};

export const getServicesSubscription = async ({ lang }: { lang: LangType }) => {
  return await getServices({ lang }).then(services => {
    return services?.filter((s: any) => s?.type === ServiceEnum.subscription);
  });
};

export const getServicesFirstCheckout = async ({ lang }: { lang: LangType }) => {
  return await getServices({ lang }).then((services) => {
    if (!services || !isArray(services)) return {}
    const grouped: Record<string, IService> = {};
    for (const service of services) {
      const existing = grouped[service.type];
      if (!existing || service.sessions < existing.sessions) {
        grouped[service.type] = service;
      }
    }
    return grouped;
  });
};

export const refreshCache = (tag = 'all') => {
  return fetch(`/revalidate?tag=${tag}`);
};

export const getSeoBySlug = async ({ slug, lang }: { slug: string; lang: string }) => {
  return await serverFetch(`/admin/seo/${slug}`, { lang });
};

export const getMainQuiz = async ({ lang }: { lang: LangType }) => {
  const data = await serverFetch(`/corporate/main-page/quiz`, { lang, next: { tags: ['all'] } });
  return data
};

export const getSpecialOffer = async ({ lang }: { lang: LangType }) => {
  return await serverFetch(`/corporate/main-page/banner`, { lang, next: { tags: ['all'] } }).then(res => !!res ? res?.banner : undefined);
};

export const getMainPageData = async ({ lang }: { lang: LangType }) => {
  const data = await serverFetch('/corporate/main-page', { lang, next: { tags: ['all'] }});
  const feedbacksNormalized = isArray(data?.feedbacks) ? data?.feedbacks?.map(normalizeReviews) : [];
  const psychologistsNormalized = isArray(data?.psychologists) ? data?.psychologists?.map(getPshSimpleData) : [];
  const categoriesNormalized = isArray(data?.categories_problems) ? data?.categories_problems?.sort((a: any, b: any) => a - b) : [];
  const articlesNormalized = isArray(data?.articles) ? data?.articles : [];
  // const psychologistsJuniorNormalized = isArray(data?.psychologists_junior) ? data?.psychologists_junior?.map(getPshSimpleData) : [];
  const psychologistsNearest = [...(data?.psychologists || []), ...(data?.psychologists_junior || [])]
    ?.filter((p: any) => p?.nearest_schedule)
    ?.slice(0,10)
    ?.map(getPshSimpleData)

  return {
    psychologistsCount: data?.count_psychologists,
    categoriesProblems: categoriesNormalized,
    psychologistsDic: keyBy(psychologistsNormalized, (e: any) => e.id),
    articlesDic: keyBy(articlesNormalized, (e: any) => e.id),
    feedbacksDic: keyBy(feedbacksNormalized, (e: any) => e.id),
    psychologistsNearest,
  };
};

export const getJuniorPsychologists = async ({ lang }: { lang: LangType }) => {
  const psychologists = await serverFetch(`/psychologists`, { lang });
  const result = psychologists
    .filter((p: any) => p.is_junior === true)
    .map(getPshSimpleData);

  return result;
};