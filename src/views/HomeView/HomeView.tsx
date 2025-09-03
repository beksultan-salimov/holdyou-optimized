'use client';
import { useCallback } from 'react';
import Image from 'next/image';
import { ROUTES } from '@/config';
import { useTranslationClient } from '@/config/i18n/client';
import { LangType } from '@/config/i18n/settings';
import { partners } from '@/config/partners';
import { generatePageLink, get, getPshAvatarAndLink, isEmpty } from '@/utils/helpers';
import { Section } from '@/components/Section';
import { Title } from '@/components/Title';
import { Button } from '@/components/Button';
import { FAQ } from '@/components/FAQ';
import { Icon } from '@/components/Icon';
import { PshGroupItem } from '@/components/PshGroupItem';
import { InfoBadge } from '@/components/InfoBadge';
import { ContactInfoSection } from '@/views/ContactInfoSection';
import { Partners } from '@/views/Partners';
import { NoWork } from '@/views/NoWork';
import { HomeBigTxt } from '@/views/HomeBigTxt';
import { PsychologistsCarouselHome } from '@/views/PsychologistsCarouselHome';
import { Tariffs } from '@/views/Tariffs';
import { FeedbackSection } from '@/views/FeedbackSection';
import HomeMain from './HomeMain';
import HomeCategories from './HomeCategories';
import HomeHow from './HomeHow';
import homeHelp1Img from '@/static/img/home/homeHelp1.svg';
import homeHelp2Img from '@/static/img/home/homeHelp2.svg';
import homeHelp3Img from '@/static/img/home/homeHelp3.svg';
import homeHelp4Img from '@/static/img/home/homeHelp4.svg';
import homeHelp5Img from '@/static/img/home/homeHelp5.svg';
import homeHelp6Img from '@/static/img/home/homeHelp6.svg';
import homeBusinessImg from '@/static/img/home/homeBusiness.jpg';
import dynamic from 'next/dynamic';

// const HomeScrollListener = dynamic(() => import('./HomeScrollListener'), {
//   ssr: false,
// });

interface IProps {
  className?: string;
  lang: LangType;
  mainData?: any;
  mainQuiz?: any;
  juniorPsychologists?: any;
  servicesSubscription?: any;
}

const PSH_AVATARS_SHOW = 9;

const helpImgs = [
  homeHelp1Img,
  homeHelp2Img,
  homeHelp3Img,
  homeHelp4Img,
  homeHelp5Img,
  homeHelp6Img,
];

const groupTherapyIcons = [
  'ClockCircleThin',
  'Messages',
  'ShieldCheck',
  'ListCopy',
];

