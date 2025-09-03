'use client'
import { get } from "@/utils/helpers"
import { Widget } from '@/components/Widget';
import BalanceCard from "./BalanceCard"
import { useBalance } from "./useBalance"
import { ServicesForBalance } from "@/types"

interface IProps {
  className?: string
  title?: React.ReactNode
  header?: React.ReactNode
  actions?: React.ReactNode
}

const Balance = ({ className = "", title, header, actions }: IProps) => {
  const { t, consultations, isLoaded } = useBalance()

  return (
    <Widget
      className={`widget-balance ${className}`}
      title={title}
      header={header}
      actions={actions}
      isBorder={false}
    >
      <div className="widget-balance-inner">
        {ServicesForBalance?.map((type) => (
          <div className="widget-balance-item" key={type}>
            <BalanceCard
              key={type}
              title={t(`cabinet.balances.${type}`)}
              amount={get(consultations, [type, "count"], 0)}
              time={get(consultations, [type, "duration_total"], 0)}
              isLoading={!isLoaded}
            />
          </div>
        ))}
      </div>
    </Widget>
  )
}

export default Balance
