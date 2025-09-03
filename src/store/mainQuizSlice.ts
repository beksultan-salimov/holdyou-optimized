import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "@/store"
import { clientFetch } from "@/utils/service"
import { toast } from "react-toastify";
import { getPshSimpleData, isFunction, showFormErrors, uniqBy } from "@/utils/helpers";

export interface IState {
  data?: any;
  result?: any;
  isLoading: boolean
}

const initialState: IState = {
  data: undefined,
  result: undefined,
  isLoading: true
}

export const mainQuizSubmit = async (params: any) => {
  const { values, t, onSuccess, dispatch } = params || {};

  try {
    return await clientFetch(`/corporate/main-page/quiz`, {
      method: 'POST',
      body: JSON.stringify(values),
    })
      .then((res: any) => {
        const resNormalized = {
          ...(res || {}),
          psychologists: uniqBy((res?.psychologists || []), 'id').map(getPshSimpleData),
        };
        dispatch(setMainQuizResult(resNormalized as any));
        setTimeout(() => {
          if (isFunction(onSuccess)) {
            onSuccess(resNormalized);
          }
        }, 150);
        return resNormalized;
      })
      .catch((error) => {
        toast.error(t('home.quiz.error_submit'));
        return showFormErrors({ error, t });
      });
    } catch (error: any) {
      toast.error(t('home.quiz.error_submit'));
  }
}

export const mainQuizSlice = createSlice({
  name: 'mainQuiz',
  initialState,
  reducers: {
    setMainQuizResult: (state, { payload }: any) => {
      state.result = payload as any;
    },
  },
});

export const getResultMainQuizPsychologists = (state: RootState) => state?.mainQuiz?.result?.psychologists
export const getResultMainQuizDescriptions = (state: RootState) => state?.mainQuiz?.result?.quiz_descriptions
export const { setMainQuizResult } = mainQuizSlice.actions;
export default mainQuizSlice.reducer;
