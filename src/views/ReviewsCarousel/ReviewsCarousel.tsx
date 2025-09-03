'use client'
import Slider from 'react-slick';
import './reviews-carousel.scss';

interface IReview {
  id: number | string;
  comment: string;
  userName: string
}
interface IProps {
  items: any;
}

// @DEPRECATED: unused
const ReviewsCarousel = ({ items }: IProps) => {
  if (!items) return null;

  const slickSettings = {
    dots: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="reviews-carousel">
      <Slider {...slickSettings}>
        {items?.map(({ id, comment, userName }: any) => (
          <div className="reviews-carousel-item" key={id}>
            <div className="reviews-carousel-card">
              <div className="reviews-carousel-card__wrapper">
                <p className="reviews-carousel-card__text">{comment}</p>
              </div>
              <div className="reviews-carousel-card__footer">
                <span className="reviews-carousel-card__name">{userName}</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export { ReviewsCarousel };
