import React, { useState, useRef } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { useAppDispatch } from '../../hooks/useRedux';
import { useSectionTasks } from '../../hooks/useTasks';
import { fetchAddTask, fetchUpdateSectionTitle } from '../../store/sectionSlice';
import { fetchDeleteSection } from '../../store/boardSlice';

import Task from '../task/Task';
import { ReactComponent as DeleteBucket } from '../../assets/img/delete-button-svgrepo-com.svg';
import BasicInput, { InputVariant } from '../UI/basicInput/BasicInput';

import cl from './Section.module.scss';

interface SectionProps {
	sectionTitle: string,
	sectionId: string,
	tasksIds: string[],
	boardId: string | undefined,
	children?: React.ReactNode,
	index: number
}

const Section: React.FC<SectionProps> = React.memo(function ({ sectionId, sectionTitle, tasksIds, boardId, index }) {
	const dispatch = useAppDispatch();
	const tasks = useSectionTasks(tasksIds);
	const [isInputOpen, setInputOpen] = useState<boolean>(false);
	const [title, setTitle] = useState<string>(sectionTitle);
	const inputRef = useRef<HTMLInputElement>(null);
	const submitHandler = () => {
		setInputOpen(false);
		if (title.trim() === '') {
			setTitle(sectionTitle);
			return
		}
		dispatch(fetchUpdateSectionTitle({ _id: sectionId, title: title }));
	}
	return (
		<Draggable draggableId={sectionId} index={index}>{(provided) => (
			<div {...provided.draggableProps}
				ref={provided.innerRef}
				className={cl.sectionContainer}>
				<div className={cl.sectionHeader}
					{...provided.dragHandleProps}
				>
					{isInputOpen ?
						<div className={cl.inputContainer}>
							<BasicInput
								ref={inputRef}
								value={title}
								variant={InputVariant.sectionInput}
								onChange={(e) => { setTitle(e.target.value) }}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										submitHandler();
									}
								}}
								onBlur={() => {
									submitHandler();
								}}>
							</BasicInput>
						</div>
						:
						<span className={cl.title}
							onClick={() => { setInputOpen(true) }}>{title}</span>
					}
					<div className={cl.buttonContainer}>
						<div className={cl.addTaskButton}
							onClick={() => {
								if (boardId) {
									dispatch(fetchAddTask({ _id: sectionId, boardId }));
								}
							}}>+</div>
						<DeleteBucket
							onClick={() => {
								if (boardId) {
									dispatch(fetchDeleteSection({ _id: sectionId, sectionIndex: index, boardId }));
								}
							}}
							className={cl.deleteBucket}>
						</DeleteBucket>
					</div>
				</div>
				<Droppable droppableId={sectionId} type='task'>
					{(provided, snapshot) =>
						<div className={snapshot.isDraggingOver ? [cl.tasksContainer, cl.active].join(' ') : cl.tasksContainer}
							ref={provided.innerRef}
							{...provided.droppableProps}>
							{tasks.map((t, index) => <Task key={t._id} sectionId={sectionId} task={t} index={index} />)}
							{provided.placeholder}
						</div>
					}
				</Droppable>
			</div>
		)}</Draggable>
	)
});

export default Section;