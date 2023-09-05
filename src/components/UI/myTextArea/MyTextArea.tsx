import { useEffect, useRef } from 'react'
import cl from './MyTextArea.module.scss'
interface MyTextAreaProps {
	val: string | undefined
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}
const MyTextArea: React.FC<MyTextAreaProps> = ({ val, onChange }) => {

	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const resizeTextArea = (): void => {
		if (textAreaRef.current) {
			textAreaRef.current.style.height = "auto";
			textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
		}
	}
	useEffect(resizeTextArea, [val]);

	return (
		<div>
			<textarea className={cl.myTextArea} ref={textAreaRef} value={val} onChange={onChange} rows={1} />
		</div>
	);
}

export default MyTextArea