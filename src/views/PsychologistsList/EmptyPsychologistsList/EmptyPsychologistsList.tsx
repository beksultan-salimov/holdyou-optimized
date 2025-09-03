'use client'
import { useTranslationClient } from '@/config/i18n/client';
import { useLang } from '@/hooks/useLang';
import Image from 'next/image';
import EmptyImg from '@/static/img/cat.svg'
import s from './emptyPsychologistsList.module.scss';


const EmptyPsychologistsList = () => {
  const { lang } = useLang()
  const { t } = useTranslationClient(lang, ['site'])

  return (
    <div className={s.empty}>
      <Image src={EmptyImg} alt={t('site.psh_filter_empty')} />
      <p className={s.title}>{t('site.psh_filter_empty_title')}</p>
      <p className={s.text}>{t('site.psh_filter_empty_text')}</p>
    </div>
  );
};

export { EmptyPsychologistsList };
