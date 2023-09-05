import { Navigate, useLocation } from "react-router-dom"
import { selectIsAuth } from "../store/authSlice";
import { useAppSelector } from "../hooks/useRedux";
interface RequireAuthProps {
	children?: React.ReactNode
}
const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
	const location = useLocation();
	const isAuth = useAppSelector(selectIsAuth);
	const { status } = useAppSelector(state => state.auth);

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