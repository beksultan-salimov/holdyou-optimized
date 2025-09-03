'use client';
import { useMemo } from 'react';
import clsx from 'clsx';

interface IProps {
  size?: number;
  center?: boolean;
  className?: string;
}

const Spinner = ({ size = 20, center = false, className = '' }: IProps) => {
  const styles = useMemo(() => ({ fontSize: size }), [size]);

  return (
    <span
      className={clsx(`spinner ${className}`, { center: center })}
      style={styles}
    />
  );
};

export { Spinner };
