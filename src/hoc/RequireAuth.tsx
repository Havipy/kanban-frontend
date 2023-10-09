import { Navigate, useLocation } from "react-router-dom"
import { selectIsAuth } from "../store/authSlice";
import { useAppSelector } from "../hooks/useRedux";
interface RequireAuthProps {
	children?: React.ReactNode
}
const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
	const location = useLocation();
	const { error } = useAppSelector(state => state.auth);
	if (!error) {
		return children
	}
	else {
		return <Navigate to='/' state={{ from: location }}></Navigate>
	}
}
export default RequireAuth