'use client';
import React, { MutableRefObject, useRef } from 'react';
import Image from 'next/image';
import { ROUTES } from '@/config';
import { useTranslationClient } from '@/config/i18n/client';
import { useMouseOffset } from '@/hooks/useMouseOffset';
import { useLang } from '@/hooks/useLang';
import { Button } from '@/components/Button';
import { Hero, HeroImage } from '@/components/Hero';
import { Text } from '@/components/Text';
import { Title } from '@/components/Title';
import { Container } from '@/components/Container';
import heartGreen from '@/static/img/heart_green.png';

const PricesHero = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['prices']);

  return (
    <section
      className="prices-main section-radius-offset-bottom"
      ref={containerRef}
    >
      <Container size="sm">
        <Hero
          image={
            <>
              <HeroImage>
                <Image
                  loading="lazy"
                  src="/img/oc-main.jpg"
                  alt={t('prices.main.btn_cta')}
                  width={690}
                  height={622}
                />
              </HeroImage>
              <Decorate containerRef={containerRef} />
            </>
          }
        >
          <Title
            size="xlg"
            tag="h1"
            className="prices-main__title"
            html={t('prices.main.title')}
          />
          <Text isBorderLeft>
            <p
              dangerouslySetInnerHTML={{
                __html: t('prices.main.description'),
              }}
            />
          </Text>
          <Button
            href={ROUTES.psychologists}
            type="primary-old"
            weight="bold"
            shadow
            className="prices-main__cta"
            font="base"
          >
            {t('prices.main.btn_cta')}
          </Button>
        </Hero>
      </Container>
    </section>
  );
};

const Decorate = ({
  containerRef,
}: {
  containerRef: MutableRefObject<HTMLDivElement | null>;
}) => {
  const { offset } = useMouseOffset({ intensity: 30, containerRef });

  return (
    <>
      <Image
        src={heartGreen}
        alt=""
        loading="eager"
        quality={100}
        className="prices-main__heart"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) rotate(7.8deg)`,
        }}
      />
    </>
  );
};

export { PricesHero };
