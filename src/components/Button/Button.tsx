import clsx from 'clsx';
import { Spinner } from '../Spinner';
import { Link } from '../Link';

interface IProps {
  className?: string;
  children?: React.ReactNode;
  type?:
    | 'default'
    | 'primary'
    | 'primary-old'
    | 'dashed'
    | 'link-old'
    | 'link'
    | 'text'
    | 'accent'
    | 'simple'
    | 'white'
    | 'custom';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  danger?: boolean;
  isLang?: boolean;
  icon?: any;
  iconRight?: any;
  href?: string;
  htmlType?: 'button' | 'submit';
  weight?: 'bold' | 'normal' | 'medium';
  shadow?: boolean;
  isFull?: boolean;
  radius?: number;
  font?: 'base' | 'cera'
}

const Button = ({
  children,
  className = '',
  type = 'default',
  size = 'md',
  disabled,
  onClick,
  loading,
  htmlType = 'button',
  href,
  isLang = true,
  weight = 'normal',
  shadow,
  danger,
  icon,
  iconRight,
  isFull,
  font,
  ...props
}: IProps) => {
  const cls = clsx(
    `btn btn--${type} btn--${size} btn--${weight}`,
    { shadow, danger, 'btn--full': isFull, [`btn--${font}`]: !!font },
    className
  );
  const child = (
    <>
      {loading && <span className="btn__spinner"><Spinner /></span>}
      <span className="btn__label">{children}</span>
    </>
  );

  if (!!href) return (
    <Link href={href} isLang={isLang} className={cls}>
      {icon}
      {child}
      {iconRight}
    </Link>
  );
  return (
    <button
      className={cls}
      onClick={onClick}
      disabled={disabled}
      type={htmlType}
      {...props}
    >
      {icon}
      {child}
      {iconRight}
    </button>
  );
};

export { Button };