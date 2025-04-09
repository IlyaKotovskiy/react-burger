import { IIngredientData } from './data.t';

export enum EIngredientTypes {
	BUNS = 'buns',
	SAUCES = 'sauces',
	MAIN = 'main',
}

export interface IIngredientCardProp extends IIngredientData {
	count: number;
	onClick: () => void;
}
