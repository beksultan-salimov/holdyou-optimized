'use client';
import { useEffect } from 'react';
import { Slide, ToastContainer } from 'react-toastify';
import { AuthModal } from './Auth/AuthModal';
import { ForgotPasswordModal } from './Auth/ForgotPasswordModal';
import { RegistrationConfirmSmsModal } from './Auth/RegistrationConfirmSmsModal';
import { CallbackModal } from './CallbackModal';
import { SuccesModal } from './SuccesModal';
import { VideoModal } from './VideoModal';
import { GalleryModal } from './GalleryModal';
import { AppStickyButtons } from './AppStickyButtons';

const GlobalComponents = ({ lang }: any) => {
  useEffect(() => {
    fetch('/img/sprite.svg')
      .then((r) => r.text())
      .then((sprite) => {
        document!.querySelector('#ajax-sprite')!.innerHTML = sprite;
      });
  }, []);

  useEffect(() => {
    fetch('/img/sprite-mask.svg')
      .then((r) => r.text())
      .then((sprite) => {
        document!.querySelector('#ajax-sprite-mask')!.innerHTML = sprite;
      });
  }, []);

  return (
    <>
      <SuccesModal />
      <AuthModal />
      <ForgotPasswordModal />
      <RegistrationConfirmSmsModal />
      <CallbackModal />
      <VideoModal />
      <GalleryModal />
      {/*<AppStickyButtons lang={lang} />*/}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </>
  );
};

export default GlobalComponents;
