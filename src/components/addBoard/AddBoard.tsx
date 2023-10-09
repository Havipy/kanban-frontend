import React, { useState } from 'react'
import BasicInput, { InputVariant } from '../UI/basicInput/BasicInput';
import BoardService from '../../API/services/boardService';
import { IBoard } from '../../types/board.interface';
import cl from './AddBoard.module.scss';

interface AddBoardProps {
	addBoard: (board: IBoard) => void
}
const AddBoard: React.FC<AddBoardProps> = ({ addBoard }) => {

	const [title, setTitle] = useState<string>('');

	const addBoardHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (title.trim() === '') {
			return;
		}
		const board = await BoardService.createBoard(title);
		addBoard(board);
		setTitle('');
	}

	return (
		<form onSubmit={addBoardHandler}>
			<h4 className={cl.addBoardTitle}>Создать новую доску</h4>
			<div className={cl.inputContainer}>
				<BasicInput
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder='Введите название...' variant={InputVariant.addBoardInput} />
			</div>
		</form>
	)
}
export default AddBoard