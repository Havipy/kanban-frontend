import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import AuthService from '../../API/services/authService';
import { IUser, IUserLogin, IUserRegister } from '../../types/user.interface.js';

export const fetchUserData = createAsyncThunk<IUser, IUserLogin, { rejectValue: string }>(
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
	});
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
	});
export const fetchRegister = createAsyncThunk<IUser, IUserRegister, { rejectValue: string }>(
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
	});