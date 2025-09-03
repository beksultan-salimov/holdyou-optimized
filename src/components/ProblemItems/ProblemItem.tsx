import { Link } from '@/components/Link';
import Image from 'next/image';
import { ISinglePage } from '@/types/SinglePageTypes';
import { generatePagePreviewLink, makeCls } from '@/utils/helpers';
import s from './problemItem.module.scss';

interface IProps {
  className?: string;
  image?: string;
  link?: string;
  title?: string;
  data: ISinglePage
}

const ProblemItem = ({ data, className }: IProps) => {
  const { preview, slug, locale, title = '', template } = data || {};
  const link = generatePagePreviewLink({ locale, slug, template });
  return (
    <div className={makeCls(s, [s.root, className])}>
      <div className={s.media}>
        <Link href={link} isLang={false}>
          {!!preview?.thumbnail && (
            <Image src={preview?.thumbnail} title={title} alt={title} loading="lazy" fill />
          )}
        </Link>
      </div>
      <div className={s.header}>
        <Link href={link} isLang={false}>
          <h3 className={s.title}>{title}</h3>
        </Link>
      </div>
    </div>
  );
};

export { ProblemItem };
