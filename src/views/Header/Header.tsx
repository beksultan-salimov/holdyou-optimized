'use client';
import {memo, Suspense, useMemo, useRef, useState} from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import {ROUTES} from '@/config';
import {useTranslationClient} from '@/config/i18n/client';
import {generatePageLink} from '@/utils/helpers';
import {useLang} from '@/hooks/useLang';
// import { useScrollHandler } from '@/hooks/useScrollHandler';
import {Link} from '@/components/Link';
import {Container} from '@/components/Container';
import {Button} from '@/components/Button';
import {CloseIcon} from '@/components/Icons/CloseIcon';
import {MenuIcon} from '@/components/Icons/MenuIcon';
import {LangSwitcher} from '@/views/LangSwitcher';
import {SpecialOfferMobile} from '../SpecialOffer/SpecialOfferMobile';
import {AppPanelTop} from '@/views/AppPanelTop';
import headerLogoImg from '@/static/img/headerLogo.svg';
import BtnAuth from './BtnAuth';
import s from './header.module.scss';
import NavLink from "@/components/NavLink";

const MenuItem = ({item}: any) => {
    const {label, link, children} = item || {};
    const [isOpen, toggleOpen] = useState(false);
    const closeMenu = () => {
        document.removeEventListener('click', closeMenu);
        toggleOpen(false);
    };

    const handleToggleOpen = () => {
        if (!isOpen) {
            document.addEventListener('click', closeMenu);
        }
        toggleOpen(!isOpen);
    };

    return (
        <li
            className={clsx(s.menu_has_nested, {
                [s.menu_has_nested_active]: isOpen,
            })}
            onClick={handleToggleOpen}
        >
            {!!children ? (
                <>
                    <span>{label}</span>
                    <ul
                        className={clsx(s.menu_nested, {[s.menu_nested_active]: isOpen})}
                    >
                        {children.map((_item: any, _idx: number) => (
                            <MenuItem
                                item={_item}
                                key={_idx}
                                // handleToggleMenu={handleToggleMenu}
                            />
                        ))}
                    </ul>
                </>
            ) : (
                <NavLink className={"header-menu-item"} href={link}>{label}</NavLink>
            )}
        </li>
    );
};

