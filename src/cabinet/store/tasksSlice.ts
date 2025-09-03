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

export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async (query: object | undefined, { getState, rejectWithValue, dispatch }) => {
    try {
      return await clientFetch("/tasks", { query }).then((res: any) => {
        return {
          ...omit(res, ['results']),
          results: normalize(res?.results)
        }
      })
    } catch (error: any) {
      return rejectWithValue(error)
    }
  },
)

export const fetchTask = createAsyncThunk(
  "task/fetch",
  async (id: number, { getState, rejectWithValue, dispatch }) => {
    try {
      return await clientFetch(`/tasks/${id}`)
    } catch (error: any) {
      return rejectWithValue(error)
    }
  },
)

export const updateTasks = createAsyncThunk(
  "task/update",
  async (params: any, { getState, rejectWithValue, dispatch }) => {
    const { formData, taskId, t } = params || {}
    try {
      return await clientFetch(`/tasks/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify(formData),
      }).then(res => {
        notification.success({
          message: t("cabinet.task_update_success"),
        })
        return res
      })
    } catch (error: any) {
      return rejectWithValue(error)
    }
  },
)

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTaskFile: (state, action: PayloadAction<any>) => {
      const { taskId, file } = action?.payload;
      state.data?.byId[taskId].files.push(file)
    },
    removeTaskFile: (state, action: PayloadAction<any>) => {
      const { taskId, fileId } = action?.payload;
      state.data?.byId[taskId].files.splice(state.data?.byId[taskId].files.findIndex((file) => file.id === fileId), 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTask.fulfilled, (state, { payload }: any) => {
        if (state.data?.byId && payload?.id) {
          state.data.byId[payload.id] = payload
        }
      })
      .addCase(updateTasks.fulfilled, (state, { payload }: any) => {
        if (state.data?.byId && payload?.id) {
          state.data.byId[payload.id] = payload
        }
      })
      .addCase(fetchTasks.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action: any) => {
        state.isLoading = false
        state.data = action?.payload?.results
        state.count = action?.payload?.count
        state.size = action?.payload?.size
      })
      .addCase(fetchTasks.rejected, (state, action: any) => {
        state.isLoading = false
        state.errors = action?.payload?.errors
      })
  },
})

export const getTasksCount = (state: RootState) => state.tasks.count
export const getTasksSize = (state: RootState) => state.tasks.size
export const getTasksIsLoading = (state: RootState) => state.tasks.isLoading
export const getTasksAllIds = (state: RootState) => state.tasks.data?.allIds
export const getTasksByIds = (state: RootState) => state.tasks.data?.byId;
export const getTaskById = (state: RootState, id: number) => state.tasks.data?.byId[id]
export const { addTaskFile, removeTaskFile } = tasksSlice.actions
export default tasksSlice.reducer
