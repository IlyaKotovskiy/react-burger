import { IIngredientData, TIngredient } from '../types/data.t';
import { data } from './data';

export const filteredIngredientsByType = (
	type: TIngredient
): IIngredientData[] => {
	return data.filter((i: IIngredientData) => i.type === type);
};
