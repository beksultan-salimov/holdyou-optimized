// 'use client';
import React from 'react';
import Image from 'next/image';
import { ROUTES } from '@/config';
import { Container } from '@/components/Container';
import androidImg from '@/static/img/android.png';
import appleImg from '@/static/img/apple.png';
import './mobileAppSection.scss';

const MobileAppSection = ({ t }: any) => {
  return (
    <div className="mobile-app-section">
      <Container size="sm">
        <div className="mobile-app-section__inner">
          <div className="mobile-app-section__left">
            <h3 className="mobile-app-section__title">
              {t('site.mobile_app_title')}
            </h3>
            <p className="mobile-app-section__text">
              {t('site.mobile_app_text')}
            </p>
            <div className="mobile-app-section__links">
              <a href={ROUTES.appInGooglePlay} rel="nofollow" target="_blank">
                <Image
                  loading="lazy"
                  src={androidImg}
                  title={ROUTES.appInGooglePlay}
                  alt={ROUTES.appInGooglePlay}
                  className="mobile-app-section__links__img"
                />
              </a>
              <a href={ROUTES.appInAppStore} rel="nofollow" target="_blank">
                <Image
                  loading="lazy"
                  src={appleImg}
                  title={ROUTES.appInAppStore}
                  alt={ROUTES.appInAppStore}
                  className="mobile-app-section__links__img"
                />
              </a>
            </div>
          </div>
          <div className="mobile-app-section__right">
            <div className="mobile-app-section__media">
              <img
                src="/img/mobile_app_img.png"
                alt={t('site.mobile_app_title')}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export { MobileAppSection };
