'use client';
import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { useTranslationClient } from '@/config/i18n/client';
import { useLang } from '@/hooks/useLang';
import { Container, IContainerSize } from '@/components/Container';
import { Section } from '@/components/Section';
import { Title } from '@/components/Title';
import backgroundFeedbackImg from '@/static/img/backgroundFeedbackForm.png';
import dynamic from "next/dynamic";

interface IProps {
  title?: React.ReactNode;
  titleComponent?: React.ReactNode;
  containerSize?: IContainerSize;
  className?: string;
}

const FeedbackSection = ({ containerSize, title, titleComponent, className }: IProps) => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['contact']);
    const FeedbackFormHome = dynamic(() => import('@/views/FeedbackFormHome').then(mod => mod.FeedbackFormHome), { ssr: false });
    return (
    <Section className={clsx('home-feedback', className)}>
      <Container size={containerSize}>
        <FeedbackFormHome
          title={
            titleComponent ?? (
              <Title size="sm" className="home-feedback__title">
                {title ?? t('site.feedback_form.title')}
              </Title>
            )
          }
        />
      </Container>

      <Image
        className="home-feedback__image"
        loading="lazy"
        src={backgroundFeedbackImg}
        alt="HoldYou"
        width={813}
        height={585}
        draggable="false"
      />
    </Section>
  );
};

export { FeedbackSection };
