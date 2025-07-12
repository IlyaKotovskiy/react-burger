import s from './profile-page.module.css';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from '../../services/hooks';
import {
	checkUserTokenAction,
	setUserDataAction,
} from '../../services/actions/user';

type LinkType = {
	title: string;
	link: string;
};

type FormDataType = {
	name: string;
	login: string;
	password: string;
};

export const ProfilePage: React.FC = (): React.JSX.Element | null => {
	const links = useMemo<LinkType[]>(
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
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const checkUser = async () => {
			const result = await dispatch(checkUserTokenAction());

			if (typeof result !== 'boolean') {
				const user = result.user;

				dispatch(setUserDataAction({ ...user }));
				setFormData({
					name: user.name,
					login: user.email,
					password: '',
				});
				setIsAuthenticated(true);
				setIsLoading(false);
			} else {
				navigate('/');
			}
		};

		checkUser();
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
									end
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
						<div className={s.content}>
							<Outlet
								context={{
									formData,
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
