'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MODALS, ROUTES } from '@/config';
import { useModals } from '@/hooks/useModals';
import { BaseModal } from '@/views/BaseModal';
import { Button } from '@/components/Button';
import { useTranslationClient } from '@/config/i18n/client';
import { useLang } from '@/hooks/useLang';
import SuccessImage from '@/static/img/success.svg';
import ErrorImage from '@/static/img/error.svg';

const SuccesModal = () => {
  const modalId = MODALS.success;
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);
  const { params, modalOpenLogin, modalClose } = useModals(modalId);
  const { title, text, image, isDefaultImage = true, isLoginButton, isError } = params || {}

  const router = useRouter();
  const handleOpenLogin = () => {
    modalClose(modalId);
    modalOpenLogin({
      onSuccess: () => {
        router.push(ROUTES.cabinet);
      },
    });
  };

  return (
    <BaseModal id={modalId} size="sm" type="default" isCenter>
      <div className="modal-success__inner">
        {!!isDefaultImage && !image && (
          <div className="modal-success__image">
            {isError ? (
              <Image src={ErrorImage} alt="error" />
            ) : (
              <Image src={SuccessImage} alt="success" />
            )}
          </div>
        )}
        {!!image && <div className="modal-success__image">{image}</div>}
        {!!title && <div className="modal-success__title">{title}</div>}
        {!!text && <div className="modal-success__text">{text}</div>}
        {!!isLoginButton && (
          <div className="modal-success__auth">
            <Button
              type="primary"
              htmlType="button"
              size="md"
              weight="bold"
              onClick={handleOpenLogin}
            >
              {t('site.btn_login')}
            </Button>
          </div>
        )}
      </div>
    </BaseModal>
  );
};

export { SuccesModal };
