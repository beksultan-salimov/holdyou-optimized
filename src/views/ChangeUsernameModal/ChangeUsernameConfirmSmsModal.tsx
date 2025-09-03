'use client';
import { useEffect, useRef } from 'react';
import { Form, Field } from 'react-final-form';
import { FormInput } from '@/components/BaseForm';
import { Button } from '@/components/Button';
import { useModals } from '@/hooks/useModals';
import { MODALS } from '@/config';
import { useLang } from '@/hooks/useLang';
import { useTranslationClient } from '@/config/i18n/client';
import { BaseModal } from '@/views/BaseModal';
import { clientFetch } from '@/utils/service';
import { Text } from '@/components/Text';
import { showFormErrors } from '@/utils/helpers';

interface IregistrationConfirmSubmit {
  formData: any;
  t: any;
  modalOpen: any;
  modalClose: any;
  new_phone: string;
}
const changeUsernameConfirmSubmit = async ({
  formData,
  t,
  modalOpen,
  modalClose,
  new_phone,
}: IregistrationConfirmSubmit) => {
  const sms_code = formData?.sms_code?.join('');
  const normalizedFormData = { sms_code, new_phone };
  try {
    await clientFetch(`/users/confirm-username`, {
      method: 'POST',
      body: JSON.stringify(normalizedFormData),
    });
    modalClose(MODALS.changeUsernameConfirm);
    modalOpen(MODALS.success, {
      title: t('cabinet.change_username.submit_success'),
    });
  } catch (error: any) {
    return showFormErrors({ error, t });
  }
};

const ChangeUsernameConfirmSmsModal = () => {
  const modalId = MODALS.changeUsernameConfirm;
  const { params, modalOpen, modalClose } = useModals(modalId);
  const { isOpen, new_phone } = params || {};
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);

  const ref_0 = useRef(null);
  const ref_1 = useRef(null);
  const ref_2 = useRef(null);
  const ref_3 = useRef(null);
  const refs = [ref_0, ref_1, ref_2, ref_3];

  const handleSubmitForm = async (formData: any) => {
    return await changeUsernameConfirmSubmit({
      formData,
      t,
      modalOpen,
      modalClose,
      new_phone,
    });
  };

  const handleChangeNumber = (e: any) => {
    const idx = e.target.tabIndex;
    const value = e.target.value;
    if (value !== undefined || value !== '') {
      if (Number(idx) <= 4) {
        const nextfield = refs?.[Number(idx)]?.current;
        if (nextfield !== null) {
          (nextfield as HTMLInputElement)?.focus();
          (nextfield as HTMLInputElement)?.select();
        }
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (isOpen && ref_0?.current) {
        (ref_0?.current as HTMLInputElement)?.focus();
      }
    }, 100);
  }, [isOpen])

  return (
    <BaseModal
      id={modalId}
      title={t('site.registration_confirm_title')}
      size="xs"
      type="custom"
      isCenter
    >
      <Text className="subtitle" isCenter>
        {t('site.registration_confirm_subtitle')}
      </Text>
      {isOpen && (
        <Form
          onSubmit={handleSubmitForm}
          render={({
            handleSubmit,
            submitting,
            submitError,
            modifiedSinceLastSubmit,
          }: any) => (
            <form onSubmit={handleSubmit} className="modal-auth-form">
              <div className="field-sms">
                {[0, 1, 2, 3].map((i) => (
                  <Field
                    key={i}
                    name={`sms_code[${i}]`}
                    component={FormInput}
                    size="lg"
                    min="0"
                    max="9"
                    tabIndex={i + 1}
                    onChange={handleChangeNumber}
                    maxLength={1}
                    refs={refs[i]}
                    autoComplete="off"
                  />
                ))}
              </div>

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

              {submitError && !modifiedSinceLastSubmit && (
                <div className="form-error">{submitError}</div>
              )}
            </form>
          )}
        />
      )}
    </BaseModal>
  );
};

export { ChangeUsernameConfirmSmsModal };
