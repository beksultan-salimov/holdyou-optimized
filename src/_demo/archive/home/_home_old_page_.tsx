/**
 * @deprecated Home page old version
 */
import type { Metadata } from 'next';
import Image from 'next/image';
import { ROUTES } from '@/config';
import { getTranslationServer } from '@/config/i18n';
import { LangType } from '@/config/i18n/settings';
import { Container } from '@/components/Container';
import { FAQ } from '@/components/FAQ';
import { Title } from '@/components/Title';
import { Button } from '@/components/Button';
import { Section } from '@/components/Section';
import ListItems from '@/components/ListItems';
import { MainServices } from '@/views/MainServices';
// import { MainOfflineCenters } from '@/views/MainOfflineCenters';
import { Partners } from '@/views/Partners';
import { ContactInfoSection } from '@/views/ContactInfoSection';
import { HowItWorkHome } from '@/views/HowItWorkHome';
import { ReviewsCarousel } from '@/views/ReviewsCarousel';
import { BlogCarousel } from '@/views/BlogCarousel';
import { NoWork } from '@/views/NoWork';
import { FeedbackFormHome } from '@/views/FeedbackFormHome';
import heroImg from '@/static/img/makeAppointment.png';
import weSelectPsychologistsImg from '@/static/img/weSelectPsychologists.png';
import forBusinessImg from '@/static/img/forBusiness.png';
import personalSecurityImg from '@/static/img/personal-security.png';
import markerClockImg from '@/static/img/markerClock.png';
import cardImg from '@/static/img/card.png';
import backgroundFeedbackImg from '@/static/img/backgroundFeedbackForm.png';
import { getMainOfflineCenter, getNewsCarousel, getReviewsMain, getSeoBySlug } from '@/utils/services';
import { getAlternatesUrls, getOgTagsDefault } from '@/utils/helpers';
import './home.scss'
import { HomeBigTxt } from '@/views/HomeBigTxt';


const partners = [
  {
    id: 1,
    name: 'Колесо Життя',
    image: '/img/partners/zhittya.jpg',
    link: 'https://koleso-gizni.com.ua/uk-ua/?utm_campaign=holdyou',
  },
  {
    id: 2,
    name: 'HUMAN',
    image: '/img/partners/logo_dark.png',
    link: 'http://www.human.ua/?utm_campaign=holdyou',
  },
  {
    id: 3,
    name: 'HEdEraUMAN',
    image: '/img/partners/edera_logo_2.png',
    link: 'http://www.ed-era.com/?utm_campaign=holdyou',
  },
  {
    id: 4,
    name: 'Wtech',
    image: '/img/partners/logo_wtech.png',
    link: 'https://wtech.club/ru/?utm_campaign=holdyou',
  },
  {
    id: 5,
    name: 'Освіторія',
    image: '/img/partners/osvitoria.jpg',
    link: 'https://osvitoria.media/?utm_campaign=holdyou',
  },
];

interface IProps {
  params: {
    lang: LangType;
  };
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const slug = '/';
  const { lang } = params;
  const { t } = await getTranslationServer(lang, ['site']);
  const pageSeo = await getSeoBySlug({ lang, slug: 'home' });
  const { title, description, keywords } = pageSeo || {};

  return {
    title: title || t('site.main_layout.seo.title'),
    description: description || t('site.main_layout.seo.description'),
    keywords: keywords || t('site.main_layout.seo.keywords'),
    alternates: getAlternatesUrls({ slug, lang }),
    openGraph: {
      title: title || t('site.main_layout.seo.title'),
      description: description || t('site.main_layout.seo.description'),
      ...(getOgTagsDefault({ lang, slug }) || {}),
    },
  };
};

