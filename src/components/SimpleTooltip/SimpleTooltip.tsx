import clsx from 'clsx';

interface IProps {
  children: React.ReactNode;
  tooltip?: React.ReactNode;
  className?: string;
}

const SimpleTooltip = ({ children, className, tooltip }: IProps) => {
  return (
    <span className={clsx(`simple-tooltip`, className)}>
      <span className="simple-tooltip-label">{children}</span>
      <span className="simple-tooltip-bubble">{tooltip}</span>
    </span>
  );
};

export { SimpleTooltip };
