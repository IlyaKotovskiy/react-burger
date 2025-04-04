import { IIngredientData, TIngredient } from '../types/data.t';

export const filteredIngredientsByType = (data: IIngredientData[]) => {
	return (type: TIngredient): IIngredientData[] => {
		return data.filter((i: IIngredientData) => i.type === type);
	};
};
