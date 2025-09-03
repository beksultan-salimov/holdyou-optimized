/* eslint-disable react/display-name */
import React from "react"
import { Title } from "@/components/Title"
import { Icon } from "@/components/Icon"
import { Button } from "@/components/Button"
import { Text } from "@/components/Text"
import { useLang } from "@/hooks/useLang"
import { useTranslationClient } from "@/config/i18n/client"
import { Avatar } from "./Avatar"

interface IProps {
  image?: string;
  username?: string;
  onChange?: any;
}

const ProfileSettingsAvatar = React.memo(({ image, onChange, username = '' }: IProps) => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['cabinet']);

  const handleChangeImage = async (event: any) => {
    const file = event.target.files[0]
    if (typeof onChange === 'function') {
      onChange(file);
    }
  }

  return (
    <div className="profile-settings-avatar">
      <Title iconName="GalleryRound" size="xs">
        {t('cabinet.profile.avatar.title')}
      </Title>
      <Avatar src={image}>{username?.slice(0, 2)}</Avatar>
      <Button
        size="xs"
        type="primary"
        icon={<Icon name="Camera" />}
        className="btn-change-avatar"
      >
        {image
          ? t('cabinet.profile.avatar.btns.change')
          : t('cabinet.profile.avatar.btns.upload')}
        <label className="label-input-file">
          <input
            type="file"
            accept="image/jpeg, image/jpg, image/png"
            onChange={handleChangeImage}
          />
        </label>
      </Button>
      <Text color="secondary" size="middle">
        {t('cabinet.profile.avatar.size')}
      </Text>
    </div>
  );
})

export default ProfileSettingsAvatar
