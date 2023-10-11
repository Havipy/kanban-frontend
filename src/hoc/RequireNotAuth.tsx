import React from 'react'
import { Navigate } from "react-router-dom";
import { useAppSelector } from '../hooks/useRedux';
import { selectIsAuth } from '../store/auth/authSlice';

interface RequireNotAuthProps {
	children?: React.ReactNode
}
const RequireNotAuth: React.FC<RequireNotAuthProps> = ({ children }) => {
	const isAuth = useAppSelector(selectIsAuth);
	console.log();
	if (isAuth) {
		return <Navigate to='/boards' ></Navigate>
	}
	return children
}

export default RequireNotAuth