'use client';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { ROUTES } from '@/config';
import { useTranslationClient } from '@/config/i18n/client';
import { LangType } from '@/config/i18n/settings';
import { getIntegerFromString, splitIntoRows } from '@/utils/helpers';
import { INews } from '@/types/NewsTypes';
import { IOfflineCenter } from '@/types/OfflineCenterTypes';
import { IPsychologist } from '@/types';
import { Hero, HeroImage } from '@/components/Hero';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { Icon } from '@/components/Icon';
import { Section } from '@/components/Section';
import { Text } from '@/components/Text';
import { Title } from '@/components/Title';
import { FAQ } from '@/components/FAQ';
import { AppMap } from '@/components/Map';
import { ScrollLink } from '@/components/ScrollLink';
import { Select } from '@/components/Select';
import { PsychologistsList } from '@/views/PsychologistsList';
import { BlogCarousel } from '@/views/BlogCarousel';
import { FeedbackFormOfflineCenters } from '@/views/FeedbackFormOfflineCenters';
import { NoWork } from '@/views/NoWork';
import backgroundFeedbackImg from '@/static/img/backgroundFeedbackForm.png';
import noworkImg from '@/static/img/noworkBanner.svg';

interface IProps {
  lang: LangType;
  news: INews[];
  offlineCenters: IOfflineCenter[];
  psychologists: IPsychologist[];
}

