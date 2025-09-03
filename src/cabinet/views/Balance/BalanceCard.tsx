'use client'
import classNames from "classnames"
import { Spinner } from '@/components/Spinner';
import { Icon } from "@/components/Icon"
import { useLang } from "@/hooks/useLang";
import { useTranslationClient } from "@/config/i18n/client";

interface IProps {
  title?: React.ReactNode
  amount?: number | React.ReactNode
  time?: number
  isLoading?: boolean
}

const BalanceCard = ({ title, amount = 0, time = 0, isLoading }: IProps) => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['cabinet']);

  return (
    <div
      className={classNames("balance-card", {
        "balance-card-active": !!time && +time > 0,
      })}
    >
      <div className="balance-card-inner">
        {!!title && (
          <div className="balance-card-header">
            <div className="balance-card-title">{title}</div>
          </div>
        )}
        <div className="balance-card-body">
          {isLoading ? (
            <Spinner size={28} />
          ) : (
            <>
              <div className="balance-card-amount">{amount}</div>
              <div className="balance-card-time">
                <Icon name="ClockCircle" /> {time} {t("cabinet.minutes_short")}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default BalanceCard
