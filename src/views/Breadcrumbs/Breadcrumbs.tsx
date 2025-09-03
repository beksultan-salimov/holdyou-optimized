'use client';
import clsx from "clsx";
import { ROUTES } from "@/config";
import { Link } from "@/components/Link";
import { useLang } from '@/hooks/useLang';
import { useTranslationClient } from "@/config/i18n/client";

interface IItem {
  label: string;
  link?: string;
  position?: string;
  className?: string;
  isLink?: boolean;
}
interface IProps {
  items: IItem[];
  isHome?: boolean;
  isLastLink?: boolean;
}

const BreadcrumbsItem = ({ link, label, position, isLink, className }: IItem) => {
  const name = <span itemProp="name">{label}</span>;
  return (
    <li
      itemProp="itemListElement"
      itemScope
      itemType="http://schema.org/ListItem"
      className={clsx('breadcrumbs-item', className)}
    >
      {isLink && typeof link !== 'undefined' ? (
        <Link itemProp="item" href={link}>
          {name}
        </Link>
      ) : (
        name
      )}
      <meta itemProp="position" content={position} />
    </li>
  );
};

const Breadcrumbs = ({ items, isHome = true, isLastLink = true }: IProps) => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);
  return (
    <nav className="breadcrumbs">
      <ul
        itemScope
        itemType="http://schema.org/BreadcrumbList"
        className="breadcrumbs-list"
      >
        {!!isHome && (
          <BreadcrumbsItem
            label={t('site.breadcrumbs.home')}
            link={ROUTES.home}
            position={'1'}
            isLink={true}
            className="item-home"
          />
        )}
        {items?.map((item, idx) => (
          <BreadcrumbsItem
            key={idx}
            {...item}
            position={(idx + (isHome ? 2 : 1)).toString()}
            isLink={
              idx + 1 < items?.length ||
              (idx + 1 === items?.length && !!isLastLink)
            }
          />
        ))}
      </ul>
    </nav>
  );
};

export { Breadcrumbs };
