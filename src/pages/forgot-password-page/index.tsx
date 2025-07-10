import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './forgot-password-page.module.css';
import {
	ChangeEvent,
	FormEvent,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	forgotUserPasswordAction,
	resetUserPasswordAction,
} from '../../services/actions/user';
import { useDispatch } from '../../services/hooks';

type TForgotPasswordPageProps = {
	type: 'forgot' | 'reset';
	btnText: string;
};

type TFormData = {
	email?: string;
	password?: string;
	token?: string;
};

export const ForgotPasswordPage: React.FC<TForgotPasswordPageProps> = ({
	type,
	btnText,
}): React.JSX.Element => {
	const initFormData = useMemo(
		() => ({
			...(type === 'forgot' && { email: '' }),
			...(type === 'reset' && { password: '', token: '' }),
		}),
		[type]
	);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [formData, setFormData] = useState<TFormData>(initFormData);

	const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	}, []);

	const handleSubmit = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			if (type === 'forgot') {
				await dispatch(forgotUserPasswordAction(formData));
			} else if (type === 'reset') {
				await dispatch(resetUserPasswordAction(formData));
			}

			navigate('/reset-password');
			setFormData(initFormData);
		},
		[initFormData, formData]
	);

	useEffect(() => {
		type === 'forgot'
			? sessionStorage.setItem('forgot-password', 'true')
			: sessionStorage.removeItem('forgot-password');
	}, [type]);

	return (
		<section>
			<div className={s.wrapper}>
				<h1 className={s.title}>Восстановление пароля</h1>
				<form className={s.form} onSubmit={handleSubmit}>
					{type === 'forgot' && (
						<EmailInput
							extraClass={s.input}
							name='email'
							isIcon={false}
							value={formData.email || ''}
							onChange={handleChange}
						/>
					)}
					{type === 'reset' && (
						<>
							<PasswordInput
								extraClass={s.input}
								name='password'
								value={formData.password || ''}
								onChange={handleChange}
							/>
							<Input
								extraClass={s.input}
								placeholder='Введите код из письма'
								name='token'
								value={formData.token || ''}
								onChange={handleChange}
							/>
						</>
					)}
					<Button
						htmlType='submit'
						type='primary'
						size='large'
						extraClass={s.submitBtn}>
						{btnText}
					</Button>
				</form>
				<p className={s.text}>
					Вспомнили пароль?{' '}
					<Link to={'/login'} className={s.link}>
						Войти
					</Link>
				</p>
			</div>
		</section>
	);
};
