import { useSelector } from "react-redux"
import { modalOpen, modalClose, selectModalParams } from "@/store/uiSlice"
import { RootState } from "@/store"
import { useAppDispatch } from "@/hooks/useStore"
import { MODALS } from "@/config"

export const useModals = (id: string = "") => {
  const dispatch = useAppDispatch()
  const _params = useSelector((state: RootState) => selectModalParams(state, id))

  return {
    params: _params,
    modalOpen: (id: string, params?: any) => dispatch(modalOpen({ id, params })),
    modalClose: (id: string) => dispatch(modalClose(id)),
    modalOpenLogin: (props = {}) => dispatch(modalOpen({ id: MODALS.auth, params: { type: 'login', ...props }})),
    modalOpenRegister: (props = {}) => dispatch(modalOpen({ id: MODALS.auth, params: { type: 'register', ...props }}))
  }
}
