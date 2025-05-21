/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-hooks/exhaustive-deps */
import s from './auth-page.module.css';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
	ChangeEvent,
	FormEvent,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TAuthState } from '../../api/authUser';
import { authUserAction } from '@services/actions/user';
import { useAppDispatch } from '../../hooks/useAppDispatch';

type TAuthPageProps = {
	type: 'login' | 'register';
	titlePage: string;
	btnText: string;
	links: {
		text: string;
		link: string;
		linkText: string;
	}[];
};

type TFormData = {
	email: string;
	password: string;
	name?: string;
};

export const AuthPage: React.FC<TAuthPageProps> = ({
	type,
	titlePage,
	btnText,
	links,
}): React.JSX.Element => {
	const initFormData = useMemo(
		() => ({
			email: '',
			password: '',
			...(type === 'register' && { name: '' }),
		}),
		[type]
	);

	const [formData, setFormdata] = useState<TFormData>(initFormData);
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useAppDispatch();

	const handleLoginSuccess = () => {
		const from = location.state?.from?.pathname || '/';
		navigate(from, { replace: true });
	};

	const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormdata((prev) => ({
			...prev,
			[name]: value,
		}));
	}, []);

	const handleSubmit = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			const isSuccess = await dispatch(
				authUserAction(formData as TAuthState, type)
			);

			if (isSuccess) {
				handleLoginSuccess();
			}

			setFormdata(initFormData);
		},
		[initFormData, formData, location, navigate]
	);

	useEffect(() => {
		setFormdata(initFormData);
	}, [initFormData]);

	const renderLinks = useMemo(
		() =>
			links.map((l) => (
				<p className={s.text} key={l.link}>
					{l.text}{' '}
					<Link to={l.link} className={s.link}>
						{l.linkText}
					</Link>
				</p>
			)),
		[links]
	);

	return (
		<section>
			<div className={s.wrapper}>
				<h1 className={s.title}>{titlePage}</h1>
				<form className={s.form} onSubmit={handleSubmit}>
					{type === 'register' && (
						<Input
							extraClass={s.input}
							name='name'
							placeholder='Имя'
							value={formData.name || ''}
							onChange={handleOnChange}
						/>
					)}
					<EmailInput
						extraClass={s.input}
						onChange={handleOnChange}
						value={formData.email}
						name='email'
						isIcon={false}
					/>
					<PasswordInput
						extraClass={s.input}
						name='password'
						value={formData.password}
						onChange={handleOnChange}
					/>
					<Button
						htmlType='submit'
						type='primary'
						size='large'
						extraClass={s.submitBtn}>
						{btnText}
					</Button>
				</form>
				{renderLinks}
			</div>
		</section>
	);
};
