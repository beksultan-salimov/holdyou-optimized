import clsx from 'clsx';
import { getI18n } from 'react-i18next';

interface IProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  children?: any;
  info?: React.ReactNode;
  meta?: any;
  label?: React.ReactNode;
  name?: string;
  placeholder?: string;
  component?: any;
  refs?: any;
  autosize?: boolean;
  onChange?: (val: any) => void;
  notFoundContent?: React.ReactNode;
  input?: {
    checked?: boolean;
    name?: string;
    value?: any;
    onBlur?: any;
    onChange?: any;
    onFocus?: any;
    type?: any
  };
}

export const createField =
  (Component: any, componentType?: string) =>
  // eslint-disable-next-line react/display-name
  ({
    children,
    size = 'md',
    className = '',
    input,
    info,
    meta,
    label,
    autosize,
    onChange,
    refs,
    notFoundContent,
    ...rest
  }: IProps) => {
    const specific: any = {}
    const error = meta?.error || meta.submitError;
    const hasFooter = !!info || !!error;
    const wrapperCls = clsx(`form-field`, className, {
      [`form-field-${size}`]: !autosize,
      "form-field-hidden": input?.type === 'hidden'
    });

    input = componentType === 'select' ? { ...input, value: input?.value === '' ? undefined : input?.value } : input;
    if (componentType === 'select') {
      specific['notFoundContent'] = notFoundContent || getI18n().t("site.no_data");
    }
    // if (input?.name === 'psychologist') {
    //   console.group('createField');
    //   console.log('input', input);
    //   console.log('rest', rest);
    //   console.log('meta', meta);
    //   console.log('onChange', onChange, typeof onChange);
    //   console.log('specific', specific);
    //   console.groupEnd();
    // }
    return (
      <div className={wrapperCls}>
        {!!label && <div className="form-field__label">{label}</div>}
        <Component
          size={size}
          autosize={autosize}
          meta={meta}
          ref={refs}
          {...specific}
          {...rest}
          {...input}
          onChange={(value: any) => {
            if (typeof onChange === 'function') {
              onChange(value);
            }
            if (typeof input?.onChange === 'function') {
              input?.onChange(value);
            }
          }}
        >
          {children}
        </Component>
        {!!hasFooter && (
          <div className="form-field__footer">
            {!!info && <div className="form-field__info">{info}</div>}
            {!!error && meta.touched && meta.submitFailed && (
              <div className="form-field__error">{error}</div>
            )}
          </div>
        )}
      </div>
    );
  };
