
import axiosClient from "../axiosClient";
import { ISection, ISectionMapData, ISectionTasksIds, ISectionsStartEndTaskIds } from "../../types/section.interface";
import { ITaskIndexSectionId } from "../../types/task.interface";

export default class SectionService {
	static async getSections() {
		const response = await axiosClient.get<ISection[]>('/sections');
		const sections: ISectionMapData = {};
		response.data.forEach(section => sections[section._id] = section);
		return sections;
	}
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
		const response = await axiosClient.patch<ISectionTasksIds>('/sections', { ...sections });
		return response.data;
	}
	static async updateSectionTitle(sectionId: string, title: string) {
		const response = await axiosClient.patch<ISection>(`/sections/${sectionId}/title`, { title });
		return response.data;
	}
	static async reorderTasksInSection(section: ISectionTasksIds) {
		const response = await axiosClient.patch<ISectionTasksIds>(`/sections/${section._id}`, { tasksIds: section.tasksIds });
		return response.data;
	}
}