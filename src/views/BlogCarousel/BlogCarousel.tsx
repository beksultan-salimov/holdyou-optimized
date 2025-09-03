'use client';
import { ROUTES } from '@/config/routes';
import Image from 'next/image';
import Slider from 'react-slick';
import { Link } from '@/components/Link';
import './blog-carousel.scss';

interface IPost {
  id: number | string;
  title: string;
  cropped_main_image?: string;
  slug: string;
  description: string;
}
interface IProps {
  items: any;
}

const BlogCarousel = ({ items }: IProps) => {
  if (!items) return null;

  const slickSettings = {
    dots: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="blog-carousel">
      <Slider {...slickSettings}>
        {items?.map(
          ({ id, title, slug, description, cropped_main_image }: IPost) => (
            <div className="blog-carousel-item" key={id}>
              <div className="blog-carousel-card">
                <div className="blog-carousel-card__media">
                  {!!cropped_main_image && (
                    <Image
                      loading="lazy"
                      className="imageBlog"
                      src={cropped_main_image}
                      alt={title}
                      fill
                      objectFit="cover"
                    />
                  )}
                </div>
                <div className="blog-carousel-card__content">
                  <Link
                    className="blog-carousel-card__title"
                    href={ROUTES.newsSingle(slug)}
                  >
                    {title}
                  </Link>
                  <div className="blog-carousel-card__text">
                    {description}
                  </div>
                  <Link
                    className="blog-carousel-card__more"
                    href={ROUTES.newsSingle(slug)}
                    aria-label="Read more"
                  />
                </div>
              </div>
            </div>
          )
        )}
      </Slider>
    </div>
  );
};

export { BlogCarousel };
