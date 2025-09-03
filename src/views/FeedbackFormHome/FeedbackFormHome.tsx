'use client';
import clsx from 'clsx';
import { Form, Field } from 'react-final-form';
import { CALLBACK_SUBJECTS_ARRAY, MODALS } from '@/config';
import { useTranslationClient } from '@/config/i18n/client';
import { clientFetch } from '@/utils/service';
import { showFormErrors } from '@/utils/helpers';
import {
  composeValidators,
  validatePhone,
  validateRequired,
} from '@/utils/validate';
import { useLang } from '@/hooks/useLang';
import { useModals } from '@/hooks/useModals';
import { Button } from '@/components/Button';
import {
  FormInput,
  FormPhoneInput,
  FormSelect,
  FormTextarea,
} from '@/components/BaseForm';
import './feedback-form-home.scss';

interface IProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
}
interface IfeedbackSubmit {
  formData: any;
  t: any;
  modalOpen: any;
}
const feedbackSubmit = async ({ formData, t, modalOpen }: IfeedbackSubmit) => {
  const phone = !!formData?.phone ? '+' + formData?.phone : undefined;
  const normalizedFormData = { ...formData, phone };
  normalizedFormData.source = typeof window !== 'undefined' ? window?.location?.href : 'Home';
  try {
    await clientFetch(`/admin/callback`, {
      method: 'POST',
      body: JSON.stringify(normalizedFormData),
    });
    modalOpen(MODALS.success, {
      title: t('home.feedback_form.success_title'),
      isDefaultImage: true,
    });
  } catch (error: any) {
    return showFormErrors({ error, t });
  }
};

const FeedbackFormHome = ({ title, subtitle, className }: IProps) => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['home', 'site']);
  const initialValues = {};
  const { modalOpen } = useModals();
  const handleSubmitForm = async (formData: any) => {
    return await feedbackSubmit({ formData, t, modalOpen });
  };
  const subjectOptions = CALLBACK_SUBJECTS_ARRAY?.map((i) => ({
    label: t(`site.callback_subjects.${i}`),
    value: t(`site.callback_subjects.${i}`),
  }));

  return (
    <div className={clsx('feedback-form-home', className)}>
      {title}
      {subtitle}
      <Form
        initialValues={initialValues}
        onSubmit={handleSubmitForm}
        render={({ handleSubmit, submitting, submitError }: any) => (
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <Field
                name="name"
                placeholder={t('site.feedback_form.placeholders.name')}
                component={FormInput}
                validate={validateRequired}
              />
              <Field
                name="email"
                placeholder={t('site.feedback_form.placeholders.email')}
                component={FormInput}
                validate={validateRequired}
              />
              <Field
                name="phone"
                placeholder={t('site.feedback_form.placeholders.phone')}
                component={FormPhoneInput}
                validate={composeValidators(validateRequired, validatePhone)}
              />
              <Field
                name="subjects"
                placeholder={t('site.feedback_form.placeholders.subjects')}
                component={FormSelect}
                validate={validateRequired}
                options={subjectOptions}
              />
            </div>
            <Field
              name="msg"
              placeholder={t('site.feedback_form.placeholders.comment')}
              component={FormTextarea}
              rows={10}
            />
            <div className="form-footer">
              <Button
                type="primary-old"
                htmlType="submit"
                size="md"
                disabled={submitting}
                weight="bold"
              >
                {t('site.feedback_form.send_button')}
              </Button>
            </div>
            {submitError && <div className="form-error">{submitError}</div>}
          </form>
        )}
      />
    </div>
  );
};

export { FeedbackFormHome };
