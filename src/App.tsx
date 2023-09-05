import { Route, Routes } from 'react-router-dom';
import Kanban from './pages/kanban/Kanban';
import NotFound from './pages/notFound/NotFound';
import Description from './pages/description/Description';
import Layout from './components/layout/Layout';
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';
import { useEffect } from 'react';
import { fetchLogin } from './store/authSlice';
import { useAppDispatch } from './hooks/useRedux';
import RequireAuth from './hoc/RequireAuth';
import './styles/scss/App.scss'


function App() {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchLogin());
	}, [dispatch])
	return (
		<Routes>
			<Route path='/' element={< Layout />} >
				<Route index element={<RequireAuth><Kanban /></RequireAuth>} />
				<Route path='tasks/:id' element={< Description />} />
				<Route path='login' element={< Login />} />
				<Route path='registration' element={< Registration />} />
				<Route path='*' element={< NotFound />} />
			</Route>

		</Routes>
	)
}

export default App;
