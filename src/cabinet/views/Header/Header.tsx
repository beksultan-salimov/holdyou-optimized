'use client'
import { Dropdown } from 'antd';
import Link from "next/link"
import { MenuProps } from "@/cabinet/types"
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { ROUTES } from "@/config";
import { useLang } from '@/hooks/useLang';
import { get } from '@/utils/helpers';
import { useTranslationClient } from '@/config/i18n/client';
import { useDashboardSessions } from '@/cabinet/hooks/useDashboard';

interface IProps {
  actions?: React.ReactNode
}

const Header = ({ actions }: IProps) => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['cabinet']);
  const { sessions } = useDashboardSessions();
  const lastPsychologistId = get(sessions, [0, 'psychologist', 'id']);

  const orderItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        // <Link href={ROUTES.checkout(lastPsychologistId!)}>
        <Link href={ROUTES.psychologist(lastPsychologistId!, '?scroll_calendar=true')}>
          {t('cabinet.header.order_last')}
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link href={ROUTES.psychologists}>{t('cabinet.header.order_new')}</Link>
      ),
    },
  ];

  return (
    <div className="cabinet-header">
      <div className="cabinet-header-inner">
        <h1 className="cabinet-header-title">{t('cabinet.header.title')}</h1>
        <div className="cabinet-header-actions">
          {actions}
          {!!lastPsychologistId ? (
            <Dropdown
              menu={{ items: orderItems }}
              trigger={['click']}
              overlayClassName="ant-dropdown-large"
            >
              <Button
                type="primary"
                size="md"
                icon={<Icon name="UserCheckRounded" />}
                className="btn-with-dash cabinet-header-btn-cta"
              >
                {t('cabinet.header.btn_order')}
              </Button>
            </Dropdown>
          ) : (
            <Button
              href={ROUTES.psychologists}
              type="primary"
              size="md"
              icon={<Icon name="UserCheckRounded" />}
              className="cabinet-header-btn-cta"
            >
              {t('cabinet.header.btn_order')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header
