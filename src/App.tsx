import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchLogin } from './store/authSlice';
import { useAppDispatch, useAppSelector } from './hooks/useRedux';
import RequireAuth from './hoc/RequireAuth';


import BoardsMenu from './pages/boardsMenu/BoardsMenu';
import Kanban from './pages/kanban/Kanban';
import NotFound from './pages/notFound/NotFound';
import HomePage from './pages/homePage/HomePage';
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';
import AuthLayout from './layouts/authLayout/AuthLayout';
import KanbanLayout from './layouts/kanbanLayout/KanbanLayout';
import BoardsMenuLayout from './layouts/boardsMenuLayout/BoardsMenuLayout';
import LoadingCover from './components/UI/loadingCover/LoadingCover';

import './styles/scss/App.scss';

function App() {
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(state => state.auth.loading);
	useEffect(() => {
		dispatch(fetchLogin());
	}, [dispatch])
	return (
		isLoading ?
			<LoadingCover />
			:
			<Routes>
				<Route path='/' element={<AuthLayout />}>
					<Route index element={<HomePage />} />
					<Route path='login' element={<Login />} />
					<Route path='registration' element={<Registration />} />
				</Route>
				<Route element={<BoardsMenuLayout />}>
					<Route path='boards' element={<RequireAuth><BoardsMenu /></RequireAuth>} />
				</Route>
				<Route element={< KanbanLayout />}>
					<Route path='/boards/:id' element={<RequireAuth><Kanban /></RequireAuth>} />
				</Route>
				<Route path='*' element={<NotFound />} />
			</Routes>
	)
}

export default App;
