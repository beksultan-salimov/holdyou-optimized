'use client';
import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import Slider from 'react-slick';
import { Form, Field } from 'react-final-form';
import { useTranslationClient } from '@/config/i18n/client';
import { isArray, isEmpty, isFunction, omit } from '@/utils/helpers';
import { validateEmail } from '@/utils/validate';
import {
  getResultMainQuizDescriptions,
  mainQuizSubmit,
} from '@/store/mainQuizSlice';
import { useLang } from '@/hooks/useLang';
import {
  FormBubbleSelect,
  FormInput,
  FormRadioGroup,
} from '@/components/BaseForm';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import './main-quiz.scss';

interface ISlide {
  id: string;
  component: React.ReactNode;
  requiredFields?: string[];
}

const TYPE_FIELD_NAME = 'type';
const USERNAME_FIELD_NAME = 'full_name';
const EMAIL_FIELD_NAME = 'email';
const AGE_FIELD_NAME = 'age';
const GENDER_FIELD_NAME = 'comfortable_sex';
const EXPERIENCE_FIELD_NAME = 'therapy_experience';

const MainQuizHeader = ({
  icon,
  number,
  questionsCount,
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
  number?: number;
  questionsCount?: number;
  icon?: React.ReactNode;
}) => {
  return (
    <div className="main-quiz__header">
      {(!!number || !!icon) && (
        <div className="main-quiz__header__media">
          <Icon name="Badge1" className="main-quiz__header__media-bg" />
          {!!number && (
            <span className="main-quiz__header__media-count">
              {number}
              <span>/{questionsCount ?? number}</span>
            </span>
          )}
          {!!icon && (
            <span className="main-quiz__header__media-icon">{icon}</span>
          )}
        </div>
      )}
      {!!title && <div className="main-quiz__header__title">{title}</div>}
      {!!subtitle && (
        <div className="main-quiz__header__subtitle">{subtitle}</div>
      )}
    </div>
  );
};

