import { request } from '@utils/checkResponse';
import { BASE_URL } from '../app';
import { cookie } from '@utils/cookie';

export type TAuthState = {
	email: string;
	password: string;
	name: string;
	success?: boolean;
	user?: {
		email?: string;
		name?: string;
	};
	accessToken?: string;
	refreshToken?: string;
};

const handle = '/auth';
const options = (data: TAuthState): RequestInit => ({
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({ ...data }),
});

const authUser = async (formData: TAuthState): Promise<TAuthState> => {
	return request(BASE_URL + handle + '/login', options(formData));
};

const registerUser = async (formData: TAuthState): Promise<TAuthState> => {
	return request(BASE_URL + handle + '/register', options(formData));
};

export const handleAuth = async (
	formData: TAuthState,
	type: 'login' | 'register'
): Promise<TAuthState> => {
	const response =
		type === 'login' ? await authUser(formData) : await registerUser(formData);

	if (response.success && response.accessToken && response.refreshToken) {
		const accessToken = response.accessToken.split('Bearer ')[1];

		cookie.set('token', accessToken, {
			expires: 20 * 60,
			path: '/',
		});
		cookie.set('refreshToken', response.refreshToken, {
			expires: 30 * 24 * 60 * 60,
			path: '/',
		});
	}

	return response;
};
