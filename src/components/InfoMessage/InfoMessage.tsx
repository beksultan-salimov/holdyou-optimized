import clsx from "clsx"
// import { IconNamesType } from "@/utils/iconsSet"
import { Icon } from "@/components/Icon"
import './infoMessage.scss';

interface IProps {
  className?: string
  title?: React.ReactNode
  text?: React.ReactNode
  type?: "info" | "error"
  // TODO fix
  // iconName?: IconNamesType
  iconName?: any
  size?: "sm" | "md"
}

const InfoMessage = ({
  title,
  text,
  type = "info",
  iconName,
  className,
  size = "md"
}: IProps) => {
  return (
    <div
      className={clsx(
        `info-message info-message--${type} info-message--${size}`,
        {
          "has-icon": !!iconName,
        },
        className,
      )}
    >
      <div className="info-message-inner">
        {!!iconName && <Icon name={iconName} className="info-message-icon" />}
        {!!title && <div className="info-message-title">{title}</div>}
        {!!text && <div className="info-message-text">{text}</div>}
      </div>
    </div>
  )
}

export { InfoMessage }
