import React from 'react';
import cl from './AuthMain.module.scss';

interface AuthMainProps {
	children?: React.ReactNode
}
const AuthMain: React.FC<AuthMainProps> = ({ children }) => {
	return (
		<main className={cl.main}>{children}</main>
	)
}
export default AuthMain