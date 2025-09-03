'use client'
import { useState } from "react";
import clsx from "clsx";
import { useTranslationClient } from "@/config/i18n/client";
import { useLang } from "@/hooks/useLang";
import { useAuth } from "@/hooks/useAuth";
import SidebarMenu from "./SidebarMenu"
import { Avatar } from "../Avatar";

const Sidebar = () => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['cabinet']);
  const [activeMenu, setActiveMenu] = useState(false);
  const handleToggleActiveMenu = () => setActiveMenu(active => !active)
  const { user } = useAuth();
  const { fullname, photo } = user || {};

  return (
    <div className="sidebar">
      <div className="sidebar-profile">
        <Avatar src={photo?.sm} className="sidebar-profile-avatar">
          {fullname?.slice(0, 2)}
        </Avatar>
        <div className="sidebar-profile-label">
          {t('cabinet.welcome')}
          <b>{fullname || ''}</b>
        </div>
        <div
          className={clsx('sidebar-profile-btn-menu', {
            active: activeMenu,
          })}
          onClick={handleToggleActiveMenu}
        />
      </div>

      <SidebarMenu isActive={activeMenu} onClick={handleToggleActiveMenu} />
    </div>
  );
}

export default Sidebar
