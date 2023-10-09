import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import cl from './Header.module.scss';
import { reset } from '../../../store/boardSlice';


const Header: React.FC = () => {
	const title = useAppSelector(state => state.board.board.title);
	const dispatch = useAppDispatch();

	return (
		<header className={cl.header}>
			<div className={cl.headerContainer}>
				<div className={cl.navigationContainer}>
					<Link onClick={() => {
						console.log(1)
						dispatch(reset());
					}} className={cl.boardsLink} to="/boards" >Доски / </Link>
					<span>{title}</span>
				</div>
			</div>
		</header>
	)
}

export default Header