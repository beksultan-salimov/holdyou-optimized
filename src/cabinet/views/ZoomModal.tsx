'use client'
import { useState, useEffect, useCallback } from "react"
import clsx from "clsx"
import ZoomMtgEmbedded from "@zoomus/websdk/embedded"
import { MODALS } from "@/config"
import { useTranslationClient } from "@/config/i18n/client"
import { useLang } from "@/hooks/useLang"
import { useModals } from "@/hooks/useModals"
import { useAppDispatch } from "@/hooks/useStore"
import { BaseModal } from "@/views/BaseModal"
import { Button } from "@/components/Button"
import { fetchDashboardSessions, fetchNearestConsultations } from "../store/dashboardSlice"
import { fetchBalance } from "../store/balanceSlice"

/**
 * @deprecated ZoomModal should not be used
 */
const ZoomModal = () => {
  const modalId = MODALS.zoom
  const { params, modalClose, modalOpen } = useModals(modalId);
  const {
    isOpen,
    signature,
    sdk_key: sdkKey,
    meeting_id: meetingNumber,
    password,
    user,
    psychologist,
    psychologistId,
    psychologistFullname,
    consultationId,
  } = params || {};
  const userName = user?.fullname || 'User';
  const client = ZoomMtgEmbedded.createClient();
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['cabinet']);
  const [isVisibleBtn, setIsVisibleBtn] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const dispatch = useAppDispatch();

  const handleClose = useCallback(async (e?: any) => {
    if (!!client) {
      await client.leaveMeeting();
    }
    if (!!ZoomMtgEmbedded) {
      ZoomMtgEmbedded?.destroyClient();
    }
    setIsVisibleBtn(true);
    setIsConnected(false);
    modalClose(modalId);
  }, [client, modalClose, modalId]);

  const connectionChange = useCallback(
    (payload: any) => {
      if (payload?.state === 'Closed') {
        modalOpen(MODALS.addReviews, {
          isOpen: true,
          initialValues: {
            psychologist: psychologistId,
            consultation: consultationId,
          },
          isVisiblePsychologistField: false,
          currentPsychologist: psychologist,
          onOpen: () => {
            dispatch(fetchBalance());
            dispatch(fetchNearestConsultations());
            dispatch(fetchDashboardSessions());
          }
        });
        handleClose();
      }
      if (payload?.state === 'Connected') {
        setIsConnected(true);
      }
    },
    [handleClose, modalOpen, psychologistId, consultationId, psychologist, dispatch]
  );

  useEffect(() => {
    if (isOpen && sdkKey) {
      setTimeout(() => {
        const meetingSDKElement = document.getElementById('meetingSDKElement');
        !!client &&
          client!.init({
            // debug: true,
            zoomAppRoot: meetingSDKElement!,
            language: 'ru-RU',
            customize: {
              video: {
                viewSizes: {
                  default: {
                    height: 700,
                    width: 900,
                  },
                },
              },
            },
          });
        client.on('connection-change', connectionChange);
      }, 100);
    }
  }, [isOpen, connectionChange, client, sdkKey]);

  const joinMeeting = () => {
    if (!sdkKey || !client) return
    setIsVisibleBtn(false)
    client.join({
      signature: signature,
      sdkKey: sdkKey,
      meetingNumber: meetingNumber,
      password: password,
      userName: userName,
      success: (success: any) => {
        // console.log("--> Success Joining zoom", success)
      },
      error: (error: any) => {
        console.log("--> Error Joining zoom", error)
      },
    })
  }

  return (
    <BaseModal
      id={modalId}
      size="full"
      className={clsx("wrap-modal-zoom", { 'is-connected': isConnected })}
      onCancel={handleClose}
      keyboard={false}
    >
      <div id="meetingSDKElement" className="zoom-container"></div>
      {isVisibleBtn && !!sdkKey && (
        <Button onClick={joinMeeting} type="primary" className="btn-join-zoom">
          {t('cabinet.join_meeting')}
        </Button>
      )}
    </BaseModal>
  );
}

export default ZoomModal
