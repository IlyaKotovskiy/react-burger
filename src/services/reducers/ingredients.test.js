import { EIngredientTypes } from '../../types/burger-ingredients.t';
import {
	SET_INGREDIENTS,
	SET_CONSTRUCTOR_ITEMS,
	REMOVE_INGREDIENT,
	SET_CURRENT_INGREDIENT,
	SET_CURRENT_TAB,
} from '../constants';
import { ingredientsReducer } from './ingredients';

const mockIngredient = {
	_id: '1',
	name: 'Test Ingredient',
	type: EIngredientTypes.MAIN,
	price: 100,
	image: 'image.png',
	proteins: 10,
	fat: 5,
	carbohydrates: 20,
	calories: 150,
	image_mobile: 'image-mobile.png',
	image_large: 'image-large.png',
	__v: 1,
};

describe('ingredientsReducer', () => {
	it('should return the initial state', () => {
		const state = ingredientsReducer(undefined, { type: '' });
		expect(state).toEqual({
			allItems: [],
			constructor: {
				items: [],
				bun: null,
				totalSum: 0,
			},
			currentItem: null,
			currentTab: EIngredientTypes.BUNS,
		});
	});

	it('should handle SET_INGREDIENTS', () => {
		const state = ingredientsReducer(undefined, {
			type: SET_INGREDIENTS,
			payload: [mockIngredient],
		});
		expect(state.allItems).toEqual([mockIngredient]);
	});

	it('should handle SET_CONSTRUCTOR_ITEMS', () => {
		const state = ingredientsReducer(undefined, {
			type: SET_CONSTRUCTOR_ITEMS,
			payload: mockIngredient,
		});
		expect(state.constructor.items).toEqual([mockIngredient]);
	});

	it('should handle REMOVE_INGREDIENT', () => {
		const ingredientWithUniqueId = {
			...mockIngredient,
			uniqueId: 'uniq-1',
		};

		const prevState = {
			allItems: [],
			constructor: {
				items: [ingredientWithUniqueId],
				bun: null,
				totalSum: 0,
			},
			currentItem: null,
			currentTab: EIngredientTypes.BUNS,
		};

		const action = {
			type: REMOVE_INGREDIENT,
			payload: 'uniq-1',
		};

		const state = ingredientsReducer(prevState, action);

		expect(state.constructor.items).toEqual([]);
	});

	it('should handle SET_CURRENT_INGREDIENT', () => {
		const state = ingredientsReducer(undefined, {
			type: SET_CURRENT_INGREDIENT,
			payload: mockIngredient,
		});
		expect(state.currentItem).toEqual(mockIngredient);
	});

	it('should handle SET_CURRENT_TAB', () => {
		const state = ingredientsReducer(undefined, {
			type: SET_CURRENT_TAB,
			payload: EIngredientTypes.SAUCES,
		});
		expect(state.currentTab).toBe('sauces');
	});
});
