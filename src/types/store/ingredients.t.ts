import { EIngredientTypes } from '../burger-ingredients.t';
import { IIngredientData } from '../data.t';

export interface IConstructorIngredient extends IIngredientData {
	uniqueId: string;
}

export interface IIngredientState {
	allItems: IIngredientData[];
	constructor: {
		items: IConstructorIngredient[];
		bun: IIngredientData | null;
	};
	currentItem: IIngredientData | null;
	currentTab: EIngredientTypes;
}
