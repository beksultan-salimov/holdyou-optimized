import clsx from 'clsx';
import './properties-items.scss';

interface IProps {
  className?: string;
  items: any[];
}

const PropertiesItems = ({ items = [], className }: IProps) => {
  if (!items?.length) return null
  return (
    <ul className={clsx('properties-items', className)}>
      {items.map((item, idx) => !item?.isHidden && (
        <li
          className={clsx('properties-item', {
            'is-bold': item?.isBold,
            'is-icon': !!item?.icon,
            [`properties-item--${item?.key}`]: !!item?.key
          })}
          style={{ color: item?.color }}
          key={item?.key || idx}
        >
          {item?.icon && (
            <span className="properties-item__icon">{item?.icon}</span>
          )}
          {item?.text && (
            <span className="properties-item__text">{item?.text}</span>
          )}
        </li>
      ))}
    </ul>
  );
};

export { PropertiesItems };
