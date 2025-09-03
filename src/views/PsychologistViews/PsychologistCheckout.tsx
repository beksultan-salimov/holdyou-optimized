'use client';
import { Suspense, useEffect } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { useTranslationClient } from '@/config/i18n/client';
import { useLang } from '@/hooks/useLang';
import { useAuth } from '@/hooks/useAuth';
import { useCheckout, useSchedule } from '@/hooks/useSchedule';
import { IPsychologist } from '@/types/PsychologistTypes';
import { Title } from '@/components/Title';
import { Spinner } from '@/components/Spinner';
import { InfoMessage } from '@/components/InfoMessage';
import { EmptyCard } from '@/components/EmptyCard';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { Scheduler } from '@/views/Scheduler';
import { PromocodeModal } from '@/views/PromocodeModal';
import { TariffsCheckoutContainer } from '@/views/Tariffs/Tariffs';
import { ConsultationTypes } from './ConsultationTypes';
import CheckoutResume from './CheckoutResume';
import { CheckoutSuccessModal } from './CheckoutSuccessModal';
import EmptyImg from '@/static/img/empty-records.svg';
import { useSearchParams } from 'next/navigation';
import { PSYCHOLOGIST_SCHEDULER_ID } from '@/config';

interface IProps {
  psychologist: IPsychologist;
  id: number | string;
  type?: 'default' | 'in_psh';
}

const PsychologistCheckout = ({
  psychologist,
  id,
  type = 'default',
}: IProps) => {
  const psychologistId = id;
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);
  const { isLoadedScheduler, hasScheduler, psychologistScheduler } = useSchedule({ psychologistId });
  const { hasConsultation, allowedConsultations } = useCheckout({ psychologist });
  const { isAuth } = useAuth();
  const searchParams = useSearchParams();
  const isScrollToCalendar = searchParams?.get('scroll_calendar');
  const offsetTop = 30;

  useEffect(() => {
    if (isScrollToCalendar) {
      window.scrollTo({
        top: Number(document.getElementById(PSYCHOLOGIST_SCHEDULER_ID)?.offsetTop) - offsetTop,
        behavior: 'smooth',
      });
    }
  }, [isScrollToCalendar, offsetTop])

  return (
    <div className={clsx('checkout-content', { [`type-${type}`]: type })}>
      {!isLoadedScheduler && <Spinner />}
      {!hasScheduler && !!isLoadedScheduler && (
        <EmptyCard
          text={t('site.scheduler.empty')}
          image={<Image src={EmptyImg} alt="" />}
          style={{ height: '300px' }}
        />
      )}
      {!!hasScheduler && !!isLoadedScheduler && (
        <>
          <div className="checkout-block checkout-scheduler">
            <Title
              iconName={type === 'default' ? 'CalendarCheck' : undefined}
              icon={
                type === 'in_psh' ? (
                  <div className="checkout-block-title-icon">
                    <Icon
                      name="Badge1"
                      className="checkout-block-title-icon__bg"
                    />
                    <Icon
                      name="UserCircle"
                      className="checkout-block-title-icon__main"
                    />
                  </div>
                ) : null
              }
              className="checkout-block-title"
            >
              {t('site.scheduler.title')}
            </Title>
            <Text className="checkout-block-subtitle">
              {t('site.scheduler.help')}
            </Text>
            <Suspense>
              <Scheduler
                scheduler={psychologistScheduler}
                type={type}
                isAuth={isAuth}
                psychologistId={psychologistId}
                allowedConsultations={allowedConsultations}
              />
            </Suspense>
          </div>

          {isAuth && type !== 'in_psh' && (
            <div className="checkout-block checkout-consultation">
              <Title
                iconName={type === 'default' ? 'MessageBubble' : undefined}
                className="checkout-block-title"
              >
                {t('site.checkout.consultation_type.title')}
              </Title>

              {!!hasConsultation && (
                <ConsultationTypes
                  allowedConsultations={allowedConsultations!}
                  psychologist={psychologist}
                />
              )}

              {!hasConsultation && (
                <>
                  <InfoMessage
                    title={t('site.checkout.alert.no_consultation.title')}
                    text={t('site.checkout.alert.no_consultation.text')}
                    iconName="AlertBubble"
                  />

                  <TariffsCheckoutContainer psychologistId={psychologistId} />
                </>
              )}
            </div>
          )}

          {!!hasConsultation && isAuth && type !== 'in_psh' && (
            <div className="checkout-block checkout-block-confirm">
              <Title
                iconName={type === 'default' ? 'CheckoutCircle' : undefined}
                className="checkout-block-title"
              >
                {t('site.checkout.confirm.title')}
              </Title>
              <CheckoutResume
                name={psychologist?.fullname}
                image={psychologist?.photo?.sm}
              />
            </div>
          )}
        </>
      )}
      <PromocodeModal />
      <CheckoutSuccessModal />
    </div>
  );
};

export { PsychologistCheckout };
