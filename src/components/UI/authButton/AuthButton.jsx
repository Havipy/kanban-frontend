import React from 'react'
import cl from './AuthButton.module.scss'
const AuthButton = ({ children, login, ...props }) => {
	const rootClasses = [cl.button];
	if (login) {
		rootClasses.push(cl.login);
	}
	return (
		<button {...props} className={rootClasses.join(' ')}>{children}</button>
	)
}
export default AuthButton