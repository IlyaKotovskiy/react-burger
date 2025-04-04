import s from './app.module.scss';
import { AppHeader } from '@components/app-header';
import { BurgerConstructor } from '@components/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients';
import { useEffect, useState } from 'react';
import { IIngredientData } from '../types/data.t';
import { fetchIngredients } from '../api/fetchIngredients';

export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const App = () => {
	const [ingredients, setIngredients] = useState<IIngredientData[]>([]);

	useEffect(() => {
		fetchIngredients()
			.then((data) => setIngredients(data))
			.catch((error) => console.error('Error fetching:', error));
	}, []);

	return (
		<>
			<AppHeader />
			<section>
				<div className='container'>
					<div className={s.wrap}>
						<BurgerIngredients ingredients={ingredients} />
						<BurgerConstructor />
					</div>
				</div>
			</section>
		</>
	);
};
