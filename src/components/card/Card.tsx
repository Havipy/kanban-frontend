import { Link } from 'react-router-dom';
import { ITask } from '../../types/task.interface';

import cl from './Card.module.scss';
import { useState } from 'react';
import MyInput from '../UI/myInput/MyInput';
import { useAppDispatch } from '../../hooks/useRedux';
import { fetchChangeTaskTitle } from '../../store/taskSlice';


interface ICardProps {
	task: ITask
}

const Card: React.FC<ICardProps> = ({ task }) => {
	const [isInputOpen, setInputOpen] = useState<Boolean>(false);
	const [taskTitle, setTaskTitle] = useState<string>(task.title);
	const dispatch = useAppDispatch();
	return (
		isInputOpen
			?
			<div className={cl.inputContainer}>
				<MyInput value={taskTitle} onChange={e => setTaskTitle(e.target.value)}></MyInput>

				<div className={cl.submitTitleButton}
					onClick={() => {
						setInputOpen(false);
						dispatch(fetchChangeTaskTitle({ title: taskTitle, _id: task._id }))
					}}>Update</div>
			</div>
			:
			<div className={cl.card}>
				<Link to={`tasks/${task._id}`} className={cl.cardLink}>{taskTitle}</Link>
				<div className={cl.buttonsContainer}>
					<div className={cl.editButton} onClick={() => {
						setInputOpen(true);
					}}><img width='20' height='20' alt='dit button' src='/img/pen-svgrepo-com.svg'></img></div>
				</div>

			</div>
	)
}
export default Card