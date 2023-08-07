import React, { useState, useRef } from 'react'
import Dropdown from '../UI/dropdown/Dropdown'
import MyInput from '../UI/myInput/MyInput'
import { CSSTransition } from 'react-transition-group';
import MyButton from '../UI/myButton/MyButton';
import cl from './AddCard.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddTasks, fetchUpdateTasks } from '../../store/taskSlice';
import { useFilteredTasks } from '../../hooks/useTasks';

const AddCard = ({ type, stage }) => {
	const dispatch = useDispatch();
	const tasks = useSelector(state => state.tasks.tasks);
	const [inputOpen, setInputOpen] = useState(false);
	const [showButton, setShowButton] = useState(true);
	const nodeRef = useRef(null);
	const [inputValue, setInputValue] = useState('');
	const previousTasks = useFilteredTasks(tasks, stage - 1);
	const onSubmit = (e) => {
		e.preventDefault();
		if (type !== 'Backlog') {
			dispatch(fetchUpdateTasks(inputValue));
		}
		else {
			if (inputValue === '') {
				return;
			}
			dispatch(fetchAddTasks({ id: Date.now(), name: inputValue, stage: 1 }));
		}
		setInputValue('');
		setInputOpen(false);
	}
	return (
		<>
			<CSSTransition
				in={inputOpen}
				nodeRef={nodeRef}
				classNames={{
					enter: cl.formInputEnter,
					enterActive: cl.formInputEnterActive,
					exit: cl.formInputExit,
					exitActive: cl.formInputExitActive,
				}}
				timeout={200}
				onEnter={() => setShowButton(false)}
				onExited={() => setShowButton(true)}
				unmountOnExit>
				<form
					ref={nodeRef}
					onSubmit={onSubmit}
				>
					<div className={cl.inputContainer}>
						{type === 'Backlog' ?
							<MyInput
								onChange={e => setInputValue(e.target.value)}
								placeholder='Task...'
								value={inputValue}>
							</MyInput>
							:
							<Dropdown items={previousTasks} setItemId={setInputValue} initialValue='Choose tasks...'></Dropdown>
						}
					</div>
					<div className={cl.buttonContainer}>
						{(previousTasks.length > 0 || type === 'Backlog') && <MyButton submit={true}>Submit</MyButton>}
						<MyButton decline={true} onClick={(e) => {
							e.preventDefault();
							setInputOpen(false)
						}}>Decline</MyButton>
					</div>
				</form>
			</CSSTransition >
			{showButton && <MyButton
				onClick={() => setInputOpen(true)}
				submit={false}>
				<b>+</b> Add card</MyButton>
			}
		</>
	)
}
export default AddCard