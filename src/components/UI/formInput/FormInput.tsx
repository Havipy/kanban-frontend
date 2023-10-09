import React, { useState } from 'react';

import cl from './FormInput.module.scss';
import { FieldError, FieldErrorsImpl, Merge, UseFormRegister } from 'react-hook-form';


interface FormInputProps {
	register: UseFormRegister<any>
	error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
	id: number
	name: 'email' | 'password' | 'fullName'
	label: string
	type: string
	inputOptions: {
		required: string;
	};
}
const FormInput: React.FC<FormInputProps> = (props) => {
	const [focused, setFocused] = useState(false);
	const { id, label, name, register, error, inputOptions, ...inputProps } = props;

	return (
		<>
			<div className={cl.inputField}>
				<input className={error ? [cl.input, cl.err].join(' ') : cl.input}
					{...inputProps}
					{...register(name, inputOptions)}
					onBlur={(e) => {
						if (!e.target.value.trim()) {
							e.target.value = '';
							setFocused(false);
						}
					}}
					onFocus={() =>
						setFocused(true)
					}
				/>
				<label className={focused ? `${cl.label} ${cl.active}` : cl.label}>{label}</label>
			</div>
			<div className={error ? [cl.errMessage, cl.errActive].join(' ') : cl.errMessage}>{String(error?.message) || 'error'}</div></>
	);
};

export default FormInput;