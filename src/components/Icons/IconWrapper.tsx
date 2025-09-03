'use client'
import { useMemo } from 'react';
import clsx from 'clsx';

interface IProps {
  children: React.ReactNode;
  className?: string;
  size?: number;
  style?: {};
  onClick?: any;
}

const IconWrapper = ({
  children,
  className,
  size,
  style,
  onClick,
  ...props
}: IProps) => {
  const styles = useMemo(() => {
    const _styles: any = !!style ? { ...style } : {};
    if (size) {
      _styles['fontSize'] = `${size}px`;
    }
    return _styles;
  }, [style, size]);

  const handleClick = () => {
    typeof onClick === 'function' && onClick();
  };

  return (
    <span
      className={clsx('anticon', className)}
      role="img"
      onClick={handleClick}
      style={styles || null}
      {...props}
    >
      {children}
    </span>
  );
};

export { IconWrapper };
