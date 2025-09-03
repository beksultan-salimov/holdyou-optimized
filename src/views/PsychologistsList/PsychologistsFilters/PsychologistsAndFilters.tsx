'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import Scrollbars from 'react-custom-scrollbars-2';
import clsx from 'clsx';
import Checkbox from 'rc-checkbox';
import { expFilters, FAMILY_FILTERS_ID, filterTypes, getNearestFilterItemByLang, meetFilters, nearestFilterItem } from '@/config';
import { useTranslationClient } from '@/config/i18n/client';
import { getPshFilterData, intersection, isEmpty, sortByDate } from '@/utils/helpers';
import { useLang } from '@/hooks/useLang';
import { Button } from '@/components/Button';
import { Spinner } from '@/components/Spinner';
import { Icon } from '@/components/Icon';
import { PsychologistsList } from '@/views/PsychologistsList';
import './filters.scss';
import { clientFetch } from '@/utils/service';

interface IProps {
  filters?: any;
  psychologists?: any;
  qsFilters?: any;
  isMobile?: boolean;
}

const FilterDropdown = ({
  selectedItems,
  onChange,
  items,
  type,
  t,
  isMobile,
}: any) => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(selectedItems);
  const [isOpen, toggleOpen] = useState(false);
  const closeMenu = (e: any) => {
    if (
      e?.target?.classList?.contains('filter-dropdown__btn-apply') ||
      !e?.target?.offsetParent?.classList?.contains('filter-dropdown__items')
    ) {
      if (!isMobile) {
        document.removeEventListener('click', closeMenu);
      }
      toggleOpen(false);
    }
  };
  const handleToggleOpen = () => {
    if (!isOpen) {
      if (!isMobile) {
        document.addEventListener('click', closeMenu);
      }
    }
    toggleOpen(!isOpen);
  };
  const hasActiveItems = !!selectedItems.find((i: any) => i.type === type);

  const handleChangeCheckboxes = useCallback(
    (item: any, isActive: boolean) => {
      let newItems = [];
      if (isActive) {
        newItems = selectedCheckboxes.filter((i: any) => i.id != item.id);
      } else {
        newItems = [...selectedCheckboxes, item];
      }
      isMobile ? onChange(newItems) : setSelectedCheckboxes(newItems);
    },
    [isMobile, onChange, selectedCheckboxes]
  );

  const handleApply = () => {
    onChange(selectedCheckboxes);
  };

  useEffect(() => {
    setSelectedCheckboxes(selectedItems);
  }, [selectedItems, isOpen]);

  return (
    <div className="filter-dropdown">
      <div
        className={clsx('filter-dropdown__btn', { active: hasActiveItems })}
        onClick={handleToggleOpen}
      >
        {t(`site.filters.${type}`)}
      </div>
      <div className={clsx('filter-dropdown__list', { open: isOpen })}>
        <Scrollbars autoHeight autoHeightMax={250} universal={true}>
          <div
            className="filter-dropdown__items"
            style={{ position: 'relative' }}
          >
            {items?.map((item: any) => {
              const isActive = selectedCheckboxes.find(
                (i: any) => i.id === item.id
              );
              return (
                <div
                  className="filter-dropdown__item"
                  onClick={() => {
                    handleChangeCheckboxes(item, isActive);
                  }}
                  key={item.id}
                >
                  <span
                    className={clsx('filter-checkbox', { active: isActive })}
                  />
                  {item.text}
                </div>
              );
            })}
          </div>
        </Scrollbars>
        <div className="filter-dropdown__footer">
          <Button
            type="primary"
            size="xs"
            className="filter-dropdown__btn-apply"
            onClick={handleApply}
          >
            {t('site.apply')}
          </Button>
        </div>
      </div>
    </div>
  );
};

const FilterSelectedItem = ({ item, onClick }: any) => {
  const { text, id } = item || {};
  const handleClick = () => {
    onClick(item);
  };

  return (
    <div
      role="button"
      onClick={handleClick}
      data-id={id}
      className="filter-selected-item"
    >
      <span>{text}</span>
    </div>
  );
};

