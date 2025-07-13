import { strict as assert } from 'assert';
import { userReducer } from './user';
import { SET_USER_DATA, SET_USER_PASSWORD } from '../constants';

describe('userReducer', () => {
	it('should return the initial state when action is unknown', () => {
		const initialState = {
			name: '',
			email: '',
			password: '',
		};
		const newState = userReducer(undefined, { type: 'UNKNOWN_ACTION' });
		assert.deepEqual(newState, initialState);
	});

	it('should handle SET_USER_DATA by merging user data into state', () => {
		const action = {
			type: SET_USER_DATA,
			payload: {
				name: 'John Doe',
				email: 'john@example.com',
			},
		};
		const newState = userReducer(undefined, action);
		assert.deepEqual(newState, {
			name: 'John Doe',
			email: 'john@example.com',
			password: '',
		});
	});

	it('should handle SET_USER_PASSWORD by updating password in state', () => {
		const initialState = {
			name: 'John Doe',
			email: 'john@example.com',
			password: '',
		};
		const action = {
			type: SET_USER_PASSWORD,
			payload: {
				password: 'newPassword123',
			},
		};
		const newState = userReducer(initialState, action);
		assert.deepEqual(newState, {
			name: 'John Doe',
			email: 'john@example.com',
			password: 'newPassword123',
		});
	});
});
