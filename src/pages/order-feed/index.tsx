import s from './order-feed.module.css';
import { useSelector } from '../../services/hooks';
import { OrderList } from '@components/order-list';

export const OrderFeed: React.FC = (): React.JSX.Element => {
	const { total, totalToday } = useSelector((state) => state.ws);

	return (
		<section className={s.feedSection}>
			<div className='container'>
				<h1 className={s.mainTitle}>Лента заказов</h1>
				<div className={s.mainContainer}>
					<OrderList type='feed' />
					<div className={s.ordersStats}>
						<div className={s.status}>
							<div className={s.statusReady}>
								<h2 className={s.statusTitle}>Готовы:</h2>
								<p className={s.ready}>034533</p>
								<p className={s.ready}>034532</p>
								<p className={s.ready}>034530</p>
								<p className={s.ready}>034527</p>
								<p className={s.ready}>034527</p>
							</div>
							<div className={s.statusInWork}>
								<h2 className={s.statusTitle}>В работе:</h2>
								<p className={s.inWork}>034538</p>
								<p className={s.inWork}>034541</p>
								<p className={s.inWork}>034542</p>
							</div>
						</div>
						<div className={s.ordersCount}>
							<h2 className={s.ordersCountTitle}>Выполнено за все время:</h2>
							<p className={s.ordersCountDigits}>{total}</p>
						</div>
						<div className={s.ordersCount}>
							<h2 className={s.ordersCountTitle}>Выполнено сегодня:</h2>
							<p className={s.ordersCountDigits}>{totalToday}</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
