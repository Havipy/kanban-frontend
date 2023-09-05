import { useEffect } from 'react';
import CardList from '../../components/cardList/CardList';

import cl from './Kanban.module.scss'
import { useAppDispatch } from '../../hooks/useRedux';
import { fetchTasks } from '../../store/taskSlice';

const Kanban: React.FC = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchTasks());
	}, [dispatch])
	return (
		<>
			<div className='kanban__container'>
				<div className={cl.wrapper}>
					<CardList type='Backlog' />
					<CardList type='Ready' />
					<CardList type='In progress' />
					<CardList type='Finished' />
				</div>
			</div>
		</>
	);
}

export default Kanban;
