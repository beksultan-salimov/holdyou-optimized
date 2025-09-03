'use client';
import Image from 'next/image';
import { ROUTES } from '@/config';
import { useTranslationClient } from '@/config/i18n/client';
import { useLang } from '@/hooks/useLang';
import { Button } from '@/components/Button';
import s from './error404.module.scss';

const Error404 = () => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);

  return (
    <div className={s.root}>
      <Image
        src="/img/error_404.svg"
        alt=""
        width="404"
        height="328"
        className={s.img}
      />
      <p className={s.text}>{t('site.error_404_title')}</p>
      <Button href={ROUTES.home} type="primary-old" weight="bold" size="sm" className={s.btn}>
        {t('site.error_404_btn')}
      </Button>
    </div>
  );
};

export { Error404 };
