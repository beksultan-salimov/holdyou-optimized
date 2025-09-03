'use client'
import React, { MutableRefObject, useRef } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { ROUTES } from '@/config';
import { useMouseOffset } from '@/hooks/useMouseOffset';
import { Section } from '@/components/Section';
import { Title } from '@/components/Title';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { PshGroupItem } from '@/components/PshGroupItem';
import { SessionSwitcher } from '@/views/SessionSwitcher';
import holdyouMainImg from '@/static/img/home/holdyouMain.png';
import heart from '@/static/img/home/heart.svg';

interface IProps {
  t?: any;
  psychologistsCount?: any;
  getPromoPshAvatars: (c: number) => any[];
}

const PSH_AVATARS_SHOW = 3

const HomeMain = ({
  t,
  psychologistsCount,
  getPromoPshAvatars,
}: IProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <Section
      className={clsx('hn-main section-radius-offset-bottom', {
        active: true,
      })}
      container="md"
    >
      <div className="hn-main__inner" ref={containerRef}>
        <div className="hn-main__content">
          <Title
            tag="h1"
            size="slg"
            className="hn-main__title"
            html={t('home.main.title')}
          />
          <p className="hn-main__desc">{t('home.main.description')}</p>
          <div className="hn-main__info">
            <div className="hn-main__cta">
              <SessionSwitcher />
            </div>
            <PshGroupItem
              avatars={getPromoPshAvatars(PSH_AVATARS_SHOW)}
              label={t('home.main.select_psh_label')}
              btn={
                <Button href={ROUTES.psychologists} type="link">
                  {t('home.main.select_psh_value', {
                    count: '50+',
                  })}
                </Button>
              }
              layout="vertical"
              extraAvatar={
                psychologistsCount > PSH_AVATARS_SHOW
                  ? `+${psychologistsCount - PSH_AVATARS_SHOW}`
                  : undefined
              }
              isCustomExtra
              isScaleAvatars
            />
          </div>
          <div className="hn-main__media">
            <div className="hn-main__media-frame">
              <Image
                src={holdyouMainImg}
                alt={t('home.main.img_main_alt')}
                title={t('home.main.img_main_alt')}
                loading="eager"
                quality={100}
                height={563}
                width={379}
                className="hn-main__media-frame-img"
                draggable="false"
              />
              <HomeAnimateHeart containerRef={containerRef} />
            </div>
          </div>

          <div className="hn-main__divider" />

          <div className="hn-main__statistics">
            <div className="hn-main__statistics-item">
              <p className="hn-main__statistics-item-value">
                <Icon name="ShieldCheck" />
                100%
              </p>
              <p className="hn-main__statistics-item-label">
                {t('home.main.stat_1_label')}
              </p>
            </div>
            <div className="hn-main__statistics-item">
              <p className="hn-main__statistics-item-value">
                <Icon name="Smile" />
                4300
              </p>
              <p className="hn-main__statistics-item-label">
                {t('home.main.stat_2_label')}
              </p>
            </div>
            <div className="hn-main__statistics-item">
              <p className="hn-main__statistics-item-value">
                <Icon name="ChatRoundLike" />
                9000+
              </p>
              <p className="hn-main__statistics-item-label">
                {t('home.main.stat_3_label')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const HomeAnimateHeart = ({
  containerRef,
}: {
  containerRef: MutableRefObject<HTMLDivElement | null>;
}) => {
  const { offset } = useMouseOffset({ intensity: 30, containerRef });

  return (
    <Image
      src={heart}
      alt=""
      loading="eager"
      quality={100}
      className="hn-main__media-frame-heart"
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
      }}
    />
  );
};

export default HomeMain;
