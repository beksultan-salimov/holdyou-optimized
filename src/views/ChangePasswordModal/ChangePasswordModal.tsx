'use client';
import { Form, Field } from 'react-final-form';
import { FormInput, FormInputPassword, FormPhoneInput } from '@/components/BaseForm';
import { Button } from '@/components/Button';
import { useModals } from '@/hooks/useModals';
import { MODALS } from '@/config';
import { useLang } from '@/hooks/useLang';
import { useTranslationClient } from '@/config/i18n/client';
import { BaseModal } from '@/views/BaseModal';
import { clientFetch } from '@/utils/service';
import { showFormErrors } from '@/utils/helpers';
import { toast } from 'react-toastify';

const changePasswordSubmit = async ({
  formData,
  t,
  onSuccess,
}: {
  formData: any;
  t: any;
  onSuccess: any;
}) => {
  try {
    await clientFetch(`/users/change-password`, {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    if (typeof onSuccess === 'function') {
      onSuccess();
    }
  } catch (error) {
    toast.error(t('cabinet.change_password.submit_error'));
    return showFormErrors({ error, t });
  }
};

const ChangePasswordModal = () => {
  const modalId = MODALS.changePassword;
  const { params, modalClose, modalOpen } = useModals(modalId);
  const { isOpen = true } = params || {};
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['cabinet']);

  const handleSubmitForm = async (formData: any) => {
    return await changePasswordSubmit({
      formData,
      t,
      onSuccess: () => {
        modalClose(modalId);
        modalOpen(MODALS.success, {
          title: t('cabinet.change_password.submit_success'),
        });
      },
    });
  };

  return (
    <BaseModal
      id={modalId}
      title={t('cabinet.change_password.title')}
      size="xs"
      type="custom"
      isCenter
    >
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
                name="old_password"
                placeholder={t('cabinet.change_password.old_password')}
                component={FormInputPassword}
                size="lg"
              />
              <Field
                name="new_password"
                placeholder={t('cabinet.change_password.new_password')}
                component={FormInputPassword}
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

export { ChangePasswordModal };
