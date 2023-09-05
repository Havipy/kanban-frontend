import cl from './BasicButton.module.scss';

export enum ButtonVariant {
	decline = 'decline',
	submit = 'submit',
	rewrite = 'rewrite'
}
interface BasicButtonProps {
	variant?: ButtonVariant,
	children: React.ReactNode,
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
}
const myButton: React.FC<BasicButtonProps> = ({ children, variant, onClick }) => {
	const rootClasses = [cl.addCardButton];
	switch (variant) {
		case (ButtonVariant.submit):
			rootClasses.push(cl.submit);
			break;
		case (ButtonVariant.decline):
			rootClasses.push(cl.decline);
			break;
		case (ButtonVariant.rewrite):
			rootClasses.push(cl.rewrite);
			break;
		default:
			break;
	}
	return (
		<button onClick={onClick} className={rootClasses.join(' ')}>
			{children}
		</button>
	)
}

export default myButton;