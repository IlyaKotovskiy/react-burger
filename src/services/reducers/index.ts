import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { userReducer } from './user';
import { wsReducer } from './ws';

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	order: orderReducer,
	user: userReducer,
	ws: wsReducer,
});
