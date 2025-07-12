import { IWithPayloadAction } from '../constants';
import {
	WS_CONNECT,
	WS_DISCONNECT,
	WS_CONNECTION_SUCCESS,
	WS_CONNECTION_ERROR,
	WS_CONNECTION_CLOSED,
	WS_GET_ORDERS,
} from '../constants/ws';

interface WSConnectAction extends IWithPayloadAction<string> {
	type: typeof WS_CONNECT;
}

interface WSDisconnectAction {
	type: typeof WS_DISCONNECT;
}

interface WSConnectionSuccessAction {
	type: typeof WS_CONNECTION_SUCCESS;
}

interface WSConnectionErrorAction extends IWithPayloadAction<string> {
	type: typeof WS_CONNECTION_ERROR;
}

interface WSConnectionClosedAction {
	type: typeof WS_CONNECTION_CLOSED;
}

interface WSGetOrdersAction
	extends IWithPayloadAction<{
		orders: any[];
		total: number;
		totalToday: number;
	}> {
	type: typeof WS_GET_ORDERS;
}

export type TWSActions =
	| WSConnectAction
	| WSDisconnectAction
	| WSConnectionSuccessAction
	| WSConnectionErrorAction
	| WSConnectionClosedAction
	| WSGetOrdersAction;

export const wsConnect = (url: string): WSConnectAction => ({
	type: WS_CONNECT,
	payload: url,
});

export const wsDisconnect = (): WSDisconnectAction => ({
	type: WS_DISCONNECT,
});

export const wsActions = {
	wsInit: WS_CONNECT,
	onOpen: WS_CONNECTION_SUCCESS,
	onClose: WS_CONNECTION_CLOSED,
	onError: WS_CONNECTION_ERROR,
	onMessage: WS_GET_ORDERS,
} as const;

export type WSActionsMap = typeof wsActions;
