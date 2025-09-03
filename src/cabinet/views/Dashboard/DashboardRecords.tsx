'use client'
import { useCallback } from "react"
import clsx from "clsx"
import Image from "next/image"
// import { MODALS } from "@/config"
import { useTranslationClient } from "@/config/i18n/client"
import { get, getDate } from "@/utils/helpers"
import { IMeeting, IAgoraCredentials } from '@/types';
import { Button } from '@/components/Button';
import { InfoItem } from '@/components/InfoItem';
import { Icon } from '@/components/Icon';
import { Widget } from '@/components/Widget';
import { Carousel } from '@/cabinet/components/Carousel';
import { EmptyCard } from '@/components/EmptyCard';
import { useModals } from "@/hooks/useModals"
import { useLang } from "@/hooks/useLang"
import { useNearestConsultations } from "@/cabinet/hooks/useDashboard"
import EmptyImg from '@/static/img/empty-records.svg';
import { Spinner } from "@/components/Spinner"
import { ROUTES } from "@/config"

interface ICarouselItem {
  id?: number;
  visible?: boolean;
  date?: string;
  image?: string;
  onCancel?: (id: number) => void;
  // meeting?: IMeeting;
  agora_credentials?: IAgoraCredentials;
  user?: any;
  psychologist?: any;
  psychologistId?: any;
  psychologistFullname?: string;
}

const CarouselItem = ({
  id,
  visible,
  date,
  image,
  onCancel,
  // meeting,
  user,
  // psychologist,
  // psychologistId,
  psychologistFullname,
  agora_credentials,
}: ICarouselItem) => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['cabinet']);
  const { token, app_id, chanel_name, user_id } = agora_credentials || {};
  const userFullName = get(user, 'fullname', '');

  const handleCancelRecord = useCallback(() => {
    typeof onCancel === 'function' && onCancel(id!);
  }, [id, onCancel]);

  // const startItems: MenuProps["items"] = [
  //   {
  //     key: "1",
  //     label: t("cabinet.video_consultation"),
  //   },
  //   {
  //     key: "2",
  //     label: t("cabinet.audio_consultation"),
  //   },
  // ]

  // const { modalOpen } = useModals();
  /**
   * TODO deprecated meeting should not be used
   */
  // const handleOpenZoom = () => {
  //   modalOpen(MODALS.zoom, {
  //     ...(meeting || {}),
  //     user,
  //     psychologist,
  //     isOpen: true,
  //     psychologistId,
  //     psychologistFullname,
  //     consultationId: id
  //   });
  // };

  return (
    <div
      className={clsx(
        'dashboard-carousel-item dashboard-carousel-item--record',
        {
          visible,
        }
      )}
    >
      <InfoItem
        label={`${t('cabinet.psh')}:`}
        text={psychologistFullname}
        image={image}
      />
      <InfoItem
        label={`${t('cabinet.date')}:`}
        text={getDate(date, 'DD MMMM HH:mm')}
        iconName="Calendar"
      />
      <div className="btns">
        <Button
          danger
          size="xs"
          icon={<Icon name="CloseCircle" />}
          onClick={handleCancelRecord}
        >
          {t('cabinet.cancel')}
        </Button>
        {!!agora_credentials?.token && (
          <Button
            type="primary"
            size="xs"
            href={ROUTES.agora(id!)}
            // href={ROUTES.agora({
            //   token: token!,
            //   app_id: app_id!,
            //   chanel_name: chanel_name!,
            //   user_id: user_id!,
            //   user_name: userFullName!,
            //   psh_name: psychologistFullname!,
            //   id: id!,
            // })}
          >
            {t('cabinet.dashboard.records.btns.start')}
          </Button>
        )}
        {/* TODO deprecated meeting should not be used */}
        {/* {!!meeting?.meeting_id && (
          <Button type="primary" size="xs" onClick={handleOpenZoom}>
            {t('cabinet.dashboard.records.btns.start')}
          </Button>
        )} */}
        {/* <Dropdown menu={{ items: startItems }} trigger={["click"]}>
          <Button type="primary" className="btn-with-dash">
            {t("cabinet.dashboard.records.btns.start")}
          </Button>
        </Dropdown> */}
      </div>
    </div>
  );
};

const DashboardRecords = () => {
  const { nearestConsultations, handleCancelRecord, nearestIsLoading, t } = useNearestConsultations()

  return (
    <Widget className="dashboard-records" title={t("cabinet.dashboard.records.title")}>
      {nearestConsultations?.length ? (
        <Carousel
          items={nearestConsultations}
          component={<CarouselItem onCancel={handleCancelRecord} />}
          className="dashboard-widget-carousel"
        />
      ) : (
        <EmptyCard text={nearestIsLoading ? <Spinner /> : t("cabinet.dashboard.records.empty")} image={<Image src={EmptyImg} alt="" />} />
      )}
    </Widget>
  )
}

export default DashboardRecords
