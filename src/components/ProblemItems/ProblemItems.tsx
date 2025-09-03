import { makeCls } from '@/utils/helpers';
import { ProblemItem } from './ProblemItem';
import s from './problemItems.module.scss';

interface IProps {
  className?: string;
  items: any[];
}

const ProblemItems = ({ items = [], className }: IProps) => {
  return (
    <div className={makeCls(s, [s.list, className])}>
      {items?.length > 0 &&
        items.map((item, idx) => (
          <div className={s.item} key={idx}>
            <ProblemItem data={item} />
          </div>
        ))}
    </div>
  );
};

export { ProblemItems };
