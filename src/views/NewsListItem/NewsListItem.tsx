import Image from 'next/image';
import { ROUTES } from '@/config';
import { getTranslationServer } from '@/config/i18n';
import { LangType } from '@/config/i18n/settings';
import { INews } from '@/types/NewsTypes';
import { Button } from '@/components/Button';
import './newsListItem.scss';

interface IProps {
  news: INews;
  lang: LangType;
}

const NewsListItem = async ({ news, lang }: IProps) => {
  const { preview, title, description, slug } = news || {};
  const { t } = await getTranslationServer(lang, ['site']);

  return (
    <div className="news-list-item">
      <div className="news-list-item__inner">
        <div className="news-list-item__media">
          {!!preview?.thumbnail && (
            <Image
              src={preview?.thumbnail}
              alt={title}
              fill
              objectFit="cover"
              quality={90}
            />
          )}
        </div>
        <div className="news-list-item__content">
          {!!title && <h3 className="news-list-item__title">{title}</h3>}
          {!!description && (
            <h5 className="news-list-item__text">{description}</h5>
          )}
          <div className="news-list-item__footer">
            <Button
              type="link"
              href={ROUTES.newsSingle(slug)}
              className="news-list-item__btn-more"
            >
              {t('site.more_detail')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { NewsListItem };
