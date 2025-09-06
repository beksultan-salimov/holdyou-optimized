'use client'
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/useStore"
import {
  fetchBalance,
  getBalance,
  getBalanceIsLoaded,
} from "@/cabinet/store/balanceSlice"
import { useLang } from "@/hooks/useLang"
import { useTranslationClient } from "@/config/i18n/client"

export const useBalance = () => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['cabinet']);
  const dispatch = useAppDispatch()

  const isLoaded = useAppSelector(getBalanceIsLoaded)
  const consultations = useAppSelector(getBalance)
  useEffect(() => {
    dispatch(fetchBalance())
  }, [dispatch])

  return {
    t,
    consultations,
    isLoaded,
  }
}
