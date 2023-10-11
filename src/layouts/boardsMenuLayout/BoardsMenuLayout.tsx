import React from 'react';
import { Outlet } from 'react-router-dom';
import BoardsMenuMain from './main/BoardsMenuMain';
import BoardsMenuHeader from './header/BoardsMenuHeader';
import BoardsMenuFooter from './footer/BoardsMenuFooter';

import cl from './BoardsMenuLayout.module.scss';

const BoardsMenuLayout: React.FC = () => {
	return (
		<div className={cl.wrapper}>
			<BoardsMenuHeader />
			<BoardsMenuMain>
				<Outlet />
			</BoardsMenuMain>
			<BoardsMenuFooter />
		</div>
	)
}

export default BoardsMenuLayout