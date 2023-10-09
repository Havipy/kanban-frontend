import { ITask } from "../../types/task.interface";
import axiosClient from "../axiosClient";

export default class TaskService {
	static async createTask(sectionId: string, boardId: string) {
		const response = await axiosClient.post<ITask>(`/tasks`, { boardId, sectionId });
		return response.data;
	}
	static async updateTask(task: ITask) {
		const response = await axiosClient.patch<ITask>(`/tasks/${task._id}`, { title: task.title, description: task.description });
		return response.data;
	}
	static async deleteTask(id: string) {
		const response = await axiosClient.delete<string>(`/tasks/${id}`);
		return response.data;
	}
}