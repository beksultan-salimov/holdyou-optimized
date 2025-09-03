import './partners.scss';

interface IProps {
  items: any[];
  className?: string;
}

const Partners = ({ items, className = '' }: IProps) => {
  if (!items) return null;

  return (
    <div className={`partners ${className}`}>
      <ul className="partners__items">
        {items.map(({ image, name, link }: any, idx: number) => (
          <li key={idx} className="partners__item">
            <a href={link} target="_blank" rel="noopener nofollow">
              <img loading="lazy" src={image} alt={name} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Partners };
