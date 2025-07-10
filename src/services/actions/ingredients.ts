/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IConstructorIngredient } from '../../types/store/ingredients.t';
import { AppDispatch, AppThunk } from '../..';
import { fetchIngredients } from '../../api/fetchIngredients';
import { IIngredientData } from '../../types/data.t';
import {
	GET_TOTAL_CONSTRUCTOR_SUM,
	IWithPayloadAction,
	MOVE_INGREDIENT,
	REMOVE_INGREDIENT,
	SET_BUN,
	SET_CONSTRUCTOR_ITEMS,
	SET_CURRENT_INGREDIENT,
	SET_CURRENT_TAB,
	SET_INGREDIENTS,
} from '../constants';
import { EIngredientTypes } from '../../types/burger-ingredients.t';

export interface ISetIngredientsAction
	extends IWithPayloadAction<IIngredientData[]> {
	readonly type: typeof SET_INGREDIENTS;
}

export interface IMoveIngredientAction
	extends IWithPayloadAction<{ fromIndex: number; toIndex: number }> {
	readonly type: typeof MOVE_INGREDIENT;
}

export interface IRemoveIngredientAction extends IWithPayloadAction<string> {
	readonly type: typeof REMOVE_INGREDIENT;
}

export interface ISetConstructorItemsAction
	extends IWithPayloadAction<IConstructorIngredient> {
	readonly type: typeof SET_CONSTRUCTOR_ITEMS;
}

export interface IGetTotalConstructorSumAction {
	readonly type: typeof GET_TOTAL_CONSTRUCTOR_SUM;
}

export interface ISetCurrentIngredientAction
	extends IWithPayloadAction<IIngredientData> {
	readonly type: typeof SET_CURRENT_INGREDIENT;
}

export interface ISetCurrentTabAction
	extends IWithPayloadAction<EIngredientTypes> {
	readonly type: typeof SET_CURRENT_TAB;
}

export interface ISetBunAction extends IWithPayloadAction<IIngredientData> {
	readonly type: typeof SET_BUN;
}

export type TIngredientsActions =
	| ISetIngredientsAction
	| IMoveIngredientAction
	| IRemoveIngredientAction
	| ISetConstructorItemsAction
	| IGetTotalConstructorSumAction
	| ISetCurrentIngredientAction
	| ISetCurrentTabAction
	| ISetBunAction;

export const setIngredientsAction = (
	payload: IIngredientData[]
): ISetIngredientsAction => ({
	type: SET_INGREDIENTS,
	payload,
});

export const moveIngredientAction = (
	fromIndex: number,
	toIndex: number
): IMoveIngredientAction => ({
	type: MOVE_INGREDIENT,
	payload: {
		fromIndex,
		toIndex,
	},
});

export const removeIngredientAction = (
	payload: string
): IRemoveIngredientAction => ({
	type: REMOVE_INGREDIENT,
	payload,
});

export const setConstructorItemsAction = (
	payload: IConstructorIngredient
): ISetConstructorItemsAction => ({
	type: SET_CONSTRUCTOR_ITEMS,
	payload,
});

export const getTotalConstructorSumAction =
	(): IGetTotalConstructorSumAction => ({
		type: GET_TOTAL_CONSTRUCTOR_SUM,
	});

export const setCurrentIngredientAction = (
	payload: IIngredientData
): ISetCurrentIngredientAction => ({
	type: SET_CURRENT_INGREDIENT,
	payload,
});

export const setCurrentTabAction = (
	payload: EIngredientTypes
): ISetCurrentTabAction => ({
	type: SET_CURRENT_TAB,
	payload,
});

export const setBunAction = (payload: IIngredientData): ISetBunAction => ({
	type: SET_BUN,
	payload,
});

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
	fetchIngredients()
		.then((data) => dispatch(setIngredientsAction(data)))
		.catch((error) => console.error('Error:', error));
};

export const getIngredient: AppThunk =
	(id: string) => (dispatch: AppDispatch) => {
		fetchIngredients()
			.then((data) => data.find((elem) => elem._id === id))
			.then((ingredeint) => dispatch(setCurrentIngredientAction(ingredeint!)))
			.catch((error) => console.error('Error:', error));
	};
