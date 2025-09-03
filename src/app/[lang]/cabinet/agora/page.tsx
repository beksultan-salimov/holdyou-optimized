'use client';
import dynamic from 'next/dynamic';
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ROUTES } from '@/config';
import { useSelector } from 'react-redux';
import { get } from '@/utils/helpers';
import { useAppDispatch } from '@/hooks/useStore';
import { fetchAgoraConsultation, getAgoraConsultation, getAgoraConsultationErrors, getAgoraConsultationLoading } from '@/cabinet/store/agoraSlice';
import { Spinner } from '@/components/Spinner';
import { Page } from '@/cabinet/components/Page';
import '@/cabinet/views/Agora/agora.scss';

const AgoraAllManager = dynamic(() => import('@/cabinet/views/Agora/AgoraManager'), {
  ssr: false,
});

const AgoraPage = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const consultationId = searchParams.get('id');
  const redirectUrl = ROUTES.cabinet;

  useEffect(() => {
    document?.body?.classList.add('body-agora');
    return () => {
      document?.body?.classList.remove('body-agora');
    };
  }, []);

  useEffect(() => {
    !!consultationId && dispatch(fetchAgoraConsultation(consultationId));
  }, [consultationId, dispatch]);

  const data: any = useSelector(getAgoraConsultation);
  const isLoading = useSelector(getAgoraConsultationLoading);
  const pageErrors = useSelector(getAgoraConsultationErrors);

  const { psychologist, agora_credentials, user } = data || {};
  const psychologistFullname = get(psychologist, 'fullname', '');
  // const psychologistPhoto = get(psychologist, ['photo', 'sm'], emptyUserImage);
  // const userPhoto = get(user, 'photo', emptyUserImage);
  const userFullName = get(user, 'fullname', '');
  const { token, app_id, chanel_name, user_id } = agora_credentials || {};
  const isLoaded = !!app_id && !!chanel_name && !!token;

  const config = useMemo(
    () => ({
      uid: Number(user_id) || 0,
      appId: app_id,
      channelName: chanel_name,
      rtcToken: token,
      // TODO: For test
      // uid: 100,
      // appId: app_id,
      // channelName: 'test301',
      // rtcToken: null,
    }),
    [user_id, app_id, chanel_name, token]
  );

  const ownerUser = useMemo(
    () => ({
      name: psychologistFullname,
      short_name: psychologistFullname?.charAt(0),
      // photo: psychologistPhoto,
    }),
    [psychologistFullname]
  );

  const clientUser = useMemo(
    () => ({
      name: userFullName,
      short_name: userFullName?.charAt(0),
      // photo: userPhoto,
    }),
    [userFullName]
  );

  return (
    <Page slug="agora" title={'Agora'}>
      <div className="agora-page">
        {isLoading && <Spinner />}
        {!!pageErrors && (
          <div className="agora-page-errors">{JSON.stringify(pageErrors)}</div>
        )}
        {isLoaded && (
          <AgoraAllManager
            config={config}
            redirectUrl={redirectUrl}
            clientUser={ownerUser}
            ownerUser={clientUser}
            psychologist={psychologist}
            consultationId={consultationId}
          />
        )}
      </div>
    </Page>
  );
};

export default AgoraPage;
