import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { fetchRegister } from '../../store/auth/asyncActions';
import { useAppDispatch } from '../../hooks/useRedux';
import { useNavigate } from 'react-router-dom';

import FormInput from '../../components/UI/formInput/FormInput';
import { IUser, IUserRegister } from '../../types/user.interface';

import BasicButton, { ButtonVariant } from '../../components/UI/basicButton/BasicButton';
import LoadingCover from '../../components/UI/loadingCover/LoadingCover';

import { REGISTRATION_INPUTS_DATA } from '../../data/formInputsData';

import cl from './Registration.module.scss';

const Registration: React.FC = () => {
	const inputs = REGISTRATION_INPUTS_DATA;
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [isLoading, setLoading] = useState<boolean>(false);
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<IUserRegister>();

	const onSubmit: SubmitHandler<IUserRegister> = async (values) => {
		setLoading(true);
		const data = await dispatch(fetchRegister(values));
		setLoading(false);
		if (data.meta.requestStatus !== 'fulfilled') {
			return alert('Не удалось зарегистрироваться')
		}
		const userData = data.payload as IUser;
		if ('token' in userData) {
			window.localStorage.setItem('token', userData.token)
		}
		navigate('/boards');
	}
	return (
		<div className={cl.container}>
			<form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
				<h1 className={cl.title}>Регистрация</h1>
				{inputs.map((input) => (
					<div className={cl.inputContainer} key={input.id}><FormInput
						register={register}
						inputOptions={input.options}
						error={errors[input.name]}
						{...input}
					/>
					</div>
				))}
				<div className={cl.buttonContainer}><BasicButton visible={true} variant={ButtonVariant.yellow}>Зарегистрироваться</BasicButton></div>
			</form>
			{isLoading
				?
				<LoadingCover />
				:
				<></>}
		</div >
	);
}

export default Registration