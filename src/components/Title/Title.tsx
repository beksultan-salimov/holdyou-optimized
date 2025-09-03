import clsx from "clsx";
import { Icon } from "@/components/Icon";
// import { IconNamesType } from "@/utils/iconsSet";

interface IProps {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p';
  label?: React.ReactNode;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  // TODO fix
  // iconName?: IconNamesType;
  iconName?: any;
  className?: string;
  extraText?: React.ReactNode;
  size?:
    | 'default'
    | 'xdefault'
    | 'xxs'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'slg'
    | 'xlg';
  weight?: 'bold' | 'normal' | 'medium';
  font?: 'base' | 'cera' | 'blog';
  isCenter?: boolean;
  html?: string;
}

const Title = ({
  tag: TagName = "div",
  size = "default",
  className = "",
  iconName,
  extraText,
  children,
  label,
  weight,
  font = 'cera',
  isCenter,
  html,
  icon,
}: IProps) => {
  return (
    <div
      className={clsx(
        `title title-${size}`,
        {
          'title-center': isCenter,
          [`title-${font}`]: font,
          [`title-${weight}`]: weight,
        },
        className
      )}
    >
      {icon}
      {!!iconName && <Icon className="title-icon" name={iconName} />}
      {(!!label || !!children || !!html) &&
        (!!html ? (
          <TagName
            className="title-label"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <TagName className="title-label">{label || children}</TagName>
        ))}
      {!!extraText && <span className="title-extra">{extraText}</span>}
    </div>
  );
}

export { Title };
