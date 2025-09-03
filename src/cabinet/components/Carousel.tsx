'use client'
import { cloneElement, useState } from "react"
import clsx from "clsx"
import { Button } from "@/components/Button"
import { useLang } from "@/hooks/useLang"
import { useTranslationClient } from "@/config/i18n/client"

interface IProps {
  className?: string
  children?: React.ReactNode
  component: React.ReactElement
  items: Array<any>
}

const Carousel = ({ className = "", items, component }: IProps) => {
  const count = items?.length
  const [activeSlide, setActiveSlide] = useState<number>(0)
  const handleClickPrev = () =>
    setActiveSlide((value) => (+value === 0 ? count - 1 : value - 1))
  const handleClickNext = () =>
    setActiveSlide((value) => (+value === count - 1 ? 0 : value + 1))
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['cabinet']);

  return (
    <div className={clsx(`carousel ${className}`, {})}>
      <div className="carousel-items">
        {items?.map((item, idx) => (
          <div
            key={idx}
            className={clsx("carousel-item", {
              visible: +activeSlide === +idx,
            })}
          >
            {cloneElement(component, {
              ...item,
              key: item.id,
            })}
          </div>
        ))}
      </div>
      <div className="carousel-footer">
        <div className="carousel-actions">
          <Button
            onClick={handleClickPrev}
            className="carousel-btn carousel-btn-prev"
            disabled={count <= 1}
          />
          <Button
            onClick={handleClickNext}
            className="carousel-btn carousel-btn-next"
            disabled={count <= 1}
          />
        </div>
        <div className="carousel-info">
          {t("cabinet.displayed")} {activeSlide + 1} {t("cabinet.with")} {count}
        </div>
      </div>
    </div>
  )
}

export { Carousel }
