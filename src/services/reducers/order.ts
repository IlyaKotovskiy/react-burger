// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CREATE_ORDER } from '@services/actions/order';

const initState = {
	name: '',
	order: {
		number: null,
	},
	success: false,
};

export const orderReducer = (
	state = initState,
	action: { type: any; payload?: any }
) => {
	switch (action.type) {
		case CREATE_ORDER: {
			return { ...action.payload };
		}
		default: {
			return state;
		}
	}
};
