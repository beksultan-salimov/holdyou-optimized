'use client'; // This component has event handlers, so it must be a client component.

import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '@/context/AuthContext';

const GoogleLoginButton = () => {
    const { loginWithGoogle } = useAuth();

    const handleLoginSuccess = (credentialResponse) => {
        loginWithGoogle(credentialResponse);
    };

    const handleLoginError = () => {
        console.log('Login Failed');
    };

    return (
        <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
            useOneTap
        />
    );
};

export default GoogleLoginButton;