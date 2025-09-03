import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { notification } from "antd"
import { RootState } from "@/store"
import { clientFetch } from "@/utils/service"


export interface IState {
  isLoading?: boolean
  data?: {}
  errors?: any
}
const initialState: IState = {
  isLoading: true,
}

export const fetchAgoraConsultation = createAsyncThunk(
  "agora/fetch",
  async (id: string, { getState, rejectWithValue, dispatch }) => {
    try {
      return await clientFetch(`/consultations/nearest`).then((res: any) => {
        const item = res?.find((i:any) => i?.id?.toString() === id?.toString());
        if (!item) {
          // throw new Error('Consultation not found')
          return rejectWithValue({ errors: 'Consultation not found' });
        }
        return item;
      });
    } catch (error: any) {
      return rejectWithValue(error)
    }
  },
)

export const agoraSlice = createSlice({
  name: 'agora',
  initialState,
  reducers: {
    clearAgora: (state) => {
      state.data = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgoraConsultation.pending, (state, { payload }: any) => {
        state.isLoading = true;
      })
      .addCase(fetchAgoraConsultation.fulfilled, (state, { payload }: any) => {
        state.data = payload;
        state.isLoading = false;
      })
      .addCase(fetchAgoraConsultation.rejected, (state, { payload }: any) => {
        state.errors = payload?.errors;
        state.isLoading = false;
      });
  },
});

export const getAgoraConsultation = (state: RootState) => state.agora.data
export const getAgoraConsultationLoading = (state: RootState) => state.agora.isLoading;
export const getAgoraConsultationErrors = (state: RootState) => state.agora.errors;
export const { clearAgora } = agoraSlice.actions;
export default agoraSlice.reducer;
