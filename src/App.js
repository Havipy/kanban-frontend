
import { Route, Routes } from 'react-router-dom';
import './styles/scss/App.scss'
import Kanban from './pages/kanban/Kanban';
import NotFound from './pages/notFound/NotFound';
import Describtion from './pages/describtion/Describtion';
import Layout from './components/layout/Layout';
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchLogin } from './store/authSlice';
import RequireAuth from './hoc/RequireAuth';


function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		console.log(dispatch(fetchLogin()));
	}, [dispatch])
	return (
		<Routes>
			<Route path='/' element={< Layout />} >
				<Route index element={<RequireAuth><Kanban /></RequireAuth>} />
				<Route path='/:id' element={< Describtion />} />
				<Route path='login' element={< Login />} />
				<Route path='registration' element={< Registration />} />
				<Route path='*' element={< NotFound />} />
			</Route>
		</Routes>
	)
}

export default App;
