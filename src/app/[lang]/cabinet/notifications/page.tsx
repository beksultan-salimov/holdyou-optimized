'use client'
import Image from 'next/image';
// import { fetchNotifications } from '@/cabinet/store/notificationsSlice';
import { isEmpty } from '@/utils/helpers';
import { Page } from '@/cabinet/components/Page';
import NotificationsList from '@/cabinet/views/NotificationsList';
import { useLang } from '@/hooks/useLang';
import { useTranslationClient } from '@/config/i18n/client';
import { EmptyCard } from '@/components/EmptyCard';
import EmptyImg from '@/static/img/empty-notifications.svg';

interface IProps {
  props?: any;
}

const NotificationsPage = ({ props }: IProps) => {
  const slug = 'notifications';
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['cabinet']);
  // TODO need implement
  const items: any = []

  return (
    <Page slug={slug} title={t('cabinet.notifications.title')}>
      {!isEmpty(items) ? (
        <NotificationsList items={items} />
      ) : (
        <EmptyCard
          text={t('cabinet.notifications.items.empty')}
          image={<Image src={EmptyImg} alt="" />}
        />
      )}
    </Page>
  );
};

export default NotificationsPage;
