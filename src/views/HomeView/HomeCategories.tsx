'use client'
import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import clsx from 'clsx';
import { ROUTES } from '@/config';
import { get, getScreenWidth, isEmpty } from '@/utils/helpers';
import { Section } from '@/components/Section';
import { Title } from '@/components/Title';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { BubbleMessage } from '@/components/BubbleMessage';
import { FlashCard } from '@/views/FlashCard';
import { BlogHome } from '@/views/BlogHome';
import { ReviewsCarouselHome } from '@/views/ReviewsCarouselHome';
import MainQuiz from '@/views/MainQuiz/MainQuiz';
import { PsychologistCardSimple } from '@/views/PsychologistCardSimple';
import { PshGroupItem } from '@/components/PshGroupItem';
import { CollapseText } from '@/components/CollapseText';
import { Container } from '@/components/Container';
import { useSelector } from 'react-redux';
import { getResultMainQuizDescriptions, getResultMainQuizPsychologists } from '@/store/mainQuizSlice';
import {clientFetch} from "@/utils/service";

interface IProps {
  t?: any;
  t_site?: any;
  categoriesProblems: any;
  articlesDic: any;
  feedbacksDic: any;
  psychologistsDic: any;
  mainQuiz: any;
  psychologistsCount: number;
  getPromoPshAvatars: (c: number) => any[];
}

const RECOMMENDATION_AVATARS_SHOW = 8;

