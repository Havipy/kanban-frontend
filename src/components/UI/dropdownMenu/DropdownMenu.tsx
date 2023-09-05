import { logout } from '../../../store/authSlice';
import { useAppDispatch } from '../../../hooks/useRedux';
import React, { useState } from 'react';
import cl from './DropdownMenu.module.scss';

type DropdownItem = {
	id: string
	name: string
}
interface DropdownMenuProps {
	items: DropdownItem[]
}
const DropdownMenu: React.FC<DropdownMenuProps> = ({ items }) => {
	const dispatch = useAppDispatch();
	const [isOpen, setOpen] = useState<boolean>(false);
	return (
		<>
			<div
				onClick={() => { setOpen(!isOpen) }}
				className={isOpen ? [cl.profileButton, cl.active].join(' ') : cl.profileButton}>
				<img src="/img/arrow-down.svg" alt="arrow" />
			</div>
			<ul
				className={isOpen ? [cl.dropdownList, cl.active].join(' ') : cl.dropdownList}>
				{items.map(item =>
					<li
						key={item.id}
						className={cl.dropdownItem}
						onClick={() => {
							if (item.name === 'Log Out') {
								dispatch(logout())
							}
							setOpen(!isOpen)
						}}>{item.name}</li>)}
			</ul>
		</>
	)
}

export default DropdownMenu