import { useState } from 'react';

import cl from './FormInput.module.scss';

const FormInput = (props) => {
	const [focused, setFocused] = useState(false);
	const { id, label, name, register, options, error, ...inputProps } = props;

	return (
		<>
			<div className={cl.inputField}>
				<input className={error ? [cl.input, cl.err].join(' ') : cl.input}
					{...inputProps}
					{...register(name, options)}
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
			<div className={error ? [cl.errMessage, cl.errActive].join(' ') : cl.errMessage}>{error?.message || 'error'}</div></>

	);
};

export default FormInput;