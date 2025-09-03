'use client';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import './video.scss';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { useLang } from '@/hooks/useLang';
import { useTranslationClient } from '@/config/i18n/client';
import { ResponsiveVideo } from '../ResponsiveVideo';

interface IProps {
  mobileSrc?: string;
  desktopSrc?: string;
  className?: string;
  isBtnOverlay?: boolean;
}

const Video = ({ className, mobileSrc, desktopSrc, isBtnOverlay }: IProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStart, setIsStart] = useState(false);
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);

  const handleClickStart = () => {
    setIsStart(true);
    if (videoRef?.current) {
      videoRef.current?.play();
    }
  };

  if (!mobileSrc && !desktopSrc) return null;
  return (
    <div className={clsx('video-box', className, { 'is-start': isStart })}>
      {/* <video className="video-box__video" controls={isStart} ref={videoRef}>
        <source src={src} key={src} />
      </video> */}
      <ResponsiveVideo
        mobileSrc={mobileSrc!}
        desktopSrc={desktopSrc!}
        controls={isStart}
        ref={videoRef}
        className="video-box__video"
      />
      {!!isBtnOverlay && (
        <div className="video-box__overlay" onClick={handleClickStart}>
          <Button type="white" size="xs" shadow icon={<Icon name="Play" />}>
            {t('site.btn_play_video')}
          </Button>
        </div>
      )}
    </div>
  );
};

export { Video };
