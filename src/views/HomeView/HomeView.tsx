'use client';
import React, {Suspense, useCallback, useMemo} from 'react';
import dynamic from 'next/dynamic';
import {ROUTES} from '@/config';
import {useTranslationClient} from '@/config/i18n/client';
import {LangType} from '@/config/i18n/settings';
import {get, getPshAvatarAndLink, isEmpty} from '@/utils/helpers';
import {Section} from '@/components/Section';
import {Title} from '@/components/Title';
import {Button} from '@/components/Button';
import {Icon} from '@/components/Icon';
import {PshGroupItem} from '@/components/PshGroupItem';
import {InfoBadge} from '@/components/InfoBadge';
import HomeMain from './HomeMain';

import {TariffsSkeleton} from '@/views/Tariffs/TariffsSkeleton';
import {FAQSkeleton} from '@/components/FAQ/FAQSkeleton';
import styles from './HomeView.module.scss';


const HomeHow = dynamic(() => import('./HomeHow'));
const Tariffs = dynamic(() => import('@/views/Tariffs').then(mod => mod.Tariffs));
const FAQ = dynamic(() => import('@/components/FAQ').then(mod => mod.FAQ));
const ContactInfoSection = dynamic(() => import('@/views/ContactInfoSection').then(mod => mod.ContactInfoSection));
const NoWork = dynamic(() => import('@/views/NoWork').then(mod => mod.NoWork));
const HomeBigTxt = dynamic(() => import('@/views/HomeBigTxt').then(mod => mod.HomeBigTxt));
const FeedbackSection = dynamic(() => import('@/views/FeedbackSection').then(mod => mod.FeedbackSection), {ssr: false});

const PsychologistsCarouselHome = dynamic(() => import('@/views/PsychologistsCarouselHome').then(mod => mod.PsychologistsCarouselHome), {ssr: false});
const HomeGroupTherapy = dynamic(() => import('./HomeGroupTherapy'));
const HomeBusiness = dynamic(() => import('./HomeBusiness'));
const HomeCategories = dynamic(() => import('./HomeCategories'));


interface IProps {
    className?: string;
    lang: LangType;
    mainData?: any;
    mainQuiz?: any;
    juniorPsychologists?: any;
    servicesSubscription?: any;
}

const PSH_AVATARS_SHOW = 9;

