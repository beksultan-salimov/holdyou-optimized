import clsx from 'clsx';
import './whileWorking.scss';

interface IProps {
  image?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const WhileWorking = ({ image, children, className }: IProps) => {
  return (
    <div className={clsx('while-working', className)}>
      {!!image && <div className={'while-working__image'}>{image}</div>}
      <div className={'while-working__content'}>{children}</div>
    </div>
  );
};

export { WhileWorking };
