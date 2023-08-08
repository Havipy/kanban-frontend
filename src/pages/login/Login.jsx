import React from 'react'
import FormInput from '../../components/UI/formInput/FormInput'
import cl from './Login.module.scss'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { fetchUserData } from '../../store/authSlice';
import FormButton from '../../components/UI/formButton/FormButton';
import { useNavigate } from 'react-router-dom';
const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const onSubmit = async (values) => {
		const data = await dispatch(fetchUserData(values));
		if (data.error) {
			return alert('Неверный логин или пароль')
		}
		if ('token' in data.payload) {
			window.localStorage.setItem('token', data.payload.token)
		}
		navigate('/')
	}
	const inputs = [
		{
			id: 2,
			name: 'email',
			label: 'Email',
			type: 'email',
			options: {
				required: 'Enter email',
			},
		},
		{
			id: 3,
			name: 'password',
			label: 'Password',
			type: 'password',
			options: {
				required: 'Enter password',
			},
		},
	];
	return (
		<div className={cl.container}>
			<form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
				<h1 className={cl.title}>login</h1>
				{inputs.map((input) => (
					<div className={cl.inputContainer} key={input.id}><FormInput
						register={register}
						options={input.options}
						error={errors[input.name]}
						{...input}
					/>
					</div>
				))}
				<FormButton type="submit">SUBMIT</FormButton>
			</form>
		</div>
	);
}
export default Login