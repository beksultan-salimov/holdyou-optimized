export type LangType = typeof languages[number];
// export const defaultLng: LangType = 'uk';
export const defaultLng: LangType = process.env.NEXT_PUBLIC_DEFAULT_LANG as LangType;
export const languages = [defaultLng, 'ru'] as ['uk', 'ru'];
export const defaultNS = 'site'

export function getOptions (lng = defaultLng, ns:string | string[] = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng: defaultLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
    returnObjects: true,
  };
}
