import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../../store/authSlice';
import cl from './Header.module.scss';
import AuthButton from '../../UI/authButton/AuthButton';
import DropdownMenu from '../../UI/dropdownMenu/DropdownMenu';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
	const isAuth = useSelector(selectIsAuth);

	return (
		<header className={cl.header}>
			<div className={cl.container}>
				<div className={cl.appLabel}><span className={cl.logo}>Awesome Kanban Board</span><span className={cl.logoAdaptive}>Kanban</span></div>
				{isAuth ?
					<div className={cl.profile}>
						<div className={cl.profileImg}><img src="/img/user-avatar.svg" alt="profile" /></div>

						<DropdownMenu
							items={[{ id: '1', name: 'Log Out' }]} />
					</div>
					:
					<div className={cl.buttonContainer}>
						<Link className={cl.link} to="/login"><AuthButton login={true}>Login</AuthButton></Link>
						<Link className={cl.link} to="/registration"><AuthButton>Sign up</AuthButton></Link>
					</div>}
			</div>
		</header>
	)
}

export default Header