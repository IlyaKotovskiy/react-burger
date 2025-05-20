import s from './profile-page.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { getUser } from '../../api/getUser';
import { cookie } from '@utils/cookie';
import { useDispatch } from 'react-redux';
import { setUserDataAction } from '@services/actions/user';

type LinkType = {
	title: string;
	link: string;
};

type FormDataType = {
	name: string;
	login: string;
	password: string;
};

export const ProfilePage: React.FC = () => {
	const links: LinkType[] = useMemo(
		() => [
			{ title: 'Профиль', link: '/profile' },
			{ title: 'История заказов', link: '/profile/orders' },
			{ title: 'Выход', link: '/quit' },
		],
		[]
	);
	const [formData, setFormData] = useState<FormDataType>({
		name: '',
		login: '',
		password: '',
	});
	const [disabledNameInput, setDisabledNameInput] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const nameInputRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const onIconClick = () => {
		setTimeout(() => nameInputRef.current?.focus(), 0);
		setDisabledNameInput(false);
	};

	useEffect(() => {
		const checkUserToken = async () => {
			const token = cookie.get('token');

			if (!token) {
				navigate('/', { replace: true });
				return;
			}

			try {
				const userData = await getUser(token);
				dispatch(
					setUserDataAction({
						...userData.user,
					})
				);
				setFormData((prev) => ({
					...prev,
					...userData.user,
					login: userData.user.email,
				}));
				setIsAuthenticated(true);
			} catch (error) {
				console.error('Ошибка при проверке токена:', error);
				navigate('/', { replace: true });
			} finally {
				setIsLoading(false);
			}
		};

		checkUserToken();
	}, []);

	if (isLoading) return null;

	if (!isAuthenticated) return null;

	return (
		<section>
			<div className='container'>
				<div className={s.center}>
					<div className={s.wrap}>
						<div className={s.links}>
							{links.map((link) => (
								<NavLink
									key={link.link}
									to={link.link}
									className={({ isActive }) =>
										isActive ? s.navActive : s.navUnactive
									}>
									{link.title}
								</NavLink>
							))}
							<p className={s.desc}>
								В этом разделе вы можете изменить свои персональные данные
							</p>
						</div>
						<form>
							<Input
								extraClass={s.input}
								onChange={handleOnChange}
								value={formData.name}
								name='name'
								placeholder='Имя'
								icon='EditIcon'
								disabled={disabledNameInput}
								onBlur={() => setDisabledNameInput(true)}
								onIconClick={onIconClick}
								ref={nameInputRef}
							/>
							<EmailInput
								extraClass={s.input}
								onChange={handleOnChange}
								value={formData.login}
								name='login'
								placeholder='Логин'
								isIcon
							/>
							<PasswordInput
								extraClass={s.input}
								onChange={handleOnChange}
								value={formData.password}
								name='password'
								placeholder='Пароль'
								icon='EditIcon'
							/>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};
