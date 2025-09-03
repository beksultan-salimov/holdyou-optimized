'use client';
import { useMemo, useState } from 'react';
import Slider from 'react-slick';
import clsx from 'clsx';
import { ROUTES } from '@/config';
import { useTranslationClient } from '@/config/i18n/client';
import { get, getDate, isEmpty } from '@/utils/helpers';
import { useLang } from '@/hooks/useLang';
import { Stars } from '@/components/Stars';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import './reviews-carousel-home.scss';
import Image from "next/image";

interface IProps {
  items?: any;
  ids?: string[] | number[];
  dic?: any;
  isCounter?: boolean;
  isShowBtnPsh?: boolean;
}

const ReviewsCarouselHome = ({
  items: _items,
  ids,
  dic,
  isCounter,
  isShowBtnPsh = true,
}: IProps) => {
  const items = useMemo(
    () =>
      !!_items && _items?.length > 0
        ? _items
        : !isEmpty(dic)
        ? ids?.filter((_id: any) => !!get(dic, [_id]))?.map((_id: any) => get(dic, [_id]))
        : [],
    [_items, ids, dic]
  );
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);
  const [overflowActiveIdx, setOverflowActive] = useState(0);
  const isMoreOne = items?.length > 1;
  const slickSettings = {
    dots: isMoreOne,
    arrows: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    adaptiveHeight: true,
    beforeChange: (slick: any, currentSlide: any) => {
      setOverflowActive(currentSlide);
    },
  };
  if (isEmpty(items)) return null;

  return (
    <div className="reviews-carousel-home has-primary-arrows has-primary-dots has-custom-overflow">
      <Slider {...slickSettings}>
        {items?.map(
          (
            {
              id,
              comment,
              userName,
              userDescription,
              userAvatar,
              tags,
              grade,
              created_at,
              psychologistId,
            }: any,
            idx: number
          ) => (
            <div
              className={clsx(
                'reviews-carousel-home-item slick-overflow-item',
                {
                  active: +overflowActiveIdx === +idx,
                }
              )}
              key={id}
            >
              <div className="reviews-carousel-home-card">
                <div className="reviews-carousel-home-card__inner">
                  <div className="reviews-carousel-home-card__header">
                    <div
                      className={clsx('reviews-carousel-home-card__user', {
                        'has-avatar': !!userAvatar,
                      })}
                    >
                      {!!userAvatar && (
                        <div className="reviews-carousel-home-card__user-avatar">
                          <Image src={userAvatar} alt="" />
                        </div>
                      )}
                      {!!userName && (
                        <p className="reviews-carousel-home-card__user-name">
                          {userName}
                        </p>
                      )}
                      {!!userDescription && (
                        <p className="reviews-carousel-home-card__user-description">
                          {userDescription}
                        </p>
                      )}
                    </div>

                    <div className="reviews-carousel-home-card__extra">
                      {grade !== undefined && (
                        <Stars
                          value={grade}
                          className="reviews-carousel-home-card__stars"
                        />
                      )}
                      {!!created_at && (
                        <div className="reviews-carousel-home-card__date">
                          {getDate(created_at, 'DD.MM.YYYY HH:mm')}
                        </div>
                      )}
                    </div>
                  </div>
                  {!isEmpty(tags) && (
                    <div className="reviews-carousel-home-card__tags">
                      {tags?.map((tag: string, idx: number) => (
                        <div
                          className="reviews-carousel-home-card__tag"
                          key={tag + idx}
                        >
                          <span>{tag}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {!!comment && (
                    <div className="reviews-carousel-home-card__text">
                      {comment}
                    </div>
                  )}
                  <div className="reviews-carousel-home-card__footer">
                    {isShowBtnPsh && (
                      <Button
                        href={
                          !!psychologistId
                            ? ROUTES.psychologist(psychologistId)
                            : ROUTES.psychologists
                        }
                        type="link"
                        iconRight={<Icon name="DashRightOutline" />}
                        className="reviews-carousel-home-card__btn-cta"
                      >
                        {t('site.btn_goto_psh_page')}
                      </Button>
                    )}
                    {isCounter && isMoreOne && (
                      <div className="reviews-carousel-home-card__counter">
                        {idx + 1}/{items.length}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </Slider>
    </div>
  );
};

export { ReviewsCarouselHome };
