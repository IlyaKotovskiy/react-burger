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
						<li className={s.navItem}>
							<BurgerIcon type='primary' className='mr-2' />
							<p className={s.textActive}>Конструктор</p>
						</li>
						<li className={s.navItem}>
							<ListIcon type='secondary' className='mr-2' />
							<p className={s.textInactive}>Лента заказов</p>
						</li>
					</ul>
					<Logo className={s.logo} />
					<div className={s.navItem}>
						<ProfileIcon type='secondary' className='mr-2' />
						<p className={s.textInactive}>Личный кабинет</p>
					</div>
				</nav>
			</div>
		</header>
	);
};
