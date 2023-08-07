import React from 'react'
import FormInput from '../../components/UI/formInput/FormInput'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import cl from './Registration.module.scss';
import FormButton from '../../components/UI/formButton/FormButton';
import { fetchRegister } from '../../store/authSlice';
const Registration = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const onSubmit = async (values) => {
		const data = await dispatch(fetchRegister(values));
		if (data.error) {
			return alert('Неверный логин или пароль')
		}
		if ('token' in data.payload) {
			window.localStorage.setItem('token', data.payload.token)
		}
		navigate('/tasks')
	}
	const inputs = [
		{
			id: 1,
			name: 'fullName',
			label: 'Full name',
			type: 'text',
			options: {
				required: 'Enter fullname',
				validate: {
					minLength: (v) => v.length >= 5 || 'The email should have at least 5 characters',
				},
			}
		},
		{
			id: 2,
			name: 'email',
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
			name: 'password',
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
						options={input.options}
						error={errors[input.name]}
						{...input}
					/>
					</div>
				))}
				<FormButton type='submit' >SUBMIT</FormButton>
			</form>
		</div>
	);
}

export default Registration