'use client'
import Slider from 'react-slick';
import './psychologists-carousel.scss';
import { Button } from '@/components/Button';
import { ROUTES } from '@/config';
import { Link } from '@/components/Link';

interface IProps {
  items: any;
}

const PsychologistsCarousel = ({ items }: IProps) => {
  if (!items) return null;

  const slickSettings = {
    dots: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="psychologists-carousel has-custom-arrows">
      <Slider {...slickSettings}>
        {items?.map(({ id, photo, fullname, description }: any) => (
          <div className="psychologists-carousel-item" key={id}>
            <div className="psychologists-carousel-card">
              <Link href={ROUTES.psychologist(id)} className="psychologists-carousel-card__link">
                <div className="psychologists-carousel-card__media">
                  {photo?.thumbnail && <img src={photo?.thumbnail} alt={fullname} />}
                </div>
                <div className="psychologists-carousel-card__body">
                  <h4 className="psychologists-carousel-card__name">
                    {fullname}
                  </h4>
                  <p className="psychologists-carousel-card__text">
                    {description}
                  </p>
                </div>
              </Link>
              <div className="psychologists-carousel-card__footer">
                <Button href={ROUTES.psychologist(id)} type="primary" size="xs" weight='bold'>Записатися</Button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export { PsychologistsCarousel };
