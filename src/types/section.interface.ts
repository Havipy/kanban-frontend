

export interface ISection {
	_id: string,
	title: string,
	tasksIds: string[],
}
export interface ISectionTasksIds extends Omit<ISection, 'title'> {
}
export interface ISectionsStartEndTaskIds {
	startSection: ISectionTasksIds,
	endSection: ISectionTasksIds,
}
export interface ISectionMapData {
	[key: string]: ISection
}
export interface ISectionIdBoardId {
	_id: string,
	boardId: string
}
export interface ISectionTitleBoardId extends Pick<ISection, 'title'> {
	boardId: string,
}
export interface ICreateSection extends Pick<ISection, '_id'> {
	boardId: string,
}
export interface ISectionIndexBoardId extends Pick<ISection, '_id'> {
	sectionIndex: number,
	boardId: string,
}
export interface ISectionNewTitle extends Omit<ISection, 'tasksIds'> {

}