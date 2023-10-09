import React from 'react';
import cl from './BoardsMenu.module.scss'
interface BoardsMenuMainProps {
	children?: React.ReactNode
}
const BoardsMenuMain: React.FC<BoardsMenuMainProps> = ({ children }) => {
	return (
		<main className={cl.main}>{children}</main>
	)
}

export default BoardsMenuMain