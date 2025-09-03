'use client';
import Image from 'next/image';
import { ROUTES } from '@/config';
import { useTranslationClient } from '@/config/i18n/client';
import { generatePageLink } from '@/utils/helpers';
import { useLang } from '@/hooks/useLang';
import { Link } from '@/components/Link';
import { Container } from '@/components/Container';
import headerLogo from '@/static/img/headerLogo.svg';
import instagramIcon from '@/static/img/instagram.svg';
import facebookIcon from '@/static/img/facebook.svg';
import phoneIcon from '@/static/img/phoneIconBlack.svg';
import envelopeIcon from '@/static/img/envelopeIcon.svg';
import telegramIcon from '@/static/img/telegram.svg';
import s from './footer.module.scss';
import NavLink from "@/components/NavLink";

const Footer = () => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);

  const menu_1 = [
    {
      label: t('site.footer.terms'),
      link: generatePageLink(lang, 'terms'),
    },
    {
      label: t('site.footer.privacy_policy'),
      link: generatePageLink(lang, 'privacy-policy'),
    },
  ];
  const menu_2 = [
    {
      label: t('site.header.how_it_work'),
      link: ROUTES.howItWork,
    },
    {
      label: t('site.header.prices'),
      link: ROUTES.prices,
    },
    {
      label: t('site.header.news'),
      link: ROUTES.news,
    },
    {
      label: t('site.header.reviews'),
      link: ROUTES.reviews,
    },
    {
      label: t('site.header.contacts'),
      link: ROUTES.contacts,
    },
    {
      label: t('site.header.certificate'),
      link: ROUTES.certificate,
    },
    {
      label: t('site.header.sitemap'),
      link: ROUTES.sitemap,
    },
    // {
    //   label: t('site.footer.about_us'),
    //   link: ROUTES.about_us,
    // },
  ];
  const menu_3 = [
    {
      label: t('site.header.all_psychologists'),
      link: ROUTES.psychologists,
    },
    {
      label: t('site.header.services_page.psycholog-sexolog'),
      link: generatePageLink(lang, 'psycholog-sexolog'),
    },
    {
      label: t('site.header.services_page.family-psychologist'),
      link: generatePageLink(lang, 'family-psychologist'),
    },
    {
      label: t('site.header.business'),
      link: ROUTES.business,
    },
    {
      label: t('site.header.services_page.kpt-terapevt-online'),
      link: generatePageLink(lang, 'kpt-terapevt-online'),
    },
  ]
  const menu_4 = [
    {
      label: t('site.header.krizova-psihologya'),
      link: generatePageLink(lang, 'krizova-psihologya'),
    },
    {
      label: t('site.header.kogntivno-povednkova-terapya-kpt'),
      link: generatePageLink(lang, 'kogntivno-povednkova-terapya-kpt'),
    },
    {
      label: t('site.header.geshtalt_terapya'),
      link: generatePageLink(lang, 'geshtalt-terapiya'),
    },
    {
      label: t('site.header.art_terapya'),
      link: generatePageLink(lang, 'art-terapya'),
    },
    {
      label: t('site.header.psihodinamchnij-pdhd'),
      link: generatePageLink(lang, 'psihodinamchnij-pdhd'),
    },
    {
      label: t('site.header.kazkoterapya'),
      link: generatePageLink(lang, 'kazkoterapya'),
    },
  ];
  // const menu_5 = [
  //   {
  //     label: t('site.header.psyhologichni_testy'),
  //     link: ROUTES.psyhologichni_testy,
  //   },
  //   {
  //     label: t('site.header.personalities'),
  //     link: ROUTES.personalities,
  //   },
  //   {
  //     label: t('site.header.courses'),
  //     link: ROUTES.courses,
  //   },
  //   {
  //     label: t('site.header.dorosly_temy'),
  //     link: ROUTES.dorosly_temy,
  //   },
  //   {
  //     label: t('site.header.services_page.zalezhnist-ta-spivzalezhnist'),
  //     link: generatePageLink(lang, 'zalezhnist-ta-spivzalezhnist'),
  //   },
  // ];

    // {
    //   label: t('site.header.problems'),
    //   link: ROUTES.problems,
    // },
    // {
    //   label: t('site.header.services_page.teenage-psychologist'),
    //   link: generatePageLink(lang, 'teenage-psychologist'),
    // },
    // {
    //   label: t('site.header.services_page.psychotherapist-online'),
    //   link: generatePageLink(lang, 'psychotherapist-online'),
    // },
    // {
    //   label: t('site.header.services_page.coach-online'),
    //   link: generatePageLink(lang, 'coach-online'),
    // },
    // {
    //   label: t('site.header.offline_centers'),
    //   link: ROUTES.offlineCenters,
    // },

  return (
    <footer className={s.footer}>
      <Container size="md">
        <div className={s.inner}>
          <div className={`${s.col} ${s.col_description}`}>
            <Link href={ROUTES.home} className={s.logo} aria-label="HoldYou">
              <Image src={headerLogo} width={64} height={52} alt="HoldYou" />
            </Link>
            <div className={s.description}>
              <p
                dangerouslySetInnerHTML={{
                  __html: t('site.footer.description'),
                }}
                className={s.description_info}
              />

              {/* <span className={s.col_title}>{t('site.contacts.title_two')}</span>
              <ul className={s.menu_list}>
                <li>
                  <a href="mailto:info@holdyou.net" target="_blank">
                    <Image src={envelopeIcon} alt="Email" />
                    info@holdyou.net
                  </a>
                </li>
                <li>
                  <a href="tel:0800336126" target="_blank">
                    <Image src={phoneIcon} alt="Телефон" />0 800 336 126
                  </a>
                </li>
              </ul>
              <span className={s.col_title}>
                {t('site.footer.social_networks')}
              </span>
              <ul className={s.socials}>
                <li>
                  <a href="https://www.instagram.com/holdyouhelp/" target="_blank">
                    <Image src={instagramIcon} alt="Instagram" />
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/holdyouhelp" target="_blank">
                    <Image src={facebookIcon} alt="Facebook" />
                  </a>
                </li>
                <li>
                  <a href="tg://resolve?domain=HoldYouHelp" target="_blank">
                    <Image src={telegramIcon} alt="Telegram" />
                  </a>
                </li>
              </ul> */}

              {/* <ul className={s.menu_list}>
                {menu_1?.map((item, idx) => (
                  <li key={`menu_1_${idx}`}>
                    <Link href={item?.link}>{item?.label}</Link>
                  </li>
                ))}
              </ul> */}

              <p className={s.copyright}>
                © Holdyou, {t('site.footer.copyright')},{' '}
                {new Date().getFullYear()}
              </p>
            </div>
          </div>
          <div className={`${s.col} ${s.col_menu_about}`}>
            <span className={s.col_title}>{t('site.footer.about_site')}</span>
            <ul className={s.menu_list}>
              {menu_2?.map((item, idx) => (
                <li key={`menu_2_${idx}`}>
                  <NavLink className={"footer-menu-item"} href={item?.link}>{item?.label}</NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className={`${s.col} ${s.col_menu_services}`}>
            <span className={s.col_title}>{t('site.header.services')}</span>
            <ul className={s.menu_list}>
              {menu_3?.map((item, idx) => (
                <li key={`menu_3_${idx}`}>
                  <NavLink className={"footer-menu-item"} href={item?.link}>{item?.label}</NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className={`${s.col} ${s.col_menu_approaches}`}>
            <span className={s.col_title}>{t('site.header.approaches')}</span>
            <ul className={s.menu_list}>
              {menu_4?.map((item, idx) => (
                <li key={`menu_4_${idx}`}>
                  <NavLink className={"footer-menu-item"} href={item?.link}>{item?.label}</NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className={`${s.col} ${s.col_contacts}`}>
            {/* <span className={s.col_title}>{t('site.footer.other_links')}</span>
            <ul className={s.menu_list}>
              {menu_5?.map((item, idx) => (
                <li key={`menu_5_${idx}`}>
                  <Link href={item?.link}>{item?.label}</Link>
                </li>
              ))}
            </ul> */}
            <span className={s.col_title}>{t('site.contacts.title_two')}</span>
            <ul className={s.menu_list}>
              <li>
                <a href="mailto:info@holdyou.net" target="_blank">
                  <Image src={envelopeIcon} alt="Email" />
                  info@holdyou.net
                </a>
              </li>
              <li>
                <a href="tel:0800336126" target="_blank">
                  <Image src={phoneIcon} alt="Телефон" />0 800 336 126
                </a>
              </li>
            </ul>
            <span className={s.col_title}>
              {t('site.footer.social_networks')}
            </span>
            <ul className={s.socials}>
              <li>
                <a
                  href="https://www.instagram.com/holdyouhelp/"
                  target="_blank"
                >
                  <Image src={instagramIcon} alt="Instagram" />
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/holdyouhelp" target="_blank">
                  <Image src={facebookIcon} alt="Facebook" />
                </a>
              </li>
              <li>
                <a href="tg://resolve?domain=HoldYouHelp" target="_blank">
                  <Image src={telegramIcon} alt="Telegram" />
                </a>
              </li>
            </ul>

            <div className={s.menu_terms}>
              <ul className={s.menu_list}>
                {menu_1?.map((item, idx) => (
                  <li key={`menu_1_${idx}`}>
                    <Link href={item?.link}>{item?.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export { Footer };
