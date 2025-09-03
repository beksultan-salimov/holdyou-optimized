import { PsychologistCard } from '../PsychologistCard';
import { EmptyPsychologistsList } from './EmptyPsychologistsList';
import './psychologistsList.scss';

interface IProps {
  items?: any[];
  className?: string;
  isOfflinePage?: boolean;
  visibleCount?: number;
}

const PsychologistsList = ({
  items,
  className = '',
  isOfflinePage,
  visibleCount,
}: IProps) => {
  return (
    <div className={`psh-list-wrapper ${className}`}>
      {!!items?.length && (
        <div className="psh-list">
          {items?.map((item: any, idx: number) => (
            <PsychologistCard
              item={item}
              key={item?.id || idx}
              isOfflinePage={isOfflinePage}
              isHidden={item.isHidden}
            />
          ))}
        </div>
      )}
      {(!items?.length || visibleCount === 0) && <EmptyPsychologistsList />}
    </div>
  );
};

export { PsychologistsList };
