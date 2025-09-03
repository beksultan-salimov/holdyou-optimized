import clsx from 'clsx';
import { Container } from '../Container';

interface IProps {
  container?: 'xs' | 'xsm' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  id?: string;
  children: React.ReactNode;
  tag?: 'section' | 'div';
}

const Section = ({
  container,
  children,
  className,
  tag: TagName = 'section',
  id,
}: IProps) => {
  const child = !!container ? <Container size={container}>{children}</Container> : children
  return (
    <TagName
      // className={clsx(className, {
      //   // [`container-${container}`]: container,
      // })}
      className={className}
      id={id}
    >
      {child}
    </TagName>
  );
};

export { Section };
