import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "@/store"
import { clientFetch } from "@/utils/service"


export interface IState {
  isLoading?: boolean
  data?: any
  count?: number
  size?: number
  errors?: any
}
const initialState: IState = {
  isLoading: true,
}

export const fetchHistorySessions = createAsyncThunk(
  "history/sessions/fetch",
  async (query: object | undefined, { getState, rejectWithValue, dispatch }) => {
    try {
      return await clientFetch("/consultations/history", { query })
    } catch (error: any) {
      return rejectWithValue(error)
    }
  },
)

export const historySessionsSlice = createSlice({
  name: "historySessions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistorySessions.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchHistorySessions.fulfilled, (state, action: any) => {
        state.isLoading = false
        state.data = action?.payload?.results
        state.count = action?.payload?.count
        state.size = action?.payload?.size
      })
      .addCase(fetchHistorySessions.rejected, (state, action: any) => {
        state.isLoading = false
        state.errors = action?.payload?.errors
      })
  },
})

export const getHistorySessionsCount = (state: RootState) => state.historySessions?.count
export const getHistorySessionsSize = (state: RootState) => state.historySessions?.size
export const getHistorySessionsLoading = (state: RootState) => state.historySessions?.isLoading
export const getHistorySessions = (state: RootState) => state.historySessions?.data
export default historySessionsSlice.reducer
