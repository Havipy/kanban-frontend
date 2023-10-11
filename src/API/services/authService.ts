import { IUser, IUserLogin, IUserRegister } from "../../types/user.interface";
import axiosClient from "../axiosClient";

export default class AuthService {
	static async loginUser(userData: IUserLogin) {
		const response = await axiosClient.post<IUser>('auth/login', userData);
		return response.data;
	}
	static async checkUserAuth() {
		const response = await axiosClient.get<IUser>('auth/me');
		return response.data;
	}
	static async registerUser(userData: IUserRegister) {
		const response = await axiosClient.post<IUser>('auth/reqistration', userData);
		return response.data;
	}
}