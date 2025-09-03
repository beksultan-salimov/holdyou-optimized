import Image from 'next/image';
import { NewsCard } from '@/views/NewsCard';
import { EmptyCard } from '@/components/EmptyCard';
import EmptyImg from '@/static/img/empty-records.svg';

interface IProps {
  items: any[];
  t: any;
}

const PsychologistBlog = ({ items, t }: IProps) => {
  return (
    <div className="psychologist-blog">
      {!!items?.length &&
        items?.map(({ title, description, created, id, slug }: any) => (
          <NewsCard title={title} text={description} date={created} slug={slug} key={id} />
        ))}
      {!items?.length && (
        <EmptyCard
          text={t('site.psychologist_blog_empty')}
          image={<Image src={EmptyImg} alt="" />}
          style={{ height: '300px' }}
        />
      )}
    </div>
  );
};

export { PsychologistBlog };
