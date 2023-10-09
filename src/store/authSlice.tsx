import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser, IUserFullData, IUserLogin } from '../types/user.interface.js';
import axios, { AxiosError } from 'axios';
import AuthService from '../API/services/authService';

export const fetchUserData = createAsyncThunk<IUserFullData, IUserLogin, { rejectValue: string }>(
	'auth/fetchUserData',
	async (userData, { rejectWithValue }) => {
		try {
			const data = await AuthService.loginUser(userData);

			return data;
		}
		catch (e) {
			const error = axios.isAxiosError(e) ? e as AxiosError : e as Error;
			return rejectWithValue(error.message);
		}
	})

export const fetchLogin = createAsyncThunk<IUser, undefined, { rejectValue: string }>(
	'auth/fetchLogin',
	async (_, { rejectWithValue }) => {
		try {
			const data = await AuthService.checkUserAuth();
			return data;
		}
		catch (e) {
			const error = axios.isAxiosError(e) ? e as AxiosError : e as Error;
			return rejectWithValue(error.message);
		}
	})
export const fetchRegister = createAsyncThunk<IUserFullData, IUser, { rejectValue: string }>(
	'auth/fetchRegister',
	async (userData, { rejectWithValue }) => {
		try {
			const data = await AuthService.registerUser(userData);
			return data;
		}
		catch (e) {
			const error = axios.isAxiosError(e) ? e as AxiosError : e as Error;
			return rejectWithValue(error.message);
		}
	})

type AuthState = {
	data: IUser | IUserFullData | null,
	loading: boolean,
	error: unknown
}
const initialState: AuthState = {
	data: null,
	loading: true,
	error: null
}
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.data = null;
			console.log(state);
			window.localStorage.removeItem('token');
		}
	},
	extraReducers:
		builder => {
			for (const thunk of [fetchUserData, fetchLogin, fetchRegister]) {
				builder.addCase(thunk.pending, (state) => {
					state.loading = false
					state.error = null;
				});
				builder.addCase(thunk.fulfilled, (state, action) => {
					state.loading = false;
					state.data = action.payload;
				});
				builder.addCase(thunk.rejected, (state, action) => {
					state.loading = false;
					state.error = action.payload;
				});
			}
		}
})

export const selectIsAuth = (state: AuthState) => {
	return Boolean(state.data);
};
export const { logout } = authSlice.actions;
export default authSlice.reducer;