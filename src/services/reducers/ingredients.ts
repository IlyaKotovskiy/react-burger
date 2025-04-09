// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	MOVE_INGREDIENT,
	SET_BUN,
	SET_CONSTRUCTOR_ITEMS,
	SET_CURRENT_INGREDIENT,
	SET_CURRENT_TAB,
	SET_INGREDIENTS,
} from '@services/actions/ingredients';
import { EIngredientTypes } from '../../types/burger-ingredients.t';
import { IIngredientState } from '../../types/store/ingredients.t';

const initState: IIngredientState = {
	allItems: [],

	constructor: {
		items: [],
		bun: null,
	},

	currentItem: null,
	currentTab: EIngredientTypes.BUNS,
};

export const ingredientsReducer = (
	state = initState,
	action: { type: any; payload?: any }
) => {
	switch (action.type) {
		case SET_INGREDIENTS: {
			return { ...state, allItems: [...action.payload] };
		}
		case MOVE_INGREDIENT: {
			const items = [...state.constructor.items];
			const { fromIndex, toIndex } = action.payload;

			if (
				fromIndex < 0 ||
				toIndex < 0 ||
				fromIndex >= items.length ||
				toIndex >= items.length
			) {
				return state;
			}

			const [movedItem] = items.splice(fromIndex, 1);
			items.splice(toIndex, 0, movedItem);

			return { ...state, constructor: { ...state.constructor, items } };
		}
		case SET_CONSTRUCTOR_ITEMS: {
			return {
				...state,
				constructor: {
					...state.constructor,
					items: [...state.constructor.items, action.payload],
				},
			};
		}
		case SET_CURRENT_INGREDIENT: {
			return { ...state, currentItem: action.payload };
		}
		case SET_CURRENT_TAB: {
			return { ...state, currentTab: action.payload };
		}
		case SET_BUN: {
			return {
				...state,
				constructor: { ...state.constructor, bun: action.payload },
			};
		}
		default: {
			return state;
		}
	}
};
