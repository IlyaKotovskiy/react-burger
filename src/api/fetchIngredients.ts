import { BASE_URL } from '../app';
import { IIngredientData } from '../types/data.t';
import { IResponseServer } from '../types/fetchIngredients.t';

export const fetchIngredients = async (): Promise<IIngredientData[]> => {
	try {
		const response: Response = await fetch(BASE_URL + '/ingredients');

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`);
		}

		const data: IResponseServer = await response.json();

		if (!data.success || !Array.isArray(data.data)) {
			throw new Error('Invalid response format');
		}

		return data.data;
	} catch (error) {
		throw error;
	}
};
