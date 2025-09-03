import { PshAvatarsGroup } from '@/components/PshAvatarsGroup';
import { IPshAvatarGroup } from '@/types/BaseTypes';

interface IProps {
  avatars: IPshAvatarGroup[];
  extraAvatar?: React.ReactNode;
  avatarSize?: number;
  label?: React.ReactNode;
  btn?: React.ReactNode;
  layout?: 'vertical' | 'horizontal';
  isScaleAvatars?: boolean;
  isCustomExtra?: boolean;
}

const PshGroupItem = ({
  avatars = [],
  extraAvatar,
  avatarSize,
  label,
  btn,
  layout = 'vertical',
  isScaleAvatars,
  isCustomExtra,
}: IProps) => {
  return (
    <div className={`psh-group-item psh-group-item--${layout}`}>
      {!!avatars && avatars?.length > 0 && (
        <div className="psh-group-item__avatars">
          <PshAvatarsGroup
            items={avatars}
            extra={extraAvatar}
            size={avatarSize}
            isScaleAvatars={isScaleAvatars}
            isCustomExtra={isCustomExtra}
          />
        </div>
      )}
      <div className="psh-group-item__content">
        {!!label && <div className="psh-group-item__label">{label}</div>}
        {!!btn && <div className="psh-group-item__link">{btn}</div>}
      </div>
    </div>
  );
};

export { PshGroupItem };
