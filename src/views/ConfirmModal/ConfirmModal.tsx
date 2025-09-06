import { useCallback } from 'react';
import { MODALS } from '@/config';
import { useModals } from '@/hooks/useModals';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { BaseModal } from '@/views/BaseModal';
import { useTranslation } from 'react-i18next';
import './confirm-modal.scss';

const ConfirmModal = () => {
  const modalId = MODALS.confirm;
  const { t } = useTranslation();
  const { params, modalClose } = useModals(modalId);
  const {
    title,
    text = '',
    onClose,
    onOk,
    onCancel,
    btnOk = {},
    btnCancel = {},
    isDelete,
    iconName,
    className = '',
  } = params || {};
  const paramsBtnOk = { label: t('confirm.btns.yes'), bg: 'accent', ...btnOk };
  const paramsBtnCancel = {
    label: t('confirm.btns.no'),
    bg: 'gray',
    ...btnCancel,
  };

  if (isDelete) {
    paramsBtnOk.isDanger = true;
    paramsBtnOk.label = btnOk.label || t('confirm.btns.delete');
  }

  const handleClickOk = useCallback(() => {
    onOk && typeof onOk === 'function' && onOk();
  }, [onOk]);

  const handleClickCancel = useCallback(() => {
    onCancel && typeof onCancel === 'function' && onCancel();
    modalClose(modalId);
  }, [onCancel, modalClose, modalId]);

  const header = (
    <>
      {!!iconName && (
        <div className="modal-confirm-icon">
          <Icon name={iconName} />
        </div>
      )}
      <div className="modal-confirm-title">{title}</div>
    </>
  );

  return (
    <BaseModal
      id={modalId}
      title={header}
      size="xs"
      className={`modal-confirm ${className}`}
      closable={true}
      isCenter={true}
      onCancel={onClose}
      footer={
        <div className="modal-confirm-footer">
          {!!btnCancel && (
            <Button size="lg" onClick={handleClickCancel}>
              {paramsBtnCancel.label}
            </Button>
          )}
          {!!btnOk && (
            <Button
              size="md"
              type="primary"
              danger={paramsBtnOk.isDanger}
              onClick={paramsBtnOk?.onClick || handleClickOk}
              icon={
                paramsBtnOk?.iconName && <Icon name={paramsBtnOk?.iconName} />
              }
              className="nowrap"
            >
              {paramsBtnOk.label}
            </Button>
          )}
        </div>
      }
    >
      {text}
    </BaseModal>
  );
};

export { ConfirmModal };
