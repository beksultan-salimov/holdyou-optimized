import { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';
import { MiddlewareFactory } from './types';
import { defaultLng, languages } from '@/config/i18n/settings';

export const withHeaders: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const res:any = await next(request, _next);

    const pathname = request.nextUrl.pathname;
    let lng = defaultLng;
    languages.forEach((loc) => {
      if (pathname.startsWith(`/${loc}/`) || pathname.endsWith(`/${loc}`)) {
        lng = loc;
      }
    });

    if (res) {
      res.cookies.set('django_language', lng);
    }

    // console.log('::Middleware withHeaders lng:: ', lng);
    // console.log('::Middleware withHeaders res:: ', res);

    return res;
  };
};
