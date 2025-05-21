import { getUser } from '../api/getUser';
import { cookie } from './cookie';

export const checkUserToken = async () => {
	const token = cookie.get('token');

	if (!token) {
		console.error('The token is missing');
		return false;
	}

	try {
		const response = await getUser(token);

		if (response.success) {
			return response;
		}
	} catch (error) {
		console.error('Ошибка при проверке токена:', error);
		return false;
	}
};
