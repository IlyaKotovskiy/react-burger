import { request } from '@utils/checkResponse';
import { BASE_URL } from '../app';
import { IIngredientData } from '../types/data.t';

export const fetchIngredients = async (): Promise<IIngredientData[]> => {
	return request<IIngredientData[]>(BASE_URL + '/ingredients');
};
