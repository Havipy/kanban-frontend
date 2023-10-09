import React from 'react';
import AuthButton, { AuthButtonVariant } from '../../../components/UI/authButton/AuthButton';
import { Link } from 'react-router-dom';
import cl from './AuthHeader.module.scss';

const AuthHeader: React.FC = () => {
	return (
		<header className={cl.header}>
			<div className={cl.container}>
				<Link to='/' className={cl.kabanLogo}>Spry
				</Link>
				<div className={cl.buttonContainer}><AuthButton to={'/registration'} variant={AuthButtonVariant.pink}>Регистрация</AuthButton></div>
			</div>
		</header>
	)
}

export default AuthHeader