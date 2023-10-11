import { Navigate } from "react-router-dom";

import { useAppSelector } from "../hooks/useRedux";
import { selectIsAuth } from "../store/auth/authSlice";

interface RequireAuthProps {
	children?: React.ReactNode
}
const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {

	const isAuth = useAppSelector(selectIsAuth)
	console.log();
	if (!isAuth) {
		return <Navigate to='/' ></Navigate>
	}
	return children
}
export default RequireAuth