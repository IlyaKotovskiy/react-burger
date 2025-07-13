import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import './styles.css';
import {
	legacy_createStore as createStore,
	applyMiddleware,
	ActionCreator,
} from 'redux';
import { thunk, ThunkAction, ThunkDispatch } from 'redux-thunk';
import { rootReducer } from './services/reducers';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { TOrderActions } from './services/actions/order';
import { TIngredientsActions } from './services/actions/ingredients';
import { TUserActions } from './services/actions/user';
import { socketMiddleware } from './services/middlewares/socket';
import { TWSActions, wsActions } from './services/actions/ws';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
const middleware = applyMiddleware(thunk, socketMiddleware(wsActions));
const store = createStore(rootReducer, undefined, middleware);

export type RootState = ReturnType<typeof store.getState>;
export type TApplicationActions =
	| TOrderActions
	| TIngredientsActions
	| TUserActions
	| TWSActions;
export type AppThunk<ReturnType = void> = ActionCreator<
	ThunkAction<ReturnType, RootState, unknown, TApplicationActions>
>;
export type AppDispatch = ThunkDispatch<
	RootState,
	unknown,
	TApplicationActions
>;

root.render(
	<StrictMode>
		<Router
			basename={process.env.NODE_ENV === 'production' ? 'react-burger' : ''}>
			<Provider store={store}>
				<App />
			</Provider>
		</Router>
	</StrictMode>
);
