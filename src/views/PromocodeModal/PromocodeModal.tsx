'use client'
import { MODALS } from "@/config"
import { Form, Field } from 'react-final-form';
import { useTranslationClient } from "@/config/i18n/client";
import { useModals } from "@/hooks/useModals"
import { useLang } from "@/hooks/useLang";
import { FormInput } from "@/components/BaseForm"
import { Button } from "@/components/Button"
import { BaseModal } from "@/views/BaseModal";
import { useAppDispatch } from "@/hooks/useStore";
// import { showFormErrors } from "@/utils/helpers";
import { clientFetch } from "@/utils/service";
import { activatePromocode } from "@/store/servicesSlice";


const activatePromoFormSubmit = async ({
  formData,
  t,
  modalOpen,
  modalClose,
  dispatch,
}: {
  formData: any;
  t: any;
  modalOpen: any;
  modalClose: any;
  dispatch: any;
}) => {
  try {
    const res = await clientFetch(`/checkouts/promo`, {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    dispatch(activatePromocode(res));
    modalClose(MODALS.promocode);
    modalOpen(MODALS.success, {
      title: t('site.promocode_modal.activate_success_title'),
      text: t('site.promocode_modal.activate_success_text'),
    });
  } catch (error: any) {
    modalOpen(MODALS.success, {
      isError: true,
      title: t('site.promocode_modal.activate_error_title'),
    });
  }
};

const PromocodeModal = () => {
  const modalId = MODALS.promocode
  const { params, modalOpen, modalClose } = useModals(modalId);
  const { isOpen = true } = params || {}
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);
  const dispatch = useAppDispatch();

  const handleSubmit = async (formData: any) => {
    return await activatePromoFormSubmit({ formData, t, modalOpen, modalClose, dispatch });
  };

  return (
    <BaseModal
      id={modalId}
      size="xs"
      title={t('site.promocode_modal.title')}
      type="custom"
      isCenter
    >
      {isOpen && (
        <Form
          onSubmit={handleSubmit}
          render={({
            handleSubmit,
            submitting,
            modifiedSinceLastSubmit,
            submitError,
          }: any) => (
            <form onSubmit={handleSubmit} className="promocodes-form">
              <Field
                name="code"
                placeholder={t('site.promocode_modal.form.promocode')}
                component={FormInput}
                size="lg"
              />
              <div className="form-footer">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="md"
                  weight="bold"
                  disabled={submitting}
                >
                  {t('site.promocode_modal.form.btns.submit')}
                </Button>
                {submitError && !modifiedSinceLastSubmit && (
                  <div className="form-error">{submitError}</div>
                )}
              </div>
            </form>
          )}
        />
      )}
    </BaseModal>
  );
}

export { PromocodeModal }
