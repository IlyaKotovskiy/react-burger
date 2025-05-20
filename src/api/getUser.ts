import { request } from '@utils/checkResponse';
import { BASE_URL } from '../app';

type UserPromiseType = {
	success: boolean;
	user: {
		name: string;
		email: string;
	};
};

const handle = '/auth';

export const getUser = async (token: string): Promise<UserPromiseType> => {
	return request(BASE_URL + handle + '/user', {
		method: 'GET',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	});
};
