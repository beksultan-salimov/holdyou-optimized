'use client';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { MODALS } from '@/config';
import { useTranslationClient } from '@/config/i18n/client';
import { useModals } from '@/hooks/useModals';
import { useLang } from '@/hooks/useLang';
import { BaseModal } from '@/views/BaseModal';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import './authModal.scss';

const AuthModal = () => {
  const modalId = MODALS.auth;
  const { params } = useModals(modalId);
  const { isOpen = true, type = 'login', onSuccess } = params || {};
  const authTypes = ['login', 'register'] as const;
  type AuthType = (typeof authTypes)[number];
  const [activeTab, setActiveTab] = useState<AuthType>(type);
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);

  useEffect(() => {
    setActiveTab(type);
  }, [type])

  const HeaderModel = (
    <div className="auth-nav">
      {authTypes?.map((item: AuthType) => (
        <a
          key={item}
          className={clsx('auth-nav-item', { active: activeTab === item })}
          onClick={() => setActiveTab(item)}
        >
          {t(`site.auth.types.${item}`)}
        </a>
      ))}
    </div>
  );

  return (
    <BaseModal
      id={modalId}
      title={HeaderModel}
      size="xs"
      type="custom"
      isCenter
    >
      {isOpen && (
        <>
          {activeTab === 'login' && (
            <div className="modal-auth-login">
              <LoginForm t={t} onSuccess={onSuccess} />
            </div>
          )}
          {activeTab === 'register' && (
            <div className="modal-auth-register">
              <RegisterForm t={t} onSuccess={onSuccess} />
            </div>
          )}
        </>
      )}
    </BaseModal>
  );
};

export { AuthModal };
