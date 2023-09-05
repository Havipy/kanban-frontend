import React, { useState } from 'react';
import MyTextArea from '../UI/myTextArea/MyTextArea';
import BasicButton, { ButtonVariant } from '../UI/basicButton/BasicButton';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchChangeTasksDescription, fetchDeleteTask } from '../../store/taskSlice';
import { useEffect } from 'react';
import axiosInstance from '../../axios';
import { ITask } from '../../types/task.interface';
import { useAppDispatch } from '../../hooks/useRedux';

import cl from './CardDescribtion.module.scss';
import { ClimbingBoxLoader } from 'react-spinners';


const CardDescription: React.FC = () => {
	const { id } = useParams<{ id?: string }>();
	const [inputOpen, setInputOpen] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>();
	const [isLoading, setLoading] = useState<boolean>(true);
	const [task, setTask] = useState<ITask>();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	useEffect(() => {

		axiosInstance.get<ITask>(`tasks/${id}`).then((res) => {
			setTask(res.data);
			setInputValue(res.data.description)
			setLoading(false);
		}).catch((e) => {
			navigate('/tasks');
			alert(e);

		})
	}, [id])
	if (isLoading) {
		return <ClimbingBoxLoader
			color={'#F37A24'}
			loading={isLoading}
			cssOverride={{
				display: "block",
				margin: "150px auto 0px",
				borderColor: "red",
				justifySelf: 'center'
			}}
			size={30}
			aria-label="Loading Spinner"
			data-testid="loader"></ClimbingBoxLoader>
	}
	return (
		<div className={cl.wrapper}>
			<div className={cl.header}>
				<span className={cl.title}>{task?.title}</span>
				<Link to='/' className={cl.exitButton}>
					<img src='/img/cross-svgrepo-com.svg' alt='close button'></img>
				</Link>
			</div>
			{inputOpen
				?
				<div className={cl.textareaContainer}>
					<MyTextArea val={inputValue} onChange={(e) => setInputValue(e.target.value)} /></div>
				:
				<p className={cl.text}>{inputValue ? inputValue : 'No decription'}</p>
			}
			<div className={cl.editButtonContainer}>
				<BasicButton variant={inputOpen ? ButtonVariant.submit : ButtonVariant.rewrite}
					onClick={() => {
						if (inputOpen) {
							if (!inputValue) {
								setInputValue('');
							}
							if (id && inputValue) {
								dispatch(fetchChangeTasksDescription({ _id: id, description: inputValue }))
							}
						}
						setInputOpen(!inputOpen);
					}}>{!inputOpen ? 'Rewrite' : 'Submit'}</BasicButton>
				<BasicButton variant={ButtonVariant.decline} onClick={() => {
					dispatch(fetchDeleteTask(id));
					navigate('/')
				}}>Delete Task</BasicButton>
			</div>
		</div >
	)
}
export default CardDescription