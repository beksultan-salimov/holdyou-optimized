import clsx from "clsx";

export type IContainerSize = 'xs' | 'xsm' | 'sm' | 'md' | 'lg' | 'xl'
interface IProps {
  size?: IContainerSize;
  className?: string;
  children: React.ReactNode;
}

const Container = ({ size = 'sm', children, className = '' }: IProps) => {
  return (
    <div className={clsx(`container container-${size}`, className)}>
      {children}
    </div>
  );
};

export { Container };
