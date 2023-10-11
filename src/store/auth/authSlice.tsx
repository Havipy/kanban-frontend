
import { IUser } from '../../types/user.interface.js';
import { createSlice } from '@reduxjs/toolkit';
import { fetchLogin, fetchRegister, fetchUserData } from './asyncActions';

type AuthState = {
	data: IUser | null,
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
			window.localStorage.removeItem('token');
		}
	},
	extraReducers:
		builder => {
			for (const thunk of [fetchUserData, fetchLogin, fetchRegister]) {
				builder.addCase(thunk.pending, (state) => {
					console.log('skss')
					state.loading = true;
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

export const selectIsAuth = (state: { auth: AuthState }) => {
	return Boolean(state.auth.data);
};
export const { logout } = authSlice.actions;
export default authSlice.reducer;