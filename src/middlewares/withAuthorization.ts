import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { MiddlewareFactory } from './types';

export const withAuthorization: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    const token = request.cookies.get('access_token')?.value;
    // console.log('::Middleware withAuthorization token:: ', token);

    if (['/cabinet', '/ru/cabinet']?.some((path) => pathname.startsWith(path))) {
      if (!token) {
        // console.log('::Middleware withAuthorization Redirect without token::', token);
        const url = new URL(`/`, request.url);
        return NextResponse.redirect(url);
      }
    }
    return next(request, _next);
  };
};
