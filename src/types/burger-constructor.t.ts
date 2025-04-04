import { IIngredientData } from './data.t';

export interface IDraggableElementProps {
	ingredient: IIngredientData;
	index: number;
	moveIngredient: (fromIndex: number, toIndex: number) => void;
}