const Header = memo(function Header() {
    const [isOpenMenu, setOpenMenu] = useState(false);
    const {lang} = useLang();
    const {t} = useTranslationClient(lang, ['site']);
    const menuItems = useMemo(
        () => [
            {
                label: t('site.header.about_site'),
                children: [
                    {
                        label: t('site.header.about'),
                        link: ROUTES.about_us,
                    },
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
                ],
            },
            {
                label: t('site.header.psychologists'),
                children: [
                    {
                        label: t('site.header.all_psychologists'),
                        link: ROUTES.psychologists,
                    },
                    {
                        label: t('site.header.dytyachyy-psykholoh'),
                        link: generatePageLink(lang, 'dytyachyy-psykholoh'),
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
                        label: t('site.header.services_page.coach-online'),
                        link: generatePageLink(lang, 'coach-online'),
                    },
                    {
                        label: t('site.header.services_page.teenage-psychologist'),
                        link: generatePageLink(lang, 'teenage-psychologist'),
                    },
                    {
                        label: t('site.header.business'),
                        link: ROUTES.business,
                    },
                    {
                        label: t('site.header.services_page.kpt-terapevt-online'),
                        link: generatePageLink(lang, 'kpt-terapevt-online'),
                    },
                    {
                        label: t('site.header.services_page.psychotherapist-online'),
                        link: generatePageLink(lang, 'psychotherapist-online'),
                    },
                    {
                        label: t('site.header.junior-psyshologiest'),
                        link: generatePageLink(lang, 'junior-psyshologiest'),
                    },
                    {
                        label: t('site.header.services_page.psychiatrist'),
                        link: generatePageLink(lang, 'konsultatsya-psihatra'),
                    },
                ],
            },
            {
                label: t('site.header.approaches'),
                children: [
                    {
                        label: t('site.header.kouching'),
                        link: generatePageLink(lang, 'kouching'),
                    },
                    {
                        label: t('site.header.simvoldrama'),
                        link: generatePageLink(lang, 'simvoldrama'),
                    },
                    {
                        label: t('site.header.klient-tsentrovana-terapya'),
                        link: generatePageLink(lang, 'klient-tsentrovana-terapya'),
                    },
                    {
                        label: t('site.header.krizova-psihologya'),
                        link: generatePageLink(lang, 'krizova-psihologya'),
                    },
                    {
                        label: t('site.header.metaforichn-asotsativn-karti-mak'),
                        link: generatePageLink(lang, 'metaforichn-asotsativn-karti-mak'),
                    },
                    {
                        label: t('site.header.psihodrama'),
                        link: generatePageLink(lang, 'psihodrama'),
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
                        label: t('site.header.tranzaktnij-analz'),
                        link: generatePageLink(lang, 'tranzaktnij-analz'),
                    },
                    {
                        label: t('site.header.sistemna-smejna-terapya'),
                        link: generatePageLink(lang, 'sistemna-smejna-terapya'),
                    },
                    {
                        label: t('site.header.pozitivna-psihoterapya'),
                        link: generatePageLink(lang, 'pozitivna-psihoterapya'),
                    },
                    {
                        label: t('site.header.psihoanalz'),
                        link: generatePageLink(lang, 'psihoanalz'),
                    },
                    {
                        label: t('site.header.psihodinamchnij-pdhd'),
                        link: generatePageLink(lang, 'psihodinamchnij-pdhd'),
                    },
                    {
                        label: t('site.header.kazkoterapya'),
                        link: generatePageLink(lang, 'kazkoterapya'),
                    },
                    {
                        label: t('site.header.nlp'),
                        link: generatePageLink(lang, 'nejrolngvstichne-programuvannya-nlp'),
                    },
                ],
            },
            {
                label: t('site.header.more_interesting'),
                children: [
                    {
                        label: t('site.header.dorosly_temy'),
                        link: ROUTES.dorosly_temy,
                    },
                    {
                        label: t('site.header.personalities'),
                        link: ROUTES.personalities,
                    },
                    {
                        label: t('site.header.courses'),
                        link: ROUTES.courses,
                    },
                    {
                        label: t('site.header.problems'),
                        link: ROUTES.problems,
                    },
                    {
                        label: t('site.header.psyhologichni_testy'),
                        link: ROUTES.psyhologichni_testy,
                    },
                    {
                        label: t('site.header.services_page.zalezhnist-ta-spivzalezhnist'),
                        link: generatePageLink(lang, 'zalezhnist-ta-spivzalezhnist'),
                    },
                ],
            },

            // {
            //   label: t('site.header.offline_centers'),
            //   children: [
            //     {
            //       label: t('site.header.offline_centers'),
            //       link: ROUTES.offlineCenters,
            //     },
            //     {
            //       label: t('site.header.oc_page.psykholoh-psykhoterapevt'),
            //       link: generatePageLink(lang, 'psykholoh-psykhoterapevt'),
            //     },
            //     {
            //       label: t('site.header.oc_page.pidlitkovyy-psykholoh'),
            //       link: generatePageLink(lang, 'pidlitkovyy-psykholoh'),
            //     },
            //     {
            //       label: t('site.header.oc_page.dytyachyy-psykholoh-offline'),
            //       link: generatePageLink(lang, 'dytyachyy-psykholoh-offline'),
            //     },
            //     {
            //       label: t('site.header.oc_page.ranniy-rozvytok'),
            //       link: generatePageLink(lang, 'ranniy-rozvytok'),
            //     },
            //     {
            //       label: t('site.header.oc_page.pidhotovka-do-shkoly'),
            //       link: generatePageLink(lang, 'pidhotovka-do-shkoly'),
            //     },
            //     {
            //       label: t('site.header.oc_page.transformatsiyni-ihry'),
            //       link: generatePageLink(lang, 'transformatsiyni-ihry'),
            //     },
            //   ],
            // },
        ],
        [t, lang]
    );
    const scrollPosition = useRef(0);
    const handleToggleMenu = () => {
        if (!isOpenMenu) {
            document.body.classList.add('no-scroll');

            scrollPosition.current = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollPosition.current}px`;
        } else {
            document.body.classList.remove('no-scroll');

            document.body.style.position = '';
            document.body.style.top = '';
            window.scrollTo(0, scrollPosition.current);
        }
        setOpenMenu((v) => !v);
    };
    // const isHidden = useScrollHandler();

    return (
        <>
            <Suspense>
                <AppPanelTop/>
            </Suspense>
            <header
                className={clsx(s.root, 'app-header', {
                    [s.is_open]: isOpenMenu,
                    // [s.is_hidden]: isHidden,
                })}
            >
                <Container size="md">
                    <div className={s.inner}>
                        <Link href={ROUTES.home} className={s.logo}>
                            <Image
                                src={headerLogoImg}
                                alt={t('site.logo_alt')}
                                title={t('site.logo_alt')}
                                height={41}
                                width={50}
                            />
                        </Link>
                        <nav className={s.nav}>
                            <ul className={s.menu}>
                                {menuItems?.map((item: any, idx) => (
                                    <MenuItem
                                        item={item}
                                        key={idx}
                                        // handleToggleMenu={handleToggleMenu}
                                    />
                                ))}
                            </ul>

                            <div className={s.mobile_nav_extra}>
                                <Suspense>
                                    <LangSwitcher className={s.lang}/>
                                </Suspense>
                                <Suspense>
                                    <SpecialOfferMobile className={s.special_offer}/>
                                </Suspense>
                            </div>
                        </nav>

                        <div className={s.extra}>
                            {/* <div className={s.contact_phone}>
                <Icon name="PhoneCall" className={s.contact_phone_icon} />
                <a href="tel:0800336126" className={s.contact_phone_link}>
                  0 800 336 126
                </a>
              </div> */}
                            <Suspense>
                                <LangSwitcher className={s.lang}/>
                            </Suspense>
                            {/* {authBlock} */}

                            <BtnAuth s={s} t={t} setOpenMenu={setOpenMenu}/>

                            <Button
                                href={ROUTES.psychologists}
                                type="custom"
                                weight="medium"
                                size="xs"
                                className={s.btn_psh_select}
                            >
                                {t('site.header.btn_psh_select')}
                            </Button>
                        </div>

                        <div className={s.btn_menu} onClick={handleToggleMenu}>
                            <MenuIcon className={s.btn_menu_icon_open}/>
                            <CloseIcon className={s.btn_menu_icon_close}/>
                        </div>
                    </div>
                </Container>
            </header>
        </>
    );
});

export {Header};
