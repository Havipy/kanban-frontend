import FormInput from '../../components/UI/formInput/FormInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { fetchUserData } from '../../store/authSlice';
import FormButton from '../../components/UI/formButton/FormButton';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useRedux';
import cl from './Login.module.scss';

type FormValues = {
	email: string;
	password: string;
};

const Login: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<FormValues>();

	const onSubmit: SubmitHandler<FormValues> = async (values) => {
		const data = await dispatch(fetchUserData(values));
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
			id: 2,
			name: 'email' as 'email',
			label: 'Email',
			type: 'email',
			options: {
				required: 'Enter email',
			},
		},
		{
			id: 3,
			name: 'password' as 'password',
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
						inputOptions={input.options}
						error={errors[input.name]}
						{...input}
					/>
					</div>
				))}
				<FormButton >SUBMIT</FormButton>
			</form>
		</div>
	);
}
export default Login