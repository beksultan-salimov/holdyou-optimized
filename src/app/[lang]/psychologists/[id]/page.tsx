import {Metadata} from 'next';
import Image from 'next/image';
import {notFound} from 'next/navigation';
import clsx from 'clsx';
import {PSYCHOLOGIST_SCHEDULER_ID, ROUTES} from '@/config';
import {LangType} from '@/config/i18n/settings';
import {getTranslationServer} from '@/config/i18n';
import {
    get,
    getAlternatesUrls,
    getOgTagsDefault,
    getPshFilterData,
    isEmpty,
    normalizeFeatures,
    normalizeReviews,
    pick,
    splitIntoRows,
} from '@/utils/helpers';
import {serverFetch} from '@/utils/service';
import {getServicesFirstCheckout, getServicesSubscription} from '@/utils/services';
import {IPsychologist} from '@/types';
import {Title} from '@/components/Title';
import {Container} from '@/components/Container';
import {Icon} from '@/components/Icon';
import {PropertiesItems} from '@/components/PropertiesItems';
import {Section} from '@/components/Section';
import {Video} from '@/components/Video';
import {Breadcrumbs} from '@/views/Breadcrumbs';
import {ReviewsCarouselHome} from '@/views/ReviewsCarouselHome';
import {PsychologistSelectorSessionType} from '@/views/PsychologistViews/PsychologistSelectorSessionType';
import {Tariffs} from '@/views/Tariffs';
import {BlogHome} from '@/views/BlogHome';
import {FeedbackSection} from '@/views/FeedbackSection';
import {PsychologistBtnVideo} from '@/views/PsychologistViews/PsychologistBtnVideo';
import {ImagesList} from '@/views/ImagesList';
import {PsychologistCard} from '@/views/PsychologistCard';
import {PsychologistCheckoutInPshWrapper} from '@/views/PsychologistViews/PsychologistCheckoutInPshWrapper';
import {PsychologistNearestBadgeWrapper} from '@/views/PsychologistViews/PsychologistNearestBadgeWrapper';
import {SendAnalyticsClient} from './sendAnalytics';

export const revalidate = 10;

interface IProps {
    params: { lang: LangType; id: string };
}

export async function generateMetadata({params}: IProps): Promise<Metadata> {
    const {lang, id} = params;
    const psychologist = await getPsychologistPageData({id, lang});
    const {
        fullname = '',
        description = '',
        photo,
        seo_title,
        seo_description,
        og_image,
        keywords,
    } = psychologist || {};
    const {t} = await getTranslationServer(lang, ['psychologist', 'site']);
    const title = fullname + t('psychologist.seo.title_suffix');

    return {
        title: seo_title || title,
        description: seo_description || description,
        keywords: keywords || t('site.main_layout.seo.keywords'),
        alternates: getAlternatesUrls({
            slug: id,
            lang,
            prefixSlug: 'psychologists',
        }),
        openGraph: {
            title: seo_title || title,
            description: seo_description || description,
            images: og_image || photo?.thumbnail,
            ...(getOgTagsDefault({lang, slug: id, prefixSlug: 'psychologists'}) ||
                {}),
        },
    };
}

