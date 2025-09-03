'use client'
import clsx from 'clsx';
import s from './stars.module.scss';


interface IProps {
  className?: string;
  value?: number;
  onSelect?: (val: number) => void;
  isClickable?: boolean;
}

const Stars = ({ className, value, onSelect, isClickable }: IProps) => {
  const grades = isClickable ? [5, 4, 3, 2, 1] : [1, 2, 3, 4, 5];
  const handleClick = (i: number) => {
    if (typeof onSelect === 'function' && isClickable) {
      onSelect(i);
    }
  };

  return (
    <div className={clsx(s.items, className, { [s.clickable]: isClickable })} data-value={value}>
      {grades.map((i: number) => (
        <span
          key={i}
          onClick={() => handleClick(i)}
          className={`${s.item} ${
            Number(value) >= i ? s.item_fill : s.item_empty
          }`}
        />
      ))}
    </div>
  );
};

export { Stars };
