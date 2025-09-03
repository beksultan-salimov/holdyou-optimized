import clsx from 'clsx';
import './hero.scss'
interface IProps {
  image?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

const Hero = ({
  image,
  children,
  className,
}: IProps) => {
  return (
    <div className={clsx("hero", className)}>
      <div className="hero__content">{children}</div>
      <div className="hero__media">{image}</div>
    </div>
  );
};

const HeroImage = ({ children }: { children: React.ReactNode }) => {
  return <div className="hero-image">{children}</div>;
};

export { Hero, HeroImage };
