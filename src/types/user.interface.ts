export interface IUserRegister extends Omit<IUser, '_id' | 'token'> {
}
export interface IUserLogin extends Omit<IUser, 'fullName' | '_id' | 'token'> {
}
export interface IUser {
	_id: string,
	fullName: string,
	email: string,
	password: string
	token: string,
}