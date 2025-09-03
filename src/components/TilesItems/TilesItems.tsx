'use client';
import clsx from 'clsx';
import './tilesItems.scss';

interface IProps {
  className?: string;
  tag?: 'ul' | 'div';
  children?: any;
}

const TilesItems = ({ className, children }: IProps) => {
  return <div className={clsx("tiles-items", className)}>{children}</div>;
};

interface IProps {
  className?: string;
  image?: React.ReactNode;
  text?: string;
}

const TilesItem = ({ image, text, className }: IProps) => {
  return (
    <div className={clsx('tiles-item', className)}>
      {image}
      {!!text && <p>{text}</p>}
    </div>
  );
};

export { TilesItems, TilesItem };
