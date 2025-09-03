import Image from 'next/image';
import s from './teamCards.module.scss';

interface ITeamCard {
  image: string;
  name: string;
  text: string;
}
interface ITeamCards {
  className?: string;
  items?: ITeamCard[];
}

const TeamCard = ({ image, name, text }: ITeamCard) => (
  <div className={s.item}>
    <div className={s.item_media}>
      <Image src={image} alt={name} fill />
    </div>
    <div className={s.item_content}>
      <strong>{name}</strong>
      {text}
    </div>
  </div>
);

const TeamCards = ({ items }: ITeamCards) => {
  return (
    <div className={s.items}>
      {items?.length &&
        items.map((item: ITeamCard, idx: number) => (
          <TeamCard key={idx} {...item} />
        ))}
    </div>
  );
};

export { TeamCards };
