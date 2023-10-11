import React from 'react';
import { Outlet } from 'react-router-dom';
import AuthHeader from './header/AuthHeader';
import AuthMain from './main/AuthMain';

import AuthFooter from './footer/AuthFooter';
import cl from './AuthLayout.module.scss';

const AuthLayout: React.FC = () => {
	return (
		<div className={cl.wrapper}>
			<AuthHeader />
			<AuthMain>
				<Outlet />
			</AuthMain>
			<AuthFooter />
		</div>
	)
}

export default AuthLayout