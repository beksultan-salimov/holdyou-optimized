'use client';
import { useMemo } from 'react';
import { Form, Field } from 'react-final-form';
import { useTranslationClient } from '@/config/i18n/client';
import { composeValidators, validatePhone, validateRequired } from '@/utils/validate';
import { clientFetch } from '@/utils/service';
import { IOfflineCenter } from '@/types/OfflineCenterTypes';
import { useLang } from '@/hooks/useLang';
import { FormInput, FormPhoneInput, FormSelect } from '@/components/BaseForm';
import { Title } from '@/components/Title';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { AppMap } from '@/components/Map';
import { Button } from '@/components/Button';
import { get, showFormErrors } from '@/utils/helpers';
import { MODALS } from '@/config';
import { useModals } from '@/hooks/useModals';
import { IPsychologist } from '@/types';

interface IProps {
  offlineCenters: IOfflineCenter[];
  psychologist: IPsychologist;
}

const offlineOrderSubmit = async ({
  form,
  formData,
  t,
  modalOpen,
  psychologistFullname,
}: {
  form: any;
  formData: any;
  t: any;
  modalOpen: any;
  psychologistFullname?: string;
}) => {
  const phone = !!formData?.phone ? '+' + formData?.phone : undefined;
  const subjects = 'Офлайн-заявка з сайту';
  const msg = `Адреса: ${formData?.address}. \nДо психолога: ${psychologistFullname}`;
  const source = typeof window !== 'undefined' ? window?.location?.href : 'callback';
  const normalizedFormData = { ...formData, phone, source, subjects, msg };

  try {
    await clientFetch(`/admin/callback`, {
      method: 'POST',
      body: JSON.stringify(normalizedFormData),
    });
    modalOpen(MODALS.success, {
      title: t('offline_order.order_form.success_modal.title'),
      text: t('offline_order.order_form.success_modal.text'),
    });
    !!form && typeof form?.reset === 'function' && form?.reset();
  } catch (error: any) {
    return showFormErrors({ error, t });
  }
};

const PsychologistOfflineOrder = ({ offlineCenters = [], psychologist }: IProps) => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['offline_order']);
  const { modalOpen } = useModals();
  const psychologistCenters = useMemo(
    () => psychologist?.centers || [],
    [psychologist?.centers]
  );
  const offlineCentersById = offlineCenters?.reduce((a:any, c:any) => {
    a[c.id] = c
    return a
  }, {});
  const ocOptions = useMemo(() => {
    return psychologistCenters?.map((id) => {
      const center = offlineCentersById[id];
      return {
        label: center?.address,
        value: center?.address,
      };
    });
  }, [psychologistCenters, offlineCentersById]);
  const handleSubmitForm = async (formData: any, form:any) => {
    return await offlineOrderSubmit({
      form,
      formData,
      t,
      modalOpen,
      psychologistFullname: psychologist?.fullname,
    });
  };
  const initialValues = useMemo(
    () => ({
      address:
        psychologistCenters?.length === 1
          ? offlineCentersById[psychologistCenters[0]]?.address
          : undefined,
    }),
    [offlineCentersById, psychologistCenters]
  );

  return (
    <div className="psychologist-offline-order">
      <div className="offline-order-form">
        <Title iconName="Edit" className="offline-order-form__title">
          {t('offline_order.order_form.title')}
        </Title>
        <Text size="18">{t('offline_order.order_form.subtitle')}</Text>

        <div className="offline-order-form__form">
          <Form
            initialValues={initialValues}
            onSubmit={handleSubmitForm}
            render={({ handleSubmit, submitting, submitError }: any) => (
              <form onSubmit={handleSubmit}>
                <div className="inputs">
                  <Field
                    name="name"
                    placeholder={t(
                      'offline_order.order_form.placeholders.name'
                    )}
                    component={FormInput}
                    validate={validateRequired}
                  />
                  <Field
                    name="email"
                    placeholder={t(
                      'offline_order.order_form.placeholders.email'
                    )}
                    component={FormInput}
                    validate={validateRequired}
                  />
                  <Field
                    name="phone"
                    placeholder={t(
                      'offline_order.order_form.placeholders.phone'
                    )}
                    component={FormPhoneInput}
                    validate={composeValidators(
                      validateRequired,
                      validatePhone
                    )}
                  />
                  {!!psychologistCenters && psychologistCenters?.length > 1 && (
                    <Field
                      name="address"
                      placeholder={t(
                        'offline_order.order_form.placeholders.address'
                      )}
                      component={FormSelect}
                      validate={validateRequired}
                      options={ocOptions}
                    />
                  )}
                  <Button
                    type="primary-old"
                    htmlType="submit"
                    disabled={submitting}
                    size="sm"
                    weight="bold"
                    shadow
                  >
                    {t('offline_order.order_form.send_button')}
                  </Button>
                </div>

                {submitError && <div className="form-error">{submitError}</div>}
              </form>
            )}
          />
        </div>
      </div>

      <div className="offline-order-map">
        <div className="offline-order-map__title">
          <Icon name="Pin" />
          <Text size="18" tag="span">
            {!!psychologistCenters && psychologistCenters?.length > 1
              ? t('offline_order.order_form.subtitle_addresses')
              : t('offline_order.order_form.subtitle_address') +
                ': ' +
                offlineCentersById[psychologistCenters![0]]?.address}
          </Text>
        </div>

        <div className="offline-order-map__map">
          {!!offlineCentersById[psychologistCenters![0]]?.latitude && (
            <AppMap
              center={[
                offlineCentersById[psychologistCenters![0]]?.latitude,
                offlineCentersById[psychologistCenters![0]]?.longitude,
              ]}
              zoom={psychologistCenters?.length > 1 ? 10 : 12}
            >
              {({ TileLayer, Marker, Popup }: any) => (
                <>
                  <TileLayer
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maxNativeZoom={19}
                  />
                  {psychologistCenters?.map((id) => (
                    <Marker
                      key={offlineCentersById[id]?.address}
                      position={[
                        offlineCentersById[id]?.latitude,
                        offlineCentersById[id]?.longitude,
                      ]}
                    >
                      <Popup>
                        <p style={{ textAlign: 'center' }}>
                          {offlineCentersById[id]?.address}
                        </p>
                      </Popup>
                    </Marker>
                  ))}
                </>
              )}
            </AppMap>
          )}
        </div>
      </div>
    </div>
  );
};

export { PsychologistOfflineOrder };
