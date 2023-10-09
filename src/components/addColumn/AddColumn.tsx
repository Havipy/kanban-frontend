import React, { useState } from 'react';

import { useAppDispatch } from '../../hooks/useRedux';
import { fetchAddSection } from '../../store/boardSlice';
import BasicInput, { InputVariant } from '../UI/basicInput/BasicInput';

import cl from './AddColumn.module.scss';

interface AddColumnProps {
	boardId: string | undefined,
}

const AddColumn: React.FC<AddColumnProps> = React.memo(function ({ boardId }) {
	const [title, setTitle] = useState<string>('');
	const dispatch = useAppDispatch();
	const onsubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (title.trim() === '') {
			return;
		}
		if (boardId) {
			dispatch(fetchAddSection({ title, boardId }));
		}
		setTitle('');
	}
	return (
		<form
			onSubmit={onsubmit}
			className={cl.addColumnForm}>
			<BasicInput
				value={title}
				variant={InputVariant.addSectionInput}
				onChange={(e) => setTitle(e.target.value)}
				placeholder={'Добавьте колонку...'}>
			</BasicInput>
		</form>
	)
});

export default AddColumn;