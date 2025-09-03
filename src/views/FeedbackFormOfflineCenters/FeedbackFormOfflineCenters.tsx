'use client'
import clsx from 'clsx';
import { Form, Field } from 'react-final-form';
import { useTranslationClient } from '@/config/i18n/client';
import { useLang } from '@/hooks/useLang';
import { Button } from '@/components/Button';
import { FormInput, FormPhoneInput, FormTextarea } from '@/components/BaseForm';
import { feedbackOfflineCentersSubmit } from '@/utils/services';
import { composeValidators, validateEmail, validatePhone, validateRequired } from '@/utils/validate';
import { useModals } from '@/hooks/useModals';
import './feedback-form-offline.scss';

interface IProps {
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  className?: string;
  address?: string;
}

const FeedbackFormOfflineCenters = ({
  title,
  subTitle,
  className,
  address,
}: IProps) => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['offline_centers']);
  const initialValues = { subjects: `Офлайн-запис за адресою: ${address}` };
  const { modalOpen } = useModals();
  const handleSubmitForm = async (formData: any) => {
    return await feedbackOfflineCentersSubmit({ formData, t, modalOpen });
  };

  return (
    <div className={clsx('feedback-form-offline', className)}>
      {title}
      {subTitle}
      <Form
        initialValues={initialValues}
        onSubmit={handleSubmitForm}
        render={({ handleSubmit, submitting, submitError }: any) => (
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <Field
                name="name"
                placeholder={t(
                  'offline_centers.feedback_form.placeholders.name'
                )}
                component={FormInput}
                validate={validateRequired}
              />
              <Field
                name="email"
                placeholder={t(
                  'offline_centers.feedback_form.placeholders.email'
                )}
                component={FormInput}
                validate={composeValidators(validateRequired, validateEmail)}
              />
            </div>
            <Field
              name="phone"
              placeholder={t(
                'offline_centers.feedback_form.placeholders.phone'
              )}
              component={FormPhoneInput}
              validate={composeValidators(validateRequired, validatePhone)}
            />
            <Field
              name="msg"
              placeholder={t(
                'offline_centers.feedback_form.placeholders.comment'
              )}
              component={FormTextarea}
              rows={10}
              autosize
            />

            <div className="form-footer">
              <Button
                type="primary-old"
                htmlType="submit"
                size="md"
                disabled={submitting}
                weight="bold"
                shadow
              >
                {t('offline_centers.feedback_form.send_button')}
              </Button>
            </div>
            {submitError && <div className="form-error">{submitError}</div>}
          </form>
        )}
      />
    </div>
  );
};

export { FeedbackFormOfflineCenters };
