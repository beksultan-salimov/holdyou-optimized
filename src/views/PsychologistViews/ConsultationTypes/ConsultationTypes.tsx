import { useEffect, useMemo } from "react"
import type { MouseEventHandler } from "react"
import clsx from "clsx"
import { IAllowedConsultation, IPsychologist, ServiceEnum } from "@/types"
import { get, isEmpty } from "@/utils/helpers"
import { useAppDispatch, useAppSelector } from "@/hooks/useStore"
import { getSelectedService, selectService } from "@/store/checkoutSlice"
import { useLang } from "@/hooks/useLang"
import { useTranslationClient } from "@/config/i18n/client"
import './consultationTypes.scss';

interface IProps {
  allowedConsultations?: Record<keyof typeof ServiceEnum, IAllowedConsultation>
  psychologist?: IPsychologist
}
interface IPropsItem {
  selected?: ServiceEnum | null
  onSelect?: (id: ServiceEnum) => void
  item?: IAllowedConsultation
  type: ServiceEnum
}

const ConsultationTypesItem = ({
  onSelect,
  selected,
  item,
  type,
}: IPropsItem) => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);
  const { count = 0 } = item || {}
  const handleClickItem: MouseEventHandler<HTMLDivElement> = () => {
    !!onSelect && onSelect(type)
  }

  return (
    <div
      className={clsx('consultation-types-item', {
        active: selected === type,
        disabled: count === 0,
      })}
      onClick={handleClickItem}
    >
      <div className="consultation-types-item-label">
        <div className="radio-icon" />
        {t(`site.services.items.${type}` as any)}
      </div>
      <div className="badge-count">
        {t('site.available')} {count}
      </div>
    </div>
  );
}

const ConsultationTypes = ({ allowedConsultations, psychologist }: IProps) => {
  const dispatch = useAppDispatch()
  const selectedService = useAppSelector(getSelectedService)
  const handleSelectService = (service: ServiceEnum) => {
    dispatch(selectService(service))
  }

  const { is_junior, is_tester, is_vip, is_pair_consultation } = psychologist || {};
  const avalaibleServices = useMemo(() => {
    let items = [];
    if (!is_junior && !is_vip) {
      items.push(ServiceEnum.standard);
    }
    if (is_pair_consultation) {
      items.push(ServiceEnum.pair);
    }
    if (is_junior) {
      items.push(ServiceEnum.junior);
    }
    if (is_tester) {
      items.push(ServiceEnum.tester);
    }
    if (is_vip) {
      items.push(ServiceEnum.vip);
    }
    return items
  }, [is_junior, is_pair_consultation, is_tester, is_vip])

  useEffect(() => {
    if (!isEmpty(allowedConsultations)) {
      const defaultSelectedConsultation = avalaibleServices?.find((type) => get(allowedConsultations, [type as ServiceEnum, 'count'], 0) > 0)
      defaultSelectedConsultation && dispatch(selectService(defaultSelectedConsultation as ServiceEnum))
    }
  }, [allowedConsultations, avalaibleServices, dispatch])

  return (
    <div className="consultation-types">
      {avalaibleServices?.map((type) => (
        <ConsultationTypesItem
          key={type}
          type={type as ServiceEnum}
          selected={selectedService}
          onSelect={handleSelectService}
          item={get(allowedConsultations, [type])}
        />
      ))}
    </div>
  );
}

export { ConsultationTypes }
