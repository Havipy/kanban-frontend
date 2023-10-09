import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios, { AxiosError } from "axios";
import SectionService from "../API/services/sectionService";
import TaskService from "../API/services/taskService";

import { AppDispatch } from ".";
import { addTask } from "./taskSlice";

import { ICreateTask, ITaskIndexSectionId } from "../types/task.interface";
import { ISection, ISectionIdBoardId, ISectionMapData, ISectionNewTitle, ISectionTasksIds, ISectionsStartEndTaskIds } from "../types/section.interface";



export const fetchAddTask = createAsyncThunk<ICreateTask, ISectionIdBoardId, { rejectValue: AxiosError | Error, dispatch: AppDispatch }>(
	'sections/fetchAddTask',
	async (sectionData, { rejectWithValue, dispatch }) => {
		try {
			const task = await TaskService.createTask(sectionData._id, sectionData.boardId);
			dispatch(addTask(task));
			return { _id: task._id, sectionId: sectionData._id };
		}
		catch (e) {
			const error = axios.isAxiosError(e) ? e as AxiosError : e as Error;
			return rejectWithValue(error);
		}
	});
export const fetchDeleteTask = createAsyncThunk<ITaskIndexSectionId, ITaskIndexSectionId, { rejectValue: AxiosError | Error }>(
	'sections/fetchDeleteTask',
	async (data, { rejectWithValue }) => {
		try {
			await TaskService.deleteTask(data._id);
			await SectionService.updateSectionOnTaskRemoving(data);
			return data;
		}
		catch (e) {
			const error = axios.isAxiosError(e) ? e as AxiosError : e as Error;
			return rejectWithValue(error);
		}
	});
export const fetchUpdateSectionTitle = createAsyncThunk<ISectionNewTitle, ISectionNewTitle, { rejectValue: AxiosError | Error }>(
	'sections/fetchUpdateSectionTitle',
	async (sectionData, { rejectWithValue }) => {
		try {
			const section = SectionService.updateSectionTitle(sectionData._id, sectionData.title);
			return section;
		}
		catch (e) {
			const error = axios.isAxiosError(e) ? e as AxiosError : e as Error;
			return rejectWithValue(error);
		}
	});
type SectionState = {
	sections: ISectionMapData,
	status: string,
	error: unknown,
}
const initialState: SectionState = {
	sections: {},
	status: 'loading',
	error: null
}
const sectionSlice = createSlice({
	name: 'sections',
	initialState,
	reducers: {
		setSectionsData(state, action: PayloadAction<ISectionMapData>) {
			state.sections = action.payload;
		},
		reorderTasksInSection(state, action: PayloadAction<ISectionTasksIds>) {
			const section = state.sections[action.payload._id];
			if (section) section.tasksIds = action.payload.tasksIds
		},
		addSection(state, action: PayloadAction<ISection>) {
			state.sections[action.payload._id] = action.payload;
		},
		moveTasksBetweenSections(state, action: PayloadAction<ISectionsStartEndTaskIds>) {
			const startSection = state.sections[action.payload.startSection._id];
			const endSection = state.sections[action.payload.endSection._id];
			if (startSection && endSection) {
				startSection.tasksIds = action.payload.startSection.tasksIds;
				endSection.tasksIds = action.payload.endSection.tasksIds;
			}
		},

	},
	extraReducers:
		builder => {
			builder.addCase(fetchAddTask.fulfilled, (state, action) => {
				const { _id, sectionId } = action.payload;
				state.sections[sectionId].tasksIds.push(_id);
			});
			builder.addCase(fetchDeleteTask.fulfilled, (state, action) => {
				const section = state.sections[action.payload.sectionId]
				const taskIds = [...section.tasksIds];
				taskIds.splice(action.payload.taskIndex, 1);
				section.tasksIds = taskIds;
			});
			builder.addCase(fetchUpdateSectionTitle.fulfilled, (state, action) => {
				state.sections[action.payload._id].title = action.payload.title;
			})
		}
});
export const { setSectionsData, reorderTasksInSection, addSection, moveTasksBetweenSections } = sectionSlice.actions;
export default sectionSlice.reducer;