import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "@/store"
import { clientFetch } from "@/utils/service"
import { normalizeConsultations } from "@/utils/helpers"


export interface IState {
  isLoaded?: boolean
  data?: any
  errors?: any
}
const initialState: IState = {}

export const fetchBalance = createAsyncThunk(
  "balance/fetch",
  async (params, { getState, rejectWithValue, dispatch }) => {
    try {
      return await clientFetch('/consultations/balance').then(async (data) => {
        return data ? normalizeConsultations(data as any) : [];
      });
    } catch (error: any) {
      return rejectWithValue(error)
    }
  },
)

export const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state, action) => {})
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.isLoaded = true
        state.data = action.payload
      })
      .addCase(fetchBalance.rejected, (state, action: any) => {
        state.isLoaded = true
        state.errors = action?.payload?.errors
      })
  },
})

export const getBalanceIsLoaded = (state: RootState) => state.balance.isLoaded
export const getBalance = (state: RootState) => state.balance.data
export default balanceSlice.reducer
