import { TWSActions } from '../actions/ws';
import {
	WS_CONNECTION_SUCCESS,
	WS_CONNECTION_ERROR,
	WS_CONNECTION_CLOSED,
	WS_GET_ORDERS,
} from '../constants/ws';

type TWSState = {
	connected: boolean;
	orders: any[];
	total: number;
	totalToday: number;
	error: string | null;
};

const initialState: TWSState = {
	connected: false,
	orders: [],
	total: 0,
	totalToday: 0,
	error: null,
};

export const wsReducer = (state = initialState, action: TWSActions) => {
	switch (action.type) {
		case WS_CONNECTION_SUCCESS:
			return { ...state, connected: true, error: null };

		case WS_CONNECTION_ERROR:
			return { ...state, connected: false, error: action.payload };

		case WS_CONNECTION_CLOSED:
			return { ...state, connected: false };

		case WS_GET_ORDERS:
			return {
				...state,
				orders: action.payload.orders,
				total: action.payload.total,
				totalToday: action.payload.totalToday,
			};

		default:
			return state;
	}
};
