import React from 'react'
import Card from '../card/Card'
import cl from './CardList.module.scss'
import AddCard from '../addCard/AddCard'

import { useFilteredTasks } from '../../hooks/useTasks'
import { useSelector } from 'react-redux'
const CardList = ({ type }) => {
	const tasks = useSelector(state => state.tasks.tasks);
	let tasksGroup;
	switch (type) {
		case 'Backlog':
			tasksGroup = 1;
			break;
		case 'Ready':
			tasksGroup = 2
			break;
		case 'Prepare':
			tasksGroup = 3
			break;
		case 'Finished':
			tasksGroup = 4
			break;
	};
	const filteredTasks = useFilteredTasks(tasks, tasksGroup);
	return (
		<div className={cl.container}>
			<div className={cl.title}>{type}</div>
			{filteredTasks.map(t => <Card key={t.id} name={t.name} task={t} />)}
			<AddCard type={type} stage={tasksGroup} />
		</div >

	)
}

export default CardList