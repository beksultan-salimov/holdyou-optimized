'use client';
import { useState, useCallback, useEffect } from 'react';
import { MODALS } from '@/config';
import { Form, Field } from 'react-final-form';
import { useTranslationClient } from '@/config/i18n/client';
import { get, isEmpty, isFunction, showFormErrors } from '@/utils/helpers';
import { clientFetch } from '@/utils/service';
import { validateRequired } from '@/utils/validate';
import { IPsychologist } from '@/types';
import { useModals } from '@/hooks/useModals';
import { useLang } from '@/hooks/useLang';
import { FormInput, FormSelect, FormTextarea } from '@/components/BaseForm';
import { Button } from '@/components/Button';
import { Stars } from '@/components/Stars';
import { BaseModal } from '@/views/BaseModal';

const reviewsSubmit = async ({ formData, t, modalOpen, onSuccess }: any) => {
  const normalizedFormData = formData;
  try {
    await clientFetch(`/feedbacks`, {
      method: 'POST',
      body: JSON.stringify(normalizedFormData),
    });
    isFunction(modalOpen) && modalOpen(MODALS.success, {
      title: t('reviews.modal_success.title'),
      isDefaultImage: true,
    });
    isFunction(onSuccess) && onSuccess();
  } catch (error: any) {
    return showFormErrors({ error, t });
  }
};

interface IProps {
  psychologists?: any;
  psychologistsOptions?: { label: string; value: string }[];
  isLoadingPsychologists?: boolean;
}
const ReviewsAddModal = ({
  psychologists,
  psychologistsOptions,
  isLoadingPsychologists,
}: IProps) => {
  const modalId = MODALS.addReviews;
  const { params, modalOpen, modalClose } = useModals(modalId);
  const {
    isOpen,
    initialValues = {},
    isVisiblePsychologistField = true,
    currentPsychologist,
    onOpen,
  } = params || {};
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['reviews']);
  const [grade, setGrade] = useState(0);

  const handleSubmitForm = useCallback(
    async (formData: any) => {
      return await reviewsSubmit({
        formData: { ...formData, grade, locale: lang },
        modalOpen,
        t,
        onSuccess: () => {
          modalClose(modalId)
        }
      });
    },
    [grade, modalOpen, modalClose, modalId, t, lang]
  );

  const resetModal = () => {
    setGrade(0);
  };

  useEffect(() => {
    !!isOpen && typeof onOpen === 'function' && onOpen()
  }, [isOpen, onOpen])

  return (
    <BaseModal
      id={modalId}
      size="xs"
      title={t('reviews.modal.title')}
      type="custom"
      onClose={resetModal}
    >
      {isOpen && (
        <Form
          initialValues={initialValues}
          onSubmit={handleSubmitForm}
          render={({
            handleSubmit,
            submitting,
            form,
            pristine,
            values,
            submitError,
            modifiedSinceLastSubmit,
          }: any) => {
            const p: IPsychologist = currentPsychologist || (
              !!values.psychologist && isVisiblePsychologistField
                ? get(psychologists, [values?.psychologist])
                : {}
            );
            return (
              <form onSubmit={handleSubmit} className="reviews-form">
                {isVisiblePsychologistField && (
                  <>
                    <Field
                      name="psychologist"
                      placeholder={t('reviews.modal.placeholders.psychologist')}
                      component={FormSelect}
                      size="md"
                      options={psychologistsOptions}
                      validate={validateRequired}
                      loading={isLoadingPsychologists}
                    />
                  </>
                )}
                {!isEmpty(p) && (
                  <div className="psy-block">
                    <div className="psy-block__inner">
                      <div className="psy-block__media">
                        {!!p?.photo?.thumbnail && (
                          <img src={p?.photo?.sm} alt={p?.fullname} />
                        )}
                      </div>
                      <div className="psy-block__content">
                        <div className="psy-block__name">{p?.fullname}</div>
                        <p className="psy-block__description">
                          {p?.description}
                        </p>
                        <p className="psy-block__exp">
                          <strong>{t('site.experience')}:</strong>{' '}
                          {p?.experience_years}
                        </p>
                        {!!p?.problems && p?.problems?.length > 0 && (
                          <p>
                            <strong>{t('site.problems')}:</strong>{' '}
                            {p?.problems?.map((pr) => pr?.name).join(', ')}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                <div className="grade-block">
                  <div className="grade-block__title">
                    {t('reviews.modal.grade_title')}
                  </div>
                  <Stars
                    isClickable
                    onSelect={setGrade}
                    value={grade}
                    className="grade-block__stars"
                  />
                  <Field name="grade" component={FormInput} type="hidden" />
                </div>
                <Field
                  name="comment"
                  placeholder={t('reviews.modal.placeholders.comment')}
                  component={FormTextarea}
                  size="md"
                  validate={validateRequired}
                />
                <div className="form-footer">
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="md"
                    weight="bold"
                    disabled={submitting}
                    className="reviews-form__submit"
                  >
                    {t('reviews.modal.btn_send')}
                  </Button>
                </div>
                {submitError && !modifiedSinceLastSubmit && (
                  <div className="form-error">{submitError}</div>
                )}
              </form>
            );
          }}
        />
      )}
    </BaseModal>
  );
};

export { ReviewsAddModal };
