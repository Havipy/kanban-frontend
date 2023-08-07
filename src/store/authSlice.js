import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../axios.js'

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params, { rejectWithValue }) => {
	try {
		const response = await axios.post('auth/login', params, {
			headers: {
				'content-type': 'application/json'
			}
		});
		const data = response.data;
		return data;
	}
	catch (e) {
		return rejectWithValue(e.message)
	}
})
export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params, { rejectWithValue }) => {
	try {
		const response = await axios.get('auth/me')
		const data = response.data;

		return data;

	}
	catch (e) {
		return rejectWithValue(e.message)
	}
})
export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params, { rejectWithValue }) => {
	try {
		const response = await axios.post('auth/reqistration', params);
		const data = response.data;
		return data;
	}
	catch (e) {
		return rejectWithValue(e.message)
	}
})
const authSlice = createSlice({
	name: 'auth',
	initialState: {
		data: null,
		status: null,
		error: null
	},
	reducers: {
		logout: (state) => {
			state.data = null;
			window.localStorage.removeItem('token');
		}
	},
	extraReducers: {
		[fetchUserData.pending]: (state) => {
			state.status = 'loading';
			state.error = null;
		},
		[fetchUserData.fulfilled]: (state, action) => {
			state.status = 'resolved';
			state.data = action.payload;
		},
		[fetchUserData.rejected]: (state, action) => {
			state.status = 'rejected';
			state.error = action.payload;
		},
		[fetchLogin.pending]: (state) => {
			state.status = 'loading';
			state.error = null;
		},
		[fetchLogin.fulfilled]: (state, action) => {
			state.status = 'resolved';
			state.data = action.payload;
		},
		[fetchLogin.rejected]: (state, action) => {
			state.status = 'rejected';
			state.error = action.payload;
		},
		[fetchRegister.pending]: (state) => {
			state.status = 'loading';
			state.error = null;
		},
		[fetchRegister.fulfilled]: (state, action) => {
			state.status = 'resolved';
			state.data = action.payload;
		},
		[fetchRegister.rejected]: (state, action) => {
			state.status = 'rejected';
			state.error = action.payload;
		}
	},
})

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const { logout } = authSlice.actions;
export default authSlice.reducer;