const PsychologistsAndFilters = ({ filters, psychologists, qsFilters, isMobile }: IProps) => {
  const { lang } = useLang();
  const { t } = useTranslationClient(lang, ['site']);
  const [isChangedFilters, setIsChangedFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<any>([]);
  const handleChangeSelectedIds = (seletedItems: any) => {
    setSelectedFilters(seletedItems);
  };

  const nearestFilterItem = useMemo(() => getNearestFilterItemByLang(lang), [lang]);

  const handleClickClear = () => {
    setSelectedFilters([]);
    setIsChangedFilters(true);
  };

  const handleClickDeselectItem = (item: any) => {
    setSelectedFilters((val:any) => val.filter((i: any) => i.id != item.id));
  };

  /*------------------------------------------------*/
    const [psychologistsForFilters, setPsychologistsForFilter] = useState([]);
    useEffect(() => {
      getPsychologistsInClient({ lang }).then((res) => {
        if (!!res) {
          setPsychologistsForFilter(res);
        }
      });
    }, [lang]);
  /*------------------------------------------------*/

  const selectedPsychologists = useMemo(() => {
    if (selectedFilters.length === 0) {
      return { items: psychologists, visibleCount: psychologists?.length };
    }
    const selectedFiltersIds = selectedFilters.map((i: any) => i.id);
    let visibleCount = 0;

    const _psychologists = Array.isArray(psychologistsForFilters) && psychologistsForFilters.length > 0
      ? psychologistsForFilters
      : psychologists;

    const filteredPsychologists = _psychologists.map((p: any) => {
      if (
        intersection(p.filter_ids, selectedFiltersIds)?.length ===
        selectedFiltersIds?.length
      ) {
        visibleCount += 1;
        return p;
      } else {
        return { ...p, isHidden: true };
      }
    });

    if (selectedFilters.find((i: any) => i.id === nearestFilterItem?.id)) {
      return {
        items: filteredPsychologists.sort((a: any, b: any) =>
          sortByDate(
            a?.nearest_schedule?.start_datetime,
            b?.nearest_schedule?.start_datetime
          )
        ),
        visibleCount,
      };
    }
    return { items: filteredPsychologists, visibleCount };
  }, [psychologists, selectedFilters, nearestFilterItem?.id, psychologistsForFilters]);

  const groupedfilters = filters.reduce((a: any, c: any) => {
    a[c?.type] = [...(a[c?.type] || []), c];
    return a;
  }, {});

  const handleToogleSingleFilter = (item: any) => {
    const isActive = selectedFilters.find((i: any) => i.id === item.id);
    const newSelectedFilters: any = isActive
      ? selectedFilters.filter((i: any) => i.id !== item.id)
      : [...(selectedFilters || []), item];
    setSelectedFilters(newSelectedFilters);
    setIsChangedFilters(true);
  }

  useEffect(() => {
    if (!isEmpty(qsFilters)) {
      const selectedFiltersByQs:any = []
      if (qsFilters?.is_junior) {
        const juniorFilterItem = filters?.find((i: any) => i?.id === 'junior');
        if (!isEmpty(juniorFilterItem)) {
          selectedFiltersByQs.push(juniorFilterItem);
        }
      }
      if (qsFilters?.is_family) {
        const familyFilterItem = filters?.find((i: any) => i?.id === FAMILY_FILTERS_ID);
        if (!isEmpty(familyFilterItem)) {
          selectedFiltersByQs.push(familyFilterItem);
        }
      }
      if (!isEmpty(selectedFiltersByQs)) {
        setSelectedFilters(selectedFiltersByQs);
        setIsChangedFilters(true);
      }
    }
  }, [qsFilters, filters]);

  const isHiddenComponent = !isEmpty(qsFilters) && isEmpty(selectedFilters) && !isChangedFilters

  const handleClickOpenMobileFilters = () => {
    document.body.classList.add('no-scroll');
    document.body.classList.add('filters-opened');
  }
  const handleClickCloseMobileFilters = () => {
    document.body.classList.add('filters-closing');
    document.body.classList.remove('no-scroll');
    setTimeout(() => {
      document.body.classList.remove('filters-closing');
      document.body.classList.remove('filters-opened');
    }, 500);
  }
  const handleClickMobileApply = () => {
    handleClickCloseMobileFilters();
  };

  return (
    <>
      {isHiddenComponent && (
        <div className="filters-pshs-spinner">
          <Spinner className="spinner-center" />
        </div>
      )}
      <div
        className={clsx('filters-pshs-wrapper', {
          // 'is-hidden': isHiddenComponent,
          'is-mobile': isMobile,
        })}
      >
        <div
          className="btn-filter-mobile"
          onClick={handleClickOpenMobileFilters}
        >
          <Icon name="Filters" className="btn-filter-mobile__icon" />
          <span className="btn-filter-mobile__title">
            {t('site.filters_title')}
          </span>
          {!!selectedFilters?.length && (
            <span className="btn-filter-mobile__count">
              {selectedFilters?.length}
            </span>
          )}
        </div>

        <div className="filter-categories-wrapper">
          <div className="filter-categories-header">
            <Icon name="Filters" className="filter-categories-header__icon" />
            <div className="filter-categories-header__title">
              {t('site.filters_title')}
            </div>
            <div
              className="filter-categories-header__btn-close"
              role="button"
              onClick={handleClickCloseMobileFilters}
            >
              ✕
            </div>
          </div>
          <div className="filter-categories">
            {filterTypes.map(
              (type) =>
                !!groupedfilters[type] &&
                groupedfilters[type]?.length > 0 && (
                  <FilterDropdown
                    selectedItems={selectedFilters}
                    key={type}
                    onChange={handleChangeSelectedIds}
                    type={type}
                    items={groupedfilters[type]}
                    t={t}
                    isMobile={isMobile}
                  />
                )
            )}
            <div className="filter-dropdown">
              <div
                className={clsx(
                  'filter-dropdown__btn filter-dropdown__btn--single',
                  {
                    active: selectedFilters.find(
                      (i: any) => i.id === nearestFilterItem?.id
                    ),
                  }
                )}
                onClick={() => handleToogleSingleFilter(nearestFilterItem)}
              >
                {nearestFilterItem?.text}
                <Checkbox
                  checked={selectedFilters.find(
                    (i: any) => i.id === nearestFilterItem?.id
                  )}
                />
              </div>
            </div>
          </div>
          <div className="filter-categories-footer">
            <Button
              type="default"
              size="xs"
              weight="bold"
              danger
              className={clsx('filter-categories-footer__btn-clear', {
                'is-hidden': isEmpty(selectedFilters),
              })}
              onClick={handleClickClear}
            >
              {t('site.reset')}
            </Button>
            <Button
              type="primary-old"
              size="xs"
              weight="bold"
              shadow
              className="filter-categories-footer__btn-apply"
              onClick={handleClickMobileApply}
            >
              {t('site.apply')}
            </Button>
          </div>
        </div>

        <AnimateHeight
          duration={400}
          height={selectedFilters?.length > 0 ? 'auto' : 0}
        >
          <div className="filter-selected">
            <>
              <div
                role="button"
                className={clsx('filter-clean-btn', {
                  hidden: selectedFilters?.length === 0,
                })}
                onClick={handleClickClear}
              >
                {t('site.reset')}
              </div>
              {selectedFilters?.map((item: any) => (
                <FilterSelectedItem
                  key={item.id}
                  item={item}
                  onClick={handleClickDeselectItem}
                />
              ))}
            </>
          </div>
        </AnimateHeight>

        <PsychologistsList
          items={selectedPsychologists?.items}
          visibleCount={selectedPsychologists?.visibleCount}
        />
      </div>
    </>
  );
};


export const getPsychologistsInClient = async ({ lang }: { lang: string }) => {
  return await clientFetch('/psychologists', { lang }).then(async (data: any) => {
    const res = data?.map((item: any) => {
      const expYears = item.experience_years;
      const isJunior = item.is_junior;
      const filterIds = item.filter_ids?.map((i: any) => i.id);

      Object.keys(meetFilters).forEach((m) => {
        if (item[m]) filterIds.push(m);
      });

      Object.keys(expFilters).forEach((m) => {
        if (m === 'junior' && isJunior) {
          filterIds.push(m);
        } else if (
          expYears <= expFilters[m].value[1] &&
          expYears >= expFilters[m].value[0]
        ) {
          filterIds.push(m);
        }
      });

      if (item?.nearest_schedule?.id) {
        filterIds.push(nearestFilterItem.id);
      }

      return {
        ...item,
        filter_ids: filterIds,
        filter_data: getPshFilterData(item.filter_ids),
      };
    });
    return res;
  });
};

export { PsychologistsAndFilters };
