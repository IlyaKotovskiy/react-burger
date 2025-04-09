import { request } from '@utils/checkResponse';
import { BASE_URL } from '../app';

export interface IOrderState {
	name: string;
	order: {
		number: number;
	};
	success: boolean;
}

export const fetchOrder = async (
	ingredientsIds: string[]
): Promise<IOrderState> => {
	return request<IOrderState>(BASE_URL + '/orders', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			ingredients: ingredientsIds,
		}),
	});
};
