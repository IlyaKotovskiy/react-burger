import s from './ingredient-details.module.css';
import { getIngredient } from '@services/actions/ingredients';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../..';
import { useParams } from 'react-router-dom';

export const IngredientDetails: React.FC = (): React.JSX.Element => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch<AppDispatch>();
	const ingredient = useSelector(
		(store: RootState) => store.ingredients.currentItem
	);

	useEffect(() => {
		if (!ingredient && id) {
			dispatch(getIngredient(id));
		}
	}, []);

	if (!ingredient) {
		return <p>Загрузка ингредиента...</p>;
	}

	return (
		<div>
			<img
				src={ingredient.image}
				alt={ingredient.name}
				className={s.modalImage}
			/>
			<h3 className={s.modalIngredientTitle}>{ingredient.name}</h3>
			<ul className={s.modalIngredientListInfo}>
				<li className={s.modalIngredientListItem}>
					<p>Калории,ккал</p>
					<span className={s.modalDigits}>{ingredient.calories}</span>
				</li>
				<li className={s.modalIngredientListItem}>
					<p>Белки, г</p>
					<span className={s.modalDigits}>{ingredient.proteins}</span>
				</li>
				<li className={s.modalIngredientListItem}>
					<p>Жиры, г</p>
					<span className={s.modalDigits}>{ingredient.fat}</span>
				</li>
				<li className={s.modalIngredientListItem}>
					<p>Углеводы, г</p>
					<span className={s.modalDigits}>{ingredient.carbohydrates}</span>
				</li>
			</ul>
		</div>
	);
};
