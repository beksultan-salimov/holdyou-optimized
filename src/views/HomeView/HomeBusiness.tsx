'use client';

import { memo, Suspense } from 'react';
import Image from 'next/image';
import { useTranslationClient } from '@/config/i18n/client';
import { LangType } from '@/config/i18n/settings';
import { partners } from '@/config/partners';
import { ROUTES } from '@/config';
import { Section } from '@/components/Section';
import { Title } from '@/components/Title';
import { Button } from '@/components/Button';
import dynamic from 'next/dynamic';
import styles from './HomeView.module.scss';

// Static assets
import homeBusinessImg from '@/static/img/home/homeBusiness.jpg';
import homeHelp1Img from '@/static/img/home/homeHelp1.svg';
import homeHelp2Img from '@/static/img/home/homeHelp2.svg';
import homeHelp3Img from '@/static/img/home/homeHelp3.svg';
import homeHelp4Img from '@/static/img/home/homeHelp4.svg';
import homeHelp5Img from '@/static/img/home/homeHelp5.svg';
import homeHelp6Img from '@/static/img/home/homeHelp6.svg';

const Partners = dynamic(() => import('@/views/Partners').then(mod => mod.Partners));
const helpImgs = [homeHelp1Img, homeHelp2Img, homeHelp3Img, homeHelp4Img, homeHelp5Img, homeHelp6Img];

interface IProps {
    lang: LangType;
}

const HomeBusiness = ({ lang }: IProps) => {
    const { t } = useTranslationClient(lang, ['home']);

    return (
        <Section className={styles.hnBusinessWrapper} container="md">
            <div className={styles.hnBusiness}>
                <div className={styles.hnBusiness__inner}>
                    <div className={styles.hnBusiness__media}>
                        <div className="img-wrapper">
                            <Image
                                src={homeBusinessImg}
                                alt={t(`home.business.title`)}
                                className={styles.hnBusiness__img}
                                loading="lazy"
                                placeholder="blur"
                            />
                        </div>
                    </div>
                    <div className={styles.hnBusiness__content}>
                        <Title tag="h3" size="xlg" className={styles.hnBusiness__title}>
                            {t(`home.business.title`)}
                        </Title>
                        <div className={styles.hnBusiness__text} dangerouslySetInnerHTML={{ __html: t(`home.business.text`) }} />
                        <Button href={ROUTES.business} type="primary-old" className={styles.hnBusiness__btnCta} weight="bold" shadow>
                            {t('home.business.btn_cta')}
                        </Button>
                    </div>
                </div>
            </div>
            <div className={styles.hnHelp}>
                <Title tag="h4" size="lg" className={styles.hnHelp__title} isCenter>
                    {t(`home.help.title`)}
                </Title>
                <div className={styles.hnHelp__items}>
                    {t(`home.help.options`)?.map((item: string, idx: any) => (
                        <div className={styles.hnHelpItem} key={`home-help-${idx}`}>
                            <Image
                                src={helpImgs[idx].src}
                                className={styles.hnHelpItem__img}
                                alt={item}
                                loading="lazy"
                                width={80} // Added for CLS
                                height={80} // Added for CLS
                            />
                            <p dangerouslySetInnerHTML={{ __html: item }} />
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.hnPartners}>
                <Title tag="h4" size="lg" className={styles.hnPartners__title} isCenter>
                    {t(`home.partners.title`)}
                </Title>
                <Suspense fallback={<div>Loading Partners...</div>}>
                    <Partners items={partners} />
                </Suspense>
            </div>
        </Section>
    );
};
export default memo(HomeBusiness);