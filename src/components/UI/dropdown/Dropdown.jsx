import React, { useState } from 'react'
import cl from './Dropdown.module.scss'
const Dropdown = ({ items, initialValue, setItemId }) => {
	const [value, setValue] = useState(initialValue)
	const [isOpen, setOpen] = useState(false);
	const [placeholder, setPlaceholder] = useState(true);

	const onChangeItem = (e) => {
		const item = e.target.closest(`.${cl.dropdownItem}`)
		if (item) {
			setOpen(!isOpen);
			if (items.length > 0) {
				setPlaceholder(false);
				setValue(item.innerText);
				setItemId(item.dataset.itemid);
			}
		}
	}
	return (
		<div className={cl.dropdown}>
			<button
				onClick={(e) => {
					e.preventDefault();
					setOpen(!isOpen);
				}}
				className={placeholder ? [cl.placeholder, cl.dropdownButton].join(' ') : cl.dropdownButton}>{value}</button>
			<ul className={isOpen ? [cl.active, cl.dropdownList].join(' ') : cl.dropdownList} onClick={onChangeItem}>
				{items.length > 0
					?
					items.map(item => <li data-itemid={item.id} className={cl.dropdownItem} key={item.id}>{item.name}</li>)
					:
					<li className={cl.dropdownItem}>No tasks yet</li>}
			</ul>
		</div>
	)
}

export default Dropdown