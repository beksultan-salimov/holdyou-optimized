import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { notification } from "antd"
import { RootState } from "@/store"
import { clientFetch } from "@/utils/service"
import { normalize, omit } from "@/utils/helpers"
import { ITask } from "@/types/TasksTypes"


export interface IState {
  isLoading?: boolean
  data?: {
    allIds: number[],
    byId: Record<number, ITask>
  }
  size?: number
  count?: number
  errors?: any
}
const initialState: IState = {
  isLoading: true,
}

// export const activatePromo = createAsyncThunk(
//   "promo/activate",
//   async (params: any, { getState, rejectWithValue, dispatch }) => {
//     const { formData, t } = params || {}
//     try {
//       return await clientFetch(`/checkouts/promo`, {
//         method: "POST",
//         body: JSON.stringify(formData),
//       }).then(res => {
//         // notification.success({
//         //   message: t("cabinet.task_update_success"),
//         // })
//         return res
//       })
//     } catch (error: any) {
//       return rejectWithValue(error)
//     }
//   },
// )

export const promoSlice = createSlice({
  name: "promos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(activatePromo.fulfilled, (state, { payload }: any) => {
      // if (state.data?.byId && payload?.id) {
      //   state.data.byId[payload.id] = payload;
      // }
    // });
  },
})


// export const getPromosAllIds = (state: RootState) => state.promos.data?.allIds
// export const getPromosByIds = (state: RootState) => state.promos.data?.byId;
// export const getPromoById = (state: RootState, id: number) => state.promos.data?.byId[id]
// export const { activatePromo } = promoSlice.actions;
export default promoSlice.reducer
