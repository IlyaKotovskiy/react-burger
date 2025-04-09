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
	try {
		const response = await fetch(BASE_URL + '/orders', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				ingredients: ingredientsIds,
			}),
		});

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`);
		}

		const data: IOrderState = await response.json();

		return data;
	} catch (error) {
		throw error;
	}
};
