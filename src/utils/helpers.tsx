import intersection from 'lodash/intersection'
import dayjs from 'dayjs';
import get from 'lodash/get';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import keyBy from 'lodash/keyBy';
import throttle from 'lodash/throttle';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';
import { FORM_ERROR } from 'final-form';
import { FEATURES_TYPES, NEWS_PREFIX, PAGE_PREFIX, PAGE_TEMPLATES, PAGE_TEMPLATES_TYPES, ROUTES } from '@/config';
import { LangType, defaultLng } from '@/config/i18n/settings';
// import { getI18n } from 'react-i18next';
dayjs.extend(utc);
dayjs.extend(timezone);

export {
  get,
  isEmpty,
  omit,
  pick,
  isArray,
  isFunction,
  uniq,
  uniqBy,
  intersection,
  keyBy,
  throttle,
};

export const makeCls = (obj: Record<string, string>, arr: Array<string | undefined> = []) => {
  return arr
    .join(' ')
    .split(' ')
    .reduce((a: string, c: string, idx) => {
      const divider = a?.length === 0 && idx === 0 ? '' : ' ';
      const cls = c.startsWith('m_') ? c.replace('m_', '') : c;
      if (!c) return a
      if (!obj[cls] || !c.startsWith('m_')) return a + divider + [c];
      return a + divider + obj[cls];
    }, '');
};

export const getDate = (
  date?: string | Date,
  format = 'DD.MM.YYYY HH:mm',
  tz = 'Europe/Kiev'
) => {
  return !!date
    ? tz
      ? dayjs(date).tz(tz).format(format)
      : dayjs(date).format(format)
    : '-';
};

export const convertBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const getOffsetTimezone = (timezone: string, options: { digits?: 2 | 4 } = {}) => {
  let offset = dayjs.tz(new Date(), timezone).format("Z")
  const { digits } = options || {}

  if (digits === 2) {
    const twoDigits = offset.split(":")[0]
    offset = twoDigits.slice(0, 1) + Number(twoDigits.slice(-2))
  }
  return offset;
}

export const transformToMinutes = (str?: string) => {
  if (!str) return 0;
  const timeArr = str.split(':');
  return Number(timeArr[0]) * 60 + Number(timeArr[1]);
};

export const getIntegerFromString = (str: string) => {
  return !!str ? str.toString().split('.')[0] : '';
};

export const addError = (obj: any = {}, field: string, message: string) => {
  let errors = { ...obj };
  if (!obj[field]) errors[field] = [];
  errors[field].push(message);
  return errors;
};

export const normalizeConsultations = (arr = []) => {
  return arr.reduce((a: any, c: any) => {
    a[c.service_type] = c;
    return a;
  }, {});
};

export const getFileName = (url: string) => {
  const arr = url.split('/');
  return arr?.length > 0 ? arr[arr.length - 1] : url;
};

/**
 * Normalize data as byId, allIds
 * @param {Object} source - Data
 * @returns {Object} - byId, allIds
 */
export const normalize = (source: any[]): object => {
  if (isEmpty(source)) return { byId: {}, allIds: [] };

  return {
    byId: keyBy(source, (e) => e.id),
    allIds: source.map((k) => k.id),
  };
};

/**
 * Normalize data by key as byId, allIds
 * @param {Object} source - Data
 * @param {String} key
 * @returns {Object} - byId, allIds
 */
export const normalizeByKey = (source: any, key: string): object => {
  if (!source) return {};
  const data = key ? get(source, [key], []) : source;

  return normalize(data);
};

export const splitIntoRows = (str: string) => {
  if (!str) return '';
  return str
    .replace(new RegExp('\r?\n', 'g'), '<br />')
    // .replaceAll('<br /><br />', '<br />');
};

export const removeAuthCookies = () => {
  const cookies = new Cookies();
  cookies.remove('access_token', { path: '/'});
  cookies.remove('refresh_token', { path: '/'});
}

interface IJWT {
  token_type?: string;
  exp: number;
  iat?: number;
  jti?: string;
  user_id?: number;
}
export const jwtDecode = (token: string) => {
  if (!token) return {}
  const decoded: IJWT = jwt_decode(token);
  return decoded;
};

