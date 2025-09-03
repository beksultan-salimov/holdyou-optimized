import { memo } from 'react';
import RcCheckbox from 'rc-checkbox';
import clsx from 'clsx';
import { pick } from '@/utils/helpers';

const Checkbox = memo(function Checkbox({ children, checked, value, meta, ...props }: any) {
  const params = pick(props, [
    'name',
    'disabled',
    'size',
    'onChange',
    'onFocus',
    'onBlur',
  ]);
  const error = meta?.error || meta?.submitError;
  const hasError = !!error && meta?.touched;

  return (
    <label className={clsx("rc-checkbox-wrapper", {
      'has-error': hasError,
    })}>
      <RcCheckbox checked={checked || value} {...params} />
      {!!children && (
        <span className="rc-checkbox-content">
          <span>{children}</span>
        </span>
      )}
    </label>
  );
});

export { Checkbox };
