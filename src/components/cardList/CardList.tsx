import React from 'react';
import Card from '../card/Card';
import cl from './CardList.module.scss';
import AddCard from '../addCard/AddCard';
import { useFilteredTasks } from '../../hooks/useTasks';
import { useAppSelector } from '../../hooks/useRedux';

interface CardListProps {
	type: string
}
let tasksGroup: number;
const CardList: React.FC<CardListProps> = ({ type }) => {
	const tasks = useAppSelector(state => state.tasks.list)
	switch (type) {
		case 'Backlog':
			tasksGroup = 1;
			break;
		case 'Ready':
			tasksGroup = 2
			break;
		case 'In progress':
			tasksGroup = 3
			break;
		case 'Finished':
			tasksGroup = 4
			break;
	};
	const filteredTasks = useFilteredTasks(tasks, tasksGroup);
	return (
		<div className={cl.cardContainer}>
			<div className={cl.title}>{type}</div>

			{filteredTasks.map(t => <Card key={t._id} task={t} />)}
			<AddCard type={type} stage={tasksGroup} />
		</div >
	)
}

export default CardList