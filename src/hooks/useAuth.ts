// import { IntlContext } from "@/providers/IntlProvider";
// import { useContext, useState, useEffect } from 'react';
// import { useCookies } from "react-cookie";
import { useAppSelector } from './useStore';
import { getUser, getUserLoading } from '@/store/authSlice';

export const useAuth = () => {
  // const { lang } = useContext(IntlContext);
  // return { lang };
  // const [authStatus, setAuthStatus] = useState<'loading' | 'auth' | 'no-auth'>('loading');
  // const [cookies] = useCookies(['access_token']);
  // const { access_token } = cookies || {};
  const user = useAppSelector(getUser);
  const isAuthLoading = useAppSelector(getUserLoading);

  // console.group('useAuth');
  // console.log('authStatus', authStatus);
  // console.log('user', user);
  // console.groupEnd();

  // useEffect(() => {
  //   setAuthStatus(access_token ? 'auth' : 'no-auth');
  // }, [access_token]);

  return { isAuthLoading, user, isAuth: !!user?.is_confirmed };
};
