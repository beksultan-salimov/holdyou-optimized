import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "./"
import { clientFetch } from "@/utils/service"
import { get } from "@/utils/helpers"
import { IPsychologist, IPsychologistSchedule } from "@/types"
import { setAllowedConsultation } from "./checkoutSlice"

const normalizeSchedulers = (items: IPsychologistSchedule[]) => {
  return items?.reduce((a: any, c: IPsychologistSchedule) => {
    a[c.id] = c
    return a
  }, {} as any)
}

export interface IState {
  isFetchingScheduler: boolean;
  isLoadedScheduler: boolean;
  isRejected: boolean;
  data: {
    info?: IPsychologist;
    scheduler?: Record<string, IPsychologistSchedule>;
    schedulerNearest?: IPsychologistSchedule;
  };
  error?: any;
}

const initialState: IState = {
  isFetchingScheduler: false,
  isLoadedScheduler: false,
  isRejected: false,
  data: {},
}

export const fetchPsychologist = createAsyncThunk(
  "psychologist/fetch",
  async (id: string, thunkAPI) => {
    try {
      return await clientFetch(`/psychologists/${id}`, { isPage: true })
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const fetchPsychologistScheduler = createAsyncThunk(
  "psychologist/schedule",
  async (id: string, thunkAPI) => {
    try {
      return await clientFetch(`/psychologists/${id}/schedulers`).then(async (res: any) => {
        const normalizedConsultations = res?.consultations?.reduce((a:any, c:any) => {
          a[c.service_type] = c
          return a
        }, {})
        thunkAPI.dispatch(setAllowedConsultation(normalizedConsultations))
        return {scheduler: normalizeSchedulers(res?.schedulers), schedulerNearest: get(res, ['schedulers', 0])}
      })
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const psychologistSlice = createSlice({
  name: 'psychologist',
  initialState,
  reducers: {
    clearPsychologist: (state, action) => {
      return initialState;
    },
    removeScheduleById: (state, action: PayloadAction<string>) => {
      delete state.data.scheduler![action.payload];
    },
    setPsychologist: (state, action) => {
      state.data.info = action.payload as any;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPsychologist.pending, (state, action) => {})
      .addCase(fetchPsychologist.fulfilled, (state, action) => {
        state.data.info = action.payload as any;
        state.isRejected = false;
      })
      .addCase(fetchPsychologist.rejected, (state, action: any) => {
        state.isRejected = true;
      })
      .addCase(fetchPsychologistScheduler.pending, (state, action) => {})
      .addCase(fetchPsychologistScheduler.fulfilled, (state, action) => {
        state.isLoadedScheduler = true;
        state.data.scheduler = action.payload?.scheduler as any;
        state.data.schedulerNearest = action.payload?.schedulerNearest as any;
      })
      .addCase(fetchPsychologistScheduler.rejected, (state, action: any) => {
        state.isLoadedScheduler = true;
      });
  },
});

export const getPsychologistIsRejected = (state: RootState) => state.psychologist.isRejected
export const getIsLoadedScheduler = (state: RootState) => state.psychologist.isLoadedScheduler
export const getFetchingScheduler = (state: RootState) => state.psychologist.isFetchingScheduler
export const getPsychologistInfo = (state: RootState) => state.psychologist.data.info
export const getPsychologistScheduler = (state: RootState) => state.psychologist.data.scheduler
export const getPsychologistSchedulerNearest = (state: RootState) => get(state, ['psychologist', 'data', 'schedulerNearest'])
export const { clearPsychologist, removeScheduleById, setPsychologist } =  psychologistSlice.actions;
export default psychologistSlice.reducer
