import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITask, ITaskMapData } from "../types/task.interface.js";
import axios, { AxiosError } from "axios";
import TaskService from "../API/services/taskService";

export const fetchUpdateTask = createAsyncThunk<ITask, ITask, { rejectValue: AxiosError | Error }>(
	'tasks/fetchUpdateTask',
	async (taskData, { rejectWithValue }) => {
		try {
			await TaskService.updateTask(taskData);
			return taskData;
		}
		catch (e) {
			const error = axios.isAxiosError(e) ? e as AxiosError : e as Error;
			return rejectWithValue(error);
		}
	}
);

type TaskState = {
	tasks: ITaskMapData
	status: string
	error: AxiosError | null | Error | undefined
}
const initialState: TaskState = {
	tasks: {},
	status: 'loading',
	error: null
}
const taskSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		setTasksData(state, action: PayloadAction<ITaskMapData>) {
			state.tasks = action.payload;
		},
		addTask(state, action: PayloadAction<ITask>) {
			state.tasks[action.payload._id] = action.payload;
		}
	},
	extraReducers:
		builder => {
			builder.addCase(fetchUpdateTask.fulfilled, (state, action) => {
				state.tasks[action.payload._id].title = action.payload.title;
				state.tasks[action.payload._id].description = action.payload.description;
			});
		}
});
export const { setTasksData, addTask } = taskSlice.actions;
export default taskSlice.reducer;