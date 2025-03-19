import s from './ingredient-card.module.css';
import { IIngredientCardProps } from '../../../types/burger-ingredients.t';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const IngredientCard: React.FC<IIngredientCardProps> = ({
	image,
	price,
	name,
	onClick,
}): React.JSX.Element => {
	return (
		<button className={s.card} onClick={onClick}>
			<img className='mb-1 pl-4 pr-4' src={image} alt={name} />
			<span className={s.digits}>
				{price}
				<CurrencyIcon type='primary' className='ml-2' />
			</span>
			<h3 className={s.title}>{name}</h3>
		</button>
	);
};
