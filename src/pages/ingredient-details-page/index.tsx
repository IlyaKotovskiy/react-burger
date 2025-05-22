// import s from './ingredient-details-page.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../..';
import { IngredientDetails } from '@components/ingredient-details';
import { getIngredient } from '@services/actions/ingredients';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IIngredientData } from '../../types/data.t';

export const IngredientDetailsPage: React.FC = (): React.JSX.Element => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch<AppDispatch>();
	const ingredient: IIngredientData = useSelector(
		(store: RootState) => store.ingredients.currentItem
	);

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
