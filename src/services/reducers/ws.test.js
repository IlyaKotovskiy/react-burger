import { strict as assert } from 'assert';
import { wsReducer } from './ws';
import {
	WS_CONNECTION_SUCCESS,
	WS_CONNECTION_ERROR,
	WS_CONNECTION_CLOSED,
	WS_GET_ORDERS,
} from '../constants/ws';

describe('wsReducer', () => {
	const initialState = {
		connected: false,
		orders: [],
		total: 0,
		totalToday: 0,
		error: null,
	};

	it('should return the initial state by default', () => {
		const newState = wsReducer(undefined, { type: 'UNKNOWN' });
		assert.deepEqual(newState, initialState);
	});

	it('should handle WS_CONNECTION_SUCCESS', () => {
		const action = { type: WS_CONNECTION_SUCCESS };
		const newState = wsReducer(initialState, action);
		assert.deepEqual(newState, {
			...initialState,
			connected: true,
			error: null,
		});
	});

	it('should handle WS_CONNECTION_ERROR', () => {
		const errorMsg = 'Connection failed';
		const action = { type: WS_CONNECTION_ERROR, payload: errorMsg };
		const newState = wsReducer(initialState, action);
		assert.deepEqual(newState, {
			...initialState,
			connected: false,
			error: errorMsg,
		});
	});

	it('should handle WS_CONNECTION_CLOSED', () => {
		const connectedState = { ...initialState, connected: true };
		const action = { type: WS_CONNECTION_CLOSED };
		const newState = wsReducer(connectedState, action);
		assert.deepEqual(newState, {
			...initialState,
			connected: false,
		});
	});

	it('should handle WS_GET_ORDERS', () => {
		const ordersPayload = {
			orders: [{ id: 1 }, { id: 2 }],
			total: 10,
			totalToday: 5,
		};
		const action = { type: WS_GET_ORDERS, payload: ordersPayload };
		const newState = wsReducer(initialState, action);
		assert.deepEqual(newState, {
			...initialState,
			orders: ordersPayload.orders,
			total: ordersPayload.total,
			totalToday: ordersPayload.totalToday,
		});
	});
});
