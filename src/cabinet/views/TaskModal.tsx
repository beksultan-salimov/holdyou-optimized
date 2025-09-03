'use client'
import { MODALS } from "@/config"
import { getDate } from "@/utils/helpers"
import { Form, Field } from 'react-final-form';
import { Button } from "@/components/Button"
import { Icon } from "@/components/Icon"
import { InfoItem } from "@/components/InfoItem"
import { Text } from "@/components/Text"
import { Title } from "@/components/Title"
import {
  // FormRadioGroup,
  FormTextarea,
} from "@/components/BaseForm"
import { useTaskModal } from "../hooks/useTasks"
import { updateTasks } from "../store/tasksSlice"
import { BaseModal } from "@/views/BaseModal"
import { DropzoneFiles } from "./Dropzone";

const autoSizeTextareaConfig = {
  minRows: 4,
  maxRows: 50,
}

const TaskModal = () => {
  const modalId = MODALS.task
  const {
    id,
    title,
    text,
    status,
    psychologistImage,
    psychologistFullName,
    consultationDate,
    userId,

    initialValues,
    defaultFiles,
    handleUploadFiles,
    handleRemoveFile,
    isOpen,
    t,
    dispatch,
  } = useTaskModal(modalId)

  // const statusOptions = [
  //   {
  //     label: t("cabinet.tasks.status.2"),
  //     value: 2,
  //   },
  //   {
  //     label: t("cabinet.tasks.status.3"),
  //     value: 3,
  //   },
  //   {
  //     label: t("cabinet.tasks.status.4"),
  //     value: 4,
  //   },
  // ]

  const handleSubmit = async (formData: any) => {
    await dispatch(updateTasks({ formData, taskId: id, t }))
  }

  return (
    <BaseModal id={modalId} size="md" title={title}>
      {isOpen && id && userId && (
        <>
          <div className="modal-task-header">
            <InfoItem
              label={t("cabinet.psh")}
              text={psychologistFullName}
              image={psychologistImage}
            />
            <InfoItem
              label={t("cabinet.date_consultation")}
              text={getDate(consultationDate, "DD MMMM HH:mm")}
              iconName="Calendar"
            />
          </div>
          <div className="modal-task-body">
            <div className="section">
              <Title iconName="NotificationUnreadLines" size="xs">
                {t("cabinet.tasks.form.description.title")}
              </Title>
              <Text isBg>{text}</Text>
            </div>

            <Form
              initialValues={initialValues}
              onSubmit={handleSubmit}
              render={({ handleSubmit, submitting }: any) => (
                <form onSubmit={handleSubmit} className="profile-settings">
                  <div className="section">
                    <Title
                      iconName="BookmarkSquare"
                      size="xs"
                      extraText={t("cabinet.tasks.form.notes.subtitle")}
                    >
                      {t("cabinet.tasks.form.notes.title")}
                    </Title>
                    <Field
                      name="note"
                      placeholder={t("cabinet.tasks.form.notes.placeholder")}
                      component={FormTextarea}
                      autosize={autoSizeTextareaConfig}
                    />
                  </div>
                  <div className="section">
                    <Title iconName="GalleryRound" size="xs">
                      {t("cabinet.tasks.form.files.title")}
                    </Title>
                    <DropzoneFiles
                      drozoneLabel={t("cabinet.tasks.form.files.placeholder")}
                      defaultFileList={defaultFiles}
                      uploadProps={{
                        multiple: true,
                        customRequest: handleUploadFiles,
                      }}
                      onRemove={handleRemoveFile}
                    />
                  </div>
                  {/* <div className="section">
                    <Title iconName="CheckSquare" size="xs">
                      {t("cabinet.tasks.form.status.title")}
                    </Title>
                    <Field
                      name="status"
                      component={FormRadioGroup}
                      options={statusOptions}
                      className="field-status"
                    />
                  </div> */}

                  <div className="form-footer">
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="md"
                      disabled={submitting}
                      icon={<Icon name="UndoLeftRoundSquare" />}
                    >
                      {t("cabinet.tasks.form.btns.submit")}
                    </Button>
                  </div>
                </form>
              )}
            />
          </div>
        </>
      )}
    </BaseModal>
  )
}

export default TaskModal
