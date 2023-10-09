import React from 'react'
import AuthButton, { AuthButtonVariant } from '../../components/UI/authButton/AuthButton';
import image from '../../assets/img/28902449_7505324.svg';
import cl from './HomePage.module.scss';

const HomePage: React.FC = () => {

	return (
		<div className={cl.container}>
			<div className={cl.content}>
				<h1 className={cl.title}>Канбан - просто, эффективно, результативно!</h1>
				<h2 className={cl.subtitle}>Планировщик для личного использования, который поможет вам организовать свою жизнь и добиться большего.</h2>
				<div className={cl.buttonContainer}><AuthButton to={'/login'} variant={AuthButtonVariant.green}>Присоединиться</AuthButton></div>
			</div>
			<div className={cl.imgContainer}><img src={image} alt='homepage cover' /></div>
		</div>
	)
}
export default HomePage;