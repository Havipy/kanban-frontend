import React from 'react';
import cl from './Main.module.scss';

interface MainProps {
	children?: React.ReactNode
}
const Main: React.FC<MainProps> = ({ children }) => {
	return (
		<div className={cl.main}>{children}</div>
	)
}
export default Main