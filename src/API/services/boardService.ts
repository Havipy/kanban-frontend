import { IBoard, IBoardData } from "../../types/board.interface";
import { ISectionMapData } from "../../types/section.interface";
import { ITaskMapData } from "../../types/task.interface";
import axiosClient from "../axiosClient";

export default class BoardService {
	static async getData(id: string) {
		const response = await axiosClient.get<IBoardData>(`/boards/${id}`);
		const sections: ISectionMapData = {};
		const tasks: ITaskMapData = {}
		response.data.sections.forEach(section => sections[section._id] = section);
		response.data.tasks.forEach(task => tasks[task._id] = task);
		return { board: response.data.board, tasks, sections };
	}
	static async getAll() {
		const response = await axiosClient.get<IBoard[]>(`/boards`);
		return response.data;
	}
	static async createBoard(title: string) {
		const response = await axiosClient.post<IBoard>('/boards', { title });
		return response.data;
	}
	static async removeBoard(boardId: string) {
		const response = await axiosClient.delete<string>(`/boards/${boardId}`);
		return response.data;
	}
	static async updateBoardOnSectionRemoving(boardId: string, sectionIndex: number) {
		const response = await axiosClient.patch<string>(`/boards/${boardId}/sections`, { index: sectionIndex });
		return response.data;
	}
	static async reorderSections(boardId: string, newSectionIds: string[]) {
		const response = await axiosClient.patch<string>(`/boards/${boardId}`, { newSectionIds });
		return response.data;
	}

}