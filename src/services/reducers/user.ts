/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { SET_USER_DATA, SET_USER_PASSWORD } from '@services/actions/user';

type TUserReducerState = {
	name: string;
	email: string;
	password: string;
};

const initState: TUserReducerState = {
	name: '',
	email: '',
	password: '',
};

export const userReducer = (
	state = initState,
	action: { type: string; payload?: TUserReducerState }
) => {
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
