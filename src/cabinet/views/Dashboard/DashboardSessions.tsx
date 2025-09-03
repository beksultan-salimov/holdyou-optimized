'use client'
import Link from 'next/link';
import { ROUTES } from '@/config';
import { getDate } from '@/utils/helpers';
import { IConsultation } from '@/types';
import { ColumnsType } from '@/cabinet/types';
import { Button } from '@/components/Button';
import { InfoItem } from '@/components/InfoItem';
import { Widget } from '@/components/Widget';
import { BaseTable } from '@/cabinet/components/BaseTable';
import { useDashboardSessions } from '@/cabinet/hooks/useDashboard';


const DashboardSessions = () => {
  const { isLoading, sessions, t } = useDashboardSessions()

  const columns: ColumnsType<IConsultation> = [
    {
      title: t('cabinet.psh'),
      key: 'name',
      render: (_, { psychologist }) => (
        <InfoItem
          text={psychologist?.fullname}
          image={psychologist?.photo?.xs}
          avatarSize={30}
          isRounded
          isSimple
        />
      ),
    },
    {
      title: t('cabinet.date'),
      key: 'date',
      render: (_, { schedule }) =>
        getDate(schedule?.start_datetime, 'DD.MM.YYYY HH:mm'),
    },
  ];

  return (
    <Widget
      className="dashboard-sessions"
      title={t("cabinet.dashboard.sessions.title")}
      actions={
        <Button type="link">
          <Link href={ROUTES.cabinetHistorySessions}>{t("cabinet.dashboard.sessions.all")}</Link>
        </Button>
      }
    >
      <BaseTable
        columns={columns}
        dataSource={sessions}
        emptyText={t("cabinet.dashboard.sessions.empty")}
        loading={isLoading}
      />
    </Widget>
  )
}

export default DashboardSessions
