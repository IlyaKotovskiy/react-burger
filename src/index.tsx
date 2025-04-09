import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import './styles.css';
import {
	legacy_createStore as createStore,
	applyMiddleware,
	Action,
} from 'redux';
import { thunk, ThunkAction } from 'redux-thunk';
import { rootReducer } from '@services/reducers';
import { Provider } from 'react-redux';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;

const store = createStore(rootReducer, applyMiddleware(thunk));

root.render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>
);
