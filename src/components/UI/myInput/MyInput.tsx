import cl from './MyInput.module.scss';
import React from 'react';
interface MyInputProps {
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	placeholder?: string
	value?: string | number
	children?: React.ReactNode
	ref?: React.RefObject<HTMLInputElement>;
}
const MyInput: React.FC<MyInputProps> = (props) => {
	return (
		<input min="1" max="20" className={cl.myInput} {...props}></input>
	)
}

export default MyInput