import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "@/store"
import { clientFetch } from "@/utils/service"

export interface IState {
  data: Array<any>
  isFetching?: boolean
  isLoaded?: boolean
  isError?: boolean
}

const initialState: IState = {
  data: [],
  isFetching: false,
  isLoaded: false,
  isError: false
}

export const fetchNotifications = createAsyncThunk(
  "notifications/fetch",
  async (params, thunkclientFetch) => {
    // TODO: need refactor only: return await clientFetch(path)
    try {
      return await clientFetch("/service")
    } catch (error: any) {
      return thunkclientFetch.rejectWithValue(error)
    }
  },
)

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.pending, (state, { payload }) => {
      state.isFetching = true
    }),
    builder.addCase(fetchNotifications.fulfilled, (state, {payload}) => {
      state.isLoaded = true
      state.isFetching = false
      state.data = payload as []
    }),
    builder.addCase(fetchNotifications.rejected, (state, action) => {
      console.log(
        'notificationsSlice::fetchNotifications.rejected - action:',
        action
      );
      state.isError = true
      state.isFetching = true
    })
  },
})

export const isNotificationsLoaded = (state: RootState) => state.notifications.isLoaded
export const isNotificationsError = (state: RootState) => state.notifications.isError
export const { } = notificationsSlice.actions
export default notificationsSlice.reducer
