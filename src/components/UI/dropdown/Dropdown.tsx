import { Dispatch, SetStateAction, useState } from 'react'
import cl from './Dropdown.module.scss'

interface ItemProperties {
	_id: string
	title: string
}
interface DropdownProps<T> {
	items: T[]
	initialValue: string
	setItemId: Dispatch<SetStateAction<string>>
}

function Dropdown<T extends ItemProperties>(props: React.PropsWithChildren<DropdownProps<T>>) {
	const [value, setValue] = useState<string>(props.initialValue)
	const [isOpen, setOpen] = useState<Boolean>(false);
	const [placeholder, setPlaceholder] = useState(true);

	return (
		<div className={cl.dropdown}>
			<button
				onClick={(e) => {
					e.preventDefault();
					setOpen(!isOpen);
				}}
				className={placeholder ? [cl.placeholder, cl.dropdownButton].join(' ') : cl.dropdownButton}>{value}</button>
			<ul className={isOpen ? [cl.active, cl.dropdownList].join(' ') : cl.dropdownList} >
				{props.items.length > 0
					?
					props.items.map(item => <li
						key={item._id}
						onClick={() => {
							setOpen(!isOpen);
							if (props.items.length > 0) {
								setPlaceholder(false);
								props.setItemId(item._id);
								setValue(item.title);
							}
						}}
						className={cl.dropdownItem}
					>{item.title}</li>)
					:
					<li className={cl.dropdownItem} onClick={() => setOpen(!isOpen)}>No tasks yet</li>}
			</ul>
		</div >
	)
}

export default Dropdown