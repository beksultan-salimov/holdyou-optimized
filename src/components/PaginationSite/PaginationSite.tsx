'use client';
import React from 'react';
import classNames from 'classnames';
import { usePaginationSite, DOTS } from './usePaginationSite';
import { Link } from '../Link';
import './paginationSite.scss';

interface IProps {
  pathname: string;
  totalCount: number | null;
  currentPage: number | null;
  pageSize: number | null;
  siblingCount?: number;
  className?: string;
  query: { [key: string]: string | string[] | undefined };
}

const PaginationSite = ({
  totalCount,
  siblingCount = 1,
  currentPage: _currentPage,
  pageSize,
  className,
  pathname,
  query,
}: IProps) => {
  const currentPage = _currentPage || 1;
  const paginationRange = usePaginationSite({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || (paginationRange && paginationRange?.length < 2)) {
    return null;
  }

  let lastPage = paginationRange
    ? paginationRange[paginationRange?.length - 1]
    : 0;

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
    <ul className={classNames('pagination-container', className)}>
      <li
        className={classNames('pagination-item pagination-item--arrow', {
          disabled: currentPage === 1,
        })}
      >
        {currentPage > 1 && (
          <Link href={prevLink}>
            <div className="arrow left" />
          </Link>
        )}
      </li>
      {paginationRange?.map((pageNumber, _idx) => {
        if (pageNumber === DOTS) {
          return (
            <li key={_idx} className="pagination-item dots">
              {DOTS}
            </li>
          );
        }

        return (
          <li
            key={_idx}
            className={classNames('pagination-item', {
              selected: pageNumber === currentPage,
            })}
          >
            {pageNumber !== currentPage ? (
              <Link
                href={
                  pathname +
                  '?' +
                  new URLSearchParams({
                    ...query,
                    page: pageNumber as string,
                  }).toString()
                }
              >
                {pageNumber}
              </Link>
            ) : (
              pageNumber
            )}
          </li>
        );
      })}
      <li
        className={classNames('pagination-item pagination-item--arrow', {
          disabled: currentPage === lastPage,
        })}
      >
        {Number(currentPage) < Number(lastPage) && (
          <Link href={nextLink}>
            <div className="arrow right" />
          </Link>
        )}
      </li>
    </ul>
  );
};

export { PaginationSite };
