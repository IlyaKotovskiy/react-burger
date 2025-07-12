import { OrderList } from '@components/order-list';

export const ProfileOrders: React.FC = (): React.JSX.Element => {
	return (
		<div>
			<OrderList type='profile' />
		</div>
	);
};
