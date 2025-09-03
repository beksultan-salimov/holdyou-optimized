'use client'
import Link from "next/link";
import Image from 'next/image';
import { MODALS, ROUTES } from "@/config"
import { TaskStatusType, getTaskStatus } from "@/config/task";
import { getDate } from "@/utils/helpers"
import { Button } from '@/components/Button';
import { InfoItem } from '@/components/InfoItem';
import { Icon } from '@/components/Icon';
import { Widget } from '@/components/Widget';
import { EmptyCard } from '@/components/EmptyCard';
import { Carousel } from '@/cabinet/components/Carousel';
import EmptyImg from '@/static/img/empty-tasks.svg';
import { useDashboardTasks } from "@/cabinet/hooks/useDashboard";
import { Spinner } from "@/components/Spinner";
import { useModals } from "@/hooks/useModals";
import { useCallback } from "react";

interface IProps {}
interface ICarouselItem {
  id?: string
  title?: string
  date?: string
  status?: TaskStatusType
  t: any
}
const CarouselItem = ({ id, title, date, status, t }: ICarouselItem) => {
  const { modalOpen } = useModals();
  const handleClickDetails = useCallback(() => {
    modalOpen(MODALS.task, {
      taskId: id,
      isOpen: true,
    });
  }, [id, modalOpen]);

  return (
    <div className="dashboard-tasks-slide">
      <InfoItem text={title} iconName="DocumentAdd" />
      <InfoItem
        label={t('cabinet.date_consultation')}
        text={getDate(date)}
        iconName="Calendar"
      />
      <InfoItem
        label={t('cabinet.status')}
        text={getTaskStatus(status!, 'label', { t })}
        iconName={getTaskStatus(status!, 'iconName', { t })}
        colorText={getTaskStatus(status!, 'color', { t })}
        extra={
          <div className="btns">
            <Button
              type="primary"
              size="xs"
              icon={<Icon name="InfoCircle" />}
              onClick={handleClickDetails}
            >
              {t('cabinet.dashboard.tasks.btns.details')}
            </Button>
          </div>
        }
      />
    </div>
  );
}

const DashboardTasks = ({ ...props }: IProps) => {
  const { tasks, isLoading, t } = useDashboardTasks();

  return (
    <Widget
      className="dashboard-tasks"
      title={t("cabinet.dashboard.tasks.title")}
      actions={
        <Button type="link">
          <Link href={ROUTES.cabinetTasks}>{t("cabinet.dashboard.tasks.all")}</Link>
        </Button>
      }
    >
      {!!tasks && tasks.length ? (
        <Carousel
          items={tasks}
          component={<CarouselItem t={t}/>}
          className="dashboard-widget-carousel"
        />
      ) : (
        <EmptyCard text={isLoading ? <Spinner /> : t("cabinet.dashboard.tasks.empty")} image={<Image src={EmptyImg} alt="" />} />
      )}
    </Widget>
  )
}

export default DashboardTasks
