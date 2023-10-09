import cl from './BasicInput.module.scss';
import React from 'react';

export enum InputVariant {
	sectionInput = 'sectionInput',
	addSectionInput = 'addSectionInput',
	addBoardInput = 'addBoardInput',
	hidden = 'hidden'
}
interface BasicInputProps {
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
	placeholder?: string,
	value?: string | number,
	children?: React.ReactNode,
	variant: InputVariant
}
const BasicInput = React.forwardRef<HTMLInputElement, BasicInputProps>((props, ref) => {
	const rootClasses = [cl.basicInput];

	switch (props.variant) {
		case (InputVariant.addSectionInput):
			rootClasses.push(cl.addSectionInput);
			break;
		case (InputVariant.sectionInput):
			rootClasses.push(cl.sectionInput);
			break;
		case (InputVariant.addBoardInput):
			rootClasses.push(cl.addBoardInput);
			break;
		default:
			break;
	}
	return (
		<input autoFocus={props.variant === InputVariant.sectionInput ? true : false} ref={ref} className={rootClasses.join(' ')} {...props}></input>
	)
})

export default BasicInput