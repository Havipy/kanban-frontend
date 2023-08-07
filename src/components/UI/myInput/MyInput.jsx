import React from 'react'
import cl from './MyInput.module.scss'
const MyInput = ({ children, ...props }) => {
	return (
		<input className={cl.myInput} {...props} >{children}</input>
	)
}

export default MyInput