/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/anchor-is-valid */
import s from './app-header.module.css';
import { Link, useLocation } from 'react-router-dom';
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback } from 'react';

type TIsActiveLinkCallback = (
	path: string,
	exact?: boolean
) => 'primary' | 'secondary';

export const AppHeader: React.FC = (): React.JSX.Element => {
	const location = useLocation();

	const isActiveLink = useCallback<TIsActiveLinkCallback>(
		(path, exact = false) => {
			const isActive = exact
				? location.pathname === path
				: location.pathname.startsWith(path);

			return isActive ? 'primary' : 'secondary';
		},
		[location.pathname]
	);

	return (
		<header className={s.header}>
			<div className='container'>
				<nav className={s.nav}>
					<ul className={s.list}>
						<li>
							<Link to={'/'} className={s.linkItem}>
								<BurgerIcon type={isActiveLink('/', true)} className='mr-2' />
								<p className={s[isActiveLink('/', true)]}>Конструктор</p>
							</Link>
						</li>
						<li>
							<Link to={'/orders'} className={s.linkItem}>
								<ListIcon type={isActiveLink('/orders')} className='mr-2' />
								<p className={s[isActiveLink('/orders')]}>Лента заказов</p>
							</Link>
						</li>
					</ul>
					<Logo className={s.logo} />
					<div style={{ marginLeft: 'auto' }}>
						<Link to={'/profile'} className={s.linkItem}>
							<ProfileIcon type={isActiveLink('/profile')} className='mr-2' />
							<p className={s[isActiveLink('/profile')]}>Личный кабинет</p>
						</Link>
					</div>
				</nav>
			</div>
		</header>
	);
};
