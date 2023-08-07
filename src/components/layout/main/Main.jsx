import React from 'react'
import cl from './Main.module.scss'
const Main = ({ children }) => {
	return (
		<div className={cl.main}>{children}</div>
	)
}
export default Main