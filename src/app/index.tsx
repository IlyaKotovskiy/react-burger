/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppHeader } from '@components/app-header';
import { AuthPage } from '@pages/auth-page';
import { ForgotPasswordPage } from '@pages/forgot-password-page';
import { MianPage } from '@pages/main-page';
import { ProfilePage } from '@pages/profile-page';
import { ProtectedRouteElement } from '@utils/ProtectedRouteElement';
import { Routes, Route, useLocation } from 'react-router-dom';
import { IngredientDetailsPage } from '@pages/ingredient-details-page';
import { Modal } from '@components/modal';
import { IngredientDetails } from '@components/ingredient-details';
import { OrderFeed } from '@pages/order-feed';
import { OrderInfo } from '@pages/order-info';
import { OrderInfoContent } from '@components/order-info-content';
import { ProfileForm } from '@components/profile-form';
import { ProfileOrders } from '@components/profile-orders';

export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const App = () => {
	const location = useLocation();
	const background = location.state && (location.state as any).background;

	return (
		<>
			<AppHeader />
			<Routes location={background || location}>
				<Route path='/' element={<MianPage />} />

				<Route path='/feed' element={<OrderFeed />} />

				<Route path='/feed/:id' element={<OrderInfo />} />
				<Route path='/profile/orders/:id' element={<OrderInfo />} />

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
					}>
					<Route index element={<ProfileForm />} />
					<Route path='orders' element={<ProfileOrders />} />
				</Route>
			</Routes>
			{background && (
				<Routes>
					<Route
						path='/ingredients/:id'
						element={
							<Modal title='Детали ингредиента'>
								<IngredientDetails />
							</Modal>
						}
					/>
					<Route
						path='/feed/:id'
						element={
							<Modal>
								<OrderInfoContent />
							</Modal>
						}
					/>
					<Route
						path='/profile/orders/:id'
						element={
							<Modal>
								<OrderInfoContent />
							</Modal>
						}
					/>
				</Routes>
			)}
		</>
	);
};
