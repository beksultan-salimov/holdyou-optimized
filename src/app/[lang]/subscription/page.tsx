import { Metadata } from 'next';
import { ROUTES } from '@/config';
import { LangType } from '@/config/i18n/settings';
import { getTranslationServer } from '@/config/i18n';
import { getSeoBySlug, getServices } from '@/utils/services';
import { get, getAlternatesUrls, getOgTagsDefault } from '@/utils/helpers';
import { Title } from '@/components/Title';
import { FAQ } from '@/components/FAQ';
import { Button } from '@/components/Button';
import { Section } from '@/components/Section';
import { HeadPhoneIcon } from '@/components/Icons/HeadPhoneIcon';
import { MessagesIcon } from '@/components/Icons/MessagesIcon';
import { ListIcon } from '@/components/Icons/ListIcon';
import { UserCardIcon } from '@/components/Icons/UserCardIcon';
import { BallIcon } from '@/components/Icons/BallIcon';
import { WhileWorking } from '@/views/WhileWorking';
import { Tariffs } from '@/views/Tariffs';
import { ContactInfoSection } from '@/views/ContactInfoSection';
import { NoWork } from '@/views/NoWork';
import { HomeBigTxt } from '@/views/HomeBigTxt';
import { FeedbackSection } from '@/views/FeedbackSection';
import { PricesHero } from '@/views/PricesViews/PricesHero';
import './pricesPage.scss';
import Image from "next/image";

const workingIcons = [
  HeadPhoneIcon,
  BallIcon,
  UserCardIcon,
  ListIcon,
  MessagesIcon,
];

interface IProps {
  params: { lang: LangType };
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const slug = 'subscription';
  const { lang } = params;
  const { t } = await getTranslationServer(lang, ['prices']);
  const pageSeo = !!slug && (await getSeoBySlug({ lang, slug }));
  const { title, description, keywords } = pageSeo || {};

  return {
    title: title || t('prices.seo.title'),
    description: description || t('prices.seo.description'),
    keywords: keywords || t('prices.seo.keywords'),
    alternates: getAlternatesUrls({ slug, lang }),
    openGraph: {
      title: title || t('prices.seo.title'),
      description: description || t('prices.seo.description'),
      ...(getOgTagsDefault({ lang, slug }) || {}),
    },
  };
}

export default async function Prices({ params: { lang } }: IProps) {
  const services = await getServices({ lang });
  const { t } = await getTranslationServer(lang, ['prices', 'site']);

  return (
    <div className="page page-prices">
      <PricesHero />

      <Section className="prices-tariffs" container="md">
        <Title size="xlg" className="prices-tariffs__title" isCenter>
          {t('prices.tariffs.title')}
        </Title>
        <Tariffs
          services={services}
          isVisiblePromocode={false}
          viewType="accent"
          isCarousel
          isShowMinutes
          successUrl={'/cabinet'}
        />
      </Section>

      <Section
        className="prices-working section-radius-offset-top"
        container="md"
      >
        <WhileWorking
          image={
            <Image
              src="/img/while-working.png"
              alt={t('prices.while_working.title')}
            />
          }
        >
          <Title size="sm" className="prices-working__title">
            {t('prices.while_working.title')}
          </Title>
          <ul className="list">
            {t('prices.while_working.steps').map((item: any, idx: number) => {
              const IconComponent = get(workingIcons, [idx]);
              return (
                <li key={idx}>
                  <IconComponent />
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              );
            })}
          </ul>
          <div className="prices-working__footer">
            <Button
              href={ROUTES.psychologists}
              type="primary-old"
              weight="bold"
              shadow
              className="prices-main__cta"
              font="base"
            >
              {t('prices.while_working.btn_cta')}
            </Button>
          </div>
        </WhileWorking>
      </Section>

      <Section className="prices-faq" container="sm">
        <Title size="xlg" isCenter className="prices-faq__title">
          {t('prices.faq.title')}
        </Title>
        <FAQ items={t('prices.faq.options')} limitVisibleItems={6} />
      </Section>

      <ContactInfoSection
        title={t('site.contact_information.title')}
        items={t('site.contact_information.options')}
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
    </div>
  );
}
