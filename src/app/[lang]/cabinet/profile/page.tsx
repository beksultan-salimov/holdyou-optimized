'use client'
import { useEffect, useMemo, useState } from 'react';
import { Form, Field } from 'react-final-form';
import createDecorator from 'final-form-calculate';
import { MODALS, getReminderOptions } from '@/config';
import { useTranslationClient } from '@/config/i18n/client';
import { convertBase64 } from '@/utils/helpers';
import { validateRequired } from '@/utils/validate';
import { useLang } from '@/hooks/useLang';
import { useAuth } from '@/hooks/useAuth';
import { useAppDispatch } from '@/hooks/useStore';
import { profileSubmit } from '@/store/authSlice';
import { FormInput, FormSelect } from '@/components/BaseForm';
import { Title } from '@/components/Title';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { Switch } from '@/components/Switch';
import { Page } from '@/cabinet/components/Page';
import { FieldsRow } from '@/cabinet/views/FieldsRow';
import ProfileSettingsAvatar from '@/cabinet/views/ProfileSettingsAvatar';
import { useModals } from '@/hooks/useModals';
import { ChangePasswordModal } from '@/views/ChangePasswordModal';
import { ChangeUsernameModal } from '@/views/ChangeUsernameModal';
import { ChangeUsernameConfirmSmsModal } from '@/views/ChangeUsernameModal/ChangeUsernameConfirmSmsModal';

const ProfilePage = () => {
  const slug = 'profile';
  const { lang } = useLang();
  const { user } = useAuth();
  const { t } = useTranslationClient(lang, ['cabinet']);
  const [photoFile, setPhotoFile] = useState();
  const [previewPhotoFile, setPreviewPhotoFile] = useState();
  const dispatch = useAppDispatch();

  const setConvertedImage = async (file: any) => {
    const base64: any = await convertBase64(file);
    setPreviewPhotoFile(base64);
  };
  useEffect(() => {
    if (!!photoFile) {
      setConvertedImage(photoFile);
    }
  }, [photoFile]);

  const handleSubmitForm = async (values: any = {}) => {
    await dispatch(
      profileSubmit({ values: { ...values, photoFile }, t, dispatch })
    );
  };

  const reminderOptions = getReminderOptions();
  const rememberDecorator = useMemo(
    () =>
      createDecorator({
        field: 'notifications',
        updates: {
          reminders: (notifications) =>
            notifications ? reminderOptions[0].value : undefined,
        },
      }),
    []
  );

  const initialValues = {
    id: user?.id || '',
    fullname: user?.fullname || '',
    notifications: false,
    reminders: reminderOptions[0].value,
  };

  const { modalOpen } = useModals();
  const handleClickChangePassword = () => {
    modalOpen(MODALS.changePassword, {
      isOpen: true,
    });
  }
  const handleClickChangeUsername = () => {
    modalOpen(MODALS.changeUsername, {
      isOpen: true,
    });
  };

  return (
    <Page slug={slug} title={t('cabinet.profile.title')}>
      <Form
        initialValues={initialValues}
        onSubmit={handleSubmitForm}
        decorators={[rememberDecorator]}
        render={({
          handleSubmit,
          form,
          submitting,
          pristine,
          values,
          submitError,
          modifiedSinceLastSubmit,
        }: any) => (
          <form onSubmit={handleSubmit} className="profile-settings">
            <div className="profile-settings-header">
              <div className="profile-settings-avatar-col">
                <ProfileSettingsAvatar
                  onChange={setPhotoFile}
                  image={previewPhotoFile || user?.photo?.sm}
                  username={user?.fullname}
                />
              </div>
              {/* <div className="profile-settings-reminder-col">
                <Title iconName="Bell" size="xs" className="switch-remember">
                  <span>{t('cabinet.profile.form.reminders')}</span>
                  <Field name="notifications" component={Switch} />
                </Title>
                <Field
                  name="reminders"
                  component={FormSelect}
                  options={reminderOptions}
                  disabled={!values?.notifications}
                />
              </div> */}
            </div>
            <Title iconName="UserCircle" size="xs">
              {t('cabinet.profile.form.personal_data')}
            </Title>
            <FieldsRow cols={2} gutter={24}>
              <Field
                name="fullname"
                placeholder={t('cabinet.name')}
                component={FormInput}
                validate={validateRequired}
              />
            </FieldsRow>
            <div className="form-footer">
              <Button
                type="primary"
                htmlType="submit"
                size="md"
                disabled={submitting}
                icon={<Icon name="UndoLeftRoundSquare" />}
              >
                {t('cabinet.profile.form.btns.submit')}
              </Button>
            </div>
            {submitError && !modifiedSinceLastSubmit && (
              <div className="form-error">{submitError}</div>
            )}
          </form>
        )}
      />

      <div className="profile-action-panel">
        <Button
          htmlType="button"
          size="xs"
          onClick={handleClickChangePassword}
        >
          {t('cabinet.profile.btn_change_password')}
        </Button>
        <Button
          htmlType="button"
          size="xs"
          onClick={handleClickChangeUsername}
        >
          {t('cabinet.profile.btn_change_username')}
        </Button>
      </div>

      <ChangePasswordModal />
      <ChangeUsernameModal />
      <ChangeUsernameConfirmSmsModal />
    </Page>
  );
};

export default ProfilePage;
