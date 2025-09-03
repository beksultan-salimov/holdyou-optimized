import Cookies from 'universal-cookie';
import { defaultLng } from '@/config/i18n/settings';
import { isEmpty, jwtDecode } from '@/utils/helpers';

export const serverFetch = async (
  path: string,
  {
    headers = {},
    fileUpload,
    isPage,
    query,
    lang = defaultLng,
    ...options
  }: any = {}
) => {
  const url = process.env.NEXT_API_SERVER_URL! + process.env.NEXT_API_URL! + path;
  const userToken = undefined; // TODO fixme
  // console.log('url', url);
  // const cookies = new Cookies();

  const allHeaders = {
    Accept: 'application/json',
    ...headers,
    Host: process.env.NEXT_SERVER_DOMAIN,
    "X-Forwarded-Proto": process.env.NEXT_SERVER_PROTOCOL,
  };

  if (!fileUpload) {
    allHeaders['Content-Type'] = 'application/json';
  }
  if (userToken) {
    allHeaders['Authorization'] = `Bearer ${userToken}`;
  }

  if (lang) {
    allHeaders['Accept-Language'] = lang;
  }

  const res = await fetch(url, {
    headers: allHeaders,
    next: { tags: ['all'] },
    ...options,
  });
  const contentType = res.headers.get('content-type');
  // const contentLang = res.headers.get('Accept-Language');

  if (!contentType || !contentType.includes('application/json')) {
    // throw new TypeError('Ошибка на сервере. JSON!');
    return { status: 500, error: 'Ошибка на сервере. JSON!' };
  }
  // if (!res.ok) {
  //   throw new Error('Failed to fetch data');
  // }

  return res.json();
};

let refreshingToken = false;
export const clientFetch = async (
  path: string,
  { headers = {}, fileUpload, isPage, query, ...options }: any = {}
) =>
  new Promise(async (resolve, reject) => {
    let url = '/api' + path;
    const cookies = new Cookies();
    let accessToken = cookies.get('access_token');
    let refreshToken = cookies.get('refresh_token');
    let langFromCookie = cookies.get('django_language');

    const allHeaders = {
      Accept: 'application/json',
      ...headers,
    };

    if (!fileUpload) allHeaders['Content-Type'] = 'application/json';
    if (langFromCookie) {
      allHeaders['Accept-Language'] = langFromCookie || defaultLng;
    }
    if (accessToken) {
      allHeaders['Authorization'] = `Bearer ${accessToken}`;
    }

    if (accessToken && !refreshingToken) {
      const jwtDecoded: any = jwtDecode(accessToken);
      if (!!jwtDecoded) {
        if (Date.now() + 180 >= jwtDecoded.exp * 1000) {
          refreshingToken = true;
          const response = await fetch('/api/users/token/refresh', {
            headers: allHeaders,
            method: 'POST',
            body: JSON.stringify({ refresh: refreshToken }),
          });
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            if (response.ok) {
              const newTokens = await response.json();
              if (newTokens) {
                const jwtDecoded:any = jwtDecode(newTokens?.access);
                if (!!jwtDecoded) {
                  const cookieExpiresDate = new Date(jwtDecoded.exp * 1000);
                  cookies.set('access_token', newTokens?.access, {
                    path: '/',
                    expires: cookieExpiresDate,
                  });
                  cookies.set('refresh_token', newTokens?.refresh, {
                    path: '/',
                    expires: cookieExpiresDate,
                  });
                  accessToken = newTokens?.access;
                  if (accessToken) {
                    allHeaders['Authorization'] = `Bearer ${accessToken}`;
                  }
                }
              }
            }
          } else {
            console.log('Server error when fetch token refresh: 500');
          }
        }
        refreshingToken = false;
      }
    }

    if (!isEmpty(query)) {
      url += '?' + new URLSearchParams(query).toString();
    }

    return fetch(url, {
      headers: allHeaders,
      ...options,
    })
      .then(async (res) => {
        const contentType = res.headers.get('content-type');
        if (res.status !== 204 && (!contentType || !contentType.includes('application/json'))) {
          return Promise.reject({
            message: 'Ошибка на сервере. JSON!',
            status: 500,
          });
        }
        if (res.ok) {
          if (res.statusText !== 'No Content') {
            return await res.json();
          }
          return Promise.resolve({});
        }
        if (res.status === 401) {
          if (accessToken) {
            cookies.remove('access_token', { path: '/' });
            cookies.remove('refresh_token', { path: '/' });
          }
          return Promise.reject({
            message: 'Authentificate error',
            errors: await res.json(),
            status: res.status,
          });
        } else if (res.status === 404) {
          return Promise.reject({
            message: 'Page not found',
            errors: {},
            status: res.status,
          });
        } else {
          return Promise.reject({
            errors: await res.json(),
            status: res.status,
          });
        }
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject({ ...error });
      });
  });
