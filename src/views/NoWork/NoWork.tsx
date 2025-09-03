import clsx from 'clsx';
import './no-work.scss';

interface IProps {
  title?: any;
  items?: string[];
  className?: string;
}

const NoWork = ({ title, items, className }: IProps) => {
  return (
    <div className={clsx('no-work', className)}>
      {!!title && (
        <div
          className="no-work__title"
          dangerouslySetInnerHTML={{ __html: title }}
        />
      )}
      {!!items && items?.length > 0 && (
        <ul className="no-work__items">
          {items?.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { NoWork };
