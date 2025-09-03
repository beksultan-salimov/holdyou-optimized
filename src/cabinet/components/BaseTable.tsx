import { Empty, Table } from "antd"
import { isEmpty } from "@/utils/helpers"
import { TableProps } from "@/cabinet/types"
import { Spinner } from "@/components/Spinner"

interface IProps extends Omit<TableProps<any>, "title"> {
  title?: string | React.ReactNode
  extraControls?: React.ReactNode
  emptyText?: React.ReactNode
  emptyImage?: React.ReactNode
  className?: string
}

const BaseTable = ({
  dataSource,
  columns,
  title,
  pagination = false,
  extraControls,
  rowKey = "id",
  loading,
  // scroll = { x: 860 },
  emptyText = '',
  emptyImage = Empty.PRESENTED_IMAGE_SIMPLE,
  ...props
}: IProps) => {
  const scroll = !isEmpty(dataSource) ? {x: "max-content"} : {}

  return (
    <div className="base-table">
      {(!!title || extraControls) && (
        <div className="base-table-header">
          {!!title && <div className="base-table-title">{title}</div>}
          {!!extraControls && (
            <div className="base-table-controls">{extraControls}</div>
          )}
        </div>
      )}

      <div className="base-table-body">
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={pagination}
          rowKey={rowKey}
          loading={!!loading ? { indicator: <Spinner /> } : false}
          locale={{
            emptyText: <Empty description={emptyText} image={emptyImage} />,
          }}
          scroll={scroll}
          {...props}
        />
      </div>
    </div>
  );
}

export { BaseTable }
