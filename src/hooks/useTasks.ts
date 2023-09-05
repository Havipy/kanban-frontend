import { useMemo } from 'react';
import { ITask } from '../types/task.interface';
import { useAppSelector } from './useRedux';

export const useFilteredTasks = (tasks: ITask[], stage: number): ITask[] => {
	const filteredTasks = useMemo(() => {
		return tasks.filter(t => {
			return t.stage === stage
		})
	}, [tasks, stage]);
	return filteredTasks;
}

export const useGetTasksCount = (): { activeTasks: number, finishedTasks: number } => {
	const tasks = useAppSelector(state => state.tasks.list);
	const tasksCount = useMemo(() => {
		return ({ activeTasks: tasks.filter(task => task.stage !== 4).length, finishedTasks: tasks.filter(task => task.stage === 4).length })
	}, [tasks])
	return tasksCount
};