import React from 'react';
import FormInput from '../../components/UI/formInput/FormInput';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import cl from './Registration.module.scss';
import FormButton from '../../components/UI/formButton/FormButton';
import { fetchRegister } from '../../store/authSlice';
import { useAppDispatch } from '../../hooks/useRedux';
import { IUser } from '../../types/user.interface';



const Registration: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<IUser>();

	const onSubmit: SubmitHandler<IUser> = async (values) => {
		const data = await dispatch(fetchRegister(values));
		if (!data.payload) {
			return alert('Не удалось авторизиоваться')
		}
		if ('token' in data.payload) {
			window.localStorage.setItem('token', data.payload.token)
		}
		navigate('/')
	}
	const inputs = [
		{
			id: 1,
			name: 'fullName' as 'fullName',
			label: 'Full name',
			type: 'text',
			options: {
				required: 'Enter fullname',
				validate: {
					minLength: (v: string) => v.length >= 5 || 'The email should have at least 5 characters',
				},
			}
		},
		{
			id: 2,
			name: 'email' as 'email',
			label: 'Email',
			type: 'email',
			options: {
				required: 'Enter email',
				pattern: {
					value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
					message: 'Please enter a valid email',
				},
			},
		},
		{
			id: 3,
			name: 'password' as 'password',
			label: 'Password',
			type: 'password',
			options: {
				required: 'Enter password',
				pattern: {
					value: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
					message: 'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
				}
			},
		},
	];
	return (
		<div className={cl.container}>
			<form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
				<h1 className={cl.title}>Register</h1>
				{inputs.map((input) => (
					<div className={cl.inputContainer} key={input.id}><FormInput
						register={register}
						inputOptions={input.options}
						error={errors[input.name]}
						{...input}
					/>
					</div>
				))}
				<FormButton>SUBMIT</FormButton>
			</form>
		</div>
	);
}

export default Registration