import clsx from "clsx"

interface IProps {
  tag?: 'div' | 'span' | 'p' | 'li';
  children?: any;
  className?: string;
  style?: object;
  isBg?: boolean;
  isCenter?: boolean;
  isBorderLeft?: boolean;
  size?: 'small' | 'middle' | 'large' | '18';
  color?: 'default' | 'secondary';
}

const Text = ({
  tag: TagName = "div",
  size = "large",
  className = "",
  children,
  isBg,
  isCenter,
  isBorderLeft,
  color = "default",
  style,
}: IProps) => {
  return (
    <TagName
      style={style}
      className={clsx(
        `text text-size-${size} text-color-${color} ${className}`,
        {
          'is-bg': isBg,
          'is-center': isCenter,
          text__border_left: isBorderLeft,
        }
      )}
    >
      {children}
    </TagName>
  );
}

export { Text }
