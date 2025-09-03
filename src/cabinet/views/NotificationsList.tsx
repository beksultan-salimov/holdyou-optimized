import NotificationsItem from "@/cabinet/views/NotificationsItem"

interface IProps {
  items?: any;
}

const NotificationsList = ({ items = [] }: IProps) => {
  return (
    <div className="notifications-list">
      {items?.map((item: any) => (
        <NotificationsItem {...item} key={item.id} />
      ))}
    </div>
  );
};

export default NotificationsList
