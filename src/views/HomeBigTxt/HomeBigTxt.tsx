import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { LangType } from '@/config/i18n/settings';
import './home-bigtxt.scss';

const ContentUk = dynamic(() => import('./_uk'), {
  ssr: true,
});
const ContentRu = dynamic(() => import('./_ru'), {
  ssr: true,
});

interface IProps {
  className?: string;
  lang: LangType;
}

const HomeBigTxt = ({ className, lang }: IProps) => {
  return (
    <div className={clsx('bigtxt', className)}>
      {lang === 'uk' && <ContentUk />}
      {lang === 'ru' && <ContentRu />}
    </div>
  );
};

export { HomeBigTxt };
