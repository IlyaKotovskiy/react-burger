/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/anchor-is-valid */
import s from './app-header.module.css';
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const AppHeader: React.FC = (): React.JSX.Element => {
	return (
		<header className={s.header}>
			<div className='container'>
				<nav className={s.nav}>
					<ul className={s.list}>
						<li>
							<a href='#' className={s.navItem}>
								<BurgerIcon type='primary' className='mr-2' />
								<p className={s.textActive}>Конструктор</p>
							</a>
						</li>
						<li className={s.navItem}>
							<a href='#' className={s.navItem}>
								<ListIcon type='secondary' className='mr-2' />
								<p className={s.textInactive}>Лента заказов</p>
							</a>
						</li>
					</ul>
					<Logo className={s.logo} />
					<div className={s.navItem}>
						<a href='#' className={s.navItem}>
							<ProfileIcon type='secondary' className='mr-2' />
							<p className={s.textInactive}>Личный кабинет</p>
						</a>
					</div>
				</nav>
			</div>
		</header>
	);
};
