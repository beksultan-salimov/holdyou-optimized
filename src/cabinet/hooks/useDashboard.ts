'use client'
import { useCallback, useEffect, useMemo } from "react"
import { MODALS } from "@/config"
import { useAppDispatch, useAppSelector } from "@/hooks/useStore"
import { useModals } from "@/hooks/useModals"
import {
  cancelConsultation,
  fetchDashboardSessions,
  fetchNearestConsultations,
  getDashboardSessionsData,
  getDashboardSessionsIsLoading,
  getNearestConsultations,
  getNearestIsLoading,
} from "@/cabinet/store/dashboardSlice"
import { IConsultation } from "@/types"
import { useLang } from "@/hooks/useLang"
import { useTranslationClient } from "@/config/i18n/client"
import { fetchTasks, getTasksAllIds, getTasksByIds, getTasksIsLoading } from "../store/tasksSlice"
import { get, isEmpty } from "@/utils/helpers"

export const useDashboard = () => {
  // const dispatch = useAppDispatch()
  // const nearestConsultations = useAppSelector(getNearestConsultations)
  // useEffect(() => {
  //   dispatch(fetchNearestConsultations())
  // }, [])

  return {}
}

export const useNearestConsultations = () => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['cabinet']);
  const dispatch = useAppDispatch()
  const { modalOpen, modalClose } = useModals()

  const nearestIsLoading = useAppSelector(getNearestIsLoading);
  const nearestConsultationsAll = useAppSelector(getNearestConsultations)
  const nearestConsultations = useMemo(() => {
    return nearestConsultationsAll?.length
      ? nearestConsultationsAll.map(({ id, psychologist, schedule, meeting, agora_credentials, user }: IConsultation) => ({
        id,
        psychologistId: psychologist?.id,
        psychologistFullname: psychologist?.fullname,
        image: psychologist?.photo?.xs,
        date: schedule?.start_datetime,
        meeting,
        agora_credentials,
        user,
        psychologist
      }))
      : []
  }, [nearestConsultationsAll])
  useEffect(() => {
    dispatch(fetchNearestConsultations());
  }, [dispatch]);

  const handleCancelRecord = useCallback(
    (id: number) => {
      modalOpen(MODALS.confirm, {
        title: `${t('cabinet.confirm.records.title')}?`,
        text: t('cabinet.confirm.records.text'),
        iconName: 'CalendarError',
        className: 'confirm-record',
        btnOk: {
          label: t('cabinet.confirm.records.btns.ok'),
          iconName: 'CloseCircle',
          onClick: () => {
            modalClose(MODALS.confirm);
            dispatch(cancelConsultation({ id, t }));
          },
        },
        btnCancel: null,
      });
    },
    [dispatch, modalOpen, modalClose, t]
  );

  return {
    t,
    nearestIsLoading,
    nearestConsultations,
    handleCancelRecord,
  }
}

export const useDashboardSessions = () => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['cabinet']);
  const dispatch = useAppDispatch()

  const isLoading = useAppSelector(getDashboardSessionsIsLoading)
  const sessions = useAppSelector(getDashboardSessionsData)
  useEffect(() => {
    dispatch(fetchDashboardSessions());
  }, [dispatch]);

  return {
    t,
    isLoading,
    sessions,
  }
}

export const useDashboardTasks = () => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['cabinet']);
  const dispatch = useAppDispatch()

  const isLoading = useAppSelector(getTasksIsLoading);
  const tasksAllIdsIds = useAppSelector(getTasksAllIds);
  const tasksByIdsIds = useAppSelector(getTasksByIds);
  const tasks = !isEmpty(tasksAllIdsIds) ? tasksAllIdsIds?.map((id) => {
    const item = get(tasksByIdsIds, [id]);
    return {
      id: item?.id,
      title: item?.title,
      date: item?.consultation?.schedule?.start_datetime
    }
  }) : [];

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return {
    t,
    isLoading,
    tasks,
  }
}
