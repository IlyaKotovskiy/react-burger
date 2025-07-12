import s from './order-info.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { wsConnect, wsDisconnect } from '../../services/actions/ws';
import { getIngredients } from '../../services/actions/ingredients';
import { OrderInfoContent } from '@components/order-info-content';

export const OrderInfo: React.FC = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const { orders } = useSelector((store) => store.ws);

	useEffect(() => {
		dispatch(wsConnect('wss://norma.nomoreparties.space/orders/all'));
		dispatch(getIngredients());

		return () => {
			dispatch(wsDisconnect());
		};
	}, []);

	if (!orders.length) {
		return <p>Загрузка заказа...</p>;
	}

	return (
		<section className={s.details}>
			<OrderInfoContent />
		</section>
	);
};
