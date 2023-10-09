import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Main from './main/Main';
import cl from './Layout.module.scss';

const KanbanLayout: React.FC = () => {
	return (
		<div className={cl.wrapper}>
			<Header />
			<Main>
				<Outlet />
			</Main>
		</div>
	)
}

export default KanbanLayout 