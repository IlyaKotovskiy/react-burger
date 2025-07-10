// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */
import { WSActionsMap } from '../actions/ws';
import { WS_DISCONNECT } from '../constants/ws';

export const socketMiddleware = (wsActions: WSActionsMap) => {
	let socket: WebSocket | null = null;
	let reconnectTimer: number | null = null;
	let heartbeatTimer: number | null = null;
	const reconnectInterval = 5000;
	const heartbeatInterval = 30000;
	let wsUrl = '';

	return (store: any) => (next: any) => (action: any) => {
		const { dispatch } = store;
		const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

		const connect = () => {
			socket = new WebSocket(wsUrl);

			socket.onopen = () => {
				dispatch({ type: onOpen });

				if (reconnectTimer) {
					clearTimeout(reconnectTimer);
					reconnectTimer = null;
				}
				if (heartbeatTimer) {
					clearInterval(heartbeatTimer);
					heartbeatTimer = null;
				}

				heartbeatTimer = window.setInterval(() => {
					if (!socket || socket.readyState !== WebSocket.OPEN) {
						console.warn('Соединение потеряно, попытка переподключения...');
						connect();
					}
				}, heartbeatInterval);
			};

			socket.onerror = (event: any) => {
				dispatch({ type: onError, payload: event });
			};

			socket.onmessage = (event: any) => {
				const data = JSON.parse(event.data);
				dispatch({ type: onMessage, payload: data });
			};

			socket.onclose = () => {
				dispatch({ type: onClose });

				if (heartbeatTimer) {
					clearInterval(heartbeatTimer);
					heartbeatTimer = null;
				}

				// Автоматический reconnect
				reconnectTimer = window.setTimeout(() => {
					connect();
				}, reconnectInterval);
			};
		};

		if (action.type === wsInit) {
			wsUrl = action.payload;
			connect();
		}

		if (action.type === WS_DISCONNECT) {
			if (socket) {
				socket.close();
				socket = null;
			}
			if (reconnectTimer) {
				clearTimeout(reconnectTimer);
				reconnectTimer = null;
			}
			if (heartbeatTimer) {
				clearInterval(heartbeatTimer);
				heartbeatTimer = null;
			}
		}

		return next(action);
	};
};
