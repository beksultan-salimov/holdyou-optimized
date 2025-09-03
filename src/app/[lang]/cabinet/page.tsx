'use client'
// import dynamic from 'next/dynamic';
import { Page } from "@/cabinet/components/Page";
import Balance from "@/cabinet/views/Balance";
import DashboardNotifications from "@/cabinet/views/Dashboard/DashboardNotifications";
import DashboardRecords from "@/cabinet/views/Dashboard/DashboardRecords";
import DashboardSessions from "@/cabinet/views/Dashboard/DashboardSessions";
import DashboardTasks from "@/cabinet/views/Dashboard/DashboardTasks";
import { Button } from "@/components/Button";
import { ROUTES } from "@/config";
import { useTranslationClient } from "@/config/i18n/client";
import { useLang } from "@/hooks/useLang";
import Link from "next/link";
import { ReviewsAddModal } from '@/views/ReviewsAddModal';

/**
 * @deprecated ZoomModal should not be used
 */
// const ZoomModal = dynamic(() => import('@/cabinet/views/ZoomModal'), {
//   ssr: false,
// });

export default function DashboardPage() {
  const slug = 'dashboard'
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['cabinet']);

  return (
    <Page slug={slug}>
      <div className="widgets">
        <Balance
          title={t('cabinet.balance')}
          actions={
            <Button type="link">
              <Link href={ROUTES.cabinetShop}>{t('cabinet.dashboard.balance.btns.buy')}</Link>
            </Button>
          }
        />
        <DashboardRecords />
        <DashboardTasks />
        <DashboardNotifications />
        <DashboardSessions />
        {/* <ZoomModal /> */}
        <ReviewsAddModal />
      </div>
    </Page>
  );
}
