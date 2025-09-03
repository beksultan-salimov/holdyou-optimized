'use client'
import clsx from "clsx"
import { ROUTES } from "@/config"
import { useTranslationClient } from "@/config/i18n/client"
import { useLang } from "@/hooks/useLang"
import { Icon } from "@/components/Icon"
import SidebarMenuItem from "./SidebarMenuItem"
import { Button } from "@/components/Button"
import { useRouter } from "next/navigation"
import { removeAuthCookies } from "@/utils/helpers"
import { useAppDispatch } from "@/hooks/useStore"
import { logoutUser } from "@/store/authSlice"


interface IProps {
  isActive?: boolean
  onClick?: any
}

const SidebarMenu = ({ isActive, onClick }: IProps) => {
  const router = useRouter();
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['cabinet']);
  const dispatch = useAppDispatch()
  const handleClickLogout = () => {
    router.push(`/${lang}/${ROUTES.home}`);
    removeAuthCookies();
    dispatch(logoutUser())
  }

  return (
    <nav className={clsx("sidebar-menu", { active: isActive })}>
      <ul>
        <SidebarMenuItem label={t("cabinet.menu.dashboard")} to={ROUTES.cabinet} iconName="WindowFrame" onClick={onClick} />
        <SidebarMenuItem label={t("cabinet.menu.tasks")} to={ROUTES.cabinetTasks} iconName="Notebook" onClick={onClick} />
        <SidebarMenuItem label={t("cabinet.menu.tariffs")} to={ROUTES.cabinetShop} iconName="Wallet" onClick={onClick} />
        <SidebarMenuItem label={t("cabinet.menu.certificate")} to={ROUTES.cabinetCertificate} iconName="Certificate" onClick={onClick} />
        <SidebarMenuItem label={t("cabinet.menu.history")} to={ROUTES.cabinetHistorySessions} alternativePath={[ROUTES.cabinetHistoryPayments]} iconName="Documents" onClick={onClick} />
        {/* <SidebarMenuItem label={t("cabinet.menu.notifications")} to={ROUTES.cabinetNotifications} iconName="Bell" onClick={onClick} /> */}
        <SidebarMenuItem label={t("cabinet.menu.settings")} to={ROUTES.cabinetSettings} iconName="Settings" onClick={onClick} />
      </ul>

      <Button
        size="xs"
        danger
        onClick={handleClickLogout}
        className="sidebar-btn-logout"
        icon={<Icon name="Exit" />}
      >
        {t("cabinet.menu.logout")}
      </Button>
    </nav>
  )
}

export default SidebarMenu
