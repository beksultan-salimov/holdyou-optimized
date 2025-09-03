'use client';
import { useCallback } from 'react';
import { Icon } from '@/components/Icon';
import { InfoBadge } from '@/components/InfoBadge';
import { ScrollLink } from '@/components/ScrollLink';
import { PSYCHOLOGIST_SCHEDULER_ID } from '@/config';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { selectNearestSchedule } from '@/store/checkoutSlice';
import { getPsychologistSchedulerNearest } from '@/store/psychologistSlice';
import { checkValidFutureDate, formatDateTime } from '@/utils/helpers';

interface IProps {
  label: React.ReactNode;
  lang: string;
}

const PsychologistNearestBadge = ({ label, lang }: IProps) => {
  const nearestSchedule = useAppSelector(getPsychologistSchedulerNearest);
  const dispatch = useAppDispatch();
  const handleClick = useCallback(() => {
    dispatch(selectNearestSchedule());
  }, [dispatch]);

  if (
    !nearestSchedule ||
    !checkValidFutureDate(nearestSchedule?.start_datetime)
  )
    return false;

  return (
    <div className="psychologist-content__nearest__wrapper">
      <InfoBadge
        icon={<Icon name="CalendarSimple" />}
        label={label}
        value={
          <ScrollLink
            href={`#${PSYCHOLOGIST_SCHEDULER_ID}`}
            offset={-30}
          >
            <span
              className="info-badge-nearest-value info-badge-nearest-link"
              onClick={handleClick}
            >
              {formatDateTime({
                date: nearestSchedule?.start_datetime,
                lang,
              })}
            </span>
          </ScrollLink>
        }
        className="psychologist-content__nearest__badge"
      />
    </div>
  );
};

export { PsychologistNearestBadge };
