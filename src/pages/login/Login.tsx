import React, { useState } from 'react';
import FormInput from '../../components/UI/formInput/FormInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { fetchUserData } from '../../store/auth/asyncActions';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useRedux';
import BasicButton, { ButtonVariant } from '../../components/UI/basicButton/BasicButton';
import { LOGIN_INPUTS_DATA } from '../../data/formInputsData';
import LoadingCover from '../../components/UI/loadingCover/LoadingCover';

import { IUser } from '../../types/user.interface';
import cl from './Login.module.scss';



type FormValues = {
	email: string;
	password: string;
};

const Login: React.FC = () => {
	const inputs = LOGIN_INPUTS_DATA;
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [isLoading, setLoading] = useState<boolean>(false);
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<FormValues>();

	const onSubmit: SubmitHandler<FormValues> = async (values) => {
		setLoading(true);
		const data = await dispatch(fetchUserData(values));
		setLoading(false);
		if (data.meta.requestStatus !== 'fulfilled') {
			return alert('Не удалось авторизиоваться')
		}
		const userData = data.payload as IUser;
		if ('token' in userData) {
			window.localStorage.setItem('token', userData.token)
		}
		navigate('/boards')
	}

	return (

		<div className={cl.container}>
			<form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
				<h1 className={cl.title}>Логин</h1>
				{inputs.map((input) => (
					<div className={cl.inputContainer} key={input.id}>
						<FormInput
							register={register}
							inputOptions={input.options}
							error={errors[input.name]}
							{...input}
						/>
					</div>
				))}
				<div className={cl.buttonContainer}>
					<BasicButton visible={true} variant={ButtonVariant.yellow}>Войти</BasicButton>
				</div>
			</form>
			{isLoading && <LoadingCover />}
		</div>
	);
}
export default Login