import { ISection } from "./section.interface";
import { ITask } from "./task.interface";

export interface IBoard {
	_id: string,
	title: string,
	sectionIds: string[],
	user: string,
}
export interface IBoardData {
	board: IBoard,
	sections: ISection[],
	tasks: ITask[],
}
