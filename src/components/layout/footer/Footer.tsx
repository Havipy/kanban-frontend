import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/useRedux';
import cl from './Footer.module.scss';
import { useGetTasksCount } from '../../../hooks/useTasks';

const Footer: React.FC = () => {
	const { pathname } = useLocation();
	const tasksCount = useGetTasksCount();
	const { data } = useAppSelector(state => state.auth)
	return (
		<footer className={cl.footer}>
			<div className={cl.container}>
				{(pathname === '/' || pathname === '/description') &&
					<>
						<div className={cl.tasksCounter}>
							<div>Active tasks: {tasksCount.activeTasks}</div>
							<div>Finished tasks: {tasksCount.finishedTasks}</div>
						</div>
						<div>Kanban by: {data?.fullName}</div>
					</>
				}
			</div>
		</footer >
	)
}

export default Footer