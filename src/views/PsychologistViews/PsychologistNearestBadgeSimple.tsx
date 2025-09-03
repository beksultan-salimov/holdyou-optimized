'use client';
import { useEffect, useState } from 'react';
import { ROUTES } from '@/config';
import { checkValidFutureDate, formatDateTime } from '@/utils/helpers';
import { Icon } from '@/components/Icon';
import { InfoBadge } from '@/components/InfoBadge';
import { Link } from '@/components/Link';

interface IProps {
  label: React.ReactNode;
  date: string;
  lang: string;
  className?: string;
  psychologistId?: number | string;
}

const PsychologistNearestBadgeSimple = ({
  date: _date,
  label,
  lang,
  className,
  psychologistId,
}: IProps) => {
  const [date, setDate] = useState<string>();

  useEffect(() => {
    if (!!_date) setDate(_date);
  }, [_date]);

  return !!date && checkValidFutureDate(date) ? (
    <InfoBadge
      icon={<Icon name="CalendarSimple" />}
      label={label}
      value={
        <Link
          href={ROUTES.psychologist(psychologistId!, '?scroll_calendar=true')}
        >
          <span className="info-badge-nearest-value info-badge-nearest-link">
            {formatDateTime({
              date: date,
              lang,
            })}
          </span>
        </Link>
      }
      className={className}
    />
  ) : null;
};

export { PsychologistNearestBadgeSimple };
