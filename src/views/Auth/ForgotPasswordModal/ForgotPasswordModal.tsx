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
import { Text } from '@/components/Text';
import { showFormErrors } from '@/utils/helpers';

const forgotPasswordSubmit = async ({
  formData,
  t,
  modalClose,
  modalOpen,
}: {
  formData: any;
  t: any;
  modalClose: any;
  modalOpen: any;
}) => {
  try {
    await clientFetch(`/users/forgot-password`, {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    modalClose(MODALS.forgotPassword);
    modalOpen(MODALS.success, {
      title: t('site.forgot_password_submit_success'),
      isLoginButton: true,
    });
    localStorage.setItem('pass_changed', JSON.stringify('1'));
  } catch (error) {
    return showFormErrors({ error, t });
  }
};

const ForgotPasswordModal = () => {
  const modalId = MODALS.forgotPassword;
  const { params, modalClose, modalOpen } = useModals(modalId);
  const { isOpen = true } = params || {};
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);

  const handleSubmitForm = async (formData: any) => {
    return await forgotPasswordSubmit({ formData, t, modalClose, modalOpen });
  };

  return (
    <BaseModal
      id={modalId}
      title={t('site.forgot_password') + '?'}
      size="xs"
      type="custom"
      isCenter
    >
      <Text className="subtitle" isCenter>
        {t('site.forgot_password_subtitle')}
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
                name="username"
                placeholder={t('site.login')}
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
                  {t('site.send')}
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

export { ForgotPasswordModal };
