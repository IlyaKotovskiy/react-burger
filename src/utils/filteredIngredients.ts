import { IIngredientData, TIngredient } from '../types/data.t';

export const filteredIngredientsByType = <T extends Array<IIngredientData>>(
	data: T
) => {
	return (type: TIngredient): T => {
		return data.filter((i) => i.type === type) as T;
	};
};
