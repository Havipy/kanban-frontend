import React, { useEffect } from 'react';
import CardList from '../../components/cardList/CardList';
import { useDispatch } from 'react-redux';
import { fetchTasks } from '../../store/taskSlice';
import cl from './Kanban.module.scss'

function Kanban() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchTasks());
	}, [dispatch])

	return (
		<>
			<div className='kanban__container'>
				<div className={cl.wrapper}>
					<CardList type='Backlog' />
					<CardList type='Ready' />
					<CardList type='Prepare' />
					<CardList type='Finished' />
				</div>
			</div>
		</>
	);
}

export default Kanban;
