'use client';
import { Form, Field } from 'react-final-form';
import { useTranslationClient } from '@/config/i18n/client';
import { CALLBACK_SUBJECTS, MODALS } from '@/config';
import { clientFetch } from '@/utils/service';
import { showFormErrors } from '@/utils/helpers';
import {
  composeValidators,
  validatePhone,
  validateRequired,
} from '@/utils/validate';
import { useLang } from '@/hooks/useLang';
import { useModals } from '@/hooks/useModals';
import { FormInput, FormPhoneInput, FormTextarea } from '@/components/BaseForm';
import { Button } from '@/components/Button';

interface IcontactsFormSubmit {
  formData: any;
  t: any;
  modalOpen: any;
  form: any,
}
const contactsFormSubmit = async ({
  formData,
  t,
  modalOpen,
  form,
}: IcontactsFormSubmit) => {
  const phone = !!formData?.phone ? '+' + formData?.phone : undefined;
  const normalizedFormData = {
    ...formData,
    phone,
    subjects: CALLBACK_SUBJECTS.callme,
  };
  normalizedFormData.source = typeof window !== 'undefined' ? window?.location?.href : 'Contact';

  try {
    await clientFetch(`/admin/callback`, {
      method: 'POST',
      body: JSON.stringify(normalizedFormData),
    });
    modalOpen(MODALS.success, {
      title: t('contact.form.submit_success'),
    });
    !!form && typeof form?.reset === 'function' && form?.reset({ phone: (phone || '').slice(0,4) });
  } catch (error: any) {
    return showFormErrors({ error, t });
  }
};

const ContactsForm = () => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['contact']);
  const { modalOpen } = useModals();
  const handleSubmitForm = async (formData: any, form: any) => {
    return await contactsFormSubmit({
      formData,
      t,
      modalOpen,
      form
    });
  };

  return (
    <Form
      onSubmit={handleSubmitForm}
      render={({
        handleSubmit,
        submitting,
        submitError,
        modifiedSinceLastSubmit,
      }: any) => (
        <form onSubmit={handleSubmit} className="contacts-form">
          <Field
            name="name"
            placeholder={t('contact.form.name')}
            component={FormInput}
            size="lg"
            validate={validateRequired}
          />
          <Field
            name="phone"
            placeholder={t('contact.form.phone')}
            component={FormPhoneInput}
            size="lg"
            validate={composeValidators(validateRequired, validatePhone)}
          />
          <Field
            name="msg"
            placeholder={t('contact.form.comment')}
            component={FormTextarea}
            size="lg"
            validate={validateRequired}
          />
          <div className="form-footer">
            <Button
              type="primary-old"
              htmlType="submit"
              size="md"
              weight="bold"
              disabled={submitting}
              className="btn-submit"
            >
              {t('contact.form.submit_btn')}
            </Button>
          </div>
          {submitError && !modifiedSinceLastSubmit && (
            <div className="form-error">{submitError}</div>
          )}
        </form>
      )}
    />
  );
};

export { ContactsForm };
