'use client'
import { ListItem } from '@/components/ListItem';
import { makeCls } from '@/utils/helpers';
import s from './listItems.module.scss';

interface IProps {
  className?: string;
  tag?: 'ul' | 'div';
  items?: any;
  mobileLimit?: number;
}

const ListItems = ({ tag: TagName = 'ul', items, className, mobileLimit }: IProps) => {
  return (
    <TagName className={makeCls(s, [s.list, className])}>
      {items?.length &&
        items.map((item: any, idx: number) => (
          <ListItem key={idx} className={s.item}>
            {item}
          </ListItem>
        ))}
    </TagName>
  );
};

export default ListItems;
