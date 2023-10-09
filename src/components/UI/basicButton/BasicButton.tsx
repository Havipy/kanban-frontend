import cl from './BasicButton.module.scss';
export enum ButtonVariant {
	red = 'red',
	blue = 'blue',
	green = 'green',
	yellow = 'yellow',
}
interface BasicButtonProps {
	children?: React.ReactNode,
	variant: ButtonVariant,
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
	visible?: boolean
}
const BasicButton: React.FC<BasicButtonProps> = ({ children, variant, visible, ...props }) => {
	const rootClasses = [cl.button];
	if (visible) {
		rootClasses.push(cl.visible)
	}
	switch (variant) {
		case (ButtonVariant.blue):
			rootClasses.push(cl.blue);
			break;
		case (ButtonVariant.green):
			rootClasses.push(cl.green);
			break;
		case (ButtonVariant.red):
			rootClasses.push(cl.red);
			break;
		case (ButtonVariant.yellow):
			rootClasses.push(cl.yellow);
			break;
		default:
			break;
	}
	return (
		<button {...props} className={rootClasses.join(' ')}>{children}</button>
	)
}
export default BasicButton;