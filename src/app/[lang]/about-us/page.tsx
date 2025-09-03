import { Metadata } from 'next';
import { ROUTES } from '@/config';
import { getTranslationServer } from '@/config/i18n';
import { LangType } from '@/config/i18n/settings';
import { getAlternatesUrls, getOgTagsDefault } from '@/utils/helpers';
import { getSeoBySlug } from '@/utils/services';
import ListItems from '@/components/ListItems';
import { ContentBlock } from '@/components/Content';
import { Container } from '@/components/Container';
import { Title } from '@/components/Title';
import { Section } from '@/components/Section';
import { TeamCards } from '@/views/Team';
import { Breadcrumbs } from '@/views/Breadcrumbs';
import './about.scss';
import Image from "next/image";

interface IProps {
  params: { lang: LangType };
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const slug = 'about-us';
  const { lang } = params;
  const { t } = await getTranslationServer(lang, ['about']);
  const pageSeo = !!slug && (await getSeoBySlug({ lang, slug }));
  const { title, description, keywords } = pageSeo || {};

  return {
    title: title || t('about.seo.title'),
    description: description || t('about.seo.description'),
    keywords: keywords || t('about.seo.keywords'),
    alternates: getAlternatesUrls({ slug, lang }),
    openGraph: {
      title: title || t('about.seo.title'),
      description: description || t('about.seo.description'),
      ...(getOgTagsDefault({ lang, slug }) || {}),
    },
  };
}

export default async function About({ params: { lang } }: IProps) {
  const { t } = await getTranslationServer(lang, ['about', 'site']);
  const team = t('about.team.members').map(
    ({ name, text }: { name: string; text: string }, idx: number) => ({
      id: idx + 1,
      image: `/img/team${idx + 1}.jpg`,
      name: name,
      text: text,
    })
  );

  return (
    <div className="page page-default page-about">
      <Container size="sm">
        <Title size="lg" isCenter className="page-default-title" tag="h1">
          {t('about.title')}
        </Title>
        <Breadcrumbs
          items={[
            {
              label: t('site.breadcrumbs.about_us'),
              link: ROUTES.about_us,
            },
          ]}
        />

        <div className="about-description">
          <p>
            {t('about.description1')}
            <span className="holdyou_label">
              <b>Hold</b>
              <b>You</b>
            </span>
            {t('about.description2')}
          </p>
        </div>

        <Section className="about-start">
          <ContentBlock
            title={
              <Title tag="h2" size="md" weight="bold" isCenter>
                {t('about.start.title')}
              </Title>
            }
            image={<Image src="/img/about_us_1.jpg" alt={t('about.title')} />}
          >
            {t('about.start.description')?.map((item: string, idx: number) => (
              <p
                key={idx}
                dangerouslySetInnerHTML={{
                  __html: item,
                }}
              />
            ))}
          </ContentBlock>
        </Section>

        <Section className="about-help">
          <Title tag="h3" size="md" isCenter weight="bold">
            {t('about.help.title')}
          </Title>
          <ListItems items={t('about.help.options')} />
        </Section>

        <Section className="about-team">
          <Title tag="h3" size="md" isCenter weight="bold">
            {t('about.team.title')}
          </Title>
          <TeamCards items={team} />
        </Section>
      </Container>
    </div>
  );
}
