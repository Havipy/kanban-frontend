import React, { useState, useEffect } from 'react';
import { useFetching } from '../../hooks/useFetching';
import { useAppDispatch } from '../../hooks/useRedux';
import { boardDataReset } from '../../store/board/boardSlice';
import BoardCard from '../../components/boardCard/BoardCard';
import AddBoard from '../../components/addBoard/AddBoard';
import LoadingCover from '../../components/UI/loadingCover/LoadingCover';
import BoardService from '../../API/services/boardService';
import { IBoard } from '../../types/board.interface';

import cl from './BoardsMenu.module.scss';

const BoardsMenu: React.FC = () => {

	const [boards, setBoards] = useState<IBoard[]>([]);
	const dispatch = useAppDispatch();

	const { fetchData, isLoading } = useFetching(async () => {
		const boards = await BoardService.getAll();
		setBoards(boards);

	});
	useEffect(() => {
		dispatch(boardDataReset());
		fetchData();

	}, []);

	const removeBoard = (id: string) => {
		setBoards([...boards].filter(board => board._id !== id));
	}

	const addBoard = (board: IBoard) => {
		setBoards([...boards, board]);
	}

	return (
		isLoading ?
			<LoadingCover />
			:
			<div className={cl.container}>
				<h3 className={cl.boardsMenuTitle}>Ваши доски</h3>
				<div className={cl.boardsCardContainer}>
					{boards.map(board =>
						<BoardCard
							removeBoard={removeBoard}
							key={board._id}
							id={board._id}
							title={board.title}
						/>)}
				</div>
				<AddBoard addBoard={addBoard}></AddBoard>
			</div>
	)
}
export default BoardsMenu;