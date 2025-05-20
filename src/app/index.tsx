/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppHeader } from '@components/app-header';
import { AuthPage } from '@pages/auth-page';
import { ForgotPasswordPage } from '@pages/forgot-password-page';
import { MianPage } from '@pages/main-page';
import { ProfilePage } from '@pages/profile-page';
import { ProtectedRouteElement } from '@utils/ProtectedRouteElement';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { IngredientDetailsPage } from '@pages/ingredient-details-page';
import { Modal } from '@components/modal';
import { IngredientDetails } from '@components/ingredient-details';

export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const App = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state && (location.state as any).background;

	return (
		<>
			<AppHeader />
			<Routes location={background || location}>
				<Route path='/' element={<MianPage />} />
				<Route path='/ingredients/:id' element={<IngredientDetailsPage />} />
				<Route
					path='/login'
					element={
						<ProtectedRouteElement onlyUnAuth>
							<AuthPage
								type='login'
								titlePage='Вход'
								btnText='Войти'
								links={[
									{
										text: 'Вы — новый пользователь?',
										link: '/register',
										linkText: 'Зарегистрироваться',
									},
									{
										text: 'Забыли пароль?',
										link: '/forgot-password',
										linkText: 'Восстановить пароль',
									},
								]}
							/>
						</ProtectedRouteElement>
					}
				/>
				<Route
					path='/register'
					element={
						<ProtectedRouteElement onlyUnAuth>
							<AuthPage
								type='register'
								titlePage='Регистрация'
								btnText='Зарегистрироваться'
								links={[
									{
										text: 'Уже зарегистрированы?',
										link: '/login',
										linkText: 'Войти',
									},
								]}
							/>
						</ProtectedRouteElement>
					}
				/>
				<Route
					path='/forgot-password'
					element={
						<ProtectedRouteElement onlyUnAuth>
							<ForgotPasswordPage type='forgot' btnText='Восстановить' />
						</ProtectedRouteElement>
					}
				/>
				<Route
					path='/reset-password'
					element={
						<ProtectedRouteElement onlyUnAuth requireForgotPasswordCheck>
							<ForgotPasswordPage type='reset' btnText='Сохранить' />
						</ProtectedRouteElement>
					}
				/>
				<Route
					path='/profile'
					element={
						<ProtectedRouteElement>
							<ProfilePage />
						</ProtectedRouteElement>
					}
				/>
			</Routes>
			{background && (
				<Routes>
					<Route
						path='/ingredients/:id'
						element={
							<Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
								<IngredientDetails />
							</Modal>
						}
					/>
				</Routes>
			)}
		</>
	);
};
