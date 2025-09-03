'use client';
import { useMemo, useState } from 'react';
import Slider from 'react-slick';
import clsx from 'clsx';
import { get, isEmpty } from '@/utils/helpers';
import { PsychologistCardSimple } from '@/views/PsychologistCardSimple';
import './psychologists-carousel-home.scss';

interface IProps {
  items?: any;
  ids?: string[] | number[];
  dic?: any;
}

const PsychologistsCarouselHome = ({
  items: _items,
  ids,
  dic,
}: IProps) => {
  const items = useMemo(
    () =>
      !!_items && _items?.length > 0
        ? _items
        : !isEmpty(dic)
        ? ids?.filter((_id) => !!get(dic, [_id]))?.map((_id) => get(dic, [_id]))
        : [],
    [_items, ids, dic]
  );

  const [overflowActiveIdx, setOverflowActive] = useState(0);
  const countItems = items?.length;
  const slickSettings = {
    arrows: countItems > 1,
    dots: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    adaptiveHeight: true,
    beforeChange: (slick: any, currentSlide: any) => {
      setOverflowActive(currentSlide);
    },
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 1,
          dots: countItems > 1,
          arrows: countItems > 1,
        },
      },
    ],
  };

  if (!items || items?.length === 0) return null;

  return (
    <div className="psychologists-carousel-home has-primary-arrows has-custom-dots has-custom-overflow">
      <Slider {...slickSettings}>
        {items?.map((item: any, idx: any) => (
          <div
            className={clsx(
              'psychologists-carousel-home-item slick-overflow-item',
              {
                active: +overflowActiveIdx === +idx,
              }
            )}
            key={item?.id}
          >
            <PsychologistCardSimple
              item={item}
              type="carousel"
              isBtnOrder={true}
              isBtnDetails={true}
              isLastSchedule={true}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export { PsychologistsCarouselHome };
