import { request } from '@utils/checkResponse';
import { BASE_URL } from '../app';

export type TPasswordState = {
	email?: string;
	message?: string;
	success?: boolean;
};

const handle = '/password-reset';
const options = (data: TPasswordState): RequestInit => ({
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({ ...data }),
});

export const forgotPassword = async (
	formData: TPasswordState
): Promise<TPasswordState> => {
	return request(BASE_URL + handle, options(formData));
};

export const resetPassword = async (
	formData: TPasswordState
): Promise<TPasswordState> => {
	return request<TPasswordState>(
		BASE_URL + handle + '/reset',
		options(formData)
	);
};
