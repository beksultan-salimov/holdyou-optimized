'use client';
import React, { useEffect, useMemo } from 'react';
import { defaultCurrency, PSYCHOLOGIST_SCHEDULER_ID } from '@/config';
import { useTranslationClient } from '@/config/i18n/client';
import { get } from '@/utils/helpers';
import { useLang } from '@/hooks/useLang';
import { IPsychologist, IService, ServiceEnum } from '@/types';
import { Button } from '@/components/Button';
import { RadioGroup } from '@/components/Fields/RadioGroup';
import { Icon } from '@/components/Icon';
import { ScrollLink } from '@/components/ScrollLink';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { getSelectedService, selectService, selectServiceFull } from '@/store/checkoutSlice';
import {useSearchParams} from "next/navigation";

interface IProps {
  initItems: Record<string, IService>;
  psychologist: IPsychologist;
}
const PsychologistSelectorSessionType = ({ initItems, psychologist }: IProps) => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);
  const dispatch = useAppDispatch();
  const selectedService = useAppSelector(getSelectedService);
  const { is_junior, is_tester, is_vip, is_pair_consultation } = psychologist || {};
  const handleSelectService = (serviceType: ServiceEnum) => {
    dispatch(selectService(serviceType))
  };
  const searchParams = useSearchParams();
  const isDiagnostics = searchParams?.get('diagnostics');

  const avalaibleServices = useMemo(() => {
    let items = [];
    if (!is_junior && !is_vip && !isDiagnostics) {
      items.push(ServiceEnum.standard);
    }
    if (is_pair_consultation && !isDiagnostics) {
      items.push(ServiceEnum.pair);
    }
    if (is_junior && !isDiagnostics) {
      items.push(ServiceEnum.junior);
    }
    if (is_tester) {
      items.push(ServiceEnum.tester);
    }
    if (is_vip && !isDiagnostics) {
      items.push(ServiceEnum.vip);
    }
    return items
  }, [is_junior, is_pair_consultation, is_tester, is_vip, isDiagnostics])

  const options = useMemo(() => {
    return avalaibleServices?.map((type: any) => ({
      label: (
        <>
          <p>{t(`site.services.items_how.${type}` as any)}</p>
          <p className="selector-session-type__label-sec">
            {get(initItems, [type, 'price'])} {defaultCurrency} /{' '}
            {t('site.minutes', { count: get(initItems, [type, 'minutes'], 0) })}
          </p>
        </>
      ),
      value: type,
    }));
  }, [initItems, t, avalaibleServices]);

  useEffect(() => {
    const initServiceType = !!selectedService ? selectedService : avalaibleServices[0] as ServiceEnum
    if (!selectedService) {
      dispatch(selectService(initServiceType));
    } else {
      dispatch(selectServiceFull(get(initItems, [initServiceType])));
    }
  }, [dispatch, selectedService, avalaibleServices, initItems]);

  return (
    <div className="selector-session-type">
      <div className="selector-session-type__title">
        {t('site.how_hold_session')}
      </div>
      <RadioGroup
        options={options}
        name="session_type"
        value={selectedService as string}
        onChange={handleSelectService}
      />
      <ScrollLink href={`#${PSYCHOLOGIST_SCHEDULER_ID}`} offset={-30}>
        <Button
          type="primary-old"
          className="selector-session-type__btn-cta"
          iconRight={<Icon name="SelectTime" />}
          weight="bold"
          size="sm"
          shadow
        >
          {t('site.select_time_session')}
        </Button>
      </ScrollLink>
    </div>
  );
};

export { PsychologistSelectorSessionType };
