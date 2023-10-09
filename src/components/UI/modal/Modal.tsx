import React from 'react';
import cl from './Modal.module.scss';
interface ModalProps {
	children?: React.ReactNode,
	visible: boolean,
	setVisible: React.Dispatch<React.SetStateAction<boolean>>
}
const Modal: React.FC<ModalProps> = ({ children, visible, setVisible }) => {
	return (
		<div
			onClick={() => setVisible(false)}
			className={visible ? [cl.modal, cl.active].join(' ') : cl.modal}>
			<div className={cl.modalContent} onClick={e => e.stopPropagation()}>{children}</div>
		</div>
	)
}

export default Modal