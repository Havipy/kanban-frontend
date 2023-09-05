import { useState } from 'react';
import Dropdown from '../UI/dropdown/Dropdown';
import MyInput from '../UI/myInput/MyInput';
import BasicButton, { ButtonVariant } from '../UI/basicButton/BasicButton';
import { fetchChangeTaskStage, fetchCreateTask } from '../../store/taskSlice';
import { useFilteredTasks } from '../../hooks/useTasks';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { CSSTransition } from 'react-transition-group';
import cl from './AddCard.module.scss'

interface AddCardProps {
	type: string
	stage: number
}
const AddCard: React.FC<AddCardProps> = ({ type, stage }) => {

	const dispatch = useAppDispatch();
	const tasks = useAppSelector(state => state.tasks.list);
	const [inputOpen, setInputOpen] = useState<boolean>(false);
	const [showButton, setShowButton] = useState<boolean>(true);
	const [taskValue, setTaskValue] = useState<string>('');
	const previousTasks = useFilteredTasks(tasks, stage - 1);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (type !== 'Backlog') {
			dispatch(fetchChangeTaskStage(taskValue));
		}
		else {
			if (taskValue === '') {
				return;
			}
			dispatch(fetchCreateTask(taskValue));
		}
		setTaskValue('');
		setInputOpen(false);
	}
	return (
		<>
			<CSSTransition
				in={inputOpen}
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
					onSubmit={onSubmit}>

					{type === 'Backlog' ?
						<div className={cl.inputContainer}>
							<MyInput
								onChange={e => setTaskValue(e.target.value)}
								placeholder='Task...'
								value={taskValue}>
							</MyInput>
						</div>
						:
						<div className={cl.dropdownContainer}>
							<Dropdown items={previousTasks} setItemId={setTaskValue} initialValue='Choose tasks...'></Dropdown>
						</div>

					}

					<div className={cl.buttonContainer}>
						{(previousTasks.length > 0 || type === 'Backlog') &&
							<BasicButton
								variant={ButtonVariant.submit}>Submit</BasicButton>}
						<BasicButton
							variant={ButtonVariant.decline}
							onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
								e.preventDefault();
								setInputOpen(false);
							}}>Decline
						</BasicButton>
					</div>
				</form>
			</CSSTransition >
			{showButton &&
				<BasicButton
					onClick={() => setInputOpen(true)}>
					<b>+</b> Add card
				</BasicButton>
			}
		</>
	)
}
export default AddCard