import { useRoutes } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchLogin } from './store/auth/asyncActions';
import { routes } from './router';
import { useAppDispatch, useAppSelector } from './hooks/useRedux';
import LoadingCover from './components/UI/loadingCover/LoadingCover';

import './styles/scss/App.scss';


function App() {

	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(state => state.auth.loading);
	const appRoutes = useRoutes(routes);

	useEffect(() => {
		dispatch(fetchLogin());
	}, [dispatch]);

	return (
		isLoading ?
			<LoadingCover />
			:
			appRoutes
	)
}

export default App;
