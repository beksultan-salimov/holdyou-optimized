import { Link } from '@/components/Link';

interface IProps {
  pathname: string;
  query?: { [key: string]: string | string[] | undefined };
  previous?: string;
  next?: string;
  className?: string;
  t: any;
}

const PaginationSimple = ({
  pathname,
  query = {},
  previous,
  next,
  className = '',
  t,
}: IProps) => {
  const BtnPrev = <span>&#171; {t('site.pagination_simple.previous')}</span>;
  const BtnNext = <span>{t('site.pagination_simple.next')} &#187;</span>;
  const prevQuery: any = {
    ...query,
    page: query?.page && Number(query?.page) > 1 ? Number(query?.page) - 1 : 1,
  };
  const nextQuery: any = {
    ...query,
    page: query?.page ? Number(query?.page) + 1 : 2,
  };
  const prevLink = pathname + '?' + new URLSearchParams(prevQuery).toString();
  const nextLink = pathname + '?' + new URLSearchParams(nextQuery).toString();
  return (
    <div className={`simple-pagination ${className}`}>
      <ul className="simple-pagination-list">
        <li className="simple-pagination-item pagination-item-prev">
          {!!previous ? <Link href={prevLink}>{BtnPrev}</Link> : BtnPrev}
        </li>
        <li className="simple-pagination-item pagination-item-next">
          {!!next ? <Link href={nextLink}>{BtnNext}</Link> : BtnNext}
        </li>
      </ul>
    </div>
  );
};

export { PaginationSimple };
