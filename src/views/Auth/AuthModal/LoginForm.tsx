'use client';
import {type FormEventHandler, useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import {Field, Form} from 'react-final-form';
import {sendGTMEvent} from '@next/third-parties/google';
import {MODALS} from '@/config';
import {clientFetch} from '@/utils/service';
import {useModals} from '@/hooks/useModals';
import {FormInputPassword, FormPhoneInput} from '@/components/BaseForm';
import {Button} from '@/components/Button';
import {get, isFunction, setAuthTokens, showFormErrors} from '@/utils/helpers';
import {useAppDispatch} from '@/hooks/useStore';
import {fetchUser} from '@/store/authSlice';
import {composeValidators, validatePhone, validateRequired,} from '@/utils/validate';

const LoginForm = ({t, onSuccess}: any) => {
    const {modalOpen, modalClose} = useModals();
    const handleClickForgotPassword = () => {
        modalClose(MODALS.auth);
        modalOpen(MODALS.forgotPassword);
    };
    const dispatch = useAppDispatch();
    const [cookies, setCookie] = useCookies();
    const [isPsychologistPage, setIsPsychologistPage] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const pathname = window.location.pathname;

            const match = pathname.match(/^\/psychologists\/([^\/]+)$/);
            if (match) {
                setIsPsychologistPage(true);
            }
        }
    }, []);

    function getClientIdFromCookie(): string | null {
        if (typeof document === 'undefined') return null; // SSR safe
        const cookies = document.cookie.split(';').map(c => c.trim());
        const gaCookie = cookies.find(c => c.startsWith('_ga='));
        if (!gaCookie) return null;

        const value = gaCookie.split('=')[1];
        const parts = value.split('.');
        if (parts.length >= 4) {
            return parts[2] + '.' + parts[3];
        }
        return null;
    }

    function getUTM(): Record<string, string | null> {
        if (typeof window === 'undefined') return {};
        const urlParams = new URLSearchParams(window.location.search);

        const utms: Record<string, string | null> = {
            utm_source: urlParams.get('utm_source'),
            utm_medium: urlParams.get('utm_medium'),
            utm_campaign: urlParams.get('utm_campaign'),
            utm_term: urlParams.get('utm_term'),
            utm_content: urlParams.get('utm_content'),
        };

        Object.keys(utms).forEach(key => {
            if (!utms[key]) {
                const cookieMatch = document.cookie
                    .split(';')
                    .map(c => c.trim())
                    .find(c => c.startsWith(`${key}=`));
                if (cookieMatch) {
                    utms[key] = cookieMatch.split('=')[1];
                }
            }
        });

        return utms;
    }

    const onSubmit: FormEventHandler<HTMLFormElement> = async (formData) => {
        try {
            const res: any = await clientFetch('/users/token', {
                method: 'POST',
                body: JSON.stringify(formData),
            });

            if (res?.access) {
                setAuthTokens({
                    access: res?.access,
                    refresh: res?.refresh,
                    setCookie,
                });

                const user: any = await dispatch(fetchUser());
                modalClose(MODALS.auth);
                sendGTMEvent({event: 'login'});

                if (!!user?.payload?.id) {
                    const clientId = getClientIdFromCookie();
                    const utms = getUTM();

                    try {
                        await clientFetch('/crm/contact', {
                            method: 'POST',
                            body: JSON.stringify({
                                name: user.payload.fullname,
                                email: user.payload.email,
                                phone: user.payload.phone,
                                client_id: clientId,
                                ...utms
                            }),
                            headers: {
                                Authorization: `Bearer ${res.access}`,
                            },
                        });
                    } catch (crmErr) {
                        console.error('CRM sync error:', crmErr);
                    }

                    // if (isFunction(onSuccess)) {
                    //     onSuccess(isPsychologistPage);
                    // }
                }
            }
        } catch (error: any) {
            const normalizedError = {...(error || {})};
            if (
                get(normalizedError, ['errors', 'detail'], []).includes(
                    'Incorrect password',
                )
            ) {
                normalizedError.errors.password = [
                    t('site.login_form.password_incorrect'),
                ];
                normalizedError.errors.detail = undefined;
            }
            if (
                get(normalizedError, ['errors', 'detail'], []).includes(
                    'No active account found with the given credentials',
                )
            ) {
                normalizedError.errors.username = [
                    t('site.login_form.username_no_found'),
                ];
                normalizedError.errors.detail = undefined;
            }
            return showFormErrors({error, t});
        }
    };

    // const isPassChanged = localStorage.getItem('pass_changed');
    const [isVisiblePrelogin, setVisiblePrelogin] = useState(false); //isPassChanged

    return (
        <>
            {isVisiblePrelogin && (
                <div className="prelogin">
                    <div className="prelogin__body">
                        <div
                            className="prelogin__text"
                            dangerouslySetInnerHTML={{__html: t('site.prelogin_text')}}
                        />
                        <p className="align-right">HoldYou</p>
                    </div>
                    <div className="prelogin__footer">
                        <Button
                            type="primary"
                            htmlType="button"
                            size="md"
                            weight="bold"
                            isFull
                            onClick={() => setVisiblePrelogin(false)}
                        >
                            {t('site.understandably')}
                        </Button>
                    </div>
                </div>
            )}
            {!isVisiblePrelogin && (
                <Form
                    onSubmit={onSubmit}
                    render={({
                                 handleSubmit,
                                 submitting,
                                 submitError,
                                 modifiedSinceLastSubmit,
                             }: any) => (
                        <form onSubmit={handleSubmit} className="modal-auth-form">
                            <Field
                                name="username"
                                placeholder={t('site.login')}
                                component={FormPhoneInput}
                                size="lg"
                                validate={composeValidators(validateRequired, validatePhone)}
                            />
                            <Field
                                name="password"
                                placeholder={t('site.password')}
                                component={FormInputPassword}
                                size="lg"
                                validate={validateRequired}
                            />

                            <div className="form-prefooter">
                <span className="forgot-password">
                  <Button type="link" onClick={handleClickForgotPassword}>
                    {t('site.forgot_password')}
                  </Button>
                </span>
                            </div>
                            <div className="form-footer">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="md"
                                    weight="bold"
                                    disabled={submitting}
                                    loading={submitting}
                                    isFull
                                >
                                    {t('site.auth.submit_btns.login')}
                                </Button>
                            </div>
                            {submitError && !modifiedSinceLastSubmit && (
                                <div className="form-error">{submitError}</div>
                            )}
                        </form>
                    )}
                />
            )}
        </>
    );
};

export {LoginForm};
