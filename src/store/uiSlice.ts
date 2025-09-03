import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "."

export interface UIState {
  openModals: Array<string>
  params: any
}

const initialState: UIState = {
  openModals: [],
  params: {},
}

interface IModalOpenAction {
  id: string
  params?: any
}

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    modalOpen: (state, action: PayloadAction<IModalOpenAction>) => {
      const { id, params } = action.payload
      state.openModals = [...state.openModals, id]
      state.params[id] = params
    },
    modalClose: (state, action: PayloadAction<string>) => {
      const modalId = action.payload
      state.openModals = state.openModals.filter((id) => id !== modalId)
      state.params[modalId] = null
    },
  },
})

export const selectModalParams = (state: RootState, id: string) => state.ui.params[id]
export const { modalOpen, modalClose } = uiSlice.actions
export default uiSlice.reducer
