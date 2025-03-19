import { IIngredientData } from './data.t';

export interface IBurgerConstructorProps {
	bun: IIngredientData | null;
	ingredients: IIngredientData[];
	totalPrice: number;
	moveIngredient: (fromIndex: number, toIndex: number) => void;
}

export interface IDraggableElementProps {
	ingredient: IIngredientData;
	index: number;
	moveIngredient: (fromIndex: number, toIndex: number) => void;
}
