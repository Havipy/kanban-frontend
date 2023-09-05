export interface IUser {
	fullName: string
	email: string
	password: string
}
export interface IUserLogin extends Omit<IUser, 'fullName'> {
}
export interface IUserFullData extends IUser {
	token: string,
}