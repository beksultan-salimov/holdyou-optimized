'use client'
import { getDate } from '@/utils/helpers';
import { Title } from '@/components/Title';
import { Widget } from '@/components/Widget';
import { BaseTable } from '@/cabinet/components/BaseTable';
import { CopyItem } from '@/cabinet/components/CopyItem';
import { ColumnsType } from '@/cabinet/types';
import { useLang } from '@/hooks/useLang';
import { useTranslationClient } from '@/config/i18n/client';

interface IProps {
  data: Array<any>
  className?: string
}

const PromocodesTable = ({ data, className = '' }: IProps) => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['cabinet']);
  const columns: ColumnsType<any> = [
    {
      title: t("cabinet.code"),
      key: "code",
      render: ({ code }) => (
        <CopyItem
          copyText={code}
          label={code}
          isBtnIcon
          copyTip={t("cabinet.copy_code")}
          copiedTip={t("cabinet.copied_code")}
          className="copy-item-promocode"
        />
      ),
    },
    {
      title: t("cabinet.type_consultation"),
      dataIndex: "type",
      key: "type",
    },
    {
      title: t("cabinet.duration"),
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: t("cabinet.available_to"),
      key: "expired_at",
      render: ({ expired_at }) => getDate(expired_at, "DD.MM.YY"),
    },
  ]

  return (
    <Widget
      header={<Title>{t("cabinet.promocodes.title")}</Title>}
      className={`promocodes-table ${className}`}
      isBorder={false}
    >
      <BaseTable columns={columns} dataSource={data} />
    </Widget>
  )
}

export default PromocodesTable;