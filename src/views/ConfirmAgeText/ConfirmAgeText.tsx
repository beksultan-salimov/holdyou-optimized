'use client';
import { useTranslationClient } from '@/config/i18n/client';
import { useLang } from '@/hooks/useLang';

const ConfirmAgeText = () => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);
  return (
    <>
      {t('site.confirm_age.1')}
      <a href={`/${lang}/page/terms`} target="_blank">
        {t('site.confirm_age.2')}
      </a>
      {t('site.confirm_age.3')}
      <a href={`/${lang}/page/privacy-policy`} target="_blank">
        {t('site.confirm_age.4')}
      </a>
    </>
  );
};

export { ConfirmAgeText };
