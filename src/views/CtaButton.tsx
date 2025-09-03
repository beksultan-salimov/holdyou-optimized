'use client'
import { Button } from '@/components/Button';
import { MODALS } from '@/config';
import { useModals } from '@/hooks/useModals';
import React from 'react';

const CtaButton = ({ text, className = '', ...rest}: any) => {
  const { modalOpen } = useModals();
  const handleClick = () => {
    modalOpen(MODALS.callback, { isOpen: true })
  }

  return (
    <Button
      type="primary-old"
      size="sm"
      weight="bold"
      className={`cta-btn  ${className}`}
      onClick={handleClick}
      {...rest}
    >
      {text}
    </Button>
  );
}

export default CtaButton;
