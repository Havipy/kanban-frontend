import React from 'react'
import Header from './header/Header'
import cl from './Layout.module.scss'
import Main from './main/Main'
import { Outlet } from 'react-router-dom'
import Footer from './footer/Footer'

const Layout = () => {
	return (
		<div className={cl.wrapper}>
			<Header />
			<Main>
				<Outlet />
			</Main>
			<Footer />
		</div>
	)
}

export default Layout