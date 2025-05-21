/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */

type UserDataType = {
	name?: string;
	email: string;
	password?: string;
};

export const SET_USER_DATA = 'SET_USER_DATA';

export const setUserDataAction = (payload: UserDataType) => ({
	type: SET_USER_DATA,
	payload,
});
