import React from 'react'
import cl from './Card.module.scss'
import { Link } from 'react-router-dom'
const Card = ({ task }) => {
	return (
		<Link to={`${task.id}`} className={cl.card}>
			<div >{task.name}</div >
		</Link >
	)
}
export default Card