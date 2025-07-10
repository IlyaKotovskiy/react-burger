export type TOrder = {
	ingredients: string[];
	_id: string;
	status: 'created' | 'pending' | 'done';
	number: number;
	createdAt: string;
	updatedAt: string;
};

export type TOrderMessage = {
	success: boolean;
	orders: TOrder[];
	total: number;
	totalToday: number;
};
