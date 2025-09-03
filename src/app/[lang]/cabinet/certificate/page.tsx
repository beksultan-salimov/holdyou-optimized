'use client'
import { Form, Field } from 'react-final-form';
import Image from 'next/image';
import { Page } from '@/cabinet/components/Page';
import { useTranslationClient } from '@/config/i18n/client';
import { showFormErrors } from '@/utils/helpers';
import { useLang } from '@/hooks/useLang';
import { FormInput } from '@/components/BaseForm';
import { useAppDispatch } from '@/hooks/useStore';
import { Button } from '@/components/Button';
import CertificateActivateImage from '@/static/img/certificateActivate.svg';
import { clientFetch } from '@/utils/service';
import { MODALS } from '@/config';
import { useModals } from '@/hooks/useModals';


interface IProps {
  props?: any;
}

const activateCertificateFormSubmit = async ({
  formData,
  t,
  modalOpen,
  actions
}: {
  formData: any;
  t: any;
  modalOpen: any;
  actions: any;
}) => {
  try {
    await clientFetch(`/checkouts/certificate/activate`, {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    actions.reset();
    modalOpen(MODALS.success, {
      title: t('cabinet.certificate.activate_success_title'),
      text: t('cabinet.certificate.activate_success_text'),
    });
  } catch (error: any) {
    // return showFormErrors({ error, t });
    modalOpen(MODALS.success, {
      isError: true,
      title: t('cabinet.certificate.activate_error_title'),
    });
  }
};

const CertificatePage = ({ props }: IProps) => {
  const slug = 'certificate';
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['cabinet']);
  const { modalClose, modalOpen } = useModals();

  const handleSubmit = async (formData: any, actions: any) => {
    return await activateCertificateFormSubmit({
      formData,
      t,
      modalOpen,
      actions
    });
  };

  return (
    <Page slug={slug}>
      <div className="activate-card activate-card--certificate">
        <div className="activate-card-media">
          <Image src={CertificateActivateImage} alt="success" />
        </div>
        <div className="activate-card-title">
          {t('cabinet.certificate.title')}
        </div>
        <div className="activate-card-description">
          {t('cabinet.certificate.description')}
        </div>

        <Form
          onSubmit={handleSubmit}
          render={({
            handleSubmit,
            submitting,
            submitError,
            modifiedSinceLastSubmit,
          }: any) => (
            <form onSubmit={handleSubmit} className="activate-card-form">
              <Field
                name="code"
                component={FormInput}
                placeholder={t('cabinet.certificate.form.field_code')}
              />

              <div className="form-footer">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="sm"
                  disabled={submitting}
                >
                  {t('cabinet.certificate.form.btn_submit')}
                </Button>
                {submitError && !modifiedSinceLastSubmit && (
                  <div className="form-error">{submitError}</div>
                )}
              </div>
            </form>
          )}
        />
      </div>
    </Page>
  );
};

export default CertificatePage;
