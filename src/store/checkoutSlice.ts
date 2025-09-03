import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit"
import { getI18n } from "react-i18next"
import { DateObject } from "react-multi-date-picker"
import { RootState } from "./"
import { MODALS, ROUTES, defaultTimezones } from "@/config"
import { IAllowedConsultation, IService, ServiceEnum } from "@/types"
import { clientFetch } from "@/utils/service"
import { addError, createSuccessPayUrl, getDate, get, isEmpty } from "@/utils/helpers"
import { ITimezones } from "@/types"
import { modalOpen } from "./uiSlice"
import {
  fetchPsychologistScheduler,
  getPsychologistInfo,
  getPsychologistScheduler,
  getPsychologistSchedulerNearest,
  removeScheduleById,
} from "./psychologistSlice"
import { buyService } from "./servicesSlice"
import { getUser } from "./authSlice"

export interface IState {
  selectedDate?: DateObject | null
  selectedTimezone?: { label: string; value: string; offset: string } | null
  selectedSchedule?: string | null
  selectedService?: ServiceEnum | null
  selectedServiceFull?: IService | null
  selectedPsychologist: string | null
  errors?: any
  isLoading?: boolean
  consultations?: Record<keyof typeof ServiceEnum, IAllowedConsultation> | null
  defaultTimezones: ITimezones[]
}

interface IStatePartial {
  selectedDate?: DateObject | null
  selectedTimezone?: { label: string; value: string; offset: string } | null
  selectedSchedule?: string | null
  selectedService?: ServiceEnum | null
}

const initialState: IState = {
  selectedDate: null,
  selectedTimezone: null,
  selectedService: null,
  selectedServiceFull: null,
  selectedSchedule: null,
  selectedPsychologist: null,
  errors: null,
  isLoading: false,
  consultations: null,
  defaultTimezones: defaultTimezones,
}

export const submitOrderBuy = createAsyncThunk(
  'checkout/submitBuy',
  async (
    params: { psychologistId: string },
    { getState, rejectWithValue, dispatch }
  ) => {
    const { psychologistId } = params || {};
    const state = getState() as RootState;
    const user = getUser(state);
    const isAuth = !!user?.is_confirmed;
    const selectedServiceFull = getSelectedServiceFull(state);
    const {
      selectedDate,
      selectedSchedule,
      selectedService,
      selectedTimezone,
    } = state.checkout || {};

    const query: any = {};
    query['force_checkout'] = '1';
    if (!!selectedSchedule) {
      query['schedule_id'] = selectedSchedule;
    }
    if (!!selectedDate) {
      query['date'] = JSON.stringify(selectedDate);
    }
    if (!!selectedTimezone) {
      query['timezone'] = selectedTimezone?.value;
    }
    if (!!selectedTimezone) {
      query['service'] = selectedService;
    }
    const searchParams = new URLSearchParams(query as Record<string, string>);
    const qs = '?' + searchParams.toString();
    const backUrl = ROUTES.psychologist(psychologistId!, qs);
    if (!!selectedServiceFull && isAuth) {
      localStorage.setItem('can_force_checkout', JSON.stringify(selectedSchedule));
      localStorage.setItem('schedule_id', JSON.stringify(selectedSchedule));
      localStorage.setItem('date', JSON.stringify(selectedDate));
      localStorage.setItem('timezone', JSON.stringify(selectedTimezone));
      localStorage.setItem('service', JSON.stringify(selectedService));
      try {
        dispatch(
          buyService({
            id: get(selectedServiceFull, 'id'),
            content_type_id: get(selectedServiceFull, 'content_type_id'),
            isAuth,
            successUrl: createSuccessPayUrl(backUrl),
          })
        );
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  }
);

export const submitOrder = createAsyncThunk(
  "checkout/submit",
  async (params: any, { getState, rejectWithValue, dispatch }) => {
    const { services_type_force } = params || {};
    let preSubmitErrors:any = {}
    const state = getState() as RootState
    const {
      selectedDate,
      selectedSchedule,
      errors,
    } = state.checkout || {}

    const selectedService = services_type_force || state.checkout?.selectedService;

    if (!selectedDate) {
      preSubmitErrors = addError(preSubmitErrors, "scheduler", getI18n().t("site.checkout.errors.date"))
    }
    if (!selectedSchedule) {
      preSubmitErrors = addError(preSubmitErrors, "scheduler", getI18n().t("site.checkout.errors.scheduler"))
    }
    if (!selectedService) {
      preSubmitErrors = addError(preSubmitErrors, "consultation", getI18n().t("site.checkout.errors.consultation"))
    }

    if (!isEmpty(preSubmitErrors)) {
      dispatch(submitError(preSubmitErrors))
    } else {
      if (!isEmpty(errors)) {
        dispatch(submitError(null))
      }
      const data = {
        services_type: selectedService,
        scheduler: selectedSchedule,
      }
      try {
        return await clientFetch("/consultations/schedule", {
          method: "POST",
          body: JSON.stringify(data),
        }).then(res => {
          const service:any = getAllowedConsultationByType(state, selectedService!)
          const psychologist = getPsychologistInfo(state)
          const scheduler = getPsychologistScheduler(state)
          const datetime = getDate(scheduler?.[selectedSchedule!]?.start_datetime, "DD MMMM HH:mm")
          const serviceText = `${getI18n().t(
            `site.services.items_tabs.${service?.service_type}` as any
          )}, ${service?.duration} хв.`;

          dispatch(
            modalOpen({
              id: MODALS.checkoutSuccess,
              params: {
                datetime,
                psychologist,
                serviceText,
                isOpen: true
              },
            }),
          )
          setTimeout(() => {
            dispatch(removeScheduleById(selectedSchedule!))
            dispatch(decreaseConsultingByType(selectedService!))
            dispatch(clearSelectedValues({}))
            dispatch(fetchPsychologistScheduler(psychologist?.id as string));
          }, 50);
        })
      } catch (error: any) {
        return rejectWithValue(error)
      }
    }
  },
)

export const selectNearestSchedule = createAsyncThunk(
  "checkout/selectNearestSchedule",
  async (params, { getState, dispatch }) => {
    const nearestSchedule = getPsychologistSchedulerNearest(getState() as RootState);
    if (!!nearestSchedule) {
      const selectedDate = new DateObject(new Date(nearestSchedule?.start_datetime));
      const selectedSchedule = nearestSchedule?.id;
      if (!!selectedDate && !!selectedSchedule) {
        dispatch(_setNearestSchedule({ selectedDate, selectedSchedule }));
      }
    }
  }
)

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    clearCheckout: (state, action) => {
      return initialState
    },
    selectDate: (state, action: PayloadAction<DateObject | null>) => {
      state.selectedDate = action.payload
      state.selectedSchedule = null
      state.errors = null
    },
    selectSchedule: (state, action: PayloadAction<string>) => {
      state.selectedSchedule = action.payload
      state.errors = null
    },
    selectTimezone: (
      state,
      action: PayloadAction<{ label: string; value: string; offset: string }>,
    ) => {
      state.selectedTimezone = action.payload
    },
    selectService: (state, action: PayloadAction<ServiceEnum>) => {
      state.selectedService = action.payload
      state.errors = null
    },
    selectServiceFull: (state, action: PayloadAction<IService>) => {
      state.selectedServiceFull = action?.payload
      state.errors = null
    },
    selectPsychologist: (state, action: PayloadAction<string>) => {
      state.selectedPsychologist = action.payload
    },
    setAllowedConsultation: (
      state,
      action: PayloadAction<
        Record<keyof typeof ServiceEnum, IAllowedConsultation>
      >,
    ) => {
      state.consultations = action.payload
    },
    decreaseConsultingByType: (state, action: PayloadAction<ServiceEnum>) => {
      const consultation:any = get(state, ["consultations", action.payload], {})
      if (consultation) {
        consultation.count = consultation?.count - 1
      }
    },
    submitError: (state, action: PayloadAction<any>) => {
      state.errors = action.payload
    },
    clearSelectedValues: (state, action) => {
      state.selectedDate = null
      state.selectedSchedule = null
      state.errors = null
      state.selectedService = null
      state.selectedServiceFull = null;
    },
    _setNearestSchedule: (state, { payload }) => {
      state.selectedDate = payload?.selectedDate;
      state.selectedSchedule = payload?.selectedSchedule;
      state.errors = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.isLoading = false
      })
      .addCase(submitOrder.rejected, (state, action: any) => {
        state.isLoading = false
        state.errors = action?.payload?.errors
      })
  },
})

