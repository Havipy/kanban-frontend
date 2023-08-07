import React from 'react'
import { useSelector } from 'react-redux'
import cl from './Footer.module.scss'
import { selectIsAuth } from '../../../store/authSlice';
import { useLocation, useParams } from 'react-router-dom';
const Footer = () => {
	const isAuth = useSelector(selectIsAuth);
	const { pathname } = useLocation();
	const tasks = useSelector(state => state.tasks.tasks);
	const { data } = useSelector(state => state.auth)
	return (
		<footer className={cl.footer}>
			<div className={cl.container}>
				{pathname !== '/login' &&
					<>
						<div className={cl.tasksCounter}>
							<div>Active tasks: {tasks.filter(task => task.stage !== 4).length}</div>
							<div>Finished tasks: {tasks.filter(task => task.stage === 4).length}</div>
						</div>
						<div>Kanban by: {data?.fullName}</div>
					</>
				}
			</div>
		</footer >
	)
}

export default Footer