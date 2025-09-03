import clsx from "clsx";

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
      {!!src && <img className="avatar-image" src={src} alt="User" />}
    </div>
  );
};

export { Avatar }