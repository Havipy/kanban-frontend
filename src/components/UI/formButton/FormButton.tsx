import React from 'react'
import cl from './FormButton.module.scss'
interface FormButtonProps {
	children?: React.ReactNode
}
const FormButton: React.FC<FormButtonProps> = ({ children }) => {
	return (
		<button className={cl.button} >
			{children}
		</button >
	)
}
export default FormButton