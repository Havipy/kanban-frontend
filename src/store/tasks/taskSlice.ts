import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITask, ITaskMapData } from "../../types/task.interface.js";
import { fetchUpdateTask } from "./asyncActions";

type TaskState = {
	tasks: ITaskMapData
	loading: boolean
	error: unknown
}
const initialState: TaskState = {
	tasks: {},
	loading: true,
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
				state.loading = false;
			});
			builder.addCase(fetchUpdateTask.pending, (state, action) => {
				state.loading = true;
			})
			builder.addCase(fetchUpdateTask.rejected, (state, action) => {
				state.error = action.payload;
				state.loading = false;
			});

		}
});
export const { setTasksData, addTask } = taskSlice.actions;
export default taskSlice.reducer;