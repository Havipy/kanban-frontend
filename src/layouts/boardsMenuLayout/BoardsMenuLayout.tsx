import React from 'react';
import { Outlet } from 'react-router-dom';
import BoardsMenuMain from './main/BoardsMenuMain';
import BoardsMenuHeader from './header/BoardsMenuHeader';

import cl from './BoardsMenuLayout.module.scss';
const BoardsMenuLayout: React.FC = () => {
	return (
		<div className={cl.wrapper}>
			<BoardsMenuHeader />
			<BoardsMenuMain>
				<Outlet />
			</BoardsMenuMain>
		</div>
	)
}

export default BoardsMenuLayout