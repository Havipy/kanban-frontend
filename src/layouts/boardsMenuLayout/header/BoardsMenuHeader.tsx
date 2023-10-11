import React from 'react'

import AuthButton, { AuthButtonVariant } from '../../../components/UI/authButton/AuthButton';
import { useAppDispatch } from '../../../hooks/useRedux';
import { logout } from '../../../store/auth/authSlice';
import cl from './BoardsMenuHeader.module.scss';

const BoardsMenuHeader: React.FC = () => {
	const dispatch = useAppDispatch();
	return (
		<header className={cl.header}>
			<div className={cl.container}>
				<div className={cl.buttonContainer}><AuthButton onClick={() => dispatch(logout())} variant={AuthButtonVariant.red} to={'/'}>Выйти</AuthButton></div>
			</div>
		</header>
	)
}
export default BoardsMenuHeader;