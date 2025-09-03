'use client';
import { useEffect, useMemo, useState } from 'react';
import Slider from 'react-slick';
import clsx from 'clsx';
import { MODALS, ROUTES, defaultCurrency } from '@/config';
import { useTranslationClient } from '@/config/i18n/client';
import {
  ServiceEnum,
  IService,
  ServicesForPrices,
  serviceIconsMap,
} from '@/types';
import { get, isEmpty } from '@/utils/helpers';
import {
  buyCertificate,
  buyService,
  fetchServices,
  getServices,
} from '@/store/servicesSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { useModals } from '@/hooks/useModals';
import { useAuth } from '@/hooks/useAuth';
import { useLang } from '@/hooks/useLang';
import { Widget } from '@/components/Widget';
import { Tabs } from '@/components/Tabs';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import {
  getSelectedDate,
  getSelectedSchedule,
  getSelectedTimezone,
} from '@/store/checkoutSlice';
import './tariffs.scss';

type TariffCardViewType = 'default' | 'custom' | 'new' | 'accent';
interface ITariffsContainer {
  title?: React.ReactNode;
  isOnceFetching?: boolean;
  successUrl?: string;
}
interface ITariffs {
  title?: React.ReactNode;
  services: Array<IService>;
  isVisiblePromocode?: boolean;
  isCarousel?: boolean;
  isCertificate?: boolean;
  viewType?: TariffCardViewType;
  successUrl?: string;
  defaultTab?: ServiceEnum;
  isTabs?: boolean;
  isShowMinutes?: boolean;
  isFullNames?: boolean;
  isAbonementFooterInfo?: boolean;
}
interface ITariffCards {
  items: any;
  isAuth: boolean;
  isCertificate?: boolean;
  isVisiblePromocode?: boolean;
  isShowMinutes?: boolean;
  viewType?: TariffCardViewType;
  successUrl?: string;
}
interface ITariffCard extends IService {
  className?: string;
  isAuth: boolean;
  isCertificate?: boolean;
  isShowMinutes?: boolean;
  isVisiblePromocode?: boolean;
  viewType?: TariffCardViewType;
  promo_id?: string;
  old_price?: string;
  successUrl?: string;
}

const TariffCards = ({
  items,
  isAuth,
  isVisiblePromocode,
  viewType,
  isCertificate,
  successUrl,
  isShowMinutes,
}: ITariffCards) => {
  return (
    <div className="tariff-cards">
      {items?.map((item: any, idx: any) => (
        <div className="tariff-cards-item" key={item?.id}>
          <TariffCard
            {...item}
            key={item?.id || idx}
            isAuth={isAuth}
            className={clsx({ active: idx === 1 })}
            isVisiblePromocode={isVisiblePromocode}
            viewType={viewType}
            isCertificate={isCertificate}
            successUrl={successUrl}
            isShowMinutes={isShowMinutes}
          />
        </div>
      ))}
    </div>
  );
};

