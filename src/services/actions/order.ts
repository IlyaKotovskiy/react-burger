import { AppThunk } from '../..';
import { fetchOrder, IOrderState } from '../../api/fetchOrder';

export const CREATE_ORDER = 'CREATE_ORDER';

export const createOrderAction = (payload: IOrderState) => ({
	type: CREATE_ORDER,
	payload,
});

export const createOrder =
	(ingredientIds: string[]): AppThunk =>
	(dispatch) => {
		fetchOrder(ingredientIds)
			.then((data) => dispatch(createOrderAction(data)))
			.catch((error) => console.error('Error:', error));
	};
