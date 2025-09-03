'use client';
import { useMemo } from 'react';
import clsx from 'clsx';
// import { IconNamesType, IconsMap } from '@/utils/iconsSet';

interface IIcon {
  name: any
  // name: IconNamesType;
  className?: string;
  size?: number;
  onClick?: any;
  style?: {};
  children?: React.ReactNode;
}

const Icon = ({
  children,
  className = '',
  name,
  onClick,
  size,
  style,
  ...props
}: IIcon) => {
  // const TagName = IconsMap[name];
  // console.log('name-TagName', name, TagName);
  const handleClick = () => {
    typeof onClick === 'function' && onClick();
  };
  const styles: any = useMemo(() => {
    const _styles: any = !!style ? { ...style } : {};
    if (size) {
      _styles['fontSize'] = `${size}px`;
    }
    return _styles;
  }, [style, size]);

  return (
    <span
      role="img"
      className={clsx(`anticon`, {
        [className]: !!className,
      })}
      onClick={handleClick}
      style={styles || null}
      {...props}
    >
      {/* {!!TagName && <TagName />} */}
      {/* {children} */}
      <svg>
        <use href={`#${name}`} />
      </svg>
    </span>
  );
};

export { Icon };
