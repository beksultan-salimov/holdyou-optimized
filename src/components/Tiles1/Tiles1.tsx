'use client'
import s from './tiles1.module.scss';

interface IProps {
  className?: string;
  items?: any[];
  image?: React.ReactNode;
  showDeafultImage?: boolean
}

const Tiles1 = ({ items, className, image, showDeafultImage = true }: IProps) => {
  return (
    <div className={s.tiles}>
      {items?.map((text: any, idx: number) => (
        <div className={s.item} key={idx}>
          {!!showDeafultImage && !image && (
            <img
              src="/img/icons/minus-circle.svg"
              className={s.icon}
              alt="-"
            />
          )}
          {image}
          <div className={s.text}>{text}</div>
        </div>
      ))}
    </div>
  );
};

export { Tiles1 };
