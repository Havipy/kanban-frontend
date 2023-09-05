import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import axiosInstance from '../axios'
import { ITask, ITaskNewDescribtion, ITaskNewTitle } from "../types/task.interface.js";
import axios, { AxiosError } from "axios";
export const fetchTasks = createAsyncThunk<ITask[], undefined, { rejectValue: AxiosError | Error }>(
	'tasks/fetchTasks',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get<ITask[]>('/tasks')
			return response.data;
		}
		catch (e) {
			if (axios.isAxiosError(e)) {
				return rejectWithValue(e as AxiosError)
			}
			return rejectWithValue(e as Error);
		}
	})
export const fetchCreateTask = createAsyncThunk<ITask, string, { rejectValue: AxiosError | Error }>(
	'tasks/fetchCreateTasks',
	async (title, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post<ITask>('/tasks', { title });
			return response.data as ITask;
		}
		catch (e) {
			if (axios.isAxiosError(e)) {
				return rejectWithValue(e as AxiosError)
			}
			return rejectWithValue(e as Error);
		}
	})
export const fetchChangeTasksDescription = createAsyncThunk<ITask, ITaskNewDescribtion, { rejectValue: AxiosError | Error }>(
	'tasks/fetchChangeTasksDescription',
	async (taskData, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.patch<ITask>(`/tasks/${taskData._id}/description`, taskData);
			return response.data as ITask
		}
		catch (e) {
			if (axios.isAxiosError(e)) {
				return rejectWithValue(e as AxiosError)
			}
			return rejectWithValue(e as Error);
		}
	}
)
export const fetchChangeTaskStage = createAsyncThunk<ITask, String, { rejectValue: AxiosError | Error }>(
	'tasks/fetchChangeTaskStage',
	async (id, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.patch<ITask>('/tasks', { _id: id });
			return response.data;
		}
		catch (e) {
			if (axios.isAxiosError(e)) {
				return rejectWithValue(e as AxiosError)
			}
			return rejectWithValue(e as Error);
		}
	}
)
export const fetchChangeTaskTitle = createAsyncThunk<ITask, ITaskNewTitle, { rejectValue: AxiosError | Error }>(
	'tasks/fetchChangeTaskTitle',
	async (taskData, { rejectWithValue }) => {
		try {

			const response = await axiosInstance.patch<ITask>(`/tasks/${taskData._id}`, taskData);

			return response.data;
		}
		catch (e) {
			if (axios.isAxiosError(e)) {
				return rejectWithValue(e as AxiosError)
			}
			return rejectWithValue(e as Error);
		}
	}
)
export const fetchDeleteTask = createAsyncThunk<string | undefined, string | undefined, { rejectValue: AxiosError | Error }>(
	'tasks/fetchDeleteTask',
	async (id, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.delete<ITask>(`/tasks/${id}`);
			return id;
		}
		catch (e) {
			if (axios.isAxiosError(e)) {
				return rejectWithValue(e as AxiosError)
			}
			return rejectWithValue(e as Error);
		}
	}
)
type TaskState = {
	list: ITask[]
	status: string
	error: AxiosError | null | Error | undefined
}
const initialState: TaskState = {
	list: [],
	status: 'loading',
	error: null
}
const taskSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
	},
	extraReducers:
		builder => {
			builder.addCase(fetchCreateTask.fulfilled, (state, action) => {
				state.list.push(action.payload);
			})
			builder.addCase(fetchTasks.fulfilled, (state, action) => {
				state.list = action.payload;
			})
			builder.addCase(fetchChangeTaskStage.fulfilled, (state, action) => {
				const changedStageTask = state.list.find(task => task._id === action.payload._id);
				if (changedStageTask) {
					changedStageTask.stage++;
				}
			})
			builder.addCase(fetchChangeTasksDescription.fulfilled, (state, action) => {
				const changedDescriptionTask = state.list.find(task => task._id === action.payload._id);
				if (changedDescriptionTask) {
					changedDescriptionTask.description = action.payload.description;
				}
			})
			builder.addCase(fetchChangeTaskTitle.fulfilled, (state, action) => {
				const changedTitleTask = state.list.find(task => task._id === action.payload._id);
				if (changedTitleTask) {
					changedTitleTask.title = action.payload.title;
				}
			})
			builder.addCase(fetchDeleteTask.fulfilled, (state, action) => {
				state.list = state.list.filter((task) => task._id !== action.payload)
			})
			builder.addMatcher(isAnyOf(fetchTasks.pending,
				fetchDeleteTask.pending,
				fetchChangeTaskTitle.pending,
				fetchChangeTaskStage.pending,
				fetchChangeTasksDescription.pending,
				fetchCreateTask.pending), (state) => {
					state.status = 'loading';
					state.error = null;
				});
			builder.addMatcher(isAnyOf(fetchTasks.rejected,
				fetchDeleteTask.pending,
				fetchChangeTaskTitle.rejected,
				fetchChangeTaskStage.rejected,
				fetchChangeTasksDescription.rejected,
				fetchCreateTask.rejected), (state, action) => {
					state.status = 'rejected';
					state.error = action.payload;
				});
		}
})

export default taskSlice.reducer;