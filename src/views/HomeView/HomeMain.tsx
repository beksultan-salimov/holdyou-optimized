'use client'
import React, {MutableRefObject, useRef} from 'react';
import Image from 'next/image';
import {ROUTES} from '@/config';
import {useMouseOffset} from '@/hooks/useMouseOffset';
import {Section} from '@/components/Section';
import {Title} from '@/components/Title';
import {Button} from '@/components/Button';
import {Icon} from '@/components/Icon';
import {PshGroupItem} from '@/components/PshGroupItem';
import {SessionSwitcher} from '@/views/SessionSwitcher';
import holdyouMainImg from '@/static/img/home/holdyouMain.avif';
import heart from '@/static/img/home/heart.svg';
import styles from './HomeMain.module.scss';

interface IProps {
    t?: any;
    psychologistsCount?: any;
    promoPshAvatars: any[];
}

const HomeMain = ({
                      t,
                      psychologistsCount,
                      promoPshAvatars,
                  }: IProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const PSH_AVATARS_SHOW = 3;

    return (
        <Section
            className={styles.hnMain}
            container="md"
        >
            <div className={styles.hnMain__inner} ref={containerRef}>
                <div className={styles.hnMain__content}>
                    <Title
                        tag="h1"
                        size="slg"
                        className={styles.hnMain__title}
                        html={t('home.main.title')}
                    />
                    <p className={styles.hnMain__desc}>{t('home.main.description')}</p>
                    <div className={styles.hnMain__info}>
                        <div className={styles.hnMain__cta}>
                            <SessionSwitcher/>
                        </div>
                        <PshGroupItem
                            avatars={promoPshAvatars}
                            label={t('home.main.select_psh_label')}
                            btn={
                                <Button href={ROUTES.psychologists} type="link">
                                    {t('home.main.select_psh_value', {
                                        count: '50+',
                                    })}
                                </Button>
                            }
                            layout="vertical"
                            extraAvatar={
                                psychologistsCount > PSH_AVATARS_SHOW
                                    ? `+${psychologistsCount - PSH_AVATARS_SHOW}`
                                    : undefined
                            }
                            isCustomExtra
                            isScaleAvatars
                        />
                    </div>
                    <div className={styles.hnMain__media}>
                        <div className={styles.hnMain__mediaFrame}>
                            <Image
                                src={holdyouMainImg}
                                alt={t('home.main.img_main_alt')}
                                title={t('home.main.img_main_alt')}
                                loading="eager"
                                quality={100}
                                height={563}
                                width={379}
                                className={styles.hnMain__mediaFrameImg}
                                draggable="false"
                                priority
                                fetchPriority="high"
                            />
                            {/*<HomeAnimateHeart containerRef={containerRef} />*/}
                        </div>
                    </div>

                    <div className={styles.hnMain__divider}/>

                    <div className={styles.hnMain__statistics}>
                        <div className={styles.hnMain__statisticsItem} >
                            <p className={styles.hnMain__statisticsItemValue}>
                                <Icon name="ShieldCheck"/>
                                100%
                            </p>
                            <p className={styles.hnMain__statisticsItemLabel}>
                                {t('home.main.stat_1_label')}
                            </p>
                        </div>
                        <div className={styles.hnMain__statisticsItem}>
                            <p className={styles.hnMain__statisticsItemValue}>
                                <Icon name="Smile"/>
                                4300
                            </p>
                            <p className={styles.hnMain__statisticsItemLabel}>
                                {t('home.main.stat_2_label')}
                            </p>
                        </div>
                        <div className={styles.hnMain__statisticsItem}>
                            <p className={styles.hnMain__statisticsItemValue}>
                                <Icon name="ChatRoundLike"/>
                                9000+
                            </p>
                            <p className={styles.hnMain__statisticsItemLabel}>
                                {t('home.main.stat_3_label')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

const HomeAnimateHeart = ({
                              containerRef,
                          }: {
    containerRef: MutableRefObject<HTMLDivElement | null>;
}) => {
    const {offset} = useMouseOffset({intensity: 30, containerRef});

    return (
        <Image
            src={heart}
            alt=""
            loading="eager"
            quality={100}
            className={styles.hnMain__mediaFrameHeart}
            priority
            style={{
                transform: `translate(${offset.x}px, ${offset.y}px)`,
            }}
        />
    );
};

export default React.memo(HomeMain);