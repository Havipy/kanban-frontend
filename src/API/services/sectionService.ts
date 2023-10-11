
import axiosClient from "../axiosClient";
import { ISection, ISectionTasksIds, ISectionsStartEndTaskIds } from "../../types/section.interface";
import { ITaskIndexSectionId } from "../../types/task.interface";

export default class SectionService {

	static async createSection(title: string, boardId: string) {
		const response = await axiosClient.post<ISection>(`/sections`, { title, boardId });

		return response.data;
	}
	static async deleteSection(id: string) {
		const response = await axiosClient.delete<string>(`/sections/${id}`);
		return response.data;
	}
	static async updateSectionOnTaskRemoving(data: ITaskIndexSectionId) {
		const response = await axiosClient.patch<string>(`/sections/${data.sectionId}/tasks`, { index: data.taskIndex });
		return response.data;
	}
	static async moveTasksBetweenSections(sections: ISectionsStartEndTaskIds) {
		const response = await axiosClient.patch<string>('/sections', { ...sections });
		return response.data;
	}
	static async updateSectionTitle(sectionId: string, title: string) {
		const response = await axiosClient.patch<ISection>(`/sections/${sectionId}/title`, { title });
		return response.data;
	}
	static async reorderTasksInSection(section: ISectionTasksIds) {
		const response = await axiosClient.patch<string>(`/sections/${section._id}`, { tasksIds: section.tasksIds });
		return response.data;
	}
}