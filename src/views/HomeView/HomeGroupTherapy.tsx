'use client';

import { memo } from 'react';
import { useTranslationClient } from '@/config/i18n/client';
import { LangType } from '@/config/i18n/settings';
import { Section } from '@/components/Section';
import { Title } from '@/components/Title';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { generatePageLink } from '@/utils/helpers';
import styles from './HomeView.module.scss';

const groupTherapyIcons = ['ClockCircleThin', 'Messages', 'ShieldCheck', 'ListCopy'];

interface IProps {
    lang: LangType;
}

const HomeGroupTherapy = ({ lang }: IProps) => {
    const { t } = useTranslationClient(lang, ['home']);
    return (
        <Section className={styles.hnGroupTherapy} container="md">
            <Title
                size="xlg"
                className={styles.hnGroupTherapy__title}
                isCenter
                html={t('home.group_therapy.title')}
            />
            <div
                className={styles.hnGroupTherapy__description}
                dangerouslySetInnerHTML={{
                    __html: t('home.group_therapy.description'),
                }}
            />
            <div className={styles.hnGroupTherapy__items}>
                {t('home.group_therapy.options').map((item: any, idx: number) => (
                    <div className={styles.hnGroupTherapy__item} key={`home-group-therapy-${idx}`}>
                        <Icon name={groupTherapyIcons[idx]} className={styles.hnGroupTherapy__item__icon} />
                        <div className={styles.hnGroupTherapy__item__title}>{item['title']}</div>
                        <div className={styles.hnGroupTherapy__item__text} dangerouslySetInnerHTML={{ __html: item['text'] }} />
                    </div>
                ))}
            </div>
            <div
                className={styles.hnGroupTherapy__footer}
                dangerouslySetInnerHTML={{ __html: t('home.group_therapy.footer') }}
            />
            <div className={styles.hnGroupTherapy__cta}>
                <Button
                    href={generatePageLink(lang, 'zalezhnist-ta-spivzalezhnist')}
                    type="default"
                    size="sm"
                    weight="bold"
                    className={styles.hnGroupTherapy__btnCta}
                >
                    {t('home.group_therapy.btn_cta')}
                </Button>
            </div>
        </Section>
    );
};

export default memo(HomeGroupTherapy);