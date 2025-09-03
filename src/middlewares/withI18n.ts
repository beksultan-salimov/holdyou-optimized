import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from 'next/server';
import { MiddlewareFactory } from './types';
import { defaultLng, languages } from '@/config/i18n/settings';

export const withI18n: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    const searchParams = request.nextUrl.searchParams;

    let params = '';
    searchParams.forEach((value, key) => {
      params = `${params ? `${params}&` : '?'}${key}=${value}`;
    });


    let lng = defaultLng;

    if (
      pathname.indexOf('icon') > -1 ||
      pathname.indexOf('chrome') > -1 ||
      pathname.startsWith('/_next')
    ) {
      return next(request, _next);
    }

    languages.forEach(loc => {
      if (pathname.startsWith(`/${loc}/`) || pathname.endsWith(`/${loc}`)) {
        lng = loc;
      }
    });

    if (pathname.startsWith(`/${defaultLng}`)) {
      return NextResponse.redirect(
        new URL(
          pathname.replace(`/${defaultLng}`, '/').replace('//', '/') + params,
          request.url
        ), 301
      );
    }

    if (lng === defaultLng) {
      return NextResponse.rewrite(
        new URL(`/${lng}${pathname}${params}`, request.url)
      );
    }

    return next(request, _next);
  };
};
