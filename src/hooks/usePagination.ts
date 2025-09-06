'use client'
import { usePathname, useSearchParams } from 'next/navigation';
import { useAppDispatch } from "@/hooks/useStore"
import { useCallback, useEffect } from "react"
import { useRouter } from 'next/navigation';

interface IProps {
  count?: number // total items
  action: any
  info?: string // text info
  showInfo?: boolean
  hideOnSinglePage?: boolean
  size?: number // items per page
}

export const usePagination = ({
  count = 0,
  action,
  info,
  showInfo,
  hideOnSinglePage = true,
  size,
}: IProps) => {
  const dispatch = useAppDispatch();
  const searchParams: any = useSearchParams();
  // const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams?.get('page');

  const router = useRouter();
  const pathname = usePathname();
  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  //TODO need fix, because History pages has tabs and makes re-render for every tab
  useEffect(() => {
    !!action && dispatch(action({ page: page || 1 }));
  }, [page, action, dispatch]);

  const pagination = {
    total: count,
    current: Number(searchParams.get('page') || 1),
    onChange: (page: any) => {
      // !!action && dispatch(action({ page: page || 1 }))
      // TODO fix me
      // setSearchParams({ page })
      router.push(pathname + '?' + createQueryString('page', page));
    },
    info,
    showInfo,
    hideOnSinglePage,
    size,
  };

  return {
    pagination,
  };
}
