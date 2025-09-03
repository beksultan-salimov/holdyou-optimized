'use client';
import { Suspense, useCallback } from 'react';
import { PsychologistNearestBadge } from './PsychologistNearestBadge';
import { PSYCHOLOGIST_SCHEDULER_ID } from '@/config';
import { ScrollLink } from '@/components/ScrollLink';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { useAppDispatch } from '@/hooks/useStore';
import { selectNearestSchedule } from '@/store/checkoutSlice';

const PsychologistNearestBadgeWrapper = ({ btnLabel, ...props }:any) => {
  const dispatch = useAppDispatch();
  const handleClick = useCallback(() => {
    dispatch(selectNearestSchedule());
  }, [dispatch])

  return (
    <>
      <Suspense>
        <PsychologistNearestBadge {...props} />
      </Suspense>
      <ScrollLink
        href={`#${PSYCHOLOGIST_SCHEDULER_ID}`}
        offset={-30}
      >
        <Button
          type="link"
          iconRight={<Icon name="DashRightOutline" />}
          className="psychologist-content__nearest__btn-cta"
          onClick={handleClick}
        >
          {btnLabel}
        </Button>
      </ScrollLink>
    </>
  );
};

export { PsychologistNearestBadgeWrapper };