export default async function Psychologist({params: {lang, id}}: IProps) {
    const {t} = await getTranslationServer(lang, ['psychologist', 'site']);
    const psychologist = await getPsychologistPageData({id, lang});
    const reviews = await getPsychologistReviews({id, lang});
    const posts = await getPsychologistPosts({id, lang});
    const servicesSubscription = await getServicesSubscription({lang});
    const servicesFirstCheckout = await getServicesFirstCheckout({lang});
    const diplomasList = psychologist?.diplomas?.map((d: any) => d?.file);

    if (!psychologist?.id) {
        console.log(
            `>>> notFound >>> \n src/app/[lang]/psychologists/[id]/page.tsx \n`,
            `id: ${id} \n`,
            `lang: ${lang} \n`,
            `psychologist: ${JSON.stringify(psychologist, null, 3)} \n`,
            `psychologist.id: ${psychologist?.id} \n`,
            `date: ${new Date()} \n`
        );
        return notFound();
    }

    const propertiesListStats = [
        {
            icon: <Icon name="CheckList"/>,
            text: t('site.sessions', {
                count: psychologist?.consultation_count || 0,
            }),
            isHidden: !psychologist?.consultation_count,
        },
        {
            icon: <Icon name="Experience"/>,
            text: (
                <>
                    {t('site.years', {count: psychologist?.experience_years})}{' '}
                    {t('site.by_experience')}
                </>
            ),
            color: '#00BDC2',
        },
    ];

    const {featuresList, languagesList} = normalizeFeatures(
        psychologist?.features
    );

    const getPropertiesListMain = () => {
        const items = [];
        if (!isEmpty(languagesList)) {
            items?.push({
                icon: !!get(languagesList, [0, 'icon']) ? (
                    <Image src={get(languagesList, [0, 'icon'])} alt=""/>
                ) : (
                    <Icon name="Langs"/>
                ),
                text: (
                    <span className="languages-list">
            {languagesList?.map((i: any) => i.name)?.join(', ')}
          </span>
                ),
            });
        }
        if (!isEmpty(featuresList)) {
            featuresList.forEach((item: any) => {
                items.push({
                    icon: !!item?.icon ? <Image src={item?.icon} alt=""/> : '',
                    text: item?.name,
                    color: item?.color,
                });
            });
        }
        return items;
    };

    return (
        <div className="page page-psychologist">
            {/*<SendAnalyticsClient></SendAnalyticsClient>*/}
            <div className="page-psychologist__header">
                <Container size="xsm">
                    <Breadcrumbs
                        items={[
                            {
                                label: t('site.breadcrumbs.psychologists'),
                                link: ROUTES.psychologists,
                            },
                            {label: psychologist?.fullname, link: ROUTES.psychologist(id)},
                        ]}
                    />
                </Container>
            </div>

            <div className="psychologist-content">
                <Container size="xsm">
                    <div className="psychologist-content__inner">
                        <div className="psychologist-content__sidebar">
                            <div className="psychologist-content__media">
                                <Image
                                    src={psychologist?.photo?.thumbnail}
                                    title={psychologist?.fullname}
                                    alt={psychologist?.fullname!}
                                    width={450}
                                    height={450}
                                    className="psychologist-content__media__img"
                                />
                                {(!!psychologist?.video_mobile || !!psychologist?.video_desktop) && (
                                    <PsychologistBtnVideo
                                        desktopSrc={psychologist?.video_desktop}
                                        mobileSrc={psychologist?.video_mobile}
                                        label={t('psychologist.btn_video_promo')}
                                        className="psychologist-content__media__video-btn"
                                    />
                                )}
                            </div>
                            <PsychologistSelectorSessionType initItems={servicesFirstCheckout}
                                                             psychologist={psychologist}/>
                        </div>
                        <div className="psychologist-content__main">
                            <div className="psychologist-content__section psychologist-content__section--info">
                                <Title
                                    tag="h1"
                                    size="sm"
                                    className="psychologist-content__title"
                                >
                                    {psychologist?.fullname}
                                </Title>
                                <Title
                                    tag="h4"
                                    size="xs"
                                    font="base"
                                    weight="medium"
                                    className="page-psychologist__subtitle"
                                >
                                    {psychologist?.description}
                                </Title>
                                <div className="psychologist-content__nearest">
                                    <PsychologistNearestBadgeWrapper
                                        lang={lang}
                                        label={`${t('site.nearest_time')}: `}
                                        btnLabel={t('psychologist.btn_order')}
                                    />
                                </div>
                                <div className="psychologist-content__features">
                                    <div className="col col-1">
                                        <PropertiesItems items={propertiesListStats}/>
                                    </div>
                                    <div className="col col-2">
                                        <PropertiesItems items={getPropertiesListMain()}/>
                                    </div>
                                </div>
                            </div>
                            <div className="psychologist-content__section psychologist-content__section--approaches">
                                <div className="col col-1">
                                    <div className="psychologist-content__section__title">
                                        {t('psychologist.approaches')}
                                    </div>
                                    <ListData items={psychologist?.filter_data?.approaches}/>
                                </div>
                                <div className="col col-2">
                                    <div className="psychologist-content__section__title">
                                        {t('psychologist.work_with')}
                                    </div>
                                    <ListData items={psychologist?.filter_data?.problems}/>
                                </div>
                            </div>
                            {!!psychologist?.work_principles && (
                                <div
                                    className="psychologist-content__section psychologist-content__section--principles">
                                    <div className="psychologist-content__section__title">
                                        {t('psychologist.work_principles')}
                                    </div>
                                    <div
                                        className="psychologist-content__section__text"
                                        dangerouslySetInnerHTML={{
                                            __html: splitIntoRows(psychologist?.work_principles),
                                        }}
                                    />
                                </div>
                            )}
                            {!!psychologist?.values && (
                                <div className="psychologist-content__section psychologist-content__section--values">
                                    <div className="psychologist-content__section__title">
                                        {t('psychologist.values')}
                                    </div>
                                    <div
                                        className="psychologist-content__section__text"
                                        dangerouslySetInnerHTML={{
                                            __html: splitIntoRows(psychologist?.values),
                                        }}
                                    />
                                </div>
                            )}
                            {(!!psychologist?.video_mobile || !!psychologist?.video_desktop) && (
                                <div className="psychologist-content__section psychologist-content__section--video">
                                    <div className="psychologist-content__section__title">
                                        {t('psychologist.video_self_promo')}
                                    </div>
                                    <div className="psychologist-content__section__text">
                                        <Video mobileSrc={psychologist?.video_mobile}
                                               desktopSrc={psychologist?.video_desktop} isBtnOverlay={true}/>
                                    </div>
                                </div>
                            )}
                            {(!!psychologist?.higher_education ||
                                !!psychologist?.professional_courses ||
                                !isEmpty(diplomasList) ||
                                !!psychologist?.another) && (
                                <div className="psychologist-content__section psychologist-content__section--education">
                                    <div className="psychologist-content__section__title">
                                        {t('psychologist.education.title')}
                                    </div>
                                    <div className="psychologist-content__section__text">
                                        {!!psychologist?.higher_education && (
                                            <div className="education-item">
                                                <div className="education-item__header">
                                                    <Icon name="EducationHigh" className="education-item__icon"/>
                                                    <div className="education-item__title">
                                                        {t('psychologist.education.universities')}
                                                    </div>
                                                </div>
                                                <div
                                                    className="education-item__text"
                                                    dangerouslySetInnerHTML={{
                                                        __html: splitIntoRows(
                                                            psychologist?.higher_education
                                                        ),
                                                    }}
                                                />
                                            </div>
                                        )}
                                        {!!psychologist?.professional_courses && (
                                            <div className="education-item">
                                                <div className="education-item__header">
                                                    <Icon name="EducationProf" className="education-item__icon"/>
                                                    <div className="education-item__title">
                                                        {t('psychologist.education.courses')}
                                                    </div>
                                                </div>
                                                <div
                                                    className="education-item__text"
                                                    dangerouslySetInnerHTML={{
                                                        __html: splitIntoRows(
                                                            psychologist?.professional_courses
                                                        ),
                                                    }}
                                                />
                                            </div>
                                        )}
                                        {!isEmpty(diplomasList) && (
                                            <div className="education-item">
                                                <div className="education-item__header">
                                                    <Icon name="Award" className="education-item__icon"/>
                                                    <div className="education-item__title">
                                                        {t('psychologist.education.diploms')}
                                                    </div>
                                                </div>
                                                <div className="education-item__text">
                                                    <ImagesList
                                                        items={diplomasList}
                                                        className="education-item__diplomas"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        {!!psychologist?.another && (
                                            <div className="education-item">
                                                <div className="education-item__header">
                                                    <Icon name="Message" className="education-item__icon"/>
                                                    <div className="education-item__title">
                                                        {t('psychologist.education.other')}
                                                    </div>
                                                </div>
                                                <div
                                                    className="education-item__text"
                                                    dangerouslySetInnerHTML={{
                                                        __html: splitIntoRows(psychologist?.another),
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </div>

            <Section
                className="page-psychologist__scheduler"
                id={PSYCHOLOGIST_SCHEDULER_ID}
                container="md"
            >
                <div className="psychologist-scheduler">
                    <div className="psychologist-scheduler__col psychologist-scheduler__col--sidebar">
                        <PsychologistCard item={psychologist} type="in_schedule"/>
                    </div>
                    <div className="psychologist-scheduler__col psychologist-scheduler__col--content">
                        <PsychologistSelectorSessionType initItems={servicesFirstCheckout} psychologist={psychologist}/>
                        <PsychologistCheckoutInPshWrapper
                            psychologist={psychologist}
                            id={id}
                            type="in_psh"
                        />
                    </div>
                </div>
            </Section>

            <Section
                className="page-psychologist__reviews section-radius-offset-bottom"
                container="sm"
            >
                <Title
                    tag="h4"
                    size="lg"
                    className="page-psychologist__reviews__title"
                    isCenter
                >
                    {t('psychologist.reviews.title')}
                </Title>
                <ReviewsCarouselHome items={reviews} isShowBtnPsh={false}/>
            </Section>

            <Section
                className="page-psychologist__prices"
                id="page-psychologist-prices"
                container="sm"
            >
                <Title
                    tag="h3"
                    size="xlg"
                    className="page-psychologist__prices__title"
                    isCenter
                >
                    {t('site.abonement.title')}
                </Title>
                <p className="page-psychologist__prices__subtitle">
                    {t('site.abonement.subtitle')}
                </p>

                <Tariffs
                    services={servicesSubscription}
                    isVisiblePromocode={false}
                    viewType="accent"
                    isCarousel
                    isTabs={false}
                    isAbonementFooterInfo
                />
            </Section>

            {!isEmpty(posts) && (
                <Section
                    className="page-psychologist__blog section-radius-offset-top"
                    container="md"
                >
                    <Title
                        tag="h4"
                        size="lg"
                        className="page-psychologist__blog__title"
                        isCenter
                    >
                        {t('psychologist.blog.title')}
                    </Title>
                    <BlogHome items={posts}/>
                </Section>
            )}

            <FeedbackSection
                className={clsx('page-psychologist__feedbackform', {
                    'section-radius-offset-top': isEmpty(posts),
                })}
            />
        </div>
    );
}

const ListData = ({
                      items,
                      className,
                  }: {
    items?: any[];
    className?: string;
}) => {
    return (
        <ul className={clsx('psychologist-content__ul', className)}>
            {items?.map((i: any, idx: number) => (
                <li className="psychologist-content__li" key={i.id}>
                    {i.text}
                    {idx + 1 === items?.length ? '.' : ';'}
                </li>
            ))}
        </ul>
    );
};

const getPsychologistPageData = async ({
                                           id,
                                           lang,
                                       }: {
    id: string;
    lang: string;
}) => {
    return await serverFetch(`/psychologists/${id}`, {lang}).then((res) => ({
        ...(res || {}),
        filter_data: getPshFilterData(res?.filter_ids),
    }));
};

const getPsychologistReviews = async ({
                                          id,
                                          lang,
                                      }: {
    id: string;
    lang: string;
}) => {
    const data = await serverFetch(`/psychologists/${id}/feedbacks`, {lang});
    const items = data?.results?.map(normalizeReviews);
    return items;
};

const getPsychologistPosts = async ({
                                        id,
                                        lang,
                                    }: {
    id: string;
    lang: string;
}) => {
    const data = await serverFetch(`/psychologists/${id}/posts`, {lang});
    const items = data?.results?.map((item: any) => ({
        ...pick(item, ['id', 'title', 'slug', 'created', 'preview', 'description']),
    }));
    return items;
};

export async function generateStaticParams({lang}: { lang: string }) {
    const pshs = await serverFetch('/psychologists', {lang});
    return pshs?.map((psh: IPsychologist) => ({
        id: psh.id?.toString(),
    }));
}
