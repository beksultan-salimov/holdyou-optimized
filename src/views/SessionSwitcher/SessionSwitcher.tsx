'use client';
import { useState } from 'react';
import clsx from 'clsx';
import { FAMILY_FILTERS_QS_KEY, ROUTES } from '@/config';
import { useTranslationClient } from '@/config/i18n/client';
import { useLang } from '@/hooks/useLang';
import { ServiceEnum } from '@/types';
import { Button } from '@/components/Button';
import './session-switcher.scss';

const SessionSwitcher = () => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);
  const [activeItem, setActiveItem] = useState(ServiceEnum.standard);
  const handleSelect = (type: ServiceEnum) => {
    localStorage.setItem('session_switcher', JSON.stringify(type));
    setActiveItem(type);
  };

  return (
    <>
      <div className="session-switcher">
        {[ServiceEnum.standard, ServiceEnum.pair].map((type) => (
          <div
            className={clsx('session-switcher-item', { active: activeItem === type })}
            onClick={() => handleSelect(type)}
            key={type}
          >
            <span className="session-switcher-item-text">
              {t(`site.session_switcher.${type}`)}
            </span>
          </div>
        ))}
      </div>
      <Button
        href={ROUTES.psychologistsQs(activeItem === ServiceEnum.pair ? `?${FAMILY_FILTERS_QS_KEY}=true` : '')}
        type="primary-old"
        className="hn-main__cta-btn"
        weight="bold"
        shadow
      >
        {t('site.session_switcher.btn_cta')}
      </Button>
    </>
  );
};

export { SessionSwitcher };
