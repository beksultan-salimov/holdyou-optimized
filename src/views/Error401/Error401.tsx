'use client';
import { useTranslationClient } from '@/config/i18n/client';
import { useLang } from '@/hooks/useLang';
// import Image from 'next/image';
import { Button } from '@/components/Button';
import s from './error401.module.scss';
import { MODALS } from '@/config';
import { useModals } from '@/hooks/useModals';

const Error401 = () => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);
  const { modalOpen } = useModals();
  const handleClickBtn = () => {
    modalOpen(MODALS.auth)
  }

  return (
    <div className={s.root}>
      <div className={s.inner}>
        {/* <Image
          src="/img/error_404.svg"
          alt=""
          width="404"
          height="328"
          className={s.img}
        /> */}
        <p className={s.text}>{t('site.error_401_title')}</p>
        <Button type="primary-old" weight="bold" size="sm" className={s.btn} onClick={handleClickBtn}>
          {t('site.error_401_btn')}
        </Button>
      </div>
    </div>
  );
};

export { Error401 };
