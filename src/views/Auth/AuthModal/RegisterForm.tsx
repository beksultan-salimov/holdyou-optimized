'use client';
import {Field, Form} from 'react-final-form';
import {useCookies} from 'react-cookie';
import {sendGTMEvent} from '@next/third-parties/google';
import {clientFetch} from '@/utils/service';
import {FormCheckbox, FormInput, FormInputPassword, FormPhoneInput} from '@/components/BaseForm';
import {Button} from '@/components/Button';
import {ConfirmAgeText} from '@/views/ConfirmAgeText';
import {composeValidators, validatePhone, validateRequired} from '@/utils/validate';
import {MODALS} from '@/config';
import {useModals} from '@/hooks/useModals';
import {get, isFunction, setAuthTokens, showFormErrors} from '@/utils/helpers';
import {useAppDispatch} from '@/hooks/useStore';
import {useEffect, useState} from "react";

// import { fetchUser } from '@/store/authSlice';

interface IRegisterSubmit {
    formData: any;
    t: any;
    modalOpen: any;
    modalClose: any;
    setCookie: any;
    dispatch: any;
    onSuccess: any;
}

const RegisterForm = ({t, onSuccess}: any) => {
    const dispatch = useAppDispatch();
    const {modalOpen, modalClose} = useModals();
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

    const registerSubmit = async ({formData, t, modalOpen, modalClose, setCookie, onSuccess}: IRegisterSubmit) => {
        const username = !!formData?.username ? '+' + formData?.username : undefined;
        const normalizedFormData = {...formData, username};

        try {
            const res: any = await clientFetch(`/users/registrations`, {
                method: 'POST',
                body: JSON.stringify(normalizedFormData),
            });
            // console.log('registerSubmit res', res);
            if (res?.access) {
                modalClose(MODALS.auth);
                modalOpen(MODALS.registerConfirm, {isOpen: true});
                setAuthTokens({access: res?.access, refresh: res?.refresh, setCookie});
                sendGTMEvent({event: 'registration'})
                // setTimeout(() => {
                //   dispatch(fetchUser());
                // }, 100);
                if (isFunction(onSuccess)) {
                    onSuccess(isPsychologistPage);
                }
            }
        } catch (error: any) {
            const normalizedError = {...(error || {})}
            if (get(normalizedError, ['errors', 'username', 0]) === 'This username is already in use.') {
                normalizedError.errors.username[0] = t('site.register_form.username_used');
            }
            return showFormErrors({error, t});
        }
    };

    const handleSubmitForm = async (formData: any) => {
        return await registerSubmit({formData, t, modalOpen, modalClose, setCookie, dispatch, onSuccess});
    };

    return (
        <Form
            onSubmit={handleSubmitForm}
            render={({
                         handleSubmit,
                         submitting,
                         submitError,
                         modifiedSinceLastSubmit,
                     }: any) => (
                <form onSubmit={handleSubmit} className="modal-auth-form">
                    <Field
                        name="fullname"
                        placeholder={t('site.name')}
                        component={FormInput}
                        size="lg"
                        validate={validateRequired}
                    />
                    <Field
                        name="username"
                        placeholder={t('site.phone')}
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
                    <Field
                        name="confirm"
                        component={FormCheckbox}
                        size="lg"
                        className="field-age-confirm"
                        validate={validateRequired}
                        type="checkbox"
                    >
                        <ConfirmAgeText/>
                    </Field>
                    <div className="form-footer">
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="md"
                            weight="bold"
                            disabled={submitting}
                        >
                            {t('site.auth.submit_btns.register')}
                        </Button>
                    </div>
                    {submitError && !modifiedSinceLastSubmit && (
                        <div className="form-error">{submitError}</div>
                    )}
                </form>
            )}
        />
    );
};

export {RegisterForm};
