import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom"
import { selectIsAuth } from "../store/authSlice";
import { Children } from "react";

const RequireAuth = ({ children }) => {
	const location = useLocation();
	const isAuth = useSelector(selectIsAuth);
	if (!isAuth) {
		return <Navigate to='/login' state={{ from: location }}></Navigate>
	}
	return children
}

export default RequireAuth