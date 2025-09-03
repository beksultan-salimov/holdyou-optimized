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
  isLoading: true
}

export const fetchHistoryPayments = createAsyncThunk(
  "history/payments/fetch",
  async (query: object | undefined, { getState, rejectWithValue, dispatch }) => {
    try {
      return await clientFetch("/checkouts/history", { query })
    } catch (error: any) {
      return rejectWithValue(error)
    }
  },
)

export const historyPaymentsSlice = createSlice({
  name: "historyPayments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistoryPayments.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchHistoryPayments.fulfilled, (state, action: any) => {
        state.isLoading = false
        state.data = action?.payload?.results
        state.count = action?.payload?.count
        state.size = action?.payload?.size
      })
      .addCase(fetchHistoryPayments.rejected, (state, action: any) => {
        state.isLoading = false
        state.errors = action?.payload?.errors
      })
  },
})

export const getHistoryPaymentsCount = (state: RootState) => state.historyPayments.count
export const getHistoryPaymentsSize = (state: RootState) => state.historyPayments.size
export const getHistoryPaymentsLoading = (state: RootState) => state.historyPayments.isLoading
export const getHistoryPayments = (state: RootState) => state.historyPayments.data
export default historyPaymentsSlice.reducer
