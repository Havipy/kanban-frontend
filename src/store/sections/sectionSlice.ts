import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchAddTaskId, fetchDeleteTask, fetchUpdateSectionTitle } from "./asyncActions";

import { ISection, ISectionMapData, ISectionTasksIds, ISectionsStartEndTaskIds } from "../../types/section.interface";


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
			const sectionId = action.payload._id;
			const newTaskIds = action.payload.tasksIds;
			const section = state.sections[sectionId];
			if (section) {
				section.tasksIds = newTaskIds;
			}
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
			builder.addCase(fetchAddTaskId.fulfilled, (state, action) => {
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