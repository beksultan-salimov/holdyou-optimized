'use client'
import NextLink from 'next/link';
import { ComponentProps } from 'react';
import { defaultLng } from '@/config/i18n/settings';
import { useLang } from '@/hooks/useLang';

type LinkProps = ComponentProps<typeof NextLink> & {
  isLang?: boolean;
  href: string;
};

// https://github.com/amannn/next-intl/blob/main/packages/next-intl/src/shared/BaseLink.tsx
const Link = (
  { href, isLang = true, children, ...rest }: LinkProps,
  ref: LinkProps['ref']
) => {
  const { lang } = useLang();
  let localizedHref = isLang && lang !== defaultLng ? `/${lang}${href}` : `${href}`;
  if (localizedHref.endsWith('/') && lang === defaultLng) {
    localizedHref = localizedHref.substring(0, localizedHref.length - 1);
  }

  return (
    // <NextLink href={localizedHref} {...rest}>{children}</NextLink>
      <a href={localizedHref} {...rest}>{children}
      </a>
  );
};

export { Link }
