'use client';
// import { useEffect, useState } from 'react';
import { IPsychologist } from '@/types/PsychologistTypes';
import { NeedAuthBlock } from './NeedAuthBlock';
import { PsychologistSchedule } from './PsychologistSchedule';
import { useLang } from '@/hooks/useLang';
import { useTranslationClient } from '@/config/i18n/client';
// import { useCookies } from 'react-cookie';
import { Spinner } from '@/components/Spinner';
import { useModals } from '@/hooks/useModals';
import { useAuth } from '@/hooks/useAuth';

interface IProps {
  psychologist: IPsychologist;
  id: number | string;
  isCheckout?: boolean;
}

const PsychologistScheduleWrapper = ({ psychologist, id }: IProps) => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);
  const { modalOpenRegister } = useModals();
  // const [authStatus, setAuthStatus] = useState<'loading' | 'auth' | 'no-auth'>('loading');
  // const [cookies] = useCookies(['access_token']);
  // const { access_token } = cookies || {};

  // useEffect(() => {
  //   setAuthStatus(access_token ? 'auth' : 'no-auth');
  // }, [access_token]);
  const { isAuthLoading, isAuth } = useAuth();
  const titleAuthBlock = t('site.need_auth_for_scheduler');

  return (
    <div className="psychologist-schedule">
      {isAuthLoading ? (
        <Spinner />
      ) : isAuth ? (
        <PsychologistSchedule psychologist={psychologist} id={id} t={t} />
      ) : (
        <NeedAuthBlock onClickAuth={modalOpenRegister} title={titleAuthBlock} />
      )}
    </div>
  );
};

export { PsychologistScheduleWrapper };
