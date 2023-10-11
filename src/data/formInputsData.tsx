export const LOGIN_INPUTS_DATA = [
	{
		id: 1,
		name: 'email' as 'email',
		label: 'Email',
		type: 'email',
		options: {
			required: 'Введите Email',
		},
	},
	{
		id: 2,
		name: 'password' as 'password',
		label: 'Пароль',
		type: 'password',
		options: {
			required: 'Введите пароль!',
		},
	},
];
export const REGISTRATION_INPUTS_DATA = [
	{
		id: 1,
		name: 'fullName' as 'fullName',
		label: 'Имя',
		type: 'text',
		options: {
			required: 'Введите имя',
			validate: {
				minLength: (v: string) => v.length >= 5 || 'Имя должно содержать как минимум 5 символов',
			},
		}
	},
	{
		id: 2,
		name: 'email' as 'email',
		label: 'Email',
		type: 'email',
		options: {
			required: 'Введите email',
			pattern: {
				value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				message: 'Пожалуйста, введите существующий email',
			},
		},
	},
	{
		id: 3,
		name: 'password' as 'password',
		label: 'Пароль',
		type: 'password',
		options: {
			required: 'Введите пароль',
			pattern: {
				value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/g,
				message: 'Пароль должен содержать как минимум 8 символов, хотя бы одну латинскую букву в нижнем регистре, одну в верхнем и одну цифру!',
			}
		},
	},
];