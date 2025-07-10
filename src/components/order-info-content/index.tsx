import s from './order-info-content.module.css';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { IOrder, IIngredientData } from '../../types/data.t';
import { useSelector } from '../../services/hooks';

export const OrderInfoContent: React.FC = (): React.JSX.Element => {
	const { id } = useParams();
	const { orders } = useSelector((state) => state.ws);
	const ingredients = useSelector((store) => store.ingredients.allItems);

	const ingredientCounts: Record<string, number> = {};

	const order = orders.find((order: IOrder) => order._id === id);

	if (order) {
		order.ingredients.forEach((id: string) => {
			ingredientCounts[id] = (ingredientCounts[id] || 0) + 1;
		});
	}

	const uniqueOrderIngredients = Object.keys(ingredientCounts).map((id) => {
		const ingredient = ingredients.find((i: IIngredientData) => i._id === id);
		if (!ingredient) return null;

		return {
			...ingredient,
			count: ingredientCounts[id],
			price: ingredient.price,
			totalPrice: ingredient.price * ingredientCounts[id],
		};
	});
	const totalPrice = uniqueOrderIngredients.reduce(
		(acc, obj) => acc + +(obj?.totalPrice ?? 0),
		0
	);

	return (
		<div className={s.conatiner}>
			<p className={s.number}>#{order.number}</p>
			<h1 className={s.title}>{order.name}</h1>
			<p className={`${s.status} ${s[order.status]}`}>
				{order.status === 'done' && 'Выполнен'}
			</p>
			<h2 className={s.listTitle}>Состав:</h2>
			<ul className={s.list}>
				{uniqueOrderIngredients.map(
					(
						ingr:
							| (IIngredientData & { count: number; totalPrice: number })
							| null
					) =>
						ingr && (
							<li key={ingr._id} className={s.ingredient}>
								<img
									src={ingr.image}
									alt={ingr.name}
									className={s.ingredientImage}
								/>
								<h3 className={s.ingredientTitle}>{ingr.name}</h3>
								<div className={s.countsPrice}>
									<p>{`${ingr.count} X ${ingr.price}`}</p>
									<CurrencyIcon type='primary' />
								</div>
							</li>
						)
				)}
			</ul>
			<div className={s.footer}>
				<p className={s.timestamp}>
					<FormattedDate date={new Date(order.createdAt)} />
				</p>
				<div className={s.totalPrice}>
					<p>{totalPrice}</p>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};
