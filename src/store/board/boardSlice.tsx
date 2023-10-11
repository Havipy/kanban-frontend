import { PayloadAction, createSlice, isAnyOf } from "@reduxjs/toolkit"
import { fetchAddSection, fetchBoardData, fetchDeleteSection } from "./asyncActions"
import { IBoard } from "../../types/board.interface"

type BoardState = {
	board: IBoard
	loading: boolean
	error: unknown
}
const initialState: BoardState = {
	board: {
		_id: '',
		title: '',
		sectionIds: [],
		user: ''
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
		boardDataReset: () => {
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
export const { reorderSections, boardDataReset } = boardSlice.actions;
export default boardSlice.reducer;