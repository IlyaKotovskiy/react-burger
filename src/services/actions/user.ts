/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { cookie } from '@utils/cookie';
import { AppThunk } from '../..';
import { handleAuth, TAuthState } from '../../api/authUser';
import { getUser, UserPromiseType } from '../../api/getUser';
import {
	forgotPassword,
	resetPassword,
	TPasswordState,
} from '../../api/resetPassword';

type UserDataType = {
	name?: string;
	email: string;
	password?: string;
};

export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_USER_TOKEN = 'SET_USER_TOKEN';
export const SET_USER_PASSWORD = 'SET_USER_PASSWORD';

export const setUserDataAction = (payload: UserDataType) => ({
	type: SET_USER_DATA,
	payload,
});

export const setUserPasswordAction = (payload: TPasswordState) => ({
	type: SET_USER_PASSWORD,
	payload,
});

export const authUserAction =
	(
		formData: TAuthState,
		type: 'login' | 'register'
	): AppThunk<Promise<boolean>> =>
	async (dispatch) => {
		try {
			const userData = await handleAuth(formData, type);
			dispatch(setUserDataAction(userData));
			return true;
		} catch (error) {
			console.error('Error:', error);
			return false;
		}
	};

export const checkUserTokenAction =
	(): AppThunk<Promise<UserPromiseType | boolean>> => async (dispatch) => {
		const token = cookie.get('token');

		if (!token) {
			console.error('The token is missing');
			return false;
		}

		try {
			const response = await getUser(token);

			if (response.success) {
				dispatch(setUserDataAction(response.user));
				return response;
			}

			return false;
		} catch (error) {
			console.error('Ошибка при проверке токена:', error);
			return false;
		}
	};

export const forgotUserPasswordAction =
	(formData: TPasswordState): AppThunk<Promise<TPasswordState>> =>
	async (dispatch) => {
		dispatch(setUserPasswordAction(formData));
		return await forgotPassword(formData);
	};

export const resetUserPasswordAction =
	(formData: TPasswordState): AppThunk<Promise<TPasswordState>> =>
	async (dispatch) => {
		dispatch(setUserPasswordAction(formData));
		return await resetPassword(formData);
	};
