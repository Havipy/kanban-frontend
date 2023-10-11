import { Navigate } from "react-router-dom"
import { useAppSelector } from "../hooks/useRedux";
import { selectIsAuth } from "../store/auth/authSlice";

interface KanbanAuthCheckProps {
	children?: React.ReactNode
}
const KanbanAuthCheck: React.FC<KanbanAuthCheckProps> = ({ children }) => {
	const user = useAppSelector(state => state.auth);
	const board = useAppSelector(state => state.board);
	const isAuth = useAppSelector(selectIsAuth);

	if (!user.loading && !board.loading) {
		if (!isAuth) {
			return <Navigate to='/' ></Navigate>
		}
		if (user.data?._id !== board.board.user) {
			return <Navigate to='/boards' ></Navigate>
		}
	}
	return children

}
export default KanbanAuthCheck; 