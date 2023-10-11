import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "..";
import { addSection, setSectionsData } from "../sections/sectionSlice";
import { setTasksData } from "../tasks/taskSlice";
import SectionService from "../../API/services/sectionService";
import BoardService from "../../API/services/boardService";

import { ICreateSection, ISectionIndexBoardId, ISectionTitleBoardId } from "../../types/section.interface";
import { IBoard } from "../../types/board.interface";


export const fetchAddSection = createAsyncThunk<ICreateSection, ISectionTitleBoardId, { rejectValue: string, dispatch: AppDispatch }>(
	'boards/fetchAddSection',
	async (sectionData, { rejectWithValue, dispatch }) => {
		try {
			const section = await SectionService.createSection(sectionData.title, sectionData.boardId);
			dispatch(addSection(section));
			return { _id: section._id, boardId: sectionData.boardId };
		}
		catch (e) {
			const error = axios.isAxiosError(e) ? e as AxiosError : e as Error;
			return rejectWithValue(error.message);
		}
	});
export const fetchBoardData = createAsyncThunk<IBoard, string, { rejectValue: string, dispatch: AppDispatch }>(
	'board/fetchBoardData',
	async (id, { rejectWithValue, dispatch }) => {
		try {
			const boardData = await BoardService.getData(id);
			dispatch(setSectionsData(boardData.sections));
			dispatch(setTasksData(boardData.tasks));
			return boardData.board;
		}
		catch (e) {
			const error = axios.isAxiosError(e) ? e as AxiosError : e as Error;
			return rejectWithValue(error.message);
		}
	}
);

export const fetchDeleteSection = createAsyncThunk<ISectionIndexBoardId, ISectionIndexBoardId, { rejectValue: string }>(
	'boards/fetchDeleteSection',
	async (sectionData, { rejectWithValue }) => {
		try {
			await SectionService.deleteSection(sectionData._id);
			await BoardService.updateBoardOnSectionRemoving(sectionData.boardId, sectionData.sectionIndex);
			return sectionData;
		}
		catch (e) {
			const error = axios.isAxiosError(e) ? e as AxiosError : e as Error;
			return rejectWithValue(error.message);
		}
	});
