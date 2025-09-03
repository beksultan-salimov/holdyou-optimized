'use client';
import { Suspense } from 'react';
import { IPsychologist } from '@/types/PsychologistTypes';
import { NeedAuthBlock } from './NeedAuthBlock';
import { useLang } from '@/hooks/useLang';
import { useTranslationClient } from '@/config/i18n/client';
import { Spinner } from '@/components/Spinner';
import { useModals } from '@/hooks/useModals';
import { PsychologistCheckout } from './PsychologistCheckout';
import { useAuth } from '@/hooks/useAuth';

interface IProps {
  psychologist: IPsychologist;
  id: number | string;
}

const PsychologistCheckoutWrapper = ({ psychologist, id }: IProps) => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);
  const { modalOpenRegister } = useModals();
  const { isAuthLoading, isAuth } = useAuth();
  const titleAuthBlock = t('site.need_auth_for_record')

  return (
    <div className="psychologist-schedule">
      {isAuthLoading ? (
        <Spinner />
      ) : isAuth ? (
        <Suspense>
          <PsychologistCheckout psychologist={psychologist} id={id} />
        </Suspense>
      ) : (
        <NeedAuthBlock onClickAuth={modalOpenRegister} title={titleAuthBlock} />
      )}
    </div>
  );
};

export { PsychologistCheckoutWrapper };
