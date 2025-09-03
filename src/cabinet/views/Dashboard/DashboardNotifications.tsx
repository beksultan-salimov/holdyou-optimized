'use client'
import { ROUTES } from "@/config"
import { Button } from '@/components/Button';
import { Widget } from '@/components/Widget';
import { EmptyCard } from '@/components/EmptyCard';
import NotificationsItem from "@/cabinet/views/NotificationsItem"
import EmptyImg from "@/static/img/empty-notifications.svg"
import Link from "next/link"
import Image from "next/image";
import { useLang } from "@/hooks/useLang";
import { useTranslationClient } from "@/config/i18n/client";

interface IProps {}

const DashboardNotifications = ({ ...props }: IProps) => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['cabinet']);
  const items: any[] = [];
  return (
    <Widget
      className="dashboard-notifications"
      title={t("cabinet.dashboard.notifications.title")}
      actions={
        <Button type="link">
          <Link href={ROUTES.cabinetNotifications}>{t("cabinet.dashboard.notifications.all")}</Link>
        </Button>
      }
    >
      {!!items && items.length ? (
        items?.map((item:any) => (
          <NotificationsItem {...item} key={item.id} isTooltipTitle />
        ))
      ) : (
        <EmptyCard text={t("cabinet.dashboard.notifications.empty")} image={<Image src={EmptyImg} alt="" />} />
      )}
    </Widget>
  )
}

export default DashboardNotifications
