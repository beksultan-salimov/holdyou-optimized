// import { IconNamesType } from "@/utils/iconsSet"
import { Icon } from '@/components/Icon';
import clsx from 'clsx';
import Image from "next/image";

interface IProps {
  className?: string;
  label?: React.ReactNode;
  text?: React.ReactNode;
  // TODO fix
  // iconName?: IconNamesType
  iconName?: any;
  icon?: React.ReactNode;
  extra?: React.ReactNode;
  image?: string;
  isRounded?: boolean;
  isSimple?: boolean;
  avatarSize?: number;
  colorText?: string;
  avatarType?: 'default' | 'primary';
}

const InfoItem = ({
  className = '',
  label,
  text,
  iconName,
  icon,
  image,
  extra,
  isRounded,
  isSimple,
  avatarSize = 40,
  colorText,
  avatarType,
}: IProps) => {
  const styles = {
    '--media-size': `${avatarSize}px`,
  } as React.CSSProperties;

  const stylesText = {
    color: colorText || undefined,
  };

  return (
    <div
      className={clsx(`info-item ${className}`, {
        'info-item-with-image': !!image,
        'info-item-rounded': isRounded,
        'info-item-simple': isSimple,
        [`avatar-size-${avatarSize}`]: !!avatarSize,
        [`avatar-type-${avatarType}`]: !!avatarType,
      })}
      style={styles}
    >
      <div className="info-item-inner">
        <div className="info-item-media">
          {!!image && !icon && <Image src={image} alt="" />}
          {!image && !icon && !!iconName && (
            <Icon name={iconName} className="info-item-icon" />
          )}
          {icon}
        </div>
        <div className="info-item-body">
          <div className="info-item-content">
            {!!label && <div className="info-item-label">{label}</div>}
            {!!text && (
              <div className="info-item-text" style={stylesText}>
                {text}
              </div>
            )}
          </div>
          {!!extra && <div className="info-item-extra">{extra}</div>}
        </div>
      </div>
    </div>
  );
};

export { InfoItem };
