import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../axios.js'
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, { rejectWithValue, dispatch }) => {
	try {
		const { data } = await axios.get('/tasks')
		if (!data) {
			dispatch(fetchCreateTasks());
			return [];
		}
		return data.tasks
	}
	catch (e) {
		rejectWithValue(e)
	}
})
export const fetchCreateTasks = createAsyncThunk('tasks/fetchCreateTasks', async (_, { rejectWithValue, getState }) => {
	try {

		const { data } = await axios.post('/tasks', { tasks: [] });
		console.log(data)
		return data.tasks
	}
	catch (e) {
		rejectWithValue(e)
	}
})
export const fetchAddTasks = createAsyncThunk('tasks/fetchAddTasks', async (card, { rejectWithValue, getState }) => {
	const tasks = getState().tasks.tasks;
	try {
		await axios.patch('/tasks', { tasks: [...tasks, card] })
		return [...tasks, card];
	}
	catch (e) {
		rejectWithValue(e)
	}
})
export const fetchUpdateTasks = createAsyncThunk('tasks/fetchUpdateTasks', async (id, { rejectWithValue, getState, dispatch }) => {
	dispatch(changeCardStage(id))
	const tasks = getState().tasks.tasks;
	try {
		await axios.patch('/tasks', { tasks: tasks });
		return tasks;
	}
	catch (e) {
		rejectWithValue(e);
	}
})
export const fetchChangeTasksDescription = createAsyncThunk('tasks/fetchChangeTasksDescription', async (data, { rejectWithValue, getState, dispatch }) => {
	dispatch(changeCardDescription(data))
	const tasks = getState().tasks.tasks;

	try {
		await axios.patch('/tasks', { tasks })
		return tasks;
	}
	catch (e) {
		rejectWithValue(e)
	}
})


const taskSlice = createSlice({
	name: 'tasks',
	initialState: {
		tasks: [],
		status: null,
		error: null
	},
	reducers: {
		changeCardDescription(state, action) {
			state.tasks = state.tasks.map((t) => {
				if (t.id == action.payload.id) {
					t.description = action.payload.newDescription;
				}
				return t
			})

		},
		changeCardStage(state, action) {
			state.tasks = state.tasks.map((t) => {
				if (String(t.id) === action.payload) {
					t.id = Date.now();
					t.stage++
				}
				return t
			})
		}
	},

	extraReducers:
		builder => {
			for (const thunk of [fetchTasks, fetchAddTasks, fetchUpdateTasks, fetchChangeTasksDescription, fetchCreateTasks]) {
				builder.addCase(thunk.pending, (state) => {
					state.status = 'loading';
					state.error = null;
				})
				builder.addCase(thunk.fulfilled, (state, action) => {
					state.status = 'resolved';
					state.tasks = action.payload;
				})
				builder.addCase(thunk.rejected, (state, action) => {
					state.status = 'rejected';
					state.error = action.payload;
				})
			}
		}
})
export const { changeCardDescription, changeCardStage } = taskSlice.actions;
export default taskSlice.reducer;