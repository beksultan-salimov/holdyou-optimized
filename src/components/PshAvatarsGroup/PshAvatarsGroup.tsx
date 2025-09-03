import clsx from 'clsx';
import { IPshAvatarGroup } from '@/types/BaseTypes';
import { Link } from '@/components/Link';
import Image from 'next/image';
import { get } from '@/utils/helpers';

interface IProps {
  items: IPshAvatarGroup[];
  extra?: React.ReactNode;
  size?: number;
  isScaleAvatars?: boolean;
  isCustomExtra?: boolean;
}

const PshAvatarsGroup = ({
  items,
  extra,
  size = 36,
  isScaleAvatars,
  isCustomExtra,
}: IProps) => {
  const stylesItem = {
    height: size,
    width: size,
    backgroundImage: isCustomExtra ? `url(${get(items, [0, 'img'])})` : undefined,
  };
  return (
    <div className="psh-avatars-group">
      {!!items &&
        items?.map((item, idx) => (
          <PshAvatarsGroupItem
            key={idx}
            stylesItem={stylesItem}
            item={item}
            isScaleAvatars={isScaleAvatars}
          />
        ))}
      {!!extra && (
        <div
          className={clsx(
            'psh-avatars-group__item psh-avatars-group__item--extra',
            { 'is-custom': isCustomExtra }
          )}
          style={stylesItem}
        >
          <span>{extra}</span>
        </div>
      )}
    </div>
  );
};

const PshAvatarsGroupItem = ({ item, stylesItem, isScaleAvatars }: {item: IPshAvatarGroup, stylesItem: React.CSSProperties, isScaleAvatars?: boolean}) => {
  const child = (
    <Image
      src={item?.img}
      alt="психолог"
      className={clsx({ 'is-scale': isScaleAvatars })}
      height={100}
      width={100}
      loading='lazy'
    />
  )

  return (
    <div className="psh-avatars-group__item" style={stylesItem}>
      {!!item?.link ? <Link href={item?.link} title={item?.title}>{child}</Link> : child}
    </div>
  );
};

export { PshAvatarsGroup };
