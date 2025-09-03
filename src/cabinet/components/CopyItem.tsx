'use client'
import { useState, useCallback } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import clsx from "clsx"
import { Tooltip } from "antd"
import { Icon } from "@/components/Icon"
import { TooltipPlacement } from "@/cabinet/types"
import { useLang } from "@/hooks/useLang"
import { useTranslationClient } from "@/config/i18n/client"

interface IProps {
  className?: string
  label?: React.ReactNode
  copyText: string
  copyTip?: React.ReactNode
  copiedTip?: React.ReactNode
  delayHide?: number
  placement?: TooltipPlacement
  isArrow?: boolean
  isBtnIcon?: boolean
  icon?: React.ReactNode
  copyBtn?: React.ReactNode
  offset?: number[]
}

const CopyItem = ({
  label,
  copyText = "",
  copyTip,
  copiedTip,
  className = "",
  delayHide = 1000,
  placement = "top",
  offset = [0, -4],
  icon,
  copyBtn,
  isArrow,
  isBtnIcon,
}: IProps) => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['cabinet']);
  const [isCopied, setCopied] = useState(false)
  const [visibleTooltip, setVisibleTooltip] = useState(false)
  const _copyTip = copyTip || t("cabinet.copy")
  const _copiedTip = copiedTip || t("cabinet.copied")
  const handleToggleVisibleTooltip = useCallback(() => {
    setVisibleTooltip(!visibleTooltip)
  }, [visibleTooltip])

  const handleClickBtn = useCallback(() => {
    setCopied(true)
    setTimeout(() => {
      setVisibleTooltip(false)
      setCopied(false)
    }, delayHide)
  }, [])

  return (
    <CopyToClipboard text={copyText}>
      <div className={clsx(`copy-item ${className}`)}>
        <Tooltip
          placement={placement}
          overlay={
            <span className="text-body-label">
              {isCopied ? _copiedTip : _copyTip}
            </span>
          }
          align={{ offset }}
          overlayClassName="tooltip-simple"
          trigger={["hover"]}
          open={visibleTooltip}
          onOpenChange={handleToggleVisibleTooltip}
          arrow={isArrow}
        >
          <div className="copy-item-action" onClick={handleClickBtn}>
            {copyBtn || (
              <div
                className={clsx("copy-item-btn", {
                  "copy-item-btnicon": isBtnIcon,
                })}
                role="button"
              >
                {icon || <Icon name="Copy" />}
              </div>
            )}
          </div>
        </Tooltip>
        {!!label && (
          <div
            className={clsx("copy-item-label", {
              copied: isCopied,
            })}
          >
            {label}
          </div>
        )}
      </div>
    </CopyToClipboard>
  )
}

export { CopyItem }
