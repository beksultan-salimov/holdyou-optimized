import Image from 'next/image';
import { EmptyCard } from '@/components/EmptyCard';
import { ReviewCard } from '@/views/ReviewCard';
import EmptyImg from '@/static/img/empty-records.svg';

interface IProps {
  items: any;
  t: any;
}

const PsychologistReviews = ({ items, t }: IProps) => {
  return (
    <div className="psychologist-reviews">
      {!!items?.length && !!items && (
        <div className="psychologist-reviews-items">
          {items?.map(({ name, comment, id }: any) => (
            <ReviewCard title={name} text={comment} key={id} />
          ))}
        </div>
      )}
      {!items?.length && (
        <EmptyCard
          text={t('site.psychologist_reviews_empty')}
          image={<Image src={EmptyImg} alt="" />}
          style={{ height: '300px' }}
        />
      )}
    </div>
  );
};

export { PsychologistReviews };
