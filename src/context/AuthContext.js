'use client';

import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {isFunction, jwtDecode, setAuthTokens} from "@/utils/helpers";
import {useCookies} from "react-cookie";
import {fetchUser} from '@/store/authSlice';
import {useAppDispatch} from "@/hooks/useStore";
import {sendGTMEvent} from "@next/third-parties/google";
import {useModals} from "@/hooks/useModals";
import {MODALS} from "@/config";
import {clientFetch} from "@/utils/service";
import Cookies from "universal-cookie";

const AuthContext = createContext();

const api = axios.create({
    baseURL: 'https://holdyou.net/api',
    withCredentials: true,
});

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const {modalClose, params} = useModals(MODALS.auth);
    const { onSuccess } = params || {};
    const dispatch = useAppDispatch();

    const loginWithGoogle = async (googleResponse) => {
        try {
            const idToken = googleResponse.credential;

            const res = await clientFetch('/google', {
                method: 'POST',
                body: JSON.stringify({ id_token: idToken }),
            });
            const cookies = new Cookies()
            const jwtDecoded = jwtDecode(res.access);
            const cookieExpiresDate = new Date(jwtDecoded.exp * 1000);
            cookies.set('access_token', res.access, {
                path: '/',
                expires: cookieExpiresDate,
            });
            cookies.set('refresh_token', res.refresh, {
                path: '/',
                expires: cookieExpiresDate,
            });

            const user = await dispatch(fetchUser());
            modalClose(MODALS.auth);
            sendGTMEvent({event: 'login'});
            if (!!user?.payload?.id) {
                if (isFunction(onSuccess)) {
                    onSuccess(user);
                }
            }

        } catch (error) {
            console.error("Google login failed:", error);
            setUser(null);
        }
    };


    const logout = async () => {
        try {
            await api.post('/auth/logout/');
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <AuthContext.Provider value={{user, loading, loginWithGoogle, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export {AuthProvider, useAuth};