export const getSubmitLoading = (state: RootState) => state.checkout.isLoading
export const getSelectedDate = (state: RootState) => state.checkout.selectedDate
export const getSelectedTime = (state: RootState) => {
  const selectedScheduleId = state.checkout.selectedSchedule
  const selectedTimezone = state.checkout.selectedTimezone
  const selectedSchedule = get(state, ['psychologist', 'data', 'scheduler', selectedScheduleId as any])
  const datetime = selectedSchedule?.start_datetime
  return getDate(datetime, "HH:mm", selectedTimezone?.value)
}
export const getSelectedSchedule = (state: RootState) => state.checkout.selectedSchedule
export const getSelectedTimezone = (state: RootState) => state.checkout.selectedTimezone
export const getSelectedService = (state: RootState) => state.checkout.selectedService
export const getSelectedServiceFull = (state: RootState) => state.checkout.selectedServiceFull
export const getSelectedServiceDuration = (state: RootState) => {
  const selectedService = getSelectedService(state)
  const consultation = get(state, ['checkout', 'consultations', selectedService as ServiceEnum])
  return consultation?.duration
}
export const getAllowedConsultations = (state: RootState) => state.checkout.consultations
export const getAllowedConsultationByType = (state: RootState, type?: ServiceEnum) =>
  !!type ? get(state, ["checkout", "consultations", type]) : {}
export const getDefaultTimezones = (state: RootState) => state.checkout.defaultTimezones
export const getSubmitErrors = (state: RootState) => state.checkout.errors

export const {
  clearCheckout,
  selectDate,
  selectTimezone,
  selectService,
  selectServiceFull,
  selectPsychologist,
  submitError,
  selectSchedule,
  setAllowedConsultation,
  decreaseConsultingByType,
  clearSelectedValues,
  _setNearestSchedule,
} = checkoutSlice.actions;

export default checkoutSlice.reducer
