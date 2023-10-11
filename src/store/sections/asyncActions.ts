import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import SectionService from "../../API/services/sectionService";
import TaskService from "../../API/services/taskService";

import { AppDispatch } from "..";
import { addTask } from "../tasks/taskSlice";

import { ICreateTask, ITaskIndexSectionId } from "../../types/task.interface";
import { ISectionIdBoardId, ISectionNewTitle } from "../../types/section.interface";



export const fetchAddTaskId = createAsyncThunk<ICreateTask, ISectionIdBoardId, { rejectValue: AxiosError | Error, dispatch: AppDispatch }>(
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