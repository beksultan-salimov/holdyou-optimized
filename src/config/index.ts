import { ROUTES } from "./routes"
// import { getI18n } from 'next-i18next';
// import { get } from '@/utils/helpers';
import MODALS from './modals';
import { ITimezones } from '@/types/TimezonesTypes';
import { get, pick } from '@/utils/helpers';
import { LangType } from "./i18n/settings";

export const expFilters: any = {
  // exp0: {
  //   type: 'exp',
  //   order: 0,
  //   value: [0,0]
  // },
  // exp1: {
  //   type: 'exp',
  //   order: 1,
  //   value: [1,3]
  // },
  junior: {
    type: 'exp',
    order: 1,
    value: [0,3]
  },
  exp2: {
    type: 'exp',
    order: 2,
    value: [4,6]
  },
  exp3: {
    type: 'exp',
    order: 3,
    value: [7,10]
  },
  exp4: {
    type: 'exp',
    order: 4,
    value: [10,100]
  },
};

export const meetFilters: any = {
  online: {
    type: 'meet',
    text: 'Онлайн',
    order: 0,
  },
  offline: {
    type: 'meet',
    text: 'Оффлайн',
    order: 0,
  },
};

export const filterTypes = ['problems', 'exp', 'approaches', 'requests', 'specialization'];

export const nearestFilterItem = {
  id: 'nearest',
  type: 'nearest',
  texts: {
    uk: 'Найближчий запис',
    ru: 'Ближайшая запись',
  },
};
export const getNearestFilterItemByLang = (lang: LangType) => {
  return { ...pick(nearestFilterItem, ['id', 'type']), text: get(nearestFilterItem, ['texts', lang], '-') };
};

export const getReminderOptions = () => {
  const items = [1, 2, 5, 12, 24];
  const options = items.map((i) => ({
    // label: getI18n().t('for_hours', { count: i }),
    value: i,
  }));
  return options;
};

export const defaultTimezones: ITimezones[] = [
  {
    name: 'Europe/Kyiv',
    countryCode: 'ua',
  },
  {
    name: 'Europe/Istanbul',
    countryCode: 'tr',
  },
  {
    name: 'Europe/Warsaw',
    countryCode: 'pl',
  },
  {
    name: 'America/Los_Angeles',
    countryCode: 'us',
  },
];

export const defaultCurrency = 'грн.';

export const PAGE_TEMPLATES = {
  POST: 'POST',
  DEFAULT: 'DEFAULT',
  SIMPLE: 'SIMPLE',
  PROBLEMS: 'PROBLEMS',
  CONSULTATIONS: 'CONSULTATIONS',
  COURSES: 'COURSES',
  DOROSLY_TEMY: 'DOROSLY_TEMY',
  PERSONALITIES: 'PERSONALITIES',
  PSY_TEST: 'PSY_TEST',
};
export type PAGE_TEMPLATES_TYPES = keyof typeof PAGE_TEMPLATES;
export const NEWS_PREFIX = 'news';
export const PAGE_PREFIX = 'page';

export const CALLBACK_SUBJECTS = {
  cooperation: 'cooperation',
  selection_specialist: 'selection_specialist',
  feedback_psychologist: 'feedback_psychologist',
  payment: 'payment',
  technical: 'technical',
  other: 'other',
  callme: 'callme',
};
export const CALLBACK_SUBJECTS_ARRAY = [
  CALLBACK_SUBJECTS.cooperation,
  CALLBACK_SUBJECTS.selection_specialist,
  CALLBACK_SUBJECTS.feedback_psychologist,
  CALLBACK_SUBJECTS.payment,
  CALLBACK_SUBJECTS.technical,
  CALLBACK_SUBJECTS.other,
];

export { MODALS, ROUTES };

export const FEATURES_TYPES = {
  Tag: 'Tag',
  Language: 'Language',
};

export const PSYCHOLOGIST_SCHEDULER_ID = 'page-psychologist-scheduler';
export const FLASH_PSYCHOLOGIST_ID = '688';
export const FAMILY_FILTERS_ID = 19;
export const FAMILY_FILTERS_QS_KEY = 'is_family'
export const JUNIOR_FILTERS_QS_KEY = 'is_junior'