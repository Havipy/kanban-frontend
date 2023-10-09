import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { fetchRegister } from '../../store/authSlice';
import { useAppDispatch } from '../../hooks/useRedux';
import { useNavigate } from 'react-router-dom';

import FormInput from '../../components/UI/formInput/FormInput';
import { IUser } from '../../types/user.interface';

import BasicButton, { ButtonVariant } from '../../components/UI/basicButton/BasicButton';
import cl from './Registration.module.scss';
import { REGISTRATION_INPUTS_DATA } from '../../data/formInputsData';

const Registration: React.FC = () => {
	const inputs = REGISTRATION_INPUTS_DATA;
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<IUser>();

	const onSubmit: SubmitHandler<IUser> = async (values) => {
		const data = await dispatch(fetchRegister(values));
		console.log(data.payload);
		if (!data.payload) {
			return alert('Не удалось авторизиоваться')
		}
		navigate('/boards')
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
		</div >
	);
}

export default Registration