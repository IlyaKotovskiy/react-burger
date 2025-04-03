import { IIngredientData } from './data.t';

export enum EIngredientTypes {
	BUNS = 'buns',
	SAUCES = 'sauces',
	MAIN = 'main',
}

export interface IBurgerIngredientsProps {
	ingredients: IIngredientData[];
	onIngredientClick: (ingredient: IIngredientData) => void;
}

export interface IIngredientCardProps {
	image: string;
	price: number;
	name: string;
	onClick: () => void;
}
