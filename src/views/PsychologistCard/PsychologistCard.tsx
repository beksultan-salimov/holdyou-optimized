'use client';
import { useMemo } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { ROUTES } from '@/config';
import { useTranslationClient } from '@/config/i18n/client';
import { get, isEmpty, normalizeFeatures } from '@/utils/helpers';
import { IPsychologist } from '@/types';
import { useLang } from '@/hooks/useLang';
import { Link } from '@/components/Link';
import { Button } from '@/components/Button';
import { SimpleTooltip } from '@/components/SimpleTooltip';
import { Icon } from '@/components/Icon';
import { PropertiesItems } from '@/components/PropertiesItems';
import './psychologistCard.scss';

interface IProps {
  item: IPsychologist;
  className?: string;
  type?: 'default' | 'simple' | 'in_schedule';
  isOfflinePage?: boolean;
  isHidden?: boolean;
}

const PsychologistCard = ({
  item,
  type = 'default',
  isOfflinePage,
  isHidden,
}: IProps) => {
  const {
    id,
    photo,
    online: isOnline,
    offline: isOffline,
    fullname,
    description,
    experience_years,
    filter_data,
    // is_junior,
    features,
  } = item || {};
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);
  const fullnameElement = <h4 className="psh-card__name">{fullname}</h4>;

  const { languagesList } = useMemo(
    () => normalizeFeatures(features),
    [features]
  );
  const propertiesList = useMemo(() => {
    const items = [];
    items.push({
      key: 'experience',
      icon: <Icon name="Experience" />,
      text: `${t('site.years', { count: experience_years })} ${t(
        'site.by_experience'
      )}`,
    });
    if (!isEmpty(languagesList)) {
      items.push({
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
    return items;
  }, [experience_years, languagesList, t]);

  const media = (
    <>
      {photo && (
        <Image
          src={photo?.thumbnail}
          title={fullname}
          alt={fullname!}
          height={400}
          width={400}
          className="psh-card__media__img"
        />
      )}
      {['default', 'simple'].includes(type) && (
        <div className="psh-card__badges-top">
          {isOnline && type === 'simple' && (
            <div className="psh-badge psh-badge--sm psh-badge-status psh-badge-status--online">
              {t('site.online')}
            </div>
          )}
          {isOffline && type === 'simple' && (
            <div className="psh-badge psh-badge--sm psh-badge-status psh-badge-status--offline">
              {t('site.offline')}
            </div>
          )}
          {type === 'default' && !isEmpty(languagesList) && (
            <>
              {languagesList?.map((item: any) => (
                <div
                  className="psh-badge psh-badge--sm psh-badge-lang"
                  key={item?.id}
                >
                  <span className="psh-badge__label">{item?.name}</span>
                  <span className="psh-badge__icon psh-badge__icon--right">
                    {!!item?.icon ? (
                      <img src={item?.icon} alt="" />
                    ) : (
                      <Icon name="Langs" />
                    )}
                  </span>
                </div>
              ))}
            </>
          )}
        </div>
      )}
      {['default', 'simple'].includes(type) && (
        <div className="psh-card__badges-bottom">
          {/* {(Number(experience_years) > 0 || is_junior) && ( */}
          {(Number(experience_years) > 0) && (
            <div
              className={clsx('psh-badge psh-badge--md psh-badge-experience', {
                // 'is-junior': is_junior,
              })}
            >
              {/* {is_junior ? (
                <span>
                  {t('site.psh_junior')}{' '}
                  <SimpleTooltip tooltip={t('site.psh_junior_tooltip')}>
                    <Icon name="InfoCircleFill" />
                  </SimpleTooltip>
                </span>
              ) : ( */}
                <span>
                  {t('site.experience')}:{' '}
                  {t('site.years', { count: experience_years })}
                </span>
              {/* )} */}
            </div>
          )}
        </div>
      )}
    </>
  );

  const actions = (
    <>
      <Button
        href={
          // isOfflinePage ? ROUTES.offlineCheckout(id!) : ROUTES.checkout(id!)
          isOfflinePage ? ROUTES.offlineCheckout(id!) : ROUTES.psychologist(id!, '?scroll_calendar=true')
        }
        type="primary-old"
        size="md"
        weight="bold"
        className="psh-card__btn psh-card__btn--order"
        shadow={type === 'default' ? true : false}
      >
        {t('site.enroll')}
      </Button>
      <Button
        href={ROUTES.psychologist(id!)}
        type={type === 'default' ? 'text' : 'default'}
        size="md"
        weight="bold"
        className="psh-card__btn psh-card__btn--more"
        iconRight={<Icon name="DashRightOutline" />}
      >
        {t('site.more_detail')}
      </Button>
    </>
  );

  return (
    <div
      className={clsx(`psh-card psh-card--${type}`, { 'is-hidden': isHidden })}
    >
      <div className="psh-card__media">
        {type === 'default' && (
          <>
            {media}
            <div className="psh-card__media__actions">{actions}</div>
          </>
        )}
        {['simple', 'in_schedule'].includes(type) && media}
      </div>
      <div className="psh-card__content">
        <div className="psh-card__header">
          {['in_schedule'].includes(type) && (
            <div className="psh-card__header__experience">
              <span>
                {t('site.experience')}:{' '}
                {t('site.years', { count: experience_years })}
              </span>
            </div>
          )}
          {type === 'default' && (
            <Link href={`/psychologists/${id}`} className="psh-card__name-link">
              {fullnameElement}
            </Link>
          )}
          {['simple', 'in_schedule'].includes(type) && <>{fullnameElement}</>}
          <p className="psh-card__description">{description}</p>
        </div>
        {['default', 'simple'].includes(type) && (
          <div className="psh-card__body">
            {type === 'default' && <PropertiesItems items={propertiesList} />}
            {['approaches', 'problems'].map(
              (k) =>
                !isEmpty(get(filter_data, k)) && (
                  <p key={k}>
                    <strong className="psh-card__body__label">
                      {t(`site.psh_section_map.${k}`)}:
                    </strong>
                    <br />
                    <span className="psh-card__body__text">
                      {get(filter_data, k, [])
                        .map((p: any) => p?.text)
                        .join(', ')}
                    </span>
                  </p>
                )
            )}
          </div>
        )}
        {['default', 'simple'].includes(type) && (
          <div className="psh-card__footer">{actions}</div>
        )}
      </div>
    </div>
  );
};

export { PsychologistCard };
