
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import TaskService from "../../API/services/taskService";
import { ITask } from "../../types/task.interface.js";

export const fetchUpdateTask = createAsyncThunk<ITask, ITask, { rejectValue: string }>(
	'tasks/fetchUpdateTask',
	async (taskData, { rejectWithValue }) => {
		try {
			await TaskService.updateTask(taskData);
			return taskData;
		}
		catch (e) {
			const error = axios.isAxiosError(e) ? e as AxiosError : e as Error;
			return rejectWithValue(error.message);
		}
	}
);