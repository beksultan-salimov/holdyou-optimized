'use client';
import { useEffect } from 'react';
import { Link } from '@/components/Link';
import Image from 'next/image';
import { MODALS, ROUTES } from '@/config';
import { useTranslationClient } from '@/config/i18n/client';
import { useModals } from '@/hooks/useModals';
import { useLang } from '@/hooks/useLang';
import { Button } from '@/components/Button';
import { InfoItem } from '@/components/InfoItem';
import { BaseModal } from '@/views/BaseModal';
import HeaderIcon from '@/static/img/success.svg';
import './checkoutSuccessModal.scss';
import { sendGTMEvent } from '@next/third-parties/google';

const CheckoutSuccessModal = () => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);
  const modalId = MODALS.checkoutSuccess;
  const { params, modalClose } = useModals(modalId);
  const { isOpen, datetime, psychologist, serviceText } = params || {};
  const { photo, fullname } = psychologist || {};
  const psychologistImage = photo?.md || '';

  const header = (
    <>
      <div className="modal-header-icon">
        <Image src={HeaderIcon} alt="" />
      </div>
      <div className="modal-header-title">
        {t('site.checkout_success_modal.title')}
      </div>
    </>
  );
  const handleClickClose = () => {
    modalClose(modalId);
  };

  useEffect(() => {
    isOpen && sendGTMEvent({ event: 'zapys' });
  }, [isOpen])

  return (
    <BaseModal id={modalId} size="sm" title={header} >
      {isOpen && (
        <>
          <div className="order-resume">
            <div className="order-resume-media">
              <div className="media-square">
                {!!photo && <Image src={psychologistImage} alt={fullname} width={366} height={366} />}
              </div>
            </div>
            <div className="order-resume-content">
              <InfoItem
                label={`${t('site.psh')}:`}
                text={fullname}
                iconName="Person"
                avatarSize={50}
                avatarType="primary"
              />
              <InfoItem
                label={`${t('site.date')}:`}
                text={datetime}
                iconName="Calendar"
                avatarSize={50}
                avatarType="primary"
              />
              <InfoItem
                label={`${t('site.type')}:`}
                text={serviceText}
                iconName="MessageBubble"
                avatarSize={50}
                avatarType="primary"
              />
            </div>
          </div>

          <div className="ps-message">
            <p>{t('site.checkout_success_modal.text')}</p>
            <Link href={ROUTES.cabinet}>
              <Button type="primary" size="md" onClick={handleClickClose}>
                {t('site.checkout_success_modal.btn_cta')}
              </Button>
            </Link>
          </div>
        </>
      )}
    </BaseModal>
  );
};

export { CheckoutSuccessModal };