const TariffCardsCarousel = ({
  items,
  isAuth,
  isVisiblePromocode,
  viewType,
  isCertificate,
  successUrl,
  isShowMinutes,
}: ITariffCards) => {
  const slickSettings = {
    dots: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    // centerMode: true,
    responsive: [
      {
        breakpoint: 900,
        arrows: true,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 570,
        arrows: true,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [sliderKey, setSliderKey] = useState(0);
  useEffect(() => {
    const handleOrientationChange = () => {
      setSliderKey((prev) => prev + 1);
    };
    window.addEventListener("orientationchange", handleOrientationChange);
    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  return (
    <div className="tariff-cards tariff-cards-carousel has-primary-arrows">
      <div>
        <Slider {...slickSettings} key={sliderKey}>
          {items?.map((item: any, idx: any) => (
            <div
              className="tariff-carousel-item"
              key={item?.id}
              data-id={item?.id}
            >
              <TariffCard
                {...item}
                key={item?.id || idx}
                isAuth={isAuth}
                className={clsx({ active: items.length === 1 && idx === 0 })}
                isVisiblePromocode={isVisiblePromocode}
                viewType={viewType}
                isCertificate={isCertificate}
                isShowMinutes={isShowMinutes}
                successUrl={successUrl}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

const TariffCard = ({
  id,
  sessions: count,
  price,
  minutes,
  className = '',
  content_type_id,
  isAuth,
  isCertificate,
  isVisiblePromocode = true,
  viewType,
  promo_id,
  old_price,
  successUrl,
  isShowMinutes,
}: ITariffCard) => {
  const [isLoading, setIsLoading] = useState(false);
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);
  const { modalOpen } = useModals();
  const handleClickPromocode = () => {
    modalOpen(MODALS.promocode);
  };
  const dispatch = useAppDispatch();
  const handleClickBuy = async () => {
    setIsLoading(true);
    if (isCertificate) {
      await dispatch(buyCertificate({ id, promo_id, t, successUrl }));
    } else {
      await dispatch(
        buyService({ id, content_type_id, promo_id, isAuth, t, successUrl })
      );
    }
    setIsLoading(false);
  };

  return (
    <div
      className={clsx(`tariff-card tariff-card--${viewType} ${className}`, {
        'with-discount': !!promo_id,
      })}
    >
      {viewType === 'accent' ? (
        <TariffCardInnerAccent
          count={count}
          price={price}
          old_price={old_price}
          handleClickBuy={handleClickBuy}
          handleClickPromocode={handleClickPromocode}
          isLoading={isLoading}
          isVisiblePromocode={isVisiblePromocode}
          minutes={minutes}
          isShowMinutes={isShowMinutes}
          t={t}
        />
      ) : (
        <div className="tariff-card-inner">
          <div className="tariff-card-body">
            <div className="tariff-card-count">
              {t('site.sessions', { count })}
            </div>
            <div className="tariff-card-price">
              {!!old_price && old_price !== '0' && (
                <span className="tariff-card-price-old">
                  {old_price} {defaultCurrency}
                </span>
              )}
              {price} {defaultCurrency}
            </div>
            <div className="tariff-card-description">
              <div className="tariff-card-time">
                <Icon name="ClockCircle" />
                {t('site.minutes', { count: minutes || 0 })}
              </div>
            </div>
          </div>
          <div className="tariff-card-footer">
            <Button
              type={viewType === 'custom' ? 'primary-old' : 'primary'}
              shadow={viewType === 'custom'}
              icon={<Icon name="Card" />}
              size="md"
              className="btn-order"
              onClick={handleClickBuy}
              loading={isLoading}
              disabled={isLoading}
            >
              {t('site.services.btns.buy')}
            </Button>
            {isVisiblePromocode && (
              <div className="tariff-card-promo">
                <Button
                  type="link"
                  className="btn-promocode"
                  onClick={handleClickPromocode}
                >
                  {t('site.services.btns.promocode')}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const TariffCardInnerAccent = ({
  count,
  t,
  price,
  old_price,
  handleClickBuy,
  handleClickPromocode,
  isLoading,
  isVisiblePromocode,
  minutes,
  isShowMinutes,
}: any) => {
  const priceSaving =
    !!old_price && old_price !== '0' && !!price ? Number(old_price) - Number(price) : 0;
  return (
    <>
      <div className="tariff-card-count">{t('site.sessions', { count })}</div>
      <div className="tariff-card-inner">
        <div className="tariff-card-body">
          <div className="tariff-card-price">
            {price} {defaultCurrency}
          </div>
          {!!old_price && old_price !== '0' && (
            <div className="tariff-card-old-price">
              {t('site.instead')} {old_price} {defaultCurrency}
            </div>
          )}
          <div className="tariff-card-description">
            {!!priceSaving && priceSaving > 0 && (
              <div className="tariff-card-savings">
                <Icon name="Money" />
                {t('site.savings')}{' '}
                <strong>
                  {priceSaving} {defaultCurrency}
                </strong>
              </div>
            )}
            {isShowMinutes && (
              <div className="tariff-card-time">
                <Icon name="ClockCircle" />
                {t('site.minutes', { count: minutes || 0 })}
              </div>
            )}
          </div>
        </div>
        <div className="tariff-card-footer">
          <Button
            type={'primary-old'}
            shadow={true}
            size="md"
            className="btn-order"
            onClick={handleClickBuy}
            loading={isLoading}
            disabled={isLoading}
          >
            {t('site.services.btns.buy')}
          </Button>
          {isVisiblePromocode && (
            <div className="tariff-card-promo">
              <Button
                type="link"
                className="btn-promocode"
                onClick={handleClickPromocode}
              >
                {t('site.services.btns.promocode')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const TariffCardsChildren = ({
  items,
  viewType,
  isCarousel,
  isAuth,
  isCertificate,
  isVisiblePromocode,
  isShowMinutes,
  successUrl,
}: any) => {
  return isCarousel ? (
    <TariffCardsCarousel
      items={items}
      isAuth={isAuth}
      isVisiblePromocode={isVisiblePromocode}
      viewType={viewType}
      isCertificate={isCertificate}
      successUrl={successUrl}
      isShowMinutes={isShowMinutes}
    />
  ) : (
    <TariffCards
      items={items}
      isAuth={isAuth}
      isVisiblePromocode={isVisiblePromocode}
      viewType={viewType}
      isCertificate={isCertificate}
      successUrl={successUrl}
      isShowMinutes={isShowMinutes}
    />
  );
};

const Tariffs = ({
  title,
  services,
  isVisiblePromocode,
  viewType = 'default',
  isCarousel,
  isCertificate,
  isTabs = true,
  successUrl,
  defaultTab,
  isShowMinutes,
  isFullNames,
  isAbonementFooterInfo,
}: ITariffs) => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);
  const { isAuth } = useAuth();
  const defaultActiveKey = defaultTab || ServiceEnum.standard;

  const servicesByType = useMemo(
    () =>
      services?.reduce((a: any, c: any) => {
        a[c.type] = [...(a[c.type] || []), c];
        return a;
      }, {}),
    [services]
  );

  const tabs: any = useMemo(() => {
    return !isEmpty(servicesByType) && isTabs
      ? ServicesForPrices.filter((category) => !!servicesByType[category]).map(
          (category) => ({
            key: category,
            label: (
              <>
                {viewType === 'new' && (
                  <Icon name={get(serviceIconsMap, [category])} />
                )}
                {t(
                  `site.services.items_tabs.${category}` as any
                )}
              </>
            ),
            children: (
              <TariffCardsChildren
                items={servicesByType[category]}
                viewType={viewType}
                isAuth={isAuth}
                isCarousel={isCarousel}
                isVisiblePromocode={isVisiblePromocode}
                isCertificate={isCertificate}
                isShowMinutes={isShowMinutes}
                successUrl={successUrl}
              />
            ),
          })
        )
      : [];
  }, [
    servicesByType,
    t,
    isAuth,
    isCarousel,
    isCertificate,
    isVisiblePromocode,
    viewType,
    successUrl,
    isTabs,
    isShowMinutes,
  ]);

  if (isEmpty(services)) {
    return null;
  }

  return (
    <Widget
      header={title}
      className={clsx(`tariffs tariffs--${viewType}`, {
        [`tariffs-carousel`]: isCarousel,
        [`tariffs-full-names`]: isFullNames,
      })}
      isBorder={false}
    >
      {isTabs ? (
        <Tabs type="card" items={tabs} defaultActiveKey={defaultActiveKey} />
      ) : (
        <TariffCardsChildren
          items={services}
          viewType={viewType}
          isAuth={isAuth}
          isCarousel={isCarousel}
          isVisiblePromocode={isVisiblePromocode}
          isCertificate={isCertificate}
          isShowMinutes={isShowMinutes}
          successUrl={successUrl}
        />
      )}
      {isAbonementFooterInfo && (
        <div className="tariffs-abonement-footer-info">
          {t('site.services.abonement.footer_info')}
        </div>
      )}
    </Widget>
  );
};

const TariffsContainer = ({
  title,
  isOnceFetching,
  successUrl,
}: ITariffsContainer) => {
  const services = useAppSelector(getServices);
  const dispatch = useAppDispatch();
  const isNeedFetch = (isOnceFetching && isEmpty(services)) || !isOnceFetching;
  useEffect(() => {
    isNeedFetch && dispatch(fetchServices());
  }, [dispatch, isNeedFetch]);

  return <Tariffs title={title} services={services} successUrl={successUrl} />;
};

const TariffsCheckoutContainer = ({
  psychologistId,
}: {
  psychologistId: number | string;
}) => {
  const selectedDate = useAppSelector(getSelectedDate);
  const selectedSchedule = useAppSelector(getSelectedSchedule);
  const selectedTimezone = useAppSelector(getSelectedTimezone);

  const qs = useMemo(() => {
    let query: any = { scroll_calendar: true };
    if (!!selectedSchedule) {
      query['schedule_id'] = selectedSchedule;
    }
    if (!!selectedDate) {
      query['date'] = JSON.stringify(selectedDate);
    }
    if (!!selectedTimezone) {
      query['timezone'] = selectedTimezone?.value;
    }
    return !isEmpty(query) ? '?' + new URLSearchParams(query) : '';
  }, [selectedDate, selectedSchedule, selectedTimezone]);

  // const _successUrl = ROUTES.checkout(psychologistId, qs);
  const _successUrl = ROUTES.psychologist(psychologistId, qs);
  const successUrl = `pay/success?success_url=${btoa(
    encodeURIComponent(_successUrl)
  )}`;

  return <TariffsContainer successUrl={successUrl} />;
};

export { Tariffs, TariffsContainer, TariffsCheckoutContainer };
