import React, { useMemo } from "react"
import { modalClose } from "@/store/uiSlice"
import { get } from "@/utils/helpers"
import { useAppDispatch, useAppSelector } from "@/hooks/useStore"
import { Icon } from "@/components/Icon"
import Modal from 'rc-dialog';
import clsx from "clsx"


interface IProps {
  id: string;
  children?: React.ReactNode;
  content?: React.ReactNode | string;
  title?: React.ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  footer?: string | React.ReactNode | null;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xlg' | 'full';
  maskClosable?: boolean;
  destroyOnClose?: boolean;
  closable?: boolean;
  isCenter?: boolean;
  className?: string;
  wrapClassName?: string;
  width?: number | string;
  type?: 'default' | 'custom' | 'video' | 'gallery';
  keyboard?: boolean;
}

const BaseModal = ({
  id,
  title,
  onOk,
  onCancel,
  onClose,
  footer = null,
  children,
  content,
  size = 'sm',
  maskClosable = true,
  destroyOnClose = true,
  className = '',
  width,
  closable = true,
  type = 'default',
  wrapClassName = '',
  isCenter,
  keyboard,
  ...rest
}: IProps) => {
  const dispatch = useAppDispatch();
  const openModals = useAppSelector((state) =>
    get(state, ['ui', 'openModals'])
  );
  const isOpen = openModals.includes(id);
  const _width = useMemo(() => {
    const sizeMap = {
      xs: 480,
      sm: 600,
      md: 800,
      lg: 960,
      xlg: 1030,
      full: '96vw',
    };

    return width || sizeMap[size];
  }, [width, size]);

  const cls = className + ' ' + id + ` modal-type-${type}`;

  const handleOk = () => {
    onOk && onOk();
    dispatch(modalClose(id));
  };

  const handleCancel = () => {
    onCancel && onCancel();
    onClose && onClose();
    dispatch(modalClose(id));
  };
  return (
    <Modal
      title={title}
      visible={isOpen}
      // onOk={handleOk}
      // onCancel={handleCancel}
      // centered
      onClose={handleCancel}
      footer={footer}
      destroyOnClose={destroyOnClose}
      closeIcon={<Icon name="Close" />}
      maskClosable={maskClosable}
      closable={closable}
      className={cls}
      width={_width}
      classNames={{wrapper: clsx(`cabinet ${wrapClassName}`, { 'is-center': isCenter })}}
      animation="zoom"
      maskAnimation="fade"
      keyboard={keyboard}
      {...rest}
    >
      {children}
    </Modal>
  );
};

export { BaseModal };
