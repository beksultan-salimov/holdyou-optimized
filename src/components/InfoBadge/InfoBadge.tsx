import clsx from 'clsx';
import './info-badge.scss';

interface IProps {
  className?: string;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  value?: React.ReactNode;
  type?: 'default' | 'primary';
  isCenter?: boolean;
  isValueUnderline?: boolean;
}

const InfoBadge = ({
  icon,
  label,
  value,
  type = 'default',
  className = '',
  isCenter,
  isValueUnderline,
}: IProps) => {
  return (
    <div
      className={clsx(`info-badge info-badge--${type} ${className}`, {
        'is-center': isCenter,
      })}
    >
      <span className="info-badge__inner">
        {!!icon && <span className="info-badge__icon">{icon}</span>}
        <span className="info-badge__content">
          {!!label && <span className="info-badge__label">{label}</span>}
          {!!value && (
            <span
              className={clsx('info-badge__value', {
                'is-underline': isValueUnderline,
              })}
            >
              {' '}
              {value}
            </span>
          )}
        </span>
      </span>
    </div>
  );
};

export { InfoBadge };
