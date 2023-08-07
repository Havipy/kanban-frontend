import React from 'react'
import { Link } from 'react-router-dom'
import cl from './NotFound.module.scss'
const NotFound = () => {
	return (
		<main className={cl.container}>
			<h1 className={cl.title}>404</h1>
			<h2 className={cl.subtitle}>Page not found</h2>
			<div className={cl.link}><Link to="/tasks" >Home Page</Link></div>
		</main>
	)
}

export default NotFound