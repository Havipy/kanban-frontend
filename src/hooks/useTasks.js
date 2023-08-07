import { useMemo } from 'react';
export const useFilteredTasks = (tasks, stage) => {
	const filteredTasks = useMemo(() => {
		return tasks.filter(t => {
			return t.stage === stage
		})
	}, [tasks, stage]);
	return filteredTasks;
}