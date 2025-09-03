import clsx from "clsx"

interface IProps {
  className?: string
  children?: React.ReactNode
  header?: React.ReactNode
  title?: React.ReactNode
  actions?: React.ReactNode
  footer?: React.ReactNode
  slides?: React.ReactNode
  isBorder?: boolean
}

const Widget = ({
  className = "",
  header,
  title,
  actions,
  children,
  slides,
  footer,
  isBorder = true,
}: IProps) => {
  return (
    <div
      className={clsx(`widget ${className}`, {
        "widget-with-border": isBorder,
      })}
    >
      {(!!header || !!title || !!actions) && (
        <div className="widget-header">
          {header}
          {!!title && <div className="widget-header-title">{title}</div>}
          {!!actions && <div className="widget-header-actions">{actions}</div>}
        </div>
      )}
      {!!slides && (
        <div className="widget-slides">
          <div className="widget-slides-items">{slides}</div>
          <div className="widget-slides-actions"></div>
        </div>
      )}
      {!!children && <div className="widget-body">{children}</div>}
      {!!footer && <div className="widget-footer">{footer}</div>}
    </div>
  )
}

export { Widget }
