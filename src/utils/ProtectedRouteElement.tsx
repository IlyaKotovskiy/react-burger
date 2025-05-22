import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

type TProtectedRouteProps = {
	children: JSX.Element;
	onlyUnAuth?: boolean;
	requireForgotPasswordCheck?: boolean;
};

export const ProtectedRouteElement: FC<TProtectedRouteProps> = ({
	children,
	onlyUnAuth = false,
	requireForgotPasswordCheck = false,
}) => {
	const location = useLocation();
	const isAuth = document.cookie.includes('token=');
	const isFromForgotPassword =
		sessionStorage.getItem('forgot-password') === 'true';

	if (onlyUnAuth && isAuth) {
		return <Navigate to='/' replace />;
	}

	if (!onlyUnAuth && !isAuth) {
		return <Navigate to='/login' state={{ from: location }} replace />;
	}

	if (requireForgotPasswordCheck && !isFromForgotPassword) {
		return <Navigate to='/forgot-password' replace />;
	}

	return children;
};
