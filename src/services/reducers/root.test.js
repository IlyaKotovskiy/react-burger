import { strict as assert } from 'assert';
import { rootReducer } from './';

describe('rootReducer', () => {
	it('should return initial state with combined reducers', () => {
		const state = rootReducer(undefined, { type: '@@INIT' });

		assert.ok(state.ingredients);
		assert.ok(state.order);
		assert.ok(state.user);
		assert.ok(state.ws);

		assert.deepEqual(state.order, {
			name: '',
			order: { number: null },
			success: false,
		});

		assert.deepEqual(state.user, {
			name: '',
			email: '',
			password: '',
		});

		assert.deepEqual(state.ws, {
			connected: false,
			orders: [],
			total: 0,
			totalToday: 0,
			error: null,
		});

		assert.ok(Array.isArray(state.ingredients.allItems));
		assert.ok(Array.isArray(state.ingredients.constructor.items));
	});

	it('should delegate actions to respective reducers', () => {
		const newOrderState = rootReducer(undefined, {
			type: 'CREATE_ORDER',
			payload: { name: 'Order 1', order: { number: 123 }, success: true },
		});

		assert.deepEqual(newOrderState.order, {
			name: 'Order 1',
			order: { number: 123 },
			success: true,
		});

		const newUserState = rootReducer(undefined, {
			type: 'SET_USER_DATA',
			payload: { name: 'John', email: 'john@example.com', password: '123' },
		});

		assert.deepEqual(newUserState.user, {
			name: 'John',
			email: 'john@example.com',
			password: '123',
		});
	});
});
