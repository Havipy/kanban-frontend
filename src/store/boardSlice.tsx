import axios, { AxiosError } from "axios"
import { IBoard } from "../types/board.interface"
import { PayloadAction, createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit"
import BoardService from "../API/services/boardService";
import { AppDispatch } from ".";
import { addSection, setSectionsData } from "./sectionSlice";
import { setTasksData } from "./taskSlice";
import { ICreateSection, ISectionIndexBoardId, ISectionTitleBoardId } from "../types/section.interface";
import SectionService from "../API/services/sectionService";

export const fetchAddSection = createAsyncThunk<ICreateSection, ISectionTitleBoardId, { rejectValue: AxiosError | Error, dispatch: AppDispatch }>(
	'boards/fetchAddSection',
	async (sectionData, { rejectWithValue, dispatch }) => {
		try {
			const section = await SectionService.createSection(sectionData.title, sectionData.boardId);
			dispatch(addSection(section));
			return { _id: section._id, boardId: sectionData.boardId };
		}
		catch (e) {
			const error = axios.isAxiosError(e) ? e as AxiosError : e as Error;
			return rejectWithValue(error);
		}
	});
export const fetchBoardData = createAsyncThunk<IBoard, string, { rejectValue: AxiosError | Error, dispatch: AppDispatch }>(
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
			return rejectWithValue(error);
		}
	}
);

export const fetchDeleteSection = createAsyncThunk<ISectionIndexBoardId, ISectionIndexBoardId, { rejectValue: AxiosError | Error }>(
	'boards/fetchDeleteSection',
	async (sectionData, { rejectWithValue }) => {
		try {
			await SectionService.deleteSection(sectionData._id);
			await BoardService.updateBoardOnSectionRemoving(sectionData.boardId, sectionData.sectionIndex);
			return sectionData;
		}
		catch (e) {
			const error = axios.isAxiosError(e) ? e as AxiosError : e as Error;
			return rejectWithValue(error);
		}
	});


type BoardState = {
	board: IBoard
	loading: boolean
	error: AxiosError | null | Error | undefined
}
const initialState: BoardState = {
	board: {
		_id: '',
		title: '',
		sectionIds: []
	},
	loading: true,
	error: null
}
const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		reorderSections(state, action: PayloadAction<string[]>) {
			state.board.sectionIds = action.payload;
		},
		reset: () => {
			return initialState;
		}
	},
	extraReducers:
		builder => {

			builder.addCase(fetchBoardData.fulfilled, (state, action) => {
				state.board = action.payload;
				state.loading = false;
			});
			builder.addCase(fetchAddSection.fulfilled, (state, action) => {
				state.board.sectionIds.push(action.payload._id);
				state.loading = false;
			});
			builder.addCase(fetchDeleteSection.fulfilled, (state, action) => {
				state.board.sectionIds.splice(action.payload.sectionIndex, 1);
				state.loading = false;
			});
			builder.addCase(fetchBoardData.pending, (state) => {
				state.loading = true;
			})
			builder.addMatcher(isAnyOf(fetchBoardData.rejected, fetchAddSection.rejected, fetchDeleteSection.rejected),
				(state, action) => {
					state.error = action.payload;
					state.loading = false;
				})
		}
});
export const { reorderSections, reset } = boardSlice.actions;
export default boardSlice.reducer;