export default async function Home({ params: { lang } }: IProps) {
  const { t } = await getTranslationServer(lang, ['home'])
  const { t: t_site } = await getTranslationServer(lang, ['site'])
  const reviews = await getReviewsMain({ lang });
  const news = await getNewsCarousel({ lang });
  // const offlineCenter = await getMainOfflineCenter({ lang });

  return (
    <div className="page page-home">
      <Section className="home-main" container="md">
        <div className="home-main__inner">
          <div className="home-main__image">
            <img
              src={heroImg}
              alt={t('home.img1_alt')}
              title={t('home.img1_alt')}
              loading="eager"
            />
          </div>
          <div className="home-main__content">
            <Title tag="h1" size="xlg">
              {t('home.main.title')}
            </Title>
            <Button
              href={ROUTES.psychologists}
              type="primary-old"
              className="home-main__cta"
              weight="bold"
              shadow
            >
              {t('home.main.button')}
            </Button>
          </div>
        </div>
      </Section>

      <Section className="home-counter-info" container="sm">
        <div className="counter-info">
          {[
            { label: t('home.counter_information.clients'), value: '2700+' },
            { label: t('home.counter_information.specialists'), value: '47' },
            { label: t('home.counter_information.sessions'), value: '4000+' },
            { label: t('home.counter_information.confidence'), value: '100%' },
          ].map(({ label, value }) => (
            <div className="counter-info-item" key={value}>
              <span className="counter-info-item__value">{value}</span>
              <span className="counter-info-item__label">{label}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section className="benefits-session hide-in-mobile" container="sm">
        <Title size="sm" isCenter className="section-title">
          {t('home.sessions_with_psychologist.title')}
        </Title>
        <ul className="benefits-session-items">
          <li className="benefits-session-item">
            <img
              loading="lazy"
              src={personalSecurityImg}
              alt={t('home.sessions_with_psychologist.approach')}
              className="benefits-session-item__image"
            />
            <span className="benefits-session-item__label">
              {t('home.sessions_with_psychologist.approach')}
            </span>
          </li>
          <li className="benefits-session-item">
            <Image
              loading="lazy"
              src={markerClockImg}
              className="benefits-session-item__image"
              alt={t('home.sessions_with_psychologist.time')}
            />
            <span className="benefits-session-item__label">
              {t('home.sessions_with_psychologist.time')}
            </span>
          </li>
          <li className="benefits-session-item">
            <Image
              loading="lazy"
              src={cardImg}
              className="benefits-session-item__image"
              alt={t('home.sessions_with_psychologist.price')}
            />
            <span className="benefits-session-item__label">
              {t('home.sessions_with_psychologist.price')}
            </span>
          </li>
        </ul>
      </Section>

      <Section className="help-you" container="sm">
        <Title size="xlg" isCenter className="section-title">
          {t('home.we_will_help_you.title')}
        </Title>
        <ListItems items={t('home.we_will_help_you.options')} mobileLimit={4} />
      </Section>

      <Section className="how-it-work" container="sm">
        <Title size="xlg" isCenter className="section-title">
          {t('home.how_it_works.title')}
        </Title>
        <HowItWorkHome t={t} />
      </Section>

      <Section className="home-prices" container="md">
        <Title size="xlg" isCenter className="section-title">
          {t('home.pricing.title')}
        </Title>
        <MainServices items={[]} />
      </Section>

      {/* {!!offlineCenter && (
        <Section className="home-offline-centers" container="sm">
          <Title tag="h2" size="xlg" isCenter className="section-title">
            {t('home.offline_centers.title')}
          </Title>
          <MainOfflineCenters
            textItems={t('home.offline_centers.options')}
            map={{
              centerCoordinates: [
                offlineCenter?.latitude,
                offlineCenter?.longitude,
              ],
              items: [
                {
                  address: offlineCenter?.address,
                  coordinates: [
                    offlineCenter?.latitude,
                    offlineCenter?.longitude,
                  ],
                },
              ],
            }}
          />
        </Section>
      )} */}

      <Section className="how-select-psh" container="sm">
        <div className="how-select-psh__content">
          <Title tag="h3" size="xlg">
            {t('home.select_psychologist.title')}
          </Title>
          <ul className="how-select-psh__items">
            {t('home.select_psychologist.options').map(
              (item: any, idx: number) => (
                <li key={idx} className="how-select-psh__item">
                  <span className="how-select-psh__item__title">
                    {item['title']}
                  </span>
                  <span className="how-select-psh__item__text">
                    {item['text']}
                  </span>
                </li>
              )
            )}
          </ul>
        </div>
        <Image
          className="how-select-psh__image"
          loading="lazy"
          src={weSelectPsychologistsImg}
          alt={t('home.select_psychologist.title')}
        />
      </Section>

      {!!reviews && reviews?.items?.length > 0 && (
        <Section className="home-reviews" container="sm">
          <Title size="xlg" isCenter className="section-title">
            {t('home.reviews.title')}
          </Title>
          <ReviewsCarousel items={reviews?.items} />
        </Section>
      )}

      <Section className="home-blog" container="sm">
        <Title size="xlg" isCenter className="section-title">
          {t('home.blog.title')}
        </Title>
        <BlogCarousel items={news} />
        <Button
          href={ROUTES.news}
          type="primary-old"
          size="md"
          className="home-blog-more"
          weight="bold"
        >
          {t('home.blog.button')}
        </Button>
      </Section>

      <Section className="for-business" container="sm">
        <div className="for-business__inner">
          <Image
            className="for-business__image"
            loading="lazy"
            src={forBusinessImg}
            alt={t('home.for_business.title')}
          />
          <div className="for-business__content">
            <Title tag="h4" size="xlg" className="for-business__title">
              {t('home.for_business.title')}
            </Title>
            <div className="for-business__description">
              <p>{t('home.for_business.descriptions.0')}</p>
              <p>{t('home.for_business.descriptions.1')}</p>
            </div>
            <div className="for-business__benefits">
              <span className="for-business__benefits__title">
                {t('home.for_business.benefits_title')}
              </span>
              <ul className="for-business__benefits__items">
                {t('home.for_business.benefits_options').map(
                  (item: any, idx: number) => (
                    <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section className="home-partners hide-in-mobile" container="sm">
        <Title size="sm" isCenter className="section-title">
          {t('home.partners.title')}
        </Title>
        <Partners items={partners} />
      </Section>

      <Section className="home-faq" container="sm">
        <Title isCenter size="xlg" className="section-title">
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
          title={t('home.no_work.title')}
          items={t('home.no_work.options')}
        />
      </Section>

      <Section className="home-bigtxt" container="sm">
        <HomeBigTxt lang={lang} />
      </Section>

      <Section className="home-feedback">
        <Container size="sm">
          <FeedbackFormHome
            title={
              <Title size="sm" className="home-feedback__title">
                {t('home.feedback_form.title')}
              </Title>
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
        />
      </Section>
    </div>
  );
}