const HomeView = ({ mainData, mainQuiz, servicesSubscription, lang }: IProps) => {
  const { t } = useTranslationClient(lang, ['home']);
  const { t: t_site } = useTranslationClient(lang, ['site']);

  const {
    psychologistsCount,
    categoriesProblems,
    psychologistsDic,
    articlesDic,
    feedbacksDic,
    psychologistsNearest,
  } = mainData || {};

  const getPromoPshAvatars = useCallback(
    (count: number) => {
      const pshAvatars = !isEmpty(psychologistsDic)
        ? Object.keys(psychologistsDic)
            ?.slice(0, count)
            ?.map((id: any) =>
              getPshAvatarAndLink(get(psychologistsDic, id, {}))
            )
        : [];
      const defaultList = [
        { img: '/img/people/people_4.png' },
        { img: '/img/people/people_6.png' },
        { img: '/img/people/people_3.png' },
        { img: '/img/people/people_1.png' },
        { img: '/img/people/people_2.png' },
        { img: '/img/people/people_5.png' },
        { img: '/img/people/people_8.png' },
        { img: '/img/people/people_9.png' },
        { img: '/img/people/people_10.png' },
        { img: '/img/people/people_7.png' },
      ];
      return !isEmpty(pshAvatars) ? pshAvatars : defaultList?.slice(0, count);
    },
    [psychologistsDic]
  );

  return (
    <>
      <HomeMain
        t={t}
        psychologistsCount={psychologistsCount}
        getPromoPshAvatars={getPromoPshAvatars}
      />

      <HomeCategories
        t={t}
        t_site={t_site}
        categoriesProblems={categoriesProblems}
        articlesDic={articlesDic}
        feedbacksDic={feedbacksDic}
        psychologistsDic={psychologistsDic}
        psychologistsCount={psychologistsCount}
        getPromoPshAvatars={getPromoPshAvatars}
        mainQuiz={mainQuiz}
      />

      <Section
        className="hn-prices section-radius-offset-top"
        id="hn-prices"
        container="sm"
      >
        <Title tag="h3" size="xlg" className="hn-prices__title" isCenter>
          {t('site.abonement.title')}
        </Title>
        <p className="hn-prices__subtitle">{t('site.abonement.subtitle')}</p>

        <Tariffs
          services={servicesSubscription}
          isVisiblePromocode={false}
          viewType="accent"
          isCarousel
          isTabs={false}
          isAbonementFooterInfo
        />
      </Section>

      <Section className="hn-psh" id="hn-psh" container="md">
        <Title
          tag="h3"
          size="xlg"
          className="hn-psh__title"
          html={t('home.psh.title')}
          isCenter
        />
        <p className="hn-psh__subtitle">{t('home.psh.subtitle')}</p>
        <InfoBadge
          icon={<Icon name="Money" />}
          label={`${t('home.psh.cost')}: `}
          value={<strong>{t('home.psh.from')} 700 грн.</strong>}
          type="primary"
          className="hn-psh__info"
          isCenter
        />
        <PsychologistsCarouselHome items={psychologistsNearest} />
        <div className="hn-psh__footer">
          <PshGroupItem
            avatars={getPromoPshAvatars(PSH_AVATARS_SHOW)}
            extraAvatar={
              psychologistsCount > PSH_AVATARS_SHOW
                ? `+${psychologistsCount - PSH_AVATARS_SHOW}`
                : undefined
            }
            btn={
              <Button
                href={ROUTES.psychologists}
                type="link"
                iconRight={<Icon name="DashRightOutline" />}
              >
                {t('home.btn_goto_psh_filters')}
              </Button>
            }
            layout="vertical"
            isScaleAvatars
          />
        </div>
      </Section>

      <HomeHow t={t} />

      <Section
        className="hn-group-therapy section-radius-offset-bottom"
        container="md"
      >
        <Title
          size="xlg"
          className="hn-group-therapy__title"
          isCenter
          html={t('home.group_therapy.title')}
        />
        <div
          className="hn-group-therapy__description"
          dangerouslySetInnerHTML={{
            __html: t('home.group_therapy.description'),
          }}
        />
        <div className="hn-group-therapy__items">
          {t('home.group_therapy.options').map((item: any, idx: number) => (
            <div
              className="hn-group-therapy__item"
              key={`home-group-therapy-${idx}`}
            >
              <Icon
                name={groupTherapyIcons[idx]}
                className="hn-group-therapy__item__icon"
              />
              <div className="hn-group-therapy__item__title">
                {item['title']}
              </div>
              <div
                className="hn-group-therapy__item__text"
                dangerouslySetInnerHTML={{ __html: item['text'] }}
              />
            </div>
          ))}
        </div>
        <div
          className="hn-group-therapy__footer"
          dangerouslySetInnerHTML={{ __html: t('home.group_therapy.footer') }}
        />
        <div className="hn-group-therapy__cta">
          <Button
            href={generatePageLink(lang, 'zalezhnist-ta-spivzalezhnist')}
            type="default"
            htmlType="submit"
            size="sm"
            weight="bold"
            className="hn-group-therapy__btn-cta"
          >
            {t('home.group_therapy.btn_cta')}
          </Button>
        </div>
      </Section>

      <Section className="hn-business-wrapper" container="md">
        <div className="hn-business">
          <div className="hn-business__inner">
            <div className="hn-business__media">
              <div className="img-wrapper">
                <Image
                  src={homeBusinessImg}
                  alt={t(`home.business.title`)}
                  className="hn-business__img"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="hn-business__content">
              <Title tag="h3" size="xlg" className="hn-business__title">
                {t(`home.business.title`)}
              </Title>
              <div
                className="hn-business__text"
                dangerouslySetInnerHTML={{ __html: t(`home.business.text`) }}
              />
              <Button
                href={ROUTES.business}
                type="primary-old"
                className="hn-business__btn-cta"
                weight="bold"
                shadow
              >
                {t('home.business.btn_cta')}
              </Button>
            </div>
          </div>
        </div>
        <div className="hn-help">
          <Title tag="h4" size="lg" className="hn-help__title" isCenter>
            {t(`home.help.title`)}
          </Title>
          <div className="hn-help__items">
            {t(`home.help.options`)?.map((item: string, idx: any) => (
              <div className="hn-help-item" key={`home-help-${idx}`}>
                <Image
                  src={helpImgs[idx]}
                  className="hn-help-item__img"
                  alt={item}
                  loading="lazy"
                />
                <p dangerouslySetInnerHTML={{ __html: item }} />
              </div>
            ))}
          </div>
        </div>
        <div className="hn-partners">
          <Title tag="h4" size="lg" className="hn-partners__title" isCenter>
            {t(`home.partners.title`)}
          </Title>
          <Partners items={partners} />
        </div>
      </Section>

      <Section className="hn-faq section-radius-offset-top" container="xs">
        <Title size="xlg" className="hn-faq__title" isCenter>
          {t('home.faq.title')}
        </Title>
        <FAQ items={t('home.faq.options')} limitVisibleItems={6} />
      </Section>

      <ContactInfoSection
        title={t_site('site.contact_information.title')}
        items={t_site('site.contact_information.options')}
        className="home-contact-info-section"
      />

      <Section className="home-no-work" container="sm">
        <NoWork
          title={t('site.no_work.title')}
          items={t('site.no_work.options')}
        />
      </Section>

      <Section className="home-bigtxt" container="sm">
        <HomeBigTxt lang={lang} />
      </Section>

      <FeedbackSection />

      {/* <HomeScrollListener /> */}
    </>
  );
};

export { HomeView };
