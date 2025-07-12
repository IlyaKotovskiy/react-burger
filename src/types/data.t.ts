export type TIngredient = 'bun' | 'main' | 'sauce';

export interface IIngredientData {
	_id: string;
	name: string;
	type: TIngredient;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
	count?: number;
}

export interface IOrder {
	_id: string;
	number: number;
	name: string;
	status: string;
	createdAt: string;
	updatedAt: string;
	ingredients: string[];
}
