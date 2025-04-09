import { IConstructorIngredient } from '../../types/store/ingredients.t';
import { AppThunk } from '../..';
import { fetchIngredients } from '../../api/fetchIngredients';
import { IIngredientData } from '../../types/data.t';

export const SET_INGREDIENTS = 'SET_INGREDIENTS';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SET_CONSTRUCTOR_ITEMS = 'SET_CONSTRUCTOR_ITEMS';
export const GET_TOTAL_CONSTRUCTOR_SUM = 'GET_TOTAL_CONSTRUCTOR_SUM';
export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';
export const SET_CURRENT_TAB = 'SET_CURRENT_TAB';
export const SET_BUN = 'SET_BUN';

export const setIngredientsAction = (payload: IIngredientData[]) => ({
	type: SET_INGREDIENTS,
	payload,
});

export const moveIngredientAction = (fromIndex: number, toIndex: number) => ({
	type: MOVE_INGREDIENT,
	payload: {
		fromIndex,
		toIndex,
	},
});

export const removeIngredientAction = (payload: string) => ({
	type: REMOVE_INGREDIENT,
	payload,
});

export const setConstructorItemsAction = (
	payload: IConstructorIngredient[]
) => ({
	type: SET_CONSTRUCTOR_ITEMS,
	payload,
});

export const getTotalConstructorSumAction = () => ({
	type: GET_TOTAL_CONSTRUCTOR_SUM,
});

export const setCurrentIngredientAction = (payload: IIngredientData) => ({
	type: SET_CURRENT_INGREDIENT,
	payload,
});

export const setCurrentTabAction = (payload: string) => ({
	type: SET_CURRENT_TAB,
	payload,
});

export const setBunAction = (payload: IIngredientData) => ({
	type: SET_BUN,
	payload,
});

export const getIngredients = (): AppThunk => (dispatch) => {
	fetchIngredients()
		.then((data) => dispatch(setIngredientsAction(data)))
		.catch((error) => console.error('Error:', error));
};
