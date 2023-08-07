import React, { Children } from 'react'
import cl from './FormButton.module.scss'
const FormButton = ({ children, ...props }) => {
	return (
		<button {...props} className={cl.button} >
			{children}
		</button >
	)
}

export default FormButton