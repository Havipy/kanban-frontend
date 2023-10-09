
import { ITask } from '../types/task.interface';
import { useMemo } from 'react';
import { useAppSelector } from './useRedux';

export const useSectionTasks = (taskIds: string[]): ITask[] => {
	const tasks = useAppSelector(state => state.tasks.tasks);
	const sectionTasks = useMemo(() => {
		return taskIds.map(id => { return tasks[id] })
	}, [taskIds, tasks])
	return sectionTasks;
}

