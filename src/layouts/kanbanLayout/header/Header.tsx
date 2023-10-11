import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/useRedux';


import cl from './Header.module.scss';



const Header: React.FC = () => {
	const title = useAppSelector(state => state.board.board.title);


	return (
		<header className={cl.header}>
			<div className={cl.headerContainer}>
				<div className={cl.navigationContainer}>
					<Link className={cl.boardsLink} to="/boards" >Доски / </Link>
					<span>{title}</span>
				</div>
			</div>
		</header>
	)
}

export default Header