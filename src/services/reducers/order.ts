// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */

import { TOrderActions } from '../actions/order';
import { CREATE_ORDER } from '../constants';

type TOrderState = {
	name: string;
	order: {
		number: null | number;
	};
	success: boolean;
};

const initState: TOrderState = {
	name: '',
	order: {
		number: null,
	},
	success: false,
};

export const orderReducer = (
	state = initState,
	action: TOrderActions
): TOrderState => {
	switch (action.type) {
		case CREATE_ORDER: {
			return { ...action.payload };
		}
		default: {
			return state;
		}
	}
};
