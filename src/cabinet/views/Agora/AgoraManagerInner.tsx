import React, { createContext, useState, useEffect, useRef, memo, useContext } from 'react';
import {
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
  LocalVideoTrack,
  RemoteUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteUsers,
} from 'agora-rtc-react';
import classNames from 'classnames';
import Fullscreen from 'react-fullscreen-crossbrowser';
import { isEmpty, isFunction } from '@/utils/helpers';
import { Icon } from '@/components/Icon';
import { configType } from './types';
import { useLang } from '@/hooks/useLang';
import { useTranslationClient } from '@/config/i18n/client';

// Define the shape of the Agora context
interface AgoraContextType {
  localCameraTrack: ICameraVideoTrack | null;
  localMicrophoneTrack: IMicrophoneAudioTrack | null;
  children: React.ReactNode;
}

// Create the Agora context
const AgoraContext = createContext<AgoraContextType | null>(null);

export const useAgoraContext = () => {
  const context = useContext(AgoraContext);
  if (!context)
    throw new Error('useAgoraContext must be used within an AgoraProvider');
  return context;
};

// AgoraProvider component to provide the Agora context to its children
const AgoraProvider: React.FC<AgoraContextType> = ({ children, localCameraTrack, localMicrophoneTrack }) => (
  <AgoraContext.Provider
    value={{ localCameraTrack, localMicrophoneTrack, children }}
  >
    {children}
  </AgoraContext.Provider>
);

const AgoraAllManagerInner = memo(function AgoraAllManagerInner({
  config,
  onLeave,
  ownerName,
  clientName,
}: {
  config: configType;
  ownerName: React.ReactNode;
  clientName: React.ReactNode;
  onLeave: () => void;
}) {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['cabinet']);
  const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack();
  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
  const remoteUsers = useRemoteUsers();

  usePublish([localMicrophoneTrack, localCameraTrack]);

  useJoin({
    appid: config.appId,
    channel: config.channelName,
    token: config.rtcToken,
    uid: config.uid,
  });

  useEffect(() => {
    return () => {
      localCameraTrack?.stop();
      localCameraTrack?.close();
      localMicrophoneTrack?.stop();
      localMicrophoneTrack?.close();
      clearTimeout(timer.current);
    };
  }, [localCameraTrack, localMicrophoneTrack]);

  const [isLocalVideo, setIsLocalVideo] = useState(true);
  const handleToggleLocalVideo = () => {
    setIsLocalVideo((value) => !value);
  };

  const delay = 5;
  const timer = useRef(null as any);
  const [isVisiblePanel, setIsVisiblePanel] = useState(true);
  const handleMouseMove = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setIsVisiblePanel(false);
    }, delay * 1000);
    if (!isVisiblePanel) {
      setIsVisiblePanel(true);
    }
  };

  const handleLeave = () => {
    console.log('handleLeave leave');
    localCameraTrack?.stop();
    localCameraTrack?.close();
    localMicrophoneTrack?.stop();
    localMicrophoneTrack?.close();
    clearTimeout(timer.current);

    setTimeout(() => {
      isFunction(onLeave) && onLeave();
    }, 200);
  };

  const [isFullscreen, setIsFullscreen] = useState(false);

  const deviceLoading = isLoadingMic || isLoadingCam;
  if (deviceLoading) return <div>Loading devices...</div>;

  return (
    <AgoraProvider
      localCameraTrack={localCameraTrack}
      localMicrophoneTrack={localMicrophoneTrack}
    >
      <Fullscreen enabled={isFullscreen} onChange={setIsFullscreen}>
        <div className="agora-manager" onMouseMove={handleMouseMove}>
          <div id="videos" className="agora-videos">
            {remoteUsers?.map((remoteUser) => (
              <div
                className="agora-vid agora-vid-remote"
                style={{
                  height: isFullscreen ? '100%' : `calc((100vw - 40px) * 0.75)`,
                  width: isFullscreen ? '100%' : `calc((100vh - 40px) * 1.35)`,
                  maxWidth: isFullscreen ? '100%' : `calc(100vw - 40px)`,
                  maxHeight: isFullscreen ? '100%' : `calc(100vh - 40px)`,
                }}
                key={remoteUser.uid}
              >
                {!remoteUser.hasAudio && (
                  <div className="agora-vid-remote-audio-muted">
                    <Icon name="AudioMuted" />
                  </div>
                )}
                {!!clientName &&
                  !isEmpty(remoteUser) &&
                  !remoteUser.hasVideo && (
                    <div className="agora-vid-label">{clientName}</div>
                  )}
                <RemoteUser
                  user={remoteUser}
                  playVideo={remoteUser?.hasVideo}
                  playAudio={remoteUser?.hasAudio}
                  className={classNames("agora-vid-inner", { 'no-video': !remoteUser?.hasVideo })}
                />
              </div>
            ))}
            {isEmpty(remoteUsers) && (
              <div className="agora-vid-remote-empty">
                {t('cabinet.agora.waitingUser')}
              </div>
            )}
            <LocalVideoComponent
              isLocalVideo={isLocalVideo}
              ownerName={ownerName}
            />
          </div>

          <div
            className={classNames('agora-panel', { active: isVisiblePanel })}
          >
            <MuteAudioComponent />
            <MuteVideoComponent
              handleToggleLocalVideo={handleToggleLocalVideo}
              isLocalVideo={isLocalVideo}
            />
            <button
              className={classNames('agora-panel-btn', {
                active: isFullscreen,
              })}
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? (
                <Icon name="FullScreenExit" />
              ) : (
                <Icon name="FullScreen" />
              )}
            </button>
            <button
              className="agora-panel-btn agora-panel-btn-exit active"
              onClick={handleLeave}
            >
              <Icon name="CallEnd" />
            </button>
          </div>
        </div>
      </Fullscreen>
    </AgoraProvider>
  );
});

