'use client';
import { useMemo } from 'react';
import { defaultCurrency } from '@/config';
import { getDate, getIntegerFromString, isEmpty } from '@/utils/helpers';
import { BaseTable } from '@/cabinet/components/BaseTable';
import { Page } from '@/cabinet/components/Page';
import { IOrder } from '@/types';
import { ColumnsType } from '@/cabinet/types';
import { useHistoryPayments } from '@/cabinet/hooks/useHistory';
import { HistoryWrapper } from '@/cabinet/views/HistoryWrapper';

const HistoryPaymentsView = () => {
  const slug = 'historyPayments';
  const { t, pagination, payments, isLoading } = useHistoryPayments();

  const columns: ColumnsType<IOrder> = useMemo(
    () => [
      {
        title: t('cabinet.date'),
        key: 'date',
        render: (_, { paid_at }) => getDate(paid_at),
      },
      {
        title: t('cabinet.type'),
        key: 'type',
        render: (_, { product_content_object }) =>
          !isEmpty(product_content_object)
            ? !isEmpty(product_content_object?.code)
              ? <>{t(`cabinet.tariffs.items_short.certificate`)} ({t(`cabinet.tariffs.items_short.${product_content_object?.service?.type}`)})</>
              : t(`cabinet.tariffs.items_short.${product_content_object?.type}`)
            : '',
      },
      {
        title: t('cabinet.amount'),
        key: 'count',
        render: (_, { product_content_object }) =>
          product_content_object?.service?.sessions || product_content_object?.sessions || '-',
      },
      {
        title: t('cabinet.sum'),
        key: 'sum',
        render: (_, { price }) =>
          getIntegerFromString(price) + ' ' + defaultCurrency,
      },
    ],
    [t]
  );

  return (
    <Page slug={slug} pagination={pagination}>
      <HistoryWrapper defaultActiveKey="payments">
        <BaseTable
          columns={columns}
          dataSource={payments}
          loading={isLoading}
        />
      </HistoryWrapper>
    </Page>
  );
};

export default HistoryPaymentsView;
