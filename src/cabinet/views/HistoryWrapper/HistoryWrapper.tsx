'use client'
import Link from 'next/link';
import clsx from 'clsx';
import { ROUTES } from '@/config';
import { useTranslationClient } from '@/config/i18n/client';
import { useLang } from '@/hooks/useLang';
import './historyWrapper.scss';

interface IProps {
  children: React.ReactNode;
  defaultActiveKey: 'session' | 'payments';
}
const HistoryWrapper = ({ children, defaultActiveKey }: IProps) => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['cabinet']);
  const menu = [
    {
      key: 'session',
      label: t('cabinet.history.nav.sessions'),
      link: ROUTES.cabinetHistorySessions,
    },
    {
      key: 'payments',
      label: t('cabinet.history.nav.payments'),
      link: ROUTES.cabinetHistoryPayments,
    },
  ];
  return (
    <div className="history-wrapper">
      <div className="history-wrapper-nav">
        {menu?.map(({ key, link, label }:any) => (
          <Link href={link} className={clsx("history-wrapper-nav-btn", { active: key === defaultActiveKey })} key={key}>{label}</Link>
        ))}
      </div>
      <div className="history-wrapper-content">{children}</div>
    </div>
  );
};

export { HistoryWrapper };
