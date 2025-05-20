import { SET_USER_DATA } from '@services/actions/user';

const initState = {
	name: '',
	email: '',
	password: '',
};

export const userReducer = (state = initState, action: any) => {
	switch (action.type) {
		case SET_USER_DATA: {
			return {
				...state,
				...action.payload,
			};
		}
		default: {
			return state;
		}
	}
};
