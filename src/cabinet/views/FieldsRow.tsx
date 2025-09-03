import { FC } from 'react';
import clsx from 'clsx';

const defaultFieldsRowGutter = 12;
const FieldsRowGutters = [12, 16, 18, 24] as const;
type FieldsRowGuttersType = (typeof FieldsRowGutters)[number];
interface IFieldsRow {
  cols?: number;
  gutter?: FieldsRowGuttersType;
  isLastRow?: boolean;
  className?: string;
  children: React.ReactNode;
}
export const FieldsRow: FC<IFieldsRow> = ({
  cols = 2,
  children,
  gutter = defaultFieldsRowGutter,
  isLastRow,
  className = '',
  ...props
}) => {
  const _gutter = FieldsRowGutters.includes(gutter)
    ? gutter
    : defaultFieldsRowGutter;
  return (
    <div
      className={clsx(
        `fields-row cols-${cols} fields-row-gutter-${_gutter} ${className}`,
        {
          'fields-row--last': isLastRow,
        }
      )}
      {...props}
    >
      {children}
    </div>
  );
};
