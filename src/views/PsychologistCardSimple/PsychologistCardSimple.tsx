'use client';
import { Suspense, useMemo } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { ROUTES } from '@/config';
import { useTranslationClient } from '@/config/i18n/client';
import {
  get,
  isEmpty,
  normalizeFeatures,
} from '@/utils/helpers';
import { IPsychologist } from '@/types';
import { useLang } from '@/hooks/useLang';
import { Link } from '@/components/Link';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { PropertiesItems } from '@/components/PropertiesItems/PropertiesItems';
import { PsychologistBtnVideo } from '@/views/PsychologistViews/PsychologistBtnVideo';
import { PsychologistNearestBadgeSimple } from '@/views/PsychologistViews/PsychologistNearestBadgeSimple';
import './psh-card-simple.scss';

interface IProps {
  item: IPsychologist;
  className?: string;
  isOfflinePage?: boolean;
  isBtnOrder?: boolean;
  isBtnDetails?: boolean;
  isBtnSelectTime?: boolean;
  isLastSchedule?: boolean;
  type?: 'default' | 'carousel';
}

const PsychologistCardSimple = ({
  item,
  className,
  isOfflinePage,
  isBtnOrder,
  isBtnDetails,
  isBtnSelectTime,
  isLastSchedule,
  type = 'default',
}: IProps) => {
  const {
    id,
    photo,
    fullname,
    filter_data,
    description,
    experience_years,
    nearest_schedule,
    features,
    consultation_count,
    video_mobile,
    video_desktop,
  } = item || {};
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);
  const fullnameElement = <h4 className="psh-card-simple__name">{fullname}</h4>;
  const { languagesList } = normalizeFeatures(features);

  const propertiesList = useMemo(() => {
    const itemsCounters = [];
    const itemsMain = [];
    itemsMain.push({
      key: 'description',
      icon: <Icon name="Info" />,
      text: description,
    });
    if (!isEmpty(languagesList)) {
      itemsMain.push({
        key: 'languages',
        icon: !!get(languagesList, [0, 'icon']) ? (
          <img src={get(languagesList, [0, 'icon'])} alt="" />
        ) : (
          <Icon name="Langs" />
        ),
        text: (
          <span className="languages-list">
            {languagesList?.map((i: any) => i.name)?.join(', ')}
          </span>
        ),
      });
    }
    if (!!consultation_count && consultation_count > 0) {
      itemsCounters.push({
        key: 'sessions_count',
        icon: <Icon name="CheckList" />,
        text: t('site.sessions', { count: consultation_count || 0 }),
      });
    }
    itemsCounters.push({
      key: 'experience',
      icon: <Icon name="Experience" />,
      text: `${t('site.years', { count: experience_years })} ${t(
        'site.by_experience'
      )}`,
    });
    return { main: itemsMain, counters: itemsCounters };
  }, [consultation_count, description, experience_years, languagesList, t]);

  const actions = (
    <>
      {isBtnDetails && (
        <Button
          href={ROUTES.psychologist(id!)}
          type="default"
          size="md"
          weight="bold"
          className="psh-card-simple__btn psh-card-simple__btn--more"
        >
          {t('site.more_detail')}
        </Button>
      )}
      {isBtnOrder && (
        <Button
          href={
            // isOfflinePage ? ROUTES.offlineCheckout(id!) : ROUTES.checkout(id!)
            isOfflinePage ? ROUTES.offlineCheckout(id!) : ROUTES.psychologist(id!, '?scroll_calendar=true')
          }
          type="primary-old"
          size="md"
          weight="bold"
          className="psh-card-simple__btn psh-card-simple__btn--order"
          shadow
        >
          {t('site.enroll')}
        </Button>
      )}
      {isBtnSelectTime && (
        <Button
          href={ROUTES.psychologist(id!, '?scroll_calendar=true')}
          type="simple"
          size="sm"
          weight="bold"
          className="psh-card-simple__btn psh-card-simple__btn--stime"
          iconRight={<Icon name="SelectTime" />}
        >
          {t('site.btn_select_time')}
        </Button>
      )}
    </>
  );

  return (
    <div
      className={clsx(`psh-card-simple psh-card-simple--${type}`, className)}
    >
      <div className="psh-card-simple__inner">
        <div className="psh-card-simple__media">
          <div className="psh-card-simple__media__img">
            {photo && (
              <Image
                src={photo?.thumbnail}
                title={fullname}
                alt={fullname!}
                width={256}
                height={256}
              />
            )}
          </div>
          {(!!video_desktop || !!video_mobile) && (
            <PsychologistBtnVideo
              desktopSrc={video_desktop!}
              mobileSrc={video_mobile}
              className="psh-card-simple__media__video-btn"
            />
          )}
        </div>
        <div className="psh-card-simple__content">
          <div className="psh-card-simple__header">
            <Link
              href={ROUTES.psychologist(id!)}
              className="psh-card-simple__name-link"
            >
              {fullnameElement}
            </Link>
            {isLastSchedule && (
              <Suspense>
                <PsychologistNearestBadgeSimple
                  date={nearest_schedule?.start_datetime}
                  label={`${t('site.nearest_time')}: `}
                  lang={lang}
                  className="psh-card-simple__last-schedule"
                  psychologistId={id}
                />
              </Suspense>
            )}
            <div className="psh-card-simple__properties">
              <PropertiesItems
                items={propertiesList?.main}
                className="psh-card-simple__properties-main"
              />
              <PropertiesItems
                items={propertiesList?.counters}
                className="psh-card-simple__properties-counters"
              />
            </div>
          </div>
          <div className="psh-card-simple__body">
            {['problems'].map(
              (k) =>
                !isEmpty(get(filter_data, k)) && (
                  <p key={k}>
                    <strong>{t(`site.expertise`)}:</strong>{' '}
                    {get(filter_data, k, [])
                      .map((p: any) => p?.text)
                      .join(', ')}
                  </p>
                )
            )}
          </div>
          <div className="psh-card-simple__footer">{actions}</div>
        </div>
      </div>
    </div>
  );
};

export { PsychologistCardSimple };
