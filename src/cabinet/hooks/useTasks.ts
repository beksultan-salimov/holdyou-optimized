'use client'
import { useEffect, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/useStore"
import { addTaskFile, fetchTask, fetchTasks, getTaskById, getTasksAllIds, getTasksCount, getTasksIsLoading, getTasksSize, removeTaskFile } from "@/cabinet/store/tasksSlice"
import { usePagination } from "@/hooks/usePagination"
import { clientFetch } from "@/utils/service"
import { notification } from "antd"
import { get, getDomain, getFileName } from "@/utils/helpers"
import { useModals } from "@/hooks/useModals"
import { useLang } from "@/hooks/useLang"
import { useTranslationClient } from "@/config/i18n/client"

export const useTasks = () => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['cabinet']);

  const count = useAppSelector(getTasksCount)
  const size = useAppSelector(getTasksSize);
  const isLoading = useAppSelector(getTasksIsLoading)
  const tasksIds = useAppSelector(getTasksAllIds)
  const { pagination } = usePagination({
    count,
    size,
    action: fetchTasks,
    info: t("cabinet.tasks.pagination"),
  })

  return {
    t,
    tasksIds,
    isLoading,
    pagination,
  }
}

export const useTask = (taskId: number) => {
  const item = useAppSelector((state) => getTaskById(state, taskId))
  if (!item) return {}

  const {
    title,
    psychologist,
    consultation,
    task: text,
    user: userId,
    status,
    files = [],
    note,
  } = item
  const psychologistImage = psychologist?.photo?.xs
  const psychologistFullName = psychologist?.fullname
  const consultationDate = consultation?.schedule?.start_datetime

  return {
    id: taskId,
    title,
    text,
    psychologistImage,
    psychologistFullName,
    consultationDate,
    userId,
    status,
    files,
    note,
  }
}


export const useTaskModal = (modalId: string) => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['cabinet']);
  const dispatch = useAppDispatch()

  const { params } = useModals(modalId)
  const { taskId, isOpen } = params || {}
  const {
    id,
    title,
    text,
    userId,
    status,
    files = [],
    note,
    psychologistImage,
    psychologistFullName,
    consultationDate,
  } = useTask(taskId)
  const initialValues = { status, note }
  const defaultFiles = useMemo(
    () =>
      files?.map(({ id, file }: any) => ({
        uid: id,
        name: getFileName(file),
        status: 'done',
        url: getDomain() + file,
        response: {
          id,
          src: getDomain() + file,
        },
      })),
    [files]
  );

  // console.log('defaultFiles', defaultFiles);

  const uploadTaskFiles = async ({ event, task, user }: any) => {
    const inputFiles = event.file
    const formData = new FormData()
    formData.append("file", inputFiles)
    formData.append("task", task)
    formData.append("user", user)

    try {
      const response: any = await clientFetch("/tasks-file", {
        method: "POST",
        body: formData,
        fileUpload: true,
      })
      if (!response?.id) {
        event.onError("error")
        return false
      }
      dispatch(addTaskFile({ taskId, file: response }))
      event.onSuccess({ src: response?.file, id: response?.id })
    } catch (error: any) {
      if (error?.errors) {
        notification.error({
          message: get(error, ["errors", "details"], t('cabinet.default_error_message')),
        })
      }
      event.onError("error")
    }
  }

  const handleUploadFiles = async (event: any) =>
    uploadTaskFiles({ event, task: id, user: userId })

  const handleRemoveFile = async (file: any) => {
    const fileId = file?.response?.id
    if (!fileId) return false
    try {
      return await clientFetch(`/tasks-file/${fileId}`, { method: "DELETE" }).then(res => {
        dispatch(removeTaskFile({ taskId, fileId }))
        return res
      })
    } catch (error) {
      notification.error({
        message: get(
          error,
          ['errors', 'details'],
          t('cabinet.default_error_message')
        ),
      });
    }
  }

  useEffect(() => {
    if (isOpen && id) {
      dispatch(fetchTask(id))
    }
  }, [isOpen, id])

  return {
    id,
    title,
    text,
    psychologistImage,
    psychologistFullName,
    consultationDate,
    userId,
    files,
    status,

    initialValues,
    defaultFiles,
    isOpen,
    handleUploadFiles,
    handleRemoveFile,
    t,
    dispatch,
  }
}