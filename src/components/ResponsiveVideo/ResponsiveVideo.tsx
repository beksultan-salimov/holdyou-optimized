'use client';
import { forwardRef, VideoHTMLAttributes } from 'react';
import { useResponsiveVideoSrc } from './useResponsiveVideoSrc';

type ResponsiveVideoProps = {
  mobileSrc: string;
  desktopSrc: string;
  type?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  className?: string;
  controls?: any;
} & Omit<VideoHTMLAttributes<HTMLVideoElement>, 'src'>;;

const ResponsiveVideo = forwardRef<HTMLVideoElement, ResponsiveVideoProps>(
  (
    {
      mobileSrc,
      desktopSrc,
      type = 'video/mp4',
      autoPlay,
      muted,
      loop,
      playsInline,
      className,
      controls,
      ...rest
    },
    ref
  ) => {
    const src = useResponsiveVideoSrc(mobileSrc, desktopSrc);

    if (!src) return null;

    return (
      <video
        ref={ref}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        controls={controls}
        className={className}
        {...rest}
      >
        <source src={src} type={type} key={src} />
        Your browser does not support the video tag.
      </video>
    );
  }
);

ResponsiveVideo.displayName = 'ResponsiveVideo';
export { ResponsiveVideo };
