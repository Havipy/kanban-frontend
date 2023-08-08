import React, { useState } from 'react'
import cl from './CardDescribtion.module.scss'
import MyTextArea from '../UI/myTextArea/MyTextArea'
import MyButton from '../UI/myButton/MyButton'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchChangeTasksDescription, fetchTasks } from '../../store/taskSlice'
import { useEffect } from 'react'
const CardDescribtion = () => {
	const { id } = useParams();
	const task = useSelector(state => state.tasks.tasks).find(task => String(task.id) === id);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchTasks());
	}, [dispatch])
	useEffect(() => {
		setInputValue(task?.description)
	}, [task])
	const [inputOpen, setInputOpen] = useState(false);
	const [inputValue, setInputValue] = useState();

	return (
		<div className={cl.wrapper}>
			<div className={cl.header}>
				<span className={cl.title}>{task?.name}</span>
				<Link to='/tasks' className={cl.exitButton}><img src='/img/cross-svgrepo-com.svg' alt='close button'></img></Link>
			</div>
			{inputOpen
				?
				<div className={cl.textareaContainer}><MyTextArea val={inputValue} setValue={setInputValue} disabled={true} /></div>

				:
				<p className={cl.text}>{inputValue ? inputValue : 'No decription'}</p>
			}
			<div className={cl.editButtonContainer}>
				<MyButton rewrite={!inputOpen} submit={inputOpen}
					onClick={() => {
						if (inputOpen) {
							if (!inputValue) {
								setInputValue('');
							}
							dispatch(fetchChangeTasksDescription({ id, newDescription: inputValue }))
						}
						setInputOpen(!inputOpen);
					}}>{!inputOpen ? 'Rewrite' : 'Submit'}</MyButton>
			</div>
		</div >

	)
}

export default CardDescribtion