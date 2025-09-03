'use client';
import React, { useCallback } from 'react';
import { MODALS } from '@/config';
import { useModals } from '@/hooks/useModals';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import clsx from 'clsx';

interface IProps {
  desktopSrc: string;
  mobileSrc?: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}
const PsychologistBtnVideo = ({ label, className, icon, desktopSrc, mobileSrc }: IProps) => {
  const { modalOpen } = useModals();
  const handleClickOpenVideo = useCallback(() => {
    modalOpen(MODALS.video, {
      isOpen: true,
      desktopSrc: desktopSrc,
      mobileSrc: mobileSrc,
    });
  }, [modalOpen, desktopSrc, mobileSrc]);

  return (
    <Button
      type="white"
      size="xs"
      icon={icon ?? <Icon name="Play" />}
      className={clsx('btn-video', { 'btn-video--simple': !label }, className)}
      onClick={handleClickOpenVideo}
      aria-label="Play"
    >
      {label}
    </Button>
  );
};

export { PsychologistBtnVideo };
