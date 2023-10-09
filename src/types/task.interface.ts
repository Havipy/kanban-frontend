
export interface ITask {
	_id: string,
	title: string,
	description: string
}
export interface ICreateTask extends Pick<ITask, '_id'> {
	sectionId: string
}
export interface ITaskDatafields extends Omit<ITask, '_id'> {

}
export interface ITaskMapData {
	[key: string]: ITask
}

export interface ITaskIndexSectionId extends Pick<ITask, '_id'> {
	taskIndex: number,
	sectionId: string,
}
export interface ITaskBoardId {
	_id: string,
	boardId: string
}