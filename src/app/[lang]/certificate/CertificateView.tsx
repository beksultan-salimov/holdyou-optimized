'use client';
import Image from 'next/image';
import { MODALS } from '@/config';
import { LangType } from '@/config/i18n/settings';
import { useTranslationClient } from '@/config/i18n/client';
import { splitIntoRows } from '@/utils/helpers';
import { useModals } from '@/hooks/useModals';
import { Title } from '@/components/Title';
import { ScrollLink } from '@/components/ScrollLink';
import { Button } from '@/components/Button';
import { Section } from '@/components/Section';
import { Tariffs } from '@/views/Tariffs';

interface IProps {
  lang: LangType;
  services: Array<any>;
}
const CertificateView = ({ lang, services }: IProps) => {
  const { t } = useTranslationClient(lang, ['certificate']);
  const { modalOpen } = useModals();
  const handleClickOrder = (gift: string) => {
    modalOpen(MODALS.callback, {
      isOpen: true,
      initialValues: {
        subjects: t('certificate.order_prefix'),
        msg: `${t('certificate.order_prefix')}: ${gift}`,
      },
    });
  };

  return (
    <div className="page page-certificate">
      <Section className="certificate-main" container="sm">
        <div className="section-content">
          <div className="certificate-main__gift">
            <Image
              loading="lazy"
              src="/img/gift.png"
              alt={t('certificate.main.title')}
              width={317}
              height={180}
            />
          </div>
          <Title
            tag="h1"
            size="lg"
            isCenter
            className="certificate-main__title"
          >
            {t('certificate.main.title')}
          </Title>
          <div className="certificate-main__gift-text">
            <p>{t('certificate.main.description')}</p>
          </div>
          <ScrollLink
            href="#gifts"
            offset={-100}
            className="certificate-main__cta"
          >
            <Button type="primary-old" shadow>
              {t('certificate.main.btn_cta')}
            </Button>
          </ScrollLink>
        </div>
      </Section>

      <Section className="certificate-about" container="sm">
        <div className="certificate-about__inner">
          <div
            className="certificate-about__col-content"
            dangerouslySetInnerHTML={{
              __html: splitIntoRows(t('certificate.about.text')),
            }}
          />
          <div className="certificate-about__col-media">
            <Image
              loading="lazy"
              src="/img/certificates.png"
              alt={t('certificate.main.title')}
              width={734}
              height={433}
            />
          </div>
        </div>
      </Section>

      <Section className="certificate-steps" container="sm">
        <Title tag="h2" size="lg" isCenter className="certificate-main__title">
          {t('certificate.steps.title')}
        </Title>
        <div className="steps">
          <div className="step">
            <div className="step__text">
              <p>{t('certificate.steps.step_1_description')}</p>
            </div>
          </div>
          <div className="step">
            <div className="step__text">
              <p>{t('certificate.steps.step_2_description')}</p>
            </div>
          </div>
          <div className="step">
            <div className="step__text">
              <p>{t('certificate.steps.step_3_description')}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="certificate-gifts" container="sm" id="gifts">
        <Title tag="h2" size="lg" isCenter className="certificate-main__title">
          {t('certificate.gifts.title')}
        </Title>

        <Tariffs
          services={services}
          isVisiblePromocode={false}
          viewType="custom"
          isCarousel
          isCertificate
        />
      </Section>

      <Section className="certificate-use" container="sm">
        <Title tag="h2" size="lg" isCenter className="certificate-main__title">
          {t('certificate.use.title')}
        </Title>
        <div className="how-items">
          <div className="how-item">
            <div className="how-item__image">
              <Image
                className="img1"
                loading="lazy"
                src="/img/icons/register.svg"
                alt={t('certificate.use.step_1_title')}
              />
            </div>
            {/* <h3 className="how-item__title">
              {t('certificate.use.step_1_title')}
            </h3> */}
            <div className="how-item__text">
              <p>{t('certificate.use.step_1_description')}</p>
            </div>
          </div>
          <div className="how-item">
            <div className="how-item__image">
              <Image
                loading="lazy"
                src="/img/icons/love-message.svg"
                alt={t('certificate.use.step_2_description')}
              />
            </div>
            {/* <h3 className="how-item__title">
              {t('certificate.use.step_2_title')}
            </h3> */}
            <div className="how-item__text">
              <p>{t('certificate.use.step_2_description')}</p>
            </div>
          </div>
          <div className="how-item">
            <div className="how-item__image">
              <Image
                className="img2"
                loading="lazy"
                src="/img/icons/online-recruitment.svg"
                alt={t('certificate.use.step_3_title')}
              />
            </div>
            {/* <h3 className="how-item__title">
              {t('certificate.use.step_3_title')}
            </h3> */}
            <div className="how-item__text">
              <p>{t('certificate.use.step_3_description')}</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export { CertificateView };
