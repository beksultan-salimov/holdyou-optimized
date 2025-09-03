'use client';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import AnimateHeight from 'react-animate-height';
import { useTranslationClient } from '@/config/i18n/client';
import { useLang } from '@/hooks/useLang';
import { Button } from '../Button';
import s from './faq.module.scss';
import { splitIntoRows } from '@/utils/helpers';

type itemType = 'default' | 'simple';
interface IFAQ {
  items?: any[];
  title?: React.ReactNode;
  limitVisibleItems?: number;
  className?: string;
  type?: itemType;
  btnShowText?: string;
  btnHideText?: string;
  defaultActiveKeys?: number[];
}
interface IFAQItem {
  title: string;
  text: string;
  footer: React.ReactNode;
  type?: 'itemType';
  defaultActiveKeys?: number[];
  idx: number;
}

const FAQItem = ({ title, text, footer, type, defaultActiveKeys, idx }: IFAQItem) => {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive((value) => !value);
  };
  useEffect(() => {
    setIsActive(!!defaultActiveKeys?.includes(idx));
  }, [defaultActiveKeys, idx]);

  return (
    <div
      className={clsx(s.faqItem, {
        [s.openFaqItem]: isActive,
        [s[`${type}`]]: type,
      })}
    >
      <div
        className={s.titleFaq}
        dangerouslySetInnerHTML={{ __html: title }}
        onClick={handleClick}
      />
      <AnimateHeight duration={400} height={isActive ? 'auto' : 0}>
        <div className={s.contentFaq}>
          <div
            className={s.bodyFaq}
            dangerouslySetInnerHTML={{ __html: splitIntoRows(text) }}
          />
          {!!footer && (
            <div className={s.footerFaq}>{footer}</div>
          )}
        </div>
      </AnimateHeight>
    </div>
  );
};

const FAQ = ({
  items,
  limitVisibleItems,
  className,
  type = 'default',
  btnShowText,
  btnHideText,
  defaultActiveKeys,
}: IFAQ) => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);
  const haslimitVisibleItems =
    limitVisibleItems && !!items && items.length > limitVisibleItems;
  const [isVisibleMoreItems, setIsVisibleMoreItems] = useState(false);
  const handleClickVisibleMoreItems = () => {
    setIsVisibleMoreItems((value) => !value);
  };

  let mainItems = items,
    moreItems = [];
  if (haslimitVisibleItems) {
    mainItems = items?.slice(0, limitVisibleItems);
    moreItems = items?.slice(-(items?.length - limitVisibleItems));
  }

  if (!items) return null;

  return (
    <>
      <div className={clsx('faq', { className })}>
        {mainItems?.map((item: any, idx: number) => (
          <FAQItem
            {...item}
            defaultActiveKeys={defaultActiveKeys}
            key={idx}
            type={type}
            idx={idx}
          />
        ))}
        {!!moreItems && !!limitVisibleItems && (
          <AnimateHeight
            duration={700}
            height={isVisibleMoreItems ? 'auto' : 0}
          >
            <div className="faq-more-container">
              {moreItems?.map((item: any, _idx: number) => (
                <FAQItem
                  {...item}
                  key={Number(limitVisibleItems) + _idx}
                  type={type}
                  idx={_idx + limitVisibleItems}
                  defaultActiveKeys={defaultActiveKeys}
                />
              ))}
            </div>
          </AnimateHeight>
        )}
      </div>
      {!!haslimitVisibleItems && (
        <Button
          type="primary-old"
          weight="bold"
          className={s.btn_more}
          onClick={handleClickVisibleMoreItems}
          shadow
        >
          {isVisibleMoreItems
            ? btnHideText || t('site.faq.hide')
            : btnShowText || t('site.faq.more')}
        </Button>
      )}
    </>
  );
};

export { FAQ };
