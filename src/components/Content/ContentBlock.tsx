import clsx from 'clsx';

interface IProps {
  className?: string;
  children: React.ReactNode;
  image?: React.ReactNode;
  customTitle?: React.ReactNode;
  title?: React.ReactNode | string;
  isReverse?: boolean;
  isImageShadow?: boolean;
  type?: 'default' | 'info' | 'custom';
  shadow?: 'default' | 'light';
}

const ContentBlock = ({
  title,
  customTitle,
  image,
  children,
  className,
  isReverse,
  isImageShadow = true,
  shadow = 'default',
  type = 'default'
}: IProps) => {
  return (
    <div
      className={clsx('content-block', `content-block--${type}`, className, {
        'is-reverse': isReverse,
      })}
    >
      {!!image && (
        <div className="content-block__col-media">
          <div
            className={clsx('content-block__media', {
              'is-shadow': isImageShadow,
              [`shadow-${shadow}`]: isImageShadow && !!shadow,
            })}
          >
            {image}
          </div>
        </div>
      )}
      <div className="content-block__col-body">
        {!!title && <div className="content-block__title">{title}</div>}
        {customTitle}
        {children}
      </div>
    </div>
  );
};

export { ContentBlock };
