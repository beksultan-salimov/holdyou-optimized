'use client';
import { useRef } from 'react';
import { MODALS } from '@/config';
import { useTranslationClient } from '@/config/i18n/client';
import { useModals } from '@/hooks/useModals';
import { useLang } from '@/hooks/useLang';
import { Text } from '@/components/Text';
import { BaseModal } from '@/views/BaseModal';
import { ResponsiveVideo } from '@/components/ResponsiveVideo';

const VideoModal = () => {
  const modalId = MODALS.video;
  const videoRef = useRef(null);
  const { params } = useModals(modalId);
  const { isOpen, desktopSrc, mobileSrc } = params || {};
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);

  return (
    <BaseModal id={modalId} size="xlg" type="video" isCenter>
      {isOpen &&
        ((!!desktopSrc || !!mobileSrc) ? (
          // <video controls className="video-player" ref={videoRef}>
          //   <source src={videoURL} />
          //   {t('site.browser_not_support_video')}
          // </video>
          <ResponsiveVideo
            mobileSrc={mobileSrc}
            desktopSrc={desktopSrc}
            controls={true}
            ref={videoRef}
            className="video-player"
          />
        ) : (
          <div className="video-player-empty">
            <Text>{t('site.video_not_found')}</Text>
          </div>
        ))}
    </BaseModal>
  );
};

export { VideoModal };
