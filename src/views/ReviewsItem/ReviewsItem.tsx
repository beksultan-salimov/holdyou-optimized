import { Stars } from '@/components/Stars';
import s from './reviewsItem.module.scss';

interface IProps {
  data: any,
  t: any
}

const ReviewsItem = ({ data, t }: IProps) => {
  const { userName, comment, grade, psychologistName } = data || {};

  return (
    <div className={s.item}>
      <div className={s.header}>
        <div className={s.name}>{userName}</div>
        <Stars value={grade} className={s.stars} />
        <div className={s.psh}>
          <b>{t('site.psh')}: </b>
          {psychologistName}
        </div>
      </div>
      <div className={s.body}>{comment}</div>
    </div>
  );
};

export { ReviewsItem };
