'use client';
import { useState, useEffect } from 'react';
import { MODALS } from '@/config';
import { IPsychologist } from '@/types';
import { isArray, keyBy } from '@/utils/helpers';
import { clientFetch } from '@/utils/service';
import { useAuth } from '@/hooks/useAuth';
import { useModals } from '@/hooks/useModals';
import { useLang } from '@/hooks/useLang';
import { Button } from '@/components/Button';
import { ReviewsAddModal } from '@/views/ReviewsAddModal';

interface IProps {
  btnAddText: string;
}

export const ReviewsAddBlock = ({ btnAddText }: IProps) => {
  const { isAuth } = useAuth();
  const { modalOpen } = useModals();
  const handleClickOpen = () => {
    modalOpen(MODALS.addReviews, {
      isOpen: true,
      psychologists,
      psychologistsOptions,
    });
  };

  const { lang } = useLang();
  const [isLoadingPsychologists, toggleLoadingPsychologists] = useState<any>();
  const [psychologists, setPsychologists] = useState<any>();
  const [psychologistsOptions, setPsychologistsOptions] = useState<
    { label: string; value: string }[]
  >([]);
  useEffect(() => {
    const fetchPsy = async () => {
      toggleLoadingPsychologists(true);
      clientFetch(`/psychologists`, { lang }).then((res: any) => {
        if (res && isArray(res)) {
          const psychologistsOptions = res?.map(({ id, fullname }) => ({
            label: fullname,
            value: id,
          }));
          const psychologistsById = keyBy(res, (e: IPsychologist) => e.id);
          setPsychologists(psychologistsById);
          setPsychologistsOptions(psychologistsOptions);
          toggleLoadingPsychologists(false);
        }
      });
    };

    if (isAuth && psychologistsOptions?.length === 0) {
      fetchPsy();
    }
  }, [isAuth, psychologistsOptions, lang]);

  if (!isAuth) return null;
  return (
    <div className="reviews-add-block">
      <Button type="primary-old" size="sm" onClick={handleClickOpen}>
        {btnAddText}
      </Button>
      <ReviewsAddModal
        isLoadingPsychologists={isLoadingPsychologists}
        psychologists={psychologists}
        psychologistsOptions={psychologistsOptions}
      />
    </div>
  );
};
