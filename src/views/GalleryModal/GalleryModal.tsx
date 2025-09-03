'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Slider from 'react-slick';
import { MODALS } from '@/config';
import { useModals } from '@/hooks/useModals';
import { BaseModal } from '@/views/BaseModal';

const GalleryModal = () => {
  const modalId = MODALS.gallery;
  const { params } = useModals(modalId);
  const {
    isOpen,
    items = [],
    initialSlide = 0,
    showDots,
    showNav = true,
    showThumbnails = true,
    maxSlides = 6,
  } = params || {};

  const [nav1, setNav1] = useState<any>(null);
  const [nav2, setNav2] = useState<any>(null);
  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setNav1(sliderRef1.current);
      }, 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setNav2(sliderRef2.current);
      }, 50);
    }
  }, [isOpen]);

  const settingsMain = useMemo(
    () => ({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: showDots,
      arrows: showNav,
    }),
    []
  );

  const settingsThumbnails = useMemo(
    () => ({
      dots: false,
      arrows: false,
    }),
    []
  );

  const slidesToShow = useMemo(() => {
    let countSlides = 0;
    const countItems = items?.length;
    if (!countItems) return countSlides;
    countSlides = countItems >= maxSlides ? maxSlides : countItems;
    return countSlides;
  }, [items, maxSlides]);

  return (
    <BaseModal id={modalId} size="full" type="gallery" isCenter>
      {isOpen && (
        <>
          <div className="modal-gallery__main has-primary-arrows">
            <Slider
              asNavFor={!!showThumbnails && nav2}
              ref={sliderRef1}
              initialSlide={initialSlide}
              {...settingsMain}
            >
              {items?.map((item: any, idx: number) => (
                <div key={idx} className="modal-gallery__main__item">
                  <div className="modal-gallery__main__item__inner">
                    <img src={item?.original} alt="" />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          {!!showThumbnails && slidesToShow > 1 && (
            <div
              className="modal-gallery__thumbnails"
              style={{ width: slidesToShow * 60 }}
            >
              <Slider
                asNavFor={nav1}
                ref={sliderRef2}
                swipeToSlide={true}
                focusOnSelect={true}
                slidesToShow={slidesToShow}
                initialSlide={initialSlide}
                {...settingsThumbnails}
              >
                {items?.map((item: any, idx: number) => (
                  <div key={idx} className="modal-gallery__thumbnails__item">
                    <div className="modal-gallery__thumbnails__item__inner">
                      <img src={item?.thumbnail} alt="" />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </>
      )}
    </BaseModal>
  );
};

export { GalleryModal };
