import React from 'react'
import { Link } from 'react-router-dom';
import { ReactComponent as DeleteBucket } from '../../assets/img/delete-button-svgrepo-com.svg';

import BoardService from '../../API/services/boardService';
import cl from './BoardCard.module.scss';

interface BoardCardProps {
	title: string,
	id: string,
	removeBoard: (id: string) => void,
}
const BoardCard: React.FC<BoardCardProps> = ({ title, id, removeBoard }) => {
	return (
		<Link to={`/boards/${id}`} className={cl.boardLink}>
			<span className={cl.cardTitle}>{title}</span>
			<div className={cl.deleteButtonContainer}
				onClick={
					async (e) => {
						e.preventDefault();
						await BoardService.removeBoard(id);
						removeBoard(id);
					}}>
				<DeleteBucket className={cl.deleteBucket} />
			</div>
		</Link>
	)
}

export default BoardCard