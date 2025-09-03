import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "@/store"
import { clientFetch } from "@/utils/service"

export interface IState {
  data?: any;
  isLoading: boolean
}

const initialState: IState = {
  data: undefined,
  isLoading: true
}

export const fetchSpecialOffer = createAsyncThunk(
  "banner/fetch",
  async (params, thunkAPI) => {
    try {
      return await clientFetch('/corporate/main-page/banner')
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const specialOfferSlice = createSlice({
  name: 'specialOffer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecialOffer.pending, (state, action) => {})
      .addCase(fetchSpecialOffer.fulfilled, (state, action) => {
        state.data = action.payload as any;
        state.isLoading = false;
      })
      .addCase(fetchSpecialOffer.rejected, (state) => {
        state.isLoading = false;
        state.data = undefined;
      })
    },
});

export const getSpecialOffer = (state: RootState) => state?.specialOffer?.data?.banner
export default specialOfferSlice.reducer;
