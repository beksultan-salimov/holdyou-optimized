'use client';
import React from 'react';
import { CALLBACK_SUBJECTS, MODALS } from '@/config';
import { useModals } from '@/hooks/useModals';
import { Button } from '@/components/Button';

const ButtonCallback = (props: any) => {
  const { children, ...rest } = props || {};
  const { modalOpen } = useModals();
  const handleClick = () => {
    modalOpen(MODALS.callback, {
      isOpen: true,
      initialValues: { subjects: CALLBACK_SUBJECTS.callme },
    });
  };

  return (
    <Button
      type="primary-old"
      size="sm"
      weight="bold"
      onClick={handleClick}
      role="button"
      {...rest}
    >
      {children}
    </Button>
  );
};

export { ButtonCallback };