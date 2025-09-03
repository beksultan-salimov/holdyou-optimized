'use client'
import { Form, Field } from 'react-final-form';
import { sendGTMEvent } from '@next/third-parties/google';
import { MODALS } from "@/config"
import { useTranslationClient } from "@/config/i18n/client";
import { useModals } from "@/hooks/useModals"
import { useLang } from "@/hooks/useLang";
import { FormInput, FormPhoneInput } from "@/components/BaseForm"
import { Button } from "@/components/Button"
import { BaseModal } from "@/views/BaseModal";
import { composeValidators, validatePhone, validateRequired } from "@/utils/validate";
import { clientFetch } from "@/utils/service";
import { showFormErrors } from "@/utils/helpers";
import { Text } from "@/components/Text";

interface IcontactsFormSubmit {
  formData: any;
  t: any;
  modalClose: any;
  modalOpen: any;
}
const callbackFormSubmit = async ({
  formData,
  t,
  modalClose,
  modalOpen
}: IcontactsFormSubmit) => {
  const phone = !!formData?.phone ? '+' + formData?.phone : undefined;
  const normalizedFormData = { ...formData, phone };
  normalizedFormData.source = typeof window !== 'undefined' ? window?.location?.href : 'callback';

  try {
    await clientFetch(`/admin/callback`, {
      method: 'POST',
      body: JSON.stringify(normalizedFormData),
    });
    modalClose(MODALS.callback);
    modalOpen(MODALS.success, {
      text: t('site.callback_modal.submit_success'),
    });
    sendGTMEvent({ event: 'zapys' });
  } catch (error: any) {
    return showFormErrors({ error, t });
  }
};

const CallbackModal = () => {
  const modalId = MODALS.callback
  const { params } = useModals(modalId)
  const {
    isOpen,
    title,
    subtitle,
    isSubtitle = true,
    btnText,
    initialValues = {},
  } = params || {};
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);
  const { modalClose, modalOpen } = useModals();

  const handleSubmitForm = async (formData: any) => {
    return await callbackFormSubmit({
      formData,
      t,
      modalClose,
      modalOpen,
    });
  };

  return (
    <BaseModal
      id={modalId}
      size="xs"
      title={title || t('site.callback_modal.title')}
      type="custom"
      isCenter
    >
      {isSubtitle && (
        <Text className="modal-subtitle" isCenter>
          {subtitle || t('site.callback_modal.subtitle')}
        </Text>
      )}
      {isOpen && (
        <Form
          onSubmit={handleSubmitForm}
          initialValues={initialValues}
          render={({
            handleSubmit,
            submitting,
            values,
            submitError,
            modifiedSinceLastSubmit,
          }: any) => (
            <form onSubmit={handleSubmit} className="callback-form">
              <Field
                name="name"
                placeholder={t('site.callback_modal.name')}
                component={FormInput}
                size="lg"
              />
              <Field
                name="phone"
                placeholder={t('site.callback_modal.phone')}
                component={FormPhoneInput}
                size="lg"
                validate={composeValidators(validateRequired, validatePhone)}
              />
              <div className="form-footer">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="sm"
                  weight="bold"
                  disabled={submitting}
                  className="btn-submit"
                >
                  {btnText || t('site.callback_modal.btn_submit')}
                </Button>
              </div>
              {submitError && !modifiedSinceLastSubmit && (
                <div className="form-error">{submitError}</div>
              )}
            </form>
          )}
        />
      )}
    </BaseModal>
  );
}

export { CallbackModal }
