import classNames from 'classnames';
import { ISpecialOffer } from '@/types/BaseTypes';
import { Button } from '@/components/Button';
import './special-offer.scss';
import Image from "next/image";

interface IProps {
  data: ISpecialOffer;
  className?: string;
}
const SpecialOffer = ({ className, data }: IProps) => {
  const { text, link_text, url, icon, is_active } = data || {}

  if (!data || !is_active) return null;
  return (
    <div className={classNames('special-offer', className)}>
      <p className="special-offer__text">
        {text}{' '}
        {!!url && !!link_text && (
          <span className="special-offer__cta">
            <Button
              href={url}
              isLang={false}
              type="link"
              iconRight={!!icon ? <Image src={icon} alt="" /> : undefined}
            >
              {link_text}
            </Button>
          </span>
        )}
      </p>
    </div>
  );
};

export { SpecialOffer };
