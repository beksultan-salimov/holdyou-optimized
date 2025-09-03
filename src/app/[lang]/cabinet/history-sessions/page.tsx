'use client';
import { useMemo } from 'react';
import { getDate } from '@/utils/helpers';
import { InfoItem } from '@/components/InfoItem';
import { BaseTable } from '@/cabinet/components/BaseTable';
import { Page } from '@/cabinet/components/Page';
import { IConsultation } from '@/types';
import { ColumnsType } from '@/cabinet/types';
import { useHistorySessions } from '@/cabinet/hooks/useHistory';
import { HistoryWrapper } from '@/cabinet/views/HistoryWrapper';

const HistorySessionsView = () => {
  const slug = 'historySessions';
  const { t, sessions, pagination, isLoading } = useHistorySessions();

  const columns: ColumnsType<IConsultation> = useMemo(
    () => [
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
        title: t('cabinet.type_consultation'),
        key: 'type',
        render: (_, { service = {} }) =>
          t(`cabinet.tariffs.items.${service?.type}` as any),
      },
      {
        title: t('cabinet.date'),
        key: 'date',
        render: (_, { schedule }) =>
          getDate(schedule?.start_datetime, 'DD.MM.YYYY HH:mm'),
      },
    ],
    [t]
  );

  return (
    <Page slug={slug} pagination={pagination}>
      <HistoryWrapper defaultActiveKey="session">
        <BaseTable
          columns={columns}
          dataSource={sessions}
          loading={isLoading}
        />
      </HistoryWrapper>
    </Page>
  );
};

export default HistorySessionsView;
