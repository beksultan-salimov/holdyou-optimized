import { Metadata } from 'next';
import { getTranslationServer } from '@/config/i18n';
import { LangType } from '@/config/i18n/settings';
import { getAlternatesUrls, getOgTagsDefault } from '@/utils/helpers';
import { getSeoBySlug } from '@/utils/services';
import { Section } from '@/components/Section';
import { Title } from '@/components/Title';
import { ContactsForm } from './ContactsForm';
import './contact.scss';

interface IProps {
  params: { lang: LangType };
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const slug = 'contact';
  const { lang } = params;
  const { t } = await getTranslationServer(lang, ['contact']);
  const pageSeo = !!slug && (await getSeoBySlug({ lang, slug }));
  const { title, description, keywords } = pageSeo || {};

  return {
    title: title || t('contact.seo.title'),
    description: description || t('contact.seo.description'),
    keywords: keywords || t('contact.seo.keywords'),
    alternates: getAlternatesUrls({ slug, lang }),
    openGraph: {
      title: title || t('contact.seo.title'),
      description: description || t('contact.seo.description'),
      ...(getOgTagsDefault({ lang, slug }) || {}),
    },
  };
}

export default async function Contact({ params: { lang } }: IProps) {
  const { t } = await getTranslationServer(lang, ['contact']);

  return (
    <div className="page page-contact">
      <Section container="lg">
        <Title size="lg" isCenter className="page-contact__title" tag="h1">
          {t('contact.title')}
        </Title>

        <div className="contact-block-wrapper">
          <div className="contact-block contact-block--content">
            <h4 className="contact-block__title">
              {t('contact.contacts_title')}
            </h4>
            <div className="contact-block__body">
              <ul className="contact-block-items">
                <li className="contact-block-item">
                  <a href="mailto:info@holdyou.net" className="contact-email">
                    info@holdyou.net
                  </a>
                </li>
                <li className="contact-block-item">
                  <a href="tel:0800336126" className="contact-phone">
                    0 800 336 126
                  </a>
                </li>
                <li className="contact-block-item">
                  <a href="tel:+380974970910" className="contact-phone">
                    +380 97 497 09 10
                  </a>
                  {/* <p>{t('contact.contact_phone_irpin')}</p> */}
                </li>
              </ul>
              <div className="contact-block-socials">
                <h5 className="contact-block-socials-title">
                  {t('contact.socials_title')}
                </h5>
                <ul className="contact-block-socials-items">
                  <li className="contact-block-socials-item">
                    <a href="https://business.facebook.com/holdyouhelp">
                      <img
                        src="/img/contact_facebook.svg"
                        alt="https://business.facebook.com/holdyouhelp"
                        title="https://business.facebook.com/holdyouhelp"
                      />
                    </a>
                  </li>
                  <li className="contact-block-socials-item">
                    <a href="https://www.instagram.com/holdyouhelp/">
                      <img
                        src="/img/contact_instagram.svg"
                        alt="https://www.instagram.com/holdyouhelp/"
                        title="https://www.instagram.com/holdyouhelp/"
                      />
                    </a>
                  </li>
                  <li className="contact-block-socials-item">
                    <a href="viber://chat?number=380974970910">
                      <img
                        src="/img/contact_viber.svg"
                        alt="380974970910"
                        title="380974970910"
                      />
                    </a>
                  </li>
                  <li className="contact-block-socials-item">
                    <a href="tg://resolve?domain=HoldYouHelp">
                      <img
                        src="/img/contact_telegram.svg"
                        alt="HoldYouHelp"
                        title="HoldYouHelp"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="contact-block contact-block--form">
            <h4 className="contact-block__title">{t('contact.form_title')}</h4>
            <ContactsForm />
          </div>
        </div>
      </Section>
    </div>
  );
}
