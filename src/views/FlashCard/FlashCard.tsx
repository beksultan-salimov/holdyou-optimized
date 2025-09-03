'use client'
import {MutableRefObject, useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import {useTranslationClient} from '@/config/i18n/client';
import {useLang} from '@/hooks/useLang';
import {useMouseOffset} from '@/hooks/useMouseOffset';
import {Icon} from '@/components/Icon';
import {Button} from '@/components/Button';
import heartPink from '@/static/img/heart_pink.png';
import heartGreen from '@/static/img/heart_green.png';
import './flash-card.scss';
import {ROUTES} from '@/config';
import {clientFetch} from '@/utils/service';
import {LangType} from "@/config/i18n/settings";


interface IProps {
    image?: React.ReactNode;
    className?: string;
}

interface Psychologist {
    id: string;
    is_banner: boolean;
}

const getPsychologists = async ({lang}: { lang: LangType }): Promise<Psychologist[]> => {
    return await clientFetch(`/psychologists`, {lang}) as Psychologist[];
};

const FlashCard = ({image, className}: IProps) => {
    const {lang} = useLang();
    const {t} = useTranslationClient(lang, ['site']);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const imageSrc = image ?? '/img/holdyou_flash.jpg';
    const [psychologist, setPsychologist] = useState<Psychologist | null>(null);

    useEffect(() => {
        getPsychologists({lang}).then((response) => {
            const bannerPsychologist = response.find((element) => element.is_banner) || null
            setPsychologist(bannerPsychologist);
        });
    }, [lang]);

    return (
        <div className="flash-card__wrapper">
            <div className={clsx('flash-card', className)} ref={containerRef}>
                <div className="flash-card__inner">
                    <div className="flash-card__content">
                        <h5
                            className="flash-card__title"
                            dangerouslySetInnerHTML={{__html: t('site.flash_card.title')}}
                        />
                        <p
                            dangerouslySetInnerHTML={{
                                __html: t('site.flash_card.subtitle'),
                            }}
                        />
                        <p
                            dangerouslySetInnerHTML={{__html: t('site.flash_card.text')}}
                        />
                        <div className="flash-card__footer">
                            <Button
                                href={ROUTES.psychologist(psychologist ? psychologist.id : '', '?scroll_calendar=true&diagnostics=true')}
                                type="accent"
                                className="flash-card__cta-btn"
                                weight="bold"
                                iconRight={<Icon name="SelectTime"/>}
                                shadow
                            >
                                {t('site.flash_card.btn_cta')}
                            </Button>
                        </div>
                    </div>
                    <div
                        className="flash-card__media"
                        style={{backgroundImage: `url(${imageSrc})`}}
                    />
                </div>
                <Decorates containerRef={containerRef}/>
            </div>
        </div>
    );
};

const Decorates = ({
                       containerRef,
                   }: {
    containerRef: MutableRefObject<HTMLDivElement | null>;
}) => {
    const {offset} = useMouseOffset({intensity: 30, containerRef});

    return (
        <>
            <Image
                src={heartPink}
                alt=""
                loading="eager"
                quality={100}
                className="flash-card__heart flash-card__heart--pink"
                style={{
                    transform: `translate(${-offset.x * 1.1}px, ${-offset.y * 1.1}px)`,
                }}
            />
            <Image
                src={heartGreen}
                alt=""
                loading="eager"
                quality={100}
                className="flash-card__heart flash-card__heart--green"
                style={{
                    transform: `translate(${offset.x}px, ${offset.y}px) rotate(7.8deg)`,
                }}
            />
        </>
    );
};

export {FlashCard};