export const OfflineCentersView = ({
  lang,
  news,
  offlineCenters,
  psychologists,
}: IProps) => {
  const [activeCenterId, setActiveCenterId] = useState(offlineCenters[0]?.id);
  const { t } = useTranslationClient(lang, ['offline_centers']);

  const activeCenter = useMemo(() => {
    return offlineCenters?.find(
      ({ id }: { id: number }) => id === activeCenterId
    );
  }, [activeCenterId, offlineCenters]);

  const filteredPsychologists = useMemo(() => {
    return psychologists.filter((i) => (i?.centers || []).includes(activeCenterId));
  }, [psychologists, activeCenterId]);

  const faqItems = useMemo(() => {
    return activeCenter?.services?.map((s) => {
      return {
        title: s?.name,
        text: splitIntoRows(s?.descriptions),
        footer: (
          <div className="oc-faq-item-services">
            {s?.service_descriptions?.map((d) => (
              <div className="oc-faq-item-service" key={d.id}>
                <div className="col-left">
                  <span>{d.text}</span>
                </div>
                <div className="col-right">
                  <span className="oc-faq-item-service__price">
                    {getIntegerFromString(d.price)} грн.
                  </span>
                  {!!s.url && (
                    <Button
                      href={s.url}
                      className="oc-faq-item-service__btn"
                      shadow
                      type="primary-old"
                      weight="bold"
                      isLang={false}
                    >
                      {t('offline_centers.faq.btn_more')}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ),
      };
    })
  }, [activeCenter]);

  return (
    <>
      <Section className="oc-main" container="sm">
        <Hero
          image={
            <HeroImage>
              <Image
                loading="lazy"
                src="/img/oc-main.jpg"
                alt={t('prices.main.btn_cta')}
                fill
                // width={675}
                // height={675}
              />
            </HeroImage>
          }
        >
          <Title size="xlg" tag="h1" className="oc-main__title">
            {t('offline_centers.main.title')}
          </Title>
          <Text>
            <p
              dangerouslySetInnerHTML={{
                __html: t('offline_centers.main.description'),
              }}
            />
          </Text>
          <ScrollLink href="#oc-feedback" className="oc-main__cta">
            <Button type="primary-old" weight="bold" shadow>
              {t('offline_centers.main.btn_cta')}
            </Button>
          </ScrollLink>
        </Hero>
      </Section>

      {!!offlineCenters && offlineCenters?.length > 0 && (
        <Section className="oc-addresses" container="sm" id="oc-addresses">
          <Title size="xlg" isCenter className="section-title">
            {t('offline_centers.addresses.title')}
          </Title>

          <div className="oc-addresses__selector">
            <div className="oc-addresses__selector__header">
              {t('offline_centers.addresses.choose_center')}
            </div>
            <div className="oc-addresses__selector__body">
              <Select
                className="oc-addresses-select"
                onChange={(val: any) => {
                  setActiveCenterId(Number(val));
                }}
                options={offlineCenters?.map((oc) => ({
                  label: oc?.address,
                  value: oc?.id,
                }))}
                value={activeCenterId}
              />
            </div>
          </div>

          <div className="oc-addresses__content">
            {offlineCenters?.map((oc) => (
              <div
                id={`oc-addresses-${oc.id}`}
                className={clsx('oc-addresses__item', {
                  active: oc.id === activeCenterId,
                })}
                key={oc.id}
              >
                <div className="oc-addresses__info">
                  <div className="bl-address">
                    {/* TODO fix city, street */}
                    <div className="bl-address__city">
                      {oc.address.split(' ').slice(0, 2).join(' ')}
                    </div>
                    <div className="bl-address__text">
                      {oc.address.split(' ').slice(2).join(' ')}
                    </div>
                  </div>
                  <div className="bl-phone">
                    <a
                      href={`tel:${oc.phone.replaceAll(' ', '')}`}
                      className="bl-phone__number"
                    >
                      {oc.phone}
                    </a>
                    <span className="bl-phone__text">{oc.description}</span>
                  </div>
                  <ScrollLink href="#oc-feedback">
                    <Button
                      type="primary-old"
                      weight="bold"
                      shadow
                      className="oc-addresses__info__btn"
                    >
                      {t('offline_centers.addresses.btn_order')}
                    </Button>
                  </ScrollLink>
                </div>

                <div className="oc-addresses__map">
                  <AppMap center={[oc?.latitude, oc?.longitude]} zoom={16}>
                    {({ TileLayer, Marker, Popup }: any) => (
                      <>
                        <TileLayer
                          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                          maxNativeZoom={19}
                        />
                        <Marker
                          key={oc?.address}
                          position={[oc?.latitude, oc?.longitude]}
                        >
                          <Popup>
                            <p style={{ textAlign: 'center' }}>{oc?.address}</p>
                          </Popup>
                        </Marker>
                      </>
                    )}
                  </AppMap>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section className="oc-faq" container="xs">
        <Title isCenter size="xlg" className="section-title">
          {t('offline_centers.faq.title')}
        </Title>
        <FAQ items={faqItems} defaultActiveKeys={[0]} />
      </Section>

      <Section className="oc-pshs" container="sm">
        <Title size="xlg" isCenter className="section-title">
          {t('offline_centers.pshs.title')}
        </Title>
        <PsychologistsList items={filteredPsychologists} isOfflinePage={true} />
      </Section>

      <Section className="oc-blog" container="sm">
        <Title size="xlg" isCenter className="section-title">
          {t('offline_centers.blog.title')}
        </Title>
        <BlogCarousel items={news} />
        <Button
          href={ROUTES.news}
          type="primary-old"
          size="md"
          weight="bold"
          className="oc-blog-more"
          shadow
        >
          {t('offline_centers.blog.button')}
        </Button>
      </Section>

      <Section className="oc-nowork" container="sm">
        <div className="oc-nowork__row">
          <div className="oc-nowork__col">
            <div className="nowork-banner">
              <Image loading="lazy" src={noworkImg} alt="" />
            </div>
          </div>
          <div className="oc-nowork__col oc-nowork__col--content">
            <NoWork
              title={t('offline_centers.nowork.title')}
              items={t('offline_centers.nowork.options')}
            />
          </div>
        </div>
      </Section>

      <Section className="oc-feedback" id="oc-feedback">
        <Container size="sm">
          <FeedbackFormOfflineCenters
            title={
              <Title size="sm" className="oc-feedback__title" weight="bold">
                {t('offline_centers.feedback_form.title')}
              </Title>
            }
            subTitle={
              <Text className="oc-feedback__subtitle" size="18">
                <Icon name="Pin" />
                <span>
                  {t('offline_centers.feedback_form.subtitle_address')}
                </span>
                <span>{activeCenter?.address}</span>
              </Text>
            }
            address={activeCenter?.address}
          />
        </Container>

        <Image
          className="oc-feedback__image"
          loading="lazy"
          src={backgroundFeedbackImg}
          alt="HoldYou"
          width={813}
          height={585}
        />
      </Section>
    </>
  );
};
