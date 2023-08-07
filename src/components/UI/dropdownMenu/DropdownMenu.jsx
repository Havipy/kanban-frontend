import React from 'react'
import cl from './DropdownMenu.module.scss'

import { useDispatch } from 'react-redux';
import { logout } from '../../../store/authSlice';
const DropdownMenu = ({ close, items, isOpen }) => {
	const dispatch = useDispatch();
	const rootClasses = [cl.dropdownList];
	if (isOpen) {
		rootClasses.push(cl.active)
	}
	return (
		<ul
			className={rootClasses.join(' ')}>
			{items.map(item =>
				<li
					key={item.id}
					className={cl.dropdownItem}
					onClick={() => {
						if (item.name === 'Log Out') {
							dispatch(logout())
						}
						close(!isOpen)
					}}>{item.name}</li>)}
		</ul>
	)
}

export default DropdownMenu