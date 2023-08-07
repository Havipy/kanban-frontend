import React from 'react'
import cl from './MyButton.module.scss'
const myButton = ({ children, decline, submit, rewrite, ...props }) => {
	const rootClasses = [cl.addCardButton];

	if (submit) {
		rootClasses.push(cl.submit);
	}
	if (decline) {
		rootClasses.push(cl.decline);
	}
	if (rewrite) {
		rootClasses.push(cl.rewrite);
	}

	return (
		<button {...props} className={rootClasses.join(' ')}>
			{children}
		</button>
	)
}

export default myButton