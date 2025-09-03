import { useEffect } from 'react';
import { Section } from '@/components/Section';
import { fetchSpecialOffer, getSpecialOffer } from '@/store/specialOfferSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { SpecialOffer } from '../SpecialOffer';
import './app-panel-top.scss';

const AppPanelTop = () => {
  const specialOffer = useAppSelector(getSpecialOffer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSpecialOffer());
  }, [dispatch]);

  if (!specialOffer) return null;
  return (
    <Section className="app-panel-top">
      <SpecialOffer data={specialOffer!} />
    </Section>
  );
};

export { AppPanelTop };