const HomeView = ({mainData, mainQuiz, servicesSubscription, lang}: IProps) => {
    const {t} = useTranslationClient(lang, ['home']);
    const {t: t_site} = useTranslationClient(lang, ['site']);

    const {
        psychologistsCount,
        psychologistsDic,
        psychologistsNearest,
        categoriesProblems,
        articlesDic,
        feedbacksDic
    } = mainData || {};

    const getPromoPshAvatars = useCallback((count: number) => {
        const pshAvatars = !isEmpty(psychologistsDic)
            ? Object.keys(psychologistsDic)
                .slice(0, count)
                .map((id: any) => getPshAvatarAndLink(get(psychologistsDic, id, {})))
            : [];
        const defaultList = [
            {img: '/img/people/people_4.png'}, {img: '/img/people/people_6.png'},
            {img: '/img/people/people_3.png'}, {img: '/img/people/people_1.png'},
            {img: '/img/people/people_2.png'}, {img: '/img/people/people_5.png'},
            {img: '/img/people/people_8.png'}, {img: '/img/people/people_9.png'},
            {img: '/img/people/people_10.png'}, {img: '/img/people/people_7.png'},
        ];
        return !isEmpty(pshAvatars) ? pshAvatars : defaultList.slice(0, count);
    }, [psychologistsDic]);

    const pshAvatarsForMain = useMemo(() => getPromoPshAvatars(3), [getPromoPshAvatars]);
    const pshAvatarsForFooter = useMemo(() => getPromoPshAvatars(PSH_AVATARS_SHOW), [getPromoPshAvatars]);

    return (
        <>
            <HomeMain
                t={t}
                psychologistsCount={psychologistsCount}
                promoPshAvatars={pshAvatarsForMain}
            />

            <Suspense fallback={<div style={{height: '500px'}}/>}>
                <HomeCategories
                    t={t}
                    t_site={t_site}
                    categoriesProblems={categoriesProblems}
                    articlesDic={articlesDic}
                    feedbacksDic={feedbacksDic}
                    psychologistsDic={psychologistsDic}
                    psychologistsCount={psychologistsCount}
                    getPromoPshAvatars={getPromoPshAvatars}
                    mainQuiz={mainQuiz}
                />
            </Suspense>

            <Suspense fallback={<TariffsSkeleton/>}>
                <Section className={styles.hnPrices} container="sm">
                    <Title tag="h3" size="xlg" className={styles.hnPrices__title} isCenter>
                        {t('site.abonement.title')}
                    </Title>
                    <p className={styles.hnPrices__subtitle}>{t('site.abonement.subtitle')}</p>
                    <Tariffs
                        services={servicesSubscription}
                        isVisiblePromocode={false}
                        viewType="accent"
                        isCarousel
                        isTabs={false}
                        isAbonementFooterInfo
                    />
                </Section>
            </Suspense>

            <Section className={styles.hnPsh} container="md">
                <Title tag="h3" size="xlg" className={styles.hnPsh__title} html={t('home.psh.title')} isCenter/>
                <p className={styles.hnPsh__subtitle}>{t('home.psh.subtitle')}</p>
                <InfoBadge
                    icon={<Icon name="Money"/>}
                    label={`${t('home.psh.cost')}: `}
                    value={<strong>{t('home.psh.from')} 700 грн.</strong>}
                    type="primary"
                    className={styles.hnPsh__info}
                    isCenter
                />
                <Suspense fallback={<div style={{height: '400px', width: '100%'}}/>}>
                    <PsychologistsCarouselHome items={psychologistsNearest}/>
                </Suspense>
                <div className={styles.hnPsh__footer}>
                    <PshGroupItem
                        avatars={pshAvatarsForFooter}
                        extraAvatar={psychologistsCount > PSH_AVATARS_SHOW ? `+${psychologistsCount - PSH_AVATARS_SHOW}` : undefined}
                        btn={
                            <Button href={ROUTES.psychologists} type="link" iconRight={<Icon name="DashRightOutline"/>}>
                                {t('home.btn_goto_psh_filters')}
                            </Button>
                        }
                        layout="vertical"
                        isScaleAvatars
                    />
                </div>
            </Section>

            <Suspense fallback={null}>
                <HomeHow t={t}/>
            </Suspense>

            <Suspense fallback={null}>
                <HomeGroupTherapy lang={lang}/>
            </Suspense>

            <Suspense fallback={null}>
                <HomeBusiness lang={lang}/>
            </Suspense>

            <Suspense fallback={<FAQSkeleton/>}>
                <Section className={styles.hnFaq} container="xs">
                    <Title size="xlg" className={styles.hnFaq__title} isCenter>
                        {t('home.faq.title')}
                    </Title>
                    <FAQ items={t('home.faq.options')} limitVisibleItems={6}/>
                </Section>
            </Suspense>

            <Suspense fallback={null}>
                <ContactInfoSection
                    title={t_site('site.contact_information.title')}
                    items={t_site('site.contact_information.options')}
                    className="home-contact-info-section"
                />
            </Suspense>

            <Suspense fallback={null}>
                <Section className="home-no-work" container="sm">
                    <NoWork title={t('site.no_work.title')} items={t('site.no_work.options')}/>
                </Section>
            </Suspense>

            <Suspense fallback={null}>
                <Section className="home-bigtxt" container="sm">
                    <HomeBigTxt lang={lang}/>
                </Section>
            </Suspense>

            <Suspense fallback={null}>
                <FeedbackSection/>
            </Suspense>
        </>
    );
};

export default React.memo(HomeView);