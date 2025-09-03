import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "@/store"
import { clientFetch } from "@/utils/service"
import { IUser } from "@/types/UserTypes";
import { toast } from "react-toastify";

export interface IState {
  data?: IUser;
  isLoading: boolean
}

const initialState: IState = {
  data: undefined,
  isLoading: true
}

export const fetchUser = createAsyncThunk(
  "user/fetch",
  async (params, thunkAPI) => {
    try {
      return await clientFetch('/users/me')
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const profileSubmit = createAsyncThunk(
  'user/update',
  async (params: any, { rejectWithValue }) => {
    const { values, t } = params || {};
    const formData = new FormData();
    formData.append('fullname', values?.fullname);
    !!values?.photoFile && formData.append('photo', values?.photoFile);

    try {
      return await clientFetch(`/users/${values?.id}`, {
        method: 'PATCH',
        body: formData,
        fileUpload: true,
      })
        .then((res) => {
          toast.success(t('cabinet.profile.save_success'));
          return res;
        })
        .catch((error) => {
          toast.error(t('cabinet.profile.save_error'));
        });
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.data = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state, action) => {})
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data = action.payload as any;
        state.isLoading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false;
        state.data = undefined;
      })
      .addCase(profileSubmit.fulfilled, (state, { payload }: any) => {
        state.data = payload as any;
      });
  },
});

export const getUserLoading = (state: RootState) => state?.auth?.isLoading;
export const getUser = (state: RootState) => state?.auth?.data
export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
