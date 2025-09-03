'use client';
import Image from 'next/image';
import clsx from 'clsx';
import { useTranslationClient } from '@/config/i18n/client';
import { IPshAvatarGroup } from '@/types/BaseTypes';
import { useLang } from '@/hooks/useLang';
import { Title } from '@/components/Title';
import { PshAvatarsGroup } from '@/components/PshAvatarsGroup';
import headerLogoImg from '@/static/img/headerLogo.svg';
import './junior-board.scss';

interface IProps {
  className?: string;
  avatars?: IPshAvatarGroup[];
}

const JuniorBoard = ({ className, avatars }: IProps) => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);

  return (
    <div className={clsx('junior-board', className)}>
      <div className="junior-board__logo">
        <Image
          src={headerLogoImg}
          alt={t('site.logo_alt')}
          height={49}
          width={60}
        />
      </div>
      <div className="junior-board__inner">
        <Title tag="h3" isCenter size="lg" className="junior-board__title">
          <span
            dangerouslySetInnerHTML={{ __html: t('site.junior_board.title') }}
          />
        </Title>
        <div
          className="junior-board__description"
          dangerouslySetInnerHTML={{ __html: t('site.junior_board.subtitle') }}
        />
        {!!avatars && <PshAvatarsGroup items={avatars} size={36} />}
        <div
          className="junior-board__info"
          dangerouslySetInnerHTML={{ __html: t('site.junior_board.info') }}
        />
      </div>
      <span className="junior-board__btn-next" />
    </div>
  );
};

export { JuniorBoard };
