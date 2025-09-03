'use client';
import { useEffect, useRef, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import clsx from 'clsx';
import { useTranslationClient } from '@/config/i18n/client';
import { useLang } from '@/hooks/useLang';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';

interface IProps {
  children: React.ReactNode;
  minHeight?: number;
  duration?: number;
  btnShowText?: string;
  btnHideText?: string;
  isVisible?: boolean;
  isCheckCanCollapse?: boolean;
}

const CollapseText = ({
  minHeight = 0,
  children,
  btnShowText: _btnShowText,
  btnHideText: _btnHideText,
  duration = 400,
  isVisible = true,
  isCheckCanCollapse = true,
}: IProps) => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);
  const [isFull, setIsFull] = useState(false);
  const [canCollpase, setCanCollapse] = useState(true);
  const btnShowText = _btnShowText || t('site.btn_collpase_show');
  const btnHideText = _btnHideText || t('site.btn_collpase_hide')
  const handleToggle = () => {
    setIsFull(prev => !prev);
  }

  const refComponent: any = useRef();
  useEffect(() => {
    if (isCheckCanCollapse) {
      const refHeight = !!refComponent.current ? refComponent.current!.getBoundingClientRect()?.height : 0
      if (refHeight <= minHeight) {
        setCanCollapse(false);
      } else {
        setCanCollapse(true);
      }
    }
  }, [refComponent, isVisible, minHeight, isCheckCanCollapse]);

  return (
    <div className="collapse-text">
      <AnimateHeight
        duration={duration}
        height={isFull || !canCollpase ? 'auto' : minHeight}
        contentRef={refComponent}
      >
        {children}
      </AnimateHeight>
      {canCollpase && (
        <>
          <Button
            type="link"
            size="sm"
            className={clsx('collapse-text-btn', { 'is-show': isFull })}
            iconRight={<Icon name="DashRightOutline" />}
            onClick={handleToggle}
          >
            {isFull ? btnHideText : btnShowText}
          </Button>
        </>
      )}
    </div>
  );
};

export { CollapseText };
