'use client';
import { Suspense } from 'react';
import Image from 'next/image';
import { ROUTES } from '@/config';
import { useLang } from '@/hooks/useLang';
import { useTranslationClient } from '@/config/i18n/client';
import { IPsychologist } from '@/types/PsychologistTypes';
import { useSchedule } from '@/hooks/useSchedule';
import { Title } from '@/components/Title';
import { Spinner} from '@/components/Spinner';
import { Button } from '@/components/Button';
import { EmptyCard } from '@/components/EmptyCard';
import { Text } from '@/components/Text';
import { Scheduler } from '@/views/Scheduler';
import EmptyImg from '@/static/img/empty-records.svg';

interface IProps {
  psychologist: IPsychologist;
  id: number | string;
  t: any;
}

const PsychologistSchedule = ({ id }: IProps) => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);

  const psychologistId = id;
  const {
    isLoadedScheduler,
    hasScheduler,
    selectedSchedule,
    psychologistScheduler,
  } = useSchedule({ psychologistId });

  return (
    <div className="psychologist-schedule">
      <div className="checkout-content">
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
              <Title iconName="CalendarCheck" className="checkout-block-title">
                {t('site.scheduler.title')}
              </Title>
              <Text>{t('site.scheduler.help')}</Text>
              <Suspense>
                <Scheduler scheduler={psychologistScheduler} />
              </Suspense>
            </div>

            {!!selectedSchedule && (
              <Button
                href={ROUTES.checkout(psychologistId)}
                type="primary"
                size="md"
                weight="bold"
                className="btn-schedule-checkout"
              >
                {t('site.enroll')}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export { PsychologistSchedule };
