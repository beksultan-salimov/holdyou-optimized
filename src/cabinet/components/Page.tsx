'use client'
import { Pagination } from 'antd';
import { Title } from '@/components/Title';
import { useLang } from '@/hooks/useLang';
import { useTranslationClient } from '@/config/i18n/client';

interface IProps {
  slug: string
  title?: React.ReactNode
  customTitle?: React.ReactNode
  className?: string
  children?: any
  pagination?: {
    size?: number
    current?: number
    total?: number
    onChange?: (p: number) => void
    info?: string
    showInfo?: boolean
    hideOnSinglePage?: boolean
  }
  modals?: React.ReactNode
}

const Page = ({ slug = '', title, customTitle, className = '', children, pagination, modals }: IProps) => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['cabinet']);
  const pageSize = Number(pagination?.size || 10)
  const currentPage = Number(pagination?.current)

  return (
    <div className={`page page-${slug} ${className}`}>
      {customTitle}
      {!!title && (
        <div className="page-header">{!!title && <Title>{title}</Title>}</div>
      )}
      {children}
      {!!pagination && (
        <div className="page-pagination">
          <Pagination
            current={currentPage}
            total={pagination?.total}
            pageSize={pageSize}
            showSizeChanger={false}
            showTotal={(total, range) => {
              return (
                <>
                  {/* {(pagination?.showInfo || !!pagination?.info) && (
                    <>
                      {t("cabinet.displayed")} {pageSize * currentPage - pageSize + 1}{pageSize * currentPage === total ? '' : `-${pageSize * currentPage < total ? pageSize * currentPage : total}`}{' '}
                      {t("cabinet.with")} {total} {pagination?.info}
                    </>
                  )} */}
                </>
              )
            }}
            onChange={pagination?.onChange}
            hideOnSinglePage={pagination?.hideOnSinglePage}
          />
        </div>
      )}
      {modals}
    </div>
  )
}

export { Page }
