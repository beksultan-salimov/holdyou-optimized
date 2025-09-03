import clsx from 'clsx';
import Image from 'next/image';
import { INews } from '@/types/NewsTypes';
import { Link } from '@/components/Link';
import { ROUTES } from '@/config';
import './relatedPosts.scss';

interface IRelatedPosts {
  items: INews[];
  className?: string;
  title?: React.ReactNode;
}

const RelatedPost = ({ preview, title, description, slug }: INews) => (
  <div className="related-post">
    <Link href={ROUTES.newsSingle(slug)}>
      <div className="related-post__inner">
        <div className="related-post__media">
          {!!preview?.thumbnail && <Image src={preview?.thumbnail} alt={title} fill objectFit="cover" />}
        </div>
        <div className="related-post__content">
          {!!title && <h4 className="related-post__title">{title}</h4>}
          {!!description && <p className="related-post__text">{description}</p>}
        </div>
      </div>
    </Link>
  </div>
);

const RelatedPosts = ({ items, title, className }: IRelatedPosts) => {
  return (
    <div className={clsx('related-posts', className)}>
      {!!title && <div className="related-posts__title">{title}</div>}
      {items?.length && (
        <div className="related-posts__items">
          {items.map((item: INews, idx: number) => (
            <RelatedPost key={idx} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export { RelatedPosts, RelatedPost };
