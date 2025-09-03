'use client';
import { Form, Field } from 'react-final-form';
import { FormPhoneInput } from '@/components/BaseForm';
import { Button } from '@/components/Button';
import { useModals } from '@/hooks/useModals';
import { MODALS } from '@/config';
import { useLang } from '@/hooks/useLang';
import { useTranslationClient } from '@/config/i18n/client';
import { BaseModal } from '@/views/BaseModal';
import { clientFetch } from '@/utils/service';
import { normalizePhoneNumber, showFormErrors } from '@/utils/helpers';
import { toast } from 'react-toastify';
import { Text } from '@/components/Text';

const changeUsernameSubmit = async ({
  formData,
  t,
  onSuccess,
}: {
  formData: any;
  t: any;
  onSuccess: any;
}) => {
  const new_phone = normalizePhoneNumber(formData?.new_phone);
  const normalizedFormData = { ...formData, new_phone };

  try {
    await clientFetch(`/users/change-username`, {
      method: 'POST',
      body: JSON.stringify(normalizedFormData),
    });
    if (typeof onSuccess === 'function') {
      onSuccess();
    }
  } catch (error) {
    toast.error(t('cabinet.change_username.submit_error'));
    return showFormErrors({ error, t });
  }
};

const ChangeUsernameModal = () => {
  const modalId = MODALS.changeUsername;
  const { params, modalClose, modalOpen } = useModals(modalId);
  const { isOpen } = params || {};
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['cabinet']);

  const handleSubmitForm = async (formData: any) => {
    return await changeUsernameSubmit({ formData, t, onSuccess: () => {
      modalClose(modalId)
      modalOpen(MODALS.changeUsernameConfirm, {
        isOpen: true,
        new_phone: normalizePhoneNumber(formData?.new_phone),
      });
     } });
  };

  return (
    <BaseModal
      id={modalId}
      title={t('cabinet.change_username.title')}
      size="xs"
      type="custom"
      isCenter
    >
      <Text className="subtitle" isCenter>
        {t('cabinet.change_username.subtitle')}
      </Text>
      {isOpen && (
        <Form
          onSubmit={handleSubmitForm}
          render={({
            handleSubmit,
            submitting,
            form,
            pristine,
            values,
            submitError,
          }: any) => (
            <form onSubmit={handleSubmit} className="modal-auth-form">
              <Field
                name="new_phone"
                label={t('cabinet.change_username.new_phone')}
                placeholder={t('cabinet.change_username.new_phone')}
                component={FormPhoneInput}
                size="lg"
              />

              <div className="form-footer">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="md"
                  weight="bold"
                  disabled={submitting}
                  isFull
                >
                  {t('cabinet.send')}
                </Button>
              </div>
              {submitError && <div className="form-error">{submitError}</div>}
            </form>
          )}
        />
      )}
    </BaseModal>
  );
};

export { ChangeUsernameModal };
