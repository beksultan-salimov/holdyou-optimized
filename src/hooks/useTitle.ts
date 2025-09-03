import { useEffect } from "react"

export const useTitle = ({ title = '', suffix = "HoldYou" }: { title?: string, suffix?: string }) => {
  const _suffix = suffix !== null ? ' - ' + suffix : '';

  useEffect(() => {
    const prevTitle = document.title
    document.title = (title || ' ') + _suffix
    return () => {
      document.title = prevTitle
    }
  })
}
