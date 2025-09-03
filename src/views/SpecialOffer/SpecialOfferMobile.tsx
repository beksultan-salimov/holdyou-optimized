import { getSpecialOffer } from '@/store/specialOfferSlice';
import { useAppSelector } from '@/hooks/useStore';
import { SpecialOffer } from './SpecialOffer';

interface IProps {
  className?: string;
}
const SpecialOfferMobile = ({ className }: IProps) => {
  const specialOffer = useAppSelector(getSpecialOffer);

  if (!specialOffer) return null;
  return (
    <SpecialOffer data={specialOffer!} className={className} />
  );
};

export { SpecialOfferMobile };