const QuestionLast = ({ t, questionsCount }: any) => {
  const genderOptions = useMemo(
    () => [
      { label: t('home.quiz.woman'), value: 'Woman' },
      { label: t('home.quiz.man'), value: 'Man' },
      { label: t('home.quiz.no_matter'), value: 'No matter' },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const experienceOptions = useMemo(
    () => [
      { label: t('home.quiz.exp_yes'), value: 'true' },
      { label: t('home.quiz.exp_no'), value: 'false' },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <MainQuizHeader
        number={questionsCount}
        questionsCount={questionsCount}
        title={t('home.quiz.q5_title')}
        subtitle={t('home.quiz.q5_subtitle')}
      />

      <div className="main-quiz__question-final">
        <div className="col col--1">
          <Field
            name={USERNAME_FIELD_NAME}
            label={t('home.quiz.field_name.label')}
            placeholder={t('home.quiz.field_name.placeholder')}
            component={FormInput}
          />
          <Field
            name={EMAIL_FIELD_NAME}
            label={t('home.quiz.field_email.label')}
            placeholder={t('home.quiz.field_email.placeholder')}
            component={FormInput}
            validate={validateEmail}
          />
          <Field
            name={AGE_FIELD_NAME}
            label={t('home.quiz.field_age.label')}
            placeholder={'ХХ'}
            component={FormInput}
            type="number"
          />
        </div>
        <div className="col col--2">
          <Field
            name={GENDER_FIELD_NAME}
            label={t('home.quiz.field_gender.label')}
            component={FormRadioGroup}
            options={genderOptions}
            className="form-field-radiogroup"
          />
          <Field
            name={EXPERIENCE_FIELD_NAME}
            label={t('home.quiz.field_experience.label')}
            component={FormRadioGroup}
            options={experienceOptions}
            className="form-field-radiogroup"
          />
        </div>
      </div>
    </>
  );
};

const MainQuiz = memo(({ mainQuiz }: { mainQuiz: any }) => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['home']);
  const dispatch = useDispatch();
  const [isInit, setIsInit] = useState<boolean>(false);
  const sliderRef = useRef<Slider | null>(null);
  const questionsCount = mainQuiz?.length + 1;

  const settings = useMemo(
    () => ({
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      swipe: false,
      draggable: false,
      adaptiveHeight: true,
      accessibility: false,
      touchMove: false,
      onInit: () => {
        setIsInit(true);
      },
    }),
    []
  );

  const typeOptions = useMemo(
    () => [
      { label: t('home.quiz.type_options.individual'), value: 'individual' },
      { label: t('home.quiz.type_options.pair'), value: 'pair' },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const initialValues = useMemo(() => ({ type: 'individual' }), []);

  const slides: any = useMemo(() => {
    let arr = [];
    mainQuiz?.forEach((q: any, idx: number) => {
      const options = q?.quiz_item?.map((i: any) => ({
        label: i?.name,
        value: i?.id,
      }));
      arr.push({
        id: `q-${q?.id}`,
        component: (
          <>
            {idx === 0 && (
              <div className="main-quiz__question-types">
                <MainQuizHeader
                  title={t('home.quiz.q0_title')}
                  icon={<Icon name="Users" />}
                />
                <div className="main-quiz__body">
                  <Field
                    name={TYPE_FIELD_NAME}
                    component={FormRadioGroup}
                    options={typeOptions}
                  />
                </div>
              </div>
            )}
            <MainQuizHeader
              number={idx + 1}
              questionsCount={questionsCount}
              title={q?.name}
              subtitle={t('home.quiz.q1_subtitle')}
            />

            <Field
              name={`question_${idx + 1}`}
              component={FormBubbleSelect}
              options={options}
            />
          </>
        ),
        requiredFields: [`question_${idx + 1}`],
      });
    });
    arr.push({
      id: 'q-last',
      component: <QuestionLast t={t} questionsCount={questionsCount} />,
      requiredFields: [
        USERNAME_FIELD_NAME,
        EMAIL_FIELD_NAME,
        AGE_FIELD_NAME,
        GENDER_FIELD_NAME,
        EXPERIENCE_FIELD_NAME,
      ],
    });
    return arr;
  }, [mainQuiz, questionsCount, t, typeOptions]);

  const requiredFields = useMemo(() => {
    return slides?.map((s: ISlide) => s.requiredFields ?? []);
  }, [slides]);

  const handleSubmitForm = async (data: any) => {
    const tempFields = mainQuiz?.map(
      (_: any, idx: number) => `question_${idx + 1}`
    );
    const quiz_items = tempFields?.reduce((a: any, c: any) => {
      return [...a, ...(data[c] || [])];
    }, []);
    const values = { ...omit(data, tempFields), quiz_items };
    return await mainQuizSubmit({
      values,
      t,
      dispatch,
      onSuccess: () => {
        setIsResult(true);
      },
    });
  };

  const [isResult, setIsResult] = useState(false);

  const reloadQuiz = () => {
    setIsResult(false);
  };

  return (
    <div className={clsx('main-quiz')}>
      {isResult && <MainQuizResult onReload={reloadQuiz} t={t} />}
      {!isResult && (
        <Form
          initialValues={initialValues}
          onSubmit={handleSubmitForm}
          render={({ handleSubmit, submitting, submitError, values }: any) => (
            <form onSubmit={handleSubmit}>
              <div className="main-quiz__body">
                <Slider ref={sliderRef} {...settings}>
                  {slides?.map((slide: any) => (
                    <div key={slide.id} className="main-quiz__section">
                      {slide.component}
                    </div>
                  ))}
                </Slider>
              </div>
              <MainQuizActionPanel
                values={values}
                sliderRef={sliderRef}
                isInit={isInit}
                requiredFields={requiredFields}
                t={t}
              />
            </form>
          )}
        />
      )}
    </div>
  );
});

const MainQuizActionPanel = ({
  values,
  sliderRef,
  isInit,
  requiredFields,
  t,
}: {
  values: any;
  sliderRef: any;
  isInit: boolean;
  requiredFields: string[][];
  t: any;
}) => {
  const lastSlide = sliderRef.current?.props?.children?.length;
  const [currentSlide, setCurrentSlide] = useState<number>(
    sliderRef.current?.innerSlider?.state?.currentSlide ?? 0
  );
  const isVisiblePrev = currentSlide !== 0;
  const isVisibleNext = currentSlide !== Math.max(0, lastSlide - 1);
  const isVisibleSubmit = currentSlide === Math.max(0, lastSlide - 1);

  const isDisabledPrev = !isInit;
  const isDisabledNext = useMemo(() => {
    if (!isInit) return true;
    let isDisabled = false;
    requiredFields[currentSlide]?.forEach((f) => {
      if (
        values[f] === undefined ||
        (isArray(values[f]) && isEmpty(values[f]))
      ) {
        isDisabled = true;
      }
    });
    return isDisabled;
  }, [values, requiredFields, currentSlide, isInit]);

  const isButtonClicked = useRef(false);

  const handleClickPrev = () => {
    const idx = Math.max(0, currentSlide - 1);
    gotoSlide(idx);
  };
  const handleClickNext = () => {
    const idx = Math.min(lastSlide - 1, currentSlide + 1);
    gotoSlide(idx);
  };
  const gotoSlide = useCallback(
    (idx: number) => {
      if (isButtonClicked.current || !isInit) return;
      isButtonClicked.current = true;
      setTimeout(() => {
        isButtonClicked.current = false;
      }, 500);
      if (sliderRef.current) {
        sliderRef.current.slickGoTo(idx);
        setCurrentSlide(idx);
      }
    },
    [isInit, sliderRef]
  );

  return (
    <div className="main-quiz__footer">
      {isVisiblePrev && (
        <Button
          type="text"
          size="md"
          weight="bold"
          className="main-quiz__btn-prev"
          icon={<Icon name="ArrowCircleLeft" />}
          onClick={handleClickPrev}
          disabled={isDisabledPrev}
        >
          {t('home.quiz.btn_prev')}
        </Button>
      )}
      {isVisibleNext && (
        <Button
          type="primary-old"
          size="md"
          weight="bold"
          shadow
          className="main-quiz__btn-next"
          onClick={handleClickNext}
          disabled={isDisabledNext}
        >
          {t('home.quiz.btn_next')}
        </Button>
      )}
      {isVisibleSubmit && (
        <Button
          type="primary-old"
          size="md"
          weight="bold"
          shadow
          className="main-quiz__btn-submit"
          onClick={handleClickNext}
          disabled={isDisabledNext}
          iconRight={<Icon name="Search" />}
          htmlType="submit"
        >
          {t('home.quiz.btn_pickup')}
        </Button>
      )}
    </div>
  );
};

const MainQuizResult = ({ onReload, t }: { onReload: () => void; t: any }) => {
  const items = useSelector(getResultMainQuizDescriptions);
  const handleClickReload = () => {
    if (isFunction(onReload)) {
      onReload();
    }
  };

  return (
    <div className="main-quiz__result">
      <MainQuizHeader
        title={t('home.quiz.result_title')}
        subtitle={t('home.quiz.result_subtitle')}
        icon={<Icon name="CheckBadge" />}
      />

      <div className="main-quiz__result-body">
        {items?.map((item: any) => (
          <MainQuizResultCard title={item?.name} text={item?.text} key={item?.id} />
        ))}
      </div>
      <div className="main-quiz__result-footer">
        <Button
          type="link"
          size="md"
          className="main-quiz__btn-reload"
          iconRight={<Icon name="Reload" />}
          onClick={handleClickReload}
        >
          {t('home.quiz.btn_repeat')}
        </Button>
      </div>
    </div>
  );
};

const MainQuizResultCard = ({
  title,
  text,
}: {
  title?: string;
  text?: string;
}) => {
  return (
    <div className="main-quiz__result-item">
      <div className="main-quiz__result-card">
        {!!title && (
          <div className="main-quiz__result-card__title">{title}</div>
        )}
        {!!text && (
          <div
            className="main-quiz__result-card__text"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        )}
      </div>
    </div>
  );
};

MainQuiz.displayName = 'MainQuiz';

export default MainQuiz;
