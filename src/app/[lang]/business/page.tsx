import { Metadata } from 'next';
import Image from 'next/image';
import { ROUTES } from '@/config';
import { getTranslationServer } from '@/config/i18n';
import { LangType } from '@/config/i18n/settings';
import { getAlternatesUrls, getOgTagsDefault } from '@/utils/helpers';
import { ContentBlock } from '@/components/Content';
import { Container } from '@/components/Container';
import { Title } from '@/components/Title';
import { Section } from '@/components/Section';
import { TilesItems, TilesItem } from '@/components/TilesItems';
import { Breadcrumbs } from '@/views/Breadcrumbs';
import { ButtonCallback } from '@/views/ButtonCallback';
import './business.scss';
import { getSeoBySlug } from '@/utils/services';

interface IProps {
  params: { lang: LangType };
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const slug = 'business';
  const { lang } = params;
  const { t } = await getTranslationServer(lang, ['business', 'site']);
  const pageSeo = !!slug && (await getSeoBySlug({ lang, slug }));
  const { title, description, keywords } = pageSeo || {};

  return {
    title: title || t('business.seo.title'),
    description: description || t('business.seo.description'),
    keywords: keywords || t('business.seo.keywords'),
    alternates: getAlternatesUrls({ slug, lang }),
    openGraph: {
      title: title || t('business.seo.title'),
      description: description || t('business.seo.description'),
      ...(getOgTagsDefault({ lang, slug }) || {}),
    },
  };
}

export default async function Business({ params: { lang } }: IProps) {
  const { t } = await getTranslationServer(lang, ['business', 'site']);

  return (
    <div className="page page-default page-business">
      <Container size="sm">
        <Title size="lg" isCenter className="page-default-title" tag="h1">
          {t('business.title')}
        </Title>
        <Breadcrumbs
          items={[
            {
              label: t('site.breadcrumbs.business'),
              link: ROUTES.business,
            },
          ]}
        />

        <Section className="business-main">
          <h4 className="business-main__title">{t('business.main_title')}</h4>
          <p>{t('business.main_text')}</p>
        </Section>

        <Section className="business-stat">
          <div className="business-stat-items">
            {[1, 2, 3].map((idx: number) => (
              <div className="business-stat-item" key={idx}>
                <div
                  className="business-stat-item-media"
                  style={{
                    backgroundImage: `url(/img/business_circles_${idx}.png)`,
                  }}
                >
                  <div className="business-stat-item-count">
                    {t(`business.stat_item_${idx}.count`)}
                  </div>
                </div>
                <div className="business-stat-item-title">
                  {t(`business.stat_item_${idx}.title`)}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section className="section business-provide">
          <ContentBlock
            title={<h4>{t('business.provide_title')}</h4>}
            image={
              <Image
                src="/img/business_team.jpg"
                alt={t('business.provide_title')}
                loading="lazy"
                width={499}
                height={499}
              />
            }
          >
            <ul className="decimal">
              {t('business.provide_items')?.map((item: string, idx: number) => (
                <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </ContentBlock>
        </Section>

        <Section className="section business-help">
          <ContentBlock
            title={<h4>{t('business.help_title')}</h4>}
            image={
              <Image
                src="/img/offers1.jpg"
                alt={t('business.help_title')}
                loading="lazy"
                width={399}
                height={399}
              />
            }
            isReverse
          >
            <ul className="decimal">
              {t('business.help_items')?.map((item: string, idx: number) => (
                <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </ContentBlock>
        </Section>

        <Section className="section business-why">
          <ContentBlock
            title={<h4>{t('business.why_title')}</h4>}
            image={
              <Image
                src="/img/pd5FVvQ9-aY.jpg"
                alt={t('business.why_title')}
                loading="lazy"
                width={485}
                height={424}
              />
            }
          >
            <ul className="decimal">
              {t('business.why_items')?.map((item: string, idx: number) => (
                <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
            <ButtonCallback type="primary-old" size="sm" weight="bold" className="cta">
              {t('business.cta')}
            </ButtonCallback>
          </ContentBlock>
        </Section>

        <Section className="business-how_work">
          <Title font="base" isCenter>
            {t('business.how_work_title')}
          </Title>
          <TilesItems>
            {t('business.how_work_items')?.map((item: string, idx: number) => (
              <TilesItem
                key={idx}
                text={item}
                image={
                  <Image
                    src={`/img/business_hiw_0${idx + 1}.png`}
                    alt={t('business.how_work_title')}
                    loading="lazy"
                    width={50}
                    height={50}
                  />
                }
              />
            ))}
          </TilesItems>
        </Section>
      </Container>
    </div>
  );
}
