'use client'
import { CALLBACK_SUBJECTS, MODALS } from '@/config';
import { useModals } from '@/hooks/useModals';
import React from 'react';

const PBOrderButton = (props: any) => {
  const { text = "Записатись" , className = '', ...rest } = props || {}
  const { modalOpen } = useModals();
  const handleClick = () => {
    modalOpen(MODALS.callback, {
      isOpen: true,
      initialValues: { subjects: CALLBACK_SUBJECTS.callme },
    });
  }

  return (
    <div className="order-btn-wrapper" {...rest}>
      <button
        className={`order-btn ${className}`}
        onClick={handleClick}
        role="button"
      >
        {text}
      </button>
    </div>
  );
}

export default PBOrderButton;
