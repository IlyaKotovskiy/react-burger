import { CREATE_ORDER, IWithPayloadAction } from '../constants';
import { AppDispatch, AppThunk } from '../..';
import { fetchOrder, IOrderState } from '../../api/fetchOrder';

export interface ICreateOrderAction extends IWithPayloadAction<IOrderState> {
	readonly type: typeof CREATE_ORDER;
}

export type TOrderActions = ICreateOrderAction;

export const createOrderAction = (
	payload: IOrderState
): ICreateOrderAction => ({
	type: CREATE_ORDER,
	payload,
});

export const createOrder: AppThunk =
	(ingredientIds: string[]) => (dispatch: AppDispatch) => {
		fetchOrder(ingredientIds)
			.then((data) => dispatch(createOrderAction(data)))
			.catch((error) => console.error('Error:', error));
	};
