'use client';
import { useCallback } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { MODALS } from '@/config';
import { useModals } from '@/hooks/useModals';
import { isEmpty } from '@/utils/helpers';

interface IGalleryItem {
  thumbnail: string;
  original: string;
}
interface IProps {
  items: IGalleryItem[];
  className?: string;
}

const ImagesList = ({ className, items }: IProps) => {
  const { modalOpen } = useModals();
  const handleClickOpenModal = useCallback(
    (item: IGalleryItem, idx: number) => {
      modalOpen(MODALS.gallery, {
        isOpen: true,
        items: [item],
        initialSlide: idx,
      });
    },
    [modalOpen]
  );

  if (isEmpty(items)) return null;
  return (
    <div className={clsx('images-list', className)}>
      {items?.map((item, idx: number) => (
        <div
          className="images-list-item"
          onClick={() => handleClickOpenModal(item, idx)}
          key={idx}
        >
          <Image
            src={item?.thumbnail}
            height={100}
            width={100}
            loading="lazy"
            alt=""
          />
        </div>
      ))}
    </div>
  );
};

export { ImagesList };
