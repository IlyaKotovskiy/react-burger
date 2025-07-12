/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { cookie } from '@utils/cookie';
import { AppDispatch, AppThunk } from '../..';
import { handleAuth, TAuthState } from '../../api/authUser';
import { getUser, UserPromiseType } from '../../api/getUser';
import {
	forgotPassword,
	resetPassword,
	TPasswordState,
} from '../../api/resetPassword';
import {
	IWithPayloadAction,
	SET_USER_DATA,
	SET_USER_PASSWORD,
} from '../constants';

type UserDataType = {
	name?: string;
	email: string;
	password?: string;
};

export interface ISetUserDataAction extends IWithPayloadAction<UserDataType> {
	readonly type: typeof SET_USER_DATA;
}

export interface ISetUserPasswordAction
	extends IWithPayloadAction<TPasswordState> {
	readonly type: typeof SET_USER_PASSWORD;
}

export type TUserActions = ISetUserDataAction | ISetUserPasswordAction;

export const setUserDataAction = (
	payload: UserDataType
): ISetUserDataAction => ({
	type: SET_USER_DATA,
	payload,
});

export const setUserPasswordAction = (
	payload: TPasswordState
): ISetUserPasswordAction => ({
	type: SET_USER_PASSWORD,
	payload,
});

export const authUserAction: AppThunk<Promise<boolean>> =
	(formData: TAuthState, type: 'login' | 'register') =>
	async (dispatch: AppDispatch) => {
		try {
			const userData = await handleAuth(formData, type);
			dispatch(setUserDataAction(userData));
			return true;
		} catch (error) {
			console.error('Error:', error);
			return false;
		}
	};

export const checkUserTokenAction: AppThunk<
	Promise<boolean | UserPromiseType>
> = () => async (dispatch: AppDispatch) => {
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

export const forgotUserPasswordAction: AppThunk =
	(formData: TPasswordState) => async (dispatch: AppDispatch) => {
		dispatch(setUserPasswordAction(formData));
		return await forgotPassword(formData);
	};

export const resetUserPasswordAction: AppThunk =
	(formData: TPasswordState) => async (dispatch: AppDispatch) => {
		dispatch(setUserPasswordAction(formData));
		return await resetPassword(formData);
	};
