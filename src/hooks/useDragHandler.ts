import { DropResult } from "react-beautiful-dnd";
import { useAppDispatch } from "./useRedux";
import { moveTasksBetweenSections, reorderTasksInSection } from "../store/sectionSlice";
import { reorderSections } from "../store/boardSlice";

import SectionService from "../API/services/sectionService";
import BoardService from "../API/services/boardService";

import { ISection } from "../types/section.interface";


export const useDragHandler = (sections: ISection[], sectionIds: string[]) => {
	const dispatch = useAppDispatch();
	return async (result: DropResult) => {
		const { destination, source, draggableId, type } = result;
		if (!destination) {
			return
		}
		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}
		if (type === 'column') {
			const newSectionIds = [...sectionIds];
			newSectionIds.splice(source.index, 1);
			newSectionIds.splice(destination.index, 0, draggableId);
			dispatch(reorderSections(newSectionIds));
			await BoardService.reorderSections(source.droppableId, newSectionIds);
			return;
		}
		const startSection = sections.find(section => section._id === source.droppableId);
		const endSection = sections.find(section => section._id === destination.droppableId);
		if (startSection && endSection) {
			const newTasksIds = [...startSection.tasksIds];
			if (startSection === endSection) {
				newTasksIds.splice(source.index, 1);
				newTasksIds.splice(destination.index, 0, draggableId);
				dispatch(reorderTasksInSection({ _id: source.droppableId, tasksIds: newTasksIds }));
				await SectionService.reorderTasksInSection({ _id: source.droppableId, tasksIds: newTasksIds });
			}
			else {
				const startTaskIds = [...startSection.tasksIds];
				const endTaskIds = [...endSection.tasksIds];
				startTaskIds.splice(source.index, 1);
				endTaskIds.splice(destination.index, 0, draggableId);
				const newStartSection = {
					_id: source.droppableId,
					tasksIds: startTaskIds,
				}
				const newEndSection = {
					_id: destination.droppableId,
					tasksIds: endTaskIds,
				}
				dispatch(moveTasksBetweenSections({ startSection: newStartSection, endSection: newEndSection }));
				await SectionService.moveTasksBetweenSections({ startSection: newStartSection, endSection: newEndSection });
			}
		}
	}
}