import { strict as assert } from 'assert';
import { orderReducer } from './order';
import { CREATE_ORDER } from '../constants';

describe('orderReducer', () => {
	it('should return the initial state when no action matches', () => {
		const initialState = {
			name: '',
			order: { number: null },
			success: false,
		};
		const newState = orderReducer(undefined, { type: 'UNKNOWN_ACTION' });
		assert.deepEqual(newState, initialState);
	});

	it('should handle CREATE_ORDER and replace state with payload', () => {
		const action = {
			type: CREATE_ORDER,
			payload: {
				name: 'Test Order',
				order: { number: 123 },
				success: true,
			},
		};

		const newState = orderReducer(undefined, action);

		assert.deepEqual(newState, action.payload);
	});
});
