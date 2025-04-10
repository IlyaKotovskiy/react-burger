import s from './ingredient-card.module.css';
import { IIngredientCardProp } from '../../../types/burger-ingredients.t';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';

export const IngredientCard: React.FC<IIngredientCardProp> = (
	props
): React.JSX.Element => {
	const { _id, type, image, name, price, count, onClick } = props;

	const [{ isDragging }, drag] = useDrag({
		type: 'ingredient',
		item: { _id, type },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const opacity = isDragging ? 0.5 : 1;

	return (
		<button className={s.card} onClick={onClick} ref={drag} style={{ opacity }}>
			{count && <span className={s.counter}>{count}</span>}
			<img className='mb-1 pl-4 pr-4' src={image} alt={name} />
			<span className={s.digits}>
				{price}
				<CurrencyIcon type='primary' className='ml-2' />
			</span>
			<h3 className={s.title}>{name}</h3>
		</button>
	);
};
