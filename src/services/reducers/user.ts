/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { TUserActions } from '../actions/user';
import { SET_USER_DATA, SET_USER_PASSWORD } from '../constants';

type TUserState = {
	name: string;
	email: string;
	password: string;
};

const initState: TUserState = {
	name: '',
	email: '',
	password: '',
};

export const userReducer = (
	state = initState,
	action: TUserActions
): TUserState => {
	switch (action.type) {
		case SET_USER_DATA: {
			return {
				...state,
				...action.payload,
			};
		}
		case SET_USER_PASSWORD: {
			return {
				...state,
				...action.payload!,
			};
		}
		default: {
			return state;
		}
	}
};
