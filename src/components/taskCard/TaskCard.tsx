import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useState } from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { useAppDispatch } from '../../hooks/useRedux';
import { fetchUpdateTask } from '../../store/tasks/asyncActions';
import { fetchDeleteTask } from '../../store/sections/asyncActions';
import { ITask, ITaskDatafields } from '../../types/task.interface';
import BasicButton, { ButtonVariant } from '../UI/basicButton/BasicButton';
import cl from './TaskCard.module.scss';


interface TaskCardProps {
	task: ITask,
	sectionId: string,
	index: number
}
const TaskCard: React.FC<TaskCardProps> = ({ task, index, sectionId }) => {
	const [savedTaskData, setTaskData] = useState<ITaskDatafields>({ title: task.title, description: task.description });
	const [title, setTitle] = useState<string>(task.title);
	const [description, setDescription] = useState<string>(task.description);
	const [saveButton, setSaveButton] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	return (
		<div className={cl.taskCardContainer}>
			<input
				placeholder={'Добавьте заголовок...'}
				value={title}
				onChange={(e) => {
					setTitle(e.target.value);
					e.target.value.trim() !== savedTaskData.title || description !== savedTaskData.description ? setSaveButton(true) : setSaveButton(false);
				}}
				onBlur={(e) => {
					setTitle(e.target.value.trim());
				}}
				className={cl.taskTitle}
			/>
			<hr className={cl.line} />
			<div className={cl.editorContainer}>
				<CKEditor data={description}
					config={{ placeholder: "Добавьте описание..." }}
					onChange={(e, editor) => {
						const value = editor.getData();
						setDescription(value);
						value !== savedTaskData.description || title !== savedTaskData.title ? setSaveButton(true) : setSaveButton(false);
					}}
					editor={Editor}
				/>
			</div>
			<div className={cl.buttonsWrapper}>
				<div className={cl.buttonContainer}>
					<BasicButton
						onClick={() => {
							const newTitle = title.trim();
							const newDescription = description;
							dispatch(fetchUpdateTask({ _id: task._id, title: newTitle, description: newDescription }));
							setTaskData({ title: newTitle, description: newDescription });
							setSaveButton(false);
						}}
						visible={saveButton}
						variant={ButtonVariant.green}>Сохранить</BasicButton>
				</div>
				<div className={cl.buttonContainer}>
					<BasicButton
						onClick={() => dispatch(fetchDeleteTask({ _id: task._id, taskIndex: index, sectionId }))}
						visible={true}
						variant={ButtonVariant.red}>Удалить</BasicButton>
				</div>
			</div>
		</div>
	)
}

export default TaskCard;