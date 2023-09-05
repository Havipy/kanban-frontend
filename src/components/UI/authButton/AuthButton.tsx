import cl from './AuthButton.module.scss';

interface AuthButtonProps {
	login?: boolean
	children?: React.ReactNode
}
const AuthButton: React.FC<AuthButtonProps> = ({ children, login }) => {
	const rootClasses = [cl.button];
	if (login) {
		rootClasses.push(cl.login);
	}
	return (
		<button className={rootClasses.join(' ')}>{children}</button>
	)
}
export default AuthButton