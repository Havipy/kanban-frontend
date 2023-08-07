import React, { useEffect, useRef } from 'react'
import cl from './MyTextArea.module.scss'
const MyTextArea = ({ val, setValue }) => {
	const textAreaRef = useRef(null);

	const resizeTextArea = () => {
		textAreaRef.current.style.height = "auto";
		textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
	};
	useEffect(resizeTextArea, [val]);
	const onChange = e => {
		setValue(e.target.value);
	};
	return (
		<div>
			<textarea className={cl.myTextArea} ref={textAreaRef} value={val} onChange={onChange} rows={1} />
		</div>
	);

}

export default MyTextArea