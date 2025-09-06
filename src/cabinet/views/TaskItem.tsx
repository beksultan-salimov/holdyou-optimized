'use client'
import { useCallback } from "react"
import { getDate } from "@/utils/helpers"
import { Button } from '@/components/Button';
import { Icon } from "@/components/Icon"
import { InfoItem } from "@/components/InfoItem"
import { MODALS } from "@/config"
import { useModals } from "@/hooks/useModals"
import { useTask } from "@/cabinet/hooks/useTasks"
import { useLang } from "@/hooks/useLang";
import { useTranslationClient } from "@/config/i18n/client";

interface IProps {
  taskId: number
}

const TaskItem = ({ taskId }: IProps) => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['cabinet']);
  const { title, text, psychologistImage, psychologistFullName, consultationDate } = useTask(taskId)

  const { modalOpen } = useModals()
  const handleClickDetails = useCallback(() => {
    modalOpen(MODALS.task, {
      taskId,
      isOpen: true,
    })
  }, [taskId, modalOpen])

  return (
    <div className="task-item">
      <div className="task-item-inner">
        <div className="task-item-header">
          {!!title && (
            <div className="task-item-title">
              <Button type="link" onClick={handleClickDetails}>{title}</Button>
            </div>
          )}
          {!!text && <div className="task-item-text">{text}</div>}
        </div>
        <div className="task-item-body">
          <InfoItem
            label={`${t("cabinet.psh")}:`}
            text={psychologistFullName}
            image={psychologistImage}
          />
          <InfoItem
            label={t("cabinet.date_consultation")}
            text={getDate(consultationDate, "DD MMMM HH:mm")}
            iconName="Calendar"
          />
          {/* <InfoItem
            label={t("cabinet.status")}
            text={getTaskStatus(status!, "label")}
            iconName={getTaskStatus(status!, "iconName")}
            colorText={getTaskStatus(status!, "color")}
          /> */}
        </div>
        <div className="task-item-footer">
          <Button
            size="xs"
            type="primary"
            weight="normal"
            icon={<Icon name="InfoCircle" />}
            onClick={handleClickDetails}
          >
            {t("cabinet.tasks.btn_details")}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TaskItem
