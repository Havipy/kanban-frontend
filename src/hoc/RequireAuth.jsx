import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom"
import { selectIsAuth } from "../store/authSlice";
const RequireAuth = ({ children }) => {
	const location = useLocation();
	const isAuth = useSelector(selectIsAuth)
	const { status } = useSelector(state => state.auth)
	console.log(status)
	if (status === 'resolved') {
		if (!isAuth) {
			return <Navigate to='/login' state={{ from: location }}></Navigate>
		}
		return children
	}
	else if ((status === 'rejected')) {
		return <Navigate to='/login' state={{ from: location }}></Navigate>
	}
}
export default RequireAuth