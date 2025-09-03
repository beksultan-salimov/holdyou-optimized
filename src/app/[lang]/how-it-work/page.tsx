import { Metadata } from 'next';
import { ROUTES } from '@/config';
import { LangType } from '@/config/i18n/settings';
import { getTranslationServer } from '@/config/i18n';
import { getAlternatesUrls, getOgTagsDefault } from '@/utils/helpers';
import { getSeoBySlug } from '@/utils/services';
import { Section } from '@/components/Section';
import { Title } from '@/components/Title';
import { Tiles1 } from '@/components/Tiles1';
import { ContentBlock } from '@/components/Content';
import { Button } from '@/components/Button';
import { HowConsultation } from '@/views/HowConsultation';
import './how-it-work.scss';

interface IProps {
  params: { lang: LangType };
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const slug = 'how-it-work';
  const { lang } = params;
  const { t } = await getTranslationServer(lang, ['how_it_work']);
  const pageSeo = !!slug && (await getSeoBySlug({ lang, slug }));
  const { title, description, keywords } = pageSeo || {};

  return {
    title: title || t('how_it_work.seo.title'),
    description: description || t('how_it_work.seo.description'),
    keywords: keywords || t('how_it_work.seo.keywords'),
    alternates: getAlternatesUrls({ slug, lang }),
    openGraph: {
      title: title || t('how_it_work.seo.title'),
      description: description || t('how_it_work.seo.description'),
      ...(getOgTagsDefault({ lang, slug }) || {}),
    },
  };
}

export default async function HowItWork({ params: { lang } }: IProps) {
  const { t } = await getTranslationServer(lang, ['how_it_work', 'site']);

  return (
    <div className="page page-default page-hiw">
      <Section className="hiw-main" container="sm">
        <Title size="xlg" isCenter className="hiw-main__title" tag="h1">
          {t('how_it_work.title')}
        </Title>

        <ContentBlock
          image={
            <img
              src="/img/how_it_work.png"
              alt={t('how_it_work.main.title')}
              className="lazy"
            />
          }
          type="info"
          shadow="light"
        >
          <Title tag="h4" weight="normal" font="base">
            {t('how_it_work.main.title')}
          </Title>
          <div
            className="s-info-content"
            dangerouslySetInnerHTML={{
              __html: t('how_it_work.main.description'),
            }}
          />
        </ContentBlock>
      </Section>

      <Section className="hiw-steps" container="sm">
        <Title size="xlg" tag="h4" isCenter className="hiw-steps__title">
          {t('how_it_work.steps_title')}
        </Title>
        <HowConsultation t={t} />
      </Section>

      <Section className="hiw-choice" container="sm">
        <ContentBlock
          image={<img src="/img/how_choose.png" alt="" />}
          isImageShadow={false}
          isReverse
          className="m_hiwChoice"
          type="info"
        >
          <Title size="xlg" tag="h4">
            {t('how_it_work.how_choose.title')}
          </Title>

          <ul>
            {t('how_it_work.how_choose.items')?.map(
              ({ title, text }: any, idx: number) => (
                <li key={idx}>
                  <span className="hiw-choice-accent">{title}</span>
                  {text}
                </li>
              )
            )}
          </ul>

          <Button
            href={ROUTES.psychologists}
            type="primary-old"
            weight="bold"
            size="sm"
            className="hiw-choice-cta"
          >
            {t('how_it_work.how_choose.btn')}
          </Button>
        </ContentBlock>
      </Section>

      <Section className="hiw-dont" container="sm">
        <Title size="sm" tag="h4" isCenter className="hiw-dont__title">
          {t('how_it_work.what_not_do.title')}
        </Title>
        <Tiles1 items={t('how_it_work.what_not_do.items')} />
      </Section>
    </div>
  );
}
