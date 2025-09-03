import clsx from 'clsx';

interface IProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  isArrow?: boolean;
  arrowPosition?: 'bottom-center' | 'top-center';
  className?: string;
}

const BubbleMessage = ({
  children,
  icon,
  isArrow = true,
  arrowPosition = 'bottom-center',
  className,
}: IProps) => {
  return (
    <div className={clsx(`bubble-message`, className)}>
      <div
        className={clsx(`bubble-message__inner`, {
          [`arrow-bottom-center`]: isArrow && arrowPosition === 'bottom-center',
          [`arrow-top-center`]: isArrow && arrowPosition === 'top-center',
        })}
      >
        {icon}
        {children}
      </div>
    </div>
  );
};

export { BubbleMessage };
