import React from 'react';
import { Link } from 'react-router-dom';
import cl from './AuthButton.module.scss'
export enum AuthButtonVariant {
	green = 'green',
	pink = 'pink',
	red = 'red',
}
interface AuthButtonProps {
	children?: React.ReactNode,
	variant: AuthButtonVariant,
	onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void,
	to: string
}
const AuthButton: React.FC<AuthButtonProps> = ({ variant, children, to, ...props }) => {
	const rootClasses = [cl.authButton];
	switch (variant) {
		case (AuthButtonVariant.green):
			rootClasses.push(cl.green);
			break;
		case (AuthButtonVariant.pink):
			rootClasses.push(cl.pink);
			break;
		case (AuthButtonVariant.red):
			rootClasses.push(cl.red);
			break;
		default:
			break;
	}
	return (
		<Link {...props} to={to} className={rootClasses.join(' ')}>{children}</Link>
	)
}

export default AuthButton