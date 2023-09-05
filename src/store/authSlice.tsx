import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../axios'
import { IUser, IUserFullData, IUserLogin } from '../types/user.interface.js';
import axios, { AxiosError } from 'axios';

export const fetchUserData = createAsyncThunk<IUserFullData, IUserLogin, { rejectValue: AxiosError | Error }>('auth/fetchUserData',
	async (userData, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post('auth/login', userData);
			const data = response.data;

			return data;
		}
		catch (e) {
			if (axios.isAxiosError(e)) {
				rejectWithValue(e as AxiosError)
			} else {
				rejectWithValue(e as Error);
			}
		}
	})

export const fetchLogin = createAsyncThunk<IUser, undefined, { rejectValue: AxiosError | Error }>('auth/fetchLogin', async (_, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.get('auth/me')
		const data = response.data;

		return data;
	}
	catch (e) {
		if (axios.isAxiosError(e)) {
			rejectWithValue(e as AxiosError)
		} else {
			rejectWithValue(e as Error);
		}
	}
})
export const fetchRegister = createAsyncThunk<IUserFullData, IUser, { rejectValue: AxiosError | Error }>('auth/fetchRegister', async (userData, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.post('auth/reqistration', userData);
		const data = response.data;
		return data;
	}
	catch (e) {
		if (axios.isAxiosError(e)) {
			rejectWithValue(e as AxiosError)
		} else {
			rejectWithValue(e as Error);
		}
	}
})

type AuthState = {
	data: IUser | IUserFullData | null,
	status: string
	error: null | unknown
}
const initialState: AuthState = {
	data: null,
	status: 'loading',
	error: null
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.data = null;
			window.localStorage.removeItem('token');
		}
	},
	extraReducers:
		builder => {
			for (const thunk of [fetchUserData, fetchLogin, fetchRegister]) {
				builder.addCase(thunk.pending, (state) => {
					state.status = 'loading';
					state.error = null;
				});
				builder.addCase(thunk.fulfilled, (state, action) => {
					state.status = 'resolved';
					state.data = action.payload;
				});
				builder.addCase(thunk.rejected, (state, action) => {
					state.status = 'rejected';
					state.error = action.payload;
				});
			}
		}
})

export const selectIsAuth = (state: { auth: AuthState }) => {

	return Boolean(state.auth.data)
};
export const { logout } = authSlice.actions;
export default authSlice.reducer;