const LocalVideoComponent = ({
  isLocalVideo,
  ownerName,
}: {
  isLocalVideo: boolean;
  ownerName: React.ReactNode;
}) => {
  const agoraContext = useAgoraContext();
  const [isMinimify, setIsMinimify] = useState(false);
  const handleClickMinify = () => {
    setIsMinimify((val) => !val);
  };

  return (
    <div
      className={classNames('agora-vid agora-vid-local', {
        'is-minify': isMinimify,
      })}
    >
      {!!ownerName && (!isLocalVideo || !!isMinimify) && (
        <div className="agora-vid-label">{ownerName}</div>
      )}
      <button
        className={classNames('agora-vid-btn agora-vid-btn-minify', {
          'is-minify': isMinimify,
        })}
        onClick={handleClickMinify}
      />
      <LocalVideoTrack
        track={agoraContext?.localCameraTrack}
        play={isLocalVideo}
        className="agora-vid-inner"
      />
    </div>
  );
};

const MuteVideoComponent = ({ handleToggleLocalVideo }:any) => {
  const agoraContext = useAgoraContext();
  const [isMute, setMute] = useState(false);

  const toggleMute = () => {
    agoraContext.localCameraTrack?.setMuted(!isMute);
    setMute((prev) => !prev);
    isFunction(handleToggleLocalVideo) && handleToggleLocalVideo();
  };

  return (
    <button
      className={classNames('agora-panel-btn', { active: isMute })}
      onClick={toggleMute}
    >
      {!isMute ? <Icon name="CameraVisible" /> : <Icon name="CameraMuted" />}
    </button>
  );
};

const MuteAudioComponent = () => {
  const agoraContext = useAgoraContext();
  const [isMute, setMute] = useState(false);

  const toggleMute = () => {
    agoraContext.localMicrophoneTrack?.setMuted(!isMute);
    setMute((prev) => !prev);
  };

  return (
    <button
      className={classNames('agora-panel-btn', { active: isMute })}
      onClick={toggleMute}
    >
      {isMute ? <Icon name="AudioMuted" /> : <Icon name="Audio" />}
    </button>
  );
};

export default AgoraAllManagerInner;
