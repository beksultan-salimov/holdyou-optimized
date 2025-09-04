'use client'
import React, { MutableRefObject, useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import { useMouseOffset } from '@/hooks/useMouseOffset';
import { Section } from '@/components/Section';
import { Title } from '@/components/Title';
import { Icon } from '@/components/Icon';
import ParsedText from '@/components/ParsedText';
import howWork1Img from '@/static/img/home/howWork1.webp';
import howWork2Img from '@/static/img/home/howWork2.webp';
import howWork3Img from '@/static/img/home/howWork3.webp';
import howWork1dImg from '@/static/img/home/howWork1d.webp';
import howWork2dImg from '@/static/img/home/howWork2d.webp';
import howWork3dImg from '@/static/img/home/howWork3d.webp';

const howWorkImgs = [
  { main: howWork1Img, decorate: howWork1dImg },
  { main: howWork2Img, decorate: howWork2dImg },
  { main: howWork3Img, decorate: howWork3dImg },
];

interface IProps {
  t?: any;
}

const HomeHow = ({ t }: IProps) => {
  return (
    <Section className="hn-how section-radius-offset-bottom" container="xsm">
      <Title tag="h3" size="xlg" className="hn-how__title" isCenter>
        {t('home.how.title')}
      </Title>
      <div className="hn-how__items">
        {t('home.how.options').map((item: any, idx: number) => (
          <HowItem key={`home-how-${idx}`} item={item} idx={idx} />
        ))}
      </div>
    </Section>
  );
};

const HowItem = ({ item, idx }: { item: any; idx: number }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={`hn-how-item hn-how-item--${idx + 1}`} ref={containerRef}>
      <div className="hn-how-item__media">
        <Image
          loading="lazy"
          src={howWorkImgs[idx].main}
          alt={item['title']}
          className="hn-how-item__media-img"
        />
        <HowItemDecorate
          containerRef={containerRef}
          imageSrc={howWorkImgs[idx].decorate}
        />
      </div>
      <div className="hn-how-item__content">
        <div className="hn-how-item__header">
          <span className="hn-how-item__badge">
            <Icon name="Badge1" />
            <span className="hn-how-item__badge-label">{+idx + 1}</span>
          </span>
          <Title tag="h4" size="sm" className="hn-how-item__title">
            {item['title']}
          </Title>
        </div>
        <div className="hn-how-item__body">
          <ParsedText text={item['text']} />
        </div>
      </div>
    </div>
  );
};

const HowItemDecorate = ({
  containerRef,
  imageSrc,
}: {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  imageSrc: StaticImageData;
}) => {
  const { offset } = useMouseOffset({ intensity: 30, containerRef });

  return (
    <span
      className="hn-how-item__media-decorate"
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
      }}
    >
      <Image
        src={imageSrc}
        alt=""
        loading="eager"
        quality={100}
        className="hn-how-item__media-decorate-img"
      />
    </span>
  );
};

export default HomeHow;
