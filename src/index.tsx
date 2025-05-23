import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import './styles.css';
import {
	legacy_createStore as createStore,
	applyMiddleware,
	Action,
	AnyAction,
} from 'redux';
import { thunk, ThunkAction, ThunkDispatch } from 'redux-thunk';
import { rootReducer } from '@services/reducers';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;

const store = createStore(rootReducer, applyMiddleware(thunk));

root.render(
	<StrictMode>
		<Router basename='/'>
			<Provider store={store}>
				<App />
			</Provider>
		</Router>
	</StrictMode>
);
