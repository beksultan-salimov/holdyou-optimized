import clsx from "clsx";
import Image from "next/image";

interface IProps {
  src?: string;
  className?: string;
  children?: React.ReactNode;
  shape?: 'circle' | 'square';
}
const Avatar = ({ src, children, shape = 'circle', className }: IProps) => {
  return (
    <div className={clsx(`avatar avatar-${shape}`, className)}>
      {!!children && <div className="avatar-label">{children}</div>}
      {!!src && <Image className="avatar-image" src={src} alt="User" />}
    </div>
  );
};

export { Avatar }