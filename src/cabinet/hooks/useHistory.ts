'use client'
import { useAppSelector } from "@/hooks/useStore"
import { fetchHistorySessions, getHistorySessions, getHistorySessionsCount, getHistorySessionsLoading, getHistorySessionsSize } from '@/cabinet/store/historySessionsSlice';
import { fetchHistoryPayments, getHistoryPayments, getHistoryPaymentsCount, getHistoryPaymentsLoading, getHistoryPaymentsSize } from '@/cabinet/store/historyPaymentsSlice';
import { usePagination } from "@/hooks/usePagination"
import { useLang } from "@/hooks/useLang";
import { useTranslationClient } from "@/config/i18n/client";


export const useHistorySessions = () => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['cabinet']);

  const count = useAppSelector(getHistorySessionsCount)
  const size = useAppSelector(getHistorySessionsSize)
  const sessions = useAppSelector(getHistorySessions)
  const isLoading = useAppSelector(getHistorySessionsLoading)
  const { pagination } = usePagination({ count, size, action: fetchHistorySessions, showInfo: true })

  return {
    t,
    isLoading,
    sessions,
    pagination,
  }
}

export const useHistoryPayments = () => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['cabinet']);

  const count = useAppSelector(getHistoryPaymentsCount);
  const size = useAppSelector(getHistoryPaymentsSize);
  const isLoading = useAppSelector(getHistoryPaymentsLoading);
  const payments = useAppSelector(getHistoryPayments);
  const { pagination } = usePagination({ count, size, action: fetchHistoryPayments });


  return {
    t,
    isLoading,
    payments,
    pagination,
  };
}
