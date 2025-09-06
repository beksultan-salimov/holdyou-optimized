'use client';
import {MouseEventHandler, useRef} from 'react';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {Calendar, DateObject} from 'react-multi-date-picker';
import classNames from 'classnames';
import dayjs from 'dayjs';
import {gregorian_ru, gregorian_uk} from '@/config/calendar';
import {useTranslationClient} from '@/config/i18n/client';
import {get, getDate, getOffsetTimezone, isArray, isEmpty, sortByDate, uniqBy,} from '@/utils/helpers';
import {
    getDefaultTimezones,
    getSelectedDate,
    getSelectedSchedule,
    getSelectedService,
    getSelectedTimezone,
    getSubmitErrors,
    selectDate,
    selectNearestSchedule,
    selectSchedule,
    selectService,
    selectTimezone,
    submitOrder,
    submitOrderBuy,
} from '@/store/checkoutSlice';
import {IPsychologistSchedule, ServiceEnum} from '@/types';
import countries_ru from '@/locales/countries/ru.json';
import countries_ua from '@/locales/countries/ua.json';
import {useAppDispatch, useAppSelector} from '@/hooks/useStore';
import {useLang} from '@/hooks/useLang';
import {useModals} from '@/hooks/useModals';
import {Select} from '@/components/Select';
import {InfoMessage} from '@/components/InfoMessage';
import {Button} from '@/components/Button';
import {PSYCHOLOGIST_SCHEDULER_ID} from '@/config';
import {fetchPsychologistScheduler} from '@/store/psychologistSlice';
import {Spinner} from '@/components/Spinner';
import './scheduler.scss';

const countries = {ru: countries_ru, uk: countries_ua};
const locales = {ru: gregorian_ru, uk: gregorian_uk};

interface ISchedulerTimesItem {
    value: IPsychologistSchedule;
    selectedSchedule?: string | null;
    onSelect: ({id}: IPsychologistSchedule) => void;
}

const SchedulerTimesItem = ({
                                value,
                                selectedSchedule,
                                onSelect,
                            }: ISchedulerTimesItem) => {
    const handleClickTime: MouseEventHandler<HTMLSpanElement> = () => {
        onSelect(value);
    };

    return (
        <span
            role="button"
            className={classNames('scheduler-times-item', {
                active: value?.id === selectedSchedule,
            })}
            onClick={handleClickTime}
        >
      {value?.time}
    </span>
    );
};

interface IProps {
    scheduler?: Record<string, IPsychologistSchedule>;
    type?: 'default' | 'in_psh';
    isAuth?: boolean;
    psychologistId?: number | string;
    allowedConsultations?: any;
}

