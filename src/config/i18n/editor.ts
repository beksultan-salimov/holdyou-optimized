'use client'
import { useEffect, useState } from 'react'
import { useTranslation as useTranslationOrg } from 'react-i18next'
import { LangType } from './settings'

const runsOnServerSide = typeof window === 'undefined'

export function useTranslationEditor(lng:LangType, ns?:string | string[], options?:any) {
  const ret = useTranslationOrg(ns, options)
  const { i18n } = ret
  const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage)
  useEffect(() => {
    if (!runsOnServerSide) {
      if (activeLng === i18n.resolvedLanguage) return
      setActiveLng(i18n.resolvedLanguage)
    }
  }, [activeLng, i18n.resolvedLanguage])
  useEffect(() => {
    if (!runsOnServerSide) {
      if (!lng || i18n.resolvedLanguage === lng) return
      i18n.changeLanguage(lng)
    }
  }, [lng, i18n])
  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng)
  }

  return { ...ret, translator: ret.t };
}
