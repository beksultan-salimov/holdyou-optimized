import { NextFetchEvent, NextRequest } from 'next/server';
import { MiddlewareFactory } from './types';

export const withLogging: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    // console.log('::Middleware withLogging log:: ', request.nextUrl.pathname);
    return next(request, _next);
  };
};
