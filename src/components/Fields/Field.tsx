'use client'
import { FocusEventHandler, useState, useMemo } from "react";
import clsx from "clsx";
import React from "react";

// eslint-disable-next-line react/display-name
const Field = React.forwardRef(
  (
    {
      placeholder,
      disabled,
      value = undefined,
      name,
      type = 'text',
      size = 'md',
      prefix,
      suffix,
      addonBefore,
      addonAfter,
      className,
      onInput,
      onChange,
      onKeyDown,
      onKeyUp,
      onKeyPress,
      onBlur,
      onFocus,
      autosize,
      meta,
      tabIndex = 0,
      maxLength,
      autoComplete,
      component = 'input',
      tag,
      options,
      ...props
    }: any,
    ref
  ) => {
    const isTextarea = tag === 'textarea';
    const isSelect = tag === 'select';
    const error = meta?.error || meta?.submitError;
    const hasError = !!error && meta?.touched && meta?.submitFailed;
    const [inputCls, setInputCls] = useState<string>('');
    const fieldCls = useMemo(
      () =>
        clsx(`field field-${size}`, inputCls, {
          'is-disabled': disabled,
          'is-autosize': autosize,
          'has-error': hasError,
          [`field-${tag}`]: typeof tag === 'string',
        }),
      [inputCls, autosize, disabled, size, tag, hasError]
    );
    const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
      setInputCls('focus');
      typeof onFocus === 'function' && onFocus(e);
    };
    const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
      setInputCls((val) => val.replace('focus', ''));
      typeof onBlur === 'function' && onBlur(e);
    };
    const _type = isTextarea ? undefined : type;
    const TagName = component;

    return (
      <div
        className={clsx('field-wrapper', className, {
          'has-addon-before': !!addonBefore,
          'has-addon-after': !!addonAfter,
        })}
      >
        {!!addonBefore && (
          <div className="field-addon-before">{addonBefore}</div>
        )}
        <div className={fieldCls}>
          {!!prefix && <span className="field-prefix">{prefix}</span>}
          <TagName
            placeholder={placeholder}
            name={name}
            type={_type}
            disabled={disabled}
            value={value}
            onInput={onInput}
            onChange={onChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onKeyPress={onKeyPress}
            tabIndex={tabIndex}
            maxLength={maxLength}
            autoComplete={autoComplete}
            ref={ref}
            options={!!isSelect ? options : undefined}
            {...props}
          />
          {!!suffix && <span className="field-suffix">{suffix}</span>}
        </div>
        {!!addonAfter && <div className="field-addon-after">{addonAfter}</div>}
      </div>
    );
  }
);

export { Field };