import "./reviewCard.scss";
import { FC, memo } from 'react';

interface IProps {
  title?: React.ReactNode;
  text?: React.ReactNode;
}

const ReviewCard = ({ title, text }: IProps) => {
  return (
    <div className="review-card">
      <div className="review-card-inner">
        {!!title && <div className="review-card-title">{title}</div>}
        {!!text && <div className="review-card-text">{text}</div>}
      </div>
    </div>
  );
};

export default memo(ReviewCard);