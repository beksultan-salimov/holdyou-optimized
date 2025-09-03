'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/config';
import { useAuth } from '@/hooks/useAuth';
import { useModals } from '@/hooks/useModals';
import { LockIcon } from '@/components/Icons/LockIcon';
import { Link } from '@/components/Link';

const BtnAuth = ({ s, t, setOpenMenu }: any) => {
  const { isAuthLoading, isAuth } = useAuth();
  // const [hasAccessCookie, setAccessCookie] = useState<boolean>(false);
  // const _isAuth = isAuthLoading ? hasAccessCookie : isAuth;

  // useEffect(() => {
  //   if (typeof document !== 'undefined') {
  //     const allCookies = document.cookie;
  //     const accessToken = allCookies
  //       .split('; ')
  //       .find((row) => row.startsWith('access_token='))
  //       ?.split('=')[1];
  //     setAccessCookie(!!accessToken);
  //   }
  // }, []);

  const router = useRouter();
  const { modalOpenLogin } = useModals();

  const handleOpenLogin = () => {
    modalOpenLogin({
      onSuccess: (isPsychologistPage?: boolean) => {
        if (!isPsychologistPage) router.push(ROUTES.cabinet);
        setOpenMenu(false);
      },
    });
  };

  return (
    <div className={s.auth}>
      <LockIcon color="#FFF" className={s.btn_auth_img} />
      <div className={s.auth_inner}>
        {isAuth ? (
          <Link className={`${s.btn_auth} ${s.btn_auth_cabinet}`} href={ROUTES.cabinet}>
            {t('site.header.personal_area')}
          </Link>
        ) : (
          <button className={s.btn_auth} onClick={handleOpenLogin}>
            {t('site.header.login_register')}
          </button>
        )}
      </div>
    </div>
  );
};

export default BtnAuth;
