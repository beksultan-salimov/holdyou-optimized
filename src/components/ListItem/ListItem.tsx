import s from './listItem.module.scss';

interface IProps {
  className?: string;
  tag?: 'p' | 'div' | 'li';
  children: string | TrustedHTML;
}

const ListItem = ({
  tag: TagName = 'li',
  children,
  className = '',
}: IProps) => {
  return (
    <TagName
      dangerouslySetInnerHTML={{ __html: children }}
      className={`${s.item} ${className}`}
    />
  );
};

export { ListItem };
