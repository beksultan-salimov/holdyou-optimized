// import { useTranslation } from 'next-i18next'
import { Button } from '@/components/Button';
import { InfoMessage } from '@/components/InfoMessage';
import { Title } from '@/components/Title';
import { getDate, isArray, isEmpty } from "@/utils/helpers"
import { useAppDispatch, useAppSelector } from "@/hooks/useStore"
import {
  clearSelectedValues,
  getSelectedDate,
  getSelectedSchedule,
  getSelectedService,
  getSelectedServiceDuration,
  getSelectedTime,
  getSelectedTimezone,
  getSubmitErrors,
  getSubmitLoading,
  submitOrder,
} from "@/store/checkoutSlice"
import { useLang } from '@/hooks/useLang';
import { useTranslationClient } from '@/config/i18n/client';
import Image from "next/image";

interface IProps {
  name?: string
  image?: string
}
const CheckoutResume = ({ name, image }: IProps) => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);
  const isLoading = useAppSelector(getSubmitLoading)
  const date = useAppSelector(getSelectedDate)
  const time = useAppSelector(getSelectedTime)
  const schedule = useAppSelector(getSelectedSchedule)
  const timezone = useAppSelector(getSelectedTimezone)
  const selectedService = useAppSelector(getSelectedService)
  const selectedServiceDuration = useAppSelector(getSelectedServiceDuration)
  const errors = useAppSelector(getSubmitErrors)

  const service = selectedService
    ? `${t(
        `site.services.items.${selectedService}` as any,
      )} (${selectedServiceDuration} хв.)`
    : "-"

  const { label: timezoneLabel } = timezone || {}
  const fullDate =
    `${getDate(date as any, "DD MMMM")}${time ? ` о ${time}` : ""}${
      timezone ? ` (${timezoneLabel})` : ""
    }` || "-"

  // const canSubmit = !!date && !!schedule && !!timezone && service
  const dispatch = useAppDispatch()
  const handleSubmitOrder = () => {
    dispatch(submitOrder({}))
  }

  return (
    <div className="checkout-resume">
      <div className="checkout-resume-body">
        <div className="checkout-resume-content">
          {!!image && (
            <div className="checkout-resume-image">
              <Image src={image} alt={name!} />
            </div>
          )}
          <Title
            iconName="Person"
            extraText={
              <>
                <b>{t('site.psh')}:</b> {name || '-'}
              </>
            }
            size="xs"
          />
          <Title
            iconName="Calendar"
            extraText={
              <>
                <b>{t('site.date')}:</b> {!!date && !!fullDate ? fullDate : '-'}
              </>
            }
            size="xs"
          />
          <Title
            iconName="MessageBubble"
            extraText={
              <>
                <b>{t('site.type_consultation')}: </b> {service || '-'}
              </>
            }
            size="xs"
          />
        </div>
      </div>
      <div className="checkout-resume-footer">
        <Button
          type="primary"
          size="md"
          className="checkout-resume-submit"
          disabled={isLoading}
          loading={isLoading}
          onClick={handleSubmitOrder}
        >
          {t('site.enroll')}
        </Button>

        {!isEmpty(errors) && (
          <InfoMessage
            text={Object.keys(errors).map((type) => {
              if (isArray(errors[type])) {
                return errors[type]?.map((item: string, idx: number) => (
                  <p key={type + idx}>{item}</p>
                ));
              } else {
                return <p key={type}>{errors[type]}</p>;
              }
            })}
            iconName="AlertBubble"
            type="error"
            className="error-block"
          />
        )}
      </div>
    </div>
  );
}

export default CheckoutResume
