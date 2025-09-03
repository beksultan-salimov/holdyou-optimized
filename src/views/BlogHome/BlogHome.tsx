'use client';
import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { ROUTES } from '@/config';
import { useTranslationClient } from '@/config/i18n/client';
import { get, isEmpty } from '@/utils/helpers'
import { useLang } from '@/hooks/useLang';
import { Button } from '@/components/Button';
import { Link } from '@/components/Link';
import './blog-home.scss';

interface IBlogPost {
  id: number;
  title: string;
  preview?: { thumbnail: string; original: string };
  slug: string;
  description: string;
}
interface IProps {
  items?: IBlogPost[];
  ids?: number[];
  dic?: IBlogPost;
  countVisible?: number;
}

const BlogHome = ({ items: _items, ids, dic, countVisible = 3 }: IProps) => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);
  const itemsRef = useRef<HTMLDivElement>(null);
  const items = useMemo(
    () =>
      !!_items && _items?.length > 0
        ? _items
        : !isEmpty(dic)
        ? ids?.filter((_id) => !!get(dic, [_id]))?.map((_id) => get(dic, [_id]))
        : [],
    [_items, ids, dic]
  );
  const [isVisibleAll, setIsVisibleAll] = useState(false);
  const handleClickVisibleAll = () => {
    setIsVisibleAll(true);
    setTimeout(() => {
      if (itemsRef.current) {
        itemsRef.current.scrollBy({ left: 600, behavior: 'smooth' });
      }
    }, 250);
  };

  if (!items) return null;

  return (
    <div className="blog-home">
      <div className={clsx('blog-home-items', { 'visible-all': isVisibleAll })} ref={itemsRef}>
        {items?.map(({ id, slug, title, description, preview }, idx) => (
          <div
            className={clsx('blog-home-item', {
              visible: idx + 1 <= countVisible || isVisibleAll,
            })}
            key={id}
          >
            <div className="blog-home-card">
              <div className="blog-home-card__media">
                <Image
                  src={preview?.thumbnail}
                  alt={title}
                  loading="lazy"
                  width={700}
                  height={292}
                  quality={100}
                />
              </div>
              <div className="blog-home-card__body">
                <Link
                  href={ROUTES.newsSingle(slug)}
                  className="blog-home-card__title"
                >
                  {title}
                </Link>
                <div className="blog-home-card__text">{description}</div>
                <Button
                  href={ROUTES.newsSingle(slug)}
                  type="default"
                  className="blog-home-card__btn-cta"
                  weight="bold"
                >
                  {t('site.blog_home_card_btn')}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="blog-home-footer">
        {isVisibleAll || items?.length <= countVisible ? (
          <Button
            type="primary-old"
            weight="bold"
            shadow
            size="sm"
            href={ROUTES.news}
          >
            {t('site.blog_home_btn_all')}
          </Button>
        ) : (
          <Button
            type="primary-old"
            weight="bold"
            shadow
            size="sm"
            onClick={handleClickVisibleAll}
          >
            {t('site.blog_home_btn_more')}
          </Button>
        )}
      </div>
    </div>
  );
};

export { BlogHome };
