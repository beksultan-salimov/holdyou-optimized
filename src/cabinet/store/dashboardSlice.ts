import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "@/store"
import { clientFetch } from "@/utils/service"
import { IConsultation } from "@/types"
import { notification } from "antd"
import { get } from "@/utils/helpers"
import { fetchBalance } from "./balanceSlice"

export interface IState {
  isLoading?: boolean
  nearestConsultations?: IConsultation[]
  sessions: {
    isLoading: boolean
    data: IConsultation[]
    errors?: any
  }
  errors?: any
}
const initialState: IState = {
  sessions: {
    isLoading: true,
    data: []
  }
}

export const cancelConsultation = createAsyncThunk(
  "dashboard/consultations/cancel",
  async ({ id, t }:{id:number, t:any}, { getState, rejectWithValue, dispatch }) => {
    try {
      return await clientFetch(`/consultations/${id}/cancel`)
        .then(() => {
          notification.success({
            message: t('cabinet.consultation_cancel_success'),
          });
          dispatch(fetchBalance());
          return { id };
        })
        .catch((err) => {
          notification.error({
            message: get(err, ['errors', 'details'], t('cabinet.default_error_message')),
          });
        });
    } catch (error: any) {
      return rejectWithValue(error)
    }
  },
)

export const fetchNearestConsultations = createAsyncThunk(
  "dashboard/consultations/nearest",
  async (params, { getState, rejectWithValue, dispatch }) => {
    try {
      return await clientFetch('/consultations/nearest');
    } catch (error: any) {
      return rejectWithValue(error)
    }
  },
)

export const fetchDashboardSessions = createAsyncThunk(
  "dashboard/sessions/fetch",
  async (
    query: object | undefined,
    { getState, rejectWithValue, dispatch },
  ) => {
    try {
      return await clientFetch('/consultations/history', { query });
    } catch (error: any) {
      return rejectWithValue(error)
    }
  },
)

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNearestConsultations.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchNearestConsultations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.nearestConsultations = action.payload as IConsultation[];
      })
      .addCase(fetchNearestConsultations.rejected, (state, action: any) => {
        state.isLoading = false;
        state.errors = action?.payload?.errors;
      })
      .addCase(cancelConsultation.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.nearestConsultations = (state.nearestConsultations || []).filter(
          (i) => Number(i.id) !== Number(action?.payload?.id)
        );
      })
      .addCase(fetchDashboardSessions.pending, (state, action) => {})
      .addCase(fetchDashboardSessions.fulfilled, (state, action: any) => {
        state.sessions.isLoading = false;
        state.sessions.data = (action?.payload?.results || []).slice(0, 4);
      })
      .addCase(fetchDashboardSessions.rejected, (state, action: any) => {
        state.sessions.isLoading = false;
        state.sessions.errors = action?.payload?.errors;
      });
  },
})

export const getNearestIsLoading = (state: RootState) => state.dashboard.isLoading;
export const getNearestConsultations = (state: RootState) => state.dashboard.nearestConsultations

export const getDashboardSessionsIsLoading = (state: RootState) => state.dashboard.sessions?.isLoading
export const getDashboardSessionsData = (state: RootState) => state.dashboard.sessions?.data

export default dashboardSlice.reducer
