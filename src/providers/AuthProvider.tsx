'use client'
import { useAppDispatch } from '@/hooks/useStore';
import { fetchUser } from '@/store/authSlice';
import { createContext, useEffect } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return <AuthContext.Provider value={''}>{children}</AuthContext.Provider>
}