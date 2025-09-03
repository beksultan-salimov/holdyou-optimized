import { Tooltip } from "antd"

type statusType = "success" | "info" | "error"

interface IProps {
  title?: React.ReactNode
  text?: React.ReactNode
  status?: string
  isTooltipTitle?: boolean
}

const getStatusColor = (status?: string) => {
  const colorsMap: any = {
    success: "#92BE66",
    info: "#00BDC2",
    error: "#788CD5",
  }
  return !!status ? colorsMap[status] : "#00D2D7"
}

const NotificationsItem = ({ title, text, status, isTooltipTitle }: IProps) => {
  const statusStyles = {
    backgroundColor: getStatusColor(status),
  }

  const _title = <div className="notifications-item-title">{title}</div>

  return (
    <div className="notifications-item">
      <div className="notifications-item-status" style={statusStyles} />
      {!!title &&
        (isTooltipTitle ? (
          <Tooltip
            placement="top"
            overlay={<>{title}</>}
            overlayClassName="tooltip-simple tooltip-notifications-title"
            trigger={["hover"]}
            arrow={false}
          >
            {_title}
          </Tooltip>
        ) : (
          _title
        ))}
      {!!text && <div className="notifications-item-text">{text}</div>}
    </div>
  )
}

export default NotificationsItem