const Scheduler = ({
                       scheduler,
                       type,
                       isAuth,
                       psychologistId,
                       allowedConsultations,
                   }: IProps) => {
    const {lang} = useLang();
    const {t} = useTranslationClient(lang, ['site']);
    const today = new Date();
    const defaultTimezones = useAppSelector(getDefaultTimezones);

    const initScheduleId = localStorage.getItem('schedule_id');
    const initDate = localStorage.getItem('date');
    const initTimezone = localStorage.getItem('timezone') ? JSON.parse(localStorage.getItem('timezone') ?? '') : null;
    const initService = localStorage.getItem('service') ? JSON.parse(localStorage.getItem('service') ?? '') : null;

    const selectedService = useAppSelector(getSelectedService);
    const {modalOpenRegister} = useModals();
    const errors = useAppSelector(getSubmitErrors);
    const dispatch = useAppDispatch();
    const selectedDate = useAppSelector(getSelectedDate);
    const selectedSchedule = useAppSelector(getSelectedSchedule);
    const selectedTimezone = useAppSelector(getSelectedTimezone);
    const isSubmitError = useAppSelector(getSubmitErrors);
    const [isOrderLoading, setIsOrderLoading] = useState(false);

    const timezones = useMemo(() => {
        return defaultTimezones.map(({name, countryCode}) => {
            const offset = getOffsetTimezone(name, {digits: 2});
            return {
                offset,
                label: get(countries, [lang, countryCode]) + ` (GMT${offset})`,
                value: name,
            };
        });
    }, [defaultTimezones, lang]);

    const handleChangeDate = useCallback(
        (dates: any) => {
            dispatch(selectDate(dates));
        },
        [dispatch]
    );

    const handleSelectTime = useCallback(
        ({id}: { id: any }) => {
            dispatch(selectSchedule(id));
        },
        [dispatch]
    );

    const handleSelectTimezone = (timezone: string, item: any) => {
        dispatch(selectTimezone(item));
    };

    const schedulersGroupByDays = useMemo(() => {
        return !!scheduler && !!selectedTimezone
            ? Object.keys(scheduler)?.reduce((a: any, id: any) => {
                const date: string = getDate(
                    scheduler[id]?.start_datetime,
                    'YYYY/MM/DD',
                    selectedTimezone?.value
                );
                const time: string = getDate(
                    scheduler[id]?.start_datetime,
                    'HH:mm',
                    selectedTimezone?.value
                );
                a[date] = uniqBy(
                    [...get(a, date, []), {...scheduler[id], time}],
                    'time'
                ).sort((a, b) => sortByDate(a?.start_datetime, b?.start_datetime));
                return a;
            }, {} as any)
            : {};
    }, [scheduler, selectedTimezone]);

    const allowedDays: string[] = useMemo(() => {
        return !isEmpty(schedulersGroupByDays)
            ? Object.keys(schedulersGroupByDays).map((item) =>
                new DateObject(item).format()
            )
            : [];
    }, [schedulersGroupByDays]);

    const shedulersInSelectedDay: IPsychologistSchedule[] = useMemo(() => {
        return !!selectedDate ? schedulersGroupByDays[selectedDate!.format()] : [];
    }, [selectedDate, schedulersGroupByDays]);

    const sendOrderInPsh = useCallback(() => {
        if (get(allowedConsultations, [selectedService!, 'count'], 0)) {
            dispatch(submitOrder({}));
        } else if (
            selectedService === ServiceEnum.standard &&
            get(allowedConsultations, [ServiceEnum.subscription, 'count'], 0)
        ) {
            dispatch(
                submitOrder({services_type_force: ServiceEnum.subscription})
            );
        } else {
            dispatch(
                submitOrderBuy({
                    psychologistId: psychologistId as string,
                })
            );
        }
    }, [psychologistId, allowedConsultations, selectedService, dispatch]);

    const handleClickOrderInPsh = useCallback(() => {
        if (type === 'in_psh') {
            if (!isAuth) {
                modalOpenRegister({
                    onSuccess: async () => {
                        await dispatch(
                            fetchPsychologistScheduler(psychologistId as string)
                        );
                        setTimeout(() => {
                            sendOrderInPsh();
                        }, 500);
                    },
                });
            } else {
                sendOrderInPsh();
            }
        }
    }, [type, isAuth, modalOpenRegister, dispatch, psychologistId, sendOrderInPsh]);

    useEffect(() => {
        if (!!initDate) {
            const _d = new DateObject(new Date(Number(initDate)));
            if (!!_d) handleChangeDate(_d);

            if (!!initScheduleId) {
                setTimeout(() => {
                    handleSelectTime({id: Number(initScheduleId)});
                }, 100);
            }
        } else {
            if (type === 'in_psh') {
                dispatch(selectNearestSchedule());
            }
        }
    }, [dispatch, handleChangeDate, handleSelectTime, initDate, initScheduleId, scheduler, type]);

    useEffect(() => {
        if (!selectedTimezone) {
            let currentTimezone;
            if (!!initTimezone) {
                currentTimezone = timezones?.find(
                    (i) => i.value === decodeURI(initTimezone)
                );
            }
            if (!currentTimezone) {
                currentTimezone = timezones[0];
            }
            dispatch(selectTimezone(currentTimezone));
        }
    }, [initTimezone, timezones, selectedTimezone, dispatch]);

    const didInitFromLocalStorage = useRef(false);

    useEffect(() => {
        if (
            !didInitFromLocalStorage.current &&
            !!initScheduleId &&
            !!initService &&
            !!initTimezone &&
            !!initDate
        ) {
            didInitFromLocalStorage.current = true;

            dispatch(selectService(initService as ServiceEnum));
            window.scrollTo({
                top:
                    Number(
                        document.getElementById(PSYCHOLOGIST_SCHEDULER_ID)?.offsetTop
                    ) - 30,
                behavior: 'smooth',
            });

            setIsOrderLoading(true);

            dispatch(selectSchedule(initScheduleId));
            dispatch(selectDate(new DateObject(new Date(Number(initDate)))));

            setTimeout(() => {
                dispatch(submitOrder({}));
                setIsOrderLoading(false);
            }, 500);

            localStorage.removeItem('schedule_id');
            localStorage.removeItem('date');
            localStorage.removeItem('timezone');
            localStorage.removeItem('service');
        }
    }, [initScheduleId, initDate, initTimezone, initService, dispatch]);


    return (
        <div className="scheduler-block">
            <div className="scheduler-block-col scheduler-block-col--calendar">
                <Calendar
                    className={classNames('scheduler-calendar', {
                        error: !!isSubmitError && !selectedDate,
                    })}
                    value={selectedDate}
                    onChange={handleChangeDate}
                    weekStartDayIndex={1}
                    multiple={false}
                    locale={get(locales, [lang])}
                    shadow={false}
                    highlightToday={false}
                    minDate={today}
                    mapDays={({date}) => {
                        if (!allowedDays.includes(date.format())) {
                            return {
                                disabled: true,
                            };
                        }
                    }}
                />
            </div>
            <div className="scheduler-block-col scheduler-block-col--times">
                <div
                    className={classNames('scheduler-times', {
                        error: !!isSubmitError && !selectedSchedule,
                    })}
                >
                    <div className="scheduler-times-title">
                        {type === 'default' && t('site.scheduler.allowed_times')}
                        {type === 'in_psh' && !!selectedDate ? (
                            <span className="scheduler-times-title-date">
                <span className="scheduler-times-title-date-day">
                  {getDate(selectedDate as any, 'dddd, ')}
                </span>
                <span className="scheduler-times-title-date-value">
                  {getDate(selectedDate as any, 'DD MMMM')}
                </span>
              </span>
                        ) : (
                            t('site.scheduler.allowed_times')
                        )}
                        {type === 'in_psh' &&
                            dayjs(selectedDate as any).isSame(dayjs(), 'day') && (
                                <span className="scheduler-times-title-extra">
                  {t('site.today')}
                </span>
                            )}
                    </div>
                    <div className="scheduler-times-timezone">
            <span className="scheduler-times-timezone-label">
              {t('site.scheduler.timezone')}{' '}
            </span>
                        <Select
                            value={selectedTimezone}
                            options={timezones}
                            onChange={handleSelectTimezone}
                            className="timezone-select"
                            dropdownClassName="cabinet timezone-select-popup"
                            listItemHeight={10}
                            listHeight={160}
                        />
                    </div>
                    <div className="scheduler-times-items">
                        {!selectedDate && (
                            <InfoMessage
                                text={t('site.checkout.alert.no_date.text')}
                                iconName="BookmarkSquare"
                                size="sm"
                            />
                        )}
                        {!!selectedDate && (
                            <>
                                {shedulersInSelectedDay?.map((item: any) => (
                                    <SchedulerTimesItem
                                        key={item?.id}
                                        value={item}
                                        selectedSchedule={selectedSchedule}
                                        onSelect={handleSelectTime}
                                    />
                                ))}
                            </>
                        )}
                    </div>
                    {type === 'in_psh' && (
                        <>
                            <div className="scheduler-times-footer">
                                <Button
                                    type="primary-old"
                                    size="md"
                                    weight="bold"
                                    shadow
                                    onClick={handleClickOrderInPsh}
                                    disabled={!selectedSchedule}
                                >
                                    {t('site.enroll')}
                                </Button>
                            </div>
                            {!isEmpty(errors) && (
                                <div className="scheduler-times-errors">
                                    <InfoMessage
                                        text={Object.keys(errors).map((type) => {
                                            if (isArray(errors[type])) {
                                                return errors[type]?.map((item: string, idx: number) => (
                                                    <p key={type + idx}>{item}</p>
                                                ));
                                            } else {
                                                return <p key={type}>{errors[type]}</p>;
                                            }
                                        })}
                                        iconName="AlertBubble"
                                        type="error"
                                        className="error-block"
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            {!!isOrderLoading && (
                <div className="scheduler-block__spinner">
                    <Spinner/>
                </div>
            )}
        </div>
    );
};

export {Scheduler};