export const setAuthTokens = ({
  access,
  refresh,
  setCookie,
}: {
  access: string;
  refresh: string;
  setCookie: any;
}) => {
  try {
    const jwtDecoded: any = jwtDecode(access);
    if (!!jwtDecoded) {
      const cookieExpiresDate = new Date(jwtDecoded.exp * 1000);
      setCookie('access_token', access, {
        path: '/',
        expires: cookieExpiresDate,
      });
      setCookie('refresh_token', refresh, {
        path: '/',
        expires: cookieExpiresDate,
      });
    }
  } catch (err) {}
};

export const showFormErrors = ({ error, t }: { error: any, t: any }) => {
  if (error?.errors) {
    if (
      error?.errors?.detail ||
      error?.errors?.non_field_errors ||
      error?.message
    ) {
      return {
        [FORM_ERROR]:
          error?.errors?.detail ||
          error?.errors?.non_field_errors ||
          t('site.default_error_message'),
      };
    }
    return error?.errors;
  }
  return { [FORM_ERROR]: t('site.default_error_message') };
};

export const minifyString = (str: string) =>
  str
    .replace(/([^0-9a-zA-Z\.#])\s+/g, '$1')
    .replace(/\s([^0-9a-zA-Z\.#]+)/g, '$1')
    .replace(/;}/g, '}')
    .replace(/\/\*.*?\*\//g, '');

export const getLocalePrefix = (locale: LangType) => {
  const localePrefix = locale === defaultLng ? '' : `/${locale}`;
  return localePrefix;
};

export const getAlternatesUrls = ({
  slug,
  lang,
  prefixSlug,
  canonical,
  isLanguages = true,
}: {
  lang: LangType;
  slug: string;
  prefixSlug?: string;
  canonical?: string;
  isLanguages?: boolean;
}) => {
  if (!slug) return {};
  const localePrefix = getLocalePrefix(lang);
  const slugPrefix = !!prefixSlug ? '/' + prefixSlug : '';
  const _slug = slug === '/' && localePrefix !== defaultLng ? ' ' : `/${slug}`;
  const obj:any = {
    canonical: canonical || `${localePrefix}${slugPrefix}${_slug}`,
  }
  if (isLanguages) {
    obj.languages = {
      'uk-UA': `${slugPrefix}${_slug}`,
      'ru-RU': `/ru${slugPrefix}${_slug}`,
    };
  }
  return obj
};

export const generateNewsLink = (locale: LangType, slug: string) => {
  return `/${NEWS_PREFIX}/${slug}`;
};
export const generatePageLink = (locale: LangType, slug: string) => {
  // const localePrefix = getLocalePrefix(locale);
  // return `${localePrefix}/${PAGE_PREFIX}/${slug}`;
  return `/${PAGE_PREFIX}/${slug}`;
};
export const generatePagePreviewLink = ({
  slug,
  template,
  locale,
}: {
  slug: string;
  template: PAGE_TEMPLATES_TYPES;
  locale: LangType;
}) => {
  const localePrefix = getLocalePrefix(locale);
  const typePrefix = template === PAGE_TEMPLATES.POST ? NEWS_PREFIX : PAGE_PREFIX;
  return `${localePrefix}/${typePrefix}/${slug}`;
};

export const getDomain = (suffix = '') => {
  return process.env.NEXT_PUBLIC_URL + suffix;
};

export const getSiteName = () => 'HoldYou';

export const getOgLocale = (lang: LangType) => {
  return lang === 'uk' ? 'uk_UA' : 'ru_RU';
};

export const getOgTagsDefault = ({
  lang,
  slug,
  prefixSlug = '',
}: {
  lang: LangType;
  slug: string;
  prefixSlug?: string;
}) => {
  const localePrefix = getLocalePrefix(lang);
  const prefix = !!prefixSlug ? '/' + prefixSlug : '';
  return {
    url: localePrefix + prefix + '/' + slug,
    type: 'website',
    siteName: getSiteName(),
    locale: getOgLocale(lang),
  };
};

export const makeFilterProblemId = (id: string | number) => {
  return 'pr_' + id;
};

export const isJsonString = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export const normalizePhoneNumber = (phone: string) => {
  return !!phone ? '+' + phone : undefined;
}

export const getPshFilterData = (arr: any) => {
  return isArray(arr)
    ? arr?.reduce((a: any, c: any) => {
        a[c.type] = [...(a[c.type] || []), c];
        return a;
      }, {})
    : {};
}

export const getPshSimpleData = (p: any) => {
  return {
    ...omit(p, [
      'filter_ids',
      'help_with',
      'work_principles',
      'values',
      'life_credo',
      'keywords',
      'seo_title',
      'seo_description',
      // 'nearest_schedule',
    ]),
    filter_data: getPshFilterData(p.filter_ids),
  };
}

export const normalizeReviews = (item: any) => ({
  ...pick(item, ['id', 'comment', 'grade', 'tags', 'created_at']),
  userName: item?.user?.fullname,
  userDescription: item?.user?.description,
  userAvatar: item?.user?.photo?.xs,
  psychologistName: item?.psychologist?.fullname,
  psychologistId: typeof item?.psychologist === 'number' ? item?.psychologist : item?.psychologist?.id,
});

export const sortByDate = (a: string, b: string) => {
  return new Date(a)?.getTime() - new Date(b)?.getTime();
}

export const getPshAvatarAndLink = (psh: any) => ({
  img: get(psh, ['photo', 'sm'], ''),
  title: get(psh, ['fullname'], ''),
  link: ROUTES.psychologist(psh?.id),
});

export const formatDateTime = ({ date, lang, divider = ', ' }: { date: string, lang: string, divider?: string }) => {
  if (!date) return '';
  const _date = dayjs(date);
  const today = dayjs().startOf("day");
  const tomorrow = today.add(1, "day");
  const yesterday = today.subtract(1, 'day');
  const texts = {
    ru: {
      today: 'сегодня',
      tomorrow: 'завтра',
      yesterday: 'вчера',
    },
    uk: {
      today: 'сьогодні',
      tomorrow: 'завтра',
      yesterday: 'вчора',
    },
  };

  if (_date.isSame(today, "day")) {
    return get(texts, [lang, 'today'], '') + divider + _date.format("HH:mm");
  } else if (_date.isSame(tomorrow, "day")) {
    return get(texts, [lang, 'tomorrow'], '') + divider + _date.format("HH:mm");
  } else if (_date.isSame(yesterday, "day")) {
    return get(texts, [lang, 'yesterday'], '') + divider + _date.format('HH:mm');
  } else {
    return _date.format(`DD.MM.YYYY${divider}HH:mm`);
  }
}

export const checkTouchScreen = () => {
  if (typeof window !== 'undefined') {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches
    );
  }
  return false;
};

export const normalizeFeatures = (features: any) => {
  const featuresList = features?.filter(
    (i: any) => i?.type === FEATURES_TYPES.Tag
  );
  const languagesList = features?.filter(
    (i: any) => i?.type === FEATURES_TYPES.Language
  );
  return { featuresList, languagesList };
}

export const getDeviceType = (userAgent: string) => {
  const isMobile = /android.*mobile|iphone|ipod/i.test(userAgent);
  const isTablet = /ipad|android(?!.*mobile)/i.test(userAgent);
  const isDesktop = !isMobile && !isTablet;

  return { isMobile, isTablet, isDesktop };
};

export const getScreenWidth = () => {
  if (typeof window === 'undefined') return 1920;
  return window.innerWidth
}

export const createSuccessPayUrl = (backUrl: string) => {
  return `https://holdyou.net/pay/success?success_url=${btoa(encodeURIComponent(backUrl))}`;
}

export const checkValidFutureDate = (date: string) => {
  if (!date) return false;
  const dateToCheck = new Date(date);
  const now = new Date();
  if (!(dateToCheck instanceof Date) || isNaN(dateToCheck.getTime())) {
    return false;
  }
  return dateToCheck > now;
}