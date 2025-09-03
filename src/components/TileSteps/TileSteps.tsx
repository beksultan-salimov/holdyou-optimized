import { makeCls } from '@/utils/helpers';
import s from './tileSteps.module.scss';
import Image from "next/image";

interface IProps {
  className?: string;
  children?: React.ReactNode;
  items?: ITileStep[];
}

interface ITileStep {
  title: string;
  text: any;
  image?: React.ReactNode;
  imgSrc?: string;
  extraText?: any;
  num: string | number;
}

const TileStep = ({
  title,
  text,
  image,
  imgSrc,
  extraText,
  num,
}: ITileStep) => {
  return (
    <div className={s.tilestep}>
      <div className={s.content}>
        <div className={s.title}>{title}</div>
        <div className={s.text} dangerouslySetInnerHTML={{ __html: text }} />
        <span className={s.num}>{num}</span>
        {extraText}
      </div>
      {(!!imgSrc || !!image) && (
        <div className={s.media}>
          {!!imgSrc && <Image src={imgSrc} alt={title} loading="lazy" />}
          {!!image && !imgSrc && image}
        </div>
      )}
    </div>
  );
};

const TileSteps = ({ children, className, items }: IProps) => {
  return (
    <div className={makeCls(s, [s.tilesteps, className])}>
      {children}
      {items?.map((item) => (
        <TileStep {...item} key={item?.num} />
      ))}
    </div>
  );
};

export { TileStep, TileSteps };
