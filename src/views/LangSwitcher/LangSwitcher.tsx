'use client';
import { usePathname } from 'next/navigation';
import { defaultLng, languages } from '@/config/i18n/settings';
import { useLang } from '@/hooks/useLang';
import { Link } from '@/components/Link';

interface IProps {
  className?: string;
}

const getLangLink = (url: string, lang: string) => {
  let pathname = url;

  languages?.forEach((loc) => {
    if (url.startsWith(`/${loc}`)) {
      pathname = url.replace(`/${loc}`, '/').replace('//', '/');
    }
  });

  const _lang = lang === defaultLng ? '' : '/' + lang;
  let fullPath = _lang + pathname;

  // Remove trailing slash unless it's just "/"
  if (fullPath.length > 1 && fullPath.endsWith('/')) {
    fullPath = fullPath.slice(0, -1);
  }

  return fullPath;
};

const langLabelNormalize = (lang: any) => lang === 'uk' ? 'ua' : lang;
const LangSwitcher = ({ className = '' }: IProps) => {
  const { lang: currentLang } = useLang();
  const basePathname = usePathname();

  return (
    <ul className={className}>
      {languages?.map((lang) => (
        <li key={lang}>
          {currentLang !== lang ? (
            <Link
              href={getLangLink(basePathname as string, lang)}
              isLang={false}
            >
              {langLabelNormalize(lang)}
            </Link>
          ) : (
            langLabelNormalize(lang)
          )}
        </li>
      ))}
    </ul>
  );
};

export { LangSwitcher };
