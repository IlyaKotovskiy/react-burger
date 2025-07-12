// import s from './ingredient-details-page.module.css';
import { IngredientDetails } from '@components/ingredient-details';
import { getIngredient } from '../../services/actions/ingredients';
import { useDispatch, useSelector } from '../../services/hooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const IngredientDetailsPage: React.FC = (): React.JSX.Element => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch();
	const ingredient = useSelector((store) => store.ingredients.currentItem);

	useEffect(() => {
		if (id && (!ingredient || ingredient._id !== id)) {
			dispatch(getIngredient(id));
		}
	}, [id, ingredient, dispatch]);

	return (
		<div>
			<IngredientDetails />
		</div>
	);
};
