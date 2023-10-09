import { memo, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { ITask } from '../../types/task.interface';

import cl from './Task.module.scss';
import Modal from '../UI/modal/Modal';
import TaskCard from '../taskCard/TaskCard';

interface ICardProps {
	task: ITask,
	index: number,
	sectionId: string
}
const Task: React.FC<ICardProps> = memo(function ({ task, index, sectionId }) {
	const [modal, setModal] = useState<boolean>(false);
	return (
		<>
			<Draggable draggableId={task._id} index={index}>
				{(provided, snapshot) =>
					<div onClick={() => {
						setModal(true)
					}}
						className={snapshot.isDragging ? [cl.task, cl.active].join(' ') : cl.task} ref={provided.innerRef}
						{...provided.dragHandleProps}
						{...provided.draggableProps}>
						{task.title === '' ? 'Без названия' : task.title}
					</div>
				}
			</Draggable>
			<Modal setVisible={setModal} visible={modal}><TaskCard task={task} index={index} sectionId={sectionId}></TaskCard></Modal>
		</>

	)
})

export default Task