const HomeCategories = ({
  t,
  t_site,
  categoriesProblems,
  articlesDic,
  feedbacksDic,
  psychologistsDic,
  getPromoPshAvatars,
  psychologistsCount,
  mainQuiz,
}: IProps) => {
  const [activeCategoryId, setActiveCategoryId] = useState(
    get(categoriesProblems, [0, 'id'])
  );

  const activeCategory = useMemo(() => {
    return categoriesProblems?.find((c: any) => c?.id === activeCategoryId);
  }, [activeCategoryId, categoriesProblems]);

  const activeCategoryPsychologyIds = useMemo(() => {
    return activeCategory?.psychology_ids;
  }, [activeCategory?.psychology_ids]);

  useEffect(() => {
    if (!isEmpty(categoriesProblems)) {
      setActiveCategoryId(get(categoriesProblems, [0, 'id']));
    }
  }, [categoriesProblems]);

  useEffect(() => {
    const fullHash = window.location.hash;

    if (fullHash.includes('?')) {
      const anchor = fullHash.split('?')[0];
      const target = document.querySelector(anchor);

      if (target) {
        target.scrollIntoView({ behavior: 'instant', block: 'end' });
      }
    }
  }, []);

  const handleChangeCategory = (id: any) => {
    setActiveCategoryId(id);

    window.scrollTo({
      top:
        Number(document.getElementById('hn-categories-content')?.offsetTop) -
        100,
      behavior: 'smooth',
    });
  };

  return (
    <Section className="hn-categories">
      <Container size="md">
        <Title tag="h2" size="xlg" className="hn-categories__title" isCenter>
          {t('home.categories.title')}
        </Title>
        <BubbleMessage
          icon={<Icon name="DangerTriangle" />}
          className="hn-categories__bubbles"
        >
          {t('home.categories.subtitle')}
        </BubbleMessage>
        <CategoriesTab
          t={t_site}
          categoriesProblems={categoriesProblems}
          activeCategoryId={activeCategoryId}
          handleChangeCategory={handleChangeCategory}
        />
        <div className="hn-categories-items" id="hn-categories-content">
          {categoriesProblems?.map((cat: any) => {
            const isActive = activeCategoryId === cat?.id;
            return (
              <div
                className={clsx('hn-categories-item', {
                  active: isActive,
                })}
                key={`cat-${cat?.id}`}
              >
                <div className="hn-categories-main">
                  <div className="hn-categories-main__col-1">
                    <Title
                      tag="h3"
                      size="lg"
                      className="hn-categories-main__title hn-categories-main__title--mobile"
                    >
                      <span dangerouslySetInnerHTML={{ __html: cat?.name }} />
                    </Title>
                    <div className="hn-categories-main__col-1__inner">
                      <div className="hn-categories-main__media">
                        <div className="hn-categories-main__media-1">
                          {!!cat?.image?.thumbnail && (
                            <Image
                              src={cat?.image?.thumbnail}
                              alt={cat?.name}
                              loading="lazy"
                              quality={100}
                              width={505}
                              height={477}
                              draggable="false"
                            />
                          )}
                        </div>
                        <div className="hn-categories-main__media-2">
                          {!!cat?.image2?.thumbnail && (
                            <Image
                              src={cat?.image2?.thumbnail}
                              alt={cat?.name}
                              loading="lazy"
                              quality={100}
                              width={505}
                              height={477}
                              draggable="false"
                            />
                          )}
                        </div>
                      </div>
                      <div className="hn-categories-main__cta hn-categories-main__cta--desktop">
                        <Button
                          href={ROUTES.psychologists}
                          type="primary-old"
                          className="hn-categories-main__cta-btn"
                          weight="bold"
                          shadow
                        >
                          {t('home.categories.btn_cta')}
                        </Button>
                        <div className="hn-categories-main__cta-info">
                          <Icon name="ShieldCheck" />
                          {t('home.categories.info_cta')}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hn-categories-main__col-2">
                    <Title
                      tag="h3"
                      size="lg"
                      className="hn-categories-main__title hn-categories-main__title--desktop"
                    >
                      <span dangerouslySetInnerHTML={{ __html: cat?.name }} />
                    </Title>

                    <CollapseText
                      minHeight={235}
                      isVisible={isActive}
                      isCheckCanCollapse={getScreenWidth() < 768}
                    >
                      <div
                        className="hn-categories-main__text"
                        dangerouslySetInnerHTML={{ __html: cat?.text }}
                      />
                    </CollapseText>
                    <div className="hn-categories-main__cta hn-categories-main__cta--mobile">
                      <Button
                        href={ROUTES.psychologists}
                        type="primary-old"
                        className="hn-categories-main__cta-btn"
                        weight="bold"
                        shadow
                      >
                        {t('home.categories.btn_cta')}
                      </Button>
                      <div className="hn-categories-main__cta-info">
                        <Icon name="ShieldCheck" />
                        {t('home.categories.info_cta')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="hn-categories-quiz" id="hn-quiz">
          <Title
            tag="h4"
            size="lg"
            className="hn-categories-quiz__title"
            isCenter
          >
            {t('home.quiz.title')}
          </Title>
          <p className="hn-categories-quiz__subtitle">
            {t('home.quiz.subtitle')}
          </p>
          <div className="hn-categories-quiz__content">
            <MainQuiz mainQuiz={mainQuiz} />
          </div>
        </div>

        <div className="hn-categories-recommendations">
          <div className="hn-categories-recommendations__sidebar">
            <div className="hn-categories-recommendations__sidebar-inner">
              <Title
                tag="h4"
                size="lg"
                className="hn-categories-recommendations__title"
              >
                {t('home.categories.recommendations.title')}
              </Title>
              <PshGroupItem
                avatars={getPromoPshAvatars(RECOMMENDATION_AVATARS_SHOW)}
                btn={
                  <Button
                    href={ROUTES.psychologists}
                    type="link"
                    iconRight={<Icon name="DashRightOutline" />}
                  >
                    {t('home.btn_goto_psh_filters')}
                  </Button>
                }
                layout="vertical"
                extraAvatar={
                  psychologistsCount > RECOMMENDATION_AVATARS_SHOW
                    ? `+${psychologistsCount - RECOMMENDATION_AVATARS_SHOW}`
                    : undefined
                }
                isScaleAvatars
              />
              <QuizResultMethods t={t} />
            </div>
          </div>
          <div className="hn-categories-recommendations__body">
            <QuizResultPsychologists
              initIds={activeCategoryPsychologyIds}
              psychologistsDic={psychologistsDic}
            />
          </div>
        </div>
      </Container>
      <CategoriesReviews
        t={t}
        feedbacksDic={feedbacksDic}
        activeCategory={activeCategory}
      />
      <div className="hn-categories-flash" id="pre-sale">
        <Container size="lg">
          <FlashCard />
        </Container>
      </div>
      <CategoriesBlog
        t={t}
        articlesDic={articlesDic}
        activeCategory={activeCategory}
      />
    </Section>
  );
};

const CategoriesTab = ({
  categoriesProblems,
  activeCategoryId,
  handleChangeCategory,
  t,
}: any) => {
  // const [isFull, setIsFull] = useState(true);
  // const handleToggle = () => {
  //   setIsFull((prev) => !prev);
  // };

  return (
    <>
      <div className="hn-categories__tabs">
        {categoriesProblems?.map((cat: any) => (
          <div
            className={clsx('hn-categories-tab', {
              active: activeCategoryId === cat?.id,
              visible: true,
              // visible: isFull,
            })}
            key={cat?.id}
            onClick={() => handleChangeCategory(cat?.id)}
          >
            <span
              className="hn-categories-tab__media"
              style={{ backgroundImage: `url(${cat?.image?.thumbnail})` }}
            />
            <span className="hn-categories-tab__title">{cat?.name}</span>
          </div>
        ))}
        {/* <div className="hn-categories__tabs-footer">
          <Button
            type="primary-old"
            size="sm"
            className={clsx('hn-categories__tabs-btn-more collapse-text-btn', {
              'is-show': isFull,
            })}
            shadow
            onClick={handleToggle}
          >
            {t(
              isFull ? 'site.btn_collpase_hide' : 'site.btn_show_all_requests'
            )}
          </Button>
        </div> */}
      </div>
    </>
  );
};

const CategoriesReviews = ({
  t,
  feedbacksDic,
  activeCategory,
}: {
  t: any;
  feedbacksDic: any;
  activeCategory: any;
}) => {
  if (isEmpty(activeCategory?.feedback_ids)) return null;

  return (
    <div className="hn-categories-reviews">
      <Container size="md">
        <Title
          tag="h4"
          size="lg"
          className="hn-categories-reviews__title"
          isCenter
        >
          {t('home.categories.categories_reviews.title')}
        </Title>
        <ReviewsCarouselHome
          ids={activeCategory?.feedback_ids}
          dic={feedbacksDic}
        />
      </Container>
    </div>
  );
};

const CategoriesBlog = ({
                                t,
                                articlesDic,
                                activeCategory,
                              }: {
  t: any;
  articlesDic: any;
  activeCategory: any;
}) => {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    clientFetch('/page?template=POST').then((res) => {
      setPosts(res.results)
    });
  }, [setPosts]);


  if (isEmpty(activeCategory?.article_ids)) return null;

  return (
      <div className="hn-categories-blog">
        <Container size="md">
          <Title
              tag="h4"
              size="lg"
              className="hn-categories-blog__title"
              isCenter
          >
            {t('home.categories.categories_blog.title')}
          </Title>
          <BlogHome items={posts}/>
        </Container>
      </div>
  );
};

const QuizResultPsychologists = ({ initIds, psychologistsDic }: any) => {
  const resultItems = useSelector(getResultMainQuizPsychologists);
  const initItems = useMemo(() => {
    return initIds?.map((_id:number) => psychologistsDic[_id])?.filter((i: any) => !!i);
  }, [initIds, psychologistsDic]);
  const items = useMemo(() => {
    if (!!resultItems) return resultItems?.slice(0,5);
    return initItems?.slice(0,5);
  }, [initItems, resultItems])

  if (!items) return null;

  const slickSettings = {
    slidesToShow: 1,
    slidesToScroll: 0,
    speed: 500,
    dots: false,
    infinite: false,
    arrows: false,
    swipe: false,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
          adaptiveHeight: true,
          swipe: true,
        },
      },
    ],
  };

  return (
    <div className="quiz-result-psh has-primary-arrows">
      <Slider {...slickSettings}>
        {items?.map((item: any) => (
          <div className="quiz-result-psh-item" key={item}>
            <PsychologistCardSimple
              item={item}
              type="default"
              isBtnSelectTime
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

const QuizResultMethods = ({ t }: { t: any }) => {
  const items = useSelector(getResultMainQuizDescriptions);

  if (isEmpty(items)) return null
  return (
    <div className="recommended-methods">
      <div className="recommended-methods__header">
        <span className="recommended-methods__icon">
          <Icon name="Badge1" className="recommended-methods__icon-bg" />
          <Icon name="CheckBadge" className="recommended-methods__icon-value" />
        </span>
        <h4 className="recommended-methods__title">
          {t('home.quiz.result_title')}
        </h4>
        <p className="recommended-methods__subtitle">
          {t('home.quiz.result_subtitle')}
        </p>
      </div>
      <div className="recommended-methods__body">
        {items?.map((item: any) => (
          <div className="recommended-methods-item" key={item?.id}>
            <h3 className="recommended-methods-item__title">{item?.name}</h3>
            <div className="recommended-methods-item__text" dangerouslySetInnerHTML={{ __html: item?.text }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeCategories;
