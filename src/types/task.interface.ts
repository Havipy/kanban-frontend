export interface ITaskModel {

}
export interface ITask {
	_id: string
	title: string
	stage: number
	description: string
}


export interface ITaskNewDescribtion extends Omit<ITask, 'title' | 'stage'> {
}
export interface ITaskNewStage extends Omit<ITask, 'title' | 'description'> {
}
export interface ITaskNewTitle extends Omit<ITask, 'stage' | 'description'> { } 