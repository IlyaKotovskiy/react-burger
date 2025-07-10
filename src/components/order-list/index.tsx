import s from './order-list.module.css';
import {
	FormattedDate,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IOrder, IIngredientData } from '../../types/data.t';
import { useDispatch, useSelector } from '../../services/hooks';
import { useEffect } from 'react';
import { getIngredients } from '../../services/actions/ingredients';
import { wsConnect, wsDisconnect } from '../../services/actions/ws';
import { useLocation, useNavigate } from 'react-router-dom';
import { cookie } from '@utils/cookie';

interface IOrderListProps {
	type: 'profile' | 'feed';
}

// /feed/:id
// /profile/orders/:id

export const OrderList: React.FC<IOrderListProps> = ({
	type,
}): React.JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const orders = useSelector((state) => state.ws.orders);
	const ingredients = useSelector((store) => store.ingredients.allItems);

	const navigator = {
		profile: '/profile/orders',
		feed: '/feed',
	};

	const handleClick = (id: string): void => {
		navigate(`${navigator[type]}/${id}`, { state: { background: location } });
	};

	const path = {
		feed: '/all',
		profile: `?token=${cookie.get('token')}`,
	};

	useEffect(() => {
		dispatch(wsConnect(`wss://norma.nomoreparties.space/orders${path[type]}`));
		dispatch(getIngredients());

		return () => {
			dispatch(wsDisconnect());
		};
	}, []);

	return (
		<div className={s.orders}>
			{orders?.map((order: IOrder) => {
				const countedIngredients = order.ingredients.reduce(
					(acc: Array<IIngredientData & { count: number }>, id: string) => {
						const existing = acc.find((item) => item._id === id);

						if (existing) {
							existing.count += 1;
						} else {
							const full = ingredients.find((i) => i._id === id);
							if (full) {
								acc.push({ ...full, count: 1 });
							}
						}
						return acc;
					},
					[] as Array<IIngredientData & { count: number }>
				);
				const totalPrice = countedIngredients.reduce(
					(sum: number, ingredient: IIngredientData) =>
						sum + ingredient.price * (ingredient.count ?? 1),
					0
				);

				const visibleIngredients = countedIngredients.slice(0, 6);
				const hiddenCount = countedIngredients.length - 6;

				return (
					<div
						role='button'
						tabIndex={0}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								handleClick(order._id);
							}
						}}
						key={order._id}
						className={s.feedContainer}
						onClick={() => handleClick(order._id)}>
						<div className={s.numberAndTimestampFeed}>
							<span>#{order.number}</span>
							<span className={s.timestamp}>
								<FormattedDate date={new Date(order.createdAt)} />
							</span>
						</div>

						<h3 className={s.titleFeed}>{order.name}</h3>

						<div className={s.ingredientsFeed}>
							{visibleIngredients.map(
								(ingredient: IIngredientData, index: number) => {
									const isLastVisible = index === 5 && hiddenCount > 0;
									return (
										<div key={index} className={s.ingredientWrapper}>
											<img
												src={ingredient.image}
												alt={ingredient.name}
												className={s.ingredientImage}
											/>
											{isLastVisible && (
												<span className={s.counterOverlay}>+{hiddenCount}</span>
											)}
										</div>
									);
								}
							)}
							<div className={s.totlaPrice}>
								{totalPrice}
								<CurrencyIcon type='primary' />
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};
