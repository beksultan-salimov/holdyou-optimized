import './emptyCard.scss'

interface IProps {
  className?: string;
  image?: React.ReactNode;
  text?: React.ReactNode;
  children?: React.ReactNode;
  extra?: React.ReactNode;
  style?: object;
}

const EmptyCard = ({ image, text, className = "", extra, children, ...props }: IProps) => {
  return (
    <div className={`empty-card ${className}`} {...props}>
      {!!image && <div className="empty-card-image">{image}</div>}
      {!!text && <div className="empty-card-text">{text}</div>}
      {!!children && (
        <div className="empty-card-text">{children}</div>
      )}
      {extra}
    </div>
  );
}

export { EmptyCard }
