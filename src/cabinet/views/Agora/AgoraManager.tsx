'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AgoraRTC, { AgoraRTCProvider, useRTCClient } from 'agora-rtc-react';
import { useAppDispatch } from '@/hooks/useStore';
import { clearAgora } from '@/cabinet/store/agoraSlice';
import AgoraAllManagerInner from './AgoraManagerInner';
import { MODALS } from '@/config';
import { useModals } from '@/hooks/useModals';
import { fetchBalance } from '@/cabinet/store/balanceSlice';
import { fetchDashboardSessions, fetchNearestConsultations } from '@/cabinet/store/dashboardSlice';
import './agora.scss';


const AgoraAllManager = ({ config, redirectUrl, clientUser, ownerUser, psychologist, consultationId }: any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  AgoraRTC.setLogLevel(2);

  const client = AgoraRTC.createClient({
    codec: 'vp8',
    mode: 'rtc',
  });
  const agoraEngine = useRTCClient(client);

  useEffect(() => {
    return () => {
      !!agoraEngine && agoraEngine?.leave();
      !!client && client?.leave();
    };
  }, [agoraEngine, client]);

  const { modalOpen } = useModals();
  const handleLeaveClick = async () => {
    !!agoraEngine && agoraEngine?.leave();
    !!client && client?.leave();
    setTimeout(() => {
      dispatch(clearAgora());
      modalOpen(MODALS.addReviews, {
        isOpen: true,
        initialValues: {
          psychologist: psychologist?.id,
          consultation: consultationId,
        },
        isVisiblePsychologistField: false,
        currentPsychologist: psychologist,
        onOpen: () => {
          dispatch(fetchBalance());
          dispatch(fetchNearestConsultations());
          dispatch(fetchDashboardSessions());
        },
      });
      router.push(redirectUrl);
    }, 250);
  };

  return (
    <div className="agora-page-inner">
      <AgoraRTCProvider client={agoraEngine}>
        <AgoraAllManagerInner
          config={config}
          onLeave={handleLeaveClick}
          ownerName={ownerUser?.short_name}
          clientName={clientUser?.short_name}
        />
      </AgoraRTCProvider>
    </div>
  );
};

export default AgoraAllManager;
