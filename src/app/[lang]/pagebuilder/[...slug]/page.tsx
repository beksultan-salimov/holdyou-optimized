'use client';
import { Metadata } from 'next';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { LangType } from '@/config/i18n/settings';
import { isEmpty, setAuthTokens } from '@/utils/helpers';
import { clientFetch } from '@/utils/service';
import { fetchUser } from '@/store/authSlice';
import { useAppDispatch } from '@/hooks/useStore';
import { Error404 } from '@/views/Error404';
import { Spinner } from '@/components/Spinner';
import './pagebuilder.scss';
import { useTitle } from '@/hooks/useTitle';
import dynamic from 'next/dynamic';

export default function PageBuilder({
  params: { lang, slug },
}: {
  params: { lang: LangType; slug: string[] };
}) {
  const slugParts = !!slug ? slug[0].split('__') : [];
  const [id, _accessToken = '', _refreshToken = '', cb_url] = slugParts;
  const accessToken = _accessToken?.substring(1);
  const refreshToken = _refreshToken?.substring(1);
  // if (!checkValidToken(token)) return <Error401 />

  const BuilderEditor = dynamic(() =>
          import('@/views/BuilderEditor').then(mod => mod.BuilderEditor),
      { ssr: false }
  );

  const dispatch = useAppDispatch();
  const [cookies, setCookie] = useCookies();
  const [isLoading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<any>();
  useEffect(() => {
    if (!!pageData && pageData?.id) {
      document.body.classList.add('pb-open');
      return () => {
        document.body.classList.remove('pb-open');
      };
    }
  }, [pageData]);
  useEffect(() => {
    if (!!id && !!accessToken && !!refreshToken && !!setCookie) {
      setAuthTokens({
        access: accessToken,
        refresh: refreshToken,
        setCookie,
      });
      getPageData({ id })
        .then((res: any) => {
          if (res?.id) {
            setPageData(res);
            dispatch(fetchUser());
          }
        })
        .catch(err => {
          setPageData(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, lang, accessToken, refreshToken, setCookie, dispatch]);

  useTitle({ title: pageData?.title + ' | Page builder' });

  if ((!accessToken || !refreshToken) && isEmpty(pageData)) {
    setPageData({ status: 401 });
  }

  if (!!pageData && !pageData.id) return <Error404 />;
  return (
    <div className="page page-pagebuilder">
      {isLoading && <Spinner className="page-spinner" />}
      {!isLoading && pageData?.id && (
        <>
          <BuilderEditor
            lang={lang}
            pageId={id}
            cbUrl={cb_url}
            pageData={pageData}
          />
        </>
      )}
    </div>
  );
}

const getPageData = async ({ id }: { id: string }) => {
  if (!id) return {};
  return clientFetch(`/admin/page/${id}